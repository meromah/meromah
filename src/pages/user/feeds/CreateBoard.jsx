import React, { useState } from 'react'
import { FiArrowLeft, FiSend } from 'react-icons/fi'

const CreateBoard = () => {
  const [boardName, setBoardName] = useState('')
  const [boardDescription, setBoardDescription] = useState('')

  const isCreateDisabled = !boardName.trim()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Create a new board
          </h1>
          <p className="text-slate-600">Organize posts and ideas under a shared theme</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="grid gap-5">
              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">Board name</span>
                <input
                  type="text"
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                  placeholder="e.g., Study Resources, Design Inspirations"
                  className="input w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 placeholder-slate-400"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">Description</span>
                <textarea
                  value={boardDescription}
                  onChange={(e) => setBoardDescription(e.target.value)}
                  placeholder="What is this board about? Who is it for?"
                  className="w-full min-h-[120px] px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 placeholder-slate-400 resize-y"
                />
              </label>
            </div>
          </div>

          <div className="px-6 py-5 bg-slate-50 flex items-center justify-between">
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors">
              <FiArrowLeft className="text-base" />
              Cancel
            </button>

            <button
              disabled={isCreateDisabled}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/25 disabled:shadow-none font-medium"
            >
              <FiSend className="text-base" />
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBoard