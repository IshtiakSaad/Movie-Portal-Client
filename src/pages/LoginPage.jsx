import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Login successful!");
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error("Error logging in:", err.message);
      toast.error("Couldn't log in.");
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      toast.success("Logged in with Google!");
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error("Error with Google login:", err.message);
      toast.error("Failed to log in with Google. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg px-8 py-10 transform transition-all hover:scale-105 duration-300">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-indigo-500 text-center mb-8">
          Login to Your Account
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-8 space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-red-300 transition duration-200"
          >
            <FaGoogle className="mr-2" /> Login with Google
          </button>
          <p className="text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-indigo-600 hover:underline">
              Register here
            </a>
          </p>
          <a
            href="/forgot-password"
            className="block text-sm text-center text-gray-600 hover:underline"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
