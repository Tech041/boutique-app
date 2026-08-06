
import React, { useState } from "react";
// React Query hook
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useProducts } from "../hooks/products";
import OtherNavbar from "../components/OtherNavbar";
import Container from "../components/Container";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Products = () => {
  const [sort, setSort] = useState("relevance");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading, isError } = useProducts(page, limit);
  console.log("Data", data);

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
  const collectionOptions = ["Best Sellers", "New Arrivals"];

  // Use fetched products
  let filteredProducts = data?.products || [];

  // Apply filters
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filteredProducts = filteredProducts.filter((p: any) => {
    if (selectedSize && !p.sizes.includes(selectedSize)) return false;
    if (
      selectedCollections.length > 0 &&
      !selectedCollections.includes(p.collectionType)
    )
      return false;
    return true;
  });

  // Apply sorting
  if (sort === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }
  return (
    <main className="min-h-screen mb-130 lg:mb-80 relative z-30 bg-white">
      <OtherNavbar />
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between mt-20 mb-5">
          <h1 className="text-2xl font-bold">Jerseys</h1>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-3 py-2 text-sm rounded-md"
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Mobile filters */}
        <div className="block md:hidden mb-6">
          <h3 className="text-sm font-semibold mb-2">Collection</h3>
          <ul className="space-y-2 text-sm mb-4">
            {collectionOptions.map((col) => (
              <li key={col}>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCollections.includes(col)}
                    onChange={() =>
                      setSelectedCollections((prev) =>
                        prev.includes(col)
                          ? prev.filter((c) => c !== col)
                          : [...prev, col],
                      )
                    }
                  />{" "}
                  {col}
                </label>
              </li>
            ))}
          </ul>

          <h3 className="text-sm font-semibold mb-2">Size</h3>
          <div className="grid grid-cols-3 gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() =>
                  setSelectedSize(selectedSize === size ? null : size)
                }
                className={`border px-3 py-2 text-sm rounded transition 
                  ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop sidebar filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="hidden md:block col-span-1">
            <h3 className="text-sm font-semibold mb-2">Collection</h3>
            <ul className="space-y-2 text-sm mb-6">
              {collectionOptions.map((col) => (
                <li key={col}>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={selectedCollections.includes(col)}
                      onChange={() =>
                        setSelectedCollections((prev) =>
                          prev.includes(col)
                            ? prev.filter((c) => c !== col)
                            : [...prev, col],
                        )
                      }
                    />{" "}
                    {col}
                  </label>
                </li>
              ))}
            </ul>

            {/* Size filter */}
            <h3 className="text-sm font-semibold mb-2">Size</h3>
            <div className="grid grid-cols-3 gap-2">
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSize(selectedSize === size ? null : size)
                  }
                  className={`border px-3 py-2 text-sm rounded transition  cursor-pointer
                    ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "hover:bg-black hover:text-white"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </aside>

          {/* Product grid */}
          <section className="col-span-3">
            {isLoading && <Loader />}
            {isError && <p>Error fetching products</p>}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product, idx) => (
                <Link
                  key={idx}
                  to={`/product/${product.slug}`}
                  className="group block"
                >
                  <div className="relative w-full h-72 md:h-96 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition"
                    />

                    <button className="absolute top-2 right-2 text-gray-600 hover:text-red-500">
                      ♥
                    </button>
                  </div>
                  <h2 className="mt-3 text-sm font-medium">{product.name}</h2>
                  <p className="text-sm text-gray-700">₦ {product.price}</p>
                </Link>
              ))}
            </div>

            {/* Pagination controls */}
            {data && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className={`p-2 rounded ${
                    page === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <FaArrowLeft />
                </button>

                <span className="text-sm">
                  Page {data.page} of {data.pages}
                </span>

                <button
                  disabled={page === data.pages}
                  onClick={() => setPage((p) => p + 1)}
                  className={`p-2 rounded ${
                    page === data.pages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <FaArrowRight />
                </button>
              </div>
            )}
          </section>
        </div>
      </Container>
    </main>
  );
};

export default Products;
