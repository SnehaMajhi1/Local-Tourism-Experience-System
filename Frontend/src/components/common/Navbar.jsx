import React from 'react'
import { Heart } from 'lucide-react'

const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">

        {/* Logo */}
        <div className="flex flex-col">
          <h1 className="font-['Cinzel'] text-2xl font-bold tracking-wide text-white">
            LOCAL TOURISM
          </h1>

          <span className="font-['Montserrat'] text-xs tracking-[0.25em] text-white/75">
            Experience Marketplace
          </span>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-8">

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="/"
              className="text-sm font-medium text-[#d8a84e] transition-colors"
            >
              Home
            </a>

            <a
              href="/experiences"
              className="text-sm font-medium text-white transition-colors hover:text-[#d8a84e]"
            >
              Experiences
            </a>

            <a
              href="/hosts"
              className="text-sm font-medium text-white transition-colors hover:text-[#d8a84e]"
            >
              Hosts
            </a>

            <a
              href="/about"
              className="text-sm font-medium text-white transition-colors hover:text-[#d8a84e]"
            >
              About
            </a>

            <a
              href="/contact"
              className="text-sm font-medium text-white transition-colors hover:text-[#d8a84e]"
            >
              Contact
            </a>
          </nav>

          {/* Heart */}
          <button
            className="text-white transition hover:text-[#d8a84e]"
            aria-label="Favorites"
          >
            <Heart size={20} strokeWidth={1.8} />
          </button>

          {/* Login */}
          <a
            href="/login"
            className="text-sm font-medium text-white transition hover:text-[#d8a84e]"
          >
            Login
          </a>

     

{/* Sign Up */}
<a
  href="/signup"
  className="rounded-[10px] bg-[#0C5C39] px-5 py-3 text-sm font-semibold text-white"
>
  Sign Up
</a>

        </div>
      </div>
    </header>
  )
}

export default Navbar