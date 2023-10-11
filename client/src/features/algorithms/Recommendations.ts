import { useAppDispatch } from "../../hooks/redux/hooks";
import { useState, useEffect } from "react";
import { getAllMovies } from "../stream/streamSlice";
import { Movie } from "../stream/models/movie.interface";

export const RecommendAlgo = (genre: string[], _id?: string) => {
  const dispatch = useAppDispatch();
  const [sortedMovies, setSortedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchAndFilterMovies = async () => {
      try {
        const response = await dispatch(getAllMovies());
        const movies = (response.payload as Movie[]) || [];
        const primaryGenre = genre[0];

        const sortedMovies = movies
          .slice()
          .filter((movie) => genre.some((g) => movie.genre.includes(g))) // Filter movies with at least one matching genre
          .sort((movieA, movieB) => {
            const similarityA =
              genre.filter((g) => movieA.genre.includes(g)).length /
                new Set([...genre, ...movieA.genre]).size +
              (movieA.genre.includes(primaryGenre) ? 1 : 0); // Add bonus score if movie includes primary genre
            const similarityB =
              genre.filter((g) => movieB.genre.includes(g)).length /
                new Set([...genre, ...movieB.genre]).size +
              (movieB.genre.includes(primaryGenre) ? 1 : 0); // Add bonus score if movie includes primary genre
            return similarityB - similarityA; // Only primary sorting based on genre similarity
          })
          .filter((movie) => movie._id !== _id)
          .slice(0, 12);

        setSortedMovies(sortedMovies);
      } catch (err) {
        console.log("Error fetching movies");
      }
    };

    fetchAndFilterMovies();
  }, [dispatch, genre, _id]);

  return sortedMovies;
};
