import React, { useState } from "react";
import { FaRegComment, FaRegHeart, FaHeart, FaArrowDown } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const preventNavigation = (e) => {
  e.preventDefault();
  e.stopPropagation();
};
const getType = {
  post: ["b", "board"],
  quiz: ["d", "desc"],
  library: ["b", "board"],
};
const PostCard = ({ post, isFirst, isLast }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const likeCount = post.likes + (liked ? 1 : 0);
  const handleAuthorClick = (e, path) => {
    preventNavigation(e);
    console.log("Navigate to author profile: ", path);
  };

  const handleBoardClick = (e, path) => {
    preventNavigation(e);
    navigate(path);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Link
      to={`/post/${post.id}`}
      className={`block bg-white border-x border-b border-gray-200 p-4 hover:bg-primary-bg transition-colors duration-200 ${
        isFirst && "rounded-t-lg border-t"
      } ${isLast && "rounded-b-lg"}`}
    >
      {/* Author */}
      <div className="flex items-center gap-3 mb-3">
        {imageError ? (
          <div
            className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold shadow shadow-neutral-200"
            onClick={(e) =>
              handleAuthorClick(e, `profile/${post.author.username}`)
            }
          >
            {getInitials(post.author.name)}
          </div>
        ) : (
          <img
            src={post.author.avatar}
            alt={post.author.username}
            className="w-8 h-8 rounded-full shadow shadow-neutral-200"
            onError={() => setImageError(true)}
            onClick={(e) =>
              handleAuthorClick(e, `profile/${post.author.username}`)
            }
          />
        )}
        <div>
          <p
            className="text-primary-blue text-base cursor-pointer hover:underline"
            onClick={(e) =>
              handleBoardClick(e, `/${getType[post.type][1]}/${post.board}`)
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleBoardClick()}
          >
            {getType[post.type][0]}/{post.board}
          </p>
          <p className="text-xs md:text-sm flex items-center gap-1">
            <span
              onClick={(e) =>
                handleAuthorClick(e, `profile/${post.author.username}`)
              }
              className="cursor-pointer hover:underline"
              role="link"
              tabIndex={0}
            >
              u/{post.author.username}
            </span>
            <span className="text-neutral-500 font-normal">{post.date}</span>
          </p>
        </div>
      </div>

      {/* Content */}
      {post.type === "quiz" ? (
        <div className="group mb-3 flex justify-between items-center border-l-4 border-blue-500 bg-blue-50 p-3 px-4 rounded hover:bg-blue-100 transition-colors duration-200">
          <div>
            <p className="mb-1 font-medium">{post.text}</p>
            <p className="text-sm text-neutral-600">{post.description}</p>
          </div>
          <button
            className="ml-auto px-4 py-2 rounded bg-primary-blue text-white text-sm hover:bg-primary-blue/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            Start
          </button>
        </div>
      ) : post.type === "library" ? (
        <div className="flex flex-col gap-3 mb-3">
          <p>{post.text}</p>
          <div className="flex items-center gap-3 border-l-4 border-green-500 bg-green-50 p-3 rounded hover:bg-green-100 transition-colors duration-200 cursor-pointer">
            <div className="bg-blue-500 text-white rounded-full p-3 text-xl flex-shrink-0">
              <FaArrowDown />
            </div>
            <div className="flex flex-col text-xs gap-0.5 text-neutral-500">
              <p className="text-neutral-900 text-sm font-medium">
                {post.file?.name}
              </p>
              <p>{post.file?.size || "3.5mb"}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-3">
          <p className="mb-1">{post.text}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 text-neutral-600 text-sm">
        <button
          className="flex items-center gap-2 hover:text-neutral-900 p-2 -m-2 rounded transition-colors duration-200 focus:outline-none"
          title="Comments"
          aria-label={`${post.comments} comments`}
        >
          <FaRegComment /> {post.comments}
        </button>
        <button
          className="flex items-center gap-2 hover:text-neutral-900 p-2 -m-2 rounded transition-colors duration-200 focus:outline-none cursor-pointer"
          title={liked ? "Unlike" : "Like"}
          aria-label={`${likeCount} likes. ${
            liked ? "Unlike" : "Like"
          } this post`}
          onClick={preventNavigation}
        >
          {liked ? (
            <FaHeart
              className="text-red-500"
              onClick={(e) => {
                setLiked((v) => !v);
                preventNavigation(e);
              }}
            />
          ) : (
            <FaRegHeart
              onClick={(e) => {
                setLiked((v) => !v);
                preventNavigation(e);
              }}
            />
          )}
          {likeCount}
        </button>
        <button
          className="flex items-center gap-2 text-slate-600"
          title="Share"
          aria-label={`${post.shares} shares`}
          onClick={preventNavigation}
        >
          <FiShare2 className="hover:text-green-500 transition-colors duration-200 cursor-pointer" />{" "}
          {post.shares}
        </button>
      </div>
    </Link>
  );
};

export default PostCard;
