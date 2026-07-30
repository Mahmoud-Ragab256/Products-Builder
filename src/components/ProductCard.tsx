import productImage from '../assets/productCard/2025-bmw-4-series-competition-coupe-angular-front-exterior-view_100958131_l (1).png'
import Image from './ui/Image'
import Button from './ui/Burron'
function ProductCard() {
  return (
    <>
      <div className="border border-gray-300 p-2 flex flex-col gap-2 rounded-sm">
        <Image src={productImage} alt="Product Image"></Image>

        <h3 className="text-lg font-bold">BMW M4</h3>

        <p>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className="my-3 flex items-center space-x-2">
          <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer"></span>
          <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer"></span>
          <span className="w-5 h-5 bg-green-600 rounded-full cursor-pointer"></span>
        </div>

        <div className="flex justify-between items-center">
          <span>$500,000</span>
          <span className='cursor-pointer'>
            <Image src={productImage} alt="product type" className='w-12 h-12 rounded-full border border-gray-200' ></Image>
          </span>
        </div>

        <div className='flex items-center justify-between gap-2'>
          <Button className='bg-indigo-700'>Edit</Button>
          <Button className='bg-red-700'>Delete</Button>
        </div>

      </div>
    </>
  )
}

export default ProductCard