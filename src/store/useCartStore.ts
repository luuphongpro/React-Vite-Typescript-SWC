import { create } from 'zustand';
import type { Itemcart } from '../types/product';

interface CartState {
    listCart: Itemcart[];
    purchaseList: any[];
    setListCart: (list: Itemcart[]) => void;
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

    handlerOrder: async () => {
        const { listCart, purchaseList, setListCart, setPurchaseList } = get();
        const purchaseItems = listCart.filter((item) => item.isBuy);
        const updatedList = listCart.filter((item) => !item.isBuy);
        
        const newPurchaseList = [...purchaseList, purchaseItems];
        setListCart(updatedList);
        setPurchaseList(newPurchaseList);
    },
}));

export default useCartStore;
