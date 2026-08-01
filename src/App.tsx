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
    imgUrl: ''
  }

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [products, setProducts] = useState<IProducts[]>([])
  const [errors, setErrors] = useState<IErrors>(defaultErrors)
  const [product, setProduct] = useState<IProducts>(defaultProduct)



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
      imgUrl
    })
    const hasErrorMsg = Object.values(errors).some(errorMsg => errorMsg === '') && Object.values(errors).every(errorMsg => errorMsg === '')

    console.log(errors)
    console.log(hasErrorMsg)

    if (!hasErrorMsg) {
      setErrors(errors)
      return;
    }

    console.log("Send this product to our server")
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