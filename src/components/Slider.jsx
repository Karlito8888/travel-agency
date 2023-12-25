import React, { useState } from "react";
import dataSlider from "../components-sub/dataSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(dataSlider[0].id);

  const nextSlide = () => {
    const currentIndex = dataSlider.findIndex((obj) => obj.id === slideIndex);
    const nextIndex = (currentIndex + 1) % dataSlider.length;
    setSlideIndex(dataSlider[nextIndex].id);
  };

  const prevSlide = () => {
    const currentIndex = dataSlider.findIndex((obj) => obj.id === slideIndex);
    const prevIndex =
      (currentIndex - 1 + dataSlider.length) % dataSlider.length;
    setSlideIndex(dataSlider[prevIndex].id);
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <section id="steps">
      <div className="container-slider">
        {dataSlider.map((obj) => {
          return (
            <div
              className={slideIndex === obj.id ? "activ-anim" : "slide"}
              key={obj.id}
            >
              <h4>{obj.title}</h4>
              <img src={obj.imageUrl} alt={obj.title} />
              <p>{obj.subTitle}</p>
            </div>
          );
        })}
        <FontAwesomeIcon
          className="btn-slide prev"
          icon={faCircleChevronLeft}
          onClick={prevSlide}
        />
        <FontAwesomeIcon
          className="btn-slide next"
          icon={faCircleChevronRight}
          onClick={nextSlide}
        />
        <div className="container-dots">
          {dataSlider.map((obj) => (
            <div
              onClick={() => moveDot(obj.id)}
              className={slideIndex === obj.id ? "dot-active" : "dot"}
              key={obj.id}
            ></div>
          ))}
        </div>
      </div>

      <div id="possibilities">
        <div className="wrapper">
          <article className="article1">
            <div className="overlay">
              <h4>partez en famille</h4>
              <p>
                Offrez le meilleur à ceux que vous aimez et partagez des moments
                fabuleux !
              </p>
              <a href="#" className="button-2">
                Plus d'infos
              </a>
            </div>
          </article>

          <article className="article2">
            <div className="overlay">
              <h4>envie de s'évader</h4>
              <p>
                Parfois un peu d’évasion serait le bienvenue et ferait le plus
                grand bien !
              </p>
              <a href="#" className="button-2">
                Plus d'infos
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
