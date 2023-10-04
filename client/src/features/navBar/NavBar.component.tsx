import { useEffect, useRef, useState } from "react";
import {
  AccountBox,
  ContainerCustom,
  Content,
  Logo,
  NavBucket,
  NavListItem,
  NavListWrap,
  Search,
} from "./NavBar.styled";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";

interface NavBarProps {
  customColor?: string; // Optional custom color prop
}

export const NavBar: React.FC<NavBarProps> = ({ customColor }) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [backgroundColor, setBackgroundColor] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route location

  const handleSearchClick = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!customColor) {
        setBackgroundColor(window.scrollY > 0 ? "black" : "transparent");
      }
    };

    if (!customColor) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (!customColor) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [customColor]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsToggled(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <ContainerCustom color={customColor || backgroundColor}>
      <Content className="parallax">
        <Logo>
          <a href="/">
            <img
              src="/images/site-logo.png"
              alt="site-logo"
              style={{ height: "55px" }}
            />
          </a>
        </Logo>
        <NavBucket color={backgroundColor}>
          <NavListWrap>
            {[
              { label: "Channels", url: "#" },
              { label: "Browse", url: "/" },
              { label: "Featured", url: "/featured" },
              { label: "TV Shows", url: "#" },
            ].map((item) => (
              <NavListItem
                key={item.label}
                className={
                  location.pathname === item.url ? "active" : "" // Check if the location matches the tab's URL
                }
                onClick={() => navigate(item.url)} // Navigate directly without setting active tab
              >
                <a>
                  <span>{item.label}</span>
                </a>
              </NavListItem>
            ))}
          </NavListWrap>
        </NavBucket>
        <AccountBox>
          <Search ref={searchRef}>
            <input
              className={`input ${isToggled ? "toggle" : ""}`}
              type="text"
              placeholder="Find your favorite movies"
            />
            <SearchIcon
              fontSize="large"
              className={`searchIcon ${isToggled ? "toggle" : ""}`}
              onClick={handleSearchClick}
              style={{ color: "white" }}
            />
          </Search>
        </AccountBox>
      </Content>
    </ContainerCustom>
  );
};
