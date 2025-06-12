
const ItemCart = (props) => {
    const { item, index, listCart, setListCart, setIsSelectAll,setActiveButton } = props;

    const increaseQuantity = (index: number) => {
        const updatedList = [...listCart];
        updatedList[index].quantity += 1;
        localStorage.setItem('list_cart', JSON.stringify(updatedList))
        setListCart(updatedList);
    }
    const decreaseQuantity = (index: number) => {
        const updatedList = [...listCart];
        if (updatedList[index].quantity > 1) {
            updatedList[index].quantity = listCart[index].quantity - 1;
            localStorage.setItem('list_cart', JSON.stringify(updatedList))
            setListCart(updatedList);
        }
    }
    return (
        <div
            className="flex flex-row items-center justify-between gap-2 border border-gray-500 rounded-2xl mt-2 bg-white"
            key={item.id}
        >
            <div className="flex items-center gap-5 justify-start">
                <input type="checkbox" className="cursor-pointer size-4 mx-8" checked={item.isBuy}
                    onChange={() => {
                        const updatedList = [...listCart];
                        updatedList[index].isBuy = !updatedList[index].isBuy;
                        localStorage.setItem('list_cart', JSON.stringify(updatedList))
                        setIsSelectAll(updatedList.every(item => item.isBuy));
                        setListCart(updatedList);
                        if (updatedList[index].isBuy) {
                            setActiveButton(true);
                        }
                        else {
                            setActiveButton(false);
                        }
                    }}
                />
                <div>
                    <img src={item.thumbnail} className="h-20" />
                </div>
                <div className="flex flex-col justify-between">
                    <div>{item.title}</div>
                    <div>${(item.price - (item.price * item.discountPercentage / 100)).toFixed(2)}</div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="mx-10 flex border border-gray-500 rounded-md items-center">
                    <div onClick={() => decreaseQuantity(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-minus text-gray-400"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0"
                        /></svg>
                    </div>
                    <span className="text-gray-900 p-1">{item.quantity}</span>
                    <div onClick={() => increaseQuantity(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus text-gray-400"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0"

                        /></svg>
                    </div>

                </div>
                <div className="mx-10 text-red-600 font-bold w-15">${((item.price - (item.price * item.discountPercentage / 100))*item.quantity).toFixed(2)}</div>

            </div>
        </div>
    )
}
export default ItemCart;