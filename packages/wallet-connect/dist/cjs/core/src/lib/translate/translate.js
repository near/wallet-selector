"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = exports.allowOnlyLanguage = void 0;
const en_json_1 = __importDefault(require("../locale/en.json"));
const es_json_1 = __importDefault(require("../locale/es.json"));
const zh_json_1 = __importDefault(require("../locale/zh.json"));
const bg_json_1 = __importDefault(require("../locale/bg.json"));
const ko_json_1 = __importDefault(require("../locale/ko.json"));
const vi_json_1 = __importDefault(require("../locale/vi.json"));
const hi_json_1 = __importDefault(require("../locale/hi.json"));
const ar_json_1 = __importDefault(require("../locale/ar.json"));
const hr_json_1 = __importDefault(require("../locale/hr.json"));
const mk_json_1 = __importDefault(require("../locale/mk.json"));
const sl_json_1 = __importDefault(require("../locale/sl.json"));
const sr_json_1 = __importDefault(require("../locale/sr.json"));
const getLanguage = (languageCode) => {
    switch (languageCode) {
        case "en":
            return en_json_1.default;
        case "es":
            return es_json_1.default;
        case "zh":
            return zh_json_1.default;
        case "bg":
            return bg_json_1.default;
        case "ko":
            return ko_json_1.default;
        case "vi":
            return vi_json_1.default;
        case "hi":
            return hi_json_1.default;
        case "ar":
            return ar_json_1.default;
        case "hr":
            return hr_json_1.default;
        case "mk":
            return mk_json_1.default;
        case "sl":
            return sl_json_1.default;
        case "sr":
            return sr_json_1.default;
        default:
            return en_json_1.default;
    }
};
let chosenLang;
const allowOnlyLanguage = (langCode) => {
    chosenLang = langCode;
};
exports.allowOnlyLanguage = allowOnlyLanguage;
// (i.e en-CA returns just en)
const shortenLanguageCode = (lang) => {
    return lang.indexOf("-") !== -1 ? lang.split("-")[0] : lang.split("_")[0];
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const findObjectPropByStringPath = (obj, prop) => {
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
const translate = (path) => {
    let browserLang = window.navigator.languages
        ? window.navigator.languages[0]
        : null;
    browserLang = browserLang || window.navigator.language;
    const languageCode = shortenLanguageCode(chosenLang || browserLang);
    const selectedLanguage = getLanguage(languageCode);
    const text = findObjectPropByStringPath(selectedLanguage, path);
    return text && typeof text === "string" ? text : path;
};
exports.translate = translate;
