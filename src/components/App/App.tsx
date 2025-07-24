import { useState } from "react";
import { fetchMovies } from "../../services/movieService";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import type { Movie } from "../../types/movie";
import toast from "react-hot-toast";
import s from "./App.module.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState<Movie | null>(null);
  const closeModal = () => setIsModalOpen(null);
  const openModal = (movie: Movie) => setIsModalOpen(movie);

  const handleSearch = async (search: string) => {
    try {
      setIsError(false);
      setMovies([]);
      setIsLoading(true);
      const newMovies = await fetchMovies(search);

      if (newMovies.length === 0) {
        toast.error("No movies found for your request.", {
          duration: 2900,
          position: "bottom-right",
        });
      }

      setMovies(newMovies);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {movies.length > 0 && <MovieGrid onSelect={openModal} movies={movies} />}

      {isModalOpen && <MovieModal onClose={closeModal} movie={isModalOpen} />}
    </div>
  );
};

export default App;
