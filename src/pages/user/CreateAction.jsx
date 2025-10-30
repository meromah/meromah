import React, { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";

// Lazy load each action
const CreatePost = lazy(() => import("./components/CreatePost"));
const CreateCommunity = lazy(() => import("./components/CreateCommunity"));
const CreateTest = lazy(() => import("./components/CreateTest"));
const actions = {
  post: CreatePost,
  community: CreateCommunity,
  test: CreateTest,
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
