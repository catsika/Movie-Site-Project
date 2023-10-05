import React, { useEffect, useRef, useState } from "react";
import {
  AccountBox,
  ContainerCustom,
  Content,
  Dropdown,
  Logo,
  NavBucket,
  NavListItem,
  NavListWrap,
  Search,
} from "./NavBar.styled";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchMovie } from "../../shared/utils/search";
import { Movie } from "../stream/models/movie.interface";
import { useAppDispatch } from "../../hooks/redux/hooks";
import { getAllMovies } from "../stream/streamSlice";

interface NavBarProps {
  customColor?: string;
}

const NavBar: React.FC<NavBarProps> = ({ customColor }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const [backgroundColor, setBackgroundColor] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await dispatch(getAllMovies());
        const movieData = response.payload;
        setMovies(movieData as Movie[]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, [dispatch]);

  const handleSearchClick = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    const handleScroll = () => {
      setBackgroundColor(window.scrollY > 0 ? "black" : "transparent");
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsToggled(false);
        setDropdownVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const allowedRoutes = ["/", "/featured", "/channels", "/news"];

  const handleTabClick = (url: string) => {
    if (allowedRoutes.includes(url)) {
      navigate(url);
    }
  };

  const searchResults = SearchMovie(searchInput, movies);
  console.log(searchResults);

  useEffect(() => {
    setDropdownVisible(searchResults.length > 0 && searchInput !== "");
  }, [searchResults, searchInput]);

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
              { label: "News", url: "#" },
            ].map((item) => (
              <NavListItem
                key={item.label}
                className={location.pathname === item.url ? "active" : ""}
                onClick={() => handleTabClick(item.url)}
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
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
            <SearchIcon
              fontSize="large"
              className={`searchIcon ${isToggled ? "toggle" : ""}`}
              onClick={handleSearchClick}
              style={{ color: "white" }}
            />
          </Search>
        </AccountBox>
        <Dropdown className="show">
          {searchResults.map((result, index) => (
            <div key={index}>{result}</div>
          ))}
        </Dropdown>
      </Content>
    </ContainerCustom>
  );
};

export default NavBar;
