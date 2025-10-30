import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import PostCard from './PostCard'
import { exploreData } from '../../../utils'



const ExploreItem = () => {
  const { item } = useParams()

  const list = useMemo(() => {
    const key = (item || '').toLowerCase()
    return exploreData[key] || []
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


