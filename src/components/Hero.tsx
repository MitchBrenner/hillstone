"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText, ScrollTrigger } from "gsap/all";
import Image from "next/image";
import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger, SplitText);

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
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
          trigger: "#hero",
          start: "top top", // Start when the top of the hero section hits the top of the viewport
          end: "bottom top", // End when the bottom of the hero section hits the top of the viewport
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    if (videoRef.current) {
      const video = videoRef.current;

      const handleLoaded = () => {
        const duration = video.duration;
        tl.to(video, {
          currentTime: duration,
          ease: "none",
        });
      };

      if (video.readyState >= 1) {
        handleLoaded();
      } else {
        video.onloadedmetadata = handleLoaded;
      }
    }
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">HILLSTONE</h1>
        <div className="left-leaf">
          <Image
            src="/images/hero-left-leaf.png"
            alt="Left Leaf"
            // className="left-leaf"
            width={200}
            height={200}
          />
        </div>
        <div className="right-leaf">
          <Image
            src="/images/hero-right-leaf.png"
            alt="Right Leaf"
            // className="right-leaf"
            width={200}
            height={200}
          />
        </div>

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spririt
                <br />
                of Summer
              </p>
            </div>
            <div className="view-cocktails">
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
