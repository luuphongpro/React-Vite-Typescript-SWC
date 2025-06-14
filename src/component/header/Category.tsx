import { useState } from "react";
import useCategory from "../../../hook/useCategory";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

interface Category {
    name: string;
    slug: string;
    url: string;
}
const Category = () => {
    const navigate = useNavigate()
    const [isShowCategory, setIsShowCategory] = useState(false)
    const [searchCategory, setSearchCategory] = useState('');
    const { data: categories } = useCategory(searchCategory)
    const [activeIndex, setActiveIndex] = useState<number>(-2);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            setActiveIndex((prev) => {
                console.log(categories.length > 6 ? 5 : categories.length)
                return prev < (categories.length > 6 ? 5 : categories.length - 1) ? prev + 1 : prev

            }
            );
        } else if (e.key === "ArrowUp") {
            setActiveIndex((prev) => (prev > -1 ? prev - 1 : -1));
        } else if (e.key === "Enter") {
            if (activeIndex > -1)
                handleFilterCategory(categories[activeIndex].slug);
            else
                navigate("/product")
        }
    };
    const handleFilterCategory = (slug: string) => {
        setIsShowCategory(false)
        navigate(`/product?category=${slug}`);
    }
    return (
        <>
            {isShowCategory && <div className="fixed inset-0  z-2"
                onClick={() => setIsShowCategory(false)}
            ></div>
            }
            <li className="relative cursor-pointer">
                <a className="text-gray-500 dark:text-white transition dark:hover:text-gray-300 hover:text-gray-600 flex items-center gap-1"
                    onClick={() => setIsShowCategory(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-list"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l11 0" /><path d="M9 12l11 0" /><path d="M9 18l11 0" /><path d="M5 6l0 .01" /><path d="M5 12l0 .01" /><path d="M5 18l0 .01" /></svg>
                    {t('header.category')}
                </a>
                <div className={"absolute top-3 left-0 z-11  mt-2 w-48 bg-white dark:bg-gray-400 border border-gray-200 rounded-md shadow-lg " + (isShowCategory ? " inline " : " hidden ")}>
                    <ul className=" py-1">
                        <input
                            type="text"
                            className="h-8 m-3 w-[85%] border px-2 rounded"
                            placeholder={t('header.typeToSearch')}
                            value={searchCategory}
                            onChange={(e) => {
                                setSearchCategory(e.target.value)
                                setActiveIndex(-1)
                            }}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setActiveIndex(-1)}

                        />
                        <li >
                            <a
                                className={`block px-4 py-2 text-sm ${activeIndex === -1 ? "bg-gray-100 dark:bg-gray-700" : "text-gray-400 dark:text-gray-500"
                                    } hover:bg-gray-200 dark:bg-gray-400`}
                                onClick={() => {
                                    setIsShowCategory(false)
                                    navigate("/product")
                                }}
                            >
                                {t('header.allProduct')}
                            </a>
                        </li>
                        {categories?.slice(0, 6).map((category: Category, index: number) => (
                            <li key={category.slug}>
                                <a
                                    className={`block px-4 py-2 text-sm ${activeIndex === index ? "bg-gray-100 dark:bg-gray-700" : "text-gray-400 dark:text-gray-500"
                                        } hover:bg-gray-200 dark:bg-gray-400`}
                                    onClick={() => handleFilterCategory(category.slug)}
                                >
                                    {category.name}
                                </a>
                            </li>
                        ))}

                    </ul>
                </div>
            </li>
        </>
    )
}
export default Category