import { Bug } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api";

export default function Signup() {
  const navigate = useNavigate();

  // Form State
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "TESTER"
  });

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit Signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", form);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
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
          Create Account
        </h2>
        <p className="text-center text-slate-500 text-sm mt-1">
          Sign up for a Bug Tracker account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              placeholder="Enter your full name"
              value={form.full_name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2.5 text-sm border border-slate-300 rounded-lg 
                         focus:ring-2 focus:ring-slate-900 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2.5 text-sm border border-slate-300 rounded-lg 
                         focus:ring-2 focus:ring-slate-900 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2.5 text-sm border border-slate-300 rounded-lg 
                         focus:ring-2 focus:ring-slate-900 focus:outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2.5 text-sm border border-slate-300 rounded-lg 
                         focus:ring-2 focus:ring-slate-900 focus:outline-none bg-white"
            >
              <option value="TESTER">Tester</option>
              <option value="DEVELOPER">Developer</option>
              <option value="BUSINESS_ANALYST">Business Analyst</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium 
                       hover:bg-slate-800 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-slate-900 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
