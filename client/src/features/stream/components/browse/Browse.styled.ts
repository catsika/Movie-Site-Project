import { styled, Box } from "@mui/material";

export const TopBanner = styled(Box)(({}) => ({
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
    zIndex: 3,
  },

  "& .movieTitle": {
    userSelect: "none",
    marginBottom: "20px",
    zIndex: 3,
    position: "relative",
    color: "white",
    height: "150px",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  },

  "& .movieTitle:hover": {
    transform: "scale(1.1)",
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
    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%)`,
    zIndex: 2,
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


