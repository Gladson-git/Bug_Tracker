import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";

export default function ProjectBugs() {
  const { id } = useParams();
  const [bugs, setBugs] = useState([]);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    // Fetch project name
    API.get(`/projects/${id}`)
      .then(res => setProjectName(res.data.name))
      .catch(() => {});

    // Fetch bugs for this project
    API.get(`/bugs/project/${id}`)
      .then(res => setBugs(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // Stats
  const total = bugs.length;
  const open = bugs.filter(b => b.status === "OPEN").length;
  const inProgress = bugs.filter(b => b.status === "IN_PROGRESS").length;
  const resolved = bugs.filter(b => b.status === "RESOLVED").length;

  return (
    <div className="bg-gray-50 min-h-screen p-8">

      {/* Header */}
      <h2 className="text-3xl font-bold">{projectName}</h2>
      <p className="text-gray-500 mb-6">
        Bugs reported in this project
      </p>

      {/* Stats */}
      <div className="flex gap-3 mb-6">
        <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
          {total} total bugs
        </span>
        <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm">
          {open} open
        </span>
        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-sm">
          {inProgress} in progress
        </span>
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm">
          {resolved} resolved
        </span>
      </div>

      {/* Search / Filters */}
      <div className="flex gap-3 mb-6">
        <div className="relative w-64">
          <input
            placeholder="Search bugs..."
            className="w-full border rounded-lg px-4 py-2 pl-10 text-sm"
          />
          <span className="absolute left-3 top-2.5">🔍</span>
        </div>

        <select className="border rounded-lg px-3 text-sm">
          <option>All Status</option>
        </select>

        <select className="border rounded-lg px-3 text-sm">
          <option>All Priority</option>
        </select>

        <Link
          to="/report"
          className="ml-auto bg-slate-900 text-white px-4 py-2 rounded-md text-sm"
        >
          + Report Bug
        </Link>
      </div>

      {/* Bug Cards */}
      <div className="space-y-4">
        {bugs.map(bug => (
          <div
            key={bug.id}
            className="bg-white border rounded-lg p-5 hover:shadow transition"
          >
            <h3 className="font-semibold">{bug.title}</h3>
            <p className="text-sm text-gray-500">
              Reported on {new Date(bug.created_at).toDateString()}
            </p>

            <div className="flex gap-2 mt-3">
              <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
                {bug.status}
              </span>
              <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-600">
                {bug.priority}
              </span>
            </div>

            {/* ✅ View Details Button */}
            <Link
              to={`/bugs/${bug.id}`}
              className="text-blue-600 text-sm mt-3 inline-block hover:underline"
            >
              View Details →
            </Link>
          </div>
        ))}

        {bugs.length === 0 && (
          <p className="text-gray-500 text-sm">
            No bugs found for this project.
          </p>
        )}
      </div>
    </div>
  );
}
