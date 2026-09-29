"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register every plugin once, in one place. Components import gsap from here
// so the plugins are guaranteed to be registered before they're used.
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Mobile browsers resize the viewport as the address bar shows/hides while
// scrolling; recalculating every trigger on that makes pinned sections jump.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText, useGSAP };
