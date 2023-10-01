/* Meta.js */
import "./Meta.css";
import { Movie } from "../../stream/models/movie.interface";

export const Meta = ({ metaData }: { metaData: Movie }) => {
  // Convert minutes to hours and minutes
  const hours = Math.floor(metaData.details.duration / 60);
  const minutes = metaData.details.duration % 60;

  // Extract the year from the release date
  const releaseYear = new Date(metaData.details.releaseDate).getFullYear();

  return (
    <div className="wrapper">
      <div className="movie-card">
        <div className="card-right">
          <div className="img-container">
            <img src={metaData.media.poster} alt={metaData.title} />
          </div>
        </div>
        <div className="card-left">
          <div className="card-details">
            <h1>{metaData.title}</h1>
            <div className="card-categories">
              <p className="movie-rating">{metaData.details.rating}</p>
              <p className="release-year">{releaseYear}</p>
              <p className="movie-genre">{metaData.genre.join(" , ")}</p>
              <p className="movie-duration">
                {hours}h {minutes}m
              </p>
            </div>
            <p className="movie-label">Overview</p>
            <p className="movie-description">{metaData.synopsis}</p>

            <div className="social-buttons">
              <button>
                <i className="fas fa-play"></i> SEE TRAILER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
