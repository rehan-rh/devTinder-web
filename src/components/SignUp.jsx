import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants"; // Make sure this points to your backend (e.g., http://localhost:7777)
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    // Trim inputs to avoid whitespace issues
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmailId = emailId.trim();

    if (!trimmedFirstName || !trimmedLastName || !trimmedEmailId || !password) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        BASE_URL + "/signup",
        {
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
          emailId: trimmedEmailId,
          password,
        },
        { withCredentials: true }
      );
      navigate("/login");
    } catch (err) {
      // Log the full error for debugging
      console.error("Signup error:", err.response);
      setError(
        err?.response?.data?.message ||
        err?.response?.data ||
        "Sign up failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-100 via-blue-100 to-purple-100">
      <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSignUp} className="space-y-5">
          {/* First Name */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              className="input w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              value={firstName}
              placeholder="First name"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          {/* Last Name */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              className="input w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              value={lastName}
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          {/* Email */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="input w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              value={emailId}
              placeholder="you@example.com"
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
          </div>
          {/* Password */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="input w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                value={password}
                placeholder="Create a password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-400 hover:text-purple-400"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  // Eye open icon
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  // Eye closed icon
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-6.06" />
                    <path d="M1 1l22 22" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg shadow-md hover:from-purple-600 hover:to-pink-600 focus:outline-none transition disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin mr-2 h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Signing up...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            className="text-purple-600 hover:underline focus:outline-none"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
