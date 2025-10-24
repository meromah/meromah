import React from "react";
import { FaUsers, FaFileAlt, FaHeart } from "react-icons/fa";

const BoardHeader = ({ board }) => {
  if (!board) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="animate-pulse">
          <div className="h-4 bg-neutral-200 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-neutral-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
        <img
          src={board.coverImage}
          alt={`${board.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Board Info */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">
              {board.name}
            </h1>
            <p className="text-neutral-700 mb-4">
              {board.description}
            </p>
            
            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <FaUsers className="text-primary-blue" />
                <span>{board.memberCount} members</span>
              </div>
              <div className="flex items-center gap-2">
                <FaFileAlt className="text-primary-blue" />
                <span>{board.postCount} posts</span>
              </div>
            </div>
          </div>

          {/* Follow Button */}
          <div className="flex-shrink-0">
            <button className="flex items-center gap-2 px-6 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-blue/90 transition-colors duration-200 font-medium">
              <FaHeart className="text-sm" />
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardHeader;
