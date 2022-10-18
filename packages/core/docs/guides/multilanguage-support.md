 #  Multi language support

- Languages are detected from browser language settings.
- If user preffered languages is not supported, english is rendered as default. 

 ## How to use

- Language files are located in locale folder in `packages\core\src\lib\locale`
- In order for translations to be used `translate` function should be used, 
  as in example below

### From locale file in `packages\core\src\lib\locale\en.json`

- can be extended when needed following `packageName.secton.translationKey`structure
  ```ts
  {
  "modal": {
    "wallet": {
      "connectYourWallet": "Connect Your Wallet",
      "whatIsAWallet": "What is a Wallet?"...
      }
    }
  }
  ```

###  In file where translation is used

  ```ts
  import { translate } from "@near-wallet-selector/core";

  // Text that will be translated
  translate("modal.wallet.connectYourWallet")
> Note:should be wrapped accordingly e.g. 
  <p>${translation("modal.wallet.whatIsAWallet")}</p>

  ```

## Adding new language
- Language files are located in locale folder in `packages\core\src\lib\locale`
- Files are named after ISO 639-1: two-letter language code
- Following pattern is used in locale files :

  ```ts
    "package name" : {
      "section": {
        "translationKey : "text to be rendered"
      }
  }
  ```

- When new language is introduced it must be added to `packages\core\src\lib\translate\translate.ts` 

```ts
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
```
