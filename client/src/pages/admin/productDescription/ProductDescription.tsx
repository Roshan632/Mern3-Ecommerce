import { useEffect } from "react";
import AdminLayout from "../AdminLayout";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProductAdmin } from "../../../store/adminProductSlice";
import { useParams } from "react-router-dom";
import { Status } from "../../../globals/types/type";
import { getMediaUrl } from "../../../http";

function ProductDescription(){
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const {product, status} = useAppSelector((store)=>store.adminProducts)

    useEffect(()=>{
        if (id) {
            dispatch(fetchProductAdmin(id))
        }
    }, [dispatch, id])

    return (
        <AdminLayout>
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-gray-900">Product Description</h1>

                {status === Status.LOADING && <p className="mt-4 text-gray-500">Loading product details...</p>}

                {status === Status.ERROR && <p className="mt-4 text-red-500">Unable to load the product details.</p>}

                {product && (
                    <div className="mt-6 grid gap-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 md:grid-cols-[260px_1fr]">
                        <div className="flex items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                            <img
                                src={getMediaUrl(product.productImageUrl)}
                                alt={product.productName}
                                onError={(e) => {
                                    e.currentTarget.src = "https://placehold.co/600x400?text=No+Image";
                                }}
                                className="max-h-72 w-full rounded-lg object-contain"
                            />
                        </div>
                        <div className="space-y-4">
                            <div className="rounded-xl bg-white p-4 shadow-sm">
                                <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Name</p>
                                <p className="mt-1 text-lg font-semibold text-gray-900">{product.productName}</p>
                            </div>
                            <div className="rounded-xl bg-white p-4 shadow-sm">
                                <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Price</p>
                                <p className="mt-1 text-lg font-semibold text-gray-900">${product.productPrice}</p>
                            </div>
                            <div className="rounded-xl bg-white p-4 shadow-sm">
                                <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Stock</p>
                                <p className="mt-1 text-lg font-semibold text-gray-900">{product.productTotalStock}</p>
                            </div>
                            <div className="rounded-xl bg-white p-4 shadow-sm">
                                <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Category</p>
                                <p className="mt-1 text-lg font-semibold text-gray-900">{product.Category?.categoryName || "Uncategorized"}</p>
                            </div>
                            <div className="rounded-xl bg-white p-4 shadow-sm">
                                <p className="text-sm font-medium uppercase tracking-wide text-gray-500">Description</p>
                                <p className="mt-1 text-base leading-7 text-gray-700">{product.productDescription}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}

export default ProductDescription