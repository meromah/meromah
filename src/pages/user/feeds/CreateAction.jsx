import React from 'react'
import { useParams } from 'react-router-dom'

const CreateAction = () => {
  const { action } = useParams()
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-2">Create: {action}</h2>
      <p className="text-neutral-600">This page is intentionally left blank for now.</p>
    </div>
  )
}

export default CreateAction


