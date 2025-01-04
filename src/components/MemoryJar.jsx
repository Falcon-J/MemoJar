import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const MemoryJar = () => {
  const [memories, setMemories] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const q = query(
        collection(db, "memories"),
        where("userId", "==", user.uid)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userMemories = [];
        querySnapshot.forEach((doc) => {
          userMemories.push({ id: doc.id, ...doc.data() });
        });
        setMemories(userMemories);
      });

      return () => unsubscribe();
    }
  }, [auth]);

  return (
    <div className="p-6 bg-black text-purple-500 flex flex-col items-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Memories</h2>
      {memories.length === 0 ? (
        <p>No memories found. Start adding some!</p>
      ) : (
        <ul className="w-full max-w-md">
          {memories.map((memory) => (
            <li
              key={memory.id}
              className="mb-2 border border-purple-500 p-4 rounded text-center"
            >
              {memory.content}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <a href="/add-memory" className="text-purple-500 hover:underline">
          <button className="border-2 border-purple-600 bg-white rounded-lg p-2 hover:bg-purple-500 hover:text-white">
            Add a Memory
          </button>
        </a>
      </div>
    </div>
  );
};

export default MemoryJar;
