import React from "react";

const AboutUs = () => {
  return (
    <main className="px-4 py-16 max-w-5xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-black text-neutral-900 mb-4">
          A platform made by UniMe students — for UniMe students.
        </h1>
        <p className="text-neutral-700 max-w-2xl mx-auto">
          We’re building a space where learning, collaboration, and community come together.
        </p>
      </header>

      <section className="mb-12 bg-white rounded-2xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-neutral-900 mb-3">Our Story</h2>
        <p className="text-neutral-700">
          UniHub started with two UniMe students who wanted an easier way to prepare for coding exams. Instead of isolated studying and scattered notes, they built a platform to centralize everything — tests, quizzes, and a social space where anyone could post, share, or ask for help without judgment.
        </p>
      </section>

      <section className="mb-12 bg-white rounded-2xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-neutral-900 mb-3">Our Mission</h2>
        <p className="text-neutral-700">
          To make studying feel less lonely and more powerful. We’re creating a space where learning, collaboration, and community come together — because exams are temporary, but knowledge shared lasts.
        </p>
      </section>

      <section className="bg-white rounded-2xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-neutral-900 mb-3">The Team</h2>
        <p className="text-neutral-700 mb-4">We’re a small two-person team:</p>
        <ul className="list-disc pl-6 text-neutral-800 space-y-2">
          <li><strong>Founder & Backend Developer</strong> — The mind behind the idea.</li>
          <li><strong>Frontend Developer</strong> — The hands behind the interface.</li>
        </ul>
        <p className="text-neutral-700 mt-4">
          Together, we’re building what we wish existed when we first came to UniMe.
        </p>
      </section>
    </main>
  );
};

export default AboutUs;


