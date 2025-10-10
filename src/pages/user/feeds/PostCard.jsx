import React, { useState } from "react";
import {
  FaRegComment,
  FaRegHeart,
  FaHeart,
  FaRegShareSquare,
  FaArrowDown,
} from "react-icons/fa";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const likeCount = post.likes + (liked ? 1 : 0);

  return (
    <div className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
      {/* Author */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={post.author.avatar}
          alt={post.author.username}
          className="w-8 h-8 rounded-full shadow shadow-neutral-200"
        />
        <div>
          <p className="font-semibold text-primary-blue text-base cursor-pointer">
            {post.board}
          </p>
          <p className="text-xs md:text-sm cursor-pointer">
            {post.author.name}{" "}
            <span className="text-neutral-500 font-normal">
              @{post.author.username} · {post.date}
            </span>
          </p>
        </div>
      </div>

      {/* Content */}
      {post.type === "quiz" ? (
        <div className="group mb-3 flex justify-between items-center border border-neutral-200 p-1 px-2 rounded hover:border-neutral-600 transition-colors duration-200">
          <div>
            <p className="mb-1 cursor-pointer">{post.text}</p>
            <p className="text-sm text-neutral-600 cursor-pointer">{post.description}</p>
          </div>
          <button className="ml-auto px-3 py-1 rounded bg-primary-blue text-white text-sm cursor-pointer hover:bg-primary-blue/90 transition-colors duration-200">
            Start
          </button>
        </div>
      ) : post.type === "library" ? (
        <div className="flex flex-col gap-3 mb-3 rounded hover:border-neutral-600 transition-colors duration-200">
          <p className="">{post.text}</p>
          <div className="flex items-center gap-2 border border-neutral-200 p-3 rounded cursor-pointer">
            <div className="bg-blue-500 text-white rounded-full p-3 text-xl">
              <FaArrowDown />
            </div>
            <div className="flex flex-col text-xs gap-0.5 text-neutral-500">
              <p className="text-neutral-900 text-sm">{post.file?.name}</p>
              <p>3.5mb</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-3">
          <p className="mb-1">{post.text}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 text-neutral-600 text-sm w-1/4">
        <button
          className="flex w-full items-center gap-2 hover:text-neutral-900 cursor-pointer"
          title="Comments"
        >
          <FaRegComment /> {post.comments}
        </button>
        <button
          className="flex w-full items-center gap-2 hover:text-neutral-900 cursor-pointer"
          title="Like"
          onClick={() => setLiked((v) => !v)}
        >
          {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}{" "}
          {likeCount}
        </button>
        <button
          className="flex w-full items-center gap-2 hover:text-neutral-900 cursor-pointer"
          title="Share"
        >
          <FaRegShareSquare /> {post.shares}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
