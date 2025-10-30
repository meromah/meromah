import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEdit,
  FaCalendarAlt,
  FaComment,
  FaQuestionCircle,
} from "react-icons/fa";
import PostCard from "../components/PostCard.jsx";
import CommentCard from "../components/CommentCard.jsx";
// Default placeholders for missing data
const DEFAULT_PLACEHOLDERS = {
  bio: "No bio available",
  education: "Education not specified",
  joinDate: "Unknown",
  noPosts: "No posts yet",
  noQuizzes: "No quizzes created yet",
  noLibrary: "No library items yet",
};
const Profile = ({
  userType = "unknown",
  user,
  userError,
  isUserLoading,
  profile,
  profileError,
  isProfileLoading,
  posts,
  myPostsError,
  isPostsLoading,
  tests,
  myTestsError,
  isTestsLoading,
  comments,
  myCommentsError,
  isCommentsLoading,
}) => {
  // if userType is unknown, return 404 not found
  if (userType === "unknown") {
    return <div>404 not found</div>
  }
  const [activeTab, setActiveTab] = useState("overview");
  const [imageError, setImageError] = useState(false);
  const tabs = useMemo(() => [
    { id: "overview", label: "Overview", icon: FaUser },
    { id: "posts", label: "Posts", icon: FaEdit },
    { id: "quizzes", label: "Quizzes", icon: FaQuestionCircle },
    { id: "comments", label: "Comments", icon: FaComment },
  ]);

  const getInitials = useCallback((name) => {
    if (!name || typeof name !== "string") return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  });

  const formatJoinDate = useCallback(
    (dateString) => {
      if (!dateString || dateString === "Unknown")
        return DEFAULT_PLACEHOLDERS.joinDate;
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return DEFAULT_PLACEHOLDERS.joinDate;
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    [DEFAULT_PLACEHOLDERS.joinDate]
  );

  const renderOverview = useCallback(
    () => (
      <div className="space-y-6">
        <div className="rounded-lg py-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
            <FaUser className="text-primary-blue" />
            About
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-600">
                Bio
              </label>
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
                {formatJoinDate(
                  user?.created_at ||
                    user?.createdAt ||
                    DEFAULT_PLACEHOLDERS.joinDate
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    [profile, user, formatJoinDate]
  );
  const renderPosts = useCallback(() => {
    if (isPostsLoading) {
      return (
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <FaEdit className="mx-auto text-4xl text-neutral-400 mb-4" />
          <p className="text-neutral-600">{DEFAULT_PLACEHOLDERS.noPosts}</p>
        </div>
      );
    }
    if (Array.isArray(posts) && posts.length > 0) {
      return (
        <>
          {posts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              isFirst={index === 0}
              isLast={index === posts.length - 1}
            />
          ))}
        </>
      );
    }
    return (
      <div className="bg-white rounded-lg p-8 text-center shadow-sm">
        <FaEdit className="mx-auto text-4xl text-neutral-400 mb-4" />
        <p className="text-neutral-600">{DEFAULT_PLACEHOLDERS.noPosts}</p>
      </div>
    );
  }, [isPostsLoading, posts]);

  const renderComments = useCallback(() => {
    if (isCommentsLoading) {
      return (
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <FaComment className="mx-auto text-4xl text-neutral-400 mb-4" />
          <p className="text-neutral-600">{DEFAULT_PLACEHOLDERS.noComments}</p>
        </div>
      );
    }
    if (Array.isArray(comments) && comments.length > 0) {
      return (
        <div>
          {comments.map((comment, i) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              isFirst={i === 0}
              isLast={i === comments.length - 1}
            />
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
  }, [isCommentsLoading, comments]);

  const renderQuizzes = useCallback(() => {
    if (isTestsLoading) {
      return (
        <div className="bg-white rounded-lg p-8 text-center shadow-sm">
          <FaQuestionCircle className="mx-auto text-4xl text-neutral-400 mb-4" />
          <p className="text-neutral-600">{DEFAULT_PLACEHOLDERS.noQuizzes}</p>
        </div>
      );
    }
    if (Array.isArray(tests) && tests.length > 0) {
      return (
        <div>
          {tests.map((quiz, i) => (
            <PostCard
              key={quiz.id}
              post={quiz}
              isFirst={i === 0}
              isLast={i === tests.length - 1}
            />
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
  }, [isTestsLoading, tests, DEFAULT_PLACEHOLDERS.noQuizzes]);

  const renderTabContent = useCallback(() => {
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
  }, [activeTab]);

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

export default Profile;
