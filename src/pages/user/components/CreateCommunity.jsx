import React, { useEffect, useMemo, useState } from "react";
import { FiArrowLeft, FiSend } from "react-icons/fi";

import {
  useCheckDescNameIsAvailableQuery,
  useCreateDescMutation,
} from "../../../services/descsApi.js";
import {
  useCheckBoardNameIsAvailableQuery,
  useCreateBoardMutation,
} from "../../../services/boardsApi.js";

const communityTypes = {
  board: { name: "Board", path: "b" },
  desc: { name: "Desc", path: "d" },
};
let n = 0;
const CreateCommunity = () => {
  const [communityName, setCommunityName] = useState("");
const [communityDescription, setCommunityDescription] = useState("");
const [communityType, setCommunityType] = useState("board");
const [hasSpecialChar, setHasSpecialChar] = useState(false);
const [createBoard, { isLoading: isBoardLoading }] = useCreateBoardMutation();
const [createDesc, { isLoading: isDescLoading }] = useCreateDescMutation();

const { data: isBoardNameAvailable, isFetching: isFetchingBoard } = useCheckBoardNameIsAvailableQuery(
  { name: communityName },
  { skip: !communityName.trim() || communityType !== "board" }
);
const { data: isDescNameAvailable, isFetching: isFetchingDesc } = useCheckDescNameIsAvailableQuery(
  { name: communityName },
  { skip: !communityName.trim() || communityType !== "desc" }
);

const isNameAvailable = useMemo(() => {
  if (!communityName.trim()) return true;
  
  if (communityType === "board") {
    return isBoardNameAvailable?.isAvailable ?? false; // Default to false while loading
  }
  return isDescNameAvailable?.isAvailable ?? false;
}, [communityName, communityType, isBoardNameAvailable, isDescNameAvailable]);

const isChecking = communityType === "board" ? isFetchingBoard : isFetchingDesc;
const isCreateDisabled = !communityName.trim() || !isNameAvailable || isChecking || isBoardLoading || isDescLoading;

const handleCommunityNameChange = (e) => {
  const value = e.target.value;
  
  if (value.length === 0) {
    setHasSpecialChar(false);
    setCommunityName("");
    return;
  }
  
  const isValid = /^[A-Za-z0-9 _-]+$/.test(value);
  setHasSpecialChar(!isValid);
  
  if (isValid) {
    setCommunityName(value.replace(/\s+/g, "-"));
  }
};

const finalSubmission = async () => {
  if (isCreateDisabled) return; // Guard clause
  
  const createFn = communityType === "board" ? createBoard : createDesc;
  try {
    const result = await createFn({
      name: communityName,
      description: communityDescription,
    }).unwrap();
    
    console.log("Success:", result);
    // TODO: Handle success (e.g., redirect, show success message)
  } catch (err) {
    console.error("Error creating community:", err);
    // TODO: Show error message to user
  }
};

  return (
    <div className="relative min-h-screen bg-primary/50">
      {hasSpecialChar && (
        <div
          role="alert"
          style={{ animation: "fadeIn 0.5s ease-out" }}
          className="fixed flex flex-col left-1/3 bottom-6 -translate-x-1/3 
               p-4 text-sm font-medium text-red-600 rounded-xl
               bg-red-300/10 backdrop-blur-md shadow-lg
               border border-red-500/30
               "
        >
          <span>
            <strong>Oops!</strong> Some special characters aren't allowed.
            Please use only{" "}
            <strong>letters, numbers, dashes (-), or underscores (_).</strong>
          </span>
          <button
            onClick={() => setHasSpecialChar(false)}
            type="button"
            className="block self-end py-1 px-2 border rounded-lg cursor-pointer hover:bg-red-300/20 "
          >
            Ok
          </button>
        </div>
      )}

      <div className="max-w-2xl w-full mx-auto px-4 py-8">
        <div className="text-center p-2 md:p-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Create a new community
          </h1>
          <p className="text-slate-600">
            Organize posts and ideas or tests under a shared theme
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200">
          <div className="flex gap-4 p-4 border-b border-slate-100">
            <label
              htmlFor="board"
              className="flex items-center gap-3 cursor-pointer select-none p-2 rounded-md hover:bg-slate-50"
            >
              <input
                id="board"
                name="board-type"
                type="radio"
                value="board"
                checked={communityType === "board"}
                onChange={() => setCommunityType("board")}
                className="h-4 w-4 text-blue-600 accent-blue-600"
              />
              <div className="flex flex-col">
                <span className="font-medium text-neutral-800">Board</span>
                <span className="text-xs text-slate-500">
                  Create a new board to collect posts
                </span>
              </div>
            </label>
            <label
              htmlFor="desc"
              className="flex items-center gap-3 cursor-pointer select-none p-2 rounded-md hover:bg-slate-50"
            >
              <input
                id="desc"
                name="board-type"
                type="radio"
                value="desc"
                checked={communityType === "desc"}
                onChange={() => setCommunityType("desc")}
                className="h-4 w-4 text-blue-600 accent-blue-600"
              />
              <div className="flex flex-col">
                <span className="font-medium text-neutral-800">Desc</span>
                <span className="text-xs text-slate-500">
                  Create a new desc to collect tests
                </span>
              </div>
            </label>
          </div>
          <div className="p-6 border-b border-slate-100">
            <div className="grid gap-5">
              <div className="">
                <label className="flex flex-col gap-2">
                  <span className="font-medium text-neutral-800">
                    {communityTypes[communityType].name} name
                  </span>
                  <input
                    type="text"
                    value={communityName}
                    onChange={handleCommunityNameChange}
                    placeholder="e.g., Study-Resources, Design-Inspirations"
                    className={`input w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                      isNameAvailable
                        ? "border-slate-200 focus:ring-blue-500/30 focus:border-blue-500"
                        : "border-red-500 focus:ring-red-500/30 focus:border-red-500 text-red-500"
                    } placeholder-slate-400`}
                  />
                </label>
                <p
                  className={`text-xs transition-all duration-300 ease-out
                 ${
                   communityName
                     ? "mt-1 max-h-10 opacity-100"
                     : "mt-0 max-h-0 opacity-0 overflow-hidden"
                 }
                 ${isNameAvailable ? "text-slate-500" : "text-red-500"}
                 `}
                >
                  {communityTypes[communityType].path}/{communityName}
                  {!isNameAvailable && (
                    <span className="pl-0.5">
                      this username is taken, choose another one
                    </span>
                  )}
                </p>
              </div>
              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">
                  Description
                </span>
                <textarea
                  value={communityDescription}
                  onChange={(e) => setCommunityDescription(e.target.value)}
                  placeholder={`What is this ${communityTypes[communityType].name} about? Who is it for?`}
                  className="w-full min-h-[120px] px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 placeholder-slate-400 resize-y"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 bg-primary-bg flex items-center justify-between">
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors">
            <FiArrowLeft className="text-base" />
            Cancel
          </button>

          <button
            disabled={isCreateDisabled}
            onClick={finalSubmission}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/25 disabled:shadow-none font-medium"
          >
            <FiSend className="text-base" />
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunity;
