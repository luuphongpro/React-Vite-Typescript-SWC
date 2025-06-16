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
// import { notification } from 'antd';

const ProductDetail = () => {
    const { t } = useTranslation();
    const { id } = useParams()
    const paramsId = id ? parseInt(id) : 0;
    const { data: product, isLoading, error } = useProductDetail(paramsId);
    const { listCart, setListCart } = useCartStore();
    const [quantity, setQuantity] = useState(1);
    const { id: userId } = useAuthStore()
    const navigator = useNavigate()
    const [showModal, setShowModal] =useState(false)
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
            navigator('/product?category=' + item)
        else
            navigator('/product?keyword=' + item)
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
                <div className='p-5 bg-secondary text-primary'>
                    <div className="flex w-10/12 flex-row gap-5 mx-auto p-3">
                        <div className='w-4/12 bg-primary rounded-md border-primary border'>
                            <div>
                                <img
                                    src={product.thumbnail}
                                    className='rounded-lg transition-transform duration-300 hover:scale-110'
                                    alt="Product"
                                />
                            </div>
                        </div>
                        <div className='w-8/12 rounded-md bg-primary border-primary border'>
                            <div className='grid-cols-2 flex-col gap-4 p-5 rounded-md'>
                                <div className=' text-xl'>{product.title}</div>
                                <div className=' '>{t('product.brand')}: {product.brand}</div>
                                <div className=' '>{t('product.availability')}: {product.availabilityStatus}</div>
                                <div className='  '>{t('product.tag')}: <span className='text-blue-500'>{product?.tags?.map((item: string, index: number) => <span onClick={() => handleClickTag(item, index)}>{('#' + item)}</span>)}</span> </div>
                            </div>
                            <div className='price mx-5 text-3xl font-bold text-red-600'>
                                ${(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}
                            </div>
                            <div className="rating" ></div>

                            <div className="flex items-center justify-between m-5">
                                <ChangeQuantity
                                    key={id}
                                    quantity={quantity}
                                    onChange={(newQuantity) => {
                                        setQuantity(newQuantity);
                                    }}
                                />
                            </div>
                            <button className={"mx-5 my-5 size-10 px-3 bg-button-primary hover:bg-button-1 rounded-md cursor-pointe w-20"}
                                onClick={() => handleAddCart()}
                            >{t('product.buy')}</button>
                            <div className='m-5 font-bold '>{t('product.stock')} {product.stock}</div>
                        </div>
                    </div>
                    <div>
                        <div className='w-[calc(83%-1rem)] mx-auto bg-primary rounded-md p-5 border border-primary'>
                            <div className='text-xl font-bold my-3'>{t('product.description')}</div>
                            <div className='text-gray-600 dark:text-gray-400'>{product.description}</div>
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