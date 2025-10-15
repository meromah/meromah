import React, { useState } from 'react'
import { 
  FiImage, 
  FiX,
  FiSmile,
  FiSend,
  FiSave,
  FiArrowLeft
} from 'react-icons/fi'

const CreatePost = () => {
  const [postContent, setPostContent] = useState('')
  const [images, setImages] = useState([])

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setImages(prev => [...prev, ...newImages])
  }

  const removeImage = (index) => {
    URL.revokeObjectURL(images[index].preview)
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Minimal Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            What's on your mind?
          </h1>
          <p className="text-slate-600">Share your thoughts with the world</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
          {/* User Info Header */}
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
                JD
              </div>
              <div>
                <p className="font-semibold text-slate-900">John Doe</p>
                <p className="text-sm text-slate-500">Posting to your profile</p>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Share something amazing... ✨"
              className="w-full min-h-[180px] text-lg text-slate-700 placeholder-slate-400 resize-none focus:outline-none"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            />

            {/* Image Preview Grid */}
            {images.length > 0 && (
              <div className={`grid gap-2 mt-4 ${
                images.length === 1 ? 'grid-cols-1' : 
                images.length === 2 ? 'grid-cols-2' : 
                images.length === 3 ? 'grid-cols-3' : 
                'grid-cols-2'
              }`}>
                {images.map((img, index) => (
                  <div key={index} className="relative group aspect-square rounded-xl overflow-hidden bg-slate-100">
                    <img 
                      src={img.preview} 
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiX className="text-white text-sm" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Toolbar */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-slate-100 cursor-pointer transition-colors group">
                <FiImage className="text-blue-600 text-lg group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-slate-700">Photo</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              
              <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-slate-100 transition-colors group">
                <FiSmile className="text-amber-500 text-lg group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-slate-700">Emoji</span>
              </button>
            </div>

            <div className="text-sm text-slate-400">
              {postContent.length}/2000
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-5 bg-slate-50 flex items-center justify-between">
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors">
              <FiArrowLeft className="text-base" />
              Cancel
            </button>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all font-medium">
                <FiSave className="text-base" />
                Draft
              </button>
              
              <button 
                disabled={!postContent.trim()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/25 disabled:shadow-none font-medium"
              >
                <FiSend className="text-base" />
                Publish
              </button>
            </div>
          </div>
        </div>

        {/* Tips Card */}
        <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/60">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              <span className="font-medium text-slate-900">Markdown supported:</span> Use **bold**, *italic*, and `code` to style your text
            </p>
            <div className="text-2xl">✨</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost