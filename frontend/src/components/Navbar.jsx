import { Link } from "react-router-dom";
import { FiGrid, FiFolder, FiPlusCircle, FiLogOut } from "react-icons/fi";

export default function Navbar() {
  // Get logged in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Logout function
  const handleLogout = () => {
    // Remove user session
    localStorage.removeItem("user");

    // Redirect to login
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">

      {/* Logo */}
      <h1 className="text-xl font-bold flex items-center gap-2">
        🐞 Bug Tracker
      </h1>

      {/* Links */}
      <div className="flex gap-8 text-gray-600 font-medium items-center">
        <Link to="/dashboard" className="flex items-center gap-2 hover:text-blue-600">
          <FiGrid /> Dashboard
        </Link>

        <Link to="/projects" className="flex items-center gap-2 hover:text-blue-600">
          <FiFolder /> Projects
        </Link>

        <Link to="/report" className="flex items-center gap-2 hover:text-blue-600">
          <FiPlusCircle /> Report Bug
        </Link>
      </div>

      {/* Right Side: User Info + Logout */}
      <div className="flex gap-4 items-center">

        {/* Show user name + role if logged in */}
        {user && (
          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            {user.full_name}
            <span className="text-xs bg-white px-2 py-0.5 rounded-full border">
              {user.role}
            </span>
          </span>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="text-red-500 flex items-center gap-1 hover:text-red-600"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </nav>
  );
}
