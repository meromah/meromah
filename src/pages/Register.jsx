import React from "react";

const Register = () => {
  return (
    <main className="px-4 py-16 max-w-md mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-black text-neutral-900 mb-2">Join UniHub</h1>
        <p className="text-neutral-700">Create your account and start learning, sharing, and vibing.</p>
      </header>

      <form className="bg-white rounded-2xl p-6 sm:p-8 shadow">
        <div className="grid gap-4">
          <label className="flex flex-col gap-2">
            <span className="font-medium text-neutral-800">Username</span>
            <input type="text" className="input" placeholder="@username" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-medium text-neutral-800">Email</span>
            <input type="email" className="input" placeholder="you@example.com" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-medium text-neutral-800">Password</span>
            <input type="password" className="input" placeholder="••••••••" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-medium text-neutral-800">Confirm Password</span>
            <input type="password" className="input" placeholder="••••••••" />
          </label>
          <button type="button" className="btn-cta bg-primary-yellow text-neutral-900 font-semibold hover:bg-primary-yellow/90 w-full">Create account</button>
        </div>
      </form>

      <p className="text-center text-neutral-700 mt-4">
        Already have an account? <a href="/login" className="text-primary-blue underline">Login</a>
      </p>
    </main>
  );
};

export default Register;


