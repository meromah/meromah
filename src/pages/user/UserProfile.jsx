import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserByUsernameQuery } from "../../services/userApi.js";
import Profile from "./components/Profile.jsx";
import Loading from "../../components/Loading.jsx";
import NotFound from "../../components/NotFound.jsx";
import ErrorDisplay from "../../components/ErrorDisplay.jsx";
import { useGlobalPostSearchQuery } from "../../services/postsApi.js";
import { useGetUserCommentQuery } from "../../services/commentsApi.js";

const UserProfile = () => {
  const { username } = useParams();

  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError,
    isSuccess: isUserSuccess,
    isError: isUserError,
  } = useGetUserByUsernameQuery(username, { skip: !username });

  const {
    data: postsData,
    isLoading: isPostsLoading,
    isSuccess: isPostsSuccess,
  } = useGlobalPostSearchQuery(
    { queryParams: `author=${username}` },
    { skip: !username }
  );

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
  } = useGetUserCommentQuery({ username }, { skip: !username });

  // Handle loading state
  if (userIsLoading) return <Loading />;

  // Handle error states
  if (isUserError) {
    if (userError?.status === 404) return <NotFound />;
    return <ErrorDisplay />;
  }

  // Only render when user data is available
  if (!isUserSuccess) return null;

  return (
    <Profile
      user={userData.user}
      profile={userData.profile}
      posts={postsData}
      isPostsSuccess={isPostsSuccess}
      isPostsLoading={isPostsLoading}
      comments={commentsData}
      isCommentsLoading={isCommentsLoading}
      tests={[]}
      isTestsLoading={false}
      isOwnProfile={false}
    />
  );
};

export default UserProfile;