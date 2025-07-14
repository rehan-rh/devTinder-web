import React from "react";

const fallbackImg =
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80";

const ProjectCard = ({
  project: {
    title,
    description,
    techStack = [],
    screenshot,
    github,
    demo,
  },
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 w-full max-w-md mx-auto flex flex-col">
      <img
        src={screenshot || fallbackImg}
        alt={title}
        className="w-full h-48 object-cover rounded-t-2xl"
        onError={e => (e.target.src = fallbackImg)}
      />
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-bold text-purple-700 mb-2">{title}</h2>
        <p className="text-gray-700 mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech, idx) => (
            <span
              key={idx}
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold shadow"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4 mt-auto">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-purple-600 transition"
              title="GitHub"
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.89.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.74 1.27 3.41.97.11-.76.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.99.01 2 .13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.73.11 3.02.74.81 1.19 1.84 1.19 3.1 0 4.43-2.68 5.41-5.24 5.7.42.36.8 1.09.8 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.67.8.56C20.71 21.38 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/>
              </svg>
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-600 transition"
              title="Live Demo"
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
