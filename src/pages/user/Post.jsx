import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiShare2,
  FiSend,
  FiPlus,
  FiMinus,
  FiChevronLeft,
} from "react-icons/fi";
import { FaArrowDown, FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import {
  useGetPostFromBoardByPostIdQuery,
  useTogglePostLikeMutation,
} from "../../services/postsApi";
import {
  useCreateCommentByBoardPostMutation,
  useGetCommentsByBoardPostQuery,
  useToggleCommentLikeByCommentIdMutation,
} from "../../services/commentsApi";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import ErrorDisplay from "../../components/ErrorDisplay";
import { useSelector } from "react-redux";
import RelativeTime from "../../components/RelativeTime";

const getType = {
  post: ["b", "board"],
  quiz: ["d", "desc"],
  library: ["b", "board"],
};

const Comment = ({
  comment,
  getInitials,
  depth = 0,
  activeReplyId,
  setActiveReplyId,
  handleReplySubmit,
}) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [replyText, setReplyText] = useState("");
  const [isRepliesShown, setIsRepliesShown] = useState(false);
  const [isLiked, setIsLiked] = useState(comment.youLiked);
  const commentLikeCountRef = useRef(null);
  const [toggleCommentLike] = useToggleCommentLikeByCommentIdMutation();
  const isReplying = activeReplyId === comment.id;

  const handleReplyClick = () => {
    if (isReplying) {
      setActiveReplyId(null);
      setReplyText("");
    } else {
      setActiveReplyId(comment.id);
      setReplyText("");
    }
  };

  const onReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      handleReplySubmit(e, comment.id, replyText, setReplyText);
      setReplyText("");
      setActiveReplyId(null);
    }
  };
  const onToggleCommentLike = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const res = await toggleCommentLike({ comment: comment.id }).unwrap();
    setIsLiked(res.toggle);
    if (res.toggle) {
      commentLikeCountRef.current.textContent =
        Number(commentLikeCountRef.current.textContent) + 1;
    } else {
      commentLikeCountRef.current.textContent =
        Number(commentLikeCountRef.current.textContent) - 1;
    }
  };
  return (
    <div>
      <div className="flex gap-3">
        {/* Avatar and Thread Line Column */}
        <div className="flex flex-col items-center gap-2">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {getInitials(comment.author.username)}
          </div>

          {/* Vertical Line for nested comments */}
          {comment.direct_children_count > 0 && (
            <div className="w-0.5 bg-gray-300 flex-1 min-h-[20px]" />
          )}
        </div>

        {/* Content Column */}
        <div className="w-full flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            {/* Username and metadata */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-900 hover:underline cursor-pointer">
                u/{comment.author.username}
              </span>
              <RelativeTime date={comment.created_at} className="flex items-center text-[12px] text-gray-600"/>
            </div>
            {/* Comment body */}
            <div className="text-sm text-gray-900 leading-relaxed">
              {comment.body}
            </div>
            {/* Action buttons */}
            <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
              <button
                onClick={onToggleCommentLike}
                className="flex items-center gap-1 hover:bg-gray-100 px-1 py-0.5 rounded transition-colors"
              >
                {isLiked ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
                <span
                  ref={commentLikeCountRef}
                  className={isLiked ? "text-red-500" : ""}
                >
                  {comment.likes_count}
                </span>
              </button>
              <button
                onClick={handleReplyClick}
                className="hover:bg-gray-100 px-2 py-0.5 rounded transition-colors"
              >
                {isReplying ? "✕ Cancel" : "Reply"}
              </button>
            </div>
          </div>

          {/* Reply Input */}
          {isAuthenticated && isReplying && (
            <div className="flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onReplySubmit(e);
                  }
                }}
                placeholder={`Reply to u/${comment.author.username}...`}
                autoFocus
                className="flex-1 w-full px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={onReplySubmit}
                disabled={!replyText.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded font-bold hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
              >
                <FiSend />
              </button>
            </div>
          )}

          {/* Render nested comments */}
          {isRepliesShown &&
            comment.direct_children &&
            comment.direct_children.length > 0 && (
              <div className="space-y-4">
                {comment.direct_children.map((child) => (
                  <Comment
                    key={child.id}
                    comment={child}
                    getInitials={getInitials}
                    depth={depth + 1}
                    activeReplyId={activeReplyId}
                    setActiveReplyId={setActiveReplyId}
                    handleReplySubmit={handleReplySubmit}
                  />
                ))}
              </div>
            )}

          {/* Show more replies indicator */}
          {comment.direct_children_count > 0 &&
            comment.direct_children.length > 0 && (
              <div className="flex items-center gap-2">
                <div
                  className="border rounded-full p-0.5 text-xs cursor-pointer hover:text-neutral-600"
                  onClick={() => setIsRepliesShown((prev) => !prev)}
                >
                  {isRepliesShown ? <FiMinus /> : <FiPlus />}
                </div>
                {!isRepliesShown && (
                  <p className="flex items-center gap-1 text-xs text-blue-600 font-bold cursor-pointer hover:underline">
                    <span>{comment.direct_children_count}</span>
                    <span>
                      {comment.direct_children_count === 1
                        ? "reply"
                        : "replies"}
                    </span>
                  </p>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

const Post = ({ postType }) => {
  const { board, postId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [newComment, setNewComment] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const commentCountRef = useRef(null);
  const postLikesCountRef = useRef(null);
  const [postComment, { error, isLoading, isError }] =
    useCreateCommentByBoardPostMutation();
  const [togglePostLike, { error: togglePostLikeError }] =
    useTogglePostLikeMutation();
  const {
    data: postData,
    isLoading: isPostLoading,
    isError: isPostError,
    error: postError,
  } = useGetPostFromBoardByPostIdQuery({
    board,
    postId,
  });
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    error: commentsError,
  } = useGetCommentsByBoardPostQuery({
    board,
    postId,
    queryParams: undefined,
  });
  //Handling the Post status for: isLoading, isError
  if (isPostLoading) return <Loading />;
  if (isPostError) {
    if (postError.status === 404) return <NotFound />;
    return <ErrorDisplay />;
  }

  const handleCommentSubmit = async (e, parent_id, body = "", setEmpty) => {
    e.preventDefault();
    if (body.trim()) {
      const res = await postComment({
        board,
        post: postId,
        bodyData: { parent_id, body },
      });
      //It gets the textContent of the comment count and adds 1 when the comment submission is OK
      commentCountRef.current.textContent =
        Number(commentCountRef.current.textContent) + 1;
      setEmpty("");
      setActiveReplyId(null);
    }
  };

  const handleAuthorClick = (e, path) => {
    e.stopPropagation();
    navigate(path);
  };

  const handleBoardClick = (e, path) => {
    e.stopPropagation();
    navigate(path);
  };
  const onTogglePostLike = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const res = await togglePostLike({ board, post: postId }).unwrap();
    setIsPostLiked(res.toggle);
    if (res.toggle) {
      postLikesCountRef.current.textContent =
        Number(postLikesCountRef.current.textContent) + 1;
    } else {
      postLikesCountRef.current.textContent =
        Number(postLikesCountRef.current.textContent) - 1;
    }
  };
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-primary-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Main Post Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Post Header */}
          <div className="px-4 border-b border-gray-200">
            <div className="flex items-center gap-2 py-4">
              {/* Back button */}
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors font-medium cursor-pointer"
              >
                <FiChevronLeft className="text-2xl" />
              </button>
              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-shadow cursor-pointer ring-2 ring-white"
                  onClick={(e) =>
                    handleAuthorClick(
                      e,
                      `/user/${postData.data.author.username}`
                    )
                  }
                >
                  <p className="w-11 h-11 flex items-center justify-center rounded-full">
                    {getInitials(postData.data.author.username)}
                  </p>
                </div>
                <div>
                  <p
                    className="max-w-5/6 w-full text-primary-blue text-base cursor-pointer hover:underline truncate font-medium"
                    role="button"
                    tabIndex={0}
                    onClick={(e) =>
                      handleBoardClick(
                        e,
                        `/${getType[postType][0]}/${postData.data.board.name}`
                      )
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      handleBoardClick(
                        e,
                        `/${getType[postType][0]}/${postData.data.board.name}`
                      )
                    }
                  >
                    {getType[postType][0]}/{postData.data.board.name}
                  </p>
                  <p className="text-[12px] flex items-center gap-1">
                    <span
                      onClick={(e) =>
                        handleAuthorClick(
                          e,
                          `/user/${postData.data.author.username}`
                        )
                      }
                      className="cursor-pointer hover:underline"
                      role="link"
                      tabIndex={0}
                    >
                      u/{postData.data.author.username}
                    </span>
                    <RelativeTime date={postData.data.created_at} className="flex items-center text-gray-700 ml-1 "/>
                  </p>
                </div>
              </div>
            </div>

            {/* Content based on post type */}
            <div className="pb-4">
              {postType === "test" ? (
                <div className="group flex justify-between items-center border-l-4 border-blue-500 bg-blue-50 p-4 rounded hover:bg-blue-100 transition-colors duration-200">
                  <div className="flex flex-col gap-2">
                    <p className="font-medium">{postData.data.title}</p>
                    <p className="text-sm text-neutral-600">
                      {postData.data.body}
                    </p>
                  </div>
                  <button
                    className="ml-auto px-4 py-2 rounded bg-primary-blue text-white text-sm hover:bg-primary-blue/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Start
                  </button>
                </div>
              ) : postData.data.type === "library" ? (
                <div className="flex flex-col gap-3">
                  <p className="font-bold text-2xl">{postData.data.title}</p>
                  <div className="flex items-center gap-3 border-l-4 border-green-500 bg-green-50 p-4 rounded hover:bg-green-100 transition-colors duration-200 cursor-pointer">
                    <div className="bg-blue-500 text-white rounded-full p-3 text-xl flex-shrink-0">
                      <FaArrowDown />
                    </div>
                    <div className="flex flex-col gap-1 text-neutral-500">
                      <p className="text-neutral-900 text-sm font-medium">
                        {postData.data.file?.name}
                      </p>
                      <p className="text-xs">
                        {postData.data.file?.size || "3.5mb"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <h1 className="font-bold text-2xl">{postData.data.title}</h1>
                  <p className="text-gray-700">{postData.data.body}</p>
                </div>
              )}
            </div>
          </div>
          {/* Post Actions */}
          <div className="px-4 py-3 border-t border-gray-200">
            <div className="flex items-center gap-4 text-neutral-600 text-sm">
              <button
                onClick={onTogglePostLike}
                className="flex items-center gap-2 hover:text-neutral-900 p-2 -m-2 rounded transition-colors duration-200 focus:outline-none"
                title={isPostLiked ? "Unlike" : "Like"}
                aria-label={`${postData.data.likes_count} likes`}
              >
                {isPostLiked ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
                <span
                  ref={postLikesCountRef}
                  className={isPostLiked ? "text-red-500" : ""}
                >
                  {postData.data.likes_count}
                </span>
              </button>
              <button
                className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors duration-200 cursor-pointer"
                title="Share"
              >
                <FiShare2 />
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-gray-200 p-6 flex flex-col gap-6">
            {/* Add Comment Form */}
            {isAuthenticated && (
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-semibold">
                    U
                  </div>
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleCommentSubmit(e, null, newComment, setNewComment);
                      }
                    }}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue placeholder-neutral-400"
                  />
                  <button
                    onClick={(e) =>
                      handleCommentSubmit(e, null, newComment, setNewComment)
                    }
                    disabled={!newComment.trim()}
                    className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-blue/90 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors flex items-center text-sm font-medium"
                  >
                    <FiSend />
                  </button>
                </div>
              </div>
            )}

            <h4 className="font-semibold text-neutral-900 flex items-center gap-2 text-base">
              <FaRegComment className="text-neutral-600" />
              <span>
                Comments (
                <span ref={commentCountRef}>
                  {postData?.data.comments_count || 0}
                </span>
                )
              </span>
            </h4>

            {/* Render all root comments */}
            {isCommentsLoading ? (
              <Loading />
            ) : (
              <div className="space-y-4">
                {commentsData?.data && commentsData.data.length > 0 ? (
                  commentsData.data.map((comment) => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      getInitials={getInitials}
                      depth={0}
                      activeReplyId={activeReplyId}
                      setActiveReplyId={setActiveReplyId}
                      handleReplySubmit={handleCommentSubmit}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center gap-3 py-8 text-neutral-500">
                    <FaRegComment className="text-3xl opacity-50" />
                    <p className="text-sm">
                      No comments yet. Be the first to comment!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
