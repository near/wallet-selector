import en from "../locale/en.json";
import es from "../locale/es.json";
import zh from "../locale/zh.json";
import bg from "../locale/bg.json";
import ko from "../locale/ko.json";
import vi from "../locale/vi.json";
import hi from "../locale/hi.json";
import ar from "../locale/ar.json";
import hr from "../locale/hr.json";
import mk from "../locale/mk.json";
import sl from "../locale/sl.json";
import sr from "../locale/sr.json";

const getLanguage = (languageCode: string) => {
  switch (languageCode) {
    case "en":
      return en;
    case "es":
      return es;
    case "zh":
      return zh;
    case "bg":
      return bg;
    case "ko":
      return ko;
    case "vi":
      return vi;
    case "hi":
      return hi;
    case "ar":
      return ar;
    case "hr":
      return hr;
    case "mk":
      return mk;
    case "sl":
      return sl;
    case "sr":
      return sr;
    default:
      return en;
  }
};

export type SupportedLanguage =
  | "en"
  | "es"
  | "zh"
  | "bg"
  | "ko"
  | "vi"
  | "hi"
  | "ar"
  | "hr"
  | "mk"
  | "sl"
  | "sr";

let chosenLang: string | undefined;
export const allowOnlyLanguage = (langCode: SupportedLanguage | undefined) => {
  chosenLang = langCode;
};

// (i.e en-CA returns just en)
const shortenLanguageCode = (lang: string) => {
  return lang.indexOf("-") !== -1 ? lang.split("-")[0] : lang.split("_")[0];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const findObjectPropByStringPath = (obj: any, prop: string): unknown => {
  if (!obj) {
    return "";
  }

  const _index = prop.indexOf(".");
  if (_index > -1) {
    const currentProp = prop.substring(0, _index);
    const nextProp = prop.substring(_index + 1);
    return findObjectPropByStringPath(obj[currentProp], nextProp);
  }

  return obj[prop];
};

export const translate = (path: string) => {
  let browserLang = window.navigator.languages
    ? window.navigator.languages[0]
    : null;
  browserLang = browserLang || window.navigator.language;

  const languageCode = shortenLanguageCode(chosenLang || browserLang);

  const selectedLanguage = getLanguage(languageCode);

  const text = findObjectPropByStringPath(selectedLanguage, path);

  return text && typeof text === "string" ? text : path;
};
