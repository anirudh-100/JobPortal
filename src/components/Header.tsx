

"use client";

import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-600">
          <Link href="/">JOOB SEEKER</Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link
            href="/login"
            className="px-6 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition-all duration-300"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition-all duration-300"
          >
            Sign Up
          </Link>
          <Link
            href="/help"
            className="px-6 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition-all duration-300"
          >
            Help Center
          </Link>
        </nav>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-2xl text-white">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4 space-y-4 text-center text-white">
          <Link
            href="/login"
            className="block px-6 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition-all duration-300"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="block px-6 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition-all duration-300"
          >
            Sign Up
          </Link>
          <Link
            href="/help"
            className="block px-6 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition-all duration-300"
          >
            Help Center
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
