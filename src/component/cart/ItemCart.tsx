// import type { Itemcart } from "../../types/product"
// import Checkbox from '@mui/material/Checkbox';

// interface ItemCartProps {
//     item: Itemcart;
//     index: number;
//     listCart: Itemcart[];
//     setListCart: (list: any[]) => void;
//     setIsSelectAll: (value: boolean) => void;
//     setActiveButton: (value: boolean) => void;
// }
// const ItemCart = (props: ItemCartProps) => {
//     const { item, index, listCart, setListCart, setIsSelectAll, setActiveButton } = props;

//     const increaseQuantity = (index: number) => {
//         const updatedList = [...listCart];
//         updatedList[index].quantity += 1;
//         localStorage.setItem('list_cart', JSON.stringify(updatedList))
//         setListCart(updatedList);
//     }
//     const decreaseQuantity = (index: number) => {
//         const updatedList = [...listCart];
//         if (updatedList[index].quantity > 1) {
//             updatedList[index].quantity = listCart[index].quantity - 1;
//             localStorage.setItem('list_cart', JSON.stringify(updatedList))
//             setListCart(updatedList);
//         }
//     }

//     return (
//         <div
//             className="flex flex-row items-center justify-between gap-2 border-y-1 border-gray-500 mt-2 bg-gray-300 lg:px-5 dark:bg-gray-600"
//             key={item.id}
//         >
//             <div className="flex items-center lg:gap-5 justify-start">
//                 <Checkbox 
//                     checked={item.isBuy}
//                     onChange={(e) => {
//                         const updatedList = [...listCart];
//                         updatedList[index].isBuy = e.target.checked;
//                         setListCart(updatedList);
//                         setIsSelectAll(updatedList.every(item => item.isBuy));
//                         const hasAtLeastOneSelected = updatedList.some(item => item.isBuy);
//                         setActiveButton(hasAtLeastOneSelected);
//                     }}
//                 />
//                 <div className="">
//                     <img src={item.thumbnail} className="w-40 min-w-10" />
//                 </div>
//                 <div className="flex flex-col justify-between">
//                     <div>{item.title}</div>
//                     <div>${(item.price - (item.price * item.discountPercentage / 100)).toFixed(2)}</div>
//                 </div>
//             </div>
//             <div className="flex items-center justify-between cursor-default select-none">
//                 <div className="lg:mx-10 flex border border-gray-500 rounded-md items-center">
//                     <div onClick={() => decreaseQuantity(index)}>
//                         <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-minus text-gray-400"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0"
//                         /></svg>
//                     </div>
//                     <span className="text-gray-900 p-1">{item.quantity}</span>
//                     <div onClick={() => increaseQuantity(index)}>
//                         <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus text-gray-400"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0"

//                         /></svg>
//                     </div>

//                 </div>
//                 <div className="lg:mx-10 text-red-600 font-bold lg:w-15">${((item.price - (item.price * item.discountPercentage / 100)) * item.quantity).toFixed(2)}</div>
//             </div>
//         </div>
//     )
// }
// export default ItemCart;