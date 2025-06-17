import { useState } from 'react';
import useCartStore from '../../store/useCartStore';
import Notify from '../modal/Notify';
import type { Product } from '../../types/product';
import useProductDetail from '../../../hook/useProductDetail';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAddCart } from '../../service/Cart';
import useAuthStore from '../../store/useAuthStore';
import { useTranslation } from 'react-i18next';
import ChangeQuantity from '../cart/ChangeQuantity';
import { Rate } from 'antd';
// import { notification } from 'antd';
import {formatCurrency} from '../../service/CurrencyFormatter'
const ProductDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams()
    const paramsId = id ? parseInt(id) : 0;
    const { data: product, isLoading, error } = useProductDetail(paramsId);
    const { listCart, setListCart } = useCartStore();
    const [quantity, setQuantity] = useState(1);
    const { id: userId } = useAuthStore()
    const navigator = useNavigate()
    const [showModal, setShowModal] = useState(false)
    // const [api, contextHolder] = notification.useNotification();

    // const openNotificationWithIcon = (type: 'success') => {
    //     api[type]({
    //         message: 'Thêm vào giỏ hàng thành công',
    //         description: 'Sản phẩm đã được thêm vào giỏ hàng của bạn.',
    //     });
    // };


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
            // openNotificationWithIcon('success')
            setShowModal(true)
        } catch (error) {
            console.error('Error placing order:', error);
        }
    }
    const handleClickTag = (item: string, index: number) => {
        if (index == 0)
            navigator('/?category=' + item)
        else
            navigator('/?keyword=' + item)
    }

    if (error) return <p>Lỗi khi tải sản phẩm: {error.message}</p>;
    return (
        <>
            {/* {contextHolder} */}
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
                <div className='lg:p-5 bg-secondary text-primary'>
                    <div className="flex lg:w-10/12  lg:flex-row flex-col  lg:gap-5 mx-auto p-3">
                        <div className='lg:w-4/12 w-full bg-primary lg:rounded-md rounded-t-md border-primary shadow-xl/20 shadow-primary'>
                            <div>
                                <img
                                    src={product.thumbnail}
                                    className='rounded-lg transition-transform duration-300 hover:scale-110 mx-auto'
                                    alt="Product"
                                />
                            </div>
                        </div>
                        <div className='lg:w-8/12 w-full lg:rounded-md rounded-b-md bg-primary border-primary shadow-xl/20 shadow-primary'>
                            <div className='flex  flex-col justify-between'>
                                <div>
                                    <div className='grid-cols-2 flex-row gap-4 mx-5 my-2 rounded-md'>
                                        <div className=' text-2xl font-medium'>{product.title}</div>
                                        <div className=' my-2'>{t('product.brand')}: {product.brand}</div>
                                        <div className=' my-2'>{t('product.availability')}: {product.availabilityStatus}</div>
                                        <div className='  my-2'>{t('product.tag')}: <span className='text-blue-500'>{product?.tags?.map((item: string, index: number) => <span onClick={() => handleClickTag(item, index)}>{('#' + item)}</span>)}</span> </div>
                                    </div>
                                    <div className='price mx-5 text-3xl font-bold text-red-600'>
                                        {formatCurrency((product.price - (product.price * product.discountPercentage / 100)))}
                                    </div>

                                </div>
                                <div className="flex items-center justify-between mx-5 my-2">
                                    <ChangeQuantity
                                        key={id}
                                        quantity={quantity}
                                        onChange={(newQuantity) => {
                                            setQuantity(newQuantity);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="rating mx-5 my-2" >
                                <Rate allowHalf disabled defaultValue={product.rating} />
                            </div>
                            <div className='mx-5 my-2 font-bold text-left'>{t('product.stock')} {product.stock}</div>
                            <div className='flex justify-center md:justify-start mb-2'>
                                <button className={"mx-5 my-2 size-10 bg-button-primary hover:bg-button-1 rounded-md cursor-pointe w-full lg:w-20 flex justify-center items-center gap-2"}
                                    onClick={() => handleAddCart()}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M12.5 17h-6.5v-14h-2" /><path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
                                    {t('product.buy')}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='p-3 '>
                        <div className='lg:w-[calc(83%-1rem)] w-full lg:mx-auto bg-primary rounded-md p-5 shadow-xl/20 shadow-primary'>
                            <div className='text-xl font-bold my-3'>{t('product.description')}</div>
                            <div>{product.description}</div>
                        </div>
                    </div>
                </div>
            }
            <Notify
                type={'success'}
                show={showModal}
                message='Thêm vào giỏ hàng thành công'
            />
        </>
    );
};

export default ProductDetail;