import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./slider.css";
import { Movie } from "../stream/models/movie.interface";

gsap.registerPlugin(ScrollTrigger);

const Slider: React.FC<{
  movies: Movie[];
  carouselDesc: string;
  id: string;
}> = ({ movies, carouselDesc, id }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlContainerRef = useRef<HTMLDivElement>(null);
  const [isControlContainerVisible, setControlContainerVisible] =
    useState(false);

  useEffect(() => {
    const carousel = {
      items: document.getElementById(`carousel-items-${id}`) as HTMLElement,
    };

    gsap.to(carousel.items, {
      x: () => {
        const totalWidth =
          carousel.items.scrollWidth - carousel.items.offsetWidth + 20;
        return -totalWidth;
      },
      scrollTrigger: {
        trigger: carousel.items,
        scrub: true,
        start: "top top",
        end: () => `+=${carousel.items.offsetWidth}`,
      },
    });

    return () => {
      ScrollTrigger.getById(`carousel-scroll-trigger-${id}`)?.kill();
    };
  }, [id]);

  const handleContainerMouseEnter = () => {
    setControlContainerVisible(true);
  };

  const handleContainerMouseLeave = () => {
    setControlContainerVisible(false);
  };

  return (
    <div>
      <div className="carousel-text">{carouselDesc}</div>
      <div
        id="carousel"
        className="browse_container"
        ref={containerRef}
        onMouseEnter={handleContainerMouseEnter}
        onMouseLeave={handleContainerMouseLeave}
      >
        <div
          className="control-container"
          ref={controlContainerRef}
          style={{
            visibility: isControlContainerVisible ? "visible" : "hidden",
          }}
        >
          {/* Your control buttons here */}
        </div>

        <div className="items" id={`carousel-items-${id}`}>
          {movies.map((movie) => (
            <div className="item" key={movie._id}>
              <img className="item-image" src={movie.media.poster} alt="Item" />
              <a href={"#"}>
                <span
                  className="item-load-icon button opacity-none"
                  style={{
                    background: "linear-gradient(to right, #FFCC66, black)",
                  }}
                >
                  <i className="fa fa-play"></i>
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
