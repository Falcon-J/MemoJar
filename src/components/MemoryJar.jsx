import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import CustomModal from "./Alerts/CustomModal";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const MemoryJar = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [editingMemory, setEditingMemory] = useState({
    content: "",
    tags: [],
  });
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoMemory, setInfoMemory] = useState(null);
  const [tagInput, setTagInput] = useState(""); // New state for tag input

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
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [auth]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "memories", id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting memory:", error);
    }
  };

  const handleUpdate = async (id, updatedContent, updatedTags) => {
    try {
      // Check if updatedTags is already an array
      const tagsArray = Array.isArray(updatedTags)
        ? updatedTags
        : updatedTags.split(",").map((tag) => tag.trim().toLowerCase());

      await updateDoc(doc(db, "memories", id), {
        content: updatedContent,
        tags: tagsArray,
        lastModified: new Date(),
      });
      setEditingMemory({ content: "", tags: [] });
    } catch (error) {
      console.error("Error updating memory:", error);
    }
  };

  const filteredAndSortedMemories = memories
    .filter((memory) => {
      const matchesSearch =
        memory.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memory.tags?.some((tag) => tag.includes(searchTerm.toLowerCase()));
      const matchesTag = !selectedTag || memory.tags?.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.createdAt.toDate() - a.createdAt.toDate();
        case "oldest":
          return a.createdAt.toDate() - b.createdAt.toDate();
        case "az":
          return a.content.localeCompare(b.content);
        case "za":
          return b.content.localeCompare(a.content);
        default:
          return 0;
      }
    });

  const allTags = [...new Set(memories.flatMap((memory) => memory.tags || []))];

  // Inside your MemoryJar component, check if tags exist and is an array before joining
  const tagString = Array.isArray(editingMemory?.tags)
    ? editingMemory.tags.join(", ")
    : "";

  // New functions for tag handling
  const handleTagChange = (e) => {
    const tagInput = e.target.value;
    // Don't clear existing tags, just update the current input
    setTagInput(tagInput);
  };

  const handleTagSubmit = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setEditingMemory((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput(""); // Clear only the input field
    }
  };

  const removeTag = (indexToRemove) => {
    setEditingMemory((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />

      <div className="p-6 text-purple-500 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Memories</h2>

        {/* Search and Filter Controls */}
        <div className="w-full max-w-4xl mb-6 space-y-4">
          <input
            type="text"
            placeholder="Search memories..."
            className="w-full p-2 rounded bg-gray-800 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex gap-4">
            <select
              className="p-2 rounded bg-gray-800 text-white"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>

            <select
              className="p-2 rounded bg-gray-800 text-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>
        </div>

        {loading ? (
          <CustomModal
            message="Fetching your memories..."
            onClose={() => setLoading(false)}
            isLoading={true}
          />
        ) : (
          <div className="w-full max-w-4xl">
            {filteredAndSortedMemories.length === 0 ? (
              <p className="text-center">No memories found.</p>
            ) : (
              <div className="space-y-4">
                {filteredAndSortedMemories.map((memory) => (
                  <div
                    key={memory.id}
                    className="bg-gray-800 rounded-lg p-4 relative"
                  >
                    {editingMemory?.id === memory.id ? (
                      <div className="space-y-2">
                        <textarea
                          className="w-full p-2 rounded bg-gray-700 text-white"
                          value={editingMemory.content}
                          onChange={(e) =>
                            setEditingMemory({
                              ...editingMemory,
                              content: e.target.value,
                            })
                          }
                        />
                        <div className="flex flex-wrap gap-2 mb-2">
                          {editingMemory.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-purple-200 px-2 py-1 rounded-full flex items-center"
                            >
                              {tag}
                              <button
                                onClick={() => removeTag(index)}
                                className="ml-2 text-red-500 hover:text-red-700"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                        <input
                          type="text"
                          value={tagInput}
                          onChange={handleTagChange}
                          onKeyDown={handleTagSubmit}
                          placeholder="Add tags (press Enter)"
                          className="border rounded p-2 w-full"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleUpdate(
                                memory.id,
                                editingMemory.content,
                                editingMemory.tags
                              )
                            }
                            className="px-4 py-2 bg-green-600 text-white rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() =>
                              setEditingMemory({ content: "", tags: [] })
                            }
                            className="px-4 py-2 bg-gray-600 text-white rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-white mb-2">{memory.content}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {memory.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-purple-600 rounded-full text-xs text-white"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              setEditingMemory({
                                id: memory.id,
                                content: memory.content,
                                tags: memory.tags || [],
                              })
                            }
                            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setSelectedMemory(memory);
                              setShowDeleteModal(true);
                            }}
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              setInfoMemory(memory);
                              setShowInfoModal(true);
                            }}
                            className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                          >
                            Info
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <Link to="/add-memory" className="mt-6">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
            Add a Memory
          </button>
        </Link>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <CustomModal
          message="Are you sure you want to delete this memory?"
          onClose={() => setShowDeleteModal(false)}
          isLoading={false}
          actions={
            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={() => handleDelete(selectedMemory.id)}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Cancel
              </button>
            </div>
          }
        />
      )}

      {/* Info Modal */}
      {showInfoModal && infoMemory && (
        <CustomModal
          message={
            <div className="space-y-2 text-left">
              <p>
                <strong>Created:</strong>{" "}
                {infoMemory.createdAt.toDate().toLocaleString()}
              </p>
              <p>
                <strong>Last Modified:</strong>{" "}
                {infoMemory.lastModified?.toDate().toLocaleString()}
              </p>
              <p>
                <strong>Tags:</strong>{" "}
                {infoMemory.tags?.join(", ") || "No tags"}
              </p>
            </div>
          }
          onClose={() => setShowInfoModal(false)}
          isLoading={false}
        />
      )}
    </div>
  );
};

export default MemoryJar;
