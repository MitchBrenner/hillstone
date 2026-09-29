"use client";
import React, { useRef } from "react";
import { cocktailLists, mockTailLists } from "../../constants";
import { gsap, useGSAP } from "@/lib/gsap";

const Cocktails = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Leaf parallax; the leaves are hidden on phones, so skip it there
      gsap.matchMedia().add("(min-width: 768px)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 30%",
              end: "bottom 80%",
              scrub: true,
            },
          })
          .from("#c-left-leaf", {
            y: 100,
            x: -100,
          })
          .from("#c-right-leaf", {
            y: 100,
            x: 100,
          });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="cocktails" className="noisy">
      <img src="/images/cocktail-left-leaf.png" alt="" id="c-left-leaf" />
      <img src="/images/cocktail-right-leaf.png" alt="" id="c-right-leaf" />

      <div className="list">
        <div className="popular">
          <h2>Most Popular</h2>
          <ul>
            {cocktailLists.map((drink) => (
              <li key={drink.name}>
                <div className="md:me-28">
                  <h3>{drink.name}</h3>
                  <p>
                    {drink.country} | {drink.detail}
                  </p>
                </div>
                <span>{drink.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="loved">
          <h2>Mocktails</h2>
          <ul>
            {mockTailLists.map((drink) => (
              <li key={drink.name}>
                <div className="md:me-28">
                  <h3>{drink.name}</h3>
                  <p>
                    {drink.country} | {drink.detail}
                  </p>
                </div>
                <span>{drink.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;
