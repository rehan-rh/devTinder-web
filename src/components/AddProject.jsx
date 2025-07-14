import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const AddProject = ({ onClose, onProjectAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");
  const [screenshot, setScreenshot] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) {
      setError("Title and description are required.");
      return;
    }

    const techStackArray = techStack
      ? techStack.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    try {
      const res = await axios.post(
        `${BASE_URL}/projects`,
        {
          title: trimmedTitle,
          description: trimmedDescription,
          techStack: techStackArray,
          github: github.trim(),
          demo: demo.trim(),
          screenshot: screenshot.trim(),
        },
        { withCredentials: true }
      );
      // Optionally, notify parent to refresh the project list
      if (onProjectAdded) onProjectAdded(res.data);
      if (onClose) onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data ||
        "Could not add project."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-2xl p-8 max-w-lg mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Add New Project</h2>
      <input
        className="input w-full"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="input w-full"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        className="input w-full"
        placeholder="Tech Stack (comma separated)"
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
      />
      <input
        className="input w-full"
        placeholder="GitHub Link"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />
      <input
        className="input w-full"
        placeholder="Live Demo Link"
        value={demo}
        onChange={(e) => setDemo(e.target.value)}
      />
      <input
        className="input w-full"
        placeholder="Screenshot URL"
        value={screenshot}
        onChange={(e) => setScreenshot(e.target.value)}
      />
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="btn btn-primary bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        >
          Add Project
        </button>
        {onClose && (
          <button
            type="button"
            className="btn"
            onClick={onClose}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AddProject;
