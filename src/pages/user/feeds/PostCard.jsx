import React, { useState } from 'react'
import { FaRegComment, FaRegHeart, FaHeart, FaRegShareSquare, FaDownload } from 'react-icons/fa'

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false)
  const likeCount = post.likes + (liked ? 1 : 0)

  return (
    <div className="border rounded p-4">
      {/* Author */}
      <div className="flex items-center gap-3 mb-3">
        <img src={post.author.avatar} alt={post.author.username} className="w-8 h-8 rounded-full border" />
        <div>
          <p className="text-sm font-semibold">{post.author.name} <span className="text-neutral-500 font-normal">@{post.author.username} · {post.date}</span></p>
          <p className="text-xs text-primary-blue">{post.board}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mb-3">
        <p className="mb-1">{post.text}</p>
        {post.type === 'quiz' && (
          <p className="text-sm text-neutral-600">{post.description}</p>
        )}
        {post.type === 'library' && (
          <div className="mt-2 flex items-center gap-2 text-primary-blue">
            <FaDownload />
            <span className="text-sm">{post.file?.name}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 text-neutral-600 text-sm">
        <button className="flex items-center gap-2 hover:text-neutral-900" title="Comments">
          <FaRegComment /> {post.comments}
        </button>
        <button className="flex items-center gap-2 hover:text-neutral-900" title="Like" onClick={() => setLiked(v => !v)}>
          {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />} {likeCount}
        </button>
        <button className="flex items-center gap-2 hover:text-neutral-900" title="Share">
          <FaRegShareSquare /> {post.shares}
        </button>
        {post.type === 'quiz' && (
          <button className="ml-auto px-3 py-1 rounded bg-primary-blue text-white text-sm">Start</button>
        )}
      </div>
    </div>
  )
}

export default PostCard


