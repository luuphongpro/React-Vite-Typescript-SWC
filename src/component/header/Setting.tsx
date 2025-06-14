import { SettingOutlined } from '@ant-design/icons'
import { Select, Switch } from 'antd';
import { useState } from 'react';
import useLanguageStore from '../../store/useLanguageStore';
import useThemeStore from '../../store/useThemeStore';
import { t } from 'i18next';

const listLanguage = [
    { value: 'en', label: 'English' },
{ value: 'vi', label: 'Việt Nam' }
]
const Setting = () => {
    const { language, setLanguage } = useLanguageStore()
    const { theme, setTheme } = useThemeStore()
    const [isShowSetting, setIsShowSetting] = useState(false)
    const handleChangeLanguage = (value: string) => {
        setLanguage(listLanguage.find((item) => item.value = value) || { value: 'en', label: 'English' })
    };
    return (
        <>
            {isShowSetting && <div className="fixed inset-0  z-2"
                onClick={() => setIsShowSetting(false)}
            ></div>
            }
            <div className="size-10 flex justify-center items-center rounded-full hover:bg-gray-200 relative"
                onClick={() => setIsShowSetting(true)}
            >
                <SettingOutlined />
                <div className={"absolute top-full right-0 mt-2  bg-white dark:bg-gray-700 border border-gray-300 rounded shadow-lg p-3 z-50" + (isShowSetting ? " " : " hidden ")}>
                    <div className="mb-2 font-medium flex gap-4">{t('header.language')}:
                        <Select
                            defaultValue={language.value}
                            style={{ width: 120 }}
                            options={listLanguage}
                            onChange={handleChangeLanguage}
                        />
                    </div>
                    <div className="mb-2 font-medium flex gap-5">{t('header.theme')}:
                        <Switch checkedChildren={t('header.light')} unCheckedChildren={t('header.dark')}
                            checked={theme === 'light'}
                            onChange={(checked) => {
                                const newTheme = checked ? 'light' : 'dark';
                                setTheme(newTheme);
                            }}

                        />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Setting;