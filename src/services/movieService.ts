import axios from "axios";
import type { Movie } from "../types/movie";

interface FetchMoviesResponse {
  results: Movie[];
}

const BASE_URL = "https://api.themoviedb.org/3";
const superPuperImportantKey = import.meta.env.VITE_API_KEY;
const options = {
  headers: {
    Authorization: `Bearer ${superPuperImportantKey}`,
    Accept: "application/json",
  },
};

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<FetchMoviesResponse>(
    `${BASE_URL}/search/movie`,
    {
      ...options,
      params: {
        query,
        page: 1,
      },
    }
  );
  return response.data.results;
};
