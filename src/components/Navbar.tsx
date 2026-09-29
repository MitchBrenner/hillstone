"use client";
import React, { useRef } from "react";
import { navLinks } from "../../constants";
import { gsap, useGSAP } from "@/lib/gsap";

function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: navRef.current,
        start: "bottom top", // when the bottom of the nav hits the top of the viewport
      },
    });

    navTween.fromTo(
      navRef.current,
      {
        backgroundColor: "transparent",
      },
      {
        backgroundColor: "#00000050",
        backdropFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
      },
    );
  }, []);

  return (
    <nav ref={navRef}>
      <div>
        <a href="#hero" className="flex items-center gap-2">
          {/* <Image
            src="/images/logo.png"
            alt="Hillstone Logo"
            width={40}
            height={40}
          /> */}
          <p>Hillstone</p>
        </a>
        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
