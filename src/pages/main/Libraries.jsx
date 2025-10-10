import React from "react";
import { Link } from "react-router-dom";

const Libraries = () => {
  return (
    <main className="px-4 py-16 max-w-6xl mx-auto">
      <header className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-black text-neutral-900 mb-4">Libraries</h1>
        <p className="text-neutral-700">
          Find collections of course notes, study guides, and shared resources. Create your own file shelf — public or private.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="h-24 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Data Structures</h3>
          <p className="text-neutral-600 text-sm mb-3">Collection of algorithms, notes, and practice problems</p>
          <div className="flex justify-between items-center text-sm text-neutral-500">
            <span>24 files</span>
            <span>by @alex_student</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="h-24 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-2xl">🧮</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Calculus Notes</h3>
          <p className="text-neutral-600 text-sm mb-3">Complete calculus study guide with examples</p>
          <div className="flex justify-between items-center text-sm text-neutral-500">
            <span>18 files</span>
            <span>by @math_wizard</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="h-24 bg-purple-100 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-2xl">💻</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Web Development</h3>
          <p className="text-neutral-600 text-sm mb-3">HTML, CSS, JavaScript resources and projects</p>
          <div className="flex justify-between items-center text-sm text-neutral-500">
            <span>32 files</span>
            <span>by @web_dev</span>
          </div>
        </div>
      </section>

      <div className="text-center">
        <Link to="/explore" className="btn-cta bg-primary-blue text-white hover:bg-primary-blue/90">
          ← Back to Explore
        </Link>
      </div>
    </main>
  );
};

export default Libraries;
