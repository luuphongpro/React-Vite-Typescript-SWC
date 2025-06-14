import { useEffect, useMemo } from "react";
import useProductStore from "../src/store/useProductStore";
import axiosInstance from "../src/config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { numberOfPerPage } from "../src/config/setting";

const fetchProductData = async (
  category: string | null,
  keyword: string | null,
  page: number
) => {
  let endpoint = `products`;
  const urlPagination = `?limit=${numberOfPerPage}&skip=${(page - 1) * numberOfPerPage}`
  if (keyword) {
    endpoint += `/search?q=${encodeURIComponent(keyword)}`;
    endpoint += `&limit=${numberOfPerPage}&skip=${(page - 1) * numberOfPerPage}`
  } else if (category) {
    endpoint += `/category/${category}`;
    endpoint += urlPagination
  }
  else {
    endpoint+=urlPagination
  }
  const res = await axiosInstance.get(endpoint);
  return res.data;
};

const useProduce = (
  category: string | null,
  keyword: string | null,
  page: number
) => {
  const setTotalPages = useProductStore((state) => state.setTotalPages);
  const queryResult = useQuery({
    queryKey: ["products", category, keyword, page],
    queryFn: () => fetchProductData(category, keyword, page),
  });
  useEffect(() => {
    const total = queryResult.data?.total;
    if (typeof total === "number") {
      const pageCount = Math.ceil(total / numberOfPerPage);
      setTotalPages(pageCount);
    }
  }, [queryResult.data]);
  return queryResult;
};

export default useProduce;
