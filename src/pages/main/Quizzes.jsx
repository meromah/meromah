import React from "react";
import { Link } from "react-router-dom";

const Quizzes = () => {
  return (
    <main className="px-4 py-16 max-w-6xl mx-auto">
      <header className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-black text-neutral-900 mb-4">Tests & Quizzes</h1>
        <p className="text-neutral-700">
          Try real UniMe-style algorithmic problems and MCQs. Create your own quizzes and share them.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="h-24 bg-green-100 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-2xl">🧠</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Data Structures Quiz</h3>
          <p className="text-neutral-600 text-sm mb-3">Test your knowledge of arrays, linked lists, and trees</p>
          <div className="flex justify-between items-center text-sm text-neutral-500">
            <span>15 questions</span>
            <span>by @ds_expert</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="h-24 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Algorithm Practice</h3>
          <p className="text-neutral-600 text-sm mb-3">Coding challenges with real-time feedback</p>
          <div className="flex justify-between items-center text-sm text-neutral-500">
            <span>8 problems</span>
            <span>by @algo_master</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="h-24 bg-yellow-100 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Math Fundamentals</h3>
          <p className="text-neutral-600 text-sm mb-3">Quick math review for computer science</p>
          <div className="flex justify-between items-center text-sm text-neutral-500">
            <span>20 questions</span>
            <span>by @math_teacher</span>
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

export default Quizzes;
