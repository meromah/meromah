import React, { useState, useRef } from "react";
import { FaFileAlt } from "react-icons/fa";
import { FiArrowLeft, FiSend } from "react-icons/fi";
import { IoMdAttach } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const CreatePost = () => {
  const [selectedBoard, setSelectedBoard] = useState("");
  const [postText, setPostText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);

  const boards = [
    { id: "general", name: "General Discussion" },
    { id: "tech", name: "Technology" },
    { id: "design", name: "Design" },
    { id: "business", name: "Business" },
    { id: "lifestyle", name: "Lifestyle" },
  ];

  const handleTextChange = (e) => {
    const text = e.target.value;
    if (text.length <= 1000) {
      setPostText(text);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = [];
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const newFile = {
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
      };
      if (file.type.startsWith("image/")) {
        newImages.push(newFile);
        continue;
      }
      newFiles.push(newFile);
    }
    setUploadedImages((prev) => [...prev, ...newImages]);
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (prev, fileId) => {
    const fileToRemove = prev.find((f) => f.id === fileId);
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.url);
    }
    return prev.filter((f) => f.id !== fileId);
  };

  const handleSubmit = () => {
    if (!selectedBoard || !postText.trim()) {
      alert("Please select a board and write your post");
      return;
    }

    // Handle post submission here
    console.log("Posting to:", selectedBoard);
    console.log("Content:", postText);
    console.log("Files:", uploadedFiles);

    // Reset form
    setSelectedBoard("");
    setPostText("");
    setUploadedFiles([]);
  };

  const handleCancel = () => {
    setSelectedBoard("");
    setPostText("");
    uploadedFiles.forEach((file) => URL.revokeObjectURL(file.url));
    setUploadedFiles([]);
  };

  const isImage = (fileType) => {
    return fileType.startsWith("image/");
  };

  return (
    <div className="relative min-h-screen bg-primary/50">
      <div className="max-w-2xl w-full mx-auto px-4 py-8">
        <div className="text-center p-2 md:p-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Create a new post
          </h1>
          <p className="text-slate-600">
            Share your thoughts and ideas with the board members
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-6 border-b border-slate-100">
            <div className="grid gap-5">
              {/* Board Selection */}
              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">
                  Choose a Board *
                </span>
                <select
                  value={selectedBoard}
                  onChange={(e) => setSelectedBoard(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                >
                  <option value="">Select a board...</option>
                  {boards.map((board) => (
                    <option key={board.id} value={board.id}>
                      {board.name}
                    </option>
                  ))}
                </select>
              </label>

              {/* Post Text Area */}
              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">
                  What's on your mind? *
                </span>
                <textarea
                  value={postText}
                  onChange={handleTextChange}
                  placeholder="Share your thoughts, ideas, or experiences..."
                  className="w-full min-h-[140px] px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 placeholder-slate-400 resize-y"
                  rows={6}
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">
                    {postText.length}/1000 characters
                  </span>
                  {postText.length > 900 && (
                    <span className="text-xs text-orange-500">
                      {1000 - postText.length} characters remaining
                    </span>
                  )}
                </div>
              </label>

              {/* File Upload */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex gap-2 items-center px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer transition-colors"
                >
                  <span>
                    <IoMdAttach className="text-xl text-slate-600" />
                  </span>
                  <span className="text-sm text-slate-700">Upload Files</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
              </div>

              {/* File Previews */}
              {(uploadedFiles.length > 0 || uploadedImages.length > 0) && (
                <div className="grid gap-4 pt-2">
                  {uploadedImages.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-neutral-800 mb-3">
                        Uploaded Images
                      </h3>
                      <div className="grid gap-3">
                        {uploadedImages.map((file) => (
                          <div
                            key={file.id}
                            className="border border-slate-200 rounded-lg p-3"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="text-sm font-medium text-neutral-800">
                                  {file.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                              <button
                                onClick={() =>
                                  setUploadedImages((prev) =>
                                    removeFile(prev, file.id)
                                  )
                                }
                                className="text-xl text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 cursor-pointer transition-colors"
                              >
                                <IoClose />
                              </button>
                            </div>
                            <div>
                              <img
                                src={file.url}
                                alt={file.name}
                                className="block w-full object-cover rounded"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {uploadedFiles.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-neutral-800 mb-3">
                        Uploaded Files
                      </h3>
                      <div className="grid gap-3">
                        {uploadedFiles.map((file) => (
                          <div
                            key={file.id}
                            className="border border-slate-200 rounded-lg p-3"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div>
                                  <FaFileAlt className="text-slate-400 text-2xl" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-neutral-800">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  setUploadedFiles((prev) =>
                                    removeFile(prev, file.id)
                                  )
                                }
                                className="text-xl text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 cursor-pointer transition-colors"
                              >
                                <IoClose />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
        </div>
        <div className="px-6 py-5 bg-primary-bg flex items-center justify-between rounded-b-lg">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            <FiArrowLeft className="text-base" />
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={!selectedBoard || !postText.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/25 disabled:shadow-none font-medium"
          >
            <FiSend className="text-base" />
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
