import axios from "axios";
import { Movie } from "../models/movie.interface";

const getallMovies = async (): Promise<Movie[] | null> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_API}/media/getAllMovies`
  );
  return data;
};

const streamService = {
  getallMovies,
};

export default streamService;
