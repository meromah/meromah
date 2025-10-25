import React, { useMemo, useState, useEffect } from "react";
import PostCard from "./PostCard";
import { FaInbox, FaClock, FaFire, FaLayerGroup } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { mockPosts } from "../../../utils";
import { useCheckApiQuery } from "../../../services/api";

const Feeds = ({ userBoards = ["Algorithms 101", "Discrete Math"] }) => {
  const { data, error, isLoading } = useCheckApiQuery();
  console.log("API Status:", { data, error, isLoading });
  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("feedFilter") || "Latest";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    localStorage.setItem("feedFilter", filter);
  }, [filter]);

  const filtered = useMemo(() => {
    let posts = mockPosts;

    // Apply filter
    switch (filter) {
      case "Popular":
        posts = [...posts].sort((a, b) => b.likes - a.likes);
        break;
      case "My Boards":
        posts = posts.filter((p) => userBoards.includes(p.board));
        break;
      default:
        posts = [...posts];
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.text.toLowerCase().includes(query) ||
          p.board.toLowerCase().includes(query) ||
          p.author.name.toLowerCase().includes(query) ||
          p.author.username.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query))
      );
    }

    return posts;
  }, [filter, searchQuery, userBoards]);

  const handleFilterChange = (newFilter) => {
    setIsTransitioning(true);
    setFilter(newFilter);
    setTimeout(() => setIsTransitioning(false), 150);
  };

  const filters = [
    { value: "Latest", icon: FaClock, label: "Latest" },
    { value: "Popular", icon: FaFire, label: "Popular" },
    { value: "My Boards", icon: FaLayerGroup, label: "My Boards" },
  ];

  return (
    <div className="p-4 md:p-6">
      {/* Search bar */}
      <div className="flex items-center  gap-3 bg-white border border-neutral-200 rounded-lg mb-3 p-3">
        <FiSearch className="text-neutral-400 text-lg hover:text-neutral-500 cursor-pointer" />
        <input
          type="text"
          placeholder="Search posts, boards, or people..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-sm text-neutral-900 placeholder-neutral-500 focus:outline-none"
          aria-label="Search posts"
        />
      </div>

      {/* Reddit-style filter bar */}
      <div className="bg-white border border-neutral-200 rounded-lg mb-4 p-2 flex items-center gap-1">
        {filters.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => handleFilterChange(value)}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150
              ${
                filter === value
                  ? "bg-neutral-100 text-neutral-900"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              }
              focus:outline-none cursor-pointer
            `}
            aria-label={`Filter by ${label}`}
            aria-pressed={filter === value}
          >
            <Icon className="text-xs" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        className={`transition-opacity duration-150 ${
          isTransitioning ? "opacity-40" : "opacity-100"
        }`}
        role="region"
        aria-live="polite"
        aria-label="Feed posts"
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-neutral-100 rounded-full p-6 mb-4">
              <FaInbox className="text-4xl text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              No posts yet
            </h3>
            <p className="text-neutral-600 text-sm text-center max-w-sm">
              {searchQuery.trim()
                ? `No results found for "${searchQuery}"`
                : filter === "My Boards"
                ? "No posts from your boards. Check other filters."
                : "Be the first to post something!"}
            </p>
          </div>
        ) : (
          <div className="">
            {filtered.map((post, i) => {
              const isFirst = i === 0;
              const isLast = i === filtered.length - 1;
              return (
              <PostCard key={post.id} post={post} isFirst={isFirst} isLast={isLast} />
            )})}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feeds;
