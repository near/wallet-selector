import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'

import en from "../../locale/en.json";
import es from "../../locale/es.json";
import de from "../../locale/de.json";


const detectionOptions = {
  order: ['navigator'],
}

i18n
.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: detectionOptions,
    fallbackLng: "en", //when specified language translations not present then fallbacklang translations loaded.
    debug: true,
    resources: {
      en: {
        translation: en
      },
      es: {
        translation: es
      },
      de: {
        translation: de
      }
},
    react: {
      useSuspense: true
    },
  });

export default i18n;
