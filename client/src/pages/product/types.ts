import type { Status } from "../../globals/types/type";

export interface IProduct {
  id: string;
  productName: string;
  productPrice: number;
  productTotalStock: number;
  productDescription: string;
  productImageUrl: string;
  createAt?: string;
  categoryId?: string;
  discount?: number;
  Category: {
    categoryName: string;
  };
}

export interface IProducts {
  products: IProduct[];
  status: Status;
  product: IProduct | null;
}
