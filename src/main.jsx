import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AllMoviesPage from "./pages/AllMoviesPage";
import AddMoviePage from "./pages/AddMoviePage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/Homepage";
import { AuthProvider } from "./context/AuthContext";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import UpdateMoviePage from "./components/UpdateMoviePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PrivateRoute from "./components/PrivateRoute";
import { ThemeProvider } from "./context/ThemeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        index: true,
        element: (
          <ThemeProvider>
            <HomePage />
          </ThemeProvider>
        ),
      }, 
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "movies", element: <AllMoviesPage /> },
      {
        path: "add-movie",
        element: (
          <PrivateRoute>
            <AddMoviePage />
          </PrivateRoute>
        ),
      },
      {
        path: "favorites",
        element: (
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        ),
      },
      {
        path: "movies/:id",
        element: (
          <PrivateRoute>
            <MovieDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "movies/update/:id",
        element: (
          <PrivateRoute>
            <UpdateMoviePage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />, 
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
