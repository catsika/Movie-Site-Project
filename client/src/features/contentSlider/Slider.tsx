import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./slider.css";
import { Movie } from "../stream/models/movie.interface";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export const Slider: React.FC<{
  movies: Movie[];
  carouselDesc: string;
  id?: string;
}> = ({ movies, carouselDesc, id }) => {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className={`carousel ${id}`}>
      <div className="carousel-text">{carouselDesc}</div>
      <div id="carousel" className="browse_container" ref={containerRef}>
        <div className="items" id={`carousel-items-${id}`}>
          {movies.map((movie) => (
            <Link
              to={`/title/tt-${movie._id.slice(0, 8)}`}
              state={{ _id: movie._id }}
              className="item"
              key={movie._id}
            >
              <img
                className="item-image"
                src={movie.media.poster}
                alt="Item"
                loading="lazy"
              />
              <span
                className="item-load-icon button opacity-none"
                style={{
                  background: "linear-gradient(to right, #FFCC66, black)",
                }}
              >
                <i className="fa fa-play"></i>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
