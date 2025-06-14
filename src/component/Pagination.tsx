import React from "react";
import useProductStore from "../store/useProductStore";
import { useNavigate, useSearchParams } from "react-router-dom";

const Pagination = React.memo(() => {
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const navigate = useNavigate();

    const currentPage = page;

    const handleClickPagination = (page: number) => {
        searchParams.set("page", page.toString());
        navigate(`/product?${searchParams.toString()}`);
    };

    const totalPages = useProductStore((state) => state.totalPages);

    let items = [];
    for (let number = currentPage - 3; number <= currentPage + 3; number++) {
        if (number < 1 || number > totalPages) continue;
        items.push(
            <li
                key={number}
                onClick={() => handleClickPagination(number)}
                className={
                    "px-3 py-1.5 border mx-0.5 border-gray-400" +
                    (number === currentPage ? " active" : "")
                }
            >
                {number}
            </li>
        );
    }

    return (
        <ul className="flex justify-center my-5 radius-li cursor-pointer">
            <li
                className={
                    "px-3 py-1.5 border mx-0.5 border-gray-400" +
                    (currentPage === 1
                        ? " pointer-events-none opacity-50 cursor-default"
                        : " cursor-pointer")
                }
                onClick={() => currentPage !== 1 && handleClickPagination(currentPage - 1)}
            >
                Previous
            </li>
            {items}
            <li
                className={
                    "px-3 py-1.5 border mx-0.5 border-gray-400" +
                    (currentPage === totalPages
                        ? " pointer-events-none opacity-50 cursor-default"
                        : " cursor-pointer")
                }
                onClick={() => currentPage !== totalPages && handleClickPagination(currentPage + 1)}
            >
                Next
            </li>
        </ul>
    );
});

export default Pagination;
