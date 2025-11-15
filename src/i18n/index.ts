import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "@/i18n/ui";

const locales = ["en", "fr"];
const preferredLang = navigator.language.split("-")[0];

i18n.use(initReactI18next).init({
  resources,
  lng: locales.includes(preferredLang) ? preferredLang : "en",
  supportedLngs: locales,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
