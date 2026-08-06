import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import { Toaster } from "sonner";
import Footer from "./components/Footer";
import CartOverlay from "./components/CartOverlay";

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));
const Checkout = React.lazy(() => import("./pages/Checkout"));

const NotFound = React.lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <Suspense fallback={<Loader />}>
        <Toaster richColors position="top-right" />
        <CartOverlay />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
