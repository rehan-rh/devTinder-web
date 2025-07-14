import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err?.response?.data || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchConnections();
    // eslint-disable-next-line
  }, []);

  if (!connections) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (connections.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100">
        <h1 className="font-bold text-3xl text-purple-700 mb-2">Connections</h1>
        <p className="text-gray-500 text-lg">No connections found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 py-10">
      <h1 className="font-bold text-4xl text-center text-purple-700 mb-8 drop-shadow-lg">
        Connections
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
          return (
            <div
              key={_id}
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
            >
              <div className="mb-4">
                <img
                  alt="profile"
                  className="w-24 h-24 rounded-full ring-4 ring-purple-300 shadow-md object-cover"
                  src={photoUrl}
                />
              </div>
              <h2 className="font-bold text-2xl text-gray-800 mb-1">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-purple-500 font-medium mb-2">
                  {age} &bull; {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </p>
              )}
              <p className="text-gray-600 text-center">{about}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
