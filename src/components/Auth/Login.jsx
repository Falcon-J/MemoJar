import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <form
          onSubmit={handleLogin}
          className="p-6 bg-gray-800 shadow-md rounded-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-purple-600">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border border-gray-700 rounded bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-300">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-purple-500 hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Sign up
          </a>
        </p>
      </div>
    </>
  );
}

export default Login;
