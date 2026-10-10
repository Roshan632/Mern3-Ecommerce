
import { Link } from "react-router-dom"
import { ShoppingBag, ShieldCheck, Truck, Headphones, ArrowRight, Heart } from "lucide-react"
import logo from "././../../assets/hamrostorelogo.jpg"
import Navbar from "../../globals/components/Navbar"

function About() {
  return (
    <>
      <Navbar />
    
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
          <div className="max-w-xl">
            <span className="inline-flex items-center rounded-full border border-teal-100 bg-white px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Welcome to Hamro Store
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Shopping made
              <span className="block text-teal-600">simple for you.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
              Discover a convenient way to shop for the products you need.
              At Hamro Store, we aim to make your shopping experience easy,
              comfortable, and enjoyable.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition-all hover:-translate-y-0.5 hover:bg-teal-700"
              >
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:border-teal-200 hover:text-teal-700"
              >
                Back to Home
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -left-5 -top-5 h-28 w-28 rounded-full bg-teal-200/50 blur-2xl" />
            <div className="absolute -bottom-5 -right-5 h-32 w-32 rounded-full bg-cyan-200/50 blur-2xl" />

            <div className="relative rounded-3xl border border-white bg-white p-5 shadow-2xl shadow-teal-900/10 sm:p-8">
              <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 p-8 sm:p-12">
                <img
                  src={logo}
                  alt="Hamro Store logo"
                  className="mx-auto aspect-square w-40 rounded-2xl border-4 border-white object-cover shadow-xl sm:w-52"
                />

                <div className="mt-7 text-center">
                  <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                    Hamro <span className="text-teal-600">Store</span>
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Your shopping, made easier.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-teal-50 px-4 py-3 text-sm font-medium text-teal-800">
                <Heart className="h-4 w-4 fill-teal-600 text-teal-600" />
                Made with care for our customers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            Who We Are
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to shop online
          </h2>

          <p className="mt-6 text-base leading-8 text-gray-600 sm:text-lg">
            Hamro Store is designed to bring products and customers together
            through a simple and accessible online shopping experience. Our
            goal is to help customers browse products, explore their options,
            and manage their shopping conveniently from one place.
          </p>

          <p className="mt-4 text-base leading-8 text-gray-600">
            We believe online shopping should be straightforward. That is why
            we focus on clear product information, easy navigation, and a
            smooth shopping journey from browsing to checkout.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="border-y border-gray-100 bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
              Why Hamro Store
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Shopping with convenience
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We want to make every step of your shopping experience simpler
              and more comfortable.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <article className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Easy Shopping
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Browse available products and explore your options through a
                simple, user-friendly interface.
              </p>
            </article>

            <article className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Customer Focus
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                We aim to provide clear information and a dependable shopping
                experience for every customer.
              </p>
            </article>

            <article className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Convenient Orders
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Keep your shopping organized and access your cart and orders
                through your store account.
              </p>
            </article>

            <article className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-900/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                <Headphones className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Here to Help
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                We value customer questions and feedback as part of a better
                shopping experience.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Shopping Steps */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
              Simple and Convenient
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Your shopping journey in three steps
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Finding what you need should not be complicated. Hamro Store
              keeps the shopping process easy to follow.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 rounded-2xl border border-gray-100 p-5 transition-colors hover:border-teal-100 hover:bg-teal-50/50">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-base font-bold text-white">
                01
              </span>
              <div>
                <h3 className="font-bold text-gray-900">Discover Products</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Visit our products page and browse the available collection.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-gray-100 p-5 transition-colors hover:border-teal-100 hover:bg-teal-50/50">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-base font-bold text-white">
                02
              </span>
              <div>
                <h3 className="font-bold text-gray-900">Add to Your Cart</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Choose the products you want and organize them in your cart.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-gray-100 p-5 transition-colors hover:border-teal-100 hover:bg-teal-50/50">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-base font-bold text-white">
                03
              </span>
              <div>
                <h3 className="font-bold text-gray-900">Place Your Order</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Continue through your store's checkout process to complete
                  your purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 pb-16 sm:px-6 md:pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-teal-700 to-teal-600 px-6 py-12 text-center shadow-xl shadow-teal-900/10 sm:px-12 sm:py-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready to start shopping?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-teal-50">
            Explore our products and discover a simpler way to shop with
            Hamro Store.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-teal-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-teal-50"
          >
            Shop Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
    </>
  )
}

export default About
