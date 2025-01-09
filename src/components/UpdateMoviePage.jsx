import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieForm from "../components/MovieForm";

const UpdateMoviePage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch existing movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://movie-server-vercel.vercel.app/movies/${id}`);
        if (!response.ok) throw new Error("Failed to fetch movie");
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
        alert("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // Handle movie update
  const handleUpdate = async (updatedMovie) => {
    try {
      const response = await fetch(`http://movie-server-vercel.vercel.app/movies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMovie),
      });

      if (response.ok) {
        navigate(`/movies/${id}`); // Redirect to the movie details page
      } else {
        throw new Error("Failed to update movie");
      }
    } catch (error) {
      console.error("Error updating movie:", error);
      alert("Failed to update the movie.");
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
  
  if (!movie)
    return <div className="text-center text-red-500">Movie not found.</div>;

  return (
    <div className="bg-gradient-to-b from-indigo-200 to-indigo-100 min-h-screen">
      <div className="container mx-auto px-6 py-16 bg-white shadow-lg max-w-4xl ">
        <h1 className="text-4xl font-semibold text-gray-800 text-center mb-8">
          Update Movie
        </h1>

        {/* Reuse MovieForm with preloaded data */}
        <MovieForm initialData={movie} onSubmit={handleUpdate} isUpdate />
      </div>
    </div>
  );
};

export default UpdateMoviePage;
