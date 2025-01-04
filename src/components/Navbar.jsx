import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Navigate to the login page after successful logout
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out: ", error.message);
      });
  };

  return (
    <nav className="flex justify-between items-center bg-black text-white p-4 shadow-md">
      {/* Home Icon (Dashboard) */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <span className="font-bold text-lg">Dashboard</span>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="border-2 border-purple-500 bg-purple-600 rounded-lg px-4 py-2 hover:bg-purple-700 transition-colors"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
