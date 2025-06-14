import { create } from "zustand";
import i18n from "../i18n";
const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'vi', label: 'Tiếng Việt' }
];


interface Language {
    value: string;
    label: string;
}

interface LanguageStore {
    language: Language;
    setLanguage: (data: Language) => void;
}

// Hàm validate để đảm bảo dữ liệu đúng chuẩn
const getValidLanguage = (): Language => {
  const saved = localStorage.getItem("language");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      const found = languageOptions.find(opt => opt.value === parsed.value);
      if (found) return found; // đồng bộ lại label
    } catch (err) {}
  }
  return { value: "en", label: "English" };
};

const useLanguageStore = create<LanguageStore>((set) => ({
  language: getValidLanguage(),
  setLanguage: (data: Language) => {
    i18n.changeLanguage(data.value);
    localStorage.setItem("language", JSON.stringify(data));
    set({ language: data });
  },
}));

export default useLanguageStore;
