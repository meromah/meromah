import React from 'react'
import { FiArrowRight } from "react-icons/fi";
import StoryBar from '../components/StoryBar';
const HomePage = () => {
  return (
    <>
    <header className="flex flex-col items-center justify-center text-center min-h-screen px-4 py-20">
        <p className="accent-text text-neutral-700">
          (RECOGNIZED AS THE BEST MVNE GLOBALLY)
        </p>

        <h1 className="text-3xl font-black leading-tight text-neutral-900 max-w-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8">
          Streamline Operations, Skyrocket Revenue, and Delight Customers
        </h1>

        <div className="flex gap-4">
          <div className="group flex justify-between items-center bg-primary-yellow p-0.5 rounded-lg cursor-pointer overflow-hidden w-1/2">
            <button className="flex justify-center items-center cursor-pointer overflow-hidden opacity-0 w-0 px-0 py-3 transition-all duration-500 group-hover:opacity-100 group-hover:w-10 group-hover:px-2">
              <FiArrowRight className="text-neutral-900" />
            </button>
            <div className="relative flex items-center overflow-hidden rounded-md">
              <button className="relative font-semibold font-mono uppercase px-4 text-neutral-900 z-10 group-hover:text-white transition-colors duration-300">
                Services
              </button>
              <div className="bg-primary-bg flex justify-center items-center rounded-md cursor-pointer overflow-hidden opacity-100 w-10 px-2 py-3 transition-all duration-500 group-hover:opacity-0 group-hover:w-0 group-hover:px-0 z-10">
                <FiArrowRight className="text-primary-blue" />
              </div>
              <span className="absolute inset-0 bg-primary-blue rounded translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out origin-right" />
            </div>
          </div>
          <div className="group flex justify-between items-center bg-primary-blue p-0.5 rounded-lg cursor-pointer overflow-hidden">
            <button className="flex justify-center items-center cursor-pointer overflow-hidden opacity-0 w-0 px-0 py-3 transition-all duration-500 group-hover:opacity-100 group-hover:w-10 group-hover:px-2">
              <FiArrowRight className="text-white" />
            </button>
            <div className="relative flex items-center overflow-hidden rounded-md">
              <button className="relative font-semibold text-white font-mono uppercase px-4 z-10 group-hover:text-neutral-900 transition-colors duration-300">
                Services
              </button>
              <div className="bg-primary-bg flex justify-center items-center rounded-md cursor-pointer overflow-hidden opacity-100 w-10 px-2 py-3 transition-all duration-500 group-hover:opacity-0 group-hover:w-0 group-hover:px-0">
                <FiArrowRight className="text-primary-dark" />
              </div>
              <span className="absolute inset-0 -right-0.5 bg-primary-yellow rounded translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out origin-right" />
            </div>
          </div>
        </div>
      </header>
      <section className="flex flex-col gap-8 px-4 py-20 bg-white rounded-2xl">
        <p className="accent-text text-center text-neutral-700 font-semibold">
          (Efficiency, Scalability, and Agility)
        </p>
        <h2 className="text-5xl font-bold text-center leading-tight">
          <span className="block text-primary-blue">Unparalleled</span> BSS/OSS
          Capabilities
        </h2>
        <StoryBar />
      </section>
      <section
        className="flex justify-center items-start p-6 min-h-screen bg-primary-light"
      >
        <div className="w-full md:w-2/3 rounded-xl overflow-hidden border border-secondary-light bg-white/10 backdrop-blur-lg shadow-lg">
          {/* macOS top bar */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border-b border-secondary-light">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-green-400 rounded-full"></span>
            <p
              className="flex-1 text-center text-sm font-medium"
              style={{ color: "var(--neutral-900)" }}
            >
              Python Playground
            </p>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col gap-4">
            {/* Problem Section */}
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: "rgba(25,1,173,0.1)" }}
            >
              <h2
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--primary-dark)" }}
              >
                🚀 Problem
              </h2>
              <p style={{ color: "var(--neutral-900)" }}>
                Write a Python function{" "}
                <code
                  className="px-1 py-0.5 rounded font-mono"
                  style={{
                    backgroundColor: "rgba(25,1,173,0.2)",
                    color: "var(--primary-dark)",
                  }}
                >
                  fibonacci(n)
                </code>{" "}
                that returns the first{" "}
                <code style={{ color: "var(--primary-dark)" }}>n</code> numbers
                of the Fibonacci sequence.
              </p>
              <p className="mt-2" style={{ color: "var(--neutral-700)" }}>
                Example:
                <br />
                Input: <code style={{ color: "var(--primary-dark)" }}>5</code>
                <br />
                Output:{" "}
                <code style={{ color: "var(--primary-dark)" }}>
                  [0, 1, 1, 2, 3]
                </code>
              </p>
            </div>

            {/* Editor */}
            <textarea
              placeholder="# Write your Python code here"
              className="w-full h-40 p-4 rounded-lg font-mono text-sm focus:outline-none"
              style={{
                backgroundColor: "rgba(25,1,173,0.15)",
                color: "var(--neutral-900)",
              }}
            />

            {/* Run Button */}
            <button
              className="self-end px-4 py-2 rounded font-medium hover:brightness-90"
              style={{
                backgroundColor: "var(--primary-yellow)",
                color: "var(--primary-dark)",
              }}
            >
              Run ▶
            </button>

            {/* Output Console */}
            <div
              className="h-24 p-4 rounded-lg overflow-auto font-mono text-sm"
              style={{
                backgroundColor: "rgba(25,1,173,0.1)",
                color: "var(--neutral-900)",
              }}
            >
              <pre># Output will appear here</pre>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage