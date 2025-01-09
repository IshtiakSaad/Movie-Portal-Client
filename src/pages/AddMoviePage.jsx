import MovieForm from "../components/MovieForm";
import { useNavigate } from "react-router-dom";

const AddMoviePage = () => {
  const navigate = useNavigate();

  const handleAddMovie = async (movie) => {
    const response = await fetch("https://movie-server-vercel.vercel.app/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });
    if (response.ok) {
      navigate(`/movies/`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-200 to-indigo-300 flex items-center justify-center lg:px-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg lg:p-8 lg:my-10">
        <h1 className="text-4xl font-extrabold text-indigo-800 text-center my-10">
          Add a New Movie
        </h1>
        <MovieForm onSubmit={handleAddMovie} />
      </div>
    </div>
  );
};

export default AddMoviePage;
