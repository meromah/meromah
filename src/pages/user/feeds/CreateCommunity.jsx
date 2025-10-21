import React, { useState } from "react";
import { FiArrowLeft, FiSend } from "react-icons/fi";
const communityTypes = {
  board: { name: "Board", path: "b" },
  desc: { name: "Desc", path: "d" },
};
const CreateCommunity = () => {
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [communityType, setCommunityType] = useState("board");
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  

  const isCreateDisabled = !communityName.trim();
  const handleCommunityNameChange = (e) => {
    if (e.target.value.length === 0) {
      setHasSpecialChar(false);
      setCommunityName("");
      return;
    }
    const isValid = /^[A-Za-z0-9 _-]+$/.test(e.target.value);

    if (!isValid) {
      setHasSpecialChar(true);
      return;
    }
    setHasSpecialChar(false);
    setCommunityName(e.target.value.replace(/\s+/g, "-"));
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

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
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
                    className="input w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 placeholder-slate-400"
                  />
                </label>
                <p
                  className={`text-xs text-slate-500 transition-all duration-300 ease-out
                 ${
                   communityName
                     ? "mt-1 max-h-10 opacity-100"
                     : "mt-0 max-h-0 opacity-0 overflow-hidden"
                 }`}
                >
                  {communityTypes[communityType].path}/{communityName}
                </p>
              </div>
              <label className="flex flex-col gap-2">
                <span className="font-medium text-neutral-800">Description</span>
                <textarea
                  value={communityDescription}
                  onChange={(e) => setCommunityDescription(e.target.value)}
                  placeholder={`What is this ${communityTypes[communityType].names} about? Who is it for?`}
                  className="w-full min-h-[120px] px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 placeholder-slate-400 resize-y"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 bg-slate-50 flex items-center justify-between">
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors">
            <FiArrowLeft className="text-base" />
            Cancel
          </button>

          <button
            disabled={isCreateDisabled}
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
