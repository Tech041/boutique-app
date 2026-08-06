// components/Navbar.tsx
"use client";

import {
  FiUser,
  //   FiSearch,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Container from "./Container";
import { useNavbarStore } from "../store/uiStore";
import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { open, setOpen, openCart } = useNavbarStore();
  const items = useCartStore((state) => state.items); // ✅ get cart items
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="w-full fixed top-0 left-0 bg-inherit z-50">
      <Container>
        <div className=" mx-auto ">
          <div className="flex justify-between items-center h-10">
            {/* Left side links (desktop only) */}
            <nav className="">
              <ul className="hidden md:flex space-x-6 text-white">
                <li>
                  <Link
                    onClick={() => scrollTo(0, 0)}
                    to="/shop"
                    className="cursor-pointer"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="cursor-pointer">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="cursor-pointer">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Brand: centered on desktop, left on mobile */}
            <span
              className={`text-xl ${open ? "text-black" : "text-white"} font-bold md:absolute md:left-1/2 md:transform md:-translate-x-1/2`}
            >
              TFAPPAREL
            </span>

            {/* Right side icons */}
            <div className="flex items-center space-x-4 md:space-x-10 ml-auto">
              <FiUser
                size={25}
                color="white"
                className={`cursor-pointer ${open ? "hidden" : "block"} `}
              />
              <FiHeart
                size={25}
                color="white"
                className={`cursor-pointer ${open ? "hidden" : "block"} `}
              />
              <div onClick={openCart} className="relative cursor-pointer">
                <FiShoppingCart
                  size={25}
                  color={`${open ? "black" : "white"}`}
                />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                    {cartCount}
                  </span>
                )}
              </div>
              {/* Mobile menu button */}
              <div className="md:hidden">
                {open ? (
                  <FiX
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                ) : (
                  <FiMenu
                    size={30}
                    color="white"
                    className="cursor-pointer"
                    onClick={() => setOpen(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu with smooth slide */}
        <div
          className={`md:hidden fixed ${open ? "top-16" : "top-0"} left-0 w-full bg-white transform transition-transform duration-500 ease-in-out ${
            open ? "translate-y-0" : "-translate-y-full "
          }`}
        >
          <nav className="mt-10">
            <ul className="flex flex-col space-y-6 p-4 text-black text-2xl font-bold">
              <li>
                <Link
                  onClick={() => {
                    setOpen(!open);
                    scrollTo(0, 0);
                  }}
                  to="/shop"
                  className="cursor-pointer"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    setOpen(!open);
                    scrollTo(0, 0);
                  }}
                  to="/about"
                  className="cursor-pointer"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    setOpen(!open);
                    scrollTo(0, 0);
                  }}
                  to="/contact"
                  className="cursor-pointer"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
