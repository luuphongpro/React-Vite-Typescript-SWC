import useAuthStore from "../../store/useAuthStore";
import useCartStore from "../../store/useCartStore";
import type { Itemcart } from "../../types/product";
import { useTranslation } from "react-i18next";
import { Button, Empty, Popconfirm, Rate } from "antd";
import ChangeQuantity from "./ChangeQuantity";
import { DeleteOutlined } from "@ant-design/icons";
// ...
import {formatCurrency } from '../../service/CurrencyFormatter'
import { useNavigate } from "react-router-dom";
import Notify from '../modal/Notify';
import { useState } from "react";
const Cart = () => {
    const { t } = useTranslation()
    const navigator = useNavigate()
    const { id } = useAuthStore()
    const [showSuccess, setShowSuccess] = useState(false)
    const { listCart, setListCart, handlerOrder } = useCartStore();
    const totalPrice = listCart.reduce((total: number, item: Itemcart) => {
        const itemPrice = item.price - (item.price * item.discountPercentage / 100);
        return total + (itemPrice * item.quantity);
    }, 0);

    return (
        <>
            {listCart.length === 0 ? (
                <div className="flex justify-center text-primary items-center h-screen flex-col">
                    <div className="">{t('cart.cartEmty')}
                    </div>
                    <Empty />

                </div>

            ) : (
                <div className="w-full pb-40">
                    <div className="flex justify-center flex-col lg:w-8/12 mx-auto ">
                        {listCart.map((item: Itemcart, index) => (
                            <div className="flex flex-row shadow shadow-primary rounded-md text-primary my-3">
                                <div className="bg-pastel lg:max-w-100 rounded-l-md flex justify-center max-w-30">
                                    <img src={item.thumbnail} alt={item.title} className="w-full" />
                                </div>
                                <div className="flex flex-col w-full lg:p-5 justify-between dark:bg-[#333333]">
                                    <div className="flex md:flex-row flex-col justify-between p-2">
                                        <div>
                                            <div className="font-bold cursor-pointer"
                                                onClick={() =>navigator('/'+item.id)}
                                            >{item.title}</div>
                                            <div>Brand: {item.brand}</div>
                                        </div>
                                        <div className="flex flex-row lg:gap-10 gap-2 justify-between my-2">
                                            <div className="">
                                                <ChangeQuantity
                                                    key={item.id}
                                                    quantity={item.quantity}
                                                    onChange={(newQuantity) => {
                                                        const newCart = [...listCart];
                                                        newCart[index].quantity = newQuantity;
                                                        setListCart(newCart);
                                                    }}
                                                />
                                                <div className="flex justify-center"
                                                >
                                                    <Popconfirm
                                                        title={t('cart.deleteProduct')}
                                                        description={t('cart.confirmDelete')}
                                                        okText={t('cart.yes')}
                                                        cancelText={t('cart.no')}
                                                        onConfirm={() => {
                                                            const newList = listCart.filter((item_) => item_.id !== item.id);
                                                            setListCart(newList);
                                                        }}
                                                    >
                                                        <Button
                                                            danger
                                                            type="text"
                                                            icon={<DeleteOutlined />}
                                                            style={{ padding: '4px' }}
                                                            size="middle"
                                                        />
                                                    </Popconfirm>
                                                    {/* <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-trash mx-auto"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg> */}
                                                </div>
                                            </div>
                                            <div className="min-w-20">{formatCurrency(((item.price - (item.price * item.discountPercentage / 100)) * item.quantity))}</div>
                                        </div>
                                    </div>
                                    <div className="ml-2">
                                        <Rate allowHalf disabled defaultValue={item.rating}

                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 p-2">
                                        <div>{formatCurrency((item.price - (item.price * item.discountPercentage / 100)))}</div>
                                        <div className="flex flex-row text-xs text-green-400"><svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l5 5l10 -10" /></svg>
                                            <span className="text-primary">In Stock</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row w-full md:w-60 lg:w-80 items-center bg-[#E7F5DC] fixed justify-around bottom-0 left-1/2 transform -translate-x-1/2 rounded-md p-3 gap-3 text-black">
                        <div className="flex flex-col mt-2  ">
                            <div className="grid grid-cols-2">
                                <div className="justify-self-start mb-1">{t('cart.subTotal')}</div>
                                <div className="justify-self-end">{formatCurrency(totalPrice)}</div>
                                <div className="justify-self-start mb-2">{t('cart.shipping')}</div>
                                <div className="justify-self-end">$4.99</div>
                            </div>
                            <hr />
                            <div className="flex flex-row justify-between my-2 font-bold">
                                <div className="">{t('cart.total')}</div>
                                <div>{formatCurrency((totalPrice+4.99))}</div>
                            </div>
                            <div className="ml-auto text-sm">{t('cart.includeVAT')}</div>
                        </div>
                        <div className="my-5 text-pastel">
                            <Button type="primary"
                                onClick={() => {
                                    handlerOrder(id)
                                    setShowSuccess(true)
                                }}
                            >{t('cart.checkOut')}</Button>
                        </div>
                    </div>
                </div>
            )}
            <Notify
                type={'success'}
                show={showSuccess}
                message='Thêm vào giỏ hàng thành công'
            />
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
