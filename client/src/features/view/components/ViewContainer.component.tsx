import { NavBar } from "../../navBar/NavBar.component";
import { Movie } from "../../stream/models/movie.interface";
import { Meta } from "./Meta.component";

const ViewContainer = ({ metaData }: { metaData: Movie }) => {
  return (
    <>
      <NavBar customColor="black" />
      <div style={{ paddingTop: "80px" }}>
        <Meta metaData={metaData} />
      </div>
    </>
  );
};

export default ViewContainer;
