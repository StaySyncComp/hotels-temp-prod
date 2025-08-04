import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "he", // Set Hebrew as the default language
    fallbackLng: "he",
    debug: true,
    load: "all",
    backend: {
      loadPath:
        "https://qipcgolampmdkhplcnbk.supabase.co/storage/v1/object/public/Images/Translations/{{lng}}.json",
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng", // Specify the localStorage key
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
