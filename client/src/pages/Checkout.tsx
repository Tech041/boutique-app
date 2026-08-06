/* eslint-disable @typescript-eslint/no-explicit-any */


import { toast } from "sonner";
import { useCheckoutStore } from "../store/checkoutStore";
import OtherNavbar from "../components/OtherNavbar";
import Container from "../components/Container";


const CheckoutPage = () => {
  const { form, setForm, items, clearCheckout } = useCheckoutStore();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePaystack = () => {
    toast.warning("Paystack unavailable, Pay via Whatsapp");
  };

  const handleWhatsApp = () => {
    const whatsaappNumber = import.meta.env.VITE_WHATSAPP;
    const message = `TFAPPAREL Order Details:\nName: ${form.name}\nContact: ${form.contact}\nAddress: ${form.address}, ${form.state}\nItems:\n${items
      .map(
        (i) =>
          `${i.quantity} × ${i.name} (${i.size}) - ₦${i.price * i.quantity}`,
      )
      .join("\n")}\nSubtotal: ₦${subtotal}`;
    const url = `https://wa.me/${whatsaappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    clearCheckout(); // ✅ clear checkout store after sending
  };

  return (
    <main className="min-h-screen mb-130 lg:mb-80 relative z-30 bg-gray-50">
      <OtherNavbar />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mx-auto mt-20">
          {/* Left: Checkout form */}
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>
            <form className="space-y-6">
              {["name", "contact", "address", "state"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field === "contact"
                      ? "Email or Phone"
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={(form as any)[field]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                  />
                </div>
              ))}

              <div className="space-y-3 mt-8">
                <button
                  type="button"
                  onClick={handlePaystack}
                  className="w-full bg-green-600 text-white py-3 rounded-full cursor-pointer font-semibold hover:bg-green-700 transition"
                >
                  Pay with Paystack
                </button>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full bg-blue-600 text-white py-3 cursor-pointer rounded-full font-semibold hover:bg-blue-700 transition"
                >
                  Pay via WhatsApp
                </button>
              </div>
            </form>
          </section>

          {/* Right: Order summary */}
          <section className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <ul className="space-y-6">
              {items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between text-sm pb-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16">
                      <img
                        src={item.image}
                        alt={item.name}
                        
                        className="absolute inset-0 w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} × Size {item.size}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-800">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t mt-6 pt-4 flex justify-between font-semibold text-lg">
              <span>Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default CheckoutPage;
