import { Link } from "react-router-dom";
import {
  handleDeleteProduct,
  type IProductAdmin,
} from "../../../../store/adminProductSlice";
import { useAppDispatch } from "../../../../store/hooks";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { getMediaUrl } from "../../../../http";

interface Category {
  id: string;
  categoryName: string;
}

interface ProductTableProps {
  products: IProductAdmin[];
  categories: Category[];
}

function ProductTable({ products, categories }: ProductTableProps) {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="rounded bg-white p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Products</h1>
        <button type="button" onClick={() => setModalOpen(true)} className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
          Add Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 font-semibold">Product</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Stock</th>
              <th className="px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={getMediaUrl(product.productImageUrl)}
                      alt={product.productName}
                      className="h-12 w-12 rounded object-cover"
                    />
                    <span className="font-medium">{product.productName}</span>
                  </div>
                </td>
                <td className="px-4 py-3">{product.Category?.categoryName}</td>
                <td className="px-4 py-3">Rs. {product.productPrice}</td>
                <td className="px-4 py-3">{product.productTotalStock}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/products/${product.id}`}
                      className="rounded bg-gray-900 px-3 py-2 text-white hover:bg-gray-800"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      onClick={() => dispatch(handleDeleteProduct(product.id))}
                      className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={5}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ProductModal open={modalOpen} categories={categories} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default ProductTable;
