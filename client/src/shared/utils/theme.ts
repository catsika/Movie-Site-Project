import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FFD700", // Gold
    },
    secondary: {
      main: "#333333", // Dark gray
    },
    background: {
      default: "#000000", // Black
    },
  },
  typography: {
    fontFamily: "Helvetica, Arial, sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    button: {
      textTransform: "none",
    },
  },
});
