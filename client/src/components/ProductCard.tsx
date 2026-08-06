/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }: { product: any }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      to={`/product/${product.slug}`}
      className="relative group"
    >
      {/* Product image */}
      <div className="relative w-full aspect-3/4 overflow-hidden rounded-lg cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* NEW badge */}
        {product.collection === "New Arrivals" && (
          <span className="absolute top-3 left-3 bg-white text-black font-light rounded-full text-xs px-2 py-1 cursor-pointer">
            NEW
          </span>
        )}
        {/* Heart toggle */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 rounded-full p-2 bg-white cursor-pointer transition"
        >
          {liked ? (
            <FaHeart className="text-red-500" size={20} />
          ) : (
            <FiHeart className="text-gray-400" size={20} />
          )}
        </button>
      </div>

      {/* Product info */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm">₦ {product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
