import { ProductI } from "./product-interface";

export interface ProductCartI extends ProductI {
    amount: number;
}
