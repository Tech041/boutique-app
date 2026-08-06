/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/dashboard/upload/page.tsx

import { useState } from "react";
import { toast } from "sonner";

import imageCompression from "browser-image-compression";
import apiRequest from "../utils/apiRequest";
import Container from "../components/Container";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    sizes: [] as string[],
    collectionType: "New Arrivals", // renamed to match schema
  });
  const [progress, setProgress] = useState<number>(0);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please select an image");
      return;
    }

    try {
      // compress image before upload
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1200,
      };
      const compressedFile = await imageCompression(file, options);

      const formData = new FormData();
      formData.append("file", compressedFile);
      Object.entries(form).forEach(([key, value]) => {
        formData.append(
          key,
          Array.isArray(value) ? JSON.stringify(value) : value,
        );
      });

      const res = await apiRequest.post("/products/upload", formData, {
        onUploadProgress: (event: any) => {
          if (event.total) {
            const percent = Math.round((event.loaded * 100) / event.total);
            setProgress(percent);
          }
        },
      });

      toast.success("Product uploaded successfully!");
      setForm({
        name: "",
        description: "",
        price: "",
        sizes: [] as string[],
        collectionType: "New Arrivals",
      });
      console.log(res.data);
      setProgress(0);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Upload failed");
      setProgress(0);
    }
  };

  return (
    <main className="min-h-screen mb-130 lg:mb-80 relative z-30 bg-white">
      <Container>
        <h1 className="text-2xl font-bold mb-6">Upload Product</h1>
        <form className="space-y-4 max-w-3xl mx-auto">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          {/* File upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full border px-3 py-2 rounded"
          />

          {/* Collection dropdown */}
          <select
            name="collectionType"
            value={form.collectionType}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="New Arrivals">New Arrivals</option>
            <option value="Best Sellers">Best Sellers</option>
          </select>

          {/* Sizes checkboxes */}
          <div className="flex flex-wrap gap-2">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <label key={size} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={form.sizes.includes(size)}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      sizes: e.target.checked
                        ? [...form.sizes, size]
                        : form.sizes.filter((s) => s !== size),
                    })
                  }
                />
                {size}
              </label>
            ))}
          </div>

          {/* Progress bar */}
          {progress > 0 && (
            <div className="w-full bg-gray-200 rounded h-2">
              <div
                className="bg-green-400 h-2 rounded"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Upload Product
          </button>
        </form>
      </Container>
    </main>
  );
}
