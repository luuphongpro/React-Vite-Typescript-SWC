export interface Product {
    id: number;
    title: string;
    description?: string;
    thumbnail: string;
    images?: [];
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category?: string;
}
export interface Itemcart extends Product {
    total?: number;
    quantity: number;
    isBuy: boolean;
}
export interface Cart {
    id: number;
    products: Product[];
    total: number;
    discounterTotal: number;
    userId: number,
    totalProducts: number;
    totalQuantity: number;
    isBuy: boolean;
    quantity?: number;
}