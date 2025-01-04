import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import CustomModal from "../components/Alerts/CustomModal"; // Import CustomModal
import Navbar from "../components/Navbar"; // Import the Navbar component

const MemoryJar = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
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
        setLoading(false); // Set loading to false after data is fetched
      });

      return () => unsubscribe();
    }
  }, [auth]);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar /> {/* Add Navbar to the top of the page */}
      <div className="p-6 text-purple-500 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Memories</h2>

        {/* Show CustomModal with loading state while fetching memories */}
        {loading && (
          <CustomModal
            message="Fetching your memories..."
            onClose={() => setLoading(false)} // Close the modal once data is fetched
            isLoading={true} // Show loading spinner
          />
        )}

        {memories.length === 0 && !loading ? (
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
    </div>
  );
};

export default MemoryJar;
