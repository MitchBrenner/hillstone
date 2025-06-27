import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const page = () => {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  );
};

export default page;
