import Fuse from "fuse.js";
import { Movie } from "../../features/stream/models/movie.interface";

export const SearchMovie = (query: string, movies: Movie[]) => {
  const fuseOptions = {
    keys: ["title"],
    threshold: 0.3,
  };

  const fuse = new Fuse(movies, fuseOptions);

  const searchResults = query ? fuse.search(query) : [];

  // Log or return the search results
  return searchResults.map((result) => result.item);
};
