import { useState } from 'react';
import useCartStore from '../../store/useCartStore';
import Success from '../modal/Success';
import type { Product } from '../../types/product';
import useProductDetail from '../../../hook/useProductDetail';
import { useParams } from 'react-router-dom';
import Loading from '../Loading';

const ProductDetail = () => {
    const {id}= useParams()
    const paramsId = id ? parseInt(id) : 0;
    const { data: product, isLoading, error } = useProductDetail(paramsId);
    const { listCart, setListCart } = useCartStore();
    const [showSuccess, setShowSuccess] = useState(false);
    const handleAddCart = (id: number, quantity: number = 1) => {
        const index = listCart.findIndex((item: Product) => item.id === id)
        if (index != -1) {
            listCart[index].quantity += quantity;
            setListCart([...listCart])
        }
        else {
            listCart.push({ ...product, quantity: quantity, isBuy: false })
            setListCart([...listCart])

        }
        setShowSuccess(true);
    }
    if (isLoading) return <Loading />;
    if (error) return <p>Lỗi khi tải sản phẩm: {error.message}</p>;
    if (!product) return <p>Không tìm thấy sản phẩm</p>;
    return (
        <>

            <div className='bg-gray-200 p-5'>
                <div className="flex w-10/12 flex-row gap-5 mx-auto p-3">
                    <div className='w-4/12 bg-white rounded-md'>
                        <div>
                            <img
                                src={product.thumbnail}
                                className='rounded-lg transition-transform duration-300 hover:scale-110'
                                alt="Product"
                            />
                        </div>
                    </div>
                    <div className='w-8/12 bg-white rounded-md'>
                        <div className='grid-cols-2 flex-col gap-4 p-5 rounded-md'>
                            <div className=' text-xl'>{product.title}</div>
                            <div className=' '>Brand: {product.brand}</div>
                            <div className=' '>Availability: {product.availabilityStatus}</div>
                            <div className='  '>Tag: <span className='text-blue-500'>{product?.tags?.map(item => ('#' + item))}</span> </div>
                        </div>
                        <div className='price mx-5 text-3xl font-bold text-red-600'>
                            ${(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}
                        </div>
                        <div className="rating" ></div>
                        <button className={"mx-5 my-5 size-10 px-3 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-400 w-20"}
                            onClick={() => handleAddCart(product.id, 1)}
                        >Buy</button>
                        <div className='mx-5 '>Stock: {product.stock}</div>
                    </div>
                </div>
                <div>
                    <div className='w-[calc(83%-1rem)] mx-auto bg-white rounded-md p-5'>
                        <div className='text-xl font-bold my-3'>Description</div>
                        <div className='text-gray-600'>{product.description}</div>
                    </div>
                </div>
            </div>
            <Success showSuccess={showSuccess} setShowSuccess={setShowSuccess}/>
        </>
    );
};

export default ProductDetail;