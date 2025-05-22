import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black cursor-none relative">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 235, 0.4) 0%, rgba(0,0,0,0) 70%)`,
          zIndex: 50,
        }}
      />
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <h1 className="text-9xl font-bold text-purple-500 mb-4">Error 404</h1>
            <p className="text-2xl mb-8">Oops! Page not found</p>
        <Link
          to="/"
          className="px-6 py-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors duration-300"
        >
          Return to Memory Jar
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
