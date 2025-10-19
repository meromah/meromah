import React, { useState } from "react";
import {
  FaUser,
  FaEdit,
  FaGraduationCap,
  FaCalendarAlt,
  FaFileAlt,
  FaQuestionCircle,
  FaBook,
  FaImage,
} from "react-icons/fa";
import {
  mockUserProfile,
  mockUserPosts,
  mockUserQuizzes,
  mockUserLibrary,
  DEFAULT_PLACEHOLDERS,
} from "../../utils/constants";
import PostCard from "./feeds/PostCard";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [imageError, setImageError] = useState(false);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatJoinDate = (dateString) => {
    if (!dateString || dateString === "Unknown")
      return DEFAULT_PLACEHOLDERS.joinDate;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: FaUser },
    { id: "posts", label: "Posts", icon: FaEdit },
    { id: "quizzes", label: "Quizzes", icon: FaQuestionCircle },
    { id: "library", label: "Library", icon: FaBook },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="rounded-lg py-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
          <FaUser className="text-primary-blue" />
          About
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-600">Bio</label>
            <p className="text-neutral-900 mt-1">
              {mockUserProfile.bio || DEFAULT_PLACEHOLDERS.bio}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-600 flex items-center gap-2">
              <FaGraduationCap className="text-primary-blue" />
              Education
            </label>
            <p className="text-neutral-900 mt-1">
              {mockUserProfile.education || DEFAULT_PLACEHOLDERS.education}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-600 flex items-center gap-2">
              <FaCalendarAlt className="text-primary-blue" />
              Member Since
            </label>
            <p className="text-neutral-900 mt-1">
              {formatJoinDate(mockUserProfile.joinDate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPosts = () => (
    <div>
      {mockUserPosts.length > 0 ? (
        mockUserPosts.map((post, i) => <PostCard key={post.id} post={post} isFirst={i === 0} isLast={i === mockUserPosts.length - 1}/>)
      ) : (
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <FaEdit className="mx-auto text-4xl text-neutral-400 mb-4" />
          <p className="text-neutral-600">{DEFAULT_PLACEHOLDERS.noPosts}</p>
        </div>
      )}
    </div>
  );

  const renderQuizzes = () => (
    <div>
      {mockUserQuizzes.length > 0 ? (
        mockUserQuizzes.map((quiz, i) => <PostCard key={quiz.id} post={quiz} isFirst={i === 0} isLast={i === mockUserQuizzes.length - 1}/>)
      ) : (
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <FaQuestionCircle className="mx-auto text-4xl text-neutral-400 mb-4" />
          <p className="text-neutral-600">{DEFAULT_PLACEHOLDERS.noQuizzes}</p>
        </div>
      )}
    </div>
  );

  const renderLibrary = () => (
    <div>
      {mockUserLibrary.length > 0 ? (
        mockUserLibrary.map((item, i) => <PostCard key={item.id} post={item} isFirst={i === 0} isLast={i === mockUserLibrary.length - 1}/>)
      ) : (
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <FaBook className="mx-auto text-4xl text-neutral-400 mb-4" />
          <p className="text-neutral-600">{DEFAULT_PLACEHOLDERS.noLibrary}</p>
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "posts":
        return renderPosts();
      case "quizzes":
        return renderQuizzes();
      case "library":
        return renderLibrary();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* User Info Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row items-end gap-6">
            <div className="flex-shrink-0">
              {imageError ? (
                <div className="w-20 h-20 rounded-xl bg-primary-blue text-white flex items-center justify-center text-2xl font-semibold border border-gray-300">
                  {getInitials(mockUserProfile.name)}
                </div>
              ) : (
                <img
                  src={mockUserProfile.userImage}
                  alt={mockUserProfile.username}
                  className="w-20 h-20 rounded-xl border border-gray-300 object-cover"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-neutral-900">
                {mockUserProfile.name}
              </h1>
              <p className="text-base text-primary-blue">
                u/{mockUserProfile.username}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm">
          <div className="rounded-lg">
            <div className="border-b border-neutral-200">
              <nav className="flex">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-colors duration-200 ${
                        activeTab === tab.id
                          ? "text-primary-blue border-b-2 border-primary-blue bg-blue-50"
                          : "text-neutral-600 hover:text-primary-blue hover:bg-neutral-50"
                      }`}
                    >
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
          {/* Tab Content */}
          <div className="rounded-lg">
            <div className="py-6">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
