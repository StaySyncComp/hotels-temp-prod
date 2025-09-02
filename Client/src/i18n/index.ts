import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      fallbackLng: "he",
      debug: true,
      load: "all",
      supportedLngs: ["en", "he", "ar"],
      nonExplicitSupportedLngs: true,
      backend: {
        loadPath:
          "https://qipcgolampmdkhplcnbk.supabase.co/storage/v1/object/public/Images/Translations/{{lng}}.json",
      },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        // Ensure detector respects supported languages
      },
      interpolation: {
        escapeValue: false,
      },
    },
    () => {
      const supported = ["en", "he", "ar"] as const;
      const resolved = (i18n.resolvedLanguage || i18n.language || "").split(
        "-"
      )[0];
      if (
        !resolved ||
        !supported.includes(resolved as (typeof supported)[number])
      ) {
        i18n.changeLanguage("he");
        try {
          localStorage.setItem("i18nextLng", "he");
        } catch (e) {
          // ignore
          console.log(e);
        }
      }
    }
  );

export default i18n;
