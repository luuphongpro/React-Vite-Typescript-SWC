import { useState } from "react";
import Login from "../auth/Login";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import { Dropdown, Space, type MenuProps } from "antd";
import Setting from "./Setting";
import Category from "./Category";
import Search from "./Search";
import { useTranslation } from "react-i18next";

const Header = () => {
    const { t } = useTranslation();

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: t('header.cart'),
            onClick: () => navigate('/cart'),
        },
        {
            key: '2',
            label:  t('header.purchaseHistory'),
            onClick: () => navigate('/purchase'),
        },
        {
            key: '3',
            label: t('header.logout'),
            onClick: () => handleLogout(),
        },
    ];
    const [showLogin, setShowLogin] = useState(false)
    const { isLogin, firstName, logout } = useAuthStore()
    const navigate = useNavigate()
    const { listCart } = useCartStore()
    const handleClickLogin = () => {
        setShowLogin(true)
    }
    const handleLogout = () => {
        logout()
    }
    return (
        <>
            <header className=" dark:bg-gray-600 bg-background">
                <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-1 items-center justify-end md:justify-between">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                <li className="cursor-pointer">
                                    <a className="text-gray-500 dark:text-white dark:hover:text-gray-300 transition hover:text-gray-600"
                                        onClick={() => navigate('/product')}
                                    > {t('header.product')} </a>
                                </li>
                                <Category
                                />
                            </ul>
                        </nav>
                        <div className="flex items-center gap-4">
                            <Search />
                            {!isLogin ?
                                <div className="sm:flex sm:gap-4">
                                    <a
                                        className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                                        href="#"
                                        onClick={() => handleClickLogin()}
                                    >
                                        {t('header.login')}
                                    </a>
                                    <a
                                        className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                                        href="#"
                                    >
                                        {t('header.register')}
                                    </a>
                                </div>
                                :
                                <>
                                    <div className="relative cursor-pointer"
                                        onClick={() => navigate('/cart')}
                                    >
                                        <span className=" bg-red-500 text-white font-bold bottom-5 left-3 px-2 py-1 rounded-4xl absolute text-xs">{listCart.length}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
                                    </div>
                                    <div className="flex flex-row">
                                        <a
                                            href="#"
                                            className="flex items-center rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition group-hover:bg-teal-700"
                                        >
                                            <Dropdown menu={{ items }}>
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        <span>{t('header.hello')} {firstName}</span>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="ml-1 h-5 w-5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </a>
                                    </div>
                                </>
                            }
                            <Setting />
                        </div>
                    </div>
                </div>
            </header>
            <Login
                showLogin={showLogin}
                setShowLogin={setShowLogin}
            />
        </>
    )
}
export default Header;