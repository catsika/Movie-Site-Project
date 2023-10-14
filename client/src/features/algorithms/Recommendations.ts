import { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux/hooks";
import { Movie } from "../stream/models/movie.interface";
import { getAllMovies } from "../stream/streamSlice";

export const RecommendAlgo = (genre: string[], _id?: string) => {
  const dispatch = useAppDispatch();
  const [sortedMovies, setSortedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchAndFilterMovies = async () => {
      try {
        const response = await dispatch(getAllMovies());
        const movies = (response.payload as Movie[]) || [];

        const primaryGenre = genre[0]; // Get the first genre from the array

        const sortedMovies = movies
          .slice()
          .filter((movie) => movie.genre.includes(primaryGenre)) // Filter movies with the primary genre
          .sort((movieA, movieB) => {
            const similarityA = movieA.genre.includes(primaryGenre) ? 1 : 0;
            const similarityB = movieB.genre.includes(primaryGenre) ? 1 : 0;

            return similarityB - similarityA; // Primary sorting based on genre similarity
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
