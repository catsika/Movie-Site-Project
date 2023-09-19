import { Movie } from "../stream/models/movie.interface";

export const newly_added_sort = (movies: Movie[]) => {
  const sorted_movies = [...movies]; // Create a shallow copy of the movies array
  sorted_movies.sort((a, b) => {
    const dateA = new Date(a.dateUploaded);
    const dateB = new Date(b.dateUploaded);
    const result = dateB.getTime() - dateA.getTime();
    return result;
  });
  return sorted_movies;
};

export const new_releases = (movies: Movie[]) => {
  const sorted_movies = [...movies]; // Create a shallow copy of the movies array
  sorted_movies.sort((a, b) => {
    const dateA = new Date(a.details.releaseDate);
    const dateB = new Date(b.details.releaseDate);
    const result = dateB.getTime() - dateA.getTime();
    return result;
  });
  return sorted_movies;
};

export const top_rated = (movies: Movie[]) => {
  const sorted_movies = [...movies]; // Create a shallow copy of the movies array
  sorted_movies.sort((a, b) => {
    const result = b.details.rating - a.details.rating;
    return result;
  });
  return sorted_movies;
};
