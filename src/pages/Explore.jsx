import React from "react";
import { Link } from "react-router-dom";

const Explore = () => {
  return (
    <main className="px-4 py-16 max-w-6xl mx-auto">
      <header className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-black text-neutral-900 mb-4">Explore</h1>
        <p className="text-neutral-700">
          Ready to explore what students are building and sharing? Browse quizzes, libraries, or boards — all created by UniMe students like you.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 flex flex-col">
          <div className="h-32 bg-secondary-light rounded-lg mb-4" aria-hidden="true" />
          <h2 className="text-xl font-bold mb-2">Tests & Quizzes</h2>
          <p className="text-neutral-700 flex-1">Try real UniMe-style algorithmic problems and MCQs. Create your own quizzes and share them.</p>
          <Link to="/explore/quizzes" className="btn-cta inline-block mt-4">Take a test →</Link>
        </div>

        <div className="bg-white rounded-2xl p-6 flex flex-col">
          <div className="h-32 bg-secondary-light rounded-lg mb-4" aria-hidden="true" />
          <h2 className="text-xl font-bold mb-2">Libraries</h2>
          <p className="text-neutral-700 flex-1">Find collections of course notes, study guides, and shared resources. Create your own file shelf — public or private.</p>
          <Link to="/explore/libraries" className="btn-cta inline-block mt-4">Open a library →</Link>
        </div>

        <div className="bg-white rounded-2xl p-6 flex flex-col">
          <div className="h-32 bg-secondary-light rounded-lg mb-4" aria-hidden="true" />
          <h2 className="text-xl font-bold mb-2">Boards & Posts</h2>
          <p className="text-neutral-700 flex-1">Discover discussions, jokes, and debates from fellow UniMe students. Post freely, anonymously, and safely.</p>
          <Link to="/explore/boards" className="btn-cta inline-block mt-4">Read the boards →</Link>
        </div>
      </section>
    </main>
  );
};

export default Explore;


