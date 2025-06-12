import { useState } from "react";

const Purchase = () => {
    const [listPurchare, setListPurchase] = useState(JSON.parse(localStorage.getItem('purchase') || '[]'));
    return (
        <div className="bg-gray-200">
            <div className="w-4/5 mx-auto">
                <h1 className="text-xl font-bold py-2">PURCHASE HISTORY</h1>
                {listPurchare.length === 0 ? (
                    <p>You haven't made a purchase yet.</p>
                ) : (
                    <>
                        <div className="flex flex-row h-10 items-center justify-end gap-50 border border-gray-500 rounded-lg my-5 bg-white">
                            <div className="flex items-center justify-around gap-10">
                                <span className="mx-5">Quantity</span>
                                <span className="mx-5">Price</span>
                                <span></span>
                            </div>
                        </div>

                        {listPurchare.map((items: any) => (
                            <>
                                {items.products.map(item => (
                                    <div
                                        className="flex flex-row items-center justify-between gap-2 border border-gray-500 rounded-2xl mt-2 bg-white"
                                        key={item.id}
                                    >
                                        <div className="flex items-center gap-5 justify-start">
                                            <div>
                                                <img src={item.thumbnail} className="h-20" />
                                            </div>
                                            <div className="flex flex-col justify-between">
                                                <div>{item.title}</div>
                                                <div>${item.price}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="mx-10 flex border border-gray-500 rounded-md items-center">
                                                <span className="text-gray-900 p-1">{item.quantity}</span>
                                            </div>
                                            <div className="mx-10 text-red-600 font-bold w-15">${item.total}</div>

                                        </div>
                                    </div>
                                ))}
                                <div className="flex justify-end items-center gap-10 my-5 flex-row">
                                    Total: <span className="text-red-600 font-bold w-15">${items.total.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-500 my-6"></div>
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