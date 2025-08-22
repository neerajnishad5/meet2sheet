import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#fc8673] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold">Meet2Sheet</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link to="/dashboard" className="hover:text-gray-200 transition">
            Dashboard
          </Link>
          <Link to="/meetings" className="hover:text-gray-200 transition">
            Meetings
          </Link>
          <Link to="/reports" className="hover:text-gray-200 transition">
            Reports
          </Link>
        </nav>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden focus:outline-none hover:cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 transition-transform duration-300 ease-in-out"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                menuOpen
                  ? "M6 18L18 6M6 6l12 12" // X icon
                  : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-40 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <div className="px-6 pb-4 flex flex-col space-y-3 font-medium">
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="hover:text-gray-200 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/meetings"
            onClick={() => setMenuOpen(false)}
            className="hover:text-gray-200 transition"
          >
            Meetings
          </Link>
          <Link
            to="/reports"
            onClick={() => setMenuOpen(false)}
            className="hover:text-gray-200 transition"
          >
            Reports
          </Link>
        </div>
      </div>
    </header>
  );
}
