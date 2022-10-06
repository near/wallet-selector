// import en from '../locale/en.json'
// import es from '../locale/es.json'

var en = require('../locale/en.json')
var es = require('../locale/es.json')

const getLanguage = (languageCode: string) => {
  switch(languageCode) {
    case "en":
      return en;
    case "es":
      return es;
    default:
      return en;
  }
}
// @ts-ignore
const translate = (path: string) => {

    //solves case of multiple dots in string
    const [key, ...rest] = path.split('.');
    const value = rest.join('.');

    let lang = window.navigator.languages ? window.navigator.languages[0] : null;
    lang = lang || window.navigator.language;

    let shortLang = lang;
      if (shortLang.indexOf('-') !== -1)
        shortLang = shortLang.split('-')[0];
      if (shortLang.indexOf('_') !== -1)
        shortLang = shortLang.split('_')[0];

      //preferred language
      let selectedlanguage = getLanguage(shortLang);

      //when specified language translations not present then fallback language is loaded.
      !selectedlanguage[key][value] && (shortLang = 'en') ;
      selectedlanguage = getLanguage(shortLang);

  return  selectedlanguage[key][value] || path;
}
// @ts-ignore
export default translate;
