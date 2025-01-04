import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Dashboard() {
  return (
    <>
    <Navbar /> 
    <div className="flex flex-col items-center justify-center min-h-svh bg-black">
      <h1 className="text-5xl font-bold text-white p-4 mb-12 mt-0">Welcome to Memory Jar</h1>
      <div>
        <Link to="/memory-jar" className="p-4 bg-blue-500 text-white rounded mr-4 hover:bg-purple-700">
          View Memory Jar
        </Link>
        <Link to="/add-memory" className="p-4 bg-blue-600 text-white rounded hover:bg-purple-700" >
          Add a Memory
        </Link>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
