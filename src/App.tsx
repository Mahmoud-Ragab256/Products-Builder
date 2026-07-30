import ProductCard from "./components/ProductCard"

function App() {
  return (
    <>
      <div className="border border-gray-400 m-5 p-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 rounded-sm">
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
      </div>
    </>
  )
}

export default App