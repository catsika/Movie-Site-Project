import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../hooks/redux/hooks";
import { Movie } from "../../models/movie.interface";
import { getAllMovies } from "../../streamSlice";
import { TopBanner } from "./Browse.styled";
import "./Browser.css";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { NavBar } from "../../../navBar/NavBar.component";

const BrowseComponent = () => {
  const dispatch = useAppDispatch();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  document.title = "Browse Movies";

  const fetchMovies = async () => {
    try {
      const response = await dispatch(getAllMovies());
      const movieData = response.payload;
      setMovies(movieData as Movie[]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false); // Set loading to false even in case of an error
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
            <img
              className="movieTitle"
              src="/images/the-boys-title.png"
              alt="The Boys Title"
            />
            <span className="movieDescription">
              New Season, New Action, New Drama
            </span>
          </div>
          <img src="/images/the-boys-banner.jpeg" alt="The Boys Banner" />
        </a>
      </TopBanner>

      {isLoading ? (
        renderSkeletons()
      ) : (
        <div className="items-b">
          {movies.map((movie) => (
            <Link
              to={`/title/tt-${movie?._id?.slice(0, 8) || ""}`}
              state={{ _id: movie?._id || "" }}
              className="item-b"
              key={movie?._id || ""}
            >
              <img
                className="item-image-b"
                src={movie?.media?.poster || ""}
                alt="Item"
                loading="lazy"
              />
              <span
                className="item-load-icon button opacity-none"
                style={{
                  background: "linear-gradient(to right, #FFCC66, black)",
                }}
              >
                <i className="fa fa-play"></i>
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default BrowseComponent;
