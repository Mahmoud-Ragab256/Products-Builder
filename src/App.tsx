import { useEffect, useState } from "react"
import type { IProducts } from "./data/products/interface"
import productsData from './data/products/products.json'
import ProductCard from "./components/ProductCard"

function App() {

  const [products, setProducts] = useState<IProducts[]>([])

  useEffect(() => {
    setProducts(productsData)
  }, [])

  const cards = products.map(product => <ProductCard product={product} key={product.id}></ProductCard>)

  return (
    <>
      <main className="container mx-auto">
        <div className="p-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {cards}
        </div>
      </main>
    </>
  )
}

export default App