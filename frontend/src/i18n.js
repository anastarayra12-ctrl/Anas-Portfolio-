import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
  en: {
    translation: {
      "home": "Home",
      "projects": "Projects",
      "about": "About",
      "contact": "Contact",
      "theme_toggle": "Toggle Theme",
      "language_toggle": "عربي"
    }
  },
  ar: {
    translation: {
      "home": "الرئيسية",
      "projects": "المشاريع",
      "about": "عني",
      "contact": "تواصل",
      "theme_toggle": "تبديل المظهر",
      "language_toggle": "English"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
