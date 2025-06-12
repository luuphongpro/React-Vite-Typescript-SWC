import { useState } from "react";

const HeaderCart = (props) => {
    const { listCart, setListCart,isSelectAll,setIsSelectAll,setActiveButton } = props;
    
    const handlerSelectAll = () => {
        const updatedList = listCart.map(item => ({
            ...item,
            isBuy: !isSelectAll
        }));
        setIsSelectAll(!isSelectAll);
        setListCart(updatedList);
        localStorage.setItem('list_cart', JSON.stringify(updatedList));
        setActiveButton(!isSelectAll)
    }
    
    return (
        <div className="flex flex-row h-10 items-center justify-between gap-50 border border-gray-500 rounded-lg my-5 bg-white">
            <div className="flex items-center justify-start ">
                <input type="checkbox" className="cursor-pointer size-4 mx-8"
                    checked={isSelectAll}
                    onClick={() => handlerSelectAll()}
                />
                <span className="mx-5">Select all</span>
            </div>
            <div className="flex items-center justify-around gap-10">
                <span className="mx-5">Quantity</span>
                <span >Total amount</span>
                <span></span>
            </div>
        </div>
    )
}

export default HeaderCart;