import React from "react";
import { FiArrowRight } from "react-icons/fi";

const App = () => {
  return (
    <div>
      <nav className="flex justify-between items-center p-4 text-light-text uppercase border-b border-b-neutral-700">
        <div className="flex justify-between items-center gap-2">
          <a href="/">
            <img
              src="https://cdn.prod.website-files.com/66e53bf67b6fc1646ce0777e/6787a3ad95199bfabb23a602_Logo-dark.svg"
              alt="Logo of the project"
              className="cursor-pointer"
            />
          </a>
        </div>
        <div className="flex items-center justify-between gap-8">
          <ul className="flex gap-4 font-mono">
            <li className="nav-list-item">
              <a href="/">Products</a>
              </li>
            <li className="nav-list-item">
              <a href="/">Solutions</a>
              </li>
            <li className="nav-list-item">
              <a href="/">Resources</a>
              </li>
            <li className="nav-list-item">
              <a href="/">Services</a>
              </li>
          </ul>
          <div className="flex gap-4 font-mono">
            <button className="btn-cta">Get In Touch</button>
            <button className="btn-cta bg-accent-bg text-dark-text font-semibold outline-accent-bg">
              Book a Meeting
            </button>
          </div>
        </div>
      </nav>
      <header className="flex flex-col items-center justify-center text-center min-h-screen px-4 py-20">
        <p className="font-mono text-xs text-main-bg opacity-60 mb-4">
          (RECOGNIZED AS THE BEST MVNE GLOBALLY)
        </p>

        <h1 className="text-3xl font-black leading-tight text-light-text max-w-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8">
          Streamline Operations, Skyrocket Revenue, and Delight Customers
        </h1>

        <div className="flex gap-4">
          <div className="group flex justify-between items-center bg-accent-dark p-0.5 rounded-lg cursor-pointer overflow-hidden w-1/2">
            {/* Left arrow (appears on hover) */}
            <button className="flex justify-center items-center cursor-pointer overflow-hidden opacity-0 w-0 px-0 py-3 transition-all duration-500 group-hover:opacity-100 group-hover:w-10 group-hover:px-2">
              <FiArrowRight className="text-light-text" />
            </button>
            {/* Center section (text + right arrow + sweeper) */}
            <div className="relative flex items-center overflow-hidden rounded-md">
              <button className="relative font-semibold font-mono uppercase px-4 text-light-text z-10">
                Services
              </button>
              <div className="bg-dark-bg flex justify-center items-center rounded-md cursor-pointer overflow-hidden opacity-100 w-10 px-2 py-3 transition-all duration-500 group-hover:opacity-0 group-hover:w-0 group-hover:px-0 z-10">
                <FiArrowRight className="text-accent-bg" />
              </div>
              {/* Sweeper background */}
              <span
                className="absolute inset-0 bg-dark-bg rounded translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out origin-right"
              />
            </div>
          </div>
          <div className="group flex justify-between items-center bg-accent-bg p-0.5 rounded-lg cursor-pointer overflow-hidden">
            {/* Left arrow (appears on hover) */}
            <button className="flex justify-center items-center cursor-pointer overflow-hidden opacity-0 w-0 px-0 py-3 transition-all duration-500 group-hover:opacity-100 group-hover:w-10 group-hover:px-2">
              <FiArrowRight className="text-dark-text" />
            </button>
            {/* Center section (text + right arrow + sweeper) */}
            <div className="relative flex items-center overflow-hidden rounded-md">
              <button className="relative font-semibold text-dark-text font-mono uppercase px-4 z-10 group-hover:text-light-text transition-colors duration-300">
                Services
              </button>
              <div className="bg-dark-bg flex justify-center items-center rounded-md cursor-pointer overflow-hidden opacity-100 w-10 px-2 py-3 transition-all duration-500 group-hover:opacity-0 group-hover:w-0 group-hover:px-0">
                <FiArrowRight className="text-accent-bg" />
              </div>
              {/* Sweeper background */}
              <span
                className="absolute inset-0 bg-dark-bg rounded translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out origin-right"
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
