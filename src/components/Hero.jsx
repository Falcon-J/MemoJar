"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    <div className="bg-black text-white min-h-screen flex items-center justify-center relative overflow-hidden cursor-none">
      {/* Mouse-following shadow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 235, 0.4) 0%, rgba(0,0,0,0) 70%)`,
          zIndex: 50,
        }}
      />

      {/* Main Content */}
      <div className="text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 hover:text-purple-300 transition-colors duration-300 ease-in-out">
          Welcome to MemoJar
        </h1>
        <p className="text-lg md:text-xl mb-6 hover:text-purple-300 transition-colors duration-300 ease-in-out">
          Capture your memories, cherish them forever.
        </p>
        <Link to="/signup">
          <button
            className="bg-white text-black font-bold py-3 px-8 rounded-full transition duration-300 hover:scale-105 hover:text-stone-100 focus:outline-none hover:bg-purple-400"
            aria-label="Get Started with MemoJar"
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
