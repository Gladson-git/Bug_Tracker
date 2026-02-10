import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectBugs from "./pages/ProjectBugs";
import BugDetails from "./pages/BugDetails";
import ReportBug from "./pages/ReportBug";
import Navbar from "./components/Navbar";

/* =========================
   AUTH WRAPPERS
========================= */

// Protect private pages
function PrivateRoute({ children }) {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
}

// Prevent opening login/signup if already logged in
function PublicRoute({ children }) {
  const user = localStorage.getItem("user");
  return user ? <Navigate to="/dashboard" /> : children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===== PUBLIC ROUTES ===== */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Default root */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* ===== PROTECTED ROUTES ===== */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Navbar />
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Navbar />
              <Projects />
            </PrivateRoute>
          }
        />

        <Route
          path="/projects/:id"
          element={
            <PrivateRoute>
              <Navbar />
              <ProjectBugs />
            </PrivateRoute>
          }
        />

        <Route
          path="/bugs/:id"
          element={
            <PrivateRoute>
              <Navbar />
              <BugDetails />
            </PrivateRoute>
          }
        />

        <Route
          path="/report"
          element={
            <PrivateRoute>
              <Navbar />
              <ReportBug />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}
