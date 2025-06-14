import type { Itemcart } from "../../types/product"
import Checkbox from '@mui/material/Checkbox';

interface ItemCartProps {
    item: Itemcart;
    index: number;
    listCart: Itemcart[];
    setListCart: (list: any[]) => void;
    setIsSelectAll: (value: boolean) => void;
    setActiveButton: (value: boolean) => void;
}
const ItemCart = (props: ItemCartProps) => {
    const { item, index, listCart, setListCart, setIsSelectAll, setActiveButton } = props;

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
            className="flex flex-row items-center justify-between gap-2 border-y-1 border-gray-500 mt-2 bg-gray-300 px-5 dark:bg-gray-600"
            key={item.id}
        >
            <div className="flex items-center gap-5 justify-start">
                <Checkbox 
                    checked={item.isBuy}
                    onChange={(e) => {
                        const updatedList = [...listCart];
                        updatedList[index].isBuy = e.target.checked;
                        setListCart(updatedList);
                        setIsSelectAll(updatedList.every(item => item.isBuy));
                        const hasAtLeastOneSelected = updatedList.some(item => item.isBuy);
                        setActiveButton(hasAtLeastOneSelected);
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
            <div className="flex items-center justify-between cursor-default select-none">
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
                <div className="mx-10 text-red-600 font-bold w-15">${((item.price - (item.price * item.discountPercentage / 100)) * item.quantity).toFixed(2)}</div>
                <div><svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-trash text-red-600 hover:text-red-500"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg></div>
            </div>
        </div>
    )
}
export default ItemCart;