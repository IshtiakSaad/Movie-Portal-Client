import FAQ from "../components/FAQ";
import FeaturedMovies from "../components/FeaturedMovies";
import ReasonsToJoin from "../components/ReasonsToJoin";
import Slider from "../components/Slider";
import { useTheme } from "../context/ThemeContext"; 

const fetchFeaturedMovies = async () => {
  const response = await fetch("http://movie-server-vercel.vercel.app/movies");
  return response.json();
};

const HomePage = () => {
  const { theme, toggleTheme } = useTheme(); 

  return (
    <div
      className={
        theme === "light"
          ? "bg-white"
          : "bg-gradient-to-r from-indigo-800 via-indigo-900 to-black"
      }
    >
      <Slider />

      <div className="p-4 text-center">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="bg-indigo-600  text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
        >
          Toggle Theme
        </button>
      </div>

      <FeaturedMovies fetchMovies={fetchFeaturedMovies} theme={theme} />
      <ReasonsToJoin theme={theme} />
      <FAQ theme={theme} />
    </div>
  );
};

export default HomePage;
