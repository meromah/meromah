import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { mockPosts, mockComments } from "../../utils/constants";
import {
  FiHeart,
  FiShare2,
  FiArrowLeft,
  FiSend,
} from "react-icons/fi";
import { FaArrowDown } from "react-icons/fa";

const Post = () => {
  const { postId } = useParams();
  const [newComment, setNewComment] = useState("");

  // Find the post by ID
  const post = mockPosts.find((p) => p.id === postId);
  const comments = mockComments[postId] || [];

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Post not found
          </h1>
          <p className="text-slate-600">
            The post you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      // In a real app, this would make an API call
      console.log("New comment:", newComment);
      setNewComment("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors">
          <FiArrowLeft className="text-base" />
          Back to feeds
        </button>

        {/* Main Post Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden mb-8">
          {/* Post Header */}
          <div className="p-6 border-b border-slate-100">
            {/* Author */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={post.author.avatar}
                alt={post.author.username}
                className="w-8 h-8 rounded-full shadow shadow-neutral-200"
              />
              <div>
                <p className="font-semibold text-primary-blue text-base cursor-pointer hover:underline">
                  {post.board}
                </p>
                <p className="text-xs md:text-sm">
                  <span className="cursor-pointer hover:underline">
                    {post.author.name}
                  </span>{" "}
                  <span className="text-neutral-500 font-normal">
                    @{post.author.username} · {post.date}
                  </span>
                </p>
              </div>
            </div>

            {/* Content based on post type */}
            {post.type === "quiz" ? (
              <div className="group mb-3 flex justify-between items-center border-l-4 border-blue-500 bg-blue-50 p-3 px-4 rounded hover:bg-blue-100 transition-colors duration-200">
                <div>
                  <p className="mb-1 font-medium">{post.text}</p>
                  <p className="text-sm text-neutral-600">{post.description}</p>
                </div>
                <button className="ml-auto px-4 py-2 rounded bg-primary-blue text-white text-sm hover:bg-primary-blue/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
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
          </div>

          {/* Post Actions */}
          <div className="px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-slate-600 hover:text-red-500 transition-colors">
                <FiHeart className="text-base" />
                <span className="text-sm font-medium">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-slate-600 hover:text-green-500 transition-colors duration-200 cursor pointer">
                <FiShare2 className="text-base cursor-pointer" />
                <span className="text-sm font-medium">{post.shares}</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="p-6">
            <h4 className="font-semibold text-slate-900 mb-4">
              Comments ({comments.length})
            </h4>

            {/* Comments List */}
            <div className="space-y-4 mb-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-slate-50 rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-slate-900 text-sm">
                          {comment.author.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          @{comment.author.username}
                        </span>
                        <span className="text-xs text-slate-400">
                          • {comment.date}
                        </span>
                      </div>
                      <p className="text-slate-700 text-sm">{comment.text}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 ml-2">
                      <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 transition-colors">
                        <FiHeart className="text-xs" />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="text-xs text-slate-500 hover:text-blue-500 transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className="flex gap-3">
              <img
                src="https://api.dicebear.com/8.x/identicon/svg?seed=current-user"
                alt="You"
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 placeholder-slate-400"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  <FiSend className="text-sm" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
