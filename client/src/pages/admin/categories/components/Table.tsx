import { handleCategoryItemDelete } from "../../../../store/adminCategorySlice";
import { useAppDispatch } from "../../../../store/hooks";
import { useState } from "react";
import Modal from "./Modal";
import type { ICategory } from "../Categories";

interface CategoryTableProps {
  categories: ICategory[];
}

function CategoryTable({ categories }: CategoryTableProps) {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="rounded bg-white p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Categories</h1>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Add Category
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b last:border-0">
                <td className="px-4 py-3">{category.categoryName}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => dispatch(handleCategoryItemDelete(category.id))}
                    className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={2}>
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {modalOpen && <Modal closeModal={() => setModalOpen(false)} />}
    </div>
  );
}

export default CategoryTable;
