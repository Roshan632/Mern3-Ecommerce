import { Link } from "react-router-dom";
import type { IProduct } from "../types";
import { getMediaUrl } from "../../../http";

interface CardProps {
  product: IProduct;
}

function Card({ product }: CardProps) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group block w-72 rounded-lg bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="h-80 w-full overflow-hidden rounded-t-lg bg-gray-100">
        <img
          src={getMediaUrl(product.productImageUrl)}
          alt={product.productName}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="px-4 py-3">
        <p className="text-sm text-gray-500">{product.Category?.categoryName}</p>
        <h3 className="mt-1 line-clamp-2 text-base font-semibold text-gray-900">
          {product.productName}
        </h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-teal-600">Rs. {product.productPrice}</span>
          <span className="text-xs text-gray-500">{product.productTotalStock} left</span>
        </div>
      </div>
    </Link>
  );
}

export default Card;
