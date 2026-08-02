import type { IProducts } from '../data/products/interface'
import Image from './ui/Image'
import Button from './ui/Button'
import ColorCircle from './ui/ColorCircle'


interface IProps {
  product: IProducts
}

function ProductCard({ product }: IProps) {


  const colorCircles = product.colors.map((color, index) => {
    return (
      <ColorCircle key={index} color={color}></ColorCircle>
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
            {colorCircles}
          </div>

          <div className="flex justify-between items-center">
            <span>${product.price}</span>
            <span className='cursor-pointer'>
              <Image src={product.category.imageUrl} alt="product type" className='w-10 h-10 rounded-full border border-gray-200' ></Image>
            </span>
          </div>

          <div className='flex items-center justify-between gap-2'>
            <Button className='bg-indigo-700 hover:bg-indigo-800 transition duration-300'>Edit</Button>
            <Button className='bg-red-700 hover:bg-red-800 transition duration-300'>Delete</Button>
          </div>
        </div>

      </div>
    </>
  )
}

export default ProductCard