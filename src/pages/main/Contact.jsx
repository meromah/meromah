import React, { useState } from "react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="px-4 py-16 max-w-3xl mx-auto">
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-black text-neutral-900 mb-4">Got something to say? Let’s hear it.</h1>
        <p className="text-neutral-700">Whether it’s a bug, idea, or feedback — we’re always open. Send us a message and we’ll get back as soon as possible.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow">
        <div className="grid grid-cols-1 gap-4">
          <label className="flex flex-col gap-2">
            <span className="font-medium text-neutral-800">Name</span>
            <input type="text" required className="input" placeholder="Your name" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-medium text-neutral-800">Email</span>
            <input type="email" required className="input" placeholder="you@example.com" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-medium text-neutral-800">Message</span>
            <textarea required rows={5} className="input resize-y" placeholder="Tell us what's on your mind" />
          </label>
          <button type="submit" className="btn-cta bg-primary-yellow text-neutral-900 font-semibold hover:bg-primary-yellow/90 w-fit">Send it off 🚀</button>
        </div>
        {submitted && (
          <p className="mt-4 text-green-700">Thanks for reaching out! We’ll get back to you soon — promise.</p>
        )}
      </form>
    </main>
  );
};

export default Contact;


