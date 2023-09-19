import { styled, Box } from "@mui/material";

export const ContainerMovies = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  backgroundColor: "#111111",
  color: "white",
  padding: "54px",
  position: "relative",
  width: "100vw",
  paddingTop: "100px",
}));

export const MovieListWrap = styled("ul")(() => ({
  display: "flex",
  flexWrap: "wrap",
  listStyleType: "none",
  paddingLeft: "60px",
  marginLeft: "60px",
}));

export const MovieListItem = styled("li")(() => ({
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  border: "1px solid black",
  height: "390px",
  width: "270px",
  overflow: "hidden",
  position: "relative",

  "& a": {
    textDecoration: "none",
    position: "relative",
    height: "100%",

    "& img": {
      position: "absolute",
      top: "0",
      left: "0",
      height: "100%",
      width: "auto",

      // CSS properties for the image
    },
    "& span": {
      position: "absolute",
      bottom: "0",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontSize: "20px",
      zIndex: 1,

      // CSS properties for the span
    },
  },

  "& pre": {
    overflow: "auto",
    whiteSpace: "pre-wrap",
    maxHeight: "100%",
    margin: "0",
    padding: "0",
  },

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    filter: "grayscale(100%);brightness(50%)",
    cursor: "pointer",
  },
}));

export const TopBanner = styled(Box)(() => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "330px",
  overflow: "hidden",

  "& .bannerContent": {
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    zIndex: 3, // Increase the z-index to bring the content to the front
  },
  "& .movieTitle": {
    userSelect: "none",
    marginBottom: "20px", // Adjust the margin as needed
    zIndex: 3, // Increase the z-index to bring the text to the front
    position: "relative",
    color: "white",
    height: "150px",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  },

  "& .movieTitle:hover": {
    transform: "scale(1.1)", // Adjust the scale value as desired
  },

  "& .movieDescription": {
    userSelect: "none",
    marginBottom: "20px",
    paddingLeft: "40px",
    zIndex: 3,
    position: "relative",
    fontSize: "18px",
    color: "white",
    fontStyle: "italic",
    opacity: 0.8,
    letterSpacing: "0.5px",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
  },

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%)",
    zIndex: 2, // Decrease the z-index to place it below the text
  },
  "& img": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 1,
  },
}));
