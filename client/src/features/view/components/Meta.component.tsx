// Meta.js
import { useState } from "react"; // Import React and useState
import "./Meta.css";
import { Movie } from "../../stream/models/movie.interface";
import TrailerModal from "./TrailerModal.component";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import GradeIconFilled from "@mui/icons-material/Grade";
import GradeIconOutlined from "@mui/icons-material/GradeOutlined";
import Extras from "./Extras.component";
import Suggest from "./Suggest.component";

export const Meta = ({ metaData }: { metaData: Movie }) => {
  // Convert minutes to hours and minutes
  const hours = Math.floor(metaData.details.duration / 60);
  const minutes = metaData.details.duration % 60;

  // Extract the year from the release date
  const releaseDate = new Date(
    metaData.details.releaseDate
  ).toLocaleDateString();

  // Use state to control whether to show the trailer
  const [showTrailer, setShowTrailer] = useState(false);

  // Normalize the rating from a scale of 10 to a scale of 5
  const normalizedRating = Math.round(metaData.details.rating / 2);

  // Generate an array of filled and outlined star icons based on the normalized rating
  const starIcons = Array.from({ length: 5 }).map((_, index) => {
    if (index < normalizedRating) {
      return <GradeIconFilled key={index} sx={{ color: "#ffd700" }} />;
    } else {
      return <GradeIconOutlined key={index} sx={{ color: "#ffd700" }} />;
    }
  });

  return (
    <div>
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
              <div className="rating">{starIcons}</div>
              <div className="card-categories">
                <p className="release-year">{releaseDate}</p>
                <p className="movie-genre">{metaData.genre[0]}</p>
                <p className="movie-duration">
                  {hours}h {minutes}m
                </p>
              </div>
              <p className="movie-label">Overview</p>
              <p className="movie-description">{metaData.synopsis}</p>
              <div className="trailer-button">
                <button onClick={() => setShowTrailer(true)}>
                  <div className="play-button">
                    <PlayArrowIcon sx={{ marginTop: "-5px" }} />
                    <p>Play Trailer</p>
                  </div>
                </button>
              </div>
              {showTrailer && (
                <TrailerModal
                  videoUrl={metaData.media.trailer}
                  onClose={() => setShowTrailer(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Extras metaData={metaData} />
      <Suggest metaData={metaData} />
    </div>
  );
};

export default Meta;
