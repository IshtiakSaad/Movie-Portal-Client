import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const genres = ["Comedy", "Drama", "Horror", "Action", "Romance"];

const getYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 1950; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
};

const MovieForm = ({ initialData = {}, onSubmit, isUpdate = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialData.title || "",
      poster: initialData.poster || "",
      genre: initialData.genre || "",
      duration: initialData.duration || "",
      releaseYear: initialData.releaseYear || "",
      rating: initialData.rating || 0,
      summary: initialData.summary || "",
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
    toast.success(isUpdate ? "Movie updated successfully!" : "Movie added successfully!");
  };

  const years = getYears();

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="max-w-3xl mx-auto bg-gradient-to-br from-purple-100 via-indigo-200 to-indigo-300 shadow-xl rounded-lg p-8 mt-10 border border-gray-200"
    >
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Title</label>
          <input
            type="text"
            {...register("title", {
              required: "Title is required.",
              minLength: {
                value: 2,
                message: "Title must have at least 2 characters.",
              },
            })}
            className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Poster */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Poster URL</label>
          <input
            type="url"
            {...register("poster", {
              required: "Poster URL is required.",
              pattern: {
                value: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
                message: "Invalid URL format.",
              },
            })}
            className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
          />
          {errors.poster && <p className="text-red-500 text-sm">{errors.poster.message}</p>}
        </div>

        {/* Genre */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Genre</label>
          <select
            {...register("genre", {
              required: "Genre is required.",
            })}
            className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
          >
            <option value="">Select a genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}
        </div>

        {/* Duration */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Duration (minutes)</label>
          <input
            type="number"
            {...register("duration", {
              required: "Duration is required.",
              min: {
                value: 60,
                message: "Duration must be greater than 60 minutes.",
              },
            })}
            className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
          />
          {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
        </div>

        {/* Release Year */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Release Year</label>
          <select
            {...register("releaseYear", {
              required: "Release year is required.",
            })}
            className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
          >
            <option value="">Select a year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.releaseYear && (
            <p className="text-red-500 text-sm">{errors.releaseYear.message}</p>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Rating</label>
          <input
            type="number"
            step="0.1"
            max="10"
            {...register("rating", {
              required: "Rating is required.",
            })}
            className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
          />
          {errors.rating && <p className="text-red-500 text-sm">{errors.rating.message}</p>}
        </div>

        {/* Summary */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Summary</label>
          <textarea
            rows="4"
            {...register("summary", {
              required: "Summary is required.",
              minLength: {
                value: 10,
                message: "Summary must have at least 10 characters.",
              },
            })}
            className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
          ></textarea>
          {errors.summary && <p className="text-red-500 text-sm">{errors.summary.message}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-medium px-6 py-3 mt-6 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-purple-700 transition duration-300"
      >
        {isUpdate ? "Update Movie" : "Add Movie"}
      </button>
    </form>
  );
};

export default MovieForm;
