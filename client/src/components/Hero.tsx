// components/Hero.tsx
"use client";


import Navbar from "./Navbar";
import Container from "./Container";
import { motion } from "framer-motion";
import { useNavbarStore } from "../store/uiStore";
import { Link } from "react-router-dom";


const Hero = () => {
  const { open } = useNavbarStore();

  return (
    <section
      className={`relative w-full z-40  ${open ? "bg-white" : "bg-[url('/images/hero_image.webp')] bg-cover bg-center"}`}
    >
      {/* overlay */}
      <div className="inset-0 bg-black/50 absolute "></div>

      <Navbar />

      <Container>
        <div className="relative w-full h-150">
          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col items-center justify-end md:items-start md:justify-end pb-20 md:pb-32">
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-sm md:max-w-2xl  text-center md:text-left"
            >
              <h1 className="text-3xl md:text-6xl font-light text-white ">
                Something Stylish Is Threading
              </h1>
              <p className="mt-4 text-base md:text-lg text-white ">
                Our new latest street wears with limited edition hoodies and
                joggers now available.
              </p>
              <Link to={"/shop"}>
                <button className="mt-6 px-6 py-3 border border-white text-white font-semibold rounded-full hover:scale-125 transition-transform duration-300 cursor-pointer">
                  Shop now →
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
