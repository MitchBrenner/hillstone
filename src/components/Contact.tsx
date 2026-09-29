"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { openingHours, socials, storeInfo } from "../../constants";

const Contact = () => {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const titleSplit = SplitText.create("h2", { type: "words" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          // The footer is short, so on tall screens its top never reaches
          // the center; start as soon as it's well into view instead.
          start: "top 80%",
        },
        defaults: { ease: "power1.inOut" },
      });

      timeline
        .from(titleSplit.words, {
          opacity: 0,
          yPercent: 100,
          stagger: 0.02,
        })
        .from("h3, p", {
          opacity: 0,
          yPercent: 100,
          stagger: 0.02,
        })
        // Both leaves settle into place so they end flush with the footer
        // edges (moving them outward exposed their flat, cropped edges).
        .from("#f-right-leaf", {
          y: -50,
          duration: 1,
          ease: "power1.inOut",
        })
        .from(
          "#f-left-leaf",
          {
            y: 50,
            duration: 1,
            ease: "power1.inOut",
          },
          "<",
        );
    },
    { scope: footerRef },
  );

  return (
    <footer ref={footerRef} id="contact">
      <img src="/images/footer-right-leaf.png" alt="" id="f-right-leaf" />
      <img src="/images/footer-left-leaf.png" alt="" id="f-left-leaf" />

      <div className="content">
        <h2>{storeInfo.heading}</h2>

        <div className="info-grid">
          <div>
            <h3>Visit Our Bar</h3>
            <p>{storeInfo.address}</p>
          </div>

          <div>
            <h3>Contact Us</h3>
            <p>
              <a href={`tel:${storeInfo.contact.phone.replace(/[^\d+]/g, "")}`}>
                {storeInfo.contact.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${storeInfo.contact.email}`}>
                {storeInfo.contact.email}
              </a>
            </p>
          </div>

          <div>
            <h3>Open Every Day</h3>
            {openingHours.map((time) => (
              <p key={time.day}>
                {time.day} : {time.time}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h3>Socials</h3>

          <div className="flex-center gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                // Placeholder "#" links shouldn't open a blank new tab
                {...(social.url !== "#" && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                aria-label={social.name}
              >
                <img src={social.icon} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
