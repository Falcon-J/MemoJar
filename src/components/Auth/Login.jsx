import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful! 🎉", {
        duration: 3000,
        style: {
          background: "#1F2937",
          color: "#fff",
          border: "1px solid #374151",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      // Handle specific authentication errors
      switch (error.code) {
        case "auth/invalid-email":
          toast.error("Invalid email format", {
            icon: "❌",
            duration: 3000,
            style: {
              background: "#1F2937",
              color: "#fff",
              border: "1px solid #374151",
            },
          });
          break;
        case "auth/user-not-found":
          toast.error("No account found with this email", {
            icon: "🔍",
            duration: 3000,
            style: {
              background: "#1F2937",
              color: "#fff",
              border: "1px solid #374151",
            },
          });
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password", {
            icon: "🔐",
            duration: 3000,
            style: {
              background: "#1F2937",
              color: "#fff",
              border: "1px solid #374151",
            },
          });
          break;
        case "auth/too-many-requests":
          toast.error("Too many attempts. Please try again later", {
            icon: "⚠️",
            duration: 4000,
            style: {
              background: "#1F2937",
              color: "#fff",
              border: "1px solid #374151",
            },
          });
          break;
        default:
          toast.error("Login failed. Please try again", {
            icon: "❌",
            duration: 3000,
            style: {
              background: "#1F2937",
              color: "#fff",
              border: "1px solid #374151",
            },
          });
      }
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
    </>
  );
}

export default Login;
