import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEdit,
  FaCalendarAlt,
  FaComment,
  FaQuestionCircle,
} from "react-icons/fa";
import { DEFAULT_PLACEHOLDERS } from "../../utils/constants";
import PostCard from "./feeds/PostCard";
import {
  // fetch details about me, and my profile
  useGetMeQuery,
  useGetMyProfileQuery,
} from '../../services/userApi.js';

import {
  // fetch all posts that belong to me
  useGetAllMyPostsQuery,
} from '../../services/postsApi.js';

import { 
  // fetch all my tests
  useGetAllMyTestsQuery
} from '../../services/testsApi.js';
import {
  useGetAllMyCommentsQuery
} from '../../services/commentsApi.js';


const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [imageError, setImageError] = useState(false);

  const { data: user, error: userError, isLoading: userIsLoading } = useGetMeQuery();
  const { data: profile, error: profileError, isLoading: profileIsLoading } = useGetMyProfileQuery();

  const { data: myPosts, error: myPostsError, isLoading: myPostsIsLoading } = useGetAllMyPostsQuery();
  const { data: myTests, error: myTestsError, isLoading: myTestsIsLoading } = useGetAllMyTestsQuery();
  const { data: myComments, error: myCommentsError, isLoading: myCommentsIsLoading } = useGetAllMyCommentsQuery();

  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "U";
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
    if (isNaN(date.getTime())) return DEFAULT_PLACEHOLDERS.joinDate;
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
    { id: "comments", label: "Comments", icon: FaComment },
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
              {profile?.biography || profile?.bio || DEFAULT_PLACEHOLDERS.bio}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-600 flex items-center gap-2">
              <FaCalendarAlt className="text-primary-blue" />
              Member Since
            </label>
            <p className="text-neutral-900 mt-1">
              {formatJoinDate(user?.created_at || user?.createdAt || DEFAULT_PLACEHOLDERS.joinDate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  const renderPosts = () => {
    if (myPostsIsLoading) {
      return (
          <div className="bg-white rounded-lg p-8 text-center shadow-sm">
            <FaEdit className="mx-auto text-4xl text-neutral-400 mb-4" />
            <p className="text-neutral-600">{DEFAULT_PLACEHOLDERS.noPosts}</p>
          </div>
      );
    }
    if (Array.isArray(myPosts) && myPosts.length > 0) {
      return (
        <>
          {
            myPosts.map((post, index) => (
              <PostCard key={post.id} post={post} isFirst={index === 0} isLast={index === myPosts.length - 1} />
            ))
          }
        </>
      );
    }
    return (
      <div className="bg-white rounded-lg p-8 text-center shadow-sm">
        <FaEdit className="mx-auto text-4xl text-neutral-400 mb-4" />
        <p className="text-neutral-600">{DEFAULT_PLACEHOLDERS.noPosts}</p>
      </div>
    );
  }; 

  const renderComments = () => {
    if (myCommentsIsLoading) {
      return (
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <FaComment className="mx-auto text-4xl text-neutral-400 mb-4" />
          <p className="text-neutral-600">{DEFAULT_PLACEHOLDERS.noComments}</p>
        </div>
      );
    }
    if (Array.isArray(myComments) && myComments.length > 0) {
      return (
        <div>
          {myComments.map((comment, i) => (
            <CommentCard key={comment.id} comment={comment} isFirst={i === 0} isLast={i === myComments.length - 1} />
          ))}
        </div>
      );
    }
    return (
      <div className="bg-white rounded-lg p-8 text-center shadow-sm">
        <FaComment className="mx-auto text-4xl text-neutral-400 mb-4" />
        <p className="text-neutral-600">{DEFAULT_PLACEHOLDERS.noComments}</p>
      </div>
    );
  };

  const renderQuizzes = () => {
    if (myTestsIsLoading) {
      return (
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <FaQuestionCircle className="mx-auto text-4xl text-neutral-400 mb-4" />
          <p className="text-neutral-600">{DEFAULT_PLACEHOLDERS.noQuizzes}</p>
        </div>
      );
    }
    if (Array.isArray(myTests) && myTests.length > 0) {
      return (
        <div>
          {myTests.map((quiz, i) => (
            <PostCard key={quiz.id} post={quiz} isFirst={i === 0} isLast={i === myTests.length - 1} />
          ))}
        </div>
      );
    }
    return (
      <div className="bg-white rounded-lg p-8 text-center shadow-sm">
        <FaQuestionCircle className="mx-auto text-4xl text-neutral-400 mb-4" />
        <p className="text-neutral-600">{DEFAULT_PLACEHOLDERS.noQuizzes}</p>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "posts":
        return renderPosts();
      case "quizzes":
        return renderQuizzes();
      case "comments":
        return renderComments();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-primary-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* User Info Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="flex-shrink-0">
              {imageError || !(user?.avatar || profile?.avatarUrl) ? (
                <div className="w-20 h-20 rounded-xl bg-primary-blue text-white flex items-center justify-center text-2xl font-semibold border border-gray-300">
                  {getInitials(user?.name || user?.username || "User")}
                </div>
              ) : (
                <img
                  src={user?.avatar || profile?.avatarUrl}
                  alt={user?.username || "user-avatar"}
                  className="w-20 h-20 rounded-xl border border-gray-300 object-cover"
                  onError={() => setImageError(true)}
                />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-neutral-900">
                {user?.name || user?.username || "User"}
              </h1>
              <p className="text-base text-primary-blue">
                u/{user?.username || "user"}
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                to="profile/edit"
                className="border border-neutral-300 rounded-lg px-3 py-1 text-sm text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 transition-colors duration-200"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm">
          <div className="rounded-lg">
            <div className="border-b border-neutral-200">
              <nav className="flex">
                {tabs.map((tab) => {
                  // const Icon = tab.icon;
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
                      {/* We can add Icon here if we want */}
                      <span>{tab.label}</span>
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
