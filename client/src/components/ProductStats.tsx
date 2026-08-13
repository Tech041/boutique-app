/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Dashboard.tsx
import React from "react";
import { useProducts } from "../hooks/products";

const ProductStat: React.FC = () => {
  const { data, isLoading } = useProducts(1, 10);
  const totalProducts = data?.total;

  if (isLoading) return <p className="text-gray-500">Loading stats...</p>;

  return (
    <section className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 my-5">
      {/* Stats cards */}
      <h1 className="text-center my-2 font-bold text-lg md:text-xl lg:text-2xl text-black">
        Product Metric
      </h1>
      <div className=" mb-6">
        <div className="bg-pink-800 p-4 rounded-lg text-center">
          <p className="text-sm text-white">Total Porducts</p>
          <p className="text-2xl font-bold text-white">{totalProducts}</p>
        </div>
      </div>
    </section>
  );
};

export default ProductStat;
