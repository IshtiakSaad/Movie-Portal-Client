import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-toastify";

const MovieDetailsPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [user] = useAuthState(auth); // Get the logged-in user
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movie details
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/movies/${id}`);
        if (!response.ok) throw new Error("Failed to fetch movie details");
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  // Handle movie deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/movies/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Movie deleted successfully!");
        navigate("/movies"); // Redirect to the all movies page
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to delete the movie.");
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
      toast.error("An error occurred while deleting the movie.");
    }
  };

  const handleAddToFavorite = async () => {
    if (!user) {
      toast.error("You must be logged in to add movies to favorites.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/users/${user.uid}/favorites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movieId: id }), // Send movieId in request body
        }
      );

      if (response.ok) {
        toast.success("Movie added to favorites!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to add movie to favorites.");
      }
    } catch (error) {
      console.error("Error adding movie to favorites:", error);
      toast.error("Failed to add movie to favorites.");
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          {/* Loading Text */}
          <p className="text-lg text-gray-600 mt-4">Loading movies...</p>
        </div>
      </div>
    );
  }
  

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-red-300">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-300 px-4 py-8">
      {/* Movie Details Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Movie Poster and Info */}
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition mb-6"
        >
          ← Back
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Movie Poster */}
          <div className="flex-shrink-0">
            <img
              src={movie.poster}
              alt={movie.title}
              className="rounded-lg shadow-md w-full md:w-80 h-auto object-cover"
            />
          </div>

          {/* Movie Info */}
          <div className="flex-grow">
            <h1 className="text-4xl font-extrabold text-gray-800">
              {movie.title}
            </h1>
            <p className="text-sm text-gray-500 mb-4">{`Released: ${movie.releaseYear}`}</p>

            <div className="mb-4">
              <span className="text-gray-700 font-medium">Genre:</span>
              <span className="ml-2 text-gray-600">{movie.genre}</span>
            </div>

            <div className="mb-4">
              <span className="text-gray-700 font-medium">Rating:</span>
              <span className="ml-2 text-yellow-500">⭐ {movie.rating}/10</span>
            </div>

            <div className="mb-6">
              <span className="text-gray-700 font-medium">Duration:</span>
              <span className="ml-2 text-gray-600">{`${movie.duration} minutes`}</span>
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Summary
            </h2>
            <p className="text-gray-600 leading-relaxed">{movie.summary}</p>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddToFavorite}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Add to Favorites
              </button>
              <button
                onClick={() => navigate(`/movies/update/${movie._id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Update Movie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
