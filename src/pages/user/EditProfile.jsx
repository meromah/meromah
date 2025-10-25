import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { mockUserProfile } from "../../utils/constants";
import { FiArrowLeft, FiSave } from "react-icons/fi";

const EditProfile = () => {
  const navigate = useNavigate();
  
  // Initialize form data with current user's mock data
  const [formData, setFormData] = useState({
    name: mockUserProfile.name,
    username: mockUserProfile.username,
    bio: mockUserProfile.bio,
    education: mockUserProfile.education,
    userImage: mockUserProfile.userImage
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // Here you would typically save the data to your backend
    alert("Profile updated successfully!");
    navigate("profile/alice"); // Navigate back to profile
  };

  const handleCancel = () => {
    navigate("profile/alice");
  };

  return (
    <div className="relative min-h-screen bg-primary-bg">
      <div className="max-w-2xl w-full mx-auto px-4 py-8">
        <div className="text-center p-2 md:p-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Edit Profile
          </h1>
          <p className="text-slate-600">
            Update your personal information and preferences
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid gap-5">
              {/* Name Field */}
              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">
                  Full Name *
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  required
                />
              </label>

              {/* Username Field */}
              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">
                  Username *
                </span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  required
                />
              </label>

              {/* Bio Field */}
              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">
                  Bio
                </span>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  className="w-full min-h-[100px] px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 placeholder-slate-400 resize-y"
                  rows={4}
                />
              </label>

              {/* Education Field */}
              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">
                  Education
                </span>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science, MIT"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 placeholder-slate-400"
                />
              </label>

              {/* Avatar URL Field */}
              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">
                  Avatar URL
                </span>
                <input
                  type="url"
                  name="userImage"
                  value={formData.userImage}
                  onChange={handleInputChange}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 placeholder-slate-400"
                />
              </label>
            </div>
          </form>

          {/* Action Buttons */}
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
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25 font-medium"
            >
              <FiSave className="text-base" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
