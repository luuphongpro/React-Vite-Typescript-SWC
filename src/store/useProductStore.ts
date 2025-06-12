import { create } from 'zustand';
import type { Product } from '../types/product';
interface ProductStore {
    currentPage: number;
    totalPages: number;
    data: Product[];
    setCurrentPage: (page: number) => void;
    setTotalPages: (total: number) => void;
    setData: (data: Product[]) => void;
    numberOfPerPage: number;
}
const useProductStore = create<ProductStore>((set) => ({
    currentPage: 1,
    totalPages: 0,
    data: [],
    numberOfPerPage: 8,
    setCurrentPage: (page: number) => set({ currentPage: page }),
    setTotalPages: (total: number) => set({ totalPages: total }),
    setData: (data: Product[]) => set({ data })
}))
export default useProductStore;