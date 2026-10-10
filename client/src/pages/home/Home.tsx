import {useEffect, useState, useMemo} from "react"
import Navbar from "../../globals/components/Navbar"
import {Link} from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { fetchProducts } from "../../store/productSlice"
import { getMediaUrl } from "../../http"

type Product = {
  id?: string | number
  productName?: string
  productPrice?: number | string
  productImageUrl?: string
  productTotalStock?: number | string
  Category?: {
    categoryName?: string
  }
}

function Home(){
  const dispatch = useAppDispatch()
  const {products} = useAppSelector(s => s.products)
  const [search, setSearch] = useState("")

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])

  const filteredProducts = useMemo(()=>{
    const q = search.trim().toLowerCase()
    const list = products as Product[]

    if(!q) return list
    return list.filter((p: Product)=>{
      return (p.productName || "").toLowerCase().includes(q)
        || String(p.productPrice || "").toLowerCase().includes(q)
        || (p.Category?.categoryName || "").toLowerCase().includes(q)
    })
  },[products,search])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Hamro Store — Marketplace</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <section className="relative mb-10">
          <div className="relative rounded-lg overflow-hidden">
            <div className="h-72 md:h-96 bg-cover bg-center" style={{backgroundImage: `url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80')`}} />
            <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/30 to-transparent flex items-center">
              <div className="max-w-3xl ml-6 md:ml-12 py-8">
                <h2 className="text-white text-3xl md:text-5xl font-extrabold">Shop trusted brands & great deals</h2>
                <p className="text-white/90 mt-3 md:mt-4">Millions of products. Free shipping on eligible orders.</p>
                <div className="mt-6 flex max-w-md">
                  <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search products, brands and more" className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300 outline-none" />
                  <button type="button" onClick={()=>{}} className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-r-lg cursor-pointer">Search</button>
                </div>
                <div className="mt-4">
                  <Link to="/products" className="inline-block bg-white text-gray-900 px-4 py-2 rounded mr-3 font-medium">Shop Now</Link>
                  {/* <Link to="/products" className="inline-block bg-transparent border border-white text-white px-4 py-2 rounded font-medium opacity-90">Sell on Hamro Dokaan</Link> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products carousel */}
        {/* <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Featured products</h3>
            <div className="space-x-2">
              <button onClick={prev} className="px-3 py-1 border rounded">‹</button>
              <button onClick={next} className="px-3 py-1 border rounded">›</button>
            </div>
          </div> */}

          {/* <div className="overflow-hidden">
            <div className="flex transition-transform duration-500" style={{transform:`translateX(-${idx * (100)}%)`, width: `${Math.max(slides.length,1) * 100}%`}}>
              {slides.length === 0 && (
                <div className="p-10 bg-white rounded shadow w-full">{status === 'loading' ? 'Loading products...' : 'No products found'}</div>
              )}
              {slides.map((p:any, i:number)=> (
                <div key={p.id ?? i} className="w-full md:w-1/3 lg:w-1/4 p-3" style={{flex:`0 0 ${100 / Math.max(slides.length,1)}%`}}>
                  <Link to={`/product/${p.id}`} className="group block bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                    <div className="h-48 bg-gray-100 rounded-t overflow-hidden flex items-center justify-center" style={{backgroundSize:'cover', backgroundPosition:'center', backgroundImage: `url(${getMediaUrl(p.productImageUrl)})`}}>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 line-clamp-2">{p.productName}</h4>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-lg font-bold text-teal-600">${p.productPrice}</span>
                        <span className="text-sm text-gray-500">{p.productTotalStock} in stock</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Grid of products with 3D hover effect */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">All products</h3>
            <Link to="/products" className="text-sm text-teal-600 ">View All Products</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((p: Product)=> (
              <Link to={`/products/${p.id}`} key={p.id} className="group perspective">
                <div className="bg-white rounded-lg p-3 shadow transform transition duration-300 group-hover:-translate-y-2 group-hover:scale-105">
                  <div className="h-40 bg-gray-100 rounded overflow-hidden mb-3 flex items-center justify-center" style={{backgroundSize:'cover', backgroundPosition:'center', backgroundImage:`url(${getMediaUrl(p.productImageUrl)})`}} />
                  <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">{p.productName}</h4>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-teal-600 font-bold">Rs.{p.productPrice}</span>
                    <span className="text-xs text-gray-500">{p.productTotalStock} left</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
        </section>
      </main>
    </div>
  )
}

export default Home
