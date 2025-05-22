import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back! 🎉", {
        duration: 3000,
        style: {
          background: "#1F2937",
          color: "#fff",
          border: "1px solid #374151",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      setIsLoading(false);
      handleAuthError(error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Successfully signed in with Google! 🎉", {
        duration: 3000,
        style: {
          background: "#1F2937",
          color: "#fff",
          border: "1px solid #374151",
        },
      });
      navigate("/dashboard");
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error) => {
    switch (error.code) {
      case "auth/wrong-password":
        toast.error("Incorrect password. Please try again.", {
          icon: "🔐",
        });
        break;
      case "auth/user-not-found":
        toast.error("No account found with this email.", {
          icon: "🔍",
        });
        break;
      case "auth/too-many-requests":
        toast.error("Too many attempts. Please try again later.", {
          icon: "⚠️",
        });
        break;
      default:
        toast.error(`Error: ${error.message}`, {
          icon: "❌",
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleLogin}
        className="p-6 bg-gray-900 shadow-md rounded w-96"
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
          className="w-full p-3 bg-purple-600 text-white rounded hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login with Email"}
        </button>

        <div className="relative flex items-center justify-center mb-4">
          <div className="border-t border-gray-700 w-full"></div>
          <span className="bg-gray-900 px-2 text-gray-400 text-sm">Or</span>
          <div className="border-t border-gray-700 w-full"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full p-3 bg-gray-800 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            {/* Google icon paths */}
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>
      </form>

      <p className="mt-4 text-gray-300">
        Don't have an account?{" "}
        <Link to="/signup" className="text-purple-500 hover:text-purple-400">
          Sign up here
        </Link>
      </p>
    </div>
  );
}

export default Login;
