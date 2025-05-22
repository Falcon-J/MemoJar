import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setModalMessage("Creating your account...");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setModalMessage("Sign up successful!");
      toast.success("Account created successfully!");
      setTimeout(() => {
        setIsLoading(false);
        navigate("/login");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Account already exists. Please login instead.', {
          duration: 3000,
          icon: '⚠️',
        });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSignUp}
        className="p-6 bg-gray-900 shadow-md rounded"
      >
        <h2 className="text-3xl font-bold mb-6 text-purple-600">Sign Up</h2>
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
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-gray-300">
        Already have an account?{" "}
        <Link to="/login" className="text-purple-500 hover:text-purple-400">
          Login here
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
