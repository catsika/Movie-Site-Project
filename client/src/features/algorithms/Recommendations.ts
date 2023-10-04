import { useAppDispatch } from "../../hooks/redux/hooks";
import { useState, useEffect } from "react";
import { getAllMovies } from "../stream/streamSlice";
import { Movie } from "../stream/models/movie.interface";

const RecommendAlgo = (genre: string[], _id: string) => {
  const dispatch = useAppDispatch();
  const [sortedMovies, setSortedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchAndFilterMovies = async () => {
      try {
        const response = await dispatch(getAllMovies());
        const movies = (response.payload as Movie[]) || [];

        const sortedMovies = movies
          .slice()
          .sort((movieA, movieB) => {
            const similarityA =
              genre.filter((g) => movieA.genre.includes(g)).length /
              new Set([...genre, ...movieA.genre]).size;
            const similarityB =
              genre.filter((g) => movieB.genre.includes(g)).length /
              new Set([...genre, ...movieB.genre]).size;
            const primarySort = similarityB - similarityA;
            const secondarySort = movieB.details.rating - movieA.details.rating;
            return primarySort || secondarySort;
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

export default RecommendAlgo;
