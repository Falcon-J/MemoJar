import React, { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import CustomModal from "../components/Alerts/CustomModal"; // Import CustomModal component

function AddMemory() {
  const [memory, setMemory] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();
  const auth = getAuth();
  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const handleAddMemory = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      setErrorModal(true); // Show error modal if not logged in
      return;
    }

    setLoading(true); // Start loading when button is clicked

    try {
      // Add memory with userId
      await addDoc(collection(db, "memories"), {
        content: memory,
        userId: user.uid,
        createdAt: new Date(), // Optional: Add a timestamp for sorting
      });

      setShowModal(true); // Show success modal on success
      setMemory("");
    } catch (error) {
      setErrorModal(true); // Show error modal on failure
    } finally {
      setLoading(false); // Stop loading after operation finishes
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
          {loading ? "Adding..." : "Add Memory"} {/* Button Text change */}
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
          onClose={() => setLoading(false)} // Close the modal when loading finishes
          isLoading={true} // Pass isLoading as true for showing loading state
        />
      )}

      {showModal && (
        <CustomModal
          message="Your memory has been added!"
          onClose={() => {
            setShowModal(false);
            navigate("/add-memory"); // Redirect to add-memory page
          }}
        />
      )}

      {errorModal && (
        <CustomModal
          message="Error: You need to be logged in to add a memory!"
          onClose={() => setErrorModal(false)}
          isLoading={false}
        />
      )}
    </div>
  );
}

export default AddMemory;
