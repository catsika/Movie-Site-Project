import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../hooks/redux/hooks";
import { Movie } from "../../models/movie.interface";
import { getAllMovies } from "../../streamSlice";
import { NavBar } from "../../../navBar/NavBar.component";
import { TopBanner } from "./Browse.styled";
import "./Browser.css";
import { Link } from "react-router-dom";

const BrowseComponent = () => {
  const dispatch = useAppDispatch();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await dispatch(getAllMovies());
      const movieData = response.payload;
      setMovies(movieData as Movie[]);
      setIsLoading(false);
      console.log(movies);
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
        <div className="items-b">
          {movies.map((movie) => (
            <Link
              to={`/title/tt-${movie._id.slice(0, 8)}`}
              state={{ _id: movie._id }}
              className="item-b"
              key={movie._id}
            >
              <img
                className="item-image-b"
                src={movie.media.poster}
                alt="Item"
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
