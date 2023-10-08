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
import "./navBar.css";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { SearchMovie } from "../../shared/utils/search";
import { Movie } from "../stream/models/movie.interface";
import { useAppDispatch } from "../../hooks/redux/hooks";
import { getAllMovies } from "../stream/streamSlice";

interface NavBarProps {
  customColor?: string;
}

export const NavBar: React.FC<NavBarProps> = ({ customColor }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const [backgroundColor, setBackgroundColor] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const searchResults = SearchMovie(searchInput, movies);
  const dropdownRef = useRef<HTMLDivElement>(null); // Add this line

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
  }, [dispatch, searchInput]);

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
        dropdownRef.current && // Add this condition
        !searchRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node) // And this condition
      ) {
        setIsToggled(false);
        if (dropdownVisible) {
          setDropdownVisible(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  const allowedRoutes = ["/", "/featured", "/channels", "/news"];

  const handleTabClick = (url: string) => {
    if (allowedRoutes.includes(url)) {
      navigate(url);
    }
  };

  useEffect(() => {
    setDropdownVisible(searchResults.length > 0 && searchInput !== "");
  }, [searchInput]);

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
        <Dropdown ref={dropdownRef} className={dropdownVisible ? "show" : ""}>
          {" "}
          {searchResults.map((result, index) => (
            <Link
              className="link"
              to={`/title/tt-${result._id.slice(0, 8)}`}
              state={{ _id: result._id }}
              key={result._id}
            >
              <div key={index}>{result.title}</div>
            </Link>
          ))}
        </Dropdown>
      </Content>
    </ContainerCustom>
  );
};
