import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import useCartStore from "../../store/useCartStore";
import type { Product } from "../../types/product";
import HeaderCart from "./HeaderCart";
import ItemCart from "./ItemCart";
// ...

const Cart = () => {
    const { id } = useAuthStore();
    const { listCart, setListCart, purchaseList, handlerOrder } = useCartStore();
    const [isSelectAll, setIsSelectAll] = useState(listCart.every(item => item.isBuy));
    const [activeButton, setActiveButton] = useState(listCart.some(item => item.isBuy));

    const totalPrice = listCart.reduce((total: number, item: Product) => {
        if (item.isBuy) {
            const itemPrice = item.price - (item.price * item.discountPercentage / 100);
            return total + (itemPrice * item.quantity);
        }
        return total;
    }, 0).toFixed(2);

    return (
        <div className="bg-gray-200 flex lg:flex-row sm:flex-col items-center justify-center gap-10 p-5 pb-40">
            {listCart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div>
                        <h1 className="text-xl font-bold py-2">CART</h1>
                        <HeaderCart
                            listCart={listCart}
                            setListCart={setListCart}
                            isSelectAll={isSelectAll}
                            setIsSelectAll={setIsSelectAll}
                            setActiveButton={setActiveButton}
                        />

                        {listCart.map((item: any, index) => (
                            <ItemCart
                                key={item.id}
                                item={item}
                                index={index}
                                listCart={listCart}
                                setListCart={setListCart}
                                setIsSelectAll={setIsSelectAll}
                                setActiveButton={setActiveButton}
                            />
                        ))}
                    </div>
                    <div className="w-40 h-40 bg-white rounded-lg shadow-md flex flex-col items-center justify-center">
                        <div>Order Total: {totalPrice}</div>
                        <div className="flex justify-center py-5">
                            <button
                                className={"py-1.5 px-3 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-400 w-20" + (activeButton ? "" : " disabled opacity-50")}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlerOrder(id)

                                }}
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
export default Cart;
