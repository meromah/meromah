import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import PostCard from './PostCard'

const dataset = {
  posts: [
    { id: 'p1', type: 'post', author: { name: 'Alice', username: 'alice', avatar: 'https://api.dicebear.com/8.x/identicon/svg?seed=alice' }, text: 'Greedy vs DP?', board: 'Algorithms 101', comments: 1, likes: 4, shares: 0, date: '1d' },
  ],
  boards: [
    { id: 'p2', type: 'post', author: { name: 'Board Bot', username: 'boards', avatar: 'https://api.dicebear.com/8.x/identicon/svg?seed=board' }, text: 'Welcome to Algorithms 101 board', board: 'Algorithms 101', comments: 0, likes: 1, shares: 0, date: '2d' },
  ],
  libraries: [
    { id: 'p3', type: 'library', author: { name: 'Kate', username: 'kate', avatar: 'https://api.dicebear.com/8.x/identicon/svg?seed=kate' }, text: 'Sorting Cheatsheet', description: 'Quick reference for sorting', file: { name: 'sorting.pdf' }, board: 'Algorithms 101', comments: 0, likes: 2, shares: 0, date: '2d' },
  ],
  quizzes: [
    { id: 'p4', type: 'quiz', author: { name: 'Quiz Bot', username: 'quiz', avatar: 'https://api.dicebear.com/8.x/identicon/svg?seed=quiz' }, text: 'Greedy vs DP MCQ', description: '5 questions', board: 'Algorithms 101', comments: 0, likes: 3, shares: 0, date: '3d' },
  ],
}

const ExploreItem = () => {
  const { item } = useParams()

  const list = useMemo(() => {
    const key = (item || '').toLowerCase()
    return dataset[key] || []
  }, [item])

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Explore: {item}</h2>
      <div className="flex flex-col gap-4">
        {list.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default ExploreItem


