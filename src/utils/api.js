const BASE_URL = "http://movie-server-vercel.vercel.app";

export const addUserToDatabase = async (user) => {
    try {
        const response = await fetch(`${BASE_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to add/update user.");
        }

        return await response.json(); 
    } catch (error) {
        console.error("Error adding/updating user:", error);
        throw error;
    }
};

// Add a movie to favorites
export const addToFavorites = async (uid, movieId) => {
    const response = await fetch(`${BASE_URL}/users/${uid}/favorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId }),
    });

    if (!response.ok) {
        throw new Error("Failed to add movie to favorites.");
    }

    return await response.json();
};

// Remove a movie from favorites
export const removeFromFavorites = async (uid, movieId) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${uid}/favorites/${movieId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to remove movie from favorites.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error removing favorite movie:", error);
        throw error;
    }
};

// Fetch a user's favorite movies
export const fetchFavorites = async (uid) => {
    const response = await fetch(`${BASE_URL}/users/${uid}/favorites`);

    if (!response.ok) {
        throw new Error("Failed to fetch favorite movies.");
    }

    return await response.json();
};

