import s from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

const MovieGrid = ({ onSelect, movies }: MovieGridProps) => {
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <ul className={s.grid}>
      {movies.map((movie) => (
        <li key={movie.id} onClick={() => onSelect(movie)}>
          <div className={s.card}>
            <img
              className={s.image}
              src={posterBaseUrl + movie.poster_path}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={s.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
