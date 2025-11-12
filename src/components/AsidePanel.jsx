import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const AsidePanel = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  const announcements = [
    {
      id: 1,
      title: "New Feature: Enhanced Search",
      content: "We've improved our search functionality with better filters and faster results.",
      date: "2 days ago",
    },
    {
      id: 2,
      title: "Community Guidelines Update",
      content: "Please review our updated community guidelines to ensure a positive experience for everyone.",
      date: "1 week ago",
    },
    {
      id: 3,
      title: "Maintenance Scheduled",
      content: "Scheduled maintenance will occur this weekend. Services may be temporarily unavailable.",
      date: "2 weeks ago",
    },
  ];

  const communities = [
    {
      id: 1,
      name: "StudyHub",
      description: "Academic discussions and study tips",
      members: "1.2k",
    },
    {
      id: 2,
      name: "TechTalk",
      description: "Technology and programming discussions",
      members: "856",
    },
    {
      id: 3,
      name: "BookClub",
      description: "Share and discuss your favorite books",
      members: "432",
    },
  ];

  const handleJoin = (e, communityName) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement join functionality
    console.log(`Joining ${communityName}`);
  };

  return (
    <aside className="xl:h-screen xl:sticky xl:top-0 overflow-y-auto scrollbar-hide px-4 py-6 space-y-6">
      {/* Search Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
        <h2 className="text-sm font-semibold text-neutral-900 mb-3">Search</h2>
        <form onSubmit={handleSearch} className="space-y-2">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts, communities..."
              className="w-full px-3 py-2 pl-10 pr-4 text-sm text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-colors"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary-blue text-white rounded-lg text-sm font-medium hover:bg-primary-blue/90 transition-colors duration-200"
          >
            Search
          </button>
        </form>
      </div>

      {/* Announcements Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
        <h2 className="text-sm font-semibold text-neutral-900 mb-3">
          Announcements
        </h2>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="pb-4 border-b border-neutral-100 last:border-b-0 last:pb-0"
            >
              <h3 className="text-sm font-medium text-neutral-900 mb-1">
                {announcement.title}
              </h3>
              <p className="text-xs text-neutral-600 mb-2">
                {announcement.content}
              </p>
              <p className="text-xs text-neutral-500">{announcement.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Who To Join Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
        <h2 className="text-sm font-semibold text-neutral-900 mb-3">
          Who To Join
        </h2>
        <div className="space-y-3">
          {communities.map((community) => (
            <div
              key={community.id}
              className="flex items-start justify-between gap-3 p-2 hover:bg-neutral-50 rounded-lg transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-neutral-900 mb-0.5">
                  {community.name}
                </h3>
                <p className="text-xs text-neutral-600 line-clamp-1">
                  {community.description}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  {community.members} members
                </p>
              </div>
              <button
                onClick={(e) => handleJoin(e, community.name)}
                className="bg-white text-primary-blue px-4 py-1.5 rounded-full text-xs font-bold hover:bg-primary-blue/10 border border-primary-blue transition-colors cursor-pointer flex-shrink-0"
              >
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default AsidePanel;

