import { useEffect, useState } from "react";
import API from "../api";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/projects")
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        setLoading(false);
      });
  }, []);

  // Summary calculations using fields returned by backend
  const totalProjects = projects.length;
  const totalBugs = projects.reduce((sum, p) => sum + p.bugs, 0);
  const totalOpen = projects.reduce((sum, p) => sum + p.open, 0);

  return (
    <div className="bg-gray-50 min-h-screen p-8">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Projects</h2>
        <p className="text-gray-500">
          Manage and monitor all your development projects
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white border border-gray-200 rounded-xl p-5
                        hover:shadow-lg hover:border-blue-300 transition">
          <p className="text-sm text-gray-500">Total Projects</p>
          <h3 className="text-2xl font-bold mt-2">{totalProjects}</h3>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5
                        hover:shadow-lg hover:border-blue-300 transition">
          <p className="text-sm text-gray-500 flex justify-between">
            Total Bugs
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
              {totalBugs}
            </span>
          </p>
          <h3 className="text-2xl font-bold mt-2">{totalBugs}</h3>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5
                        hover:shadow-lg hover:border-blue-300 transition">
          <p className="text-sm text-gray-500 flex justify-between">
            Open Bugs
            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
              {totalOpen}
            </span>
          </p>
          <h3 className="text-2xl font-bold mt-2 text-red-600">
            {totalOpen}
          </h3>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full border rounded-lg px-4 py-2 pl-10 text-sm 
                       focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Cards */}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading projects...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}

      {!loading && projects.length === 0 && (
        <p className="text-gray-500 text-sm mt-6">
          No projects found in database.
        </p>
      )}
    </div>
  );
}
