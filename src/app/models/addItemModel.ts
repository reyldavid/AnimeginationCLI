import { CartType } from "./carttype";

export interface AddItem {
    orderType: CartType,
    productID: number,
    quantity: number,
    unitPrice: number
}
