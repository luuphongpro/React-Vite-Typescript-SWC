import { t } from "i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [searchProduct, setSearchProduct] = useState('')
    const navigate = useNavigate()
    const typeSearchProduct = (e: any) => {
        setSearchProduct(e.target.value);
    }
    const handleSearchProduct = () => {
        navigate('/product?keyword=' + searchProduct)
    }
    return (
        <>
            <div className="flex flex-row content-center ">
                <input type="text" placeholder={t("header.search")+"..."} className="border border-gray-700 rounded-l-md p-1 focus:rounded-none" value={searchProduct} onChange={(e) => typeSearchProduct(e)}
                    onKeyDown={(e) => {
                        if (e.key == 'Enter')
                            handleSearchProduct()
                    }}
                ></input>
                <button className="rounded-r-lg bg-teal-600 px-1 me-10 text-white hover:bg-teal-700"
                    onClick={() => handleSearchProduct()}
                >
                    <div className="flex flex-row">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                        {t('header.search')}
                    </div>
                </button>
            </div>
        </>
    )
}
export default Search