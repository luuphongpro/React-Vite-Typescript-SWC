import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    handleClickPagination: (page: number) => void;
}

const Pagination = React.memo((props: PaginationProps) => {
    const { currentPage, totalPages, handleClickPagination } = props;
    let items = [];
    for (let number = currentPage - 2; number <= currentPage + 2; number++) {
        if (number < 1 || number > totalPages) continue;
        items.push(
            <li
                key={number}
                onClick={() => handleClickPagination(number)}
                className={'px-3 py-1.5 border mx-0.5 border-gray-400' + (number === currentPage ? ' active ' : '')}
            >
                {number}
            </li>
        );
    }
    return (
        <ul className='flex justify-center my-5 radius-li cursor-pointer'>
            {items}
        </ul>
    )
})
export default Pagination;