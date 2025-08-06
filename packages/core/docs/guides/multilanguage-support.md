 #  Multilanguage support

- Languages are detected from browser language settings.
- If user preffered language is not supported, english is rendered as default. 

## Supported languages
- English
- Spanish 
- Chinese
- Bulgarian
- Vietnamese 
- Korean
- Arabic
- Hindi


 ## How to use

- Language files are located in locale folder in `packages\core\src\lib\locale`
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
- Language files are located in locale folder in `packages\core\src\lib\locale`
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

- When new language is introduced it must be added to `packages\core\src\lib\translate\translate.ts` 

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

- Supported language should be added to **Supported Languages** [list](https://github.com/near/wallet-selector/blob/dev/packages/core/docs/guides/multilanguage-support.md#supported-languages).

- Pull request title should be named as **"Add support for `LanguageName` language"**.
