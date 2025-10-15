import React, { useEffect } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import CreatePost from './CreatePost'

const actions ={
  post: CreatePost,

}

const CreateAction = () => {
  const {action} = useParams()
  
  
  return (
    <>
      {actions[action] && (
        React.createElement(actions[action])
      )}
    </>
  )
}

export default CreateAction