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
    isNew?: boolean;
    brand: string;
    category?: string;
    quantity?: number;
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