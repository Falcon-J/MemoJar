import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import Navbar from "./Navbar";

function Dashboard() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const auth = getAuth();
  const toastShown = useRef(false); // Add ref to track if toast was shown

  useEffect(() => {
    // Show welcome message with user's email
    const user = auth.currentUser;
    if (user && !toastShown.current) {
      const email = user.email;
      const username = email.split("@")[0]; // Get username part of email
      toast.success(`Welcome back, ${username}! 👋`, {
        icon: "🌟",
        duration: 3000,
        style: {
          background: "#1F2937",
          color: "#fff",
          border: "1px solid #374151",
        },
      });
      toastShown.current = true; // Mark toast as shown
    }
  }, [auth.currentUser]); // Add dependency array with auth.currentUser

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Mouse-following shadow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 235, 0.4) 0%, rgba(0,0,0,0) 70%)`,
          zIndex: 50,
        }}
      />
      <div className="cursor-none relative">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
          <h1 className="text-5xl font-bold text-white p-4 mb-12">
            Welcome to Memory Jar
          </h1>
          <div className="space-x-4">
            <Link
              to="/memory-jar"
              className="p-4 bg-purple-200  hover:text-white rounded transition hover:bg-purple-700"
            >
              View Memory Jar
            </Link>
            <Link
              to="/add-memory"
              className="p-4 bg-purple-200 hover:text-white rounded transition hover:bg-purple-700"
            >
              Add a Memory
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
