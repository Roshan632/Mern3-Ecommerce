import type { Status } from "../../globals/types/type";

export interface ICartProduct {
  id: string;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  productTotalStock?: number;
}

export interface ICartItem {
  id: string;
  quantity: number;
  Product: ICartProduct;
}

export interface ICartUpdateItem {
  productId: string;
  quantity: number;
}

export interface ICartInitialState {
  items: ICartItem[];
  status: Status;
}
