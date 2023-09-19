import axios, { AxiosRequestConfig } from "axios";
import { Movie, newMovie } from "../../stream/models/movie.interface";

const upload = async (
  newMovie: newMovie,
  headers: AxiosRequestConfig["headers"]
): Promise<Movie | any> => {
  // Merge the headers from AxiosRequestConfig with your custom headers
  const mergedHeaders = {
    ...headers, // Existing headers from AxiosRequestConfig
    "Content-Type": "multipart/form-data", // Additional header
  };

  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_API}/media/upload`,
    newMovie,
    {
      headers: mergedHeaders, // Use the merged headers
    }
  );
  return data;
};

const adminService = {
  upload,
};

export default adminService;
