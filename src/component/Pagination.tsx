import React from "react";
import useProductStore from "../store/useProductStore";
interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const Pagination = React.memo((props: PaginationProps) => {
    const setCurrentPage = useProductStore((state) => state.setCurrentPage)
    const handleClickPagination = (page:number) =>{
        setCurrentPage(page)
    }
    const { currentPage, totalPages } = props;
    let items = [];
    for (let number = currentPage - 3; number <= currentPage + 3; number++) {
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
            <li className={'px-3 py-1.5 border mx-0.5 border-gray-400'+ (currentPage==1?' pointer-events-none opacity-50 cursor-default ':' cursor-pointer' ) }
                onClick={() => currentPage== 1 ? null : handleClickPagination(currentPage-1)}
            >Previous</li>
            {items}
            <li className={'px-3 py-1.5 border mx-0.5 border-gray-400 '+ (currentPage==totalPages?' pointer-events-none opacity-50 cursor-default ':' cursor-pointer' ) }
                onClick={() => currentPage== totalPages ? null : handleClickPagination(currentPage+1)}
            >Next</li>
        </ul>
    )
})
export default Pagination;