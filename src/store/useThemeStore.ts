import { create } from "zustand";

interface Theme {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void
}
const useThemeStore = create<Theme>((set) => (
    {
        theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
        setTheme: (theme: 'light' | 'dark') => {
            localStorage.setItem('theme', theme)
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }

            set({ theme })
        }
    }
))
export default useThemeStore