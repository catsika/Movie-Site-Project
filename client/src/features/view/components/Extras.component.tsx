import "./Extras.css"; // Make sure to import your CSS file
import { Movie } from "../../stream/models/movie.interface";
import Skeleton from "@mui/material/Skeleton";

const Extras = ({ metaData }: { metaData: Movie }) => {
  return (
    <div className="extras-container">
      <div className="extras-left">
        <p className="extras-media">Media</p>
        {/* Adjust the width and height of the Skeleton components */}
        <div className="medias">
          <Skeleton
            variant="rectangular"
            width={550}
            height={318}
            sx={{ bgcolor: "grey.900" }}
          />
          <Skeleton
            variant="rectangular"
            width={550}
            height={318}
            sx={{ bgcolor: "grey.900" }}
          />
        </div>
      </div>

      <section className="extras-right-sidebar">
        <div className="extras-status">
          <p>Status</p>
          <p className="extras-info">Released</p>
        </div>
        <div className="extras-genre">
          <p>Genre</p>
          <p className="extras-info">{metaData.genre.join(", ")}</p>
        </div>
        <div className="extras-original-language">
          <p>Original Language</p>
          <p className="extras-info">English</p>
        </div>

        <div className="extras-rating">
          <p>Rating</p>
          <p className="extras-info">{metaData.details.rating} - IMDB</p>
        </div>

        <div className="extras-budget">
          <p>Budget</p>
          <p className="extras-info">-</p>
        </div>
        <div className="extras-revenue">
          <p>Revenue</p>
          <p className="extras-info">-</p>
        </div>
      </section>
    </div>
  );
};

export default Extras;
