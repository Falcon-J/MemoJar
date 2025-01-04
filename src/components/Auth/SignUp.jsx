import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import CustomModal from "../Alerts/CustomModal"; // Import CustomModal component

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setModalMessage("Creating your account..."); // Set loading message

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setModalMessage("Sign up successful!");
      setTimeout(() => {
        setIsLoading(false); // Stop loading
        navigate("/login"); // Navigate to login page after success
      }, 1000); // Delay for the user to see the success message
    } catch (error) {
      setModalMessage("Error: " + error.message);
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSignUp}
        className="p-6 bg-gray-800 shadow-md rounded"
      >
        <h2 className="text-2xl font-bold mb-4 text-purple-400">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-700 rounded bg-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-purple-500 text-white rounded"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-gray-300">
        Already have an account?{" "}
        <a href="/login" className="text-purple-500 hover:underline">
          Login
        </a>
      </p>

      {isLoading && (
        <CustomModal
          message={modalMessage} // Display loading or success/error message
          isLoading={isLoading} // Manage the loading spinner
          onClose={() => setIsLoading(false)} // Close the modal after success
        />
      )}
    </div>
  );
}

export default SignUp;
