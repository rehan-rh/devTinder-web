import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import UserCard from "./UserCard";
import ProjectCard from "./ProjectCard";
import EditProfile from "./EditProfile";
import AddProject from "./AddProject";
import { BASE_URL } from "../utils/constants";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's projects from backend
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/projects/mine`, { withCredentials: true });
      setProjects(res.data);
    } catch (err) {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchProjects();
    // eslint-disable-next-line
  }, [user]);

  // Refresh projects after adding a new one
  const handleProjectAdded = () => {
    fetchProjects();
    setAdding(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 py-10">
      {!editing ? (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-4xl font-bold text-purple-700 mb-8">My Profile</h1>
          <UserCard user={user} isOwnProfile={true} />
          <button
            className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:from-purple-700 hover:to-pink-700"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
          <h2 className="text-2xl font-bold text-purple-700 mb-4 mt-10">My Projects</h2>
          <button
            className="mb-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold shadow hover:from-purple-600 hover:to-pink-600 transition"
            onClick={() => setAdding(true)}
          >
            Add Project
          </button>
          {adding && <AddProject onClose={() => setAdding(false)} onProjectAdded={handleProjectAdded} />}
          {loading ? (
            <div className="text-center text-gray-500">Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))
              ) : (
                <div className="col-span-full text-gray-500 text-center">
                  No projects to display yet.
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <EditProfile user={user} onClose={() => setEditing(false)} />
      )}
    </div>
  );
};

export default Profile;
