import React, { useState } from "react";
import { useLoginMutation } from "../../services/public/authApi";
import SuccessModal from "./components/SuccessModal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../app/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  /*
  I have to implement error handling for login failures, such as incorrect credentials or server issues.
 */

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { access_token, refresh_token } = await login({
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ access_token, refresh_token }));
      setShowSuccessModal(true);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  return (
    <main className="px-4 py-16 max-w-md mx-auto">
      {showSuccessModal && (
        <SuccessModal
          onClose={() => setShowSuccessModal(false)}
          header={"Welcome to UniHub!"}
          message={
            "Your logged in to your account successfully. Redirecting you to home..."
          }
        />
      )}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-black text-neutral-900 mb-2">
          Welcome back
        </h1>
        <p className="text-neutral-700">
          Sign in to post, not to spy — your info stays private.
        </p>
      </header>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white rounded-2xl p-6 sm:p-8 shadow"
      >
        <div className="grid gap-4">
          <label className="flex flex-col gap-2">
            <span className="font-medium text-neutral-800">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-2 pt-1 pb-1.5 focus:outline-1 text-primary-blue rounded-md border border-gray-200 focus:outline-primary-yellow"
              required
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-medium text-neutral-800">Password</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`px-2 pt-1 pb-1.5 focus:outline-1 text-primary-blue rounded-md border border-gray-200 focus:outline-primary-yellow`}
              required
            />
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 justify-center bg-primary-blue py-2 rounded-lg uppercase cursor-pointer hover:scale-105 transition-all duration-200 text-white font-semibold hover:bg-primary-blue/90 w-full"
          >
            <span>{isLoading ? "Logging in..." : "Log In"}</span>
            {isLoading && (
              <AiOutlineLoading3Quarters className="animate-spin text-white text-lg" />
            )}
          </button>
        </div>
      </form>

      <p className="flex items-center gap-2 justify-center text-center text-neutral-700 mt-4">
        <span>New here?</span>
        <a href="/register" className="text-primary-blue underline">
          Create an account
        </a>
      </p>
    </main>
  );
};

export default Login;
