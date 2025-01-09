import { useEffect, useState } from "react";
import FavoriteMovies from "../components/FavoriteMovies";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await fetch("http://movie-server-vercel.vercel.app/api/favorites");
      const data = await response.json();
      setFavorites(data);
    };
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (id) => {
    const response = await fetch(`http://movie-server-vercel.vercel.app/api/favorites/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    }
  };

  return (
    <div>
      <FavoriteMovies movies={favorites} onRemoveFavorite={handleRemoveFavorite} />
    </div>
  );
};

export default FavoritesPage;
