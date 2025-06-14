import { useState } from "react";
import type { Itemcart } from "../types/product";

const Purchase = () => {
    const [listPurchare] = useState(JSON.parse(localStorage.getItem('purchase') || '[]'));
    const totalPrice = (items: Itemcart[]) => {
        return items.reduce((total, item) => {
            const itemPrice = item.price - (item.price * item.discountPercentage / 100);
            return total + (itemPrice * item.quantity);
        }, 0).toFixed(2);
    }
    return (
        <div className="bg-gray-200 dark:bg-gray-800">
            <div className="lg:w-4/6 mx-auto bg-white dark:bg-gray-700 p-5">
                <h1 className="text-xl font-bold py-2">PURCHASE HISTORY</h1>
                {listPurchare.length === 0 ? (
                    <p>You haven't made a purchase yet.</p>
                ) : (
                    <>
                        <div className="flex flex-row h-10 items-center justify-end gap-50 border-y border-gray-500 dark:bg-gray-400 my-5">
                            <div className="flex items-center justify-around gap-10">
                                <span className="mx-5">Quantity</span>
                                <span className="mx-5">Price</span>
                                <span></span>
                            </div>
                        </div>

                        {listPurchare.map((items: any, index: number) => (
                            <>
                                <div className="mt-10 dark:bg-gray-400">
                                    <div className="font-bold inline">Order ID: </div><span>{index}</span>
                                    <div className="my-2 font-bold">
                                        Total Order: <span className="font-medium">${totalPrice(items)}</span>
                                    </div>
                                    <div className="font-bold">Order Date:</div><span>14/06/2025</span>
                                </div>
                                {items.map((item: Itemcart) => (
                                    <>

                                        <div
                                            className="flex flex-row items-center justify-between  gap-2 border-y border-gray-500 my-5 dark:bg-gray-400"
                                            key={item.id}
                                        >
                                            <div className="flex items-center gap-5 justify-start">
                                                <div>
                                                    <img src={item.thumbnail} className="lg:h-50" />
                                                </div>
                                                <div className="flex flex-col justify-between">
                                                    <div className="mt-4">{item.title}</div>
                                                    <div className="my-4">${(item.price - (item.price * item.discountPercentage / 100)).toFixed(2)}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="mx-10 flex border border-gray-500 rounded-md items-center">
                                                    <span className="text-gray-900 p-1">{item.quantity}</span>
                                                </div>
                                                <div className="mx-10 text-red-600 font-bold w-15">${((item.price - (item.price * item.discountPercentage / 100)) * item.quantity).toFixed(2)}</div>

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