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

export const NavBar = () => {
  const [activeTab, setActiveTab] = useState<string>("Browse");
  const [prevTab, setPrevTab] = useState<string>("");
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [backgroundColor, setBackgroundColor] = useState("");

  const handleSearchClick = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setBackgroundColor("black");
      } else {
        setBackgroundColor("transparent");
      }
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
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // .

  const handleTabHover = (tab: string) => {
    if (!prevTab && activeTab && activeTab !== tab) {
      setPrevTab(activeTab);
      setActiveTab(""); // Remove active status during hover
    }
  };

  const handleTabLeave = () => {
    if (!activeTab && prevTab) {
      setActiveTab(prevTab);
      setPrevTab("");
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setPrevTab(""); //
  };

  // ...

  return (
    <ContainerCustom color={backgroundColor}>
      <Content className="parallax">
        <Logo>
          <a href="/home">
            <img
              src="/images/site-logo.png "
              alt="site-logo"
              style={{ height: "65px" }}
            />
          </a>
        </Logo>
        <NavBucket color={backgroundColor}>
          <NavListWrap>
            <NavListItem
              className={activeTab === "Home" ? "active" : ""}
              onMouseEnter={() => handleTabHover("Home")}
              onMouseLeave={handleTabLeave}
              onClick={() => handleTabClick("Home")}
            >
              <a>
                <span>Channels</span>
              </a>
            </NavListItem>
            <NavListItem
              className={activeTab === "Browse" ? "active" : ""}
              onMouseEnter={() => handleTabHover("Browse")}
              onMouseLeave={handleTabLeave}
              onClick={() => handleTabClick("Browse")}
            >
              <a>
                <span>Browse</span>
              </a>
            </NavListItem>
            <NavListItem
              className={activeTab === "Recently Added" ? "active" : ""}
              onMouseEnter={() => handleTabHover("Recently Added")}
              onMouseLeave={handleTabLeave}
              onClick={() => handleTabClick("Recently Added")}
            >
              <a>
                <span>Featured</span>
              </a>
            </NavListItem>
            <NavListItem
              className={activeTab === "TV Shows" ? "active" : ""}
              onMouseEnter={() => handleTabHover("TV Shows")}
              onMouseLeave={handleTabLeave}
              onClick={() => handleTabClick("TV Shows")}
            >
              <a>
                <span>TV Shows</span>
              </a>
            </NavListItem>
            <NavListItem
              className={activeTab === "Movies" ? "active" : ""}
              onMouseEnter={() => handleTabHover("Movies")}
              onMouseLeave={handleTabLeave}
              onClick={() => handleTabClick("Movies")}
            >
              <a>
                <span>Movies</span>
              </a>
            </NavListItem>
            <NavListItem
              className={activeTab === "Kids" ? "active" : ""}
              onMouseEnter={() => handleTabHover("Kids")}
              onMouseLeave={handleTabLeave}
              onClick={() => handleTabClick("Kids")}
            >
              <a>
                <span>Kids</span>
              </a>
            </NavListItem>

            {/* Add more list items as needed */}
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
