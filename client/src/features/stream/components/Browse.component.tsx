import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks/redux/hooks";
import { Movie } from "../models/movie.interface";
import { getAllMovies } from "../streamSlice";
import { NavBar } from "../../navBar/NavBar.component";
import { TopBanner } from "./Browse.styled";
import Slider from "../../Slider/Slider";
import {
  new_releases,
  newly_added_sort,
  top_rated,
} from "../../algorithms/sorting";

const BrowseComponent = () => {
  const dispatch = useAppDispatch();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const fetchMovies = async () => {
    try {
      const response = await dispatch(getAllMovies());
      const movieData = response.payload; // Extract the movie data from the payload
      setMovies(movieData as Movie[]); // Update the movies state with the fetched data
      setIsLoading(false); // Set isLoading to false when movies are loaded
      console.log(movieData); // Log the movie data
    } catch (error) {
      console.error(error); // Handle the error case
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <NavBar />
      <TopBanner>
        <a>
          <div className="bannerContent">
            <img className="movieTitle" src="/images/the-boys-title.png" />
            <span className="movieDescription">
              New Season, New Action, New Drama
            </span>
          </div>
          <img src="/images/the-boys-banner.jpeg" />
        </a>
      </TopBanner>

      {/* Conditional rendering based on isLoading */}
      {isLoading ? (
        <p>Loading...</p> // You can replace this with a loading spinner or other UI
      ) : (
        <div className="main_container">
          <Slider
            movies={new_releases(movies)}
            carouselDesc="New Releases"
            id="new_releases"
          />
          <Slider
            movies={newly_added_sort(movies)}
            carouselDesc="Just Added"
            id="Just_added"
          />
          <Slider
            movies={top_rated(movies)}
            carouselDesc="Top Rated"
            id="top_rated"
          />
          <Slider
            movies={movies}
            carouselDesc="Top Picks For ..."
            id="top_picks"
          />
          <Slider
            movies={movies}
            carouselDesc="Recently Viewed"
            id="recently_viewed"
          />
        </div>
      )}
    </>
  );
};

export default BrowseComponent;
