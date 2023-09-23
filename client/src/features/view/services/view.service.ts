import axios from "axios";
import { Movie } from "../../stream/models/movie.interface";

const getSelectMovie = async (_id: string): Promise<Movie | null> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_API}/media/getMovie/${_id}`
  );
  return data;
};

const viewService = {
  getSelectMovie,
};

export default viewService;
