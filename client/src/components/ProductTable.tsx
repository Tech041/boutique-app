/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiArrowLeft, FiArrowRight, FiEdit, FiTrash } from "react-icons/fi";

import { useState } from "react";
import EditProductModal from "./EditProductModal";
import { useAdminProducts, useDeleteProduct } from "../hooks/useManageProducts";
import Container from "./Container";

export default function ProductTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAdminProducts(page, 10);
  const { mutate: deleteProduct } = useDeleteProduct();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="w-full overflow-x-scroll">
      <h1 className="text-center text-black font-bold text-xl lg:text-2xl">
        Product Management Table
      </h1>
      <Container>
        <div className="mx-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Collection</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.products.map((product: any) => (
                <tr key={product._id} className="border-b">
                  <td className="p-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded-2xl"
                    />
                  </td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">₦{product.price}</td>
                  <td className="p-3">{product.collectionType}</td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="flex items-center gap-1 px-3 py-2 rounded-2xl"
                    >
                      <FiEdit color="blue" className="cursor-pointer" />
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="flex items-center gap-1 text-red px-3 py-2 rounded-2xl"
                    >
                      <FiTrash color="red" className="cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="bg-black text-white px-4 py-2 cursor-pointer rounded-2xl disabled:opacity-50"
            >
              <FiArrowLeft />
            </button>
            <button
              disabled={page === data?.pages}
              onClick={() => setPage((p) => p + 1)}
              className="bg-black text-white px-4 py-2 cursor-pointer rounded-2xl disabled:opacity-50"
            >
              <FiArrowRight />
            </button>
          </div>

          {/* Edit Modal */}
          {editingProduct && (
            <EditProductModal
              product={editingProduct}
              onClose={() => setEditingProduct(null)}
            />
          )}
        </div>
      </Container>
    </section>
  );
}
