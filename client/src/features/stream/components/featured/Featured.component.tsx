import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../hooks/redux/hooks";
import { Movie } from "../../models/movie.interface";
import { getAllMovies } from "../../streamSlice";
import { TopBanner } from "./Featured.styled";
import { Slider } from "../../../contentSlider/Slider";
import {
  new_releases,
  newly_added_sort,
  top_rated,
} from "../../../algorithms/sorting";
import { Skeleton } from "@mui/material";
import { RecommendAlgo } from "../../../algorithms/recommendations.ts";
import { NavBar } from "../../../navBar/NavBar.component";

const FeaturedComponent = () => {
  const dispatch = useAppDispatch();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  document.title = "Featured Movies";

  const recommendedGenres = [
    { name: "Action  Movies", genres: ["Action"] },
    { name: "Horror Movies", genres: ["Horror"] },
    { name: "Animated Movies", genres: ["Animation"] },
    { name: "Comedy Movies", genres: ["Comedy"] },
    { name: "Sci-Fi & Fantasy Movies", genres: ["Sci-Fi", "Fantasy"] },
  ];

  const recommendedMovies = recommendedGenres.map((genreData) =>
    RecommendAlgo(genreData.genres)
  );

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

  const renderSkeletons = () => (
    <div className="skeleton-container">
      {Array(18)
        .fill(0)
        .map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width={250}
            height={330}
            sx={{ bgcolor: "grey.900" }}
            animation="wave"
          />
        ))}
    </div>
  );

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
        renderSkeletons()
      ) : (
        <div>
          <Slider movies={new_releases(movies)} carouselDesc="New Releases" />
          <Slider movies={newly_added_sort(movies)} carouselDesc="Just Added" />
          <Slider movies={top_rated(movies)} carouselDesc="Top Rated" />

          {recommendedGenres.map((genreData, index) => (
            <Slider
              key={index}
              movies={recommendedMovies[index]}
              carouselDesc={genreData.name}
              id={""}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FeaturedComponent;
