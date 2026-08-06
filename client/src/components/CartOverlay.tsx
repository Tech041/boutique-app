import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCheckoutStore } from "../store/checkoutStore";
import { useNavbarStore } from "../store/uiStore";
import { useCartStore } from "../store/cartStore";

const CartOverlay = () => {
  const { cartOpen, closeCart } = useNavbarStore();
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore((state) => state.subtotal());
  const setItems = useCheckoutStore((state) => state.setItems);

  if (!cartOpen) return null;

  const handleCheckout = () => {
    setItems(items); // move cart items into checkout store
    clearCart(); // clear cart
    closeCart(); // close overlay
  };
  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay background */}
      <div className="absolute inset-0 bg-black/50" onClick={closeCart} />

      {/* Cart panel */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-100 bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Your Cart</h2>
          <button onClick={closeCart} className="text-black cursor-pointer">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-4 items-center border-b pb-4"
              >
                <div className="relative w-16 h-16 ">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <p className="text-xs text-gray-500">Size: {item.size}</p>
                  <p className="text-sm">
                    ₦{item.price.toLocaleString()} × {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <p className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </p>
          <Link to={"/checkout"}>
            <button
              onClick={handleCheckout}
              disabled={subtotal === 0}
              className="mt-4 w-full bg-black text-white py-2 cursor-pointer rounded-full hover:bg-white hover:border hover:border-black hover:text-black"
            >
              Checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="mt-4 w-full bg-white text-black hover:border hover:border-black py-2 cursor-pointer rounded-full"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;
