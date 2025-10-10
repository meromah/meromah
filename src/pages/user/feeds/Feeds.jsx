import React, { useMemo, useState } from 'react'
import PostCard from './PostCard'

const mockPosts = [
  {
    id: 'p1',
    type: 'post',
    author: { name: 'Alice Johnson', username: 'alice', avatar: 'https://api.dicebear.com/8.x/identicon/svg?seed=alice' },
    text: 'Loved the lecture on greedy algorithms today! Any good resources?',
    board: 'Algorithms 101',
    comments: 3,
    likes: 12,
    shares: 1,
    date: '2h',
  },
  {
    id: 'p2',
    type: 'quiz',
    author: { name: 'Quiz Bot', username: 'quizbot', avatar: 'https://api.dicebear.com/8.x/identicon/svg?seed=quiz' },
    text: 'Dynamic Programming Basics',
    description: '10 MCQs to test your fundamentals',
    board: 'Algorithms 101',
    comments: 0,
    likes: 5,
    shares: 0,
    date: '5h',
  },
  {
    id: 'p3',
    type: 'library',
    author: { name: 'Bob Lee', username: 'bob', avatar: 'https://api.dicebear.com/8.x/identicon/svg?seed=bob' },
    text: 'Graph Notes',
    description: 'Concise notes on graphs with examples',
    file: { name: 'graphs-notes.pdf' },
    board: 'Discrete Math',
    comments: 2,
    likes: 8,
    shares: 2,
    date: '1d',
  },
]

const Feeds = () => {
  const [filter, setFilter] = useState('Latest')

  const filtered = useMemo(() => {
    switch (filter) {
      case 'Popular':
        return [...mockPosts].sort((a, b) => b.likes - a.likes)
      case 'My Boards':
        return mockPosts.filter(p => p.board === 'Algorithms 101')
      default:
        return mockPosts
    }
  }, [filter])

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Your Feed</h2>
        <p className="text-neutral-600 text-sm">Latest posts, quizzes, and updates from your classmates</p>
      </div>

      <div className="mb-4">
        <select
          className="border rounded px-2 py-1"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>Latest</option>
          <option>Popular</option>
          <option>My Boards</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="p-8 border rounded text-center">
          <p className="mb-2">No posts yet. Be the first — drop a post!</p>
          <button className="px-3 py-2 bg-primary-blue text-white rounded">Create Post</button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Feeds


