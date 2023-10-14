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
  const state = location.state;
  const _id = state && state._id;

  useEffect(() => {
    let isMounted = true; // Add a variable to track if the component is mounted

    const fetchData = async () => {
      try {
        if (_id && isMounted) {
          const action = await dispatch(getSelectMovie(_id));
          if (getSelectMovie.fulfilled.match(action)) {
            const movieData = action.payload;
            if (isMounted) {
              setSelectedMovie(movieData);
              if (movieData) {
                const releaseYear = new Date(
                  movieData.details.releaseDate
                ).getFullYear();
                document.title = `${movieData.title} (${releaseYear})`;
              }
            }
          } else {
            // Handle the case when the action is rejected or other cases
            if (isMounted) {
              setSelectedMovie(null);
            }
          }
        } else {
          // Handle the case when _id is null
          // Redirect or handle this case as needed
        }
      } catch (error) {
        if (isMounted) {
          setSelectedMovie(null);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Set isMounted to false when the component is unmounted
    };
  }, [_id, dispatch]);

  if (!selectedMovie) {
    return <div>Loading...</div>; // Return a loading indicator or handle the error case here
  }

  return <ViewContainer metaData={selectedMovie} />;
};

export default ViewComponent;
