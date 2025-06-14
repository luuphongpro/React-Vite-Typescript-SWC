import ProductItem from "./ProductItem";
import Pagination from "../Pagination";
import Success from "../modal/Success";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useProduce from "../../../hook/useProduct";
import type { Product } from "../../types/product";

const ProductContainer = () => {
    const [searchParams] = useSearchParams();
    const [showSuccess, setShowSuccess] = useState(false);
    const category = searchParams.get("category");
    const keyword = searchParams.get("keyword");
    const page = parseInt(searchParams.get("page") || "1", 10);

    const { isLoading, data } = useProduce(category, keyword, page);
    return (
        <>
            <div className="product-container flex flex-wrap w-5/6 mx-auto gap-5 bg-white dark:bg-gray-800 ">
                {isLoading
                    ? Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)] min-h-69 flex flex-col justify-between gap-3 border border-gray-200 shadow-md p-5 group cursor-pointer relative rounded-lg animate-pulse"
                        >
                            <div className="w-full h-80 bg-gray-200 dark:bg-gray-500 rounded-lg" >
                            </div>
                            <div className="grid [grid-template-columns:2fr_1fr] gap-2 mt-3">
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                <div className="h-4 bg-gray-200 rounded w-1/2 justify-self-end" />
                                <div className="h-4 bg-gray-200 rounded w-1/2" />
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                            </div>
                        </div>
                    ))
                    : data.products.map((product: Product) => (
                        <ProductItem
                            key={product.id}
                            {...product}
                            setShowSuccess={setShowSuccess}
                        />
                    ))}
            </div>
            <Pagination

            />
            <Success
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
            />
        </>
    );
}

export default ProductContainer;