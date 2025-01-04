import React from "react";

const Hero = () => {
  return (
    <>
      <div className="bg-black text-white h-screen flex items-center justify-center relative overflow-hidden">
        <div className="text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 shadow-lg">
            Welcome to MemoJar
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-400 shadow-lg">
            Capture your memories, cherish them forever.
          </p>
          <a href="/signup">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              Get Started
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default Hero;
