// src/components/HomeScreen.js
import React from "react";
import { Link } from "react-router-dom";

const HomeScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
    {/* Hero Section */}
    <div className="hero min-h-[80vh] px-4">
      <div className="hero-content text-center">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500">
            DevTinder
          </h1>
          <p className="mb-8 text-xl md:text-2xl font-light opacity-95 max-w-xl mx-auto">
            Connect with developers you vibe with.<br />
            Swipe, match, and unlock your next career opportunity.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/login"
              className="btn btn-accent hover:btn-primary btn-lg transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/signup"
              className="btn btn-outline hover:btn-ghost btn-lg text-white border-white hover:text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* Features Section */}
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
        How DevTinder Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card card-compact bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 text-white transition-transform hover:scale-105 duration-300">
          <div className="text-6xl mb-4">👩‍💻</div>
          <h3 className="text-2xl font-bold mb-3">Discover</h3>
          <p className="mb-4 text-gray-200">
            Find developers who match your skills, interests, and career goals.
          </p>
        </div>
        <div className="card card-compact bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 text-white transition-transform hover:scale-105 duration-300">
          <div className="text-6xl mb-4">🤝</div>
          <h3 className="text-2xl font-bold mb-3">Connect</h3>
          <p className="mb-4 text-gray-200">
            Swipe to send connection requests. Build genuine professional relationships.
          </p>
        </div>
        <div className="card card-compact bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 text-white transition-transform hover:scale-105 duration-300">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold mb-3">Collaborate</h3>
          <p className="mb-4 text-gray-200">
            Chat, share projects, and start building together.
          </p>
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-6">
          Ready to grow your network?
        </h2>
        <p className="mb-8 text-xl font-light opacity-90">
          Join thousands of developers who are already connecting, collaborating, and building the future.
        </p>
        <Link
          to="/login"
          className="btn btn-lg btn-accent hover:btn-primary transition-colors"
        >
          Start Now – It's Free!
        </Link>
      </div>
    </div>
  </div>
);

export default HomeScreen;
