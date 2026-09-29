"use client";
import React, { useEffect, useRef, useState } from "react";
import { sliderLists } from "../../constants";
import { gsap, useGSAP } from "@/lib/gsap";

const pad = (n: number) => String(n).padStart(2, "0");

const Chevron = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

const Menu = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // 1 = moving forward (new drink enters from the right), -1 = backward
  const directionRef = useRef<1 | -1>(1);
  const hasMountedRef = useRef(false);

  const totalCocktails = sliderLists.length;
  const currentCocktail = sliderLists[currentIndex];

  useGSAP(
    () => {
      // Don't play the slide transition on first render, only on changes
      if (!hasMountedRef.current) {
        hasMountedRef.current = true;
        return;
      }

      const dir = directionRef.current;

      gsap.fromTo(
        ".cocktail img",
        { xPercent: 25 * dir, opacity: 0, scale: 0.96 },
        {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".info-name, .details h3, .details p",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
        },
      );
    },
    { scope: sectionRef, dependencies: [currentIndex] },
  );

  // Preload every drink photo so switching slides never shows a blank frame
  useEffect(() => {
    sliderLists.forEach(({ image }) => {
      const img = new window.Image();
      img.src = image;
    });
  }, []);

  const goToSlide = (index: number, direction?: 1 | -1) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    if (newIndex === currentIndex) return;
    // Tabs pass no direction: infer it from where the tab sits
    directionRef.current = direction ?? (newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
  };

  return (
    <section
      ref={sectionRef}
      id="menu"
      aria-labelledby="menu-heading"
      // ←/→ switch drinks while focus is anywhere in the section
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") goToSlide(currentIndex - 1, -1);
        if (e.key === "ArrowRight") goToSlide(currentIndex + 1, 1);
      }}
    >
      <img src={"/images/slider-left-leaf.png"} alt="" id="m-left-leaf" />
      <img src={"/images/slider-right-leaf.png"} alt="" id="m-right-leaf" />

      <div className="menu-header">
        <p className="eyebrow">The Menu</p>
        <h2 id="menu-heading">Signature Pours</h2>
      </div>

      <nav className="cocktail-tabs" aria-label="Cocktail navigation">
        {sliderLists.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={isActive ? "is-active" : ""}
              aria-current={isActive ? "true" : undefined}
              onClick={() => goToSlide(index)}
            >
              <span className="tab-index">{pad(index + 1)}</span>
              <span className="tab-name">{cocktail.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="content">
        <div className="info">
          <p className="eyebrow">Recipe for</p>
          <p className="info-name">{currentCocktail.name}</p>
        </div>

        <div className="stage">
          <div className="cocktail">
            <img src={currentCocktail.image} alt={currentCocktail.name} />
          </div>

          <div className="controls">
            <button
              onClick={() => goToSlide(currentIndex - 1, -1)}
              aria-label="Previous cocktail"
            >
              <Chevron direction="left" />
            </button>
            <p className="counter" aria-live="polite">
              <span>{pad(currentIndex + 1)}</span> / {pad(totalCocktails)}
            </p>
            <button
              onClick={() => goToSlide(currentIndex + 1, 1)}
              aria-label="Next cocktail"
            >
              <Chevron direction="right" />
            </button>
          </div>
        </div>

        <div className="details">
          <h3>{currentCocktail.title}</h3>
          <p>{currentCocktail.description}</p>
        </div>
      </div>
    </section>
  );
};

export default Menu;
