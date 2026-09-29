"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

// Phones scrub a pre-extracted image sequence on a <canvas> instead of the
// video: seeking video on mobile Safari is slow and stutters, while drawing a
// ready-made frame is instant. Frames are the center 720x540 of the video.
const FRAME_COUNT = 150;
const frameSrc = (i: number) =>
  `/sequence/martini/${String(i).padStart(3, "0")}.webp`;

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

      // matchMedia rebuilds the scroll animations when the viewport crosses
      // the breakpoint, so each size gets its own setup.
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const video = videoRef.current;
        if (!video) return;

        // Leaf parallax (leaves are hidden on phones)
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          })
          .to(".right-leaf", { y: 200 }, 0)
          .to(".left-leaf", { y: -200 }, 0);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: video,
            start: "center 60%",
            end: "bottom top",
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

        // iOS Safari (iPads land here) won't decode any frames until a video
        // has played, so scrubbing currentTime shows nothing. Briefly play
        // (muted) and pause to make it load; this also starts the download,
        // since the video is preload="none" so phones never fetch it. Low
        // Power Mode blocks this until a user gesture, so retry on touch.
        let primed = false;
        const prime = () => {
          if (primed) return;
          video.muted = true;
          const startTime = video.currentTime;
          video
            .play()
            .then(() => {
              video.pause();
              // Undo the brief playback so the scroll position stays in control
              video.currentTime = startTime;
              primed = true;
              window.removeEventListener("touchstart", prime);
            })
            .catch(() => {
              // Blocked (e.g. Low Power Mode): the touchstart listener retries.
            });
        };

        if (video.readyState >= 1) {
          handleLoaded();
        } else {
          video.addEventListener("loadedmetadata", handleLoaded, {
            once: true,
          });
        }
        prime();
        window.addEventListener("touchstart", prime, { passive: true });

        return () => {
          video.removeEventListener("loadedmetadata", handleLoaded);
          window.removeEventListener("touchstart", prime);
        };
      });

      mm.add("(max-width: 767px)", () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const images = Array.from({ length: FRAME_COUNT }, (_, i) => {
          const img = new window.Image();
          img.src = frameSrc(i);
          return img;
        });
        const state = { frame: 0 };

        // Draw like object-fit: cover + object-position: bottom
        const render = () => {
          // Fall back to the nearest earlier frame that has finished loading
          let i = Math.round(state.frame);
          while (i > 0 && !(images[i].complete && images[i].naturalWidth)) i--;
          const img = images[i];
          if (!img.complete || !img.naturalWidth) return;

          const { width: cw, height: ch } = canvas;
          const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
          const dw = img.naturalWidth * scale;
          const dh = img.naturalHeight * scale;
          ctx.clearRect(0, 0, cw, ch);
          ctx.drawImage(img, (cw - dw) / 2, ch - dh, dw, dh);
        };

        // Match the canvas buffer to its displayed size (capped at 2x DPR)
        const resize = () => {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = Math.round(canvas.clientWidth * dpr);
          canvas.height = Math.round(canvas.clientHeight * dpr);
          render();
        };

        images[0].addEventListener("load", render, { once: true });
        resize();
        window.addEventListener("resize", resize);

        // The next section; the glass stays put until it arrives, then fades
        // out as it scrolls in, instead of being dragged up and cut off.
        const about = document.getElementById("about");

        // Keep the glass pinned until About is halfway up the screen
        ScrollTrigger.create({
          trigger: canvas,
          start: "top 50%",
          endTrigger: about,
          end: "top 50%",
          pin: true,
          anticipatePin: 1,
        });

        // Play the frames until About starts to come into view
        gsap.to(state, {
          frame: FRAME_COUNT - 1,
          ease: "none",
          onUpdate: render,
          scrollTrigger: {
            trigger: canvas,
            start: "top 50%",
            endTrigger: about,
            end: "top bottom",
            // A little smoothing hides touch-scroll jitter
            scrub: 0.4,
          },
        });

        // Then fade the glass out as About scrolls up over it
        gsap.fromTo(
          canvas,
          { opacity: 1 },
          {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: about,
              start: "top bottom",
              end: "top 55%",
              scrub: true,
            },
          },
        );

        return () => window.removeEventListener("resize", resize);
      });
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
        {/* Tablet/desktop */}
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          playsInline
          muted
          preload="none"
          disablePictureInPicture
          disableRemotePlayback
        />
        {/* Phones: image-sequence version of the same animation */}
        <canvas ref={canvasRef} className="hero-sequence" aria-hidden="true" />
      </div>
    </>
  );
}

export default Hero;
