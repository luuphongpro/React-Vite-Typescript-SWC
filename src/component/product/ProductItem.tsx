import type { Itemcart, Product } from "../../types/product";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
interface ProductItemProps extends Product {
    setShowSuccess: (show: boolean) => void;
}
const ProductItem = (props:ProductItemProps) => {
    const { id, title, thumbnail, price, discountPercentage, brand, setShowSuccess } = props;
    const { isLogin } = useAuthStore()
    const navigator = useNavigate();
    const { listCart, setListCart } = useCartStore()
    const handleAddCart = (id: number, quantity: number = 1) => {
        const index = listCart.findIndex((item: Itemcart) => item.id === id)
        if (index != -1) {
            listCart[index].quantity += quantity;
            setListCart([...listCart])
        }
        else {
            listCart.push({ ...props, quantity: quantity, isBuy: false })
            setListCart([...listCart])

        }
        setShowSuccess(true);
    }
    return (
        <div className='sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)] min-h-69 flex flex-col justify-between gap-3 border border-gray-200 shadow-md' key={id}

        >
            <div className='relative'>
                <img
                    src={thumbnail}
                    className='rounded-lg transition-transform duration-300 hover:scale-110'
                    alt={title}
                    onClick={() => navigator(`/product/${id}`)}

                />
                {discountPercentage && (
                    <span className='px-2 py-1 bg-red-500 text-[12px] text-white font-medium absolute left-0 bottom-5 rounded-r-lg'>Big sale</span>
                )}
                {isLogin &&
                    (
                        <span className='px-2 py-1 bg-blue-500 text-[12px] text-white font-medium absolute right-0 bottom-5 rounded-l-lg'
                            onClick={() => handleAddCart(id, 1,)}
                        >Add cart</span>
                    )
                }
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <div className='justify-self-start font-bold'>{title}</div>
                <div className='justify-self-end font-bold text-gray-500'>${(price - (price * discountPercentage / 100)).toFixed(2)}</div>
                <div className='justify-self-start text-gray-500'>{brand}</div>
                {discountPercentage && (
                    <div className='text-red-600 justify-self-end'><del>${price}</del></div>
                )}
            </div>
        </div>
    );
}
export default ProductItem;