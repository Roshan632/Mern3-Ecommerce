import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { addProduct } from "../../../../store/adminProductSlice";
import { Status } from "../../../../globals/types/type";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

export interface IProduct {
  productName: string;
  productPrice: number;
  productTotalStock: number;
  productDescription: string;
  categoryId: string;
  discount?: number;
  productImage?: File | null;
}

interface ProductModalProps {
  open?: boolean;
  onClose?: () => void;
  categories: { id: string; categoryName: string }[];
}

function ProductModal({ open = false, onClose, categories }: ProductModalProps) {
  const dispatch = useAppDispatch();
  const status = useAppSelector((store) => store.adminProducts.status);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<IProduct>({
    productName: "",
    productPrice: 0,
    productTotalStock: 0,
    productDescription: "",
    categoryId: "",
    discount: 0,
    productImage: null,
  });

  useEffect(() => {
    if (status === Status.SUCCESS && open && submitting) {
      onClose?.();
      setSubmitting(false);
      setForm({
        productName: "",
        productPrice: 0,
        productTotalStock: 0,
        productDescription: "",
        categoryId: "",
        discount: 0,
        productImage: null,
      });
    } else if (status === Status.ERROR && submitting) {
      setSubmitting(false);
    }
  }, [status, open, onClose, submitting]);

  if (!open) return null;

  const updateField = (field: keyof IProduct, value: string | number) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    dispatch(addProduct(form));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, productImage: event.target.files?.[0] ?? null }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form onSubmit={handleSubmit} className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add Product</h2>
          <button type="button" onClick={onClose} className="text-xl text-gray-500" aria-label="Close">&times;</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">Name<input required value={form.productName} onChange={(event) => updateField("productName", event.target.value)} className="mt-1 w-full rounded border p-2" /></label>
          <label>Price<input required min="0.01" step="0.01" type="number" value={form.productPrice} onChange={(event) => updateField("productPrice", Number(event.target.value))} className="mt-1 w-full rounded border p-2" /></label>
          <label>Stock<input required min="0" step="1" type="number" value={form.productTotalStock} onChange={(event) => updateField("productTotalStock", Number(event.target.value))} className="mt-1 w-full rounded border p-2" /></label>
          <label>Category<select required value={form.categoryId} onChange={(event) => updateField("categoryId", event.target.value)} className="mt-1 w-full rounded border p-2"><option value="">Select category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.categoryName}</option>)}</select></label>
          <label>Discount<input min="0" max="100" step="0.01" type="number" value={form.discount} onChange={(event) => updateField("discount", Number(event.target.value))} className="mt-1 w-full rounded border p-2" /></label>
          <label className="sm:col-span-2">Image<input required type="file" accept="image/*" onChange={handleImageChange} className="mt-1 w-full rounded border p-2" /></label>
          <label className="sm:col-span-2">Description<textarea required value={form.productDescription} onChange={(event) => updateField("productDescription", event.target.value)} className="mt-1 w-full rounded border p-2" rows={4} /></label>
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded border px-4 py-2">Cancel</button>
          <button type="submit" disabled={submitting} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">{submitting ? "Adding..." : "Add Product"}</button>
        </div>
      </form>
    </div>
  );
}

export default ProductModal;
