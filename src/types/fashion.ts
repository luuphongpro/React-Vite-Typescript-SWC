export interface FashionItem {
    id: number;
    title: string;
    image: string;
    price: number;
    discount: number;
    discountPercentage: number;
    isNew: boolean;
    brand?: string;
}
