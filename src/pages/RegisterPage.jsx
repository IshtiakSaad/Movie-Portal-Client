import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;
    return hasUppercase && hasLowercase && isLongEnough;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update the user's profile with their name and photo URL
      await updateProfile(userCredential.user, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      toast.success("Registration successful!");
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error(err);
      toast.error("Failed to register. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg px-8 py-10 transform transition-all hover:scale-105 duration-300">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-indigo-500 text-center mb-8">
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="Your name"
              required
            />
          </div>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
            <input
              type="url"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="https://example.com/photo.jpg"
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
              placeholder="Enter a strong password"
              required
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
