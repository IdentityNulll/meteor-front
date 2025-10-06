import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import uz from "./Locales/uz.json";
import ru from "./Locales/ru.json";

i18n.use(initReactI18next).init({
  resources: {
    uz: { translation: uz },
    ru: { translation: ru },
  },
  lng: "uz",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
