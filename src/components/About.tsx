"use client";
import React, { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const titleSplit = SplitText.create("h2", {
        type: "words",
      });

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
        },
      });

      scrollTimeline
        .from(titleSplit.words, {
          opacity: 0,
          duration: 1,
          yPercent: 100,
          ease: "expo.out",
          stagger: 0.02,
        })
        .from(
          ".top-grid div, .bottom-grid div",
          {
            opacity: 0,
            duration: 1,
            ease: "expo.inOut",
            stagger: 0.05,
          },
          "-=0.5",
        );
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} id="about">
      <div className="md:mb-16 mb-10">
        <div className="content">
          <div className="md:col-span-8">
            <h2>
              Where every detail matters <span className="text-white">- </span>
              from muddle to garnish
            </h2>
          </div>

          <div className="sub-content">
            <p>
              Every cocktail we serve is a reflection of our obsession with
              detail - from the first muddle to the final garnish. That care is
              what turns a simple drink into something truly memorable.
            </p>
            <div>
              <p className="md:text-3xl text-xl font-bold">
                <span>4.5</span>/5
              </p>
              <p className="text-sm text-white-100">120,000+ happy guests</p>
            </div>
          </div>
        </div>
      </div>

      <div className="top-grid">
        <div className="md:col-span-3">
          <div className="noisy" />
          <img src="/images/abt1.png" alt="Bartender pouring a cocktail" />
        </div>
        <div className="md:col-span-6">
          <div className="noisy" />
          <img src="/images/abt2.png" alt="Cocktails lined up on the bar" />
        </div>
        <div className="md:col-span-3">
          <div className="noisy" />
          <img src="/images/abt5.png" alt="Freshly garnished drink" />
        </div>
      </div>

      <div className="bottom-grid">
        <div className="md:col-span-8">
          <div className="noisy" />
          <img src="/images/abt3.png" alt="Guests enjoying drinks at the bar" />
        </div>
        <div className="md:col-span-4">
          <div className="noisy" />
          <img src="/images/abt4.png" alt="Close-up of a crafted cocktail" />
        </div>
      </div>
    </div>
  );
};

export default About;
