import React, { useState } from 'react'
import { FiArrowLeft, FiUpload, FiPaperclip } from 'react-icons/fi'

const CreateLibrary = () => {
  const [libraryName, setLibraryName] = useState('')
  const [libraryDescription, setLibraryDescription] = useState('')
  const [files, setFiles] = useState([])

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || [])
    setFiles(prev => [...prev, ...selected])
    // reset input so same file can be selected again if needed
    e.target.value = ''
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const isUploadDisabled = !libraryName.trim() || files.length === 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Create a new library
          </h1>
          <p className="text-slate-600">Upload and organize files for easy access and sharing</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="grid gap-5">
              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">Library name</span>
                <input
                  type="text"
                  value={libraryName}
                  onChange={(e) => setLibraryName(e.target.value)}
                  placeholder="e.g., Semester 3 Notes, UI Kits, Research Papers"
                  className="input w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 placeholder-slate-400"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">Description</span>
                <textarea
                  value={libraryDescription}
                  onChange={(e) => setLibraryDescription(e.target.value)}
                  placeholder="What does this library contain? Any usage notes?"
                  className="w-full min-h-[120px] px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 placeholder-slate-400 resize-y"
                />
              </label>

              <div className="flex flex-col gap-3">
                <span className="font-medium text-neutral-800">Files</span>
                <label className="flex items-center justify-between gap-3 w-full px-4 py-3 rounded-xl border border-dashed border-slate-300 hover:border-slate-400 bg-slate-50/60 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3 text-slate-700">
                    <FiUpload className="text-blue-600 text-lg" />
                    <span className="text-sm">Click to upload files (PDFs, images, anything)</span>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="*/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                {files.length > 0 && (
                  <ul className="mt-2 grid gap-2">
                    {files.map((file, index) => (
                      <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-2 truncate">
                          <FiPaperclip className="text-slate-500" />
                          <span className="truncate text-slate-800" title={file.name}>{file.name}</span>
                          <span className="text-slate-400 text-xs">({Math.ceil(file.size / 1024)} KB)</span>
                        </div>
                        <button onClick={() => removeFile(index)} className="text-slate-500 hover:text-slate-900 text-sm font-medium">Remove</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="px-6 py-5 bg-slate-50 flex items-center justify-between">
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors">
              <FiArrowLeft className="text-base" />
              Cancel
            </button>

            <button
              disabled={isUploadDisabled}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/25 disabled:shadow-none font-medium"
            >
              <FiUpload className="text-base" />
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateLibrary