import { styled } from "@mui/system";
import { Button, TextField } from "@mui/material";

export const CustomInputField = styled(TextField)(({ theme }) => ({
  border: "1px solid black",
  borderRadius: "8px",
  height: "50px",
  marginTop: "10px",
  marginBottom: "20px",
  backgroundColor: "rgb(51, 51, 51)",
  "& .MuiInputBase-root": {
    color: "white",
    letterSpacing: 1,
  },
  "& .MuiInputLabel-root": {
    color: "gray",
    letterSpacing: 1,
  },
  "& .MuiInputBase-input:focus": {
    backgroundColor: "rgb(69, 69, 69)",
  },
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    width: "100%",
    height: "45px",
    "& .MuiInputLabel-root": {
      fontSize: "14px",
      lineHeight: 1,
      letterSpacing: 1,
    },
  },
}));

export const CustomButton = styled(Button)(({}) => ({
  marginTop: "20px",
  marginBottom: "2px",
  border: "1px solid",
  borderRadius: "5px",
  letterSpacing: 1,
  height: "55px",
}));
