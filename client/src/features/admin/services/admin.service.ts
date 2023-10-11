import axios, { AxiosRequestConfig } from "axios";
import { Movie, newMovie } from "../../stream/models/movie.interface";

const upload = async (
  newMovie: newMovie,
  headers: AxiosRequestConfig["headers"]
): Promise<Movie | any> => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_API}/media/upload`,
    newMovie,
    {
      headers,
    }
  );

  return { data };
};

const adminService = {
  upload,
};

export default adminService;
