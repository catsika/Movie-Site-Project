import { styled, css } from "@mui/material";
import Box from "@mui/material/Box";

export const ContainerCustom = styled("div")((props) =>
  css({
    backgroundColor: props.color,
    marginTop: "-13px",
    position: "fixed",
    width: "100%",
    zIndex: "100",
    transform: "translateY(0)",
    transition: "transform 0.3s ease-out",
    "&.parallax": {
      transform: "translateY(-50px)", // Adjust the translateY value as needed for desired parallax effect
    },
  })
);

export const Content = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  padding: "20px",
  margin: "0",
  minHeight: "100%",
}));

export const Logo = styled(Box)(() => ({
  marginLeft: "25px",
  fontSize: "0px",
}));

export const NavBucket = styled("nav")(() => ({
  display: "flex",
  justifyContent: "space-between",
  marginLeft: "auto",
  marginRight: "auto",
  borderRadius: "50px",
  padding: "8px 16px", // Adjust the padding here
  height: "40px",
}));

export const NavListWrap = styled("ul")(() => ({
  display: "flex",
  flexWrap: "nowrap",
  listStyleType: "none",
}));

export const NavListItem = styled("li")(() => ({
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  "& a": {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    fontSize: "15px",
    fontWeight: "800",
    justifyContent: "center",
    lineHeight: "1.5",
    minHeight: "52px",
    minWidth: "80px",
    position: "relative",
    textDecoration: "none",
  },
  span: {
    color: "white",
    display: "flex",
    alignItems: "center",
  },
  "&.active": {
    // Select the active class here
    a: {
      span: {
        color: "rgba(0, 0, 0, 0.9)",
        borderRadius: "40px",
        padding: "15px 26px",
        background: "linear-gradient(to right, #FFFF99, orange)", // Apply gradient here
      },
    },
  },
  "&:hover": {
    cursor: "pointer",
    a: {
      span: {
        color: "rgba(0, 0, 0, 0.9)",
        borderRadius: "40px",
        padding: "15px 26px",
        background: "linear-gradient(to right, #FFCC66, black)", // Darker shade gradient
      },
    },
  },
}));

export const AccountBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginRight: "100px",
}));

export const Search = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginRight: "5px",
  fontSize: "0px",
  position: "relative",
  visibility: "hidden",
  input: {
    background: "transparent",
    width: "0px",
    height: "34px",
    boxShadow: "none",
    color: "#fff",
    border: "1px solid transparent",
    outline: "none",
    paddingLeft: "35px",
    fontSize: "16px",
    transition: "0.3s ease all",
    "&.toggle": {
      visibility: "visible",
      width: "200px",
      borderColor: "#FFF",
      paddingLeft: "50px",
      backgroundColor: "#000",
      borderRadius: "40px",
    },
  },
  ".searchIcon": {
    // Use class selector to target the search icon
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    color: "black",
    cursor: "pointer",
    visibility: "visible",
    transition: "0.3s ease all",
    opacity: 1,
    "&.toggle": {
      opacity: 0,
      visibility: "hidden",
    },
  },
}));

export const User = styled(Box)(() => ({
  fontSize: "0px",
}));
