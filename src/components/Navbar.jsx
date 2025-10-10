import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation links configuration
  const navLinks = [
    { name: 'Explore', path: '/explore' },
    { name: 'Contact', path: '/contact' },
    { name: 'About Us', path: '/about' },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className="flex justify-between items-center p-4 text-neutral-700 uppercase border-b border-b-secondary-light bg-primary-bg relative"
      aria-label="Main navigation"
    >
      {/* Logo Section */}
      <div className="flex justify-between items-center gap-2 z-20">
        <Link to="/" aria-label="Home">
          <img
            src="https://cdn.prod.website-files.com/66e53bf67b6fc1646ce0777e/6787a3ad95199bfabb23a602_Logo-dark.svg"
            alt="Company Logo"
            className="cursor-pointer h-8 md:h-10 transition-transform duration-200 hover:scale-105"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center justify-between gap-8">
        <ul className="flex gap-6 font-mono">
          {navLinks.map((link) => (
            <li key={link.name} className="nav-list-item">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors duration-200 ${
                    isActive
                      ? 'text-primary-blue font-semibold'
                      : 'text-neutral-700 hover:text-primary-blue'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex gap-4 font-mono">
          <Link 
            to="/register" 
            className="btn-cta"
          >
            Register
          </Link>
          <Link 
            to="/login" 
            className="btn-cta bg-primary-yellow text-neutral-900 font-semibold hover:bg-primary-yellow/90"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden z-50 p-2 rounded-lg hover:bg-primary-blue/10 transition-colors duration-200"
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        {isMobileMenuOpen ? (
          <HiX className="text-2xl text-neutral-900" />
        ) : (
          <HiMenuAlt3 className="text-2xl text-neutral-900" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-neutral-900/50 z-40 lg:hidden animate-fade-in"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-72 bg-primary-bg shadow-2xl z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {/* Mobile Navigation Links */}
          <ul className="flex flex-col gap-4 font-mono mb-8" role="menu">
            {navLinks.map((link) => (
              <li key={link.name} role="none">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-blue/10 text-primary-blue font-semibold'
                        : 'text-neutral-700 hover:bg-primary-blue/5 hover:text-primary-blue'
                    }`
                  }
                  role="menuitem"
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile CTA Buttons */}
          <div className="flex flex-col gap-4 font-mono mt-auto mb-8">
            <Link
              to="/register"
              className="btn-cta text-center"
              onClick={closeMobileMenu}
            >
              Register
            </Link>
            <Link
              to="/login"
              className="btn-cta bg-primary-yellow text-neutral-900 font-semibold hover:bg-primary-yellow/90 text-center"
              onClick={closeMobileMenu}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;