import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../hooks/redux/hooks";
import { Movie } from "../../models/movie.interface";
import { getAllMovies } from "../../streamSlice";
import { NavBar } from "../../../navBar/NavBar.component";
import { TopBanner } from "./Featured.styled";
import Slider from "../../../slider/Slider";
import {
  new_releases,
  newly_added_sort,
  top_rated,
} from "../../../algorithms/sorting";

const FeaturedComponent = () => {
  const dispatch = useAppDispatch();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await dispatch(getAllMovies());
      const movieData = response.payload;
      setMovies(movieData as Movie[]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
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

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
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
          {/* You can add more Slider components as needed */}
        </div>
      )}
    </>
  );
};

export default FeaturedComponent;
