"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const heroSplit = new SplitText(".title", {
        type: "chars, words",
      });
      const paragraphSplit = new SplitText(".subtitle", {
        type: "lines",
      });

      heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

      gsap.from(heroSplit.chars, {
        yPercent: 100,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
      });

      gsap.from(paragraphSplit.lines, {
        opacity: 0,
        yPercent: 100,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
        delay: 1,
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top", // Start when the top of the hero section hits the top of the viewport
            end: "bottom top", // End when the bottom of the hero section hits the top of the viewport
            scrub: true,
          },
        })
        .to(".right-leaf", { y: 200 }, 0)
        .to(".left-leaf", { y: -200 }, 0);

      // matchMedia rebuilds the video scrub when the viewport crosses the
      // breakpoint, so start/end stay correct after a resize.
      const mm = gsap.matchMedia();

      mm.add(
        { isMobile: "(max-width: 767px)", isDesktop: "(min-width: 768px)" },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };
          const video = videoRef.current;
          if (!video) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: video,
              start: isMobile ? "top 50%" : "center 60%",
              end: isMobile ? "120% top" : "bottom top",
              scrub: true,
              pin: true,
            },
          });

          const handleLoaded = () => {
            tl.to(video, {
              currentTime: video.duration,
              ease: "none",
            });
          };

          if (video.readyState >= 1) {
            handleLoaded();
          } else {
            video.addEventListener("loadedmetadata", handleLoaded, {
              once: true,
            });
          }

          return () =>
            video.removeEventListener("loadedmetadata", handleLoaded);
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <>
      <section ref={sectionRef} id="hero" className="noisy">
        <h1 className="title">HILLSTONE</h1>
        <p className="accolade-desktop">★ Voted LA&apos;s #1 Cocktail Bar</p>
        <div className="left-leaf">
          <Image
            src="/images/hero-left-leaf.png"
            alt="Left Leaf"
            width={200}
            height={200}
          />
        </div>
        <div className="right-leaf">
          <Image
            src="/images/hero-right-leaf.png"
            alt="Right Leaf"
            width={200}
            height={200}
          />
        </div>

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit
                <br />
                of Summer
              </p>
            </div>
            <div className="view-cocktails">
              {/* Phones only: md+ already shows the yellow tagline block */}
              <div className="accolade">
                <span className="accolade-title">Sip the Spirit of Summer</span>
                <span className="accolade-rank">
                  ★ Voted LA&apos;s #1 Cocktail Bar
                </span>
              </div>
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes - designed to delight your
                senses.
              </p>
              <a href="#cocktails" className="view-cocktails-button">
                View Cocktails
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          playsInline
          muted
          preload="auto"
        />
      </div>
    </>
  );
}

export default Hero;
