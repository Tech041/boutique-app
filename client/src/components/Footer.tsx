// components/Footer.tsx
"use client";

import { Link } from "react-router-dom";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-130 lg:h-80 bg-black text-white py-12 z-10">
      <Container>
        {/* Top section: brand + promo + email form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">TFAPPAREL</h2>
            <p className="text-sm md:text-base mb-6 leading-relaxed">
              Join our club and get{" "}
              <span className="font-semibold">10% off</span> your first purchase
            </p>
            <form className="flex border border-gray-200 rounded-md overflow-hidden max-w-md">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 text-gray-300 text-sm md:text-base focus:outline-none"
              />
              <button
                type="submit"
                className="bg-red-500 cursor-pointer px-6 py-2 font-semibold text-sm md:text-base hover:bg-red-600 transition"
              >
                JOIN
              </button>
            </form>
          </div>

          {/* Right side: SHOP + CONNECT */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs text-gray-500 font-semibold mb-4">
                Quick Links
              </h3>
              <ul className="space-y-4 lg:space-y-2 text-sm ">
                <li>
                  <Link
                    onClick={() => scrollTo(0, 0)}
                    to="/"
                    className="hover:underline"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => scrollTo(0, 0)}
                    to="/about"
                    className="hover:underline"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => scrollTo(0, 0)}
                    to="/contact"
                    className="hover:underline"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => scrollTo(0, 0)}
                    to="/shop"
                    className="hover:underline"
                  >
                    Shop
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs text-gray-500 font-semibold mb-4">
                CONNECT
              </h3>
              <ul className="space-y-4 lg:space-y-2 text-sm ">
                <li>
                  <Link
                    onClick={() => scrollTo(0, 0)}
                    to="https://instagram.com"
                    target="_blank"
                    className="hover:underline"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => scrollTo(0, 0)}
                    to="https://twitter.com"
                    target="_blank"
                    className="hover:underline"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => scrollTo(0, 0)}
                    to="https://youtube.com"
                    target="_blank"
                    className="hover:underline"
                  >
                    YouTube
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => scrollTo(0, 0)}
                    to="https://tiktok.com"
                    target="_blank"
                    className="hover:underline"
                  >
                    TikTok
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="w-full text-center font-semibold text-xs text-red-700">
          TFAPPREL {new Date().getFullYear()} All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
