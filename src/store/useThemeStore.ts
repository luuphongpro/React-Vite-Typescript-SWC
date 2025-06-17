import { create } from "zustand";

interface Theme {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void
}
const useThemeStore = create<Theme>((set) => {
    const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    return {
        theme: savedTheme,
        setTheme: (theme: 'light' | 'dark') => {
            localStorage.setItem('theme', theme);
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            set({ theme });
        }
    };
});
export default useThemeStore