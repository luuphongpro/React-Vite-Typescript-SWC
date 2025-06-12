import { useEffect } from "react";
import useProductStore from "../src/store/useProductStore";
import asioxInstance from "../src/config/axiosInstance";
import { useQuery } from '@tanstack/react-query'
import {numberOfPerPage} from '../src/config/setting';
const fetchProductData = async () => {
    const res = await asioxInstance.get('products');
    return res.data.products;
};

const useProduce = () => {
    const setData = useProductStore((state) => state.setData);
    const setTotalPages = useProductStore((state) => state.setTotalPages);
    const queryResult = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductData,
    });

    useEffect(() => {
        if (queryResult.data) {
            setData(queryResult.data);
            setTotalPages(Math.ceil(queryResult.data.length / numberOfPerPage));

        }
    }, [queryResult.data, setData, setTotalPages]);

    return queryResult;
};

export default useProduce;