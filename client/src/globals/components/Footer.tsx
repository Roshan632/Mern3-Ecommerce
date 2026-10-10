import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white">Hamro Dokaan</h3>
            <p className="mt-3 text-gray-400 max-w-sm">Modern, responsive e-commerce UI built with Tailwind CSS and React.</p>
            <div className="flex items-center space-x-3 mt-4">
              <a href="#" aria-label="twitter" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.93 4.93 0 0 0 2.165-2.724 9.86 9.86 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.38 4.482A13.95 13.95 0 0 1 1.671 3.149a4.916 4.916 0 0 0 1.523 6.56 4.897 4.897 0 0 1-2.228-.616v.06a4.916 4.916 0 0 0 3.946 4.817 4.9 4.9 0 0 1-2.224.084 4.918 4.918 0 0 0 4.588 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.01-7.513 14.01-14.02 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z" />
                </svg>
              </a>
              <a href="#" aria-label="facebook" className="text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.41c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.793.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-semibold">Product</h4>
              <ul className="mt-3 text-gray-400 space-y-2">
                <li><a className="hover:text-white" href="#">All Products</a></li>
                <li><a className="hover:text-white" href="#">New Arrivals</a></li>
                <li><a className="hover:text-white" href="#">Best Sellers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold">Company</h4>
              <ul className="mt-3 text-gray-400 space-y-2">
                <li><a className="hover:text-white" href="#">About</a></li>
                <li><a className="hover:text-white" href="#">Careers</a></li>
                <li><a className="hover:text-white" href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold">Get the newsletter</h4>
              <p className="mt-3 text-gray-400">Subscribe for updates, deals, and insights.</p>
              <form className="mt-4 flex items-center max-w-md" onSubmit={(event) => event.preventDefault()}>
                <input type="email" required maxLength={254} placeholder="Your email" aria-label="Newsletter email" className="w-full px-3 py-2 rounded-l-md bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <button type="submit" className="ml-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-r-md">Subscribe</button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between text-gray-400">
          <p className="text-sm">© {new Date().getFullYear()} HoYo Store. All rights reserved.</p>
          <div className="mt-4 md:mt-0 text-sm">
            <a href="#" className="hover:text-white ml-4">Privacy</a>
            <a href="#" className="hover:text-white ml-4">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer