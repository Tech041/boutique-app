import Container from "../components/Container";
import OtherNavbar from "../components/OtherNavbar";

const ContactPage = () => {
  return (
    <main className="min-h-screen mb-130 lg:mb-80 relative z-30 bg-white ">
      <OtherNavbar />
      <Container>
        <div className="flex flex-col md:flex-row items-center md:items-start mt-20 gap-12">
          {/* Left side: image */}
          <div className="relative w-full md:w-1/2 h-96 md:h-150">
            <img
              src="/images/contact_us.webp" // replace with your contact image
              alt="Contact visual"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Right side: contact info + form */}
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
            <p className="text-gray-600">
              Have questions, feedback, or just want to say hello? Reach out to
              us — we’d love to hear from you.
            </p>

            {/* Contact details */}
            <div className="space-y-2 text-gray-700">
              <p>Email: hello@tfapparel.com</p>
              <p>Follow: @tfapparel</p>
              <p>Phone: +234 800 000 0000</p>
            </div>

            {/* Contact form */}
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-900 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ContactPage;
