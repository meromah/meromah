import React from "react";

const Login = () => {
  return (
    <main className="px-4 py-16 max-w-md mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-black text-neutral-900 mb-2">Welcome back</h1>
        <p className="text-neutral-700">Sign in to post, not to spy — your info stays private.</p>
      </header>

      <form className="bg-white rounded-2xl p-6 sm:p-8 shadow">
        <div className="grid gap-4">
          <label className="flex flex-col gap-2">
            <span className="font-medium text-neutral-800">Email or Username</span>
            <input type="text" className="input" placeholder="you@example.com" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-medium text-neutral-800">Password</span>
            <input type="password" className="input" placeholder="••••••••" />
          </label>
          <button type="button" className="btn-cta bg-primary-blue text-white font-semibold hover:bg-primary-blue/90 w-full">Login</button>
        </div>
      </form>

      <p className="text-center text-neutral-700 mt-4">
        New here? <a href="/register" className="text-primary-blue underline">Create an account</a>
      </p>
    </main>
  );
};

export default Login;


