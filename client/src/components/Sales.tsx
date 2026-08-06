/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Link } from "react-router-dom";
import { useProducts } from "../hooks/products";
import Container from "./Container";

import Loader from "./Loader";

const Sales = () => {
  const { data, isLoading, isError } = useProducts(1, 3);

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading sale products</p>;

  // Ensure we have products
  const products = data?.products || [];

  return (
    <section className="relative w-full py-16 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side large hero image */}
          <div className="relative w-full h-75 md:h-150">
            <img
              src="/images/sale1.webp" // replace with your lifestyle image
              alt="Sale Hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Right side sale products */}
          <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-10">
              Top Brands
            </h2>
            <div className="flex flex-col space-y-6">
              {products.map((product:any, idx:number) => (
                <Link
                  to={`/product/${product.slug}`}
                  key={product._id || idx}
                  className="flex items-center"
                >
                  {/* Product image */}
                  <div className="relative w-40 h-40">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Product text */}
                  <div className="flex-1 p-3 md:p-4">
                    <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs md:text-base">
                      <span className="text-black font-bold">
                        ₦{product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Sales;
