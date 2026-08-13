import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import { Toaster } from "sonner";
import Footer from "./components/Footer";
import CartOverlay from "./components/CartOverlay";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { trackVisitor } from "./services/tracker";

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const SignIn = React.lazy(() => import("./pages/SignIn"));

const NotFound = React.lazy(() => import("./pages/NotFound"));

// For tracking visitors

function getVisitorId(): string {
  let visitorId = localStorage.getItem("visitorId");
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("visitorId", visitorId);
  }
  return visitorId;
}

const App = () => {
  // For tracking visitor
  useEffect(() => {
    const visitorId = getVisitorId();
    trackVisitor(visitorId).catch((err) =>
      console.error("Error setting visitorId", err),
    );
  }, []);

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
          <Route path="/sign-in" element={<SignIn />} />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
