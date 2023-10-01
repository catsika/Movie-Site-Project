import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks/redux/hooks";
import { getSelectMovie } from "../viewSlice";
import { Movie } from "../../stream/models/movie.interface";
import { useLocation } from "react-router-dom";
import ViewContainer from "./ViewContainer.component";

const ViewComponent = () => {
  const dispatch = useAppDispatch();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const location = useLocation();
  const state = location.state; // Get the entire state object
  const { _id } = state; // Access the movieId from the state object

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dispatch the action to get movie data based on movieId
        const action = await dispatch(getSelectMovie(_id));
        if (getSelectMovie.fulfilled.match(action)) {
          // Check if the action is fulfilled
          const movieData = action.payload;
          setSelectedMovie(movieData);

          // Ensure that movieData is not null before accessing its properties
          if (movieData) {
            // Extract the release year from the releaseDate
            const releaseYear = new Date(
              movieData.details.releaseDate
            ).getFullYear();

            // Set the page title to "Movie Title (Release Year) "
            document.title = `${movieData.title} (${releaseYear})`;
          }
        } else {
          // Handle the rejected or other cases
          setSelectedMovie(null); // Handle the error as needed
        }
      } catch (error) {
        console.error("Error fetching movie data: ", error);
        setSelectedMovie(null); // Handle the error as needed
      }
    };

    fetchData();
  }, [_id, dispatch]);

  if (!selectedMovie) {
    return null; // You can return a loading indicator or handle the error case here
  }

  return <ViewContainer metaData={selectedMovie} />;
};

export default ViewComponent;
