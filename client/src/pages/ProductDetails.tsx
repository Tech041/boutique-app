import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useProduct, useProducts } from "../hooks/products";
import type { Product } from "../services/products";
import { useCartStore } from "../store/cartStore";
import Loader from "../components/Loader";
import OtherNavbar from "../components/OtherNavbar";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null); // ✅ track size
  const { slug } = useParams() as { slug: string };
  const { data: product, isLoading, isError } = useProduct(slug);

  const {
    data: productsResponse,
    isLoading: relatedProductLoading,
    isError: relatedProductError,
  } = useProducts(1, 20);

  const relatedProducts: Product[] = product
    ? (productsResponse?.products ?? [])
        .filter(
          (item: Product) =>
            item.slug !== product.slug &&
            item.collectionType === product.collectionType,
        )
        .slice(0, 4)
    : [];

  const fallbackProducts: Product[] = (productsResponse?.products ?? [])
    .filter((item: Product) => item.slug !== product?.slug)
    .slice(0, 4);

  const displayRelatedProducts: Product[] =
    relatedProducts.length > 0 ? relatedProducts : fallbackProducts;

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "inc") setQuantity(quantity + 1);
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
  };

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    if (!product) return; // ✅ ensures product is defined
    if (!selectedSize) {
      toast.warning("Please select a size before adding to cart");
      return;
    }

    addToCart({
      id: product._id,
      name: product.name,
      size: selectedSize,
      quantity,
      image: product.image,
      price: product.price,
    });
    toast.success(`${product.name} added to cart`);
  };

  if (isLoading) return <Loader />;
  if (isError || !product) return <p>Error loading product</p>;

  return (
    <main className="min-h-screen mb-130 lg:mb-80 relative z-30 bg-white ">
      <OtherNavbar />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          {/* Left column: product info */}
          <div>
            <p className="text-xs text-gray-400 mb-2">HOME / JERSEYS</p>
            <span className="text-xs uppercase tracking-wide text-red-500 font-semibold">
              {product.collectionType}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold mt-2">
              {product.name}
            </h1>
            <p className="text-xl font-semibold mt-2">
              ₦{product.price.toLocaleString()}
            </p>

            {/* description */}
            <p className="mt-4 text-gray-600">{product.description}</p>

            {/* Sizes */}
            <div className="mt-6 ">
              <h3 className="text-sm font-semibold mb-2">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)} // ✅ select size
                    className={`border px-4 py-2 text-sm cursor-pointer rounded-2xl transition
                      ${selectedSize === size ? "bg-black text-white" : "hover:bg-black hover:text-white"}
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2">Select Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantity("dec")}
                  className="border px-3 py-1"
                >
                  –
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuantity("inc")}
                  className="border px-3 py-1"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Max qty reached</p>
            </div>

            {/* Buy button */}
            <button
              onClick={handleAddToCart} // ✅ add to cart
              className="mt-6 w-full bg-black text-white py-3 font-semibold cursor-pointer hover:bg-gray-900 transition"
            >
              Add To Cart
            </button>

            {/* Stock notice */}
            <p className="mt-4 text-sm text-red-500">
              • Hurry! Only 4 left in stock
            </p>
          </div>

          {/* Right column: product image */}
          <div className="relative w-full h-150">
            <img
              src={product.image}
              alt={product.name}
              className=" absolute inset-0 w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Related products */}
        <div className="">
          <div className="flex justify-between items-center mt-10 ">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Related Products
            </h2>
            <Link
              to="/shop"
              onClick={() => scrollTo(0, 0)}
              className="text-sm md:text-base text-black hover:scale-110"
            >
              All Products →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-2">
            {relatedProductLoading ? (
              <p className="text-sm text-gray-500 col-span-full">
                Loading related products...
              </p>
            ) : relatedProductError ? (
              <p className="text-sm text-red-500 col-span-full">
                Could not load related products.
              </p>
            ) : displayRelatedProducts.length > 0 ? (
              displayRelatedProducts.map((item: Product) => (
                <ProductCard product={item} key={item._id} />
              ))
            ) : (
              <p className="text-sm text-gray-500 col-span-full">
                No related products found.
              </p>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ProductDetails;
