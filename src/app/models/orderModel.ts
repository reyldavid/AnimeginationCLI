export interface Order {
    orderID: string,
    userId: string,
    shippingHandling: number,
    taxes: number,
    discounts: number,
    totals: number,
    orderDate: string,
    isPurchased: boolean,
    trackingNumber: string,
    orderType: string,
    itemQuantity: number,
    productQuantity: number,
    subTotal: number
}
