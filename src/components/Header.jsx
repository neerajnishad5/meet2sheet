import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname: currentPath } = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/meetings", label: "Meetings" },
    { to: "/reports", label: "Reports" },
  ];

  const getLinkClasses = (path) =>
    `hover:text-gray-200 transition px-2 py-1 ${
      currentPath === path
        ? "border border-white dark:border-gray-300 rounded-md"
        : ""
    }`;

  const handleNavClick = (to) => {
    setMenuOpen(false);
    navigate(to);
  };

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <header
      className={`w-full  bg-[#fc8673] text-white shadow-md ${
        menuOpen && "pb-4 md:pb-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => handleNavClick("/")}
        >
          Meet2Sheet
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 font-medium">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={getLinkClasses(to)}>
              {label}
            </Link>
          ))}

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="ml-4 p-2 rounded-md hover:bg-white/10 transition hover:cursor-pointer"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <MdOutlineLightMode size="20" />
            ) : (
              <MdOutlineDarkMode size="20" />
            )}
          </button>
        </nav>

        {/* Mobile Dark Mode Toggle + Hamburger Icon  */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Dark Mode Toggle Button for Mobile */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md hover:bg-white/10 transition hover:cursor-pointer"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <MdOutlineLightMode size="20" />
            ) : (
              <MdOutlineDarkMode size="20" />
            )}
          </button>

          {/* Hamburger Icon */}
          <button
            className="focus:outline-none hover:cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <RxCross2 size="25" /> : <GiHamburgerMenu size="20" />}
          </button>
        </div>
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
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => handleNavClick(to)}
              className={getLinkClasses(to)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
