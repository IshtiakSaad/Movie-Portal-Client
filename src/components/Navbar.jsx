import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged Out");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false); 
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-indigo-600 to-indigo-900 shadow-xl w-full">
      <div className="w-11/12 md:w-3/4 mx-auto py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-indigo-500"
            onClick={closeMenu} 
          >
            MoviePortal
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-white hover:text-indigo-300 font-medium text-lg transition duration-300 transform hover:scale-110"
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="text-white hover:text-indigo-300 font-medium text-lg transition duration-300 transform hover:scale-110"
          >
            All Movies
          </Link>
          <Link
            to="/add-movie"
            className="text-white hover:text-indigo-300 font-medium text-lg transition duration-300 transform hover:scale-110"
          >
            Add Movie
          </Link>
          <Link
            to="/favorites"
            className="text-white hover:text-indigo-300 font-medium text-lg transition duration-300 transform hover:scale-110"
          >
            My Favorites
          </Link>
        </div>

        {/* Authentication Section */}
        <div className=" md:flex items-center space-x-6">
          {!user ? (
            <>
              {/* Login and Register for unauthenticated users */}
              <Link
                to="/login"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full text-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full text-lg font-semibold hover:bg-gray-200 transition-all duration-300"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative group z-50">
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="User Avatar"
                className="w-12 h-12 rounded-full border-4 border-indigo-500 cursor-pointer transform hover:scale-105 transition-all duration-300"
              />
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="px-4 py-2 text-sm text-gray-800">
                  {user.displayName || "User"}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-indigo-400 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-indigo-800 via-indigo-900 to-indigo-900 text-white py-4 space-y-4">
          <Link
            to="/"
            onClick={closeMenu} // Close menu on navigation
            className="block text-lg text-white hover:text-indigo-300 font-medium text-center transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/movies"
            onClick={closeMenu} // Close menu on navigation
            className="block text-lg text-white hover:text-indigo-300 font-medium text-center transition duration-300"
          >
            All Movies
          </Link>
          <Link
            to="/add-movie"
            onClick={closeMenu} // Close menu on navigation
            className="block text-lg text-white hover:text-indigo-300 font-medium text-center transition duration-300"
          >
            Add Movie
          </Link>
          <Link
            to="/favorites"
            onClick={closeMenu} // Close menu on navigation
            className="block text-lg text-white hover:text-indigo-300 font-medium text-center transition duration-300"
          >
            My Favorites
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
