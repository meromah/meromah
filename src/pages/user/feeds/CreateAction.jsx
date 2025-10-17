import React, { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";

// Lazy load each action
const CreatePost = lazy(() => import("./CreatePost"));
const CreateBoard = lazy(() => import("./CreateBoard"));
const CreateLibrary = lazy(() => import("./CreateLibrary"));
// const CreateQuiz = lazy(() => import("./CreateQuiz"));

const actions = {
  post: CreatePost,
  board: CreateBoard,
  library: CreateLibrary,
  // quiz: CreateQuiz,
};

const CreateAction = () => {
  const { action } = useParams();
  const ActionComponent = actions[action];

  if (!ActionComponent) {
    return <h2>Unknown action: {action}</h2>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ActionComponent />
    </Suspense>
  );
};

export default CreateAction;
