/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Container from "./Container";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import { useCollectionProducts } from "../hooks/products";


const NewArrivals = () => {
  // Fetch products from backend using our hook
  const {
    data: products,
    isLoading,
    isError,
  } = useCollectionProducts("New Arrivals");

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading new arrivals</p>;

  return (
    <section className="py-12 bg-white">
      <Container>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
          <a href="/shop" className="text-sm md:text-base text-gray-400">
            Shop New Arrivals →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          {products?.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default NewArrivals;
