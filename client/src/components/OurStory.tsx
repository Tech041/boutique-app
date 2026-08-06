// components/OurStory.tsx
"use client";
import Container from "./Container";
import { motion } from "framer-motion";

const OurStory = () => {
  return (
    <section className="relative w-full h-screen md:h-120 bg-[url('/images/story.webp')] bg-cover bg-center">
      <div className="inset-0 bg-black/50 absolute "></div>

      <Container>
        {/* Text block with normal motion */}
        <div className="relative h-full flex items-center">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white mt-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">TAPPAREL</h2>
            <p className="text-lg md:text-xl leading-relaxed mb-6 max-w-xl">
              TAPPAREL is where street culture tackles the beautiful game. Born
              in the concrete jungle, our debut collection keeps it raw — twelve
              pieces that blur the lines between matchday and everyday.
            </p>
            <a
              href="/about"
              className="inline-block px-6 py-3 cursor-pointer border border-white text-white rounded-full font-semibold hover:scale-110 transition-transform duration-300"
            >
              Our story →
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default OurStory;
