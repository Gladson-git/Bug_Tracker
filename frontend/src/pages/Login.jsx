import { Bug } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      // ✅ Save logged in user in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm px-8 py-10">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Bug className="h-9 w-9 text-slate-900" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center text-slate-900">
          Welcome Back
        </h2>
        <p className="text-center text-slate-500 text-sm mt-1">
          Sign in to your Bug Tracker account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2.5 text-sm border border-slate-300 rounded-lg 
              focus:ring-2 focus:ring-slate-900 focus:outline-none"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2.5 text-sm border border-slate-300 rounded-lg 
              focus:ring-2 focus:ring-slate-900 focus:outline-none"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium 
            hover:bg-slate-800 transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-slate-900 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
