import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./en/translation.json";
import translationVI from "./vi/translation.json";
import translationSE from "./se/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  vi: {
    translation: translationVI,
  },
  se: {
    translation: translationSE,
  },
};

export const defaultNS = "translation";

export enum langs {
  vi = "vi",
  en = "en",
  se = "se",
}

i18next.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "en",
  ns: ["translation"],
  defaultNS,
  returnNull: false,
  fallbackLng: "en",
  parseMissingKeyHandler: (_key, defaultValue = "") => {
    return defaultValue;
  },
});

export default i18next;
