import { useState, useEffect } from "react";
import PostCard from "./components/PostCard";
import { FaInbox, FaClock, FaFire } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useGlobalPostSearchQuery } from "../../services/postsApi.js";
import Loading from "../../components/Loading.jsx";
import ErrorDisplay from "../../components/ErrorDisplay.jsx";
const filters = [
  { value: "latest", icon: FaClock, label: "Latest" },
  { value: "popular", icon: FaFire, label: "Popular" },
  // { value: "following", icon: FaLayerGroup, label: "Following" }, //Later when the api that query the user followed boards, descs provided, i will work on that
];
const Feeds = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState({
    hasError: false,
    status: undefined,
    message: undefined,
  });
  const [filter, setFilter] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const {
    data: latestPosts,
    isLoading: isLatestPostsLoading,
    error: latestPostsError,
    isError: isLatestPostsError,
  } = useGlobalPostSearchQuery(
    { queryParams: "latest=1" },
    { skip: filter !== "latest" }
  );
  const {
    data: popularPosts,
    isLoading: isPopularPostsLoading,
    error: popularPostsError,
    isError: isPopularPostsError,
  } = useGlobalPostSearchQuery(
    { queryParams: "popular=1" },
    { skip: filter !== "popular" }
  );

  // const {data: followingPosts}= (undefined, {skip: filter !== "following"}) //Later when the api that query the user followed boards, descs provided, i will work on that
  const isLoading =
    filter === "latest" ? isLatestPostsLoading : isPopularPostsLoading;
  useEffect(() => {
    // Determine active data source
    const activeData = filter === "latest" ? latestPosts : popularPosts;
    const activeError =
      filter === "latest" ? latestPostsError : popularPostsError;
    const activeIsError =
      filter === "latest" ? isLatestPostsError : isPopularPostsError;

    // Update posts
    if (activeData?.data) {
      setPosts(activeData.data);
    }

    // Update error state
    if (activeIsError && activeError) {
      setError({
        hasError: true,
        status: activeError.status,
        message: activeError.data?.message,
      });
    } else if (activeIsError === false) {
      setError({ hasError: false, status: undefined, message: undefined });
    }
  }, [
    filter,
    latestPosts,
    popularPosts,
    latestPostsError,
    popularPostsError,
    isLatestPostsError,
    isPopularPostsError,
  ]);
  const handleFilterChange = (newFilter) => {
    setIsTransitioning(true);
    setFilter(newFilter);
    setTimeout(() => setIsTransitioning(false), 150);
  };
  return (
    <div className="p-4 md:p-6">
      {/* Search bar */}
      <div className="flex items-center  gap-3 bg-white border border-neutral-200 rounded-lg mb-3 p-3">
        <FiSearch className="text-neutral-400 text-lg hover:text-neutral-500 cursor-pointer" />
        <input
          type="text"
          placeholder="Search posts, boards, or people..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-sm text-neutral-900 placeholder-neutral-500 focus:outline-none"
          aria-label="Search posts"
        />
      </div>

      {/* Filter bar */}
      <div className="bg-white border border-neutral-200 rounded-lg mb-4 p-2 flex items-center gap-1">
        {filters.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => handleFilterChange(value)}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150
              ${
                filter === value
                  ? "bg-neutral-100 text-neutral-900"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              }
              focus:outline-none cursor-pointer
            `}
            aria-label={`Filter by ${label}`}
            aria-pressed={filter === value}
          >
            <Icon className="text-xs" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <Loading />
      ) : error.hasError ? (
        <ErrorDisplay error={error.status} title={error.message} />
      ) : (
        <div
          className={`transition-opacity duration-150 ${
            isTransitioning ? "opacity-40" : "opacity-100"
          }`}
          role="region"
          aria-live="polite"
          aria-label="Feed posts"
        >
          {posts.length > 0 ? (
            <div className="">
              {posts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  isFirst={index === 0}
                  isLast={index === posts.length - 1}
                  postType={post.files.length > 0 ? "library" : "post"}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="bg-neutral-100 rounded-full p-6 mb-4">
                <FaInbox className="text-4xl text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                No posts yet. Be a first one to post
              </h3>
              <p className="text-neutral-600 text-sm text-center max-w-sm">
                {searchQuery.trim()
                  ? `No results found for "${searchQuery}"`
                  : filter === "following"
                  ? "No posts from your boards. Check other filters."
                  : "Be the first to post something!"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Feeds;
