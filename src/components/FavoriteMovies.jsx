import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { fetchFavorites, removeFromFavorites } from "../utils/api";
import { toast } from "react-toastify";

const FavoriteMoviesPage = () => {
  const [user] = useAuthState(auth);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFavorites = async () => {
    if (!user) {
      toast.error("You must be logged in to view favorites.");
      return;
    }

    try {
      const data = await fetchFavorites(user.uid);
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorite movies:", error);
      toast.error("Failed to fetch favorite movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (movieId) => {
    if (!user) {
      toast.error("You must be logged in to remove favorites.");
      return;
    }

    try {
      await removeFromFavorites(user.uid, movieId); // Call API to remove favorite
      toast.success("Movie removed from favorites.");
      setFavorites(favorites.filter((movie) => movie._id !== movieId)); // Update state
    } catch (error) {
      console.error("Error removing favorite movie:", error);
      toast.error("Failed to remove favorite movie.");
    }
  };

  useEffect(() => {
    getFavorites();
  }, [user]);

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
  

  if (!favorites.length) {
    return (
      <div className="w-11/12 lg:w-3/4 mx-auto  px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">My Favorite Movies</h1>
        <p className="text-sm text-gray-500 my-24">You haven't added any favorites yet.</p>
      </div>
    );
  }

  return (
    <div className="w-11/12 lg:w-3/4 mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-6">My Favorite Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.map((movie) => (
          <div key={movie._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={movie.poster} alt={movie.title} className="w-full h-80 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">{movie.title}</h2>
              <p className="text-gray-600">Genre: {movie.genre}</p>
              <p className="text-gray-600">Duration: {movie.duration} minutes</p>
              <p className="text-gray-600">Release Year: {movie.releaseYear}</p>
              <p className="text-gray-600">Rating: ⭐ {movie.rating}/10</p>
              <button
                onClick={() => handleRemoveFavorite(movie._id)}
                className="mt-4 bg-red-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete Favorite
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMoviesPage;
