import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import UserCard from "./UserCard";
import { TailSpin } from "react-loader-spinner";

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getFeed = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${BASE_URL}/feed?page=${page}&limit=10`, {
        withCredentials: true,
      });

      if (res.data.length === 0) {
        setHasMore(false);
        return;
      }

      setFeed((prev) => [...prev, ...res.data]);
      if (res.data.length < 10) setHasMore(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error loading feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
    // eslint-disable-next-line
  }, [page]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-purple-900 text-center mb-12">
          Discover Developers
          <span className="block mt-2 text-purple-500 text-lg font-normal">
            Connect with amazing developers worldwide
          </span>
        </h1>

        {error && (
          <div className="mb-8 p-4 bg-red-50 rounded-lg text-red-700 text-center">
            {error}
          </div>
        )}

        {feed.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No developers to show</p>
            <p className="mt-2 text-gray-500">Try adjusting your preferences</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {feed.map((user) => (
            <UserCard
              key={user._id}
              user={user}
            />
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold 
                        shadow-lg hover:shadow-xl transition-all duration-300 hover:from-purple-700 hover:to-pink-700
                        disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <TailSpin color="#FFF" height={24} width={24} />
                  <span className="ml-2">Loading...</span>
                </div>
              ) : (
                "Load More Developers"
              )}
            </button>
          </div>
        )}

        {!hasMore && feed.length > 0 && (
          <div className="mt-8 text-center text-gray-500">
            You've reached the end of the list
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
