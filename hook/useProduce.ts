import { useEffect } from "react";
import useFashionStore from "../src/store/useFashionStore";
import asioxInstance from "../src/config/axiosInstance";
import { useQuery } from '@tanstack/react-query'

const fetchFashionData = async () => {
    const res = await asioxInstance.get('/fashion/item');
    return res.data;
};

const useProduce = () => {
    const numberOfPerPage = 8;
    const setData = useFashionStore((state) => state.setData);
    const setTotalPages = useFashionStore((state) => state.setTotalPages);
    
    const queryResult = useQuery({
        queryKey: ['fashion'],
        queryFn: fetchFashionData,
    });

    useEffect(() => {
        if (queryResult.data) {
            setData(queryResult.data);
            setTotalPages(Math.ceil(queryResult.data.length / numberOfPerPage));
        }
    }, [queryResult.data, setData, setTotalPages, numberOfPerPage]);

    return queryResult;
};

export default useProduce;