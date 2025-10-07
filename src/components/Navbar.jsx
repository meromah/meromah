import React, { useState } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Products');

  const navLinks = [
    { name: 'Products', href: '#products' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Resources', href: '#resources' },
    { name: 'Services', href: '#services' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className="flex justify-between items-center p-4 text-neutral-700 uppercase border-b border-b-secondary-light bg-primary-bg relative"
      aria-label="Main navigation"
    >
      {/* Logo Section */}
      <div className="flex justify-between items-center gap-2 z-20">
        <a href="/" aria-label="Home">
          <img
            src="https://cdn.prod.website-files.com/66e53bf67b6fc1646ce0777e/6787a3ad95199bfabb23a602_Logo-dark.svg"
            alt="Company Logo"
            className="cursor-pointer h-8 md:h-10"
          />
        </a>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center justify-between gap-8">
        <ul className="flex gap-6 font-mono">
          {navLinks.map((link) => (
            <li key={link.name} className="nav-list-item">
              <a 
                href={link.href}
                onClick={() => handleLinkClick(link.name)}
                className={`transition-colors duration-200 ${
                  activeLink === link.name 
                    ? 'text-primary-blue font-semibold' 
                    : 'text-neutral-700'
                }`}
                aria-current={activeLink === link.name ? 'page' : undefined}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-4 font-mono">
          <a 
            href="#contact" 
            className="btn-cta"
            role="button"
          >
            Get In Touch
          </a>
          <a 
            href="#booking" 
            className="btn-cta bg-primary-yellow text-neutral-900 font-semibold hover:bg-primary-yellow/90"
            role="button"
          >
            Book a Meeting
          </a>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden z-20 p-2 rounded-lg hover:bg-primary-blue/10 transition-colors duration-200"
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
          className="fixed inset-0 bg-neutral-900/50 z-10 lg:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-72 bg-primary-bg shadow-2xl z-10 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {/* Mobile Navigation Links */}
          <ul className="flex flex-col gap-4 font-mono mb-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => handleLinkClick(link.name)}
                  className={`block py-3 px-4 rounded-lg transition-all duration-200 ${
                    activeLink === link.name
                      ? 'bg-primary-blue/10 text-primary-blue font-semibold'
                      : 'text-neutral-700 hover:bg-primary-blue/5 hover:text-primary-blue'
                  }`}
                  aria-current={activeLink === link.name ? 'page' : undefined}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile CTA Buttons */}
          <div className="flex flex-col gap-4 font-mono mt-auto mb-8">
            <a
              href="#contact"
              className="btn-cta text-center"
              role="button"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get In Touch
            </a>
            <a
              href="#booking"
              className="btn-cta bg-primary-yellow text-neutral-900 font-semibold hover:bg-primary-yellow/90 text-center"
              role="button"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book a Meeting
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;