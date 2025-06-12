import axiosInstance from '../src/config/axiosInstance';
import { useQuery } from '@tanstack/react-query';
const fetchGetProduct = async (id: number) => {
    const data = await axiosInstance.get(`products/${id}`);
    return data.data;
}
const useProductDetail = (id: number) => {

    const queryResult = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const result = await fetchGetProduct(id);
            return result;
        },
    });

    return queryResult;
};


export default useProductDetail;