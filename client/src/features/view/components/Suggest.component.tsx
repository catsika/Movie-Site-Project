import "./Suggest.css"; // Make sure to import your CSS file
import { Movie } from "../../stream/models/movie.interface";
import { Slider } from "../../contentSlider/Slider";
import { RecommendAlgo } from "../../algorithms/Recommendations";

const Suggest = ({ metaData }: { metaData: Movie }) => {
  const movies = RecommendAlgo(metaData.genre, metaData._id);
  return (
    <div className="suggest-container">
      <p className="label">Recommendations</p>
      <div className="slides">
        <Slider movies={movies} carouselDesc="" id="" />
      </div>
    </div>
  );
};

export default Suggest;
