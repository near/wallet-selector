import en from "../locale/en.json";
import es from "../locale/es.json";
import fr from "../locale/fr.json";
import de from "../locale/de.json";

const getLanguage = (languageCode: string) => {
  switch (languageCode) {
    case "en":
      return en;
    case "es":
      return es;
    case "fr":
      return fr;
    case "de":
      return de;
    default:
      return en;
  }
};
export const translate = (path: string) => {
  //solves case of multiple dots in string
  const [key, ...rest] = path.split(".");
  const value = rest.join(".");

  let lang = window.navigator.languages ? window.navigator.languages[0] : null;
  lang = lang || window.navigator.language;

  let shortLang = lang;
  if (shortLang.indexOf("-") !== -1) {
    shortLang = shortLang.split("-")[0];
  }
  if (shortLang.indexOf("_") !== -1) {
    shortLang = shortLang.split("_")[0];
  }

  //preferred language
  let selectedlanguage = getLanguage(shortLang);

  //when specified language translations not present then fallback Language is loaded.
  // @ts-ignore
  // eslint-disable-next-line no-unused-expressions
  !selectedlanguage[key][value] && (shortLang = "en");
  selectedlanguage = getLanguage(shortLang);
  // @ts-ignore
  return selectedlanguage[key][value] || path;
};
