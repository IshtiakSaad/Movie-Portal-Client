import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/movies");
        if (!response.ok) throw new Error("Failed to fetch movies.");
        const data = await response.json();
        setMovies(data);
        setFilteredMovies(data); // Initially, set filteredMovies to all movies
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter movies based on the title matching the search query
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );
    setFilteredMovies(filtered);
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

  return (
    <div className="w-11/12 lg:w-3/4 mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        All Movies
      </h1>

      {/* Search Bar */}
      <div className="mb-8 text-center">
        <input
          type="text"
          placeholder="Search by Movie Title..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full lg:w-1/2 p-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie._id}
              className="group relative bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Movie Poster */}
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Movie Details */}
              <div className="p-6 space-y-4">
                <h2 className="text-lg font-bold text-gray-800">
                  {movie.title}
                </h2>
                <p className="text-gray-600 text-sm">Genre: {movie.genre}</p>
                <p className="text-gray-600 text-sm">
                  Duration: {movie.duration} minutes
                </p>
                <p className="text-gray-600 text-sm">
                  Release Year: {movie.releaseYear}
                </p>
                <p className="text-gray-600 text-sm">
                  Rating: ⭐ {movie.rating}/10
                </p>
                {/* Overlay for Details Button */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-all duration-300"></div>

                <button
                  onClick={() => navigate(`/movies/${movie._id}`)}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  See Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No movies found
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMoviesPage;
