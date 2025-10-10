import React from "react";
import { Link } from "react-router-dom";

const Boards = () => {
  return (
    <main className="px-4 py-16 max-w-6xl mx-auto">
      <header className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-black text-neutral-900 mb-4">Boards & Posts</h1>
        <p className="text-neutral-700">
          Discover discussions, jokes, and debates from fellow UniMe students. Post freely, anonymously, and safely.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="h-24 bg-red-100 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="text-lg font-bold mb-2">General Discussion</h3>
          <p className="text-neutral-600 text-sm mb-3">Chat about anything and everything</p>
          <div className="flex justify-between items-center text-sm text-neutral-500">
            <span>127 posts</span>
            <span>Active now</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="h-24 bg-purple-100 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-2xl">🎓</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Study Groups</h3>
          <p className="text-neutral-600 text-sm mb-3">Find study partners and group sessions</p>
          <div className="flex justify-between items-center text-sm text-neutral-500">
            <span>45 posts</span>
            <span>2 hours ago</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="h-24 bg-orange-100 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-2xl">😂</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Memes & Fun</h3>
          <p className="text-neutral-600 text-sm mb-3">Share memes and have a laugh</p>
          <div className="flex justify-between items-center text-sm text-neutral-500">
            <span>89 posts</span>
            <span>1 hour ago</span>
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

export default Boards;
