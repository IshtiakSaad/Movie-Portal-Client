import { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useNavigate, useLocation } from "react-router-dom";

const ForgotPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      setError("");
      setTimeout(() => {
        window.location.href = "https://mail.google.com/";
      }, 2000);
    } catch (err) {
      setSuccess(false);
      setError("Error sending reset email: " + err.message);
    }
  };

  return (
    <div className="py-16 flex items-center justify-center lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Reset Your Password
        </h2>
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-4 text-center">
            Password reset email sent successfully! Redirecting to Gmail...
          </div>
        )}
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Get Reset Link
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Remembered your password?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;