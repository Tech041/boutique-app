import Container from "../components/Container";
import OtherNavbar from "../components/OtherNavbar";

const AboutPage = () => {
  return (
    <main className="min-h-screen mb-130 lg:mb-80 relative z-30 bg-white ">
      <OtherNavbar />
      <Container>
        {/* Hero section: image + text */}
        <div className="flex flex-col md:flex-row items-center md:items-start mt-20 gap-8">
          {/* Image */}
          <div className="relative w-full md:w-1/2 h-96 md:h-150">
            <img
              src="/images/about_img.webp" // replace with your actual image
              alt="OFFSIDE brand visual"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold">
              TFAPPAREL is where street culture tackles the beautiful game.
            </h2>

            <div className="space-y-4 text-gray-700">
              <h3 className="text-xl font-semibold">OUR STORY</h3>
              <p>
                Born in the concrete jungle, our debut collection keeps it raw –
                twelve pieces that blur the lines between matchday and everyday.
                Each design pays homage to the after‑hours kickabouts under
                flickering streetlights and the electric atmosphere of the
                terraces.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">STOCKISTS</h3>
              <p>West End — Los Angeles</p>
              <p>Lost and Found — Toronto</p>
              <p>Pat’s — Tokyo</p>
              <p>Trey Gardens — Vancouver</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">CONTACT</h3>
              <p>Email hello@tfapparel.com</p>
              <p>Follow @tfapparel</p>
              <p>Call someone who cares</p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default AboutPage;
