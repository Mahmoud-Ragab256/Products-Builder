import type { IProducts } from '../data/products/interface'
import Image from './ui/Image'
import Button from './ui/Button'
import ColorCircle from './ui/ColorCircle'
import Modal from './ui/Modal'
import { useState } from 'react'
import categories, { type ICategory } from '../data/products/categories'
import SelectMenu from './ui/SelectMenu'
import ErrorMsg from './ui/ErrorMsg'
import Input from './ui/Input'
import { productForm } from '../data/formInput/forms'
import { validateProduct, type IErrors } from '../validation/products'
import type { IProductForm } from '../data/formInput/interface'
// import { validateProduct } from '../validation/products'



interface IProps {
  product: IProducts,
  allColors: string[],
  products: IProducts[],
  setProducts: (products: IProducts[]) => void
}

function ProductCard({ product, allColors, products, setProducts }: IProps) {

  const defaultErrors: IErrors = {
    title: '',
    description: '',
    price: '',
    imgUrl: '',
    colors: ''
  }


  const [productToEdit, setProductToEdit] = useState<IProducts>(product)
  const [errors, setErrors] = useState<IErrors>(defaultErrors)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(categories[0])
  const [colorsToChange, setColorsToChange] = useState<string[]>(productToEdit.colors)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }


  function openDeleteModal() {
    setIsDeleteModalOpen(true)
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false)
  }

  const onCancel = () => {
    setProductToEdit(product)
    setErrors(defaultErrors)
    setColorsToChange(productToEdit.colors)
    closeModal()
  }

  const colorSelecting = (color: string) => {
    if (colorsToChange.includes(color)) {
      return setColorsToChange(colorsToChange.filter(selectedColor => selectedColor !== color))
    }
    setColorsToChange(prev => [...prev, color])
    setErrors({
      ...errors,
      colors: ''
    })
    return
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setProductToEdit({ ...productToEdit, [name]: value })
    setErrors({
      ...errors,
      [name]: ''
    })
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = validateProduct({
      title: productToEdit.title,
      description: productToEdit.description,
      price: productToEdit.price,
      imgUrl: productToEdit.imgUrl,
      colors: colorsToChange
    })

    const noErrorMsg = Object.values(errors).some(errorMsg => errorMsg === '') && Object.values(errors).every(errorMsg => errorMsg === '')

    if (!noErrorMsg) {
      setErrors(errors)
      return
    }

    const updatedProduct: IProducts = {
      ...productToEdit,
      colors: colorsToChange,
      category: selectedCategory
    }

    const updatedProducts = products.map(product => product.id === updatedProduct.id ? updatedProduct : product)
    setProductToEdit(updatedProduct)
    setProducts(updatedProducts)
    closeModal()
  }


  const onEdit = () => {
    console.log('edit', product.id)
    openModal()
  }

  const onDelete = () => {
    const updatedProducts = products.filter(productItem => productItem.id !== product.id)
    setProducts(updatedProducts)
  }















  const editProductInputs = productForm.map((input: IProductForm) => {
    return (
      <div key={input.name}>
        <Input input={input} value={productToEdit[input.name]} onChange={onChangeHandler} ></Input>
        <ErrorMsg>{errors[input.name]}</ErrorMsg>
      </div>
    )
  })


  const allColorsCircles = allColors.map((color, index) => {
    return (
      <ColorCircle key={index} color={color} onClick={() => colorSelecting(color)}></ColorCircle>
    )
  })

  const cardCircleColors = productToEdit.colors.map((color, index) => {
    return (
      <ColorCircle key={index} color={color}></ColorCircle>
    )
  })

  const colorsSelected = colorsToChange.map((color, index) => {
    let textColor = 'text-white'
    color === '#FFFFFF' ? textColor = 'text-black border border-gray-300' : null
    return (
      <span key={index} className={`block w-fit h-fit rounded-sm cursor-pointer p-1 text-[10px] ${textColor}`} style={{ backgroundColor: color }} onClick={() => colorSelecting(color)}>
        {color}
      </span>
    )
  })

  return (
    <>
      <div className="border border-gray-300 max-w-sm md:max-w-lg mx-auto md:mx-0 p-3 flex flex-col justify-between gap-2 rounded-sm">
        <div>
          <Image src={product.imgUrl} alt={product.title} className="w-full h-60 mb-3 object-cover rounded-sm" ></Image>

          <h3 className="text-lg font-bold line-clamp-1 cursor-pointer hover:underline">{product.title}</h3>

          <p className='line-clamp-3'>
            {product.description}
          </p>
        </div>

        <div className='flex flex-col gap-2'>
          <div className="flex items-center gap-2 flex-wrap">
            {cardCircleColors}
          </div>

          <div className="flex justify-between items-center">
            <span>${product.price}</span>
            <div className='flex items-center gap-1'>
              {product.category.name}
              <span className='cursor-pointer'>
                <Image src={product.category.imageUrl} alt="product type" className='w-10 h-10 rounded-full border border-gray-200' ></Image>
              </span>
            </div>
          </div>

          <div className='flex items-center justify-between gap-2'>
            <Button className='bg-indigo-700 hover:bg-indigo-800 transition duration-300' onClick={onEdit}>Edit</Button>
            <Button className='bg-red-700 hover:bg-red-800 transition duration-300' onClick={openDeleteModal}>Delete</Button>
          </div>
        </div>

      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="Edit Product">
        <form className="space-y-3" onSubmit={onSubmitHandler}>

          {editProductInputs}
          <SelectMenu data={categories} selected={selectedCategory} setSelected={setSelectedCategory}></SelectMenu>
          <div className="flex items-center gap-2 flex-wrap">
            {colorsSelected}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              {allColorsCircles}
            </div>
            {errors.colors && <ErrorMsg>{errors.colors}</ErrorMsg>}
          </div>
          <div className='flex items-center justify-between gap-3'>
            <Button className='bg-indigo-700 hover:bg-indigo-600 transition duration-300'>Submit</Button>
            <Button className='bg-gray-700 hover:bg-gray-500 transition duration-300' type="reset" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isDeleteModalOpen} closeModal={closeDeleteModal} title="Delete Product">
        <p>Are you sure you want to delete this product?</p>
        <div className='flex items-center justify-between gap-3 mt-4'>
          <Button className='bg-red-700 hover:bg-red-800 transition duration-300' onClick={onDelete}>Delete</Button>
          <Button className='bg-gray-700 hover:bg-gray-500 transition duration-300' onClick={closeDeleteModal}>Cancel</Button>
        </div>
      </Modal>
    </>
  )
}

export default ProductCard