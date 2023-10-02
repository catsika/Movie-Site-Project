import "./Suggest.css"; // Make sure to import your CSS file
import { Movie } from "../../stream/models/movie.interface";
import Slider from "../../Slider/Slider";

const Suggest = ({ metaData }: { metaData: Movie }) => {
  return (
    <div className="suggest-container">
      <p className="label">Recommendations</p>
      <div className="slides">
        <Slider movies={[]} carouselDesc="" id="recently_viewed" />
      </div>
    </div>
  );
};

export default Suggest;
