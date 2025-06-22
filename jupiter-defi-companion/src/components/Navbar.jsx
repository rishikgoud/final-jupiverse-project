import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/routes", label: "Routes" },
    { path: "/advanced", label: "Advanced" },
    { path: "/sentiment", label: "Sentiment" },
    { path: "/chat", label: "Chat" },
  ];

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-jupiterDark shadow-lg relative z-50">
      <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-jupiterCyan bg-clip-text text-transparent">
        CoinVerse
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-4">
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className="relative group px-3 py-1"
          >
            <span className={`relative z-10 ${location.pathname === link.path ? 'text-jupiterCyan' : 'text-white'}`}>
              {link.label}
            </span>
            <span
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out
              bg-gradient-to-r from-jupiterHoverFrom to-jupiterHoverTo"
            ></span>
          </Link>
        ))}
      </div>

      {/* Hamburger for mobile */}
      <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-jupiterDark flex flex-col gap-2 py-4 md:hidden shadow-lg">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-6 py-2 ${location.pathname === link.path ? 'text-jupiterCyan' : 'text-white'} hover:bg-gradient-to-r from-jupiterHoverFrom to-jupiterHoverTo rounded-lg transition`}
              onClick={() => setMenuOpen(false)}  // Close menu on click
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
