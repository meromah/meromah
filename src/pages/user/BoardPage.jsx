import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import PostCard from "./components/PostCard";
import BoardHeader from "../../components/BoardHeader";
import { useDispatch } from "react-redux";
import { addRecentCommunity } from "../../app/recentCommunitiesSlice";
import { skipToken } from '@reduxjs/toolkit/query/react';

import { useGetBoardQuery } from '../../services/boardsApi.js';
import { useGetPostsForBoardQuery } from '../../services/postsApi.js';

const BoardPage = () => {

  const { boardName } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const location = useLocation();

  const { data: boardResponse, isLoading: boardIsLoading, error: boardError } = useGetBoardQuery(boardName || skipToken);
  const board = boardResponse?.data;
  const { data: postsResponse, isLoading: postsIsLoading, error: postsError } = useGetPostsForBoardQuery(board?.name ? {name: board?.name, queryParams: location.search} : skipToken);
  const posts = Array.isArray(postsResponse?.data) 
    ? postsResponse.data 
    : (Array.isArray(postsResponse) ? postsResponse : undefined);
  if (board) {
    console.log(board);
  }
  if (postsResponse) {
    console.log(postsResponse);
  }


  // did not test the code below
  useEffect(() => {
    if (!board?.id || !pathname || !board) return;
    dispatch(
      addRecentCommunity({
        id: `b/${board?.id}`,
        title: `b/${board?.name}`,
        to: pathname,
      })
    );
  }, [board?.id, board?.name, pathname, dispatch]);

  return (
    <div classname="min-h-screen bg-primary-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Board Header */}
        <BoardHeader board={board} />

        {/* Posts Feed */}
        <div className="bg-white rounded-lg shadow-sm">
          {posts?.length === 0 || !posts ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="bg-neutral-100 rounded-full p-6 mb-4">
                <svg
                  className="w-12 h-12 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                No posts yet
              </h3>
              <p className="text-neutral-600 text-sm text-center max-w-sm">
                Be the first to share something in this board!
              </p>
            </div>
          ) : (
            <div>
              {posts?.map((post) => {
                return (
                  <PostCard
                    key={post.id}
                    post={post}
                    author={post.author.username}
                    board_id={post.board_id}
                    likes_count={post.likes_count}
                    title={post.title}
                    body={post.body}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
