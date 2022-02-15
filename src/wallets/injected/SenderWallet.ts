import isMobile from "is-mobile";
import { updateState } from "../../state/State";
import InjectedSenderWallet, {
  GetRpcResponse,
  RpcChangedResponse,
} from "../../interfaces/InjectedSenderWallet";
import { Options } from "../../core/NearWalletSelector";
import ProviderService from "../../services/provider/ProviderService";
import { Emitter } from "../../utils/EventsHandler";
import { logger } from "../../services/logging.service";
import { setSelectedWalletId } from "../helpers";
import {
  AccountInfo,
  InjectedWallet,
  InjectedWalletType,
  SignAndSendTransactionParams,
  WalletOptions,
} from "../Wallet";

declare global {
  interface Window {
    wallet: InjectedSenderWallet | undefined;
  }
}

class SenderWallet implements InjectedWallet {
  private wallet: InjectedSenderWallet;
  private options: Options;
  private provider: ProviderService;
  private emitter: Emitter;

  id = "sender-wallet";
  type: InjectedWalletType = "injected";
  name = "Sender Wallet";
  description = null;
  iconUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAEOCAYAAAB4sfmlAAAACXBIWXMAAC4jAAAuIwF4pT92AAAd70lEQVR4nO2dbXAVZZbHn3GdmvkAJlP7RbICCSsgulUGxNGq3QrxJUzV6gzoCEqBGnVT46hVhMDofAByUat2dABjFczEiTqJQjHjC4LKfiC8BD6MyJukanwBdoCAIh92a3KRD7tbtZutE59uup/0vf302/PS/f9V3eJ2uH27++nb/z7nPOec/s7IyAgDhaSWMdaY8MCPMcaG8fMpHlcWfQByiCMI9fzlFQhanpzRIZe5kBBn+GuY/81ZBjkBFoe91HNBcF4kEHMMP5pBLiYDXEiOecQGWASEww4ckWjm/5ouEFEZ5GJyDGJiBxAOM3FEwhGKrNwLUyl7hGQbhMQ8IBxmQG7GfI9YFE0ownCEZIALCeIlmoFw6MOxKloZYzcWdRBiMsQFpBfWiB4gHGpp5EIxH1ZFagx5LJFtOTkm44FwZE89F4p2iEXmwBJRBIQjO1r5K28zILYwyAWkF0lq6QPhSJd6blmQYNTk6cAsp48LyEDRByItIBzp4LgisC7MhlyZEndnYIUkAMIRH2cKtYTYhXXQ9G4Xf0FAYgDhiE4tty7a4Y7kgj4u/sgNiQCEQx4IRr6BgEQAwhEOBKNYQEAkgHBUBoJRbPr4uUcMJAAIRzCtCHoCBFErA+Hw08x/JKgdAV6cadxejMq3QDi+pZYLxsMm7Awwln3cfSl8OvsVBuyDbtp5IAyiAcKgBL9P+E2mtsijVWSLo5GbnnBLQByG+E2nkBW5RbU4SvzOAdEAcaHA+XtcOApnfRTN4oCVAbKgzGfiCmN9FMnigJUBsqKmaNZHESyOen5CIRhABWVe/JjrEv68WxytfOoMogFUQdbHXm7h5pa8WhzIywAmMMitj9zVveRROBAABSaRS9clb66Kc4IgGsAUcum65Ek4SjyyjUpWYCKdeZp1yYOrUstdk3kG7AsAYeQi7mG7cGCqFdhImVdiW1ssZ7Or0oipVmApNTwZsdXWA7BVOJwgKOIZwGZ+zwvlrMNGV6WVDzhQxNlzX7Lz5792NzZ+/Dh2w/UzMPzp0Web9XGlAfsQBYiGIvp37WH79+9nmze9yU6fPhW40Ucfa2NNTXPY/Hk/ZjU1V+VwFJThJCpaIx42WRyUCbrUgP3INSQYv37xBdbfv1P6MBsaprDlK55mSxYvgoAkwxrLwxbh6EX6eLaUyxdZZ2kNe7lrfezttLTMZS91dcGNScYgn3ExujmyDcIB0cgYEo1/aWtj77z9lm9DZEksXvIgu/baqWz69Gmsrm7C6N8p3nHkyFHW87vfssHBwTE79+7W7ezee36Sg5HRhvniQcJh8Kt3BGTK8HB55L4FC+nu4Xtt2Ng9+n/VaGmZO2Y95/XRgYM4cck4NjIyUmvqtQnRKDhL2zt8FzyJwZ8//Sx0UEhYvOuJ4tPQMGVk6Oy5og9vUowVD1NFo8vu820HO/t3jxGNMCuDIEEgYRDXW7mq0/d9jz7WVvQhToNtEA65V6v959p86EIXXQ0ZS2MkwEohAXIQLQ+4LKnQC+Go/oJoKEJ0NWhZBhKCalYFWSPe/yeRAalglHiYJBrz8ftSg3hxk+Uhi4yVIrosMu4PkKJkyvVqSq1KI57LqY7161/ybesXTz8jte2+Nzb7EsN+9cLawJyNpqYm3/LBQ4fNHhB76DQmQcwA9aonlxs3HDWEuRqVIKvBGxCl99UsiThuEJCmuegWRy3vp4EqV0WsXrXSt6HOztVSG167br2vZmXtupeqppdTHYvDpUuXzB0QO9nGrXRt6BYONBVWyMbfvOJzNTZs7GaTJl4TugMHPj7Enn9ujbt834KFkTJDT5w4buyYWEqN7jaEOoWjC+3+1EFp5evWvuhuj9LJqShNhp6eHt+nli9fEWm/x48fb9FIWcNknY+c1CUcrah0VUtUV8Nh63vvs9dfuywcK1d1sltvuTl0vXNnh9z3U6dOM358LGUOvwGrR0NgpRHBULWoCog6iNO9727dbtmIWUdr3oOjTkdyBEMVsm7dWt/GOjqWSW28+5Uen5XSWXpWykrZu3efb3n27FmGjUju6FIeLFWsVNuKfmtQTW/fJt/dn5KzZEgrSSzKeiARSgviVIpGO34XaonrahDkzsSpORFT2eGmKEVZWroq0UBcQwO/emGt7yIm60MGsWpWtt6kUtUsUMr8PAnHMfx21EI1JGK/DBnEqtkofTWqVc0CZQzzbGzrhQO9NTSQlquRVtUsUMqA7cLRjN+LeiiuoNrVEPtwyPb2AJnRbqtwUIT3DH4XatHhaogzNxRbAUbQaKNwwEXRgGpXI8nMDciczFyWrEQDLooG0mzQI2uliE17MP1qHJm4LFkJB2ZRNJBWQFTW1RCtFNmZG6CUTGZZshCNEn4X6tHhasQVKqCc1Dulpy0a6OalCdWuhjhzI5vKDrSRamJY2sKBWhQNICAKJDiTZi1LmqKBgKgGdOReiKns6ClqDal1SU9TOJCzoQHVrkaSmRugndQCpWmJBipfNYCAKIhBKhW0aYhGLQKiekjL1ci6ahYYR+LHK6QhHJh+1UDcNG8dVbPAOBJnlMLasBATGvQgIGo9iayOpMLRW/TR14EYEEWDHhCDRFZHEtGox9lSDxr0gBSJbXXA2rAMNOgBKRLb6oC1YRE6ci/iprIDa4hldcQVDvTaUEyaAVE06AEeYlkdcUQDMykaQD0KyJDIVkcc4UDehmLQoAdkTGSrI45wwNpQDAKiQAGRaliiikYrzqBa0sq9iOJqiKnsqEcpBJFqWKIKB1oCKgYNeoAihqP064giGui3oRjxIkZAFGSMdGPjKyI82L41w4fmgwC6f7vR/WNDwxS2ZPEiqWFat26tb7mjY5nUet2v9LDTp0+5y52lZ1lNzVU4NcWhXfpIJRWmFlKvlrjWRlpVs2jQU1ikpmZlLQ5YG4rZseNDd4Oy1ka5fJGtKa32rff4z9qkdnz9+pd8y88+97yhIwMyRu5aR1DUPMS8DVmrAQ16QEqEBkllRKMRZ0MtogDIzKSIYoMGPSABrWm4KnBTFLN71053g48+1sYmTbwmdAd6el71LS9fvkJqpzdt3sL6+y9vb/mKp6W2B3JNeJBUwuJA93KFiEFKmfwL0dqQnX5Fx3JQhaqZpGEWx3zG2GTcXNQxMLDft607bm8O3faWLX/0Lbe1xQuI/uLpZ8wZCKCb+dW2LyMcQCFHjx5xN3bfgoVSeRSia3PrLTeHrnPg40Ps5a71vvVa7rwdpxo4VA1RQDgM4/XXetwdam4Ov5D7d+3xxSjuuutuqQNavWqlb7mzc3XFz4JCciNjrL7SgVcTDrKRa/CbUQdZAV5uumlW6LaPHv3Etyzj2mx9732f2GzY2I2AKAiiouFQTThgbSjm+PETvg3OuG566A4cPnzQfb+0vUPKtYmbyg4KR0V3BcJhEBcuXHB3pqVlbqgIUKboO2+/5S7PnBluoYiuDepRQBXIXakN+u9KwlGP2RT1nDhx3N3mxEnhw//5F8d9y7NnhwvH/v2XZ23I2pg/78dmDwrQTaABUUk4YG1o4OLFsrvRWbNuCt2BI0eO+pZvuH5G6DqbN73pvl+85EFYGyCMSMIRHmEDqeN1O2S4dOmS+ymaug3j7LkvfWXzMq4NKDyBWlBJOOYVfbR0M2HChNA98Lo2V10VPgF2/vzXvmUZ1wYUHvphNYqDECQcsDYMoK4uXDi81NXVhX5GdG0wBQskGaMJEI6ccPXV0YSGZm0AkGRMnAPCUVBkZm0A4MwRByJIOMZ8COSPvXt246yCKPjiHKJwwNqwlAsXvo60497ZFQAk8GmDKBxjoqdAD+IMSBjnz58P/YxY+/LpZ5/j7AJZqgoHLA5D+PrrcOHwJomdOzsU+nlxpub48ZPWjg9QTlVXBRaHRqgnhoM3uasS48aNc//HW39SCZp+9c6m7N+/L4/DCLJhsrduRRQOhNoNwZvcVYnp06f5/kcsyw/ijjsvCwc18qFsUgAkcQ0Lr3DATdFMVNdD7PQlJngFcffd/+z76wcf7LBzsIAOXI3wCgfcFM1408zJ9aCy+TC8NSretoOVoEI47zrr1r4IqwPI4nYE8wpHxTZhQA3Tp0/1befgocOh2509+4fue2o7KCM2ixYtdt/TtKzYtBiACgS6KrA4NCOWxYttAYMQXY9t2z8IXefee37iC8RSrKPvjc12DhpQyY3OtiAchkHt/xy8bQErQWLjnSnZvOkNqQOiJ9hTIx+H1oeXjPYiBSCEUc/EKxxoTGwA3h4Z1J9DJv6weMlD7nuKjcjMrpDgrF3nd1F+eu88iAcIwyccmFExhNtu85cK7d0bnmtB7f+81kNPT0/VzzuQy7JyVafvbyQeL7y4TipWAgrJqFb8TalUYtxNeQC/A/1QK78//ekjdurUX0b35crvXskWLlhQdb++//3vsf/4z7+6CV2ffHKU/eM/NbG/n9IQejy339bM/vf//Mlgu3btHJ3anTrtOnbNNX9n94CCtKEfyoDzLMgSHqJpDr19m3zPdKXnyYZBz4GlJ817nwNLT6KXRdym86In50f5HpB7BrzPjg1sgQ70ILorf/jDH0P3g9LJ6UnzDhTr6H5FzmUhHn5oMfvowMExDX5++cwKNnPmzNHHKgDgwi2OAdwozGJpe4fvzi971ydLw7vezv7dkY6LtkNWRpD1QfsE6wOQZkA4DOWjAwd9F+2Gjd1SOyquR+6LjKsT9D33LVg4Rjzo+8itAYXGFY7hoo+EiXgvXLpgZe/2JDLeiz1qvKPadzmvRx9rG42rgEJS78yq/CucN/P4wQ/+lr355rcJXcPDf2VXfvd7o7MgYfzw5tlsuPwN+/jAR6OfpBmaf//LKfajuT8anYGJAn3XgoX3s//67/8Zna1xoPfbt21nV373+6OfAYViu2NxAEOhO3vUGZYRHqsQXQ1ajuO2OJCL4p25Set7gXU0k2g04ryZixizoItUliDxoAufvjMu5J6IYuaNwyB4WghaSTiaiz4KprNyVWesQOlIBfGI+h1B0GxNkPVB8ZQkwgSsoAThsAC6+MWLNIprUEk8kroY9L3itDESxwoBhMMW6A6fdKakUn5GUuuDLAwxfwTWR64ZFY7Woo+CLYguS5R4h0NWLka1xDH6O8gVJdSpWESQy0FiEpUsXYxK1gftN1yX3NAL4bAMsZgtrniMcOujkosRNVVdJMj6iJvFCoxjAMJhIXTxpSUeWdamkPUh7ifEIxdAOGzl3a3bx1zoccVjpIqLQRd6EuuDLKSgXBKIh9VAOGwmSDwoOSuJlZBFbUpQTAXiYTUQDtsJEo+k+Rm0bhaVseKsEMTDWiAceaBSLCFp+TtZH0FTt2R9xL3gg8QDsy3WAeHIC5WshKTl72G1KXFIIx8FaAXCkScq5WekYX2kWRkblI+CJDGrgHDkkUoXeVLro1riWFRhCqq/SZo7ApQB4cgrWbgYDpXS1skFiRKvCGpziHiHFaDILe9k1XynkvURNbVcnP5NkosClAHhKAJkfWRVm0LTwaIwRRUPMd6BilrjgXAUiawqY4NS4KOIB62PWRargHAUDbqYxenQuDEKL0HiQVaOLGK9DFkywFjaSThqcX6KRxa1KUHiIRuIFWdZaN+AsTSjy3mByaIyNkg8ZN0gMVCK6VljgXCA9GtTxPoZ2TaHotVB08nASFzhOIbzA9KsjBUtGVmXRVwPT4szEjw7Fvgh6yMocYwsgSgBS7IexBiKjAjQZ5CKbjzsCv7cumE8wQ8QN1w/g7326u9Yb98m1tAwxR2T06dPsZ/eO4/1vbFZapxqaq5izz73vO9vPT2vhq43aeI17NHH2tzl3bt24ryYxdDo3nCLA2nnYAyV0tajpKyL68tYHWKMBD07jGIAFgeoCt39yfrYsLHb97GnnnycbX3vfanBa2tr8y1v2fLH0HXuuN3/YO0PP/w3nChzOEN74gjHsaKPBqjMk0/8jL27dbvv/1csX8Y+/ezz0FG79Zabfa7HK92/CV2H3Jyl7R3u8uHDB3F2zMEnHGeKPhqgOvfe85PRuIcDxTxKpZLUqN11192+9fp37QldZ+bMWe77d95+i5XLF3GGzGDUyIBwAGkefmixzxKgC1rGZSHR8QZa9+/fH7rO7NmzfMsHDx3GiTKD0bDGFZ5dGSzwYABJ1pQ6fSLQ/duNUisuXvKg+37zpjdDP0+zO15OnDiJU2QGA0wQDlgdIBSKPyxf8bT7sf7+nVJWR1NTk/ue3BWZ+Ig3NnL06BGcHP0MOXvgFQ4ESIEUSxYvElyPfaGr/fDm2b7lw4ePhq4zbdp09/3Fi2WcHP24xgWEA0SGrI6fPf6Eu9rLXetDg5e0TkvLXHf5woULoZsdN26c+57iKUA7A84OQDhALObMafKt9vkXx0O/5vob/sF9f+JE+OdvuskfIMXMinYCLQ76I+xBIAXlZ3g5ciTc9Zg6dZr7/tzZoaqfDUJGnECmuMbFFcJWYHUAabzBywsXvo40cBRUDaOubgJOhllUFI4Bg3caGMb48ePdHTp//nzozomuRxiU8g6MwRcBh8UBYuN1PUDu8RkVEA4AgAw+bRCF44w3yQOAapw8eQLjUxyqWhwMcQ4gyzfffON+0hvvqITMzIsXTL8aw6DYegPCAWLz+ms97qpR4x3eZLBKYPrVGMZoAoQDxOLAx4d8q02bNjX0a7yuzcRJkyNvFtOz2pASDsQ5QCj79vlL48ValCC++upL9691dXWhnz9+3B9DwfSsNqSEg9iWz+MHaUCxB28nL+rRQbUo1aB1vPUm114bbqFcunTJfS/j2oBMGBPfYFWEA+4KqMimzVtGS+MdmprmhA6W2IhHbNQThLeUPo5rA1Ih0IiAxQEiQZbDurUvuquQJUAdvsLwdv2iknyxUU8Qe/fsdv86a9ZNOFF6iCQcxPYq/wcKSmdpjc/aePznT0oNhLfrl7cbWCWo0Y93OzLBV5A65UpJodWEA1YH8EFNhqn3hgMVuclYG9QhzO/aNFX9PAto9DN9OtLbNVBRAyAcQApyUX794gu+j3Z0LJNad8eOD9335Ka03Hl76DqffHJZOMgdwoyKFmIJx7BYEQeKS/crPb5SeHpIk0ycgvI9vIli3s5hlSCR8lo2d9yJGRUNlOMKB4PVARiPN/zymRXuWJAFQH1HZejp6fF9atGi+0PX2r3HP6k3a9ZMnAf1VL32w4Sj1+IDBykhPniJHiYdlrfBeEzEa22sXNUp5XJ4mx/LujYgdaobDfyh09Ve24r+lN0i09u3yfcA6JWrOqVGY3i4PNLSMjfyA6fpM3G2B1JlOEwXwiwOBneluJw99yVbU1rtHj/d/Vcs75Aaj6CYiIy18cEHO3zLDzwQ7tqA1An3NCQsjlquQKBgPPpYm+/u/+7W7VID8OdPP/OtR5YHWSBh0GcaGqa469H2gRYa07A4hmF1FA8xPiGbs8ESxETEVHbvw6qBMoakOgFKWByMKxAoCOKdn97LxCeIDRu7Y8dEvNskKwVooV1GE2QsDsYVCKX2BYHiE947Pz0rViY+QTERbx1LlJjI2nXrY6Wyg9SRm0mVtDjo1YobQP756MBBn8Vw34KF0secVkwkyjZBqvTK6kEU4UCQtACIU6gkJDLs7N/tWy9KYJOEIs42Qeo0ZyEcjCsSyClifOJXL6yVOlAdMRGQOseiaEFU4ajH+conYuKV7BQqQRe7d10SAxlom6LgyG4TpE5rlsLBkEmaT8T4BLkeMuiIiYDUORNVB+IIRzPOW74Q08qXtndIH5+OmAhInZIK4aDXAM5dPkgzPqEiJgJSZ5hPfCgRDlgdOYGsC+/FT9aHDDpiIiATIlsbSYSDcb8IWEya8QkVMRGQOrGsjaTCgYQwiwkqe6dELBl0xERAJsSyNpIKB+Nzv8BCKB4Rx13QERMBmRDb2khDOBDrsJC4Ze8jCWIiSbYJMiG2tZGGcDDMsNhH3BRvMT4RZQo1bkwEZEIiayMt4YDVYRFx4xO6YiIgExJZG2kJB0M2qR0kSfHWERMBmRA5SzRL4UANiwWobgU4kiAmAjIjUk1K1sLBuPkDDEVH2XuSmAjIhIG0rvc0hQP9OgxFdBeY5KMKRjTFREBmhDYh1iEcDElhZhI3PqEjJgIyoyvNaz1t4WCYnjULE1oBImdDO4mnX1UIBzqiG0Tc+ARaAeaKVAKiWQsHQ6DUDNIqe08SE0ErQO2kFhBVIRwM1bN6EcveVcQn0ArQOIZ5qoRVwoGMUo2gFSCQfbiSacLBeCQXKIYuWNVl72gFaByZuCiqhKMWpfdqMaEVYJSYCMiEzFwUVcLBMMuilrRaASJnw2oyc1FUCgfDLIsa0AoQ8ILTzK9pVcLBkBiWPXFTvHXEREAmnEk70csE4UAtS4aId34dj29EK0DtSD/71SbhYJiizQ7xkQNZl70niYmATEjcnMdk4WCId2SD12WQzdbUERMBmaAkrqFbOBg6hqUL3emjJl6hFWBuUBbX8L6uYHpoZYwNatp27vj8i+O+Q6qrmxB6iJs2b2H9/Tvd5Q0bu9kN188IXa9cvsjWlFa7yw0NU1hHx7JCj79Gyoyx+YyxYdW7oEs4hrl4lDVtP9fMuG561cP79LPP2VNPPu4ut7TMZUsWL5Iaks7SGnb69CnP8rNs0sRrij7kumhnjB3TsW1dwsH4Abdq3H5u+fKrr6oeWqlU8i0/+9zzrKbmqtDhOPDxIfZy13p3+b4FC9nDDy0u+nDrYg1jrFfXxnUKB7GNMfaI5n2wnvHjx/kO4ZtvLlU8pL43NrN33n7LXV7a3sFuveXm0CEgF2X1qpW+v4kCBJTRR8Ovdbg1BUfFV2/RI1xJkUn5TlL2LuZsIK1cG8dMuGZ1WxwOrVxFQUzIbXAYGNgT+CXr1780Jj4h46IkiYmAVKEJhWYjhtQQi4OhkjYZ4hSpmPqNVoDWk3nFa5SXScIB8UiAmMnpTebS8XgEkCrDaT7aII/CAfFIgFje7mSQxi17F7uVI61cC8aJhqnCwbhJhoK4iARZFj9/4infMmWLykCiIX4XWgEqx0jRMFk4GB8wiEdExPoT8SUTnyD3RBQNdCvXgrJq1zwJB8QjJmJ/Dee1YOH9FWMbZK3QemL9ihMvgYuinNSfhZLm6zuj6mE2jTTDyBirMX1HTWLre++zFcuX+aZfHWg6deKkye7yxYtlX1KYl5WrOtmK5R1S07YgFco8PWGbycNpg3AwLh6UXnujAftiDZR/Qbkbr7/WE3mXqXiN8jyQUq6UMs/T0FJ/EgVbhIOo5ZYHxCMiZH3s2PGhlICQNTJv/r2jCV6wMpRijWgwy4SDQTyScfbcl+zw4aPs5MmT7MSJy6X4dXV17OqrJ7Dm5iap0nqQOlaJBrNQOBgXD3Jb5hmwLwAkZZD31Dhj00jaKBwOJB4Pm7ErAMTCqT1R3ognKaYUucWhlfckAMBG+mwVDWa5cDDek+ARdBIDlrGG3/isFA1muaviBbkewAbKvN2fts5daZEX4WCYcQGGM8SDoNbMnFTDdlfFyzC3PF42Z5cAGGUf/23mQjRYzoTDgUzBexD3AIawxuYgaCXy5KqI1PN8f7guQAfOM08G8jj6ebQ4HM7AdQGa2MdvXLkUDZZz4XAg1+U2uC5AAfQbW5ZH10Qkz66KCFLVQZYM8tyM3ARAq1EEi8NhmPucCJyCtFmTt1mTMIpkcXiB9QHSYJ/O57fqpEgWhxfH+riNJ+YAEAVvLKNwosEKLBwOA9zERLEckIWK02jGpKvII1ZUVyUI58cA9wUEMcjdktxOsUah6BaHlzMe92XQnN0CminzCuxGiMZlIBxjcdyXRxD/KDRl7sLW56GaNW3gqlSnlpun7SjZLxR9/JznOokrCRAOOSAgxaCPN4eyqv+nDiAc0YCA5BMIRkQgHPGo5YFU+rFNzmIDIHPKfBatCy5JdCAcyWnlrzm2H0hBGOKCvw2CER8IR3o0chcGj2wwk+18dsToZ7LaAoQjfWo9VgiaCOlliItFL+IX6QLhyJZGj4ggmKqOPm5ZwLrICAiHOuZ7XhCR9NnuEQvELjIGwqEHiEg6QCw0AeHQTzMXkGbEREIZ4iUBcEM0A+Ewi3ouIM6r6DkiZS4UjlggwGkIEA6zcYSksSAWiWNRHPP8CwwEwmEfjpA0cmGxNfFskAvDGY9IIE5hCRCOfFDPX408j6SZH5VuURnkYuCIwoBnGVgMhKMYOIJSy987OIITB1EAvBYDGt7kGcbY/wO1XaOacajxrAAAAABJRU5ErkJggg==";

  constructor({ options, provider, emitter }: WalletOptions) {
    this.options = options;
    this.provider = provider;
    this.emitter = emitter;
  }

  isAvailable = () => {
    if (!this.isInstalled()) {
      return false;
    }

    if (isMobile()) {
      return false;
    }

    return true;
  };

  private isInstalled = () => {
    return !!window.wallet;
  };

  init = async () => {
    await this.timeout(200);

    if (!this.isInstalled()) {
      throw new Error("Wallet not installed");
    }

    this.wallet = window.wallet!;

    this.onAccountChanged();

    this.wallet.onRpcChanged((response) => {
      this.networkMatches(response);
    });

    return this.wallet
      .init({ contractId: this.options.contract.accountId })
      .then((res) => logger.log("SenderWallet:init", res));
  };

  signIn = async () => {
    if (!this.isInstalled()) {
      return updateState((prevState) => ({
        ...prevState,
        showWalletOptions: false,
        showSenderWalletNotInstalled: true,
      }));
    }

    if (!this.wallet) {
      await this.init();
    }

    const rpcResponse = await this.wallet.getRpc();

    if (!this.networkMatches(rpcResponse)) {
      return;
    }

    const { accessKey } = await this.wallet.requestSignIn({
      contractId: this.options.contract.accountId,
    });

    if (!accessKey) {
      throw new Error("Failed to sign in");
    }

    setSelectedWalletId(this.id);
    this.emitter.emit("signIn");
  };

  private timeout = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  private networkMatches = (response: RpcChangedResponse | GetRpcResponse) => {
    if (this.options.networkId !== response.rpc.networkId) {
      updateState((prevState) => ({
        ...prevState,
        showModal: true,
        showWalletOptions: false,
        showSwitchNetwork: true,
      }));
      return false;
    }
    return true;
  };

  private onAccountChanged = () => {
    this.wallet.onAccountChanged(async (newAccountId) => {
      logger.log("SenderWallet:onAccountChange", newAccountId);

      try {
        await this.signOut();
        await this.signIn();
      } catch (e) {
        logger.log(`Failed to change account ${e.message}`);
      }
    });
  };

  isSignedIn = async () => {
    return this.wallet.isSignedIn();
  };

  signOut = async () => {
    const res = await this.wallet.signOut();

    if (res.result !== "success") {
      throw new Error("Failed to sign out");
    }

    setSelectedWalletId(null);
    this.emitter.emit("signOut");
  };

  getAccount = async (): Promise<AccountInfo | null> => {
    const signedIn = await this.isSignedIn();

    if (!signedIn) {
      return null;
    }

    const accountId = this.wallet.getAccountId();
    const account = await this.provider.viewAccount({ accountId });

    return {
      accountId,
      balance: account.amount,
    };
  };

  signAndSendTransaction = async ({
    receiverId,
    actions,
  }: SignAndSendTransactionParams) => {
    logger.log("SenderWallet:signAndSendTransaction", { receiverId, actions });

    return this.wallet
      .signAndSendTransaction({ receiverId, actions })
      .then((res) => {
        if (res.error) {
          throw new Error(res.error);
        }

        return res;
      });
  };
}

export default SenderWallet;
