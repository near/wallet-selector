import type {
  ModuleState,
  Wallet,
  Web3AuthLoginProvider,
  Web3AuthWallet,
} from "@near-wallet-selector/core";
import { modalState } from "../modal";
import { renderWalletConnectionFailed } from "./WalletConnectionFailed";
import { renderWhatIsAWallet } from "./WhatIsAWallet";
import { translate } from "@near-wallet-selector/core";

type ExistingAccount = {
  typeOfLogin: Web3AuthLoginProvider;
  email: string;
};

const web3authLogoIcon =
  "data:image/svg+xml,%3csvg width='113' height='20' viewBox='0 0 113 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cg clip-path='url(%23clip0_1419_6034)'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M57.1647 17.2038C56.4262 17.2038 55.7492 17.051 55.1338 16.7452C54.7865 16.5688 54.4848 16.3591 54.2287 16.1163C54.0668 15.9629 53.7389 16.0669 53.7389 16.2868V16.6149C53.7389 16.7639 53.6145 16.8848 53.4611 16.8848H52.1292C51.9759 16.8848 51.8516 16.7639 51.8516 16.6149V2.87649C51.8516 2.72742 51.9759 2.60657 52.1292 2.60657H53.4549C53.6082 2.60657 53.7326 2.72742 53.7326 2.87649V7.71188C53.7326 7.93168 54.0614 8.03644 54.2237 7.88344C54.4819 7.64014 54.7861 7.43015 55.1338 7.25345C55.7492 6.9477 56.4262 6.79482 57.1647 6.79482C58.4913 6.79482 59.6127 7.29998 60.529 8.31031C61.4726 9.33391 61.9444 10.5636 61.9444 11.9993C61.9444 13.4483 61.4726 14.678 60.529 15.6883C59.6127 16.6987 58.4913 17.2038 57.1647 17.2038ZM56.8569 15.5289C57.7596 15.5289 58.5186 15.1965 59.134 14.5318C59.7494 13.8804 60.0572 13.0363 60.0572 11.9993C60.0572 10.9757 59.7494 10.1316 59.134 9.46686C58.5186 8.80217 57.7596 8.46983 56.8569 8.46983C55.9406 8.46983 55.1748 8.80217 54.5594 9.46686C53.9576 10.1316 53.6568 10.9757 53.6568 11.9993C53.6568 13.0363 53.9576 13.887 54.5594 14.5517C55.1748 15.2031 55.9406 15.5289 56.8569 15.5289ZM45.3664 17.2038C43.8894 17.2038 42.6723 16.712 41.715 15.7283C40.7577 14.7445 40.279 13.5016 40.279 11.9993C40.279 10.5104 40.744 9.27408 41.6739 8.29036C42.604 7.29332 43.7937 6.79481 45.2434 6.79481C46.7341 6.79481 47.9171 7.26674 48.7923 8.2106C49.7355 9.19799 50.1865 10.6831 50.1274 12.0338C50.1198 12.207 49.9694 12.3383 49.791 12.3383H42.5464C42.3606 12.3383 42.2101 12.4876 42.2294 12.6672C42.3157 13.4736 42.6366 14.135 43.192 14.6515C43.8211 15.2363 44.5732 15.5289 45.4485 15.5289C46.5652 15.5289 47.4581 15.0253 48.1274 14.0181C48.2168 13.8835 48.3949 13.8288 48.5431 13.899L49.6707 14.4337C49.8296 14.5091 49.8934 14.6982 49.8013 14.8449C49.3654 15.5397 48.7897 16.0934 48.0743 16.5059C47.2811 16.9712 46.3785 17.2038 45.3664 17.2038ZM42.4601 10.4377C42.3934 10.6323 42.551 10.8229 42.762 10.8229H47.7587C47.951 10.8229 48.1047 10.6628 48.0656 10.4797C47.9536 9.95417 47.683 9.51017 47.2537 9.14782C46.7477 8.69582 46.0639 8.46983 45.2024 8.46983C44.4912 8.46983 43.8758 8.68252 43.3561 9.10791C42.9442 9.45425 42.6454 9.89756 42.4601 10.4377ZM39.7005 7.48867C39.7619 7.30349 39.6198 7.11386 39.4197 7.11386H38.1171C37.9863 7.11386 37.8711 7.19762 37.8341 7.31961L35.913 13.6587C35.8359 13.9129 35.4675 13.9182 35.3827 13.6663L33.2448 7.31152C33.2052 7.19361 33.0919 7.11386 32.9644 7.11386H31.4428C31.3155 7.11386 31.2025 7.19329 31.1626 7.31085L29.0054 13.6705C28.9201 13.9219 28.5523 13.9162 28.4753 13.6623L26.5531 7.31961C26.5161 7.19762 26.4009 7.11386 26.2701 7.11386H24.9265C24.7264 7.11386 24.5843 7.30349 24.6457 7.48867L27.6967 16.686C27.736 16.8045 27.8495 16.8848 27.9775 16.8848H29.4554C29.5835 16.8848 29.697 16.8044 29.7363 16.6858L31.8893 10.1823C31.9718 9.93295 32.3346 9.93252 32.4178 10.1816L34.5891 16.6865C34.6285 16.8048 34.7418 16.8848 34.8698 16.8848H36.3687C36.4968 16.8848 36.6102 16.8045 36.6495 16.686L39.7005 7.48867ZM98.1736 16.3065C98.7205 16.7984 99.4039 17.0443 100.225 17.0443C100.768 17.0443 101.255 16.9852 101.685 16.8669C101.832 16.8266 101.906 16.6722 101.856 16.5323L101.453 15.4252C101.399 15.2768 101.227 15.2051 101.072 15.2526C101.03 15.2655 100.987 15.2778 100.943 15.2896C100.806 15.3162 100.662 15.3294 100.512 15.3294C100.184 15.3294 99.8895 15.2164 99.6296 14.9904C99.3698 14.7511 99.2403 14.3058 99.2403 13.6544V9.05878C99.2403 8.90973 99.3645 8.78886 99.5176 8.78886H101.424C101.577 8.78886 101.702 8.66804 101.702 8.51896V7.38379C101.702 7.23472 101.577 7.11386 101.424 7.11386H99.5176C99.3645 7.11386 99.2403 6.99302 99.2403 6.84394V2.87649C99.2403 2.72742 99.116 2.60657 98.962 2.60657H97.6303C97.4771 2.60657 97.3529 2.72742 97.3529 2.87649V6.84394C97.3529 6.99302 97.2286 7.11386 97.0746 7.11386H95.8663C95.7131 7.11386 95.5889 7.23472 95.5889 7.38379V8.51896C95.5889 8.66804 95.7131 8.78886 95.8663 8.78886H97.0746C97.2286 8.78886 97.3529 8.90973 97.3529 9.05878V14.2526C97.366 15.13 97.6399 15.8147 98.1736 16.3065ZM71.2202 16.0074C72.1365 15.2098 72.5947 14.2128 72.5947 13.0163C72.5947 12.2851 72.3827 11.6271 71.9587 11.0422C71.7637 10.7641 71.4834 10.4105 70.6613 9.96251C70.4876 9.86791 70.4831 9.61573 70.6474 9.50626C71.6311 8.85095 72.1229 7.85879 72.1229 6.69512C72.1229 5.59173 71.7058 4.6944 70.8715 4.00312C70.0236 3.28525 68.9774 2.92632 67.7329 2.92632C66.7346 2.92632 65.8661 3.18555 65.1276 3.70401C64.4696 4.16599 63.9799 4.75464 63.6584 5.46994C63.5918 5.61816 63.6683 5.78746 63.8215 5.85054L64.9877 6.33064C65.1528 6.39863 65.3415 6.31691 65.4156 6.15815C65.875 5.17345 66.6475 4.68111 67.7329 4.68111C68.4714 4.68111 69.0663 4.86722 69.5176 5.23945C69.9689 5.61167 70.1946 6.09689 70.1946 6.69512C70.1946 7.34651 69.9552 7.87826 69.4765 8.29037C68.9979 8.68918 68.3825 8.8886 67.6303 8.8886H66.876C66.7035 8.8886 66.5636 9.02452 66.5636 9.19225V10.2998C66.5636 10.4676 66.7035 10.6035 66.876 10.6035H67.774C68.5671 10.6035 69.244 10.8362 69.8048 11.3014C70.3792 11.7667 70.6664 12.3383 70.6664 13.0163C70.6664 13.6943 70.3928 14.2726 69.8458 14.7511C69.2851 15.2164 68.6218 15.449 67.8559 15.449C67.1585 15.449 66.5567 15.2496 66.0507 14.8509C65.6317 14.5001 65.3117 14.0241 65.0908 13.4229C65.0278 13.2512 64.8315 13.1578 64.6584 13.2279L63.5174 13.6901C63.3711 13.7493 63.2927 13.9061 63.344 14.0518C63.6629 14.958 64.2165 15.703 65.0046 16.2866C65.8525 16.8981 66.803 17.2038 67.8559 17.2038C69.1962 17.2038 70.3177 16.805 71.2202 16.0074ZM75.9436 13.8937C75.9436 13.3619 76.1966 12.9166 76.7025 12.5576C77.2223 12.1988 77.8651 12.0193 78.6309 12.0193C79.6134 12.0193 80.3936 12.216 80.9712 12.6095C81.0495 12.6628 81.0936 12.7515 81.0887 12.8443C81.0509 13.5539 80.7377 14.1763 80.1489 14.7113C79.5335 15.2829 78.8292 15.5687 78.036 15.5687C77.4753 15.5687 76.983 15.4092 76.559 15.0902C76.1487 14.7711 75.9436 14.3723 75.9436 13.8937ZM81.6874 7.89155C80.8806 7.16039 79.7797 6.79482 78.3847 6.79482C76.703 6.79482 75.4068 7.35712 74.4963 8.48172C74.3983 8.60281 74.4353 8.77782 74.5694 8.85991L75.7597 9.58843C75.8855 9.66539 76.0504 9.63156 76.1433 9.51869C76.7409 8.79286 77.5222 8.42995 78.4873 8.42995C79.1847 8.42995 79.7933 8.65594 80.3131 9.10791C80.836 9.54939 81.0211 10.0801 81.0742 10.6794C81.0925 10.8854 80.8611 11.0186 80.6648 10.9389C80.0153 10.6754 79.2347 10.5436 78.3232 10.5436C77.0103 10.5436 75.9572 10.8428 75.164 11.441C74.3845 12.0392 73.9948 12.8435 73.9948 13.8538C73.9948 14.811 74.364 15.6086 75.1025 16.2467C75.8547 16.8848 76.7846 17.2038 77.8924 17.2038C79.1916 17.2038 80.231 16.6455 81.0105 15.5289V16.6149C81.0105 16.7639 81.1349 16.8848 81.2882 16.8848H82.6201C82.7735 16.8848 82.8978 16.7639 82.8978 16.6149V10.8627C82.8978 9.59982 82.4943 8.60942 81.6874 7.89155ZM93.8476 16.598C93.8476 16.7564 93.7155 16.8848 93.5528 16.8848H92.2551C92.0924 16.8848 91.9603 16.7564 91.9603 16.598V16.2776C91.9603 16.071 91.6383 15.9719 91.4869 16.1169C91.2489 16.3445 90.9628 16.5473 90.6268 16.7253C90.0388 17.0443 89.4236 17.2038 88.7805 17.2038C87.5497 17.2038 86.5991 16.8649 85.929 16.1869C85.2726 15.4956 84.9443 14.5185 84.9443 13.2556V7.40066C84.9443 7.24227 85.0765 7.11386 85.2394 7.11386H86.5366C86.6995 7.11386 86.8316 7.24227 86.8316 7.40066V13.136C86.8727 14.7312 87.7001 15.5289 89.3134 15.5289C90.0659 15.5289 90.695 15.2363 91.2008 14.6515C91.7074 14.0532 91.9603 13.342 91.9603 12.5178V7.40066C91.9603 7.24227 92.0924 7.11386 92.2551 7.11386H93.5528C93.7155 7.11386 93.8476 7.24227 93.8476 7.40066V16.598ZM103.597 2.87649C103.597 2.72742 103.721 2.60657 103.875 2.60657H105.207C105.36 2.60657 105.484 2.72742 105.484 2.87649V7.72101C105.484 7.92765 105.805 8.02591 105.955 7.87998C106.19 7.6531 106.47 7.4509 106.798 7.27339C107.399 6.95434 108.021 6.79482 108.664 6.79482C109.895 6.79482 110.838 7.14045 111.495 7.83173C112.165 8.50972 112.5 9.48017 112.5 10.743V16.6149C112.5 16.7639 112.376 16.8848 112.223 16.8848H110.891C110.737 16.8848 110.613 16.7639 110.613 16.6149V11.102C110.613 9.34721 109.813 8.46983 108.213 8.46983C107.447 8.46983 106.798 8.78225 106.264 9.40704C105.744 10.0185 105.484 10.7364 105.484 11.5606V16.6149C105.484 16.7639 105.36 16.8848 105.207 16.8848H103.875C103.721 16.8848 103.597 16.7639 103.597 16.6149V2.87649Z' fill='%234C5155'/%3e%3cpath d='M17.2278 15.336C17.3377 15.7411 17.9194 15.7411 18.0293 15.336L21.1918 3.6711C21.3374 3.134 20.9279 2.60657 20.3652 2.60657H18.4155C18.0282 2.60657 17.6892 2.86365 17.589 3.23335L15.8056 9.81138C15.7809 9.9026 15.7809 9.99869 15.8056 10.0899L17.2278 15.336Z' fill='%234C5155'/%3e%3cpath d='M6.17574 9.80286C6.20048 9.89408 6.20048 9.99017 6.17574 10.0814L4.7535 15.3274C4.64365 15.7326 4.06192 15.7326 3.95208 15.3274L0.791955 3.6711C0.646344 3.134 1.05583 2.60657 1.61842 2.60657H3.56824C3.9555 2.60657 4.29447 2.86365 4.3947 3.23335L6.17574 9.80286Z' fill='%234C5155'/%3e%3cpath d='M8.84156 17.9001C8.74476 18.2582 8.4174 18.5072 8.0434 18.5072H6.04808C5.50476 18.5072 5.1093 17.9963 5.24992 17.476L9.0896 3.27061C9.19547 2.87892 9.55352 2.60657 9.96259 2.60657H12.2833C12.6923 2.60657 13.0505 2.87892 13.1563 3.27061L16.996 17.476C17.1366 17.9963 16.7411 18.5072 16.1978 18.5072H14.2025C13.8285 18.5072 13.5011 18.2582 13.4043 17.9001L11.5096 10.8901C11.4035 10.498 10.8423 10.498 10.7363 10.8901L8.84156 17.9001Z' fill='%234C5155'/%3e%3cpath d='M10.4222 16.4219C10.2794 16.4219 10.1755 16.2945 10.2125 16.1649L10.9132 13.7059C10.9707 13.5041 11.2752 13.5041 11.3328 13.7059L12.0335 16.1649C12.0705 16.2945 11.9665 16.4219 11.8237 16.4219H10.4222Z' fill='%234C5155'/%3e%3c/g%3e%3cdefs%3e%3cclipPath id='clip0_1419_6034'%3e%3crect width='112' height='20' fill='white' transform='translate(0.5)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const toggleMoreIcon =
  "data:image/svg+xml,%3csvg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.5 5V19' stroke='%239BA1A6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M5.5 12H19.5' stroke='%239BA1A6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e";
const toggleLessIcon =
  "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5 12H19' stroke='%239BA1A6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e";

let showMore = false;

const loginProviders: Array<Web3AuthLoginProvider> = [
  "google",
  "facebook",
  "twitter",
  "reddit",
  "discord",
  "twitch",
  "apple",
  "line",
  "github",
  "kakao",
  "linkedin",
  "weibo",
  "wechat",
];

let existingAccount: ExistingAccount | null = null;
const storageString = window.localStorage.getItem("openlogin_store");

if (storageString) {
  existingAccount = JSON.parse(storageString);
}

async function signIn(
  module: ModuleState<Wallet>,
  provider: Web3AuthLoginProvider,
  emailValue?: string
) {
  if (!modalState) {
    return;
  }

  try {
    const wallet = (await module.wallet()) as Web3AuthWallet;
    await wallet.signIn({
      contractId: modalState.options.contractId,
      methodNames: modalState.options.methodNames,
      loginProvider: provider,
      email: emailValue,
    });
    modalState.container.children[0].classList.remove("open");
  } catch (err) {
    const { name } = module.metadata;
    const message = err instanceof Error ? err.message : "Something went wrong";

    await renderWalletConnectionFailed(
      module,
      new Error(`Failed to sign in with ${name}: ${message}`)
    );
  }
}

function renderProviderList(module: ModuleState<Wallet>) {
  const web3authOptionsListElement = document.getElementById(
    "web3auth-options-list"
  );

  const web3authContinueWithExistingElement = document.getElementById(
    "web3auth-continue-with-existing"
  );

  const web3authLoginWithEmailElement = document.getElementById(
    "web3auth-login-with-email"
  );

  let providers = loginProviders;

  if (!showMore) {
    providers = loginProviders.slice(0, 4);
  }

  if (web3authOptionsListElement) {
    web3authOptionsListElement.innerHTML = "";

    providers.forEach((provider, i) => {
      web3authOptionsListElement.insertAdjacentHTML(
        "beforeend",
        `<div class="web3auth-option" id="web3auth-option-${provider}"><img src="https://images.web3auth.io/login-${provider}.svg" ${
          provider === "github" ? 'style="filter: brightness(0)"' : ""
        } alt="${provider} icon"></div>`
      );
      document
        .getElementById("web3auth-option-" + provider)
        ?.addEventListener("click", () => {
          signIn(module, provider);
        });

      if (i === 3) {
        web3authOptionsListElement.insertAdjacentHTML(
          "beforeend",
          `
            <div class="web3auth-option-toggle" id="web3auth-option-toggle">
              <div>
                <img src="${
                  showMore ? toggleLessIcon : toggleMoreIcon
                }" alt="icon">
                <span>${showMore ? "Less" : "More"}</span>
              </div>
            </div>
            `
        );
      }
    });
  }

  const web3authOptionToggleElement = document.getElementById(
    "web3auth-option-toggle"
  );

  if (web3authOptionToggleElement) {
    web3authOptionToggleElement.addEventListener("click", () => {
      const imageElement = web3authOptionToggleElement.children[0]
        .children[0] as HTMLImageElement;
      const textElement = web3authOptionToggleElement.children[0]
        .children[1] as HTMLSpanElement;

      if (textElement.innerText === "More") {
        showMore = true;
        imageElement.src = toggleLessIcon;
        textElement.textContent = "Less";
        renderProviderList(module);
      } else {
        showMore = false;
        imageElement.src = toggleMoreIcon;
        textElement.textContent = "More";
        renderProviderList(module);
      }
    });
  }

  web3authContinueWithExistingElement?.addEventListener("click", () => {
    if (existingAccount) {
      signIn(module, existingAccount.typeOfLogin);
    }
  });

  if (web3authContinueWithExistingElement) {
    if (showMore) {
      web3authContinueWithExistingElement.style.display = "flex";
    } else {
      web3authContinueWithExistingElement.style.display = "none";
    }
  }

  if (web3authLoginWithEmailElement) {
    if (showMore) {
      web3authLoginWithEmailElement.style.display = "none";
    } else {
      web3authLoginWithEmailElement.style.display = "block";
    }
  }
}

export async function renderSignInToCreateWallet() {
  if (!modalState) {
    return;
  }

  const module = modalState.modules.find((m) => m.id === "torus");

  if (!module) {
    return;
  }

  document.querySelector(".modal-right")!.innerHTML = `
    <div class="nws-modal-header-wrapper">
      <button class="back-button" id="back-button"><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13L1 7L7 1" stroke="#6494EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
      <div class="nws-modal-header">
        <h3 class="middleTitle">${translate(
          "modal.wallet.signInToCreateWallet"
        )}</h3><button class="close-button"><svg
            xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#C1C1C1">
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
            </path>
          </svg></button>
      </div>
    </div>
    <div class="web3auth-content">
      <div class="web3auth-options">
        <div class="web3auth-options-heading">${translate(
          "modal.wallet.continueWith"
        )}</div>
        ${
          existingAccount
            ? `<div class="web3auth-continue-with-existing" id="web3auth-continue-with-existing">
                <div class="web3auth-continue-with-existing-content">
                  <div class="web3auth-existing-image"
                    style="background-image: url(&quot;https://images.web3auth.io/login-${
                      existingAccount.typeOfLogin
                    }.svg&quot;);"></div>
                  <div>
                    <div>${translate(
                      "modal.wallet.continueWithExisting"
                    )} <span class="web3auth-existing-type-of-login">${
                existingAccount.typeOfLogin
              }</span></div>
                    <div class="web3auth-existing-email">${
                      existingAccount.email
                    }</div>
                  </div>
                </div>
              </div>`
            : ""
        }
        <div class="web3auth-options-list" id="web3auth-options-list"></div>
        <div class="web3auth-login-with-email" id="web3auth-login-with-email">
          <input id="continue-with-email-input" type="email" placeholder="${translate(
            "modal.wallet.enterYourEmail"
          )}" value="">
          <button type="button" id="continue-with-email-button">${translate(
            "modal.wallet.continueWithEmail"
          )}</button>
        </div>
      </div>
      <div class="web3auth-info">
        <div class="web3auth-info-logo"><img
        src="${web3authLogoIcon}"
        alt="web3auth logo"></div>
        <div class="web3auth-info-description">${translate(
          "modal.wallet.web3authDescription"
        )}</div>
      </div>
    </div>
  `;

  renderProviderList(module);

  const continueWithEmailButton = document.getElementById(
    "continue-with-email-button"
  );

  const continueWithEmailInput = document.getElementById(
    "continue-with-email-input"
  ) as HTMLInputElement;

  if (continueWithEmailButton) {
    continueWithEmailButton.addEventListener("click", async () => {
      if (!modalState) {
        return;
      }

      signIn(module, "email_passwordless", continueWithEmailInput.value);
    });
  }

  const backButtonElement = document.getElementById("back-button");

  if (backButtonElement) {
    backButtonElement.addEventListener("click", () => {
      renderWhatIsAWallet();
    });
  }
}
