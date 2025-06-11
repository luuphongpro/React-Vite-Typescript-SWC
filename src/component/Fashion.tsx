import type { FashionItem } from '../types/fashion';
const Fashion = (props : FashionItem) =>{
    const { title, image, price, discount, discountPercentage, isNew, brand, id } = props;
    return (
        <div className='item-fashion sm:w-1/2 lg:w-1/4 min-h-69 flex flex-col justify-between gap-3 p-4' key={id} >
            <div className='relative'>
                <img src={image} className='rounded-lg ' />
                {discount && (
                    <span className='px-2 py-1 bg-red-500 text-[12px] text-white font-medium absolute left-0 bottom-5 rounded-r-lg'>{discountPercentage}%</span>
                    )}
                {isNew && (
                    <span className='px-2 py-1 text-xs bg-white font-semibold absolute left-13 bottom-5 rounded-md'>NEW</span>
                )}
            </div>
            <div className='grid grid-cols-2 gap-2'>
                <div className='justify-self-start font-bold'>{title}</div>
                <div className='justify-self-end font-bold text-gray-500'>{price}</div>
                <div className='justify-self-start text-gray-500'>{brand}</div>
                {discount && (
                    <div className='text-red-600 justify-self-end'></div>
                )}
            </div>
        </div>
    );
}
export default Fashion;