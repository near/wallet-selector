import en from "../locale/en.json";
import es from "../locale/es.json";
import zh from "../locale/zh.json";
import bg from "../locale/bg.json";
import ko from "../locale/ko.json";
import vi from "../locale/vi.json";
import hi from "../locale/hi.json";
import ar from "../locale/ar.json";

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
    default:
      return en;
  }
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
  let lang = window.navigator.languages ? window.navigator.languages[0] : null;
  lang = lang || window.navigator.language;

  const languageCode = shortenLanguageCode(lang);

  const selectedLanguage = getLanguage(languageCode);

  const text = findObjectPropByStringPath(selectedLanguage, path);

  return text && typeof text === "string" ? text : path;
};
