import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import CustomModal from "../Alerts/CustomModal"; // Import CustomModal

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading
  const [modalMessage, setModalMessage] = useState(""); // State to manage modal message
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setShowModal(true); // Show modal during login
    setModalMessage("Logging in..."); // Show loading message

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setModalMessage("Login successful!"); // Success message
      setTimeout(() => {
        navigate("/dashboard");
        setShowModal(false); // Close modal after navigation
      }, 1500); // Wait for modal to show before navigating
    } catch (error) {
      setModalMessage("Error: " + error.message); // Show error message
      setLoading(false); // Stop loading
      setTimeout(() => setShowModal(false), 2000); // Close modal after error
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <form
          onSubmit={handleLogin}
          className="p-6 bg-gray-900 shadow-md rounded-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-purple-600">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-purple-600 text-white rounded hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-500 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* CustomModal for showing messages */}
      {showModal && (
        <CustomModal
          message={modalMessage}
          onClose={() => setShowModal(false)} // Close the modal when clicked
          isLoading={loading} // Pass loading state to show spinner
        />
      )}
    </>
  );
}

export default Login;
