import {create} from 'zustand';
import type { FashionItem } from '../types/fashion';
interface FashionStore {
    currentPage: number;
    totalPages: number;
    data: FashionItem[];
    setCurrentPage: (page: number) => void;
    setTotalPages: (total: number) => void;
    setData: (data: FashionItem[]) => void;
    numberOfPerPage: number;
}

const useFashionStore = create<FashionStore>((set) => ({
    currentPage: 1,
    totalPages: 0,
    data: [],
    numberOfPerPage: 8,
    setCurrentPage: (page:number) => set({ currentPage: page }),
    setTotalPages: (total:number) => set({ totalPages: total }),
    setData: (data:FashionItem[]) => set({ data})
}));
export default useFashionStore;