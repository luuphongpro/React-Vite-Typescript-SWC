import { create } from 'zustand';
import { fetchAddCart } from '../service/Cart';
import type { Product } from '../types/product';

interface CartState {
    listCart: Product[];
    purchaseList: any[];
    setListCart: (list: Product[]) => void;
    setPurchaseList: (list: any[]) => void;
    handlerOrder: (userId: number) => Promise<void>;
}

const useCartStore = create<CartState>((set, get) => ({
    listCart: JSON.parse(localStorage.getItem('list_cart') || '[]'),
    purchaseList: JSON.parse(localStorage.getItem('purchase') || '[]'),

    setListCart: (list) => {
        localStorage.setItem('list_cart', JSON.stringify(list));
        set({ listCart: list });
    },

    setPurchaseList: (list) => {
        localStorage.setItem('purchase', JSON.stringify(list));
        set({ purchaseList: list });
    },

    handlerOrder: async (userId) => {
        const { listCart, purchaseList, setListCart, setPurchaseList } = get();
        const data = listCart
            .filter((item) => item.isBuy)
            .map((item) => ({
                id: item.id,
                quantity: item.quantity,
            }));

        try {
            const res = await fetchAddCart(userId, data);
            const updatedList = listCart.filter((item) => !item.isBuy);

            alert('Order placed successfully!');
            const newPurchaseList = [...purchaseList, res];

            setListCart(updatedList);
            setPurchaseList(newPurchaseList);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    },
}));

export default useCartStore;
