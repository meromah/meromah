import React from 'react'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
  const params = useParams();
  console.log(params)
  return (
    <div>UserProfile</div>
  )
}

export default UserProfile