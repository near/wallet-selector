# Multi-language support

- Languages are detected from browser language settings.
- If user preferred language is not supported, english is rendered as default.

## Supported languages

- English
- Arabic
- Bulgarian
- Chinese
- Croatian
- Hindi
- Korean
- Macedonian
- Serbian
- Slovenian
- Spanish
- Vietnamese

## How to use

- Language files are located in locale folder [here](https://github.com/near/wallet-selector/tree/main/packages/core/src/lib/locale)
- In order for text to be translated `translate` function should be used
  as in example below
- Can be extended when needed following `packageName.section.translationKey`structure

  ```json
  {
  "modal": {
    "wallet": {
      "connectYourWallet": "Connect Your Wallet",
      "whatIsAWallet": "What is a Wallet?"...
      }
    }
  }
  ```

- File where translated text is rendered

  ```ts
  import { translate } from "@near-wallet-selector/core";

  // Text that will be translated
  translate("modal.wallet.connectYourWallet")
    ```
  > Note: Should be used accordingly, example:
  ```typescript jsx
  // In modal-ui
  <p>{translate("modal.wallet.whatIsAWallet")}</p>
  
  // In modal-ui-js
  <p>${translate("modal.wallet.whatIsAWallet")}</p>
  ```

## Adding new language

- Language files are located in locale folder [here](https://github.com/near/wallet-selector/tree/main/packages/core/src/lib/locale)
- Files are named after ISO 639-1: two-letter language code
- Keys are named in camelCase as the beginning of the string always in English, with the following pattern used :

  ```json
  {
    "packageName": {
      "section": {
        "translationKey": "text to be rendered"
      }
    }
  }
  ```

- When new language is introduced it must be added to [translate.ts](https://github.com/near/wallet-selector/tree/main/packages/core/src/lib/translate/translate.ts) file.

  ```ts
  import en from "../locale/en.json";
  import es from "../locale/es.json";
  
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
  ```

- Supported language should be added to **Supported
  Languages** [list](#supported-languages) and type list
  .

- Pull request title should be named as **"Add support for `LanguageName` language"**.

## Set custom language
- Set the `languageCode` in the [Options](../../README.md#options) of `setupWalletSelector(options)`
- This disables language detection and allows to set only one to be used.
- The `languageCode` must be an ISO 639-1: two-letter language code from [Supported Languages](#supported-languages)
