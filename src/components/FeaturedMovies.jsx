import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FeaturedMovies = ({ fetchMovies, theme }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies();
        // Sort movies by rating in descending order and pick top 6
        const sortedMovies = data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6);
        setMovies(sortedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [fetchMovies]);

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

  // Dynamically set class names based on theme
  const containerClasses =
    theme === "dark"
      ? "w-11/12 lg:w-3/4 mx-auto px-4 py-16 text-white"
      : "w-11/12 lg:w-3/4 mx-auto px-4 py-16 text-gray-800";
  const headingClasses =
    theme === "dark"
      ? "text-4xl font-extrabold text-center text-zinc-200 mb-12 leading-tight"
      : "text-4xl font-extrabold text-center text-gray-900 mb-12 leading-tight";
  const cardClasses =
    theme === "dark"
      ? "bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      : "bg-white text-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out";
  const cardTitleClasses =
    theme === "dark"
      ? "text-xl font-semibold text-gray-200 mb-2"
      : "text-xl font-semibold text-gray-800 mb-2";
  const textClasses =
    theme === "dark"
      ? "text-sm text-gray-400 mb-2"
      : "text-sm text-gray-600 mb-2";
  const buttonClasses =
    theme === "dark"
      ? "bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
      : "bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition";

  return (
    <section className={containerClasses}>
      <h2 className={headingClasses}>Featured Movies</h2>

      {/* Featured Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {movies.map((movie) => (
          <div key={movie.id} className={cardClasses}>
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <div className="p-6">
              <h3 className={cardTitleClasses}>{movie.title}</h3>
              <p className={textClasses}>{movie.genre}</p>
              <p className={textClasses}>Duration: {movie.duration} min</p>
              <p className={textClasses}>Release Year: {movie.releaseYear}</p>
              <p className={textClasses}>⭐ {movie.rating}</p>
              <button
                onClick={() => navigate(`/movies/${movie._id}`)}
                className={buttonClasses}
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* See All Movies Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/movies")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          See All Movies
        </button>
      </div>
    </section>
  );
};

export default FeaturedMovies;
