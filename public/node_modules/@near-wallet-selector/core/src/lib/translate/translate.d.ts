export type SupportedLanguage = "en" | "es" | "zh" | "bg" | "ko" | "vi" | "hi" | "ar" | "hr" | "mk" | "sl" | "sr";
export declare const allowOnlyLanguage: (langCode: SupportedLanguage | undefined) => void;
export declare const translate: (path: string) => string;
