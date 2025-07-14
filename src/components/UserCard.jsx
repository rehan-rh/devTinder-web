import React, { useState } from "react";

const UserCard = ({ user, isOwnProfile = false }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  const [reaction, setReaction] = useState(null); // 'interested' or 'ignored'

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-80 transition-transform hover:scale-105 duration-300">
        <div className="flex flex-col items-center p-6">
          <div className="mb-4">
            <img
              src={photoUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-purple-300 shadow-md"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-purple-500 font-medium mb-2">
              {age} &bull; {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </p>
          )}
          <p className="text-gray-600 text-center mb-4">{about}</p>
          {/* Show action buttons only if not own profile and not yet reacted */}
          {!isOwnProfile && !reaction && (
            <div className="flex gap-4 mt-2">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition font-semibold shadow"
                onClick={() => setReaction("ignored")}
              >
                Ignore
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition shadow"
                onClick={() => setReaction("interested")}
              >
                Interested
              </button>
            </div>
          )}
          {/* Show feedback after reaction */}
          {!isOwnProfile && reaction === "interested" && (
            <div className="mt-4 text-green-600 font-semibold">You marked as Interested!</div>
          )}
          {!isOwnProfile && reaction === "ignored" && (
            <div className="mt-4 text-gray-500 font-semibold">You ignored this profile.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
