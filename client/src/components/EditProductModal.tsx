import { useState } from "react";
import { useEditProduct } from "../hooks/useManageProducts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditProductModal({ product, onClose }: any) {
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    sizes: product.sizes,
    collectionType: product.collectionType,
  });

  const { mutate, isPending, isSuccess } = useEditProduct();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    mutate({ id: product._id, data: form });
    if (!isPending && isSuccess) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        {/* Image (read-only) */}
        <img
          src={product.image}
          alt={product.name}
          className="h-32 w-32 object-cover rounded-2xl mb-4"
        />

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-2xl mb-3"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-2xl mb-3 min-h-30"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-2xl mb-3"
        />

        <select
          name="collectionType"
          value={form.collectionType}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-2xl mb-3"
        >
          <option value="New Arrivals">New Arrivals</option>
          <option value="Best Sellers">Best Sellers</option>
        </select>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-2xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded-2xl hover:bg-gray-800 cursor-pointer"
          >
            {isPending ? "Updating" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
