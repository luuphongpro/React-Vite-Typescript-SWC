import useAuthStore from "../../store/useAuthStore";
import useCartStore from "../../store/useCartStore";
import type { Itemcart } from "../../types/product";
import { useTranslation } from "react-i18next";
import { Button, Rate } from "antd";
import ChangeQuantity from "./ChangeQuantity";
// ...

const Cart = () => {
    const { t } = useTranslation()
    const { id } = useAuthStore()
    const { listCart, setListCart, handlerOrder } = useCartStore();
    const totalPrice = listCart.reduce((total: number, item: Itemcart) => {
        const itemPrice = item.price - (item.price * item.discountPercentage / 100);
        return total + (itemPrice * item.quantity);
    }, 0).toFixed(2);
    return (
        <>
            {listCart.length === 0 ? (
                <p>{t('cart.cartEmty')}</p>
            ) : (
                <div className="flex flex-col lg:w-8/12 mx-auto">
                    <div>
                        {listCart.map((item: Itemcart, index) => (
                            <div className="flex flex-row   border border-primary rounded-md text-primary my-3">
                                <div className="bg-pastel text-pastel rounded-l-md">
                                    <img src={item.thumbnail} alt={item.title} className="" />
                                </div>
                                <div className="flex flex-col w-full lg:p-5 justify-between">
                                    <div className="flex flex-row justify-between">
                                        <div>
                                            <div className="font-bold">Business suit</div>
                                            <div>Brand: {item.brand}</div>
                                            <Rate allowHalf defaultValue={item.rating} />
                                        </div>
                                        <div className="flex flex-row gap-10">
                                            <div>
                                                <ChangeQuantity
                                                    key={item.id}
                                                    quantity={item.quantity}
                                                    onChange={(newQuantity) => {
                                                        const newCart = [...listCart];
                                                        newCart[index].quantity = newQuantity;
                                                        setListCart(newCart);
                                                    }}
                                                />
                                                <div className="text-blue-600 font-semibold cursor-pointer"
                                                    onClick={() => {

                                                        const newList = listCart.filter((item_) => item_.id !== item.id);
                                                        setListCart(newList);
                                                    }}

                                                >Delete</div>
                                            </div>
                                            <div>${((item.price - (item.price * item.discountPercentage / 100)) * item.quantity).toFixed(2)}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div>${(item.price - (item.price * item.discountPercentage / 100)).toFixed(2)}</div>
                                        <div className="flex flex-row text-xs text-green-400"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l5 5l10 -10" /></svg>
                                            <span className="text-primary">In Stock</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col w-80 bg-pastel text-pastel ml-auto p-3 rounded-md">
                        <div className="grid grid-cols-2">
                            <div className="justify-self-start mb-1">Subtotal</div>
                            <div className="justify-self-end">${totalPrice}</div>
                            <div className="justify-self-start mb-2">Shipping</div>
                            <div className="justify-self-end">$4.99</div>
                        </div>
                        <hr />
                        <div className="flex flex-row justify-between my-2 font-bold">
                            <div className="">Total</div>
                            <div>${totalPrice}</div>
                        </div>
                        <div className="ml-auto text-sm">include VAT</div>
                    </div>
                    <div className="ml-auto my-5 text-pastel">
                        <Button type="primary"
                            onClick={() => {
                                handlerOrder(id)
                            }}
                        >Check out</Button>
                    </div>
                </div>
            )}
        </>
        // <div className="min-h-screen lg:bg-gray-200 flex items-start justify-center dark:bg-gray-800">
        //     <div className=" flex lg:flex-row flex-col items-center justify-between gap-5 lg:p-5  lg:w-10/12 w-full dark:bg-gray-700 dark:shadow-gray-600">
        //         {listCart.length === 0 ? (
        //             <p>{t('cart.cartEmty')}</p>
        //         ) : (
        //             <>
        //                 <div className="w-full">
        //                     <h1 className="text-xl font-bold py-2">CART</h1>
        //                     <HeaderCart
        //                         listCart={listCart}
        //                         setListCart={setListCart}
        //                         isSelectAll={isSelectAll}
        //                         setIsSelectAll={setIsSelectAll}
        //                         setActiveButton={setActiveButton}
        //                     />

        //                     {listCart.map((item: Itemcart, index) => (
        //                         <ItemCart
        //                             key={item.id}
        //                             item={item}
        //                             index={index}
        //                             listCart={listCart}
        //                             setListCart={setListCart}
        //                             setIsSelectAll={setIsSelectAll}
        //                             setActiveButton={setActiveButton}
        //                         />
        //                     ))}
        //                 </div>
        //                 <div className="mt-10 p-10 lg:w-100 bg-white dark:bg-gray-600 rounded-lg shadow-md flex flex-col items-center justify-center">
        //                     <div>{t('cart.orderTotal')}: {totalPrice}</div>
        //                     <div className="flex justify-center py-5">
        //                         <button
        //                             className={"py-1.5 px-3 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-400 w-20" + (activeButton ? "" : " disabled opacity-50")}
        //                             onClick={(e) => {
        //                                 e.preventDefault();
        //                                 handlerOrder(id)

        //                             }}
        //                         >
        //                         {t('cart.buy')}
        //                         </button>
        //                     </div>
        //                 </div>
        //             </>
        //         )}
        //     </div>
        // </div>
    );
};
export default Cart;
