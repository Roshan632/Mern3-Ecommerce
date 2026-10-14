
import React, { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import {
    ShoppingBag,
    Facebook,
    Twitter,
    Instagram,
    Mail,
    ArrowRight,
    MapPin,
} from "lucide-react"

const Footer: React.FC = () => {
    const [email, setEmail] = useState("")

    const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Connect this handler to your newsletter API when available.
        setEmail("")
    }

    return (
        <footer className="bg-gray-950 text-gray-300">
            <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

                    {/* Brand */}
                    <div>
                        <Link to="/" className="inline-flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600 text-white">
                                <ShoppingBag size={24} />
                            </div>

                            <span className="text-2xl font-bold tracking-tight text-white">
                                Hamro <span className="text-teal-400">Store</span>
                            </span>
                        </Link>

                        <p className="mt-5 max-w-xs text-sm leading-7 text-gray-400">
                            Your trusted destination for quality products at great prices.
                            Shop with confidence and enjoy a simple, convenient experience.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 text-gray-400 transition hover:border-teal-500 hover:bg-teal-600 hover:text-white"
                            >
                                <Facebook size={18} />
                            </a>

                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 text-gray-400 transition hover:border-teal-500 hover:bg-teal-600 hover:text-white"
                            >
                                <Instagram size={18} />
                            </a>

                            <a
                                href="https://twitter.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Twitter"
                                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 text-gray-400 transition hover:border-teal-500 hover:bg-teal-600 hover:text-white"
                            >
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-base font-semibold text-white">
                            Quick Links
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm">
                            <li>
                                <Link to="/" className="transition hover:text-teal-400">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="transition hover:text-teal-400">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="transition hover:text-teal-400">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/my-cart" className="transition hover:text-teal-400">
                                    My Cart
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-base font-semibold text-white">
                            Customer Service
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm">
                            <li>
                                <Link to="/login" className="transition hover:text-teal-400">
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="transition hover:text-teal-400">
                                    Create Account
                                </Link>
                            </li>
                            <li>
                                <a href="mailto:support@hamrostore.com" className="transition hover:text-teal-400">
                                    Contact Support
                                </a>
                            </li>
                        </ul>

                        <div className="mt-6 space-y-3 text-sm text-gray-400">
                            <p className="flex items-start gap-3">
                                <Mail size={17} className="mt-0.5 shrink-0 text-teal-400" />
                                support@hamrostore.com
                            </p>
                            <p className="flex items-start gap-3">
                                <MapPin size={17} className="mt-0.5 shrink-0 text-teal-400" />
                                Nepal
                            </p>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-base font-semibold text-white">
                            Stay in the Loop
                        </h3>

                        <p className="mt-5 text-sm leading-6 text-gray-400">
                            Get updates about new arrivals, special offers, and exclusive deals.
                        </p>

                        <form onSubmit={handleSubscribe} className="mt-5">
                            <label htmlFor="newsletter-email" className="sr-only">
                                Email address
                            </label>

                            <div className="flex overflow-hidden rounded-xl border border-gray-800 bg-gray-900 p-1.5 transition focus-within:border-teal-500">
                                <input
                                    id="newsletter-email"
                                    type="email"
                                    required
                                    maxLength={254}
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="Enter your email"
                                    className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500"
                                />

                                <button
                                    type="submit"
                                    aria-label="Subscribe to newsletter"
                                    className="flex shrink-0 items-center justify-center rounded-lg bg-teal-600 px-3 text-white transition hover:bg-teal-500"
                                >
                                    <ArrowRight size={19} />
                                </button>
                            </div>
                        </form>

                        <p className="mt-3 text-xs leading-5 text-gray-500">
                            Subscribe for store updates and offers.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-gray-800 pt-6">
                    <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} Hamro Store. All rights reserved.
                        </p>

                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <Link to="/about" className="transition hover:text-teal-400">
                                About
                            </Link>
                            <a href="mailto:support@hamrostore.com" className="transition hover:text-teal-400">
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;