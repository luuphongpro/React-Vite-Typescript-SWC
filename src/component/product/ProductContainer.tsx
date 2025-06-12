import ProductItem from "./ProductItem";
import useProductStore from "../../store/useProductStore";
import useProduct from '../../../hook/useProduct';
import Loading from "../Loading";
import Pagination from "../Pagination";
import usePagiantion from '../../../hook/usePagination'
import Success from "../modal/Success";
import { useState } from "react";

const ProductContainer = () => {
    const data = usePagiantion()
    const currentPage= useProductStore((state) => state.currentPage)
    const totalPages = useProductStore((state) => state.totalPages)
    const { isLoading } = useProduct()
    const [ showSuccess, setShowSuccess ] = useState(false);
    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            <div className="product-container flex flex-wrap w-5/6 mx-auto gap-5">
                {data.map((product) => (
                    <ProductItem
                        {...product}
                        setShowSuccess={setShowSuccess}
                    />
                ))}
            </div>
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
            />
            <Success 
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
            />
        </>
    );
}

export default ProductContainer;