import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function AddMemory() {
  const [memory, setMemory] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleAddMemory = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("You need to be logged in to add a memory!");
      return;
    }

    try {
      // Add memory with userId
      await addDoc(collection(db, "memories"), {
        content: memory,
        userId: user.uid, // Ensure userId is included
        createdAt: new Date(), // Optional: Add a timestamp for sorting
      });

      alert("Memory added!");
      setMemory("");
      navigate("/memory-jar"); // Navigate to MemoryJar after adding memory
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <form
        onSubmit={handleAddMemory}
        className="p-6 bg-black shadow-md rounded border-2 border-purple-500"
      >
        <h2 className="text-2xl font-bold mb-4 text-purple-400">
          Add a Memory
        </h2>
        <textarea
          placeholder="Write your memory..."
          className="w-full p-2 mb-4 border rounded bg-slate-700 text-white border-gray-600"
          value={memory}
          onChange={(e) => setMemory(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-purple-500 text-white rounded"
        >
          Add Memory
        </button>
      </form>
      <a href="/memory-jar" className="hover:no-underline">
        <button className="bg-purple-200 text-black p-2 rounded-lg m-6 hover:bg-purple-700 hover:text-white">
          Go back to Memory Jar
        </button>
      </a>
    </div>
  );
}

export default AddMemory;
