import { useState } from "react";
import { fetchLogin } from "../../service/Auth";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";

interface Login {
    showLogin: boolean;
    setShowLogin: (state: boolean) => void;
}
const Login = (props: Login) => {
    const { t } = useTranslation()
    const { showLogin, setShowLogin } = props
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const handleClickClose = () => {
        setShowLogin(false)
    }
    const handlePressUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value)
    }
    const handlePressPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const handleClickSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await fetchLogin(userName, password)
        if (res) {
            setIsLogin(true)
            setShowLogin(false)
        }

        else
            setIsLogin(false)
    }
    return createPortal(
        <>
            <div
                className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${showLogin ? "opacity-50 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => handleClickClose()}
            ></div>
            <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${showLogin ? "opacity-100 visible" : "opacity-0 invisible"
                }`} >
                <div className="relative p-4 w-full max-w-md max-h-full opacity-100">

                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">

                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {t('header.signUp')}
                            </h3>
                            <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => handleClickClose()}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">{t('header.close')}</span>
                            </button>
                        </div>

                        <div className="p-4 md:p-5">
                            <form className="space-y-4" action="#" onSubmit={(e) => handleClickSubmitLogin(e)}>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('header.userName')}</label>
                                    <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="emilys" required
                                        value={userName}
                                        onChange={(event) => handlePressUserName(event)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('header.passWord')}</label>
                                    <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required
                                        value={password}
                                        onChange={(event) => handlePressPassword(event)}
                                    />
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

                                >{t('header.loginTo')}</button>
                                <div className={"text-red-600 font-bold text-center" + (isLogin ? ' hidden ' : '  ')}>{t('header.isIncrrect')}</div>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    {t('header.notRegistered')} <a href="#" className="text-blue-700 hover:underline dark:text-blue-500">{t('header.createAccount')}</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.body

    )
}
export default Login