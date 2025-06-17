import { useState } from "react";
import type { Itemcart } from "../types/product";
import { useTranslation } from "react-i18next";
import { Empty } from "antd";
import {formatCurrency} from '../service/CurrencyFormatter'
const Purchase = () => {
    const { t } = useTranslation()
    const [listPurchare] = useState(JSON.parse(localStorage.getItem('purchase') || '[]'));
    const totalPrice = (items: Itemcart[]) => {
        return items.reduce((total, item) => {
            const itemPrice = item.price - (item.price * item.discountPercentage / 100);
            return total + (itemPrice * item.quantity);
        }, 0);
    }
    return (
        <div className="bg-primary text-primary pb-20">
            <div className="lg:w-4/6 mx-auto  lg:p-5">
                {listPurchare.length === 0 ? (
                    <div className="flex justify-center text-primary h-screen items-center flex-col">
                        <div className="">{t('purchase.empty')}
                        </div>
                        <Empty />

                    </div>
                ) : (
                    <>
                        <h1 className="text-xl font-bold py-2">{t('purchase.title')}</h1>
                        <div className="flex flex-row h-10 items-center justify-end border-y border-gray-500   my-5">
                            <div className="flex items-center justify-around lg:gap-10">
                                <span className="lg:mx-5 mx-2">{t('purchase.quantity')}</span>
                                <span className="lg:mx-5 mx-2">{t('purchase.price')}</span>
                                <span></span>
                            </div>
                        </div>

                        {listPurchare.map((items: any, index: number) => (
                            <>
                                <div className="lg:mt-10 mt-4   lg:p-5 p-2">
                                    <div className="font-bold inline">{t('purchase.orderId')}: </div><span>{index}</span>
                                    <div className="my-2 font-bold">
                                        {t('purchase.totalOrder')}: <span className="font-medium">{formatCurrency(totalPrice(items))}</span>
                                    </div>
                                    <div className="font-bold">{t('purchase.orderDate')}: <span className="font-medium">14/06/2025</span></div>
                                </div>
                                {items.map((item: Itemcart) => (
                                    <>

                                        <div
                                            className="flex flex-row items-center justify-between bg-secondary gap-2 border-y border-gray-500 lg:my-5"
                                            key={item.id}
                                        >
                                            <div className="flex items-center gap-5 justify-start">
                                                <div>
                                                    <img src={item.thumbnail} className="lg:h-50 min-w-20" />
                                                </div>
                                                <div className="flex flex-col justify-between">
                                                    <div className="mt-4">{item.title}</div>
                                                    <div className="my-4">{formatCurrency((item.price - (item.price * item.discountPercentage / 100)))}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="lg:mx-10 mx-2 flex border border-gray-500 rounded-md items-center">
                                                    <span className=" p-1">{item.quantity}</span>
                                                </div>
                                                <div className="lg:mx-10 mx-2 text-red-600 font-bold lg:w-15">{formatCurrency(((item.price - (item.price * item.discountPercentage / 100)) * item.quantity))}</div>

                                            </div>
                                        </div>
                                    </>
                                ))}

                                <div className="mb-20"></div>
                            </>
                        ))}
                    </>
                )
                }
            </div>
        </div>
    )
}
export default Purchase;