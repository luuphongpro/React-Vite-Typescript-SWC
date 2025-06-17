import type { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';
import { useTranslation } from "react-i18next";
import {formatCurrency} from '../../service/CurrencyFormatter'
const ProductItem = (props: Product) => {
    const { t } = useTranslation();
    const { id, title, thumbnail, price, discountPercentage, brand } = props;
    const navigator = useNavigate();
    return (
        <div className='w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.6rem)] flex flex-col justify-around border border-gray-200 shadow-md p-5 lg:rounded-lg rounded-md m-2' key={id}
        >
            <div className='min-h-50 group relative'
                onClick={() => navigator(`${id}`)}
            >
                <img
                    src={thumbnail}
                    className='rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:opacity-40 w-full object-cover '
                    alt={title}
                />

                <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-100 opacity-0 transition-opacity duration-300 bg-black/10 text-white font-semibold rounded-lg z-1"

                >
                    <Button type="primary" className="cursor-pointer"
                        
                    >{t('product.seeDetail')}</Button>
                </div>

                {discountPercentage && (
                    <span className='px-2 py-1 bg-red-500 text-[12px] text-white font-medium absolute left-0 bottom-10 rounded-r-lg'>
                         {t('product.bigSale')}
                    </span>
                )}

            </div>

            <div className='grid [grid-template-columns:2fr_1fr] gap-2 text-primary'>
                <div className='justify-self-start font-bold'>{title}</div>
                <div className='justify-self-end font-bold '>{formatCurrency((price - (price * discountPercentage / 100)))}</div>
                <div className='justify-self-start '>{brand}</div>
                {discountPercentage && (
                    <div className='text-red-600 justify-self-end'><del>{formatCurrency(price)}</del></div>
                )}
            </div>
        </div>
    );
}
export default ProductItem;