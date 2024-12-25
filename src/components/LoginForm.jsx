import { useState } from "react";

const LoginForm = ({ onLogin, onGoogleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
      {onGoogleLogin && (
        <button
          onClick={onGoogleLogin}
          className="w-full mt-4 bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          Login with Google
        </button>
      )}
    </div>
  );
};

export default LoginForm;
