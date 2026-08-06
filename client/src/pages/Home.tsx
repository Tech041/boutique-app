import Hero from "../components/Hero";
import Marquee from "../components/Marque";
import BestSellers from "../components/Bestsellers";
import NewArrivals from "../components/NewArrivals";
import OurStory from "../components/OurStory";
import Sales from "../components/Sales";

const Home = () => {
  return (
    <main className="mb-130 lg:mb-80">
      <Hero />
      <div className="relative z-30">
        <Marquee />
        <BestSellers />
        <NewArrivals />
        <OurStory />
        <Sales />
      </div>
    </main>
  );
};

export default Home;
