import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function ReportBug() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    project_id: "",
    title: "",
    description: "",
    priority: ""
  });

  const navigate = useNavigate();

  // Load projects for dropdown
  useEffect(() => {
    API.get("/projects").then((res) => setProjects(res.data));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await API.post("/bugs", {
      ...form,
      created_by: 1 // Logged-in user id (John Doe = 1)
    });

    navigate(`/projects/${form.project_id}`);
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl border">
      <h2 className="text-2xl font-bold mb-6">🐞 Report New Bug</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Project */}
        <select
          name="project_id"
          required
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        {/* Title */}
        <input
          name="title"
          required
          placeholder="Bug Title"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          required
          placeholder="Bug Description"
          onChange={handleChange}
          className="w-full border p-2 rounded h-28"
        />

        {/* Priority */}
        <select
          name="priority"
          required
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Priority</option>
          <option>LOW</option>
          <option>MEDIUM</option>
          <option>HIGH</option>
          <option>CRITICAL</option>
        </select>

        <button className="bg-slate-900 text-white px-4 py-2 rounded">
          Submit Bug Report
        </button>
      </form>
    </div>
  );
}
