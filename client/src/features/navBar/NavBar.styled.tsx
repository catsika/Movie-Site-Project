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
      transform: "translateY(-50px)",
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
  fontSize: "0",
}));

export const NavBucket = styled("nav")(() => ({
  display: "flex",
  justifyContent: "space-between",
  marginLeft: "auto",
  marginRight: "auto",
  borderRadius: "50px",
  padding: "8px 16px",
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
    padding: "5px",
    alignItems: "center",
  },
  "&.active a span": {
    color: "rgba(0, 0, 0, 0.9)",
    borderRadius: "40px",
    padding: "15px 26px",
    background: "linear-gradient(to right, #FFFF99, orange)",
  },
  "&:hover": {
    cursor: "pointer",
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
  fontSize: "0",
  position: "relative",
  visibility: "hidden",
  input: {
    background: "transparent",
    width: "0",
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
  fontSize: "0",
}));

export const Dropdown = styled("div")(({}) => ({
  display: "none",
  position: "absolute",
  top: "80%",
  right: "130px",
  backgroundColor: "black",
  width: "250px",
  zIndex: 1,
  borderRadius: "8px",
  paddingTop: "5px",
  paddingBottom: "5px",
  maxHeight: "300px",
  overflowY: "auto",

  "&.show": {
    display: "block",
  },

  "& > div": {
    display: "flex",
    alignItems: "center",
    color: "white",
    padding: `15px`,
    fontSize: "18px",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

