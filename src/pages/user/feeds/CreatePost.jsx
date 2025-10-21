import React, { useState, useRef } from "react";
import { FaFileAlt } from "react-icons/fa";
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
    <div className="flex flex-col gap-4 p-2 md:p-6 md:gap-6">
      {/* Welcome/CTA Section */}
      <div className="text-center p-2 md:p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Create a new post
        </h1>
        <p className="text-slate-600">
          Share your thoughts and ideas with the board members
        </p>
      </div>

      <div className="max-w-2xl w-full space-y-4 mx-auto p-2 md:p-6 md:space-y-6">
        <div className="flex flex-col gap-6 bg-white p-6 rounded-lg border border-gray-200">
          {/* Board Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Choose a Board *
            </label>
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a board...</option>
              {boards.map((board) => (
                <option key={board.id} value={board.id}>
                  {board.name}
                </option>
              ))}
            </select>
          </div>
          {/* Post Text Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              What's on your mind? *
            </label>
            <textarea
              value={postText}
              onChange={handleTextChange}
              placeholder="Share your thoughts, ideas, or experiences..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={6}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {postText.length}/1000 characters
              </span>
              {postText.length > 900 && (
                <span className="text-sm text-orange-500">
                  {1000 - postText.length} characters remaining
                </span>
              )}
            </div>
          </div>
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attach Files (Optional)
            </label>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex gap-1 items-center p-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none cursor-pointer"
            >
              <span>
                <IoMdAttach className="text-xl" />
              </span>
              <span>Upload Files</span>
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
          {(uploadedFiles.length > 0 || uploadedImages.length  > 0) &&(<div className="grid grid-cols-1 gap-4">
            {uploadedImages.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Uploaded Images
                </h3>
                <div className="grid grid-cols-1  gap-4 border border-gray-200 rounded-lg p-3">
                  {uploadedImages.map((file) => (
                    <div key={file.id} className="flex flex-col gap-2">
                            <div className="flex items-center justify-between w-full">
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                              <button
                                onClick={() => setUploadedImages((prev) => removeFile(prev, file.id))}
                                className="text-xl text-red-500 hover:text-red-700 p-1 cursor-pointer"
                              >
                                <IoClose />
                              </button>
                            </div>
                            <div>
                              <img
                                src={file.url}
                                alt={file.name}
                                className="block w-full object-cover rounded mr-3"
                              />
                            </div>
                          </div>
                  ))}
                </div>
              </div>
            )}
            {uploadedFiles.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Uploaded Files
                </h3>
                <div className="grid grid-cols-1  gap-4">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <div>
                              <FaFileAlt className="text-gray-400 text-2xl" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setUploadedFiles((prev) => removeFile(prev, file.id))}
                            className="text-xl text-red-500 hover:text-red-700 p-1 cursor-pointer"
                          >
                            <IoClose />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>)}
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedBoard || !postText.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
