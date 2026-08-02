import { useEffect, useState } from "react"
import type { IProducts } from "./data/products/interface"
import productsData from './data/products/products.json'
import ProductCard from "./components/ProductCard"
import Modal from "./components/ui/Modal"
import Button from "./components/ui/Button"
import { newProductForm } from "./data/formInput/forms"
import Input from "./components/ui/Input"
import type { INewProductForm } from "./data/formInput/interface"
import { validateProduct, type IErrors } from "./validation/products"
import ErrorMsg from "./components/ui/ErrorMsg"
import { productColors } from "./data/products/colors"
import ColorCircle from "./components/ui/ColorCircle"
import SelectMenu from "./components/ui/SelectMenu"
import categories, { type ICategory } from './data/products/categories'

function App() {

  const defaultProduct: IProducts = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    imgUrl: '',
    colors: [],
    category: {
      name: '',
      imageUrl: '',
    }
  }
  const defaultErrors: IErrors = {
    title: '',
    description: '',
    price: '',
    imgUrl: '',
    colors: ''
  }


  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [products, setProducts] = useState<IProducts[]>(productsData)
  const [errors, setErrors] = useState<IErrors>(defaultErrors)
  const [product, setProduct] = useState<IProducts>(defaultProduct)
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(categories[0])





  const selectColors = (color: string): void => {
    if (selectedColors.includes(color)) {
      return setSelectedColors(selectedColors.filter(selectedColor => selectedColor !== color))
    }
    setSelectedColors(prev => [...prev, color])
    setErrors({
      ...errors,
      colors: ''
    })
    return
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setProduct({
      ...product,
      [name]: value
    })
    setErrors({
      ...errors,
      [name]: ""
    })
  }

  const onSubmitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, price, imgUrl } = product
    const errors = validateProduct({
      title,
      description,
      price,
      imgUrl,
      colors: selectedColors
    })
    const hasErrorMsg = Object.values(errors).some(errorMsg => errorMsg === '') && Object.values(errors).every(errorMsg => errorMsg === '')

    if (!hasErrorMsg) {
      setErrors(errors)
      return;
    }

    const newProduct: IProducts = {
      ...product,
      id: products.length + 1,
      colors: selectedColors,
      category: {
        name: selectedCategory.name,
        imageUrl: selectedCategory.imageUrl
      }
    }

    setProducts(prev => [newProduct, ...prev])
    setProduct(defaultProduct)
    setSelectedColors([])
    setSelectedCategory(categories[0])
    closeModal()

  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const onCancel = () => {
    setProduct(defaultProduct)
    setErrors(defaultErrors)
    setSelectedColors([])
    closeModal()
  }

  useEffect(() => {
    setProducts(productsData)
  }, [])



  const newProductInputs = newProductForm.map((input: INewProductForm) => {
    return (
      <div key={input.name}>
        <Input input={input} value={product[input.name]} onChange={onChangeHandler}></Input>
        <ErrorMsg>{errors[input.name]}</ErrorMsg>
      </div>
    )
  })

  const cards = products.map(product => <ProductCard product={product} key={product.id}></ProductCard>)

  const colorsSelected = selectedColors.map((color, index) => {
    let textColor = 'text-white'
    color === '#FFFFFF' ? textColor = 'text-black border border-gray-300' : null
    return (
      <span key={index} className={`block w-fit h-fit rounded-sm cursor-pointer p-1 text-[10px] ${textColor}`} style={{ backgroundColor: color }}>{color}</span>
    )
  })

  const colorCircles = productColors.map((color, index) => {
    return (
      <ColorCircle key={index} color={color} onClick={() => selectColors(color)}></ColorCircle>
    )
  })

  return (
    <>
      <main className="container mx-auto">
        <div className="mt-10 p-5 flex items-center justify-between">
          <div className="text-5xl font-bold text-gray-800">All<span className=" text-indigo-700">Products</span></div>
          <Button className='bg-indigo-700 hover:bg-indigo-800 transition duration-300' width='w-fit' onClick={openModal}>
            Add Product
          </Button>
        </div>
        <div className="p-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {cards}
        </div>
        <Modal isOpen={isOpen} closeModal={closeModal} title="Add New Product">
          <form className="space-y-3" onSubmit={onSubmitHandler}>
            {newProductInputs}
            <SelectMenu data={categories} selected={selectedCategory} setSelected={setSelectedCategory}></SelectMenu>
            <div className="flex items-center gap-2 flex-wrap">
              {colorsSelected}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                {colorCircles}
              </div>
              {errors.colors && <ErrorMsg>{errors.colors}</ErrorMsg>}
            </div>
            <div className='flex items-center justify-between gap-3'>
              <Button className='bg-indigo-700 hover:bg-indigo-600 transition duration-300'>Submit</Button>
              <Button className='bg-gray-700 hover:bg-gray-500 transition duration-300' type="reset" onClick={onCancel}>Cancel</Button>
            </div>
          </form>
        </Modal>
      </main>
    </>
  )
}

export default App