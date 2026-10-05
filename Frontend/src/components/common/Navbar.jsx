import React from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">

        {/* Logo */}
        <Link to="/" className="flex flex-col">
          <h1 className="font-['Cinzel'] text-2xl font-bold tracking-wide text-white">
            LOCAL TOURISM
          </h1>

          <span className="font-['Montserrat'] text-xs tracking-[0.25em] text-white/75">
            Experience Marketplace
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-sm font-medium text-white transition-colors hover:text-[#d8a84e]"
            >
              Home
            </Link>

            <Link
              to="/experiences"
              className="text-sm font-medium text-[#d8a84e] transition-colors"
            >
              Experiences
            </Link>

            <Link
              to="/about"
              className="text-sm font-medium text-white transition-colors hover:text-[#d8a84e]"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-sm font-medium text-white transition-colors hover:text-[#d8a84e]"
            >
              Contact
            </Link>
          </nav>

          {/* Heart */}
          <button
            className="text-white transition hover:text-[#d8a84e]"
            aria-label="Favorites"
          >
            <Heart size={20} strokeWidth={1.8} />
          </button>

          {/* Login */}
          <Link
            to="/login"
            className="text-sm font-medium text-white transition hover:text-[#d8a84e]"
          >
            Login
          </Link>

          {/* Sign Up */}
          <Link
            to="/signup"
            className="rounded-[10px] bg-[#0C5C39] px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-900 transition"
          >
            Sign Up
          </Link>

        </div>
      </div>
    </header>
  )
}

export default Navbar