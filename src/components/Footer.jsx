import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white border-t border-secondary-light mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row justify-between gap-8">
          {/* Logo and description */}
          <div className="flex flex-col gap-4 md:w-1/3">
            <a href="/">
              <img
                src="https://cdn.prod.website-files.com/66e53bf67b6fc1646ce0777e/6787a3ad95199bfabb23a602_Logo-dark.svg"
                alt="Logo of the project"
                className="w-36"
              />
            </a>
            <p className="text-secondary-light text-sm">
              Streamline operations, skyrocket revenue, and delight customers
              with unparalleled BSS/OSS capabilities.
            </p>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col sm:flex-row gap-12 md:w-2/3 justify-between">
            <div className="flex flex-col gap-2">
              <h4 className="font-mono font-semibold uppercase text-secondary-light">
                Products
              </h4>
              <ul className="flex flex-col gap-1 text-sm">
                <li>
                  <a
                    href="/"
                    className="hover:text-primary-yellow transition-colors"
                  >
                    BSS
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-primary-yellow transition-colors"
                  >
                    OSS
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-primary-yellow transition-colors"
                  >
                    Analytics
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-mono font-semibold uppercase text-secondary-light">
                Resources
              </h4>
              <ul className="flex flex-col gap-1 text-sm">
                <li>
                  <a
                    href="/"
                    className="hover:text-primary-yellow transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-primary-yellow transition-colors"
                  >
                    Docs
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-primary-yellow transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-mono font-semibold uppercase text-secondary-light">
                Company
              </h4>
              <ul className="flex flex-col gap-1 text-sm">
                <li>
                  <a
                    href="/"
                    className="hover:text-primary-yellow transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-primary-yellow transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-primary-yellow transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-secondary-light mt-8 py-4 text-center text-sm text-secondary-light">
          © {new Date().getFullYear()} Meromah. All rights reserved.
        </div>
      </footer>
  )
}

export default Footer