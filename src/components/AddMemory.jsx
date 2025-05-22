import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import CustomModal from "../components/Alerts/CustomModal";

function AddMemory() {
  const [memory, setMemory] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For displaying dynamic error messages

  const handleAddMemory = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      setErrorMessage("You need to be logged in to add a memory.");
      setErrorModal(true);
      return;
    }

    setLoading(true);

    try {
      // Convert tags string to array and clean up
      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag !== "");

      await addDoc(collection(db, "memories"), {
        content: memory,
        userId: user.uid,
        createdAt: new Date(),
        tags: tagArray,
        lastModified: new Date(),
      });

      setShowModal(true);
      setMemory("");
      setTags("");
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while adding the memory."
      );
      setErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <form
        onSubmit={handleAddMemory}
        className="p-6 bg-black shadow-md rounded border-2 border-purple-500 w-full max-w-2xl"
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
          rows={4}
        />
        <input
          type="text"
          placeholder="Add tags (comma-separated: travel, family, goals)"
          className="w-full p-2 mb-4 border rounded bg-slate-700 text-white border-gray-600"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button
          type="submit"
          className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          disabled={!memory.trim()} // Disable if memory is empty
        >
          {loading ? "Adding..." : "Add Memory"}
        </button>
      </form>
      <Link to="/memory-jar" className="hover:no-underline">
        <button className="bg-purple-200 text-black p-2 rounded-lg m-6 hover:bg-purple-700 hover:text-white">
          Go back to Memory Jar
        </button>
      </Link>

      {loading && (
        <CustomModal
          message="Your memory is being added, please wait..."
          onClose={() => setLoading(false)}
          isLoading={true}
        />
      )}

      {showModal && (
        <CustomModal
          message="Your memory has been added!"
          onClose={() => navigate("/memory-jar")}
        />
      )}

      {errorModal && (
        <CustomModal
          message={errorMessage}
          onClose={() => setErrorModal(false)}
          isLoading={false}
        />
      )}
    </div>
  );
}

export default AddMemory;
