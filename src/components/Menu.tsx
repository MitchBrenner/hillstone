"use client";
import React, { useRef, useState } from "react";
import { sliderLists } from "../../constants";
import { gsap, useGSAP } from "@/lib/gsap";

const Menu = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(
    () => {
      gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 });

      gsap.fromTo(
        ".cocktail img",
        { opacity: 0, xPercent: -100 },
        { opacity: 1, xPercent: 0, duration: 1, ease: "power1.inOut" },
      );

      gsap.fromTo(
        ".details h2",
        {
          opacity: 0,
          yPercent: 100,
        },
        { opacity: 1, yPercent: 0, ease: "power1.inOut" },
      );

      gsap.fromTo(
        ".details p",
        {
          opacity: 0,
          yPercent: 100,
        },
        { opacity: 1, yPercent: 0, ease: "power1.inOut" },
      );
    },
    { scope: sectionRef, dependencies: [currentIndex] },
  );

  const totalCocktails = sliderLists.length;

  const getCocktailAt = (indexOffset: number) => {
    return sliderLists[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  const currentCocktail = getCocktailAt(0);

  const goToSlide = (index: number) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurrentIndex(newIndex);
  };

  return (
    <section ref={sectionRef} id="menu" aria-labelledby="menu-heading">
      <img src={"/images/slider-left-leaf.png"} alt="" id="m-left-leaf" />
      <img src={"/images/slider-right-leaf.png"} alt="" id="m-right-leaf" />
      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {sliderLists.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={`${
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
            aria-label="Previous cocktail"
          >
            <img src="/images/left-arrow.png" alt="" aria-hidden="true" />
          </button>
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1)}
            aria-label="Next cocktail"
          >
            <img src="/images/right-arrow.png" alt="" aria-hidden="true" />
          </button>
        </div>

        <div className="cocktail">
          <img src={currentCocktail.image} alt={currentCocktail.name} />
        </div>

        <div className="recipe">
          <div className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>

          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
