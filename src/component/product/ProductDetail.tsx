import { useState } from 'react';
import useCartStore from '../../store/useCartStore';
import Success from '../modal/Success';
import type { Product } from '../../types/product';
import useProductDetail from '../../../hook/useProductDetail';
import { useParams } from 'react-router-dom';
import { fetchAddCart } from '../../service/Cart';
import useAuthStore from '../../store/useAuthStore';
import { useTranslation } from 'react-i18next';

const ProductDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams()
    const paramsId = id ? parseInt(id) : 0;
    const { data: product, isLoading, error } = useProductDetail(paramsId);
    const { listCart, setListCart } = useCartStore();
    const [showSuccess, setShowSuccess] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { id: userId } = useAuthStore()
    const handleAddCart = async () => {
        const index = listCart.findIndex((item: Product) => item.id === paramsId)
        if (index != -1) {
            listCart[index].quantity += quantity;

            setListCart([...listCart])
        }
        else {
            listCart.push({ ...product, quantity: quantity, isBuy: false })
            setListCart([...listCart])
        }
        try {
            await fetchAddCart(userId, [{
                id: paramsId,
                quantity: quantity,
            }]);
            setShowSuccess(true);

        } catch (error) {
            console.error('Error placing order:', error);
        }
    }


    if (error) return <p>Lỗi khi tải sản phẩm: {error.message}</p>;
    return (
        <>
            {isLoading ?
                <div className='bg-gray-200 p-5 animate-pulse dark:bg-gray-800'>
                    <div className="flex w-10/12 flex-row gap-5 mx-auto p-3 bg-gray-200 dark:bg-gray-500">
                        <div className='w-4/12 bg-white dark:bg-gray-800 rounded-md h-80'></div>
                        <div className='w-8/12 bg-white dark:bg-gray-800 rounded-md p-5 flex flex-col gap-4'>
                            <div className='h-4 bg-gray-300 dark:bg-gray-500 rounded w-1/4'></div>
                            <div className='h-4 bg-gray-300 dark:bg-gray-500 rounded w-1/4'></div> 
                            <div className='h-4 bg-gray-300 dark:bg-gray-500 rounded w-1/4'></div> 
                            <div className='h-4 bg-gray-300 dark:bg-gray-500 rounded w-1/4'></div> 
                            <div className='h-8 bg-red-300 rounded w-32 mt-2'></div> 
                            <div className='flex items-center gap-2 mt-2'>
                                <div className='h-8 w-24 bg-gray-300 dark:bg-gray-500 rounded'></div> 
                            </div>
                            <div className='flex gap-3 mt-2'>
                                <div className='h-8 w-24 bg-gray-300 dark:bg-gray-500 rounded'></div> 
                            </div>
                            <div className='h-4 bg-gray-300 dark:bg-gray-500 rounded w-1/4'></div> 
                        </div>
                    </div>
                    <div className='w-[calc(83%-1rem)] mx-auto bg-white dark:bg-gray-500 rounded-md p-5 mt-5 h-32'>
                        <div className='h-4 bg-gray-300 rounded w-full mb-2'></div>
                        <div className='h-4 bg-gray-300 rounded w-5/6 mb-2'></div>
                        <div className='h-4 bg-gray-300 rounded w-4/6'></div>
                    </div>
                </div>
                :
                <div className='bg-gray-200  p-5 dark:bg-gray-800'>
                    <div className="flex w-10/12 flex-row gap-5 mx-auto p-3 dark:bg-gray-800">
                        <div className='w-4/12 bg-white rounded-md dark:bg-gray-700'>
                            <div>
                                <img
                                    src={product.thumbnail}
                                    className='rounded-lg transition-transform duration-300 hover:scale-110'
                                    alt="Product"
                                />
                            </div>
                        </div>
                        <div className='w-8/12 bg-white rounded-md dark:bg-gray-700'>
                            <div className='grid-cols-2 flex-col gap-4 p-5 rounded-md'>
                                <div className=' text-xl'>{product.title}</div>
                                <div className=' '>{t('product.brand')}: {product.brand}</div>
                                <div className=' '>{t('product.availability')}: {product.availabilityStatus}</div>
                                <div className='  '>{t('product.tag')}: <span className='text-blue-500'>{product?.tags?.map((item: string) => ('#' + item))}</span> </div>
                            </div>
                            <div className='price mx-5 text-3xl font-bold text-red-600'>
                                ${(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}
                            </div>
                            <div className="rating" ></div>

                            <div className="flex items-center justify-between m-2">
                                <div className="mx-5 flex border border-gray-500 rounded-md items-center">
                                    <div onClick={() => (quantity > 1 ? setQuantity(quantity - 1) : null)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-minus text-gray-400"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0"
                                        /></svg>
                                    </div>
                                    <span className="text-gray-900 p-1">{quantity}</span>
                                    <div onClick={() => setQuantity(quantity + 1)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus text-gray-400"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0"

                                        /></svg>
                                    </div>
                                </div>
                            </div>
                            <button className={"mx-5 my-5 size-10 px-3 bg-blue-500 dark:bg-blue-900 dark:hover:bg-blue-500 rounded-md cursor-pointer hover:bg-blue-400 w-20"}
                                onClick={() => handleAddCart()}
                            >{t('product.buy')}</button>
                            <div className='mx-5 '>{t('product.stock')} {product.stock}</div>
                        </div>
                    </div>
                    <div>
                        <div className='w-[calc(83%-1rem)] mx-auto bg-white dark:bg-gray-700 rounded-md p-5'>
                            <div className='text-xl font-bold my-3'>{t('product.description')}</div>
                            <div className='text-gray-600 dark:text-gray-400'>{product.description}</div>
                        </div>
                    </div>
                </div>
            }
            <Success showSuccess={showSuccess} setShowSuccess={setShowSuccess} />
        </>
    );
};

export default ProductDetail;