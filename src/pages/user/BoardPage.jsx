import React from "react";
import { useParams } from "react-router-dom";
import { mockPosts, boardsData } from "../../utils/constants";
import PostCard from "./components/PostCard";
import BoardHeader from "../../components/BoardHeader";

const BoardPage = () => {
  const { boardId } = useParams();
  
  // Find the board data
  const board = boardsData.find(b => b.id === boardId);
  
  // Filter posts for this board
  const boardPosts = mockPosts.filter(post => post.board === boardId);

  return (
    <div className="min-h-screen bg-primary-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Board Header */}
        <BoardHeader board={board} />
        
        {/* Posts Feed */}
        <div className="bg-white rounded-lg shadow-sm">
          {boardPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="bg-neutral-100 rounded-full p-6 mb-4">
                <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
              {boardPosts.map((post, i) => {
                const isFirst = i === 0;
                const isLast = i === boardPosts.length - 1;
                return (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    isFirst={isFirst} 
                    isLast={isLast} 
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
