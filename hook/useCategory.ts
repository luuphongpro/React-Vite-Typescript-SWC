import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../src/config/axiosInstance';
import { useMemo } from 'react';

export const fetchCategory = async () => {
  const res = await axiosInstance.get('products/categories');
  return res.data;
};

const useCategory = (searchText: string | null) => {
  const queryResult = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategory,
  });

  const filteredData = useMemo(() => {
    if (!queryResult.data) return [];
    if (!searchText) return queryResult.data;
    return queryResult.data.filter((item: any) =>
      item.name?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [queryResult.data, searchText]);

  return {
    ...queryResult,
    data: filteredData,
  };
};

export default useCategory;
