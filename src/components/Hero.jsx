import React from "react";

const Hero = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-purple-500 via-indigo-600 to-pink-500 text-white h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-40 bg-black"></div>{" "}
        {/* Dark overlay */}
        <div className="text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-shadow-xl">
            Welcome to MemoJar
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-300 text-shadow-lg">
            Capture your memories, cherish them forever.
          </p>
          <a href="/signup">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-9000 ease-in-out transform hover:scale-105 shadow-xl">
              Get Started
            </button>
          </a>
        </div>
        {/* Flare Effects */}
      </div>
    </>
  );
};

export default Hero;
