import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <div
      className="
        bg-white border border-gray-200 rounded-xl p-6
        hover:shadow-lg hover:border-blue-300
        transition duration-300
      "
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{project.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {project.desc}
          </p>
        </div>

        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
          {project.bugs} bugs
        </span>
      </div>

      {/* Bug Stats */}
      <div className="mt-4 space-y-2 text-sm">

        <div className="flex items-center gap-2">
          <span className="text-red-500">●</span>
          <span>Open bugs:</span>
          <span className="ml-auto font-medium">
            {project.open}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-green-500">●</span>
          <span>Resolved bugs:</span>
          <span className="ml-auto font-medium">
            {project.resolved}
          </span>
        </div>

        <div>
          <span>Project health: </span>
          <span
            className={`font-medium ${project.health === "Needs Attention"
                ? "text-red-500"
                : project.health === "Moderate"
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}
          >
            {project.health}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <p className="text-xs text-gray-500 mb-1">
          Resolution Progress
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {project.progress}%
        </p>
      </div>

      {/* Meta Info */}
      <div className="mt-4 text-xs text-gray-500 space-y-1">
        <p>👥 Team size: {project.team} members</p>
        <p>📅 Created: {project.created}</p>
        <p>👤 Created by: {project.creator}</p>
      </div>

      {/* Buttons */}
      <div className="mt-5 flex justify-between items-center">

        <Link
          to={`/projects/${project.id}`}
          className="border border-gray-300 px-3 py-1 rounded-md text-sm
             hover:bg-gray-100 transition"
        >
          View Project
        </Link>


        <Link
          to="/report"
          className="
            flex items-center gap-1 text-sm text-blue-600
            hover:underline
          "
        >
          🐞 Report Bug
        </Link>
      </div>
    </div>
  );
}
