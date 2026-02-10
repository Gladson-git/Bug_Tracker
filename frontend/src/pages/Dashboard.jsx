import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalBugs: 0,
    openBugs: 0,
    resolvedBugs: 0
  });

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Load dashboard stats
    API.get("/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Dashboard stats error:", err));

    // Load recent projects for cards
    API.get("/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Projects load error:", err));

  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-8">

      {/* Greeting */}
      <h2 className="text-3xl font-bold mb-1">
        Good evening, John Doe!
      </h2>
      <p className="text-gray-500 mb-6">
        Welcome to your Bug Tracker dashboard.
      </p>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <StatCard title="Total Bugs" value={stats.totalBugs} />
        <StatCard title="Open Bugs" value={stats.openBugs} color="text-red-600" />
        <StatCard title="In Progress" value={stats.totalBugs - stats.resolvedBugs} color="text-yellow-500" />
        <StatCard title="Resolved" value={stats.resolvedBugs} color="text-green-600" />

      </div>

      {/* Projects Section */}
      <h3 className="text-xl font-semibold mb-4">Projects</h3>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id}
            className="bg-white border border-gray-200 rounded-xl p-5
                       hover:shadow-lg hover:border-blue-300
                       transition duration-300"
          >
            <h4 className="font-semibold text-lg">
              {project.name}
            </h4>

            <p className="text-sm text-gray-500 mt-1">
              {project.desc}
            </p>

            <p className="text-sm mt-3">
              🐞 {project.bugs} bugs
            </p>

            <Link
              to={`/projects/${project.id}`}
              className="text-blue-600 text-sm mt-3 inline-block hover:underline"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// Small reusable stat card
function StatCard({ title, value, color }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5
                    hover:shadow-lg hover:border-blue-300 transition">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className={`text-2xl font-bold mt-2 ${color || ""}`}>
        {value}
      </h3>
    </div>
  );
}
