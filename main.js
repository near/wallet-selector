(self["webpackChunkangular"] = self["webpackChunkangular"] || []).push([["main"],{

/***/ 83662:
/*!***************************************************!*\
  !*** ./examples/angular/src/app/app.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var _near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @near-wallet-selector/core */ 15643);
/* harmony import */ var _near_wallet_selector_default_wallets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @near-wallet-selector/default-wallets */ 3505);
/* harmony import */ var _near_wallet_selector_near_wallet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @near-wallet-selector/near-wallet */ 27480);
/* harmony import */ var _near_wallet_selector_sender__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @near-wallet-selector/sender */ 56117);
/* harmony import */ var _near_wallet_selector_math_wallet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @near-wallet-selector/math-wallet */ 81747);
/* harmony import */ var _near_wallet_selector_nightly__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @near-wallet-selector/nightly */ 22654);
/* harmony import */ var _near_wallet_selector_meteor_wallet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @near-wallet-selector/meteor-wallet */ 52558);
/* harmony import */ var _near_wallet_selector_nightly_connect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @near-wallet-selector/nightly-connect */ 15377);
/* harmony import */ var _near_wallet_selector_wallet_connect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @near-wallet-selector/wallet-connect */ 13542);
/* harmony import */ var _near_wallet_selector_modal_ui_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @near-wallet-selector/modal-ui-js */ 33758);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../constants */ 31474);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _components_content_content_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/content/content.component */ 81986);









 // import { setupModal } from "@near-wallet-selector/modal-ui";
// import type { WalletSelectorModal } from "@near-wallet-selector/modal-ui";







function AppComponent_near_wallet_selector_content_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](0, "near-wallet-selector-content", 1);
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("selector", ctx_r0.selector)("accounts", ctx_r0.accounts)("accountId", ctx_r0.accountId)("modal", ctx_r0.modal);
  }
}

class AppComponent {
  constructor() {
    this.accounts = [];
  }

  ngOnInit() {
    var _this = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.initialize().catch(err => {
        console.error(err);
        alert("Failed to initialise wallet selector");
      });
    })();
  }

  initialize() {
    var _this2 = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      var _a;

      const _selector = yield (0,_near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_1__.setupWalletSelector)({
        network: "testnet",
        debug: true,
        modules: [...(yield (0,_near_wallet_selector_default_wallets__WEBPACK_IMPORTED_MODULE_2__.setupDefaultWallets)()), (0,_near_wallet_selector_near_wallet__WEBPACK_IMPORTED_MODULE_3__.setupNearWallet)(), (0,_near_wallet_selector_sender__WEBPACK_IMPORTED_MODULE_4__.setupSender)(), (0,_near_wallet_selector_math_wallet__WEBPACK_IMPORTED_MODULE_5__.setupMathWallet)(), (0,_near_wallet_selector_nightly__WEBPACK_IMPORTED_MODULE_6__.setupNightly)(), (0,_near_wallet_selector_meteor_wallet__WEBPACK_IMPORTED_MODULE_7__.setupMeteorWallet)(), (0,_near_wallet_selector_wallet_connect__WEBPACK_IMPORTED_MODULE_9__.setupWalletConnect)({
          projectId: "c4f79cc...",
          metadata: {
            name: "NEAR Wallet Selector",
            description: "Example dApp used by NEAR Wallet Selector",
            url: "https://github.com/near/wallet-selector",
            icons: ["https://avatars.githubusercontent.com/u/37784886"]
          }
        }), (0,_near_wallet_selector_nightly_connect__WEBPACK_IMPORTED_MODULE_8__.setupNightlyConnect)({
          url: "wss://relay.nightly.app/app",
          appMetadata: {
            additionalInfo: "",
            application: "NEAR Wallet Selector",
            description: "Example dApp used by NEAR Wallet Selector",
            icon: "https://near.org/wp-content/uploads/2020/09/cropped-favicon-192x192.png"
          }
        })]
      });

      const _modal = (0,_near_wallet_selector_modal_ui_js__WEBPACK_IMPORTED_MODULE_10__.setupModal)(_selector, {
        contractId: _constants__WEBPACK_IMPORTED_MODULE_11__.CONTRACT_ID
      });

      const state = _selector.store.getState();

      _this2.accounts = state.accounts;
      _this2.accountId = ((_a = state.accounts.find(account => account.active)) === null || _a === void 0 ? void 0 : _a.accountId) || null;
      window.selector = _selector;
      window.modal = _modal;
      _this2.selector = _selector;
      _this2.modal = _modal;
    })();
  }

}

AppComponent.ɵfac = function AppComponent_Factory(t) {
  return new (t || AppComponent)();
};

AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
  type: AppComponent,
  selectors: [["near-wallet-selector-root"]],
  decls: 4,
  vars: 1,
  consts: [[3, "selector", "accounts", "accountId", "modal", 4, "ngIf"], [3, "selector", "accounts", "accountId", "modal"]],
  template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "main")(1, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2, "NEAR Guest Book");
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](3, AppComponent_near_wallet_selector_content_3_Template, 1, 4, "near-wallet-selector-content", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !!ctx.selector);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _components_content_content_component__WEBPACK_IMPORTED_MODULE_12__.ContentComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"]
});

/***/ }),

/***/ 6915:
/*!************************************************!*\
  !*** ./examples/angular/src/app/app.module.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 50318);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 83662);
/* harmony import */ var _components_sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/sign-in/sign-in.component */ 27370);
/* harmony import */ var _components_messages_messages_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/messages/messages.component */ 7664);
/* harmony import */ var _components_form_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/form/form.component */ 21931);
/* harmony import */ var _components_content_content_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/content/content.component */ 81986);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);








class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent,
        _components_sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_1__.SignInComponent,
        _components_messages_messages_component__WEBPACK_IMPORTED_MODULE_2__.MessagesComponent,
        _components_form_form_component__WEBPACK_IMPORTED_MODULE_3__.FormComponent,
        _components_content_content_component__WEBPACK_IMPORTED_MODULE_4__.ContentComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule] }); })();


/***/ }),

/***/ 81986:
/*!**************************************************************************!*\
  !*** ./examples/angular/src/app/components/content/content.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContentComponent": () => (/* binding */ ContentComponent)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! near-api-js */ 17873);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(near_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 50635);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 98977);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../constants */ 31474);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sign-in/sign-in.component */ 27370);
/* harmony import */ var _messages_messages_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../messages/messages.component */ 7664);
/* harmony import */ var _form_form_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../form/form.component */ 21931);










function ContentComponent_ng_container_0_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ContentComponent_ng_container_0_button_8_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r4.switchAccount());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " Switch Account ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}

function ContentComponent_ng_container_0_near_wallet_selector_messages_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "near-wallet-selector-messages", 5);
  }

  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("messages", ctx_r3.messages);
  }
}

function ContentComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div")(2, "button", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ContentComponent_ng_container_0_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r6.signOut());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Log out");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "button", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ContentComponent_ng_container_0_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r7);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r8.switchWallet());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Switch Wallet");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "button", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ContentComponent_ng_container_0_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r7);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r9.onVerifyOwner());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "Verify Owner");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, ContentComponent_ng_container_0_button_8_Template, 2, 0, "button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "near-wallet-selector-form", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("addMessage", function ContentComponent_ng_container_0_Template_near_wallet_selector_form_addMessage_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r7);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r10.onSubmit($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, ContentComponent_ng_container_0_near_wallet_selector_messages_10_Template, 1, 1, "near-wallet-selector-messages", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.accounts.length > 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("account", ctx_r0.account);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !!ctx_r0.messages.length);
  }
}

function ContentComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "button", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ContentComponent_ng_container_1_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r11.signIn());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Log In");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "near-wallet-selector-sign-in");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
}

const SUGGESTED_DONATION = "0"; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

const BOATLOAD_OF_GAS = near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.format.parseNearAmount("0.00000000003");
class ContentComponent {
  ngOnInit() {
    var _this = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const [messages, account] = yield Promise.all([_this.getMessages(), _this.getAccount()]);
      _this.account = account;
      _this.messages = messages;

      _this.subscribeToEvents();
    })();
  }

  getAccount() {
    var _this2 = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this2.accountId) {
        return null;
      }

      const {
        network
      } = _this2.selector.options;
      const provider = new near_api_js__WEBPACK_IMPORTED_MODULE_1__.providers.JsonRpcProvider({
        url: network.nodeUrl
      });
      return provider.query({
        request_type: "view_account",
        finality: "final",
        account_id: _this2.accountId
      }).then(data => Object.assign(Object.assign({}, data), {
        account_id: _this2.accountId
      }));
    })();
  }

  signIn() {
    this.modal.show();
  }

  signOut() {
    var _this3 = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const wallet = yield _this3.selector.wallet();
      wallet.signOut().catch(err => {
        console.log("Failed to sign out");
        console.error(err);
      });
    })();
  }

  switchWallet() {
    this.modal.show();
  }

  getMessages() {
    const {
      network
    } = this.selector.options;
    const provider = new near_api_js__WEBPACK_IMPORTED_MODULE_1__.providers.JsonRpcProvider({
      url: network.nodeUrl
    });
    return provider.query({
      request_type: "call_function",
      account_id: _constants__WEBPACK_IMPORTED_MODULE_2__.CONTRACT_ID,
      method_name: "getMessages",
      args_base64: "",
      finality: "optimistic"
    }).then(res => JSON.parse(Buffer.from(res.result).toString()));
  }

  switchAccount() {
    const currentIndex = this.accounts.findIndex(x => x.accountId === this.accountId);
    const nextIndex = currentIndex < this.accounts.length - 1 ? currentIndex + 1 : 0;
    const nextAccountId = this.accounts[nextIndex].accountId;
    this.selector.setActiveAccount(nextAccountId);
    alert("Switched account to " + nextAccountId);
  }

  onVerifyOwner() {
    var _this4 = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const wallet = yield _this4.selector.wallet();

      try {
        const owner = yield wallet.verifyOwner({
          message: "test message for verification"
        });

        if (owner) {
          alert(`Signature for verification: ${JSON.stringify(owner)}`);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong";
        alert(message);
      }
    })();
  }

  subscribeToEvents() {
    this.subscription = this.selector.store.observable.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.map)(state => state.accounts), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.distinctUntilChanged)()).subscribe(nextAccounts => {
      var _a;

      console.log("Accounts Update", nextAccounts);
      this.accounts = nextAccounts;
      this.accountId = ((_a = nextAccounts.find(account => account.active)) === null || _a === void 0 ? void 0 : _a.accountId) || null;
      this.getAccount().then(account => {
        this.account = account;
      });
    });
  }

  addMessages(message, donation, multiple) {
    var _this5 = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        contract
      } = _this5.selector.store.getState();

      const wallet = yield _this5.selector.wallet();

      if (!multiple) {
        return wallet.signAndSendTransaction({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          signerId: _this5.accountId,
          actions: [{
            type: "FunctionCall",
            params: {
              methodName: "addMessage",
              args: {
                text: message
              },
              gas: BOATLOAD_OF_GAS,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              deposit: near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.format.parseNearAmount(donation)
            }
          }]
        }).catch(err => {
          alert("Failed to add message");
          console.log("Failed to add message");
          throw err;
        });
      }

      const transactions = [];

      for (let i = 0; i < 2; i += 1) {
        transactions.push({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          signerId: _this5.accountId,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          receiverId: contract.contractId,
          actions: [{
            type: "FunctionCall",
            params: {
              methodName: "addMessage",
              args: {
                text: `${message} (${i + 1}/2)`
              },
              gas: BOATLOAD_OF_GAS,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              deposit: near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.format.parseNearAmount(donation)
            }
          }]
        });
      }

      return wallet.signAndSendTransactions({
        transactions
      }).catch(err => {
        alert("Failed to add messages");
        console.log("Failed to add messages");
        throw err;
      });
    })();
  }

  onSubmit(e) {
    var _this6 = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        fieldset,
        message,
        donation,
        multiple
      } = e.target.elements;
      fieldset.disabled = true;

      _this6.addMessages(message.value, donation.value || "0", multiple.checked).then(() => {
        return _this6.getMessages().then(nextMessages => {
          _this6.messages = nextMessages;
          message.value = "";
          donation.value = SUGGESTED_DONATION;
          fieldset.disabled = false;
          message.focus();
        }).catch(err => {
          alert("Failed to refresh messages");
          console.log("Failed to refresh messages");
          throw err;
        });
      }).catch(err => {
        console.error(err);
        fieldset.disabled = false;
      });
    })();
  }

  ngOnDestroy() {
    var _a;

    (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
  }

}

ContentComponent.ɵfac = function ContentComponent_Factory(t) {
  return new (t || ContentComponent)();
};

ContentComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: ContentComponent,
  selectors: [["near-wallet-selector-content"]],
  inputs: {
    selector: "selector",
    modal: "modal",
    accounts: "accounts",
    accountId: "accountId"
  },
  decls: 2,
  vars: 2,
  consts: [[4, "ngIf"], [3, "click"], [3, "click", 4, "ngIf"], [3, "account", "addMessage"], [3, "messages", 4, "ngIf"], [3, "messages"]],
  template: function ContentComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, ContentComponent_ng_container_0_Template, 11, 3, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, ContentComponent_ng_container_1_Template, 4, 0, "ng-container", 0);
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.account);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.accountId);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _sign_in_sign_in_component__WEBPACK_IMPORTED_MODULE_3__.SignInComponent, _messages_messages_component__WEBPACK_IMPORTED_MODULE_4__.MessagesComponent, _form_form_component__WEBPACK_IMPORTED_MODULE_5__.FormComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb250ZW50LmNvbXBvbmVudC5zY3NzIn0= */"]
});

/***/ }),

/***/ 21931:
/*!********************************************************************!*\
  !*** ./examples/angular/src/app/components/form/form.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormComponent": () => (/* binding */ FormComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var big_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big.js */ 3609);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 90587);




class FormComponent {
    constructor() {
        this.addMessage = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    }
    ngOnInit() {
        this.maxValue = (0,big_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this.account.amount)
            .div(10 ** 24)
            .toString();
    }
    onSubmit(event) {
        this.addMessage.emit(event);
    }
}
FormComponent.ɵfac = function FormComponent_Factory(t) { return new (t || FormComponent)(); };
FormComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: FormComponent, selectors: [["near-wallet-selector-form"]], inputs: { account: "account" }, outputs: { addMessage: "addMessage" }, decls: 20, vars: 3, consts: [[3, "ngSubmit"], ["id", "fieldset"], [1, "highlight"], ["for", "message"], ["autoComplete", "off", "autoFocus", "", "id", "message", "required", ""], ["for", "donation"], ["autocomplete", "off", "id", "donation", "min", "0", "step", "0.01", "type", "number", 3, "defaultValue", "max"], ["title", "NEAR Tokens"], ["htmlFor", "multiple"], ["id", "multiple", "type", "checkbox"], ["type", "submit"]], template: function FormComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function FormComponent_Template_form_ngSubmit_0_listener($event) { return ctx.onSubmit($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "fieldset", 1)(2, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 2)(5, "label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Message:");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "p")(9, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Donation (optional):");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "\u24C3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "p")(15, "label", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Multiple Transactions:");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](17, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Sign");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Sign the guest book, ", ctx.account.account_id, "!");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("max", ctx.maxValue);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("defaultValue", "0");
    } }, dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgForm], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb3JtLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 7664:
/*!****************************************************************************!*\
  !*** ./examples/angular/src/app/components/messages/messages.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessagesComponent": () => (/* binding */ MessagesComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 36362);


const _c0 = function (a0) { return { "is-premium": a0 }; };
function MessagesComponent_p_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p", 1)(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, ":");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const message_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](3, _c0, message_r1.premium));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](message_r1.sender);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", message_r1.text, "\n");
} }
class MessagesComponent {
}
MessagesComponent.ɵfac = function MessagesComponent_Factory(t) { return new (t || MessagesComponent)(); };
MessagesComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MessagesComponent, selectors: [["near-wallet-selector-messages"]], inputs: { messages: "messages" }, decls: 3, vars: 1, consts: [[3, "ngClass", 4, "ngFor", "ngForOf"], [3, "ngClass"]], template: function MessagesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Messages");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MessagesComponent_p_2_Template, 6, 5, "p", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.messages);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtZXNzYWdlcy5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ 27370:
/*!**************************************************************************!*\
  !*** ./examples/angular/src/app/components/sign-in/sign-in.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SignInComponent": () => (/* binding */ SignInComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

class SignInComponent {
}
SignInComponent.ɵfac = function SignInComponent_Factory(t) { return new (t || SignInComponent)(); };
SignInComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SignInComponent, selectors: [["near-wallet-selector-sign-in"]], decls: 6, vars: 0, template: function SignInComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " This app demonstrates a key element of NEAR\u2019s UX: once an app has permission to make calls on behalf of a user (that is, once a user signs in), the app can make calls to the blockchain for them without prompting extra confirmation. So you\u2019ll see that if you don\u2019t include a donation, your message gets posted right to the guest book.\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " But if you do add a donation, then NEAR will double-check that you\u2019re ok with sending money to this app.\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Go ahead and sign in to try it out!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzaWduLWluLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 31474:
/*!*******************************************!*\
  !*** ./examples/angular/src/constants.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONTRACT_ID": () => (/* binding */ CONTRACT_ID)
/* harmony export */ });
const CONTRACT_ID = "guest-book.testnet";


/***/ }),

/***/ 55375:
/*!**********************************************************!*\
  !*** ./examples/angular/src/environments/environment.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 85515:
/*!**************************************!*\
  !*** ./examples/angular/src/main.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 50318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6915);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 55375);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch((err) => console.error(err));


/***/ }),

/***/ 15643:
/*!************************************!*\
  !*** ./packages/core/src/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getActiveAccount": () => (/* reexport safe */ _lib_helpers__WEBPACK_IMPORTED_MODULE_1__.getActiveAccount),
/* harmony export */   "setupWalletSelector": () => (/* reexport safe */ _lib_wallet_selector__WEBPACK_IMPORTED_MODULE_0__.setupWalletSelector),
/* harmony export */   "waitFor": () => (/* reexport safe */ _lib_helpers__WEBPACK_IMPORTED_MODULE_1__.waitFor)
/* harmony export */ });
/* harmony import */ var _lib_wallet_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/wallet-selector */ 52339);
/* harmony import */ var _lib_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/helpers */ 91374);




/***/ }),

/***/ 79228:
/*!********************************************!*\
  !*** ./packages/core/src/lib/constants.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONTRACT": () => (/* binding */ CONTRACT),
/* harmony export */   "PACKAGE_NAME": () => (/* binding */ PACKAGE_NAME),
/* harmony export */   "PENDING_CONTRACT": () => (/* binding */ PENDING_CONTRACT),
/* harmony export */   "PENDING_SELECTED_WALLET_ID": () => (/* binding */ PENDING_SELECTED_WALLET_ID),
/* harmony export */   "SELECTED_WALLET_ID": () => (/* binding */ SELECTED_WALLET_ID)
/* harmony export */ });
const PACKAGE_NAME = "near-wallet-selector";
const CONTRACT = "contract";
const PENDING_CONTRACT = "contract:pending";
const SELECTED_WALLET_ID = `selectedWalletId`;
const PENDING_SELECTED_WALLET_ID = `selectedWalletId:pending`;


/***/ }),

/***/ 66150:
/*!***********************************************************!*\
  !*** ./packages/core/src/lib/helpers/getActiveAccount.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getActiveAccount": () => (/* binding */ getActiveAccount)
/* harmony export */ });
const getActiveAccount = (state) => {
    return state.accounts.find((account) => account.active) || null;
};


/***/ }),

/***/ 91374:
/*!************************************************!*\
  !*** ./packages/core/src/lib/helpers/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getActiveAccount": () => (/* reexport safe */ _getActiveAccount__WEBPACK_IMPORTED_MODULE_1__.getActiveAccount),
/* harmony export */   "waitFor": () => (/* reexport safe */ _waitFor__WEBPACK_IMPORTED_MODULE_0__.waitFor)
/* harmony export */ });
/* harmony import */ var _waitFor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./waitFor */ 94016);
/* harmony import */ var _getActiveAccount__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getActiveAccount */ 66150);




/***/ }),

/***/ 94016:
/*!**************************************************!*\
  !*** ./packages/core/src/lib/helpers/waitFor.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "waitFor": () => (/* binding */ waitFor)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);


const wait = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const poll = /*#__PURE__*/function () {
  var _ref = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (cb, interval, remaining) {
    const result = cb();

    if (result) {
      return result;
    }

    if (!remaining) {
      throw new Error("Exceeded timeout");
    }

    return wait(interval).then(() => poll(cb, interval, remaining - 1));
  });

  return function poll(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

const waitFor = /*#__PURE__*/function () {
  var _ref2 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (cb, opts = {}) {
    const {
      timeout = 200,
      interval = 50
    } = opts;
    return Promise.race([wait(timeout).then(() => {
      throw new Error("Exceeded timeout");
    }), poll(cb, interval, Math.floor(timeout / interval))]);
  });

  return function waitFor(_x4) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ 90719:
/*!******************************************!*\
  !*** ./packages/core/src/lib/options.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getNetworkPreset": () => (/* binding */ getNetworkPreset),
/* harmony export */   "resolveNetwork": () => (/* binding */ resolveNetwork),
/* harmony export */   "resolveOptions": () => (/* binding */ resolveOptions)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ 16873);

const getNetworkPreset = (networkId) => {
    switch (networkId) {
        case "mainnet":
            return {
                networkId,
                nodeUrl: "https://rpc.mainnet.near.org",
                helperUrl: "https://helper.mainnet.near.org",
                explorerUrl: "https://explorer.near.org",
                indexerUrl: "https://api.kitwallet.app",
            };
        case "testnet":
            return {
                networkId,
                nodeUrl: "https://rpc.testnet.near.org",
                helperUrl: "https://helper.testnet.near.org",
                explorerUrl: "https://explorer.testnet.near.org",
                indexerUrl: "https://testnet-api.kitwallet.app",
            };
        default:
            throw Error(`Failed to find config for: '${networkId}'`);
    }
};
const resolveNetwork = (network) => {
    return typeof network === "string" ? getNetworkPreset(network) : network;
};
const resolveOptions = (params) => {
    const options = {
        network: resolveNetwork(params.network),
        debug: params.debug || false,
    };
    return {
        options,
        storage: params.storage || new _services__WEBPACK_IMPORTED_MODULE_0__.WebStorageService(),
    };
};


/***/ }),

/***/ 76643:
/*!*******************************************************************************!*\
  !*** ./packages/core/src/lib/services/event-emitter/event-emitter.service.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventEmitter": () => (/* binding */ EventEmitter)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ 83358);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);

class EventEmitter {
    constructor() {
        this.emitter = new events__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    }
    on(eventName, callback) {
        this.emitter.on(eventName, callback);
        return {
            remove: () => this.emitter.off(eventName, callback),
        };
    }
    off(eventName, callback) {
        this.emitter.off(eventName, callback);
    }
    emit(eventName, event) {
        this.emitter.emit(eventName, event);
    }
}


/***/ }),

/***/ 38454:
/*!*****************************************************************************!*\
  !*** ./packages/core/src/lib/services/event-emitter/event-emitter.types.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ 16873:
/*!*************************************************!*\
  !*** ./packages/core/src/lib/services/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventEmitter": () => (/* reexport safe */ _event_emitter_event_emitter_service__WEBPACK_IMPORTED_MODULE_9__.EventEmitter),
/* harmony export */   "JsonStorage": () => (/* reexport safe */ _storage_json_storage_service__WEBPACK_IMPORTED_MODULE_4__.JsonStorage),
/* harmony export */   "Logger": () => (/* reexport safe */ _logger_logger_service__WEBPACK_IMPORTED_MODULE_6__.Logger),
/* harmony export */   "Provider": () => (/* reexport safe */ _provider_provider_service__WEBPACK_IMPORTED_MODULE_0__.Provider),
/* harmony export */   "WalletModules": () => (/* reexport safe */ _wallet_modules_wallet_modules_service__WEBPACK_IMPORTED_MODULE_8__.WalletModules),
/* harmony export */   "WebStorageService": () => (/* reexport safe */ _storage_web_storage_service__WEBPACK_IMPORTED_MODULE_5__.WebStorageService),
/* harmony export */   "logger": () => (/* reexport safe */ _logger_logger_service__WEBPACK_IMPORTED_MODULE_6__.logger)
/* harmony export */ });
/* harmony import */ var _provider_provider_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./provider/provider.service */ 88209);
/* harmony import */ var _provider_provider_service_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./provider/provider.service.types */ 80469);
/* harmony import */ var _storage_storage_service_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage/storage.service.types */ 72663);
/* harmony import */ var _storage_json_storage_service_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage/json-storage.service.types */ 616);
/* harmony import */ var _storage_json_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./storage/json-storage.service */ 76971);
/* harmony import */ var _storage_web_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./storage/web-storage.service */ 46598);
/* harmony import */ var _logger_logger_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./logger/logger.service */ 53951);
/* harmony import */ var _logger_logger_service_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./logger/logger.service.types */ 94947);
/* harmony import */ var _wallet_modules_wallet_modules_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./wallet-modules/wallet-modules.service */ 6798);
/* harmony import */ var _event_emitter_event_emitter_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./event-emitter/event-emitter.service */ 76643);
/* harmony import */ var _event_emitter_event_emitter_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./event-emitter/event-emitter.types */ 38454);













/***/ }),

/***/ 53951:
/*!*****************************************************************!*\
  !*** ./packages/core/src/lib/services/logger/logger.service.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Logger": () => (/* binding */ Logger),
/* harmony export */   "logger": () => (/* binding */ logger)
/* harmony export */ });
class Logger {
    constructor(namespace) {
        this.namespace = namespace;
    }
    emit(method, ...params) {
        if (!Logger.debug) {
            return;
        }
        if (this.namespace && method !== "error") {
            // eslint-disable-next-line no-console
            console[method](this.namespace, ...params);
            return;
        }
        // eslint-disable-next-line no-console
        console[method](...params);
    }
    log(...params) {
        this.emit("log", ...params);
    }
    info(...params) {
        this.emit("info", ...params);
    }
    warn(...params) {
        this.emit("warn", ...params);
    }
    error(...params) {
        this.emit("error", ...params);
    }
}
Logger.debug = false;
const logger = new Logger();


/***/ }),

/***/ 94947:
/*!***********************************************************************!*\
  !*** ./packages/core/src/lib/services/logger/logger.service.types.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ 88209:
/*!*********************************************************************!*\
  !*** ./packages/core/src/lib/services/provider/provider.service.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Provider": () => (/* binding */ Provider)
/* harmony export */ });
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! near-api-js */ 17873);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(near_api_js__WEBPACK_IMPORTED_MODULE_0__);

class Provider {
    constructor(url) {
        this.provider = new near_api_js__WEBPACK_IMPORTED_MODULE_0__.providers.JsonRpcProvider({ url });
    }
    query(params) {
        return this.provider.query(params);
    }
    viewAccessKey({ accountId, publicKey }) {
        return this.query({
            request_type: "view_access_key",
            finality: "final",
            account_id: accountId,
            public_key: publicKey,
        });
    }
    block(reference) {
        return this.provider.block(reference);
    }
    sendTransaction(signedTransaction) {
        return this.provider.sendTransaction(signedTransaction);
    }
}


/***/ }),

/***/ 80469:
/*!***************************************************************************!*\
  !*** ./packages/core/src/lib/services/provider/provider.service.types.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ 76971:
/*!************************************************************************!*\
  !*** ./packages/core/src/lib/services/storage/json-storage.service.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JsonStorage": () => (/* binding */ JsonStorage)
/* harmony export */ });
const KEY_DELIMITER = ":";
class JsonStorage {
    constructor(storage, namespace) {
        this.storage = storage;
        this.namespace = Array.isArray(namespace)
            ? namespace.join(KEY_DELIMITER)
            : namespace;
    }
    resolveKey(key) {
        return [this.namespace, key].join(KEY_DELIMITER);
    }
    getItem(key) {
        return this.storage.getItem(this.resolveKey(key)).then((item) => {
            return typeof item === "string" ? JSON.parse(item) : null;
        });
    }
    setItem(key, value) {
        return this.storage.setItem(this.resolveKey(key), JSON.stringify(value));
    }
    removeItem(key) {
        return this.storage.removeItem(this.resolveKey(key));
    }
}


/***/ }),

/***/ 616:
/*!******************************************************************************!*\
  !*** ./packages/core/src/lib/services/storage/json-storage.service.types.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ 72663:
/*!*************************************************************************!*\
  !*** ./packages/core/src/lib/services/storage/storage.service.types.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ 46598:
/*!***********************************************************************!*\
  !*** ./packages/core/src/lib/services/storage/web-storage.service.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebStorageService": () => (/* binding */ WebStorageService)
/* harmony export */ });
class WebStorageService {
    getItem(key) {
        return new Promise((resolve) => {
            const value = localStorage.getItem(key);
            resolve(value);
        });
    }
    setItem(key, value) {
        return new Promise((resolve) => {
            localStorage.setItem(key, value);
            resolve();
        });
    }
    removeItem(key) {
        return new Promise((resolve) => {
            localStorage.removeItem(key);
            resolve();
        });
    }
}


/***/ }),

/***/ 6798:
/*!*********************************************************************************!*\
  !*** ./packages/core/src/lib/services/wallet-modules/wallet-modules.service.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WalletModules": () => (/* binding */ WalletModules)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var _event_emitter_event_emitter_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../event-emitter/event-emitter.service */ 76643);
/* harmony import */ var _logger_logger_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../logger/logger.service */ 53951);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants */ 79228);
/* harmony import */ var _storage_json_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../storage/json-storage.service */ 76971);





class WalletModules {
  constructor({
    factories,
    storage,
    options,
    store,
    emitter,
    provider
  }) {
    this.factories = factories;
    this.storage = storage;
    this.options = options;
    this.store = store;
    this.emitter = emitter;
    this.provider = provider;
    this.modules = [];
    this.instances = {};
  }

  validateWallet(id) {
    var _this = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      let accounts = [];
      const wallet = yield _this.getWallet(id);

      if (wallet) {
        // Ensure our persistent state aligns with the selected wallet.
        // For example a wallet is selected, but it returns no accounts (not signed in).
        accounts = yield wallet.getAccounts().catch(err => {
          _logger_logger_service__WEBPACK_IMPORTED_MODULE_2__.logger.log(`Failed to validate ${wallet.id} during setup`);
          _logger_logger_service__WEBPACK_IMPORTED_MODULE_2__.logger.error(err);
          return [];
        });
      }

      return accounts;
    })();
  }

  resolveStorageState() {
    var _this2 = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const jsonStorage = new _storage_json_storage_service__WEBPACK_IMPORTED_MODULE_4__.JsonStorage(_this2.storage, _constants__WEBPACK_IMPORTED_MODULE_3__.PACKAGE_NAME);
      const pendingSelectedWalletId = yield jsonStorage.getItem(_constants__WEBPACK_IMPORTED_MODULE_3__.PENDING_SELECTED_WALLET_ID);
      const pendingContract = yield jsonStorage.getItem(_constants__WEBPACK_IMPORTED_MODULE_3__.PENDING_CONTRACT);

      if (pendingSelectedWalletId && pendingContract) {
        const accounts = yield _this2.validateWallet(pendingSelectedWalletId);
        yield jsonStorage.removeItem(_constants__WEBPACK_IMPORTED_MODULE_3__.PENDING_SELECTED_WALLET_ID);
        yield jsonStorage.removeItem(_constants__WEBPACK_IMPORTED_MODULE_3__.PENDING_CONTRACT);

        if (accounts.length) {
          const {
            selectedWalletId
          } = _this2.store.getState();

          const selectedWallet = yield _this2.getWallet(selectedWalletId);

          if (selectedWallet && pendingSelectedWalletId !== selectedWalletId) {
            yield selectedWallet.signOut().catch(err => {
              _logger_logger_service__WEBPACK_IMPORTED_MODULE_2__.logger.log("Failed to sign out existing wallet");
              _logger_logger_service__WEBPACK_IMPORTED_MODULE_2__.logger.error(err);
            });
          }

          return {
            accounts,
            contract: pendingContract,
            selectedWalletId: pendingSelectedWalletId
          };
        }
      }

      const {
        contract,
        selectedWalletId
      } = _this2.store.getState();

      const accounts = yield _this2.validateWallet(selectedWalletId);

      if (!accounts.length) {
        return {
          accounts: [],
          contract: null,
          selectedWalletId: null
        };
      }

      return {
        accounts,
        contract,
        selectedWalletId
      };
    })();
  }

  signOutWallet(walletId) {
    var _this3 = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const wallet = yield _this3.getWallet(walletId);
      yield wallet.signOut().catch(err => {
        _logger_logger_service__WEBPACK_IMPORTED_MODULE_2__.logger.log(`Failed to sign out ${wallet.id}`);
        _logger_logger_service__WEBPACK_IMPORTED_MODULE_2__.logger.error(err); // At least clean up state on our side.

        _this3.onWalletSignedOut(wallet.id);
      });
    })();
  }

  onWalletSignedIn(walletId, {
    accounts,
    contractId,
    methodNames
  }) {
    var _this4 = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        selectedWalletId
      } = _this4.store.getState();

      const jsonStorage = new _storage_json_storage_service__WEBPACK_IMPORTED_MODULE_4__.JsonStorage(_this4.storage, _constants__WEBPACK_IMPORTED_MODULE_3__.PACKAGE_NAME);
      const contract = {
        contractId,
        methodNames
      };

      if (!accounts.length) {
        const module = _this4.getModule(walletId); // We can't guarantee the user will actually sign in with browser wallets.
        // Best we can do is set in storage and validate on init.


        if (module.type === "browser") {
          yield jsonStorage.setItem(_constants__WEBPACK_IMPORTED_MODULE_3__.PENDING_SELECTED_WALLET_ID, walletId);
          yield jsonStorage.setItem(_constants__WEBPACK_IMPORTED_MODULE_3__.PENDING_CONTRACT, contract);
        }

        return;
      }

      if (selectedWalletId && selectedWalletId !== walletId) {
        yield _this4.signOutWallet(selectedWalletId);
      }

      _this4.store.dispatch({
        type: "WALLET_CONNECTED",
        payload: {
          walletId,
          contract,
          accounts
        }
      });
    })();
  }

  onWalletSignedOut(walletId) {
    this.store.dispatch({
      type: "WALLET_DISCONNECTED",
      payload: {
        walletId
      }
    });
  }

  setupWalletEmitter(module) {
    var _this5 = this;

    const emitter = new _event_emitter_event_emitter_service__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    emitter.on("signedOut", () => {
      this.onWalletSignedOut(module.id);
    });
    emitter.on("signedIn", event => {
      this.onWalletSignedIn(module.id, event);
    });
    emitter.on("accountsChanged", /*#__PURE__*/function () {
      var _ref = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
        accounts
      }) {
        if (!accounts.length) {
          return _this5.signOutWallet(module.id);
        }

        _this5.store.dispatch({
          type: "ACCOUNTS_CHANGED",
          payload: {
            walletId: module.id,
            accounts
          }
        });
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    emitter.on("networkChanged", ({
      networkId
    }) => {
      this.emitter.emit("networkChanged", {
        walletId: module.id,
        networkId
      });
    });
    return emitter;
  }

  decorateWallet(wallet) {
    var _this6 = this;

    const _signIn = wallet.signIn;
    const _signOut = wallet.signOut;

    wallet.signIn = /*#__PURE__*/function () {
      var _ref2 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (params) {
        const accounts = yield _signIn(params);
        const {
          contractId,
          methodNames = []
        } = params;
        yield _this6.onWalletSignedIn(wallet.id, {
          accounts,
          contractId,
          methodNames
        });
        return accounts;
      });

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    wallet.signOut = /*#__PURE__*/(0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _signOut();

      _this6.onWalletSignedOut(wallet.id);
    });
    return wallet;
  }

  setupInstance(module) {
    var _this7 = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!module.metadata.available) {
        const message = module.type === "injected" ? "not installed" : "not available";
        throw Error(`${module.metadata.name} is ${message}`);
      }

      const wallet = Object.assign({
        id: module.id,
        type: module.type,
        metadata: module.metadata
      }, yield module.init({
        id: module.id,
        type: module.type,
        metadata: module.metadata,
        options: _this7.options,
        store: _this7.store.toReadOnly(),
        provider: _this7.provider,
        emitter: _this7.setupWalletEmitter(module),
        logger: new _logger_logger_service__WEBPACK_IMPORTED_MODULE_2__.Logger(module.id),
        storage: new _storage_json_storage_service__WEBPACK_IMPORTED_MODULE_4__.JsonStorage(_this7.storage, [_constants__WEBPACK_IMPORTED_MODULE_3__.PACKAGE_NAME, module.id])
      }));
      return _this7.decorateWallet(wallet);
    })();
  }

  getModule(id) {
    return this.modules.find(x => x.id === id);
  }

  getWallet(id) {
    var _this8 = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const module = _this8.getModule(id);

      if (!module) {
        return null;
      }

      const {
        selectedWalletId
      } = _this8.store.getState(); // If user uninstalled/removed a wallet which was previously signed in with
      // best we can do is clean up state on our side.


      if (!module.metadata.available && selectedWalletId) {
        _this8.onWalletSignedOut(selectedWalletId);

        return null;
      }

      return yield module.wallet();
    })();
  }

  setup() {
    var _this9 = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modules = [];

      for (let i = 0; i < _this9.factories.length; i += 1) {
        const module = yield _this9.factories[i]({
          options: _this9.options
        }).catch(err => {
          _logger_logger_service__WEBPACK_IMPORTED_MODULE_2__.logger.log("Failed to setup module");
          _logger_logger_service__WEBPACK_IMPORTED_MODULE_2__.logger.error(err);
          return null;
        }); // Filter out wallets that aren't available.

        if (!module) {
          continue;
        } // Skip duplicated module.


        if (modules.some(x => x.id === module.id)) {
          continue;
        }

        modules.push({
          id: module.id,
          type: module.type,
          metadata: module.metadata,
          wallet: function () {
            var _ref4 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
              let instance = _this9.instances[module.id];

              if (instance) {
                return instance;
              }

              instance = yield _this9.setupInstance(module);
              _this9.instances[module.id] = instance;
              return instance;
            });

            return function wallet() {
              return _ref4.apply(this, arguments);
            };
          }()
        });
      }

      _this9.modules = modules;
      const {
        accounts,
        contract,
        selectedWalletId
      } = yield _this9.resolveStorageState();

      _this9.store.dispatch({
        type: "SETUP_WALLET_MODULES",
        payload: {
          modules,
          accounts,
          contract,
          selectedWalletId
        }
      });
    })();
  }

}

/***/ }),

/***/ 64592:
/*!****************************************!*\
  !*** ./packages/core/src/lib/store.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createStore": () => (/* binding */ createStore)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 76317);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 80228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 24503);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ 16873);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ 79228);





const reducer = (state, action) => {
  _services__WEBPACK_IMPORTED_MODULE_1__.logger.log("Store Action", action);

  switch (action.type) {
    case "SETUP_WALLET_MODULES":
      {
        const {
          modules,
          accounts,
          contract,
          selectedWalletId
        } = action.payload;
        const accountStates = accounts.map((account, i) => {
          return Object.assign(Object.assign({}, account), {
            active: i === 0
          });
        });
        return Object.assign(Object.assign({}, state), {
          modules,
          accounts: accountStates,
          contract,
          selectedWalletId
        });
      }

    case "WALLET_CONNECTED":
      {
        const {
          walletId,
          contract,
          accounts
        } = action.payload;

        if (!accounts.length) {
          return state;
        }

        const activeAccountIndex = state.accounts.findIndex(account => account.active);
        const accountStates = accounts.map((account, i) => {
          return Object.assign(Object.assign({}, account), {
            active: i === (activeAccountIndex > -1 ? activeAccountIndex : 0)
          });
        });
        return Object.assign(Object.assign({}, state), {
          contract,
          accounts: accountStates,
          selectedWalletId: walletId
        });
      }

    case "WALLET_DISCONNECTED":
      {
        const {
          walletId
        } = action.payload;

        if (walletId !== state.selectedWalletId) {
          return state;
        }

        return Object.assign(Object.assign({}, state), {
          contract: null,
          accounts: [],
          selectedWalletId: null
        });
      }

    case "ACCOUNTS_CHANGED":
      {
        const {
          walletId,
          accounts
        } = action.payload;

        if (walletId !== state.selectedWalletId) {
          return state;
        }

        const activeAccount = state.accounts.find(account => account.active);
        const isActiveAccountRemoved = !accounts.some(account => account.accountId === (activeAccount === null || activeAccount === void 0 ? void 0 : activeAccount.accountId));
        const accountStates = accounts.map((account, i) => {
          return Object.assign(Object.assign({}, account), {
            active: isActiveAccountRemoved ? i === 0 : account.accountId === (activeAccount === null || activeAccount === void 0 ? void 0 : activeAccount.accountId)
          });
        });
        return Object.assign(Object.assign({}, state), {
          accounts: accountStates
        });
      }

    case "SET_ACTIVE_ACCOUNT":
      {
        const {
          accountId
        } = action.payload;
        const accountStates = state.accounts.map(account => {
          return Object.assign(Object.assign({}, account), {
            active: account.accountId === accountId
          });
        });
        return Object.assign(Object.assign({}, state), {
          accounts: accountStates
        });
      }

    default:
      return state;
  }
};

const createStore = /*#__PURE__*/function () {
  var _ref = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (storage) {
    const jsonStorage = new _services__WEBPACK_IMPORTED_MODULE_1__.JsonStorage(storage, _constants__WEBPACK_IMPORTED_MODULE_2__.PACKAGE_NAME);
    const initialState = {
      modules: [],
      accounts: [],
      contract: yield jsonStorage.getItem(_constants__WEBPACK_IMPORTED_MODULE_2__.CONTRACT),
      selectedWalletId: yield jsonStorage.getItem(_constants__WEBPACK_IMPORTED_MODULE_2__.SELECTED_WALLET_ID)
    };
    const state$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(initialState);
    const actions$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
    actions$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.scan)(reducer, initialState)).subscribe(state$);

    const syncStorage = /*#__PURE__*/function () {
      var _ref2 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (prevState, state, storageKey, property) {
        if (state[property] === prevState[property]) {
          return;
        }

        if (state[property]) {
          yield jsonStorage.setItem(storageKey, state[property]);
          return;
        }

        yield jsonStorage.removeItem(storageKey);
      });

      return function syncStorage(_x2, _x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      };
    }();

    let prevState = state$.getValue();
    state$.subscribe(state => {
      syncStorage(prevState, state, _constants__WEBPACK_IMPORTED_MODULE_2__.SELECTED_WALLET_ID, "selectedWalletId");
      syncStorage(prevState, state, _constants__WEBPACK_IMPORTED_MODULE_2__.CONTRACT, "contract");
      prevState = state;
    });
    return {
      observable: state$,
      getState: () => state$.getValue(),
      dispatch: action => actions$.next(action),
      toReadOnly: () => ({
        getState: () => state$.getValue(),
        observable: state$.asObservable()
      })
    };
  });

  return function createStore(_x) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ 52339:
/*!**************************************************!*\
  !*** ./packages/core/src/lib/wallet-selector.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupWalletSelector": () => (/* binding */ setupWalletSelector)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./options */ 90719);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store */ 64592);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services */ 16873);




let walletSelectorInstance = null;
const setupWalletSelector = /*#__PURE__*/function () {
  var _ref = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (params) {
    const {
      options,
      storage
    } = (0,_options__WEBPACK_IMPORTED_MODULE_1__.resolveOptions)(params);
    _services__WEBPACK_IMPORTED_MODULE_3__.Logger.debug = options.debug;
    const emitter = new _services__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
    const store = yield (0,_store__WEBPACK_IMPORTED_MODULE_2__.createStore)(storage);
    const walletModules = new _services__WEBPACK_IMPORTED_MODULE_3__.WalletModules({
      factories: params.modules,
      storage,
      options,
      store,
      emitter,
      provider: new _services__WEBPACK_IMPORTED_MODULE_3__.Provider(options.network.nodeUrl)
    });
    yield walletModules.setup();

    if (!walletSelectorInstance) {
      walletSelectorInstance = {
        options,
        store: store.toReadOnly(),
        wallet: function () {
          var _ref2 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (id) {
            const {
              selectedWalletId
            } = store.getState();
            const wallet = yield walletModules.getWallet(id || selectedWalletId);

            if (!wallet) {
              if (id) {
                throw new Error("Invalid wallet id");
              }

              throw new Error("No wallet selected");
            }

            return wallet;
          });

          return function wallet(_x2) {
            return _ref2.apply(this, arguments);
          };
        }(),
        setActiveAccount: accountId => {
          const {
            accounts
          } = store.getState();

          if (!accounts.some(account => account.accountId === accountId)) {
            throw new Error("Invalid account id");
          }

          store.dispatch({
            type: "SET_ACTIVE_ACCOUNT",
            payload: {
              accountId
            }
          });
        },

        isSignedIn() {
          const {
            accounts
          } = store.getState();
          return Boolean(accounts.length);
        },

        on: (eventName, callback) => {
          return emitter.on(eventName, callback);
        },
        off: (eventName, callback) => {
          emitter.off(eventName, callback);
        }
      };
    }

    return walletSelectorInstance;
  });

  return function setupWalletSelector(_x) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ 3505:
/*!***********************************************!*\
  !*** ./packages/default-wallets/src/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupDefaultWallets": () => (/* reexport safe */ _lib_default_wallets__WEBPACK_IMPORTED_MODULE_0__.setupDefaultWallets)
/* harmony export */ });
/* harmony import */ var _lib_default_wallets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/default-wallets */ 44737);



/***/ }),

/***/ 44737:
/*!*************************************************************!*\
  !*** ./packages/default-wallets/src/lib/default-wallets.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupDefaultWallets": () => (/* binding */ setupDefaultWallets)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var _near_wallet_selector_my_near_wallet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @near-wallet-selector/my-near-wallet */ 15502);
/* harmony import */ var _near_wallet_selector_ledger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @near-wallet-selector/ledger */ 44400);



const setupDefaultWallets = /*#__PURE__*/function () {
  var _ref = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
    return [(0,_near_wallet_selector_my_near_wallet__WEBPACK_IMPORTED_MODULE_1__.setupMyNearWallet)(), (0,_near_wallet_selector_ledger__WEBPACK_IMPORTED_MODULE_2__.setupLedger)()];
  });

  return function setupDefaultWallets() {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ 44400:
/*!**************************************!*\
  !*** ./packages/ledger/src/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupLedger": () => (/* reexport safe */ _lib_ledger__WEBPACK_IMPORTED_MODULE_0__.setupLedger)
/* harmony export */ });
/* harmony import */ var _lib_ledger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/ledger */ 505);



/***/ }),

/***/ 32782:
/*!*****************************************!*\
  !*** ./packages/ledger/src/lib/icon.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`data:image/png;base64,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`);


/***/ }),

/***/ 75510:
/*!**************************************************!*\
  !*** ./packages/ledger/src/lib/ledger-client.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CLA": () => (/* binding */ CLA),
/* harmony export */   "INS_GET_APP_VERSION": () => (/* binding */ INS_GET_APP_VERSION),
/* harmony export */   "INS_GET_PUBLIC_KEY": () => (/* binding */ INS_GET_PUBLIC_KEY),
/* harmony export */   "INS_SIGN": () => (/* binding */ INS_SIGN),
/* harmony export */   "LedgerClient": () => (/* binding */ LedgerClient),
/* harmony export */   "P1_IGNORE": () => (/* binding */ P1_IGNORE),
/* harmony export */   "P1_LAST": () => (/* binding */ P1_LAST),
/* harmony export */   "P1_MORE": () => (/* binding */ P1_MORE),
/* harmony export */   "P2_IGNORE": () => (/* binding */ P2_IGNORE),
/* harmony export */   "isLedgerSupported": () => (/* binding */ isLedgerSupported),
/* harmony export */   "networkId": () => (/* binding */ networkId),
/* harmony export */   "parseDerivationPath": () => (/* binding */ parseDerivationPath)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var _ledgerhq_hw_transport_webhid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ledgerhq/hw-transport-webhid */ 10040);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! near-api-js */ 17873);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(near_api_js__WEBPACK_IMPORTED_MODULE_2__);


 // Further reading regarding APDU Ledger API:
// - https://gist.github.com/Wollac/49f0c4e318e42f463b8306298dfb4f4a
// - https://github.com/LedgerHQ/app-near/blob/master/workdir/app-near/src/constants.h

const CLA = 0x80; // Always the same for Ledger.

const INS_SIGN = 0x02; // Sign

const INS_GET_PUBLIC_KEY = 0x04; // Get Public Key

const INS_GET_APP_VERSION = 0x06; // Get App Version

const P1_LAST = 0x80; // End of Bytes to Sign (finalize)

const P1_MORE = 0x00; // More bytes coming

const P1_IGNORE = 0x00;
const P2_IGNORE = 0x00; // Converts BIP32-compliant derivation path to a Buffer.
// More info here: https://github.com/LedgerHQ/ledger-live-common/blob/master/docs/derivation.md

function parseDerivationPath(derivationPath) {
  const parts = derivationPath.split("/");
  return Buffer.concat(parts.map(part => {
    return part.endsWith(`'`) ? Math.abs(parseInt(part.slice(0, -1))) | 0x80000000 : Math.abs(parseInt(part));
  }).map(i32 => {
    return Buffer.from([i32 >> 24 & 0xff, i32 >> 16 & 0xff, i32 >> 8 & 0xff, i32 & 0xff]);
  }));
} // TODO: Understand what this is exactly. What's so special about 87?

const networkId = "W".charCodeAt(0); // Not using TransportWebHID.isSupported as it's chosen to use a Promise...

const isLedgerSupported = () => {
  var _a;

  return !!((_a = window.navigator) === null || _a === void 0 ? void 0 : _a.hid);
};
class LedgerClient {
  constructor() {
    var _this = this;

    this.transport = null;

    this.isConnected = () => {
      return Boolean(this.transport);
    };

    this.connect = /*#__PURE__*/(0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.transport = yield _ledgerhq_hw_transport_webhid__WEBPACK_IMPORTED_MODULE_1__["default"].create();

      const handleDisconnect = () => {
        var _a;

        (_a = _this.transport) === null || _a === void 0 ? void 0 : _a.off("disconnect", handleDisconnect);
        _this.transport = null;
      };

      _this.transport.on("disconnect", handleDisconnect);
    });
    this.disconnect = /*#__PURE__*/(0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this.transport) {
        throw new Error("Device not connected");
      }

      yield _this.transport.close();
      _this.transport = null;
    });

    this.setScrambleKey = key => {
      if (!this.transport) {
        throw new Error("Device not connected");
      }

      this.transport.setScrambleKey(key);
    };

    this.on = (event, callback) => {
      if (!this.transport) {
        throw new Error("Device not connected");
      }

      this.transport.on(event, callback);
      return {
        remove: () => {
          var _a;

          return (_a = this.transport) === null || _a === void 0 ? void 0 : _a.off(event, callback);
        }
      };
    };

    this.off = (event, callback) => {
      if (!this.transport) {
        throw new Error("Device not connected");
      }

      this.transport.off(event, callback);
    };

    this.getVersion = /*#__PURE__*/(0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this.transport) {
        throw new Error("Device not connected");
      }

      const res = yield _this.transport.send(CLA, INS_GET_APP_VERSION, P1_IGNORE, P2_IGNORE);
      const [major, minor, patch] = Array.from(res);
      return `${major}.${minor}.${patch}`;
    });

    this.getPublicKey = /*#__PURE__*/function () {
      var _ref4 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
        derivationPath
      }) {
        if (!_this.transport) {
          throw new Error("Device not connected");
        }

        const res = yield _this.transport.send(CLA, INS_GET_PUBLIC_KEY, P2_IGNORE, networkId, parseDerivationPath(derivationPath));
        return near_api_js__WEBPACK_IMPORTED_MODULE_2__.utils.serialize.base_encode(res.subarray(0, -2));
      });

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }();

    this.sign = /*#__PURE__*/function () {
      var _ref5 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
        data,
        derivationPath
      }) {
        if (!_this.transport) {
          throw new Error("Device not connected");
        } // NOTE: getVersion call resets state to avoid starting from partially filled buffer


        yield _this.getVersion(); // 128 - 5 service bytes

        const CHUNK_SIZE = 123;
        const allData = Buffer.concat([parseDerivationPath(derivationPath), Buffer.from(data)]);

        for (let offset = 0; offset < allData.length; offset += CHUNK_SIZE) {
          const isLastChunk = offset + CHUNK_SIZE >= allData.length;
          const response = yield _this.transport.send(CLA, INS_SIGN, isLastChunk ? P1_LAST : P1_MORE, P2_IGNORE, Buffer.from(allData.subarray(offset, offset + CHUNK_SIZE)));

          if (isLastChunk) {
            return Buffer.from(response.subarray(0, -2));
          }
        }

        throw new Error("Invalid data or derivation path");
      });

      return function (_x2) {
        return _ref5.apply(this, arguments);
      };
    }();
  }

}

/***/ }),

/***/ 505:
/*!*******************************************!*\
  !*** ./packages/ledger/src/lib/ledger.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STORAGE_ACCOUNTS": () => (/* binding */ STORAGE_ACCOUNTS),
/* harmony export */   "setupLedger": () => (/* binding */ setupLedger)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var is_mobile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! is-mobile */ 50266);
/* harmony import */ var is_mobile__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(is_mobile__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @near-wallet-selector/wallet-utils */ 11557);
/* harmony import */ var _near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @near-wallet-selector/core */ 15643);
/* harmony import */ var _ledger_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ledger-client */ 75510);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! near-api-js */ 17873);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(near_api_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./icon */ 32782);







const STORAGE_ACCOUNTS = "accounts";

const setupLedgerState = /*#__PURE__*/function () {
  var _ref = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (storage) {
    const accounts = yield storage.getItem(STORAGE_ACCOUNTS);
    return {
      client: new _ledger_client__WEBPACK_IMPORTED_MODULE_4__.LedgerClient(),
      subscriptions: [],
      accounts: accounts || []
    };
  });

  return function setupLedgerState(_x) {
    return _ref.apply(this, arguments);
  };
}();

const Ledger = /*#__PURE__*/function () {
  var _ref2 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
    options,
    store,
    provider,
    logger,
    storage,
    metadata
  }) {
    const _state = yield setupLedgerState(storage);

    const signer = {
      createKey: () => {
        throw new Error("Not implemented");
      },
      getPublicKey: function () {
        var _ref3 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (accountId) {
          const account = _state.accounts.find(a => a.accountId === accountId);

          if (!account) {
            throw new Error("Failed to find public key for account");
          }

          return near_api_js__WEBPACK_IMPORTED_MODULE_5__.utils.PublicKey.from(account.publicKey);
        });

        return function getPublicKey(_x3) {
          return _ref3.apply(this, arguments);
        };
      }(),
      signMessage: function () {
        var _ref4 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (message, accountId) {
          const account = _state.accounts.find(a => a.accountId === accountId);

          if (!account) {
            throw new Error("Failed to find account for signing");
          }

          const signature = yield _state.client.sign({
            data: message,
            derivationPath: account.derivationPath
          });
          return {
            signature,
            publicKey: near_api_js__WEBPACK_IMPORTED_MODULE_5__.utils.PublicKey.from(account.publicKey)
          };
        });

        return function signMessage(_x4, _x5) {
          return _ref4.apply(this, arguments);
        };
      }()
    };

    const getAccounts = () => {
      return _state.accounts.map(x => ({
        accountId: x.accountId
      }));
    };

    const cleanup = () => {
      _state.subscriptions.forEach(subscription => subscription.remove());

      _state.subscriptions = [];
      _state.accounts = [];
      storage.removeItem(STORAGE_ACCOUNTS);
    };

    const signOut = /*#__PURE__*/function () {
      var _ref5 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        if (_state.client.isConnected()) {
          yield _state.client.disconnect().catch(err => {
            logger.log("Failed to disconnect device");
            logger.error(err);
          });
        }

        cleanup();
      });

      return function signOut() {
        return _ref5.apply(this, arguments);
      };
    }();

    const connectLedgerDevice = /*#__PURE__*/function () {
      var _ref6 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        if (_state.client.isConnected()) {
          return;
        }

        yield _state.client.connect();
      });

      return function connectLedgerDevice() {
        return _ref6.apply(this, arguments);
      };
    }();

    const validateAccessKey = ({
      accountId,
      publicKey
    }) => {
      logger.log("validateAccessKey", {
        accountId,
        publicKey
      });
      return provider.viewAccessKey({
        accountId,
        publicKey
      }).then(accessKey => {
        logger.log("validateAccessKey:accessKey", {
          accessKey
        });

        if (accessKey.permission !== "FullAccess") {
          throw new Error("Public key requires 'FullAccess' permission");
        }

        return accessKey;
      }, err => {
        if (err.type === "AccessKeyDoesNotExist") {
          return null;
        }

        throw err;
      });
    };

    const transformTransactions = transactions => {
      const {
        contract
      } = store.getState();

      if (!contract) {
        throw new Error("Wallet not signed in");
      }

      const account = (0,_near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_3__.getActiveAccount)(store.getState());

      if (!account) {
        throw new Error("No active account");
      }

      return transactions.map(transaction => {
        return {
          signerId: transaction.signerId || account.accountId,
          receiverId: transaction.receiverId || contract.contractId,
          actions: transaction.actions
        };
      });
    };

    return {
      signIn({
        accounts
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          const existingAccounts = getAccounts();

          if (existingAccounts.length) {
            return existingAccounts;
          }

          const ledgerAccounts = [];

          for (let i = 0; i < accounts.length; i++) {
            const {
              derivationPath,
              accountId,
              publicKey
            } = accounts[i];
            const accessKey = yield validateAccessKey({
              accountId,
              publicKey
            });

            if (!accessKey) {
              throw new Error(`Public key is not registered with the account '${accountId}'.`);
            }

            ledgerAccounts.push({
              accountId,
              derivationPath,
              publicKey
            });
          }

          yield storage.setItem(STORAGE_ACCOUNTS, ledgerAccounts);
          _state.accounts = ledgerAccounts;
          return getAccounts();
        })();
      },

      signOut,

      getAccounts() {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          return getAccounts();
        })();
      },

      verifyOwner({
        message
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("Ledger:verifyOwner", {
            message
          });
          throw new Error(`Method not supported by ${metadata.name}`);
        })();
      },

      signAndSendTransaction({
        signerId,
        receiverId,
        actions
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("signAndSendTransaction", {
            signerId,
            receiverId,
            actions
          });

          if (!_state.accounts.length) {
            throw new Error("Wallet not signed in");
          } // Note: Connection must be triggered by user interaction.


          yield connectLedgerDevice();
          const signedTransactions = yield (0,_near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_2__.signTransactions)(transformTransactions([{
            signerId,
            receiverId,
            actions
          }]), signer, options.network);
          return provider.sendTransaction(signedTransactions[0]);
        })();
      },

      signAndSendTransactions({
        transactions
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("signAndSendTransactions", {
            transactions
          });

          if (!_state.accounts.length) {
            throw new Error("Wallet not signed in");
          } // Note: Connection must be triggered by user interaction.


          yield connectLedgerDevice();
          const signedTransactions = yield (0,_near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_2__.signTransactions)(transformTransactions(transactions), signer, options.network);
          const results = [];

          for (let i = 0; i < signedTransactions.length; i++) {
            results.push(yield provider.sendTransaction(signedTransactions[i]));
          }

          return results;
        })();
      },

      getPublicKey(derivationPath) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          yield connectLedgerDevice();
          return yield _state.client.getPublicKey({
            derivationPath
          });
        })();
      }

    };
  });

  return function Ledger(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

function setupLedger({
  iconUrl = _icon__WEBPACK_IMPORTED_MODULE_6__["default"],
  deprecated = false
} = {}) {
  return /*#__PURE__*/(0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
    const mobile = (0,is_mobile__WEBPACK_IMPORTED_MODULE_1__.isMobile)();
    const supported = (0,_ledger_client__WEBPACK_IMPORTED_MODULE_4__.isLedgerSupported)();

    if (mobile) {
      return null;
    }

    return {
      id: "ledger",
      type: "hardware",
      metadata: {
        name: "Ledger",
        description: "Protect crypto assets with the most popular hardware wallet.",
        iconUrl,
        deprecated,
        available: supported
      },
      init: Ledger
    };
  });
}

/***/ }),

/***/ 81747:
/*!*******************************************!*\
  !*** ./packages/math-wallet/src/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupMathWallet": () => (/* reexport safe */ _lib_math_wallet__WEBPACK_IMPORTED_MODULE_0__.setupMathWallet)
/* harmony export */ });
/* harmony import */ var _lib_math_wallet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/math-wallet */ 76462);



/***/ }),

/***/ 85278:
/*!**********************************************!*\
  !*** ./packages/math-wallet/src/lib/icon.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`data:image/png;base64,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`);


/***/ }),

/***/ 76462:
/*!*****************************************************!*\
  !*** ./packages/math-wallet/src/lib/math-wallet.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupMathWallet": () => (/* binding */ setupMathWallet)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var is_mobile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! is-mobile */ 50266);
/* harmony import */ var is_mobile__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(is_mobile__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @near-wallet-selector/core */ 15643);
/* harmony import */ var _near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @near-wallet-selector/wallet-utils */ 11557);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icon */ 85278);







const isInstalled = () => {
  return (0,_near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_2__.waitFor)(() => !!window.nearWalletApi).catch(() => false);
};

const setupMathWalletState = () => {
  const wallet = window.nearWalletApi;
  return {
    wallet
  };
};

const MathWallet = /*#__PURE__*/function () {
  var _ref = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
    metadata,
    options,
    store,
    provider,
    logger
  }) {
    const _state = setupMathWalletState();

    const getAccounts = () => {
      const account = _state.wallet.signer.account;

      if (!account) {
        return [];
      }

      return [{
        accountId: account.accountId
      }];
    };

    const transformTransactions = transactions => {
      const {
        contract
      } = store.getState();

      if (!contract) {
        throw new Error("Wallet not signed in");
      }

      const account = (0,_near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_2__.getActiveAccount)(store.getState());

      if (!account) {
        throw new Error("No active account");
      }

      return transactions.map(transaction => {
        return {
          signerId: transaction.signerId || account.accountId,
          receiverId: transaction.receiverId || contract.contractId,
          actions: transaction.actions
        };
      });
    };

    return {
      signIn({
        contractId
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          const existingAccounts = getAccounts();

          if (existingAccounts.length) {
            return existingAccounts;
          }

          yield _state.wallet.login({
            contractId
          });
          return getAccounts();
        })();
      },

      signOut() {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          // Ignore if unsuccessful (returns false).
          yield _state.wallet.logout();
        })();
      },

      getAccounts() {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          return getAccounts();
        })();
      },

      verifyOwner({
        message
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("MathWallet:verifyOwner", {
            message
          });
          const account = (0,_near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_2__.getActiveAccount)(store.getState());

          if (!account) {
            throw new Error("No active account");
          }

          const accountId = account.accountId;
          const pubKey = yield _state.wallet.signer.getPublicKey(accountId);
          const block = yield provider.block({
            finality: "final"
          });
          const data = {
            accountId,
            message,
            blockId: block.header.hash,
            publicKey: Buffer.from(pubKey.data).toString("base64"),
            keyType: pubKey.keyType
          };
          const encoded = JSON.stringify(data); // Note: Math Wallet currently hangs when calling signMessage.

          throw new Error(`Method not supported by ${metadata.name}`);
          const signed = yield _state.wallet.signer.signMessage(new Uint8Array(Buffer.from(encoded)), accountId, options.network.networkId);
          return Object.assign(Object.assign({}, data), {
            signature: Buffer.from(signed.signature).toString("base64"),
            keyType: signed.publicKey.keyType
          });
        })();
      },

      signAndSendTransaction({
        signerId,
        receiverId,
        actions
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("signAndSendTransaction", {
            signerId,
            receiverId,
            actions
          });
          const signedTransactions = yield (0,_near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_3__.signTransactions)(transformTransactions([{
            signerId,
            receiverId,
            actions
          }]), _state.wallet.signer, options.network);
          return provider.sendTransaction(signedTransactions[0]);
        })();
      },

      signAndSendTransactions({
        transactions
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("signAndSendTransactions", {
            transactions
          });
          const signedTransactions = yield (0,_near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_3__.signTransactions)(transformTransactions(transactions), _state.wallet.signer, options.network);
          logger.log("signAndSendTransactions:signedTransactions", signedTransactions);
          const results = [];

          for (let i = 0; i < signedTransactions.length; i++) {
            results.push(yield provider.sendTransaction(signedTransactions[i]));
          }

          return results;
        })();
      }

    };
  });

  return function MathWallet(_x) {
    return _ref.apply(this, arguments);
  };
}();

const setupMathWallet = ({
  iconUrl = _icon__WEBPACK_IMPORTED_MODULE_4__["default"],
  deprecated = false
} = {}) => {
  return /*#__PURE__*/(0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
    const mobile = (0,is_mobile__WEBPACK_IMPORTED_MODULE_1__.isMobile)();
    const installed = yield isInstalled();

    if (mobile) {
      return null;
    }

    return {
      id: "math-wallet",
      type: "injected",
      metadata: {
        name: "Math Wallet",
        description: "World's First Insured Crypto Wallet.",
        iconUrl,
        downloadUrl: "https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc",
        deprecated,
        available: installed
      },
      init: MathWallet
    };
  });
};

/***/ }),

/***/ 52558:
/*!*********************************************!*\
  !*** ./packages/meteor-wallet/src/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupMeteorWallet": () => (/* reexport safe */ _lib_meteor_wallet__WEBPACK_IMPORTED_MODULE_0__.setupMeteorWallet)
/* harmony export */ });
/* harmony import */ var _lib_meteor_wallet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/meteor-wallet */ 4121);



/***/ }),

/***/ 22175:
/*!************************************************!*\
  !*** ./packages/meteor-wallet/src/lib/icon.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`data:image/png;base64,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`);


/***/ }),

/***/ 4121:
/*!*********************************************************!*\
  !*** ./packages/meteor-wallet/src/lib/meteor-wallet.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupMeteorWallet": () => (/* binding */ setupMeteorWallet)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! near-api-js */ 17873);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(near_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _meteorwallet_sdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @meteorwallet/sdk */ 30257);
/* harmony import */ var _meteorwallet_sdk__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_meteorwallet_sdk__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @near-wallet-selector/wallet-utils */ 11557);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./icon */ 22175);






const setupWalletState = /*#__PURE__*/function () {
  var _ref = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (params, network) {
    const keyStore = new near_api_js__WEBPACK_IMPORTED_MODULE_1__.keyStores.BrowserLocalStorageKeyStore(window.localStorage, "_meteor_wallet");
    const near = yield (0,near_api_js__WEBPACK_IMPORTED_MODULE_1__.connect)(Object.assign(Object.assign({
      keyStore
    }, network), {
      headers: {}
    }));
    const wallet = new _meteorwallet_sdk__WEBPACK_IMPORTED_MODULE_2__.MeteorWallet({
      near,
      appKeyPrefix: "near_app"
    });
    return {
      wallet,
      keyStore
    };
  });

  return function setupWalletState(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

const createMeteorWalletInjected = /*#__PURE__*/function () {
  var _ref2 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
    options,
    logger,
    store,
    params
  }) {
    const _state = yield setupWalletState(params, options.network);

    const cleanup = () => {
      _state.keyStore.clear();
    };

    const getAccounts = () => {
      const accountId = _state.wallet.getAccountId();

      if (!accountId) {
        return [];
      }

      return [{
        accountId
      }];
    };

    const transformTransactions = /*#__PURE__*/function () {
      var _ref3 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (transactions) {
        const account = _state.wallet.account();

        const {
          networkId,
          signer,
          provider
        } = account.connection;
        const localKey = yield signer.getPublicKey(account.accountId, networkId);

        for (const trx of transactions) {
          if (trx.signerId !== account.accountId) {
            throw new Error(`Transaction had a signerId which didn't match the currently logged in account`);
          }
        }

        return Promise.all(transactions.map( /*#__PURE__*/function () {
          var _ref4 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (transaction, index) {
            const actions = transaction.actions.map(action => (0,_near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_3__.createAction)(action));
            const accessKey = yield account.accessKeyForTransaction(transaction.receiverId, actions, localKey);

            if (!accessKey) {
              throw new Error(`Failed to find matching key for transaction sent to ${transaction.receiverId}`);
            }

            const block = yield provider.block({
              finality: "final"
            });
            return near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.createTransaction(account.accountId, near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.PublicKey.from(accessKey.public_key), transaction.receiverId, accessKey.access_key.nonce + index + 1, actions, near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.serialize.base_decode(block.header.hash));
          });

          return function (_x5, _x6) {
            return _ref4.apply(this, arguments);
          };
        }()));
      });

      return function transformTransactions(_x4) {
        return _ref3.apply(this, arguments);
      };
    }();

    return {
      signIn({
        contractId,
        methodNames = []
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("MeteorWallet:signIn", {
            contractId,
            methodNames
          });

          if (methodNames.length) {
            yield _state.wallet.requestSignIn({
              methods: methodNames,
              type: _meteorwallet_sdk__WEBPACK_IMPORTED_MODULE_2__.EMeteorWalletSignInType.SELECTED_METHODS,
              contract_id: contractId
            });
          } else {
            yield _state.wallet.requestSignIn({
              type: _meteorwallet_sdk__WEBPACK_IMPORTED_MODULE_2__.EMeteorWalletSignInType.ALL_METHODS,
              contract_id: contractId
            });
          }

          return getAccounts();
        })();
      },

      signOut() {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          if (_state.wallet.isSignedIn()) {
            yield _state.wallet.signOut();
          }

          cleanup();
        })();
      },

      isSignedIn() {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          if (!_state.wallet) {
            return false;
          }

          return _state.wallet.isSignedIn();
        })();
      },

      getAccounts() {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          return getAccounts();
        })();
      },

      verifyOwner({
        message
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("MeteorWallet:verifyOwner", {
            message
          });
          const response = yield _state.wallet.verifyOwner({
            message
          });

          if (response.success) {
            return response.payload;
          } else {
            throw new Error(`Couldn't verify owner: ${response.message}`);
          }
        })();
      },

      signAndSendTransaction({
        signerId,
        receiverId,
        actions
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("MeteorWallet:signAndSendTransaction", {
            signerId,
            receiverId,
            actions
          });
          const {
            contract
          } = store.getState();

          if (!_state.wallet.isSignedIn()) {
            throw new Error("Wallet not signed in");
          }

          if (!receiverId && !contract) {
            throw new Error("No receiver found to send the transaction to");
          }

          const account = _state.wallet.account();

          return account["signAndSendTransaction_direct"]({
            receiverId: receiverId !== null && receiverId !== void 0 ? receiverId : contract.contractId,
            actions: actions.map(action => (0,_near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_3__.createAction)(action))
          });
        })();
      },

      signAndSendTransactions({
        transactions
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("MeteorWallet:signAndSendTransactions", {
            transactions
          });

          if (!_state.wallet.isSignedIn()) {
            throw new Error("Wallet not signed in");
          }

          return _state.wallet.requestSignTransactions({
            transactions: yield transformTransactions(transactions)
          });
        })();
      }

    };
  });

  return function createMeteorWalletInjected(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

function setupMeteorWallet({
  iconUrl = _icon__WEBPACK_IMPORTED_MODULE_4__["default"],
  deprecated = false
} = {}) {
  return /*#__PURE__*/(0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
    return {
      id: "meteor-wallet",
      type: "injected",
      metadata: {
        available: true,
        name: "Meteor Wallet",
        description: "Securely store and stake your NEAR tokens and compatible assets with Meteor.",
        iconUrl,
        deprecated,
        downloadUrl: "https://wallet.meteorwallet.app"
      },
      init: options => {
        return createMeteorWalletInjected(Object.assign(Object.assign({}, options), {
          params: {
            iconUrl
          }
        }));
      }
    };
  });
}

/***/ }),

/***/ 33758:
/*!*******************************************!*\
  !*** ./packages/modal-ui-js/src/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupModal": () => (/* reexport safe */ _lib_modal__WEBPACK_IMPORTED_MODULE_0__.setupModal)
/* harmony export */ });
/* harmony import */ var _lib_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/modal */ 14016);



/***/ }),

/***/ 97686:
/*!**************************************************************************!*\
  !*** ./packages/modal-ui-js/src/lib/components/ConnectHardwareWallet.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderConnectHardwareWallet": () => (/* binding */ renderConnectHardwareWallet)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modal */ 14016);
/* harmony import */ var _render_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../render-modal */ 71244);
/* harmony import */ var _SpecifyDerivationPath__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SpecifyDerivationPath */ 6284);



function renderConnectHardwareWallet(module) {
    var _a, _b;
    if (!_modal__WEBPACK_IMPORTED_MODULE_0__.modalState) {
        return;
    }
    _modal__WEBPACK_IMPORTED_MODULE_0__.modalState.derivationPath = _modal__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_DERIVATION_PATH;
    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header-wrapper">
        <div class="nws-modal-header">
          <h3 class="middleTitle">Connect with Ledger</h3><button class="close-button"><svg
              xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#C1C1C1">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
              </path>
            </svg></button>
        </div>
      </div>
      <div class="derivation-path-wrapper">
        <div class="enter-derivation-path">
          <div class="ledger-image">
            <svg width="317" height="157" viewBox="0 0 317 157" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M249.99 16.0994C270.063 -0.864155 289.788 1.58873 301.497 10.7365C307.402 15.3499 311.278 21.6575 312.267 28.1258C313.247 34.5412 311.413 41.2233 305.692 46.8044C297.366 54.9273 286.343 55.3362 273.015 51.5109C261.654 48.25 249.058 42.0377 235.726 35.4627L235.726 35.4626L235.717 35.458C233.367 34.2992 230.995 33.129 228.602 31.9618C212.742 24.2253 196.067 16.6575 179.842 13.8595C163.538 11.0479 147.552 13.0313 133.266 24.522C128.032 28.732 123.478 35.2086 121.716 44.8205C119.961 54.3947 120.992 66.9771 126.703 83.4311C135.432 108.583 132.899 126.677 123.575 138.063C114.217 149.491 97.5614 154.733 76.7887 153.121C55.0043 151.43 29.0621 142.206 3.29867 125.227L0.887817 127.942C27.2472 145.405 53.9251 154.952 76.5105 156.705C97.9028 158.365 115.96 153.035 126.356 140.341C136.785 127.606 139.045 108.029 130.099 82.2524C124.521 66.1801 123.642 54.2493 125.252 45.4687C126.854 36.7258 130.94 31.006 135.519 27.3232C148.794 16.6458 163.649 14.715 179.231 17.4021C194.891 20.1027 211.146 27.4463 227.026 35.1928C229.381 36.3415 231.729 37.5001 234.066 38.6531L234.073 38.6568C247.382 45.223 260.324 51.608 272.024 54.9662C285.819 58.9258 298.493 58.8501 308.202 49.3776C314.764 42.9759 316.974 35.1288 315.82 27.5826C314.675 20.0893 310.237 13.0029 303.71 7.90363C290.555 -2.37382 268.938 -4.62038 247.67 13.3537L249.99 16.0994Z"
                fill="url(#paint0_linear_3_672)"></path>
              <path d="M260.264 17.8767L177.605 89.4649L157.679 73.9664L239.23 3.85423L260.264 17.8767Z" fill="#6A7075">
              </path>
              <path d="M205.939 54.4577L199.764 50.2636L233.316 20.9053L239.907 25.8395L205.939 54.4577Z" fill="#494E52">
              </path>
              <path d="M260.264 17.8757L177.605 89.4639L182.033 98.3202L264.323 26.363L260.264 17.8757Z" fill="#494E52">
              </path>
              <path d="M177.236 89.4646L181.295 98.3209L165.059 85.7745L170.963 85.0365L177.236 89.4646Z" fill="black">
              </path>
              <path d="M93.4708 99.6384L91.9948 110.13L174.653 92.894L164.69 85.7749L93.4708 99.6384Z" fill="#DCDADA">
              </path>
              <path d="M93.1157 104.323L94.314 100.129L165.613 86.3483L169.208 89.344L93.1157 104.323Z" fill="#C1C1C1">
              </path>
              <path d="M94.2086 99.7963L86.0903 101.272L92.3635 110.129L94.2086 99.7963Z" fill="#B3AAAA"></path>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M86.0903 100.907L89.0027 74.1304L178.455 55.2416C184.695 53.9962 195.766 54.7675 197.177 63.7058C198.284 70.717 195.506 73.9943 191.628 77.3592C188.495 80.0671 180.152 82.4646 178.343 82.8944C178.293 82.9064 178.241 82.9188 178.186 82.9319C177.38 83.1245 176.007 83.4525 170.644 84.5088C169.085 84.8158 167.382 85.1501 165.557 85.5078L164.933 85.63C146.312 89.2764 115.528 95.2297 93.9844 99.3849C91.1808 99.9257 88.5337 100.436 86.0903 100.907ZM185.076 75.554C190.748 73.3535 193.99 68.0745 192.318 63.7631C190.645 59.4517 184.691 57.7405 179.019 59.941C173.347 62.1416 170.105 67.4206 171.778 71.732C173.45 76.0434 179.404 77.7546 185.076 75.554Z"
                fill="#F4F1E8"></path>
              <path d="M199.764 50.3994L196.768 48.3043L232.194 18.0454L233.316 21.6403L199.764 50.3994Z" fill="black">
              </path>
              <path d="M239.968 25.9943L232.588 20.4592V17.5071L241.813 24.5183L239.968 25.9943Z" fill="black"></path>
              <ellipse cx="182.084" cy="68.0811" rx="10.242" ry="7.46772" transform="rotate(-23.7949 182.084 68.0811)"
                fill="#494E52"></ellipse>
              <ellipse cx="182.084" cy="68.0816" rx="6.68462" ry="4.87394" transform="rotate(-23.7949 182.084 68.0816)"
                fill="#494E52"></ellipse>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M238.725 2.93094L260.368 17.2564L264.865 26.4556L181.615 99.0341L175.16 94.311L92.0028 110.947L85.3267 101.399L88.3269 73.8157L178.118 54.8553L238.725 2.93094ZM178.599 56.2622L89.6786 75.0388L86.9321 100.29C89.0979 99.8725 91.4124 99.4263 93.8446 98.9572C115.388 94.8019 146.171 88.8488 164.791 85.2026L165.415 85.0804C167.24 84.7228 168.943 84.3885 170.501 84.0816C175.853 83.0275 177.219 82.701 178.015 82.5107C178.07 82.4976 178.122 82.4852 178.173 82.4732C179.048 82.2652 181.558 81.5669 184.235 80.5851C186.742 79.6655 189.286 78.5354 190.802 77.3758L191.151 77.0922L191.644 76.6595C193.341 75.147 194.723 73.6739 195.61 71.871C196.571 69.916 196.982 67.5029 196.448 64.1178C195.8 60.0131 192.959 57.7574 189.408 56.6566C185.833 55.5483 181.637 55.6566 178.603 56.2615C178.601 56.2617 178.6 56.262 178.599 56.2622ZM192.631 77.7565L259.555 18.9531L263.042 26.0869L181.808 96.9078L178.132 89.5713L191.724 78.529C191.859 78.4249 191.988 78.32 192.11 78.2144L192.111 78.2136C192.286 78.0617 192.46 77.9094 192.631 77.7565ZM185.491 81.6908C185.24 81.7868 184.99 81.8802 184.743 81.9709C182.013 82.9723 179.447 83.6875 178.514 83.9093C178.463 83.9213 178.411 83.9338 178.356 83.9468C177.635 84.1192 176.472 84.3971 172.491 85.1919L177.172 88.4492L185.491 81.6908ZM176.631 89.8707L170.479 85.5903C169.306 85.8213 168.054 86.0673 166.731 86.3265L175.769 92.9276L179.548 95.6924L176.631 89.8707ZM164.758 86.7132C146.252 90.3362 116.027 96.1817 94.6324 100.308L93.2258 109.197L173.543 93.1293L164.758 86.7132ZM91.888 108.207L93.0909 100.606C91.0848 100.993 89.1642 101.363 87.3471 101.713L91.888 108.207ZM258.581 17.8436L197.306 71.6841C198.142 69.5779 198.41 67.0795 197.906 63.8876C197.143 59.0539 193.743 56.4549 189.845 55.2467C186.921 54.3402 183.662 54.1916 180.861 54.449L238.84 4.77668L258.581 17.8436ZM232.505 16.82L243.089 24.5643L205.915 56.5106L196.042 48.0665L232.505 16.82ZM232.118 19.096L198.312 48.0654L199.744 49.29L232.584 20.9424L232.118 19.096ZM233.456 22.1396L200.878 50.2604L205.913 54.5664L239.041 26.0969L233.456 22.1396ZM240.195 25.1054L240.717 24.6571L233.759 19.5663L234.06 20.7586L240.195 25.1054Z"
                fill="black"></path>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M190.194 69.9744C191.32 68.1409 191.576 66.2271 190.942 64.5937C190.308 62.9603 188.829 61.7198 186.761 61.1254C184.691 60.5307 182.116 60.6196 179.553 61.6139C176.991 62.6081 175.029 64.2794 173.902 66.1141C172.776 67.9477 172.52 69.8614 173.154 71.4948C173.788 73.1282 175.267 74.3687 177.335 74.9631C179.405 75.5578 181.98 75.4689 184.543 74.4746C187.105 73.4804 189.067 71.8091 190.194 69.9744ZM185.077 75.8508C190.749 73.6502 193.991 68.3712 192.318 64.0598C190.645 59.7484 184.691 58.0372 179.019 60.2378C173.347 62.4383 170.105 67.7173 171.778 72.0287C173.451 76.3401 179.405 78.0513 185.077 75.8508Z"
                fill="black"></path>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M187.391 69.169C188.127 67.9713 188.266 66.7721 187.881 65.7812C187.497 64.7903 186.586 63.9984 185.235 63.6102C183.883 63.2216 182.173 63.2741 180.456 63.9404C178.738 64.6068 177.441 65.7208 176.705 66.9196C175.969 68.1172 175.83 69.3165 176.215 70.3074C176.599 71.2983 177.511 72.0901 178.861 72.4783C180.214 72.8669 181.923 72.8144 183.64 72.1481C185.358 71.4818 186.655 70.3678 187.391 69.169ZM184.174 73.5242C188.156 71.9795 190.432 68.2738 189.257 65.2473C188.083 62.2208 183.904 61.0196 179.922 62.5643C175.94 64.1091 173.665 67.8148 174.839 70.8412C176.013 73.8677 180.193 75.0689 184.174 73.5242Z"
                fill="black"></path>
              <path
                d="M240.499 41.2441C239.744 40.3649 239.844 39.04 240.724 38.285L249.781 30.5067C250.66 29.7516 251.985 29.8523 252.74 30.7315V30.7315C253.495 31.6108 253.395 32.9356 252.516 33.6907L243.458 41.469C242.579 42.224 241.254 42.1234 240.499 41.2441V41.2441Z"
                fill="black"></path>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M250.743 31.6265L241.685 39.4048C241.424 39.6287 241.395 40.0217 241.619 40.2825C241.842 40.5433 242.235 40.5731 242.496 40.3492L251.554 32.5709C251.815 32.3469 251.845 31.954 251.621 31.6932C251.397 31.4324 251.004 31.4025 250.743 31.6265ZM240.724 38.285C239.844 39.04 239.744 40.3649 240.499 41.2441C241.254 42.1234 242.579 42.224 243.458 41.469L252.516 33.6907C253.395 32.9356 253.495 31.6108 252.74 30.7315C251.985 29.8523 250.66 29.7516 249.781 30.5067L240.724 38.285Z"
                fill="black"></path>
              <path
                d="M205.779 71.4647C205.005 70.5642 205.108 69.2073 206.009 68.4339L214.989 60.7218C215.89 59.9485 217.247 60.0516 218.02 60.9521V60.9521C218.793 61.8526 218.69 63.2095 217.79 63.9829L208.809 71.695C207.909 72.4683 206.552 72.3652 205.779 71.4647V71.4647Z"
                fill="black"></path>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M215.951 61.8416L206.97 69.5537C206.688 69.796 206.656 70.221 206.898 70.5031C207.141 70.7851 207.566 70.8174 207.848 70.5752L216.828 62.863C217.11 62.6208 217.143 62.1958 216.9 61.9137C216.658 61.6317 216.233 61.5994 215.951 61.8416ZM206.009 68.4339C205.108 69.2073 205.005 70.5642 205.779 71.4647C206.552 72.3652 207.909 72.4683 208.809 71.695L217.79 63.9829C218.69 63.2095 218.793 61.8526 218.02 60.9521C217.247 60.0516 215.89 59.9485 214.989 60.7218L206.009 68.4339Z"
                fill="black"></path>
              <circle cx="141.356" cy="19.525" r="10.1855" fill="#FE89B4"></circle>
              <ellipse cx="139.062" cy="14.7094" rx="2.42519" ry="1.94015" transform="rotate(-34.544 139.062 14.7094)"
                fill="#FDF7FF"></ellipse>
              <circle cx="252.489" cy="79.7577" r="7.78893" fill="#EC5236"></circle>
              <ellipse cx="250.434" cy="76.3701" rx="2.61272" ry="2.09018" transform="rotate(-34.544 250.434 76.3701)"
                fill="#EDB69D"></ellipse>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M100.436 79.9254C100.461 79.6567 100.732 79.3897 101.042 79.329L106.657 78.2299C107.587 78.0478 108.281 78.5536 108.207 79.3596L107.759 84.2243C107.734 84.493 107.463 84.76 107.153 84.8207L100.416 86.1396C100.106 86.2003 99.8742 86.0317 99.899 85.7631L100.436 79.9254Z"
                fill="#B3AAAA"></path>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M95.8553 81.7775C95.9294 80.9715 96.7437 80.1704 97.6739 79.9883L98.7968 79.7685C99.1069 79.7078 99.3382 79.8764 99.3135 80.1451L99.1344 82.091C99.1096 82.3597 98.8382 82.6267 98.5282 82.6874L96.2824 83.127C95.9723 83.1877 95.741 83.0191 95.7657 82.7505L95.8553 81.7775Z"
                fill="#B3AAAA"></path>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M95.5865 84.6965C95.6112 84.4278 95.8826 84.1608 96.1927 84.1001L98.4385 83.6605C98.7486 83.5998 98.9799 83.7684 98.9552 84.037L98.7761 85.9829C98.7513 86.2516 98.4799 86.5186 98.1699 86.5793L95.9241 87.019C95.614 87.0797 95.3827 86.9111 95.4074 86.6424L95.5865 84.6965Z"
                fill="#B3AAAA"></path>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M95.2282 88.5884C95.2529 88.3197 95.5244 88.0527 95.8344 87.992L98.0802 87.5524C98.3903 87.4917 98.6216 87.6603 98.5969 87.929L98.4178 89.8749C98.3931 90.1435 98.1216 90.4105 97.8116 90.4712L96.6887 90.6911C95.7584 90.8732 95.0645 90.3674 95.1387 89.5614L95.2282 88.5884Z"
                fill="#B3AAAA"></path>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M99.7197 87.709C99.7444 87.4403 100.016 87.1733 100.326 87.1126L102.572 86.673C102.882 86.6123 103.113 86.7809 103.088 87.0496L102.909 88.9955C102.885 89.2641 102.613 89.5312 102.303 89.5919L100.057 90.0315C99.7472 90.0922 99.5159 89.9236 99.5406 89.6549L99.7197 87.709Z"
                fill="#B3AAAA"></path>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M104.211 86.8298C104.236 86.5611 104.507 86.2941 104.817 86.2334L107.063 85.7938C107.373 85.7331 107.605 85.9017 107.58 86.1704L107.49 87.1433C107.416 87.9493 106.602 88.7504 105.672 88.9325L104.549 89.1523C104.239 89.213 104.007 89.0444 104.032 88.7757L104.211 86.8298Z"
                fill="#B3AAAA"></path>
              <defs>
                <linearGradient id="paint0_linear_3_672" x1="-44.5195" y1="122.42" x2="263.357" y2="-8.65023"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0.110697" stop-color="#232323"></stop>
                  <stop offset="1" stop-color="#3D3D3D"></stop>
                </linearGradient>
              </defs>
            </svg></div>
          <div class="ledger-description">
            <p>Make sure your Ledger is connected securely, and that the NEAR app is open on your device.</p>
            <p class="specify-path" id="specify-derivation-path-button">Specify HD Path</p>
          </div>
          <div class="action-buttons"><button class="middleButton" id="continue-button">Continue</button></div>
        </div>
      </div>
    </div>
  `;
    (_a = document.getElementById("continue-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        (0,_render_modal__WEBPACK_IMPORTED_MODULE_1__.connectToWallet)(module);
    });
    (_b = document
        .getElementById("specify-derivation-path-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        (0,_SpecifyDerivationPath__WEBPACK_IMPORTED_MODULE_2__.renderSpecifyDerivationPath)(module);
    });
}


/***/ }),

/***/ 78122:
/*!***************************************************************!*\
  !*** ./packages/modal-ui-js/src/lib/components/GetAWallet.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderGetAWallet": () => (/* binding */ renderGetAWallet)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modal */ 14016);
/* harmony import */ var _WhatIsAWallet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WhatIsAWallet */ 78491);




function goToWallet(module) {
  if (!_modal__WEBPACK_IMPORTED_MODULE_1__.modalState) {
    return;
  }

  const {
    networkId
  } = _modal__WEBPACK_IMPORTED_MODULE_1__.modalState.selector.options.network;
  let url = "";

  if (module.type === "injected") {
    url = module.metadata.downloadUrl;
  } // TODO: improve links to wallets other than injected type.


  if (module.id === "my-near-wallet") {
    const subdomain = networkId === "testnet" ? "testnet" : "app";
    url = `https://${subdomain}.mynearwallet.com`;
  }

  if (module.id === "near-wallet") {
    const subdomain = networkId === "testnet" ? "testnet." : "";
    url = `https://wallet.${subdomain}near.org`;
  }

  if (url === "" && module.type === "bridge" || module.type === "hardware") {
    return;
  }

  window.open(url, "_blank");
}

function renderGetAWallet() {
  return _renderGetAWallet.apply(this, arguments);
}

function _renderGetAWallet() {
  _renderGetAWallet = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
    var _a, _b;

    if (!_modal__WEBPACK_IMPORTED_MODULE_1__.modalState) {
      return;
    }

    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
      <div class="wallet-home-wrapper">
        <div class="nws-modal-header-wrapper">
        <button class="back-button" id="back-button"><svg width="8" height="14" viewBox="0 0 8 14"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13L1 7L7 1" stroke="#6494EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              </path>
            </svg>
        </button>
          <div class="nws-modal-header">
            <h3 class="middleTitle">Get a Wallet</h3><button class="close-button"><svg xmlns="http://www.w3.org/2000/svg"
                height="24" viewBox="0 0 24 24" width="24" fill="#C1C1C1">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                </path>
              </svg></button>
          </div>
        </div>
        <div class="get-wallet-wrapper" id="wallets">

        </div>
      </div>
    </div>
  `;

    const filterByType = item => {
      return item.type !== "bridge" && item.type !== "hardware";
    };

    const filteredModules = _modal__WEBPACK_IMPORTED_MODULE_1__.modalState.modules.filter(filterByType).slice(0, 3);

    for (let i = 0; i < filteredModules.length; i++) {
      (_a = document.getElementById("wallets")) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", `
    <div class="single-wallet-get">
      <div class="icon">
      <img
          src="${filteredModules[i].metadata.iconUrl}"
          alt="${filteredModules[i].metadata.name}"></div>
      <div class="content">
        <div class="title">${filteredModules[i].metadata.name}</div>
        <div class="description">${filteredModules[i].metadata.description ? filteredModules[i].metadata.description : ""}</div>
      </div>
      <div class="button-get">
        <button class="get-wallet" id="${filteredModules[i].id}">Get</button>
      </div>
    </div>
`);
    }

    Array.from(document.querySelectorAll(".get-wallet")).forEach(button => {
      button.addEventListener("click", () => {
        if (!_modal__WEBPACK_IMPORTED_MODULE_1__.modalState) {
          return;
        }

        const module = _modal__WEBPACK_IMPORTED_MODULE_1__.modalState.modules.find(m => m.id === button.id);

        if (!module) {
          return;
        }

        goToWallet(module);
      });
    });
    (_b = document.getElementById("back-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
      (0,_WhatIsAWallet__WEBPACK_IMPORTED_MODULE_2__.renderWhatIsAWallet)();
    });
  });
  return _renderGetAWallet.apply(this, arguments);
}

/***/ }),

/***/ 6890:
/*!*******************************************************************************!*\
  !*** ./packages/modal-ui-js/src/lib/components/LedgerAccountsOverviewList.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderLedgerAccountsOverviewList": () => (/* binding */ renderLedgerAccountsOverviewList)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modal */ 14016);
/* harmony import */ var _LedgerSelectAccount__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LedgerSelectAccount */ 54672);
/* harmony import */ var _WalletConnectionFailed__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WalletConnectionFailed */ 1583);




function renderLedgerAccountsOverviewList(_x, _x2, _x3) {
  return _renderLedgerAccountsOverviewList.apply(this, arguments);
}

function _renderLedgerAccountsOverviewList() {
  _renderLedgerAccountsOverviewList = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (module, accounts, selectedAccounts) {
    var _a, _b, _c;

    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
    <div class="nws-modal-header-wrapper">
      <button class="back-button" id="back-button"><svg width="8" height="14" viewBox="0 0 8 14"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13L1 7L7 1" stroke="#6494EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            </path>
          </svg>
      </button>
        <div class="nws-modal-header">
          <h3 class="middleTitle">Connecting ${selectedAccounts.length} Account</h3><button class="close-button"><svg xmlns="http://www.w3.org/2000/svg"
              height="24" viewBox="0 0 24 24" width="24" fill="#C1C1C1">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
              </path>
            </svg></button>
        </div>
      </div>
      <div class="derivation-path-wrapper">
        <div class="overview-wrapper">
          <p>Overview the list of authorized account(s), complete sign in by clicking the button below.</p>
          <div class="accounts" id="accounts"></div>
          <div class="action-buttons"><button class="middleButton" id="finish-button">Finish</button></div>
        </div>
      </div>
    </div>
  `;

    for (let i = 0; i < selectedAccounts.length; i++) {
      (_a = document.getElementById("accounts")) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", `
        <div>
          <div class="account">
            <span>${selectedAccounts[i].accountId}</span>
          </div>
        </div>
      `);
    }

    (_b = document.getElementById("back-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
      (0,_LedgerSelectAccount__WEBPACK_IMPORTED_MODULE_2__.renderLedgerSelectAccount)(module, accounts);
    });
    (_c = document.getElementById("finish-button")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", /*#__PURE__*/(0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        if (!_modal__WEBPACK_IMPORTED_MODULE_1__.modalState) {
          return;
        }

        const wallet = yield module.wallet();
        wallet.signIn({
          contractId: _modal__WEBPACK_IMPORTED_MODULE_1__.modalState.options.contractId,
          methodNames: _modal__WEBPACK_IMPORTED_MODULE_1__.modalState.options.methodNames,
          accounts: selectedAccounts
        });
        _modal__WEBPACK_IMPORTED_MODULE_1__.modalState.container.children[0].classList.remove("open");
      } catch (err) {
        yield (0,_WalletConnectionFailed__WEBPACK_IMPORTED_MODULE_3__.renderWalletConnectionFailed)(module, err);
      }
    }));
  });
  return _renderLedgerAccountsOverviewList.apply(this, arguments);
}

/***/ }),

/***/ 54672:
/*!************************************************************************!*\
  !*** ./packages/modal-ui-js/src/lib/components/LedgerSelectAccount.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderLedgerSelectAccount": () => (/* binding */ renderLedgerSelectAccount)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modal */ 14016);
/* harmony import */ var _LedgerAccountsOverviewList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LedgerAccountsOverviewList */ 6890);
/* harmony import */ var _SpecifyDerivationPath__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SpecifyDerivationPath */ 6284);




function renderLedgerSelectAccount(_x, _x2) {
  return _renderLedgerSelectAccount.apply(this, arguments);
}

function _renderLedgerSelectAccount() {
  _renderLedgerSelectAccount = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (module, accounts) {
    var _a, _b, _c;

    if (!_modal__WEBPACK_IMPORTED_MODULE_1__.modalState) {
      return;
    }

    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header-wrapper"><button class="back-button" id="back-button"><svg width="8" height="14" viewBox="0 0 8 14"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13L1 7L7 1" stroke="#6494EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            </path>
          </svg></button>
        <div class="nws-modal-header">
          <h3 class="middleTitle">Select Your Accounts</h3><button class="close-button"><svg
              xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#C1C1C1">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
              </path>
            </svg></button>
        </div>
      </div>
      <div class="derivation-path-wrapper">
        <div class="choose-ledger-account-form-wrapper">
          <p>We found ${accounts.length} accounts on your device. Select the account(s) you wish to connect.</p>
          <div class="button-wrapper"><button id="change-derivation-path-button">HD.../${_modal__WEBPACK_IMPORTED_MODULE_1__.modalState.derivationPath.slice(-2, -1)}</button></div>
          <form class="form">
            <div>
              <div class="nws-form-control">
                <div id="accounts"></div>
              <div class="action-buttons"><button class="middleButton" id="connect-button">Connect</button></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

    for (let i = 0; i < accounts.length; i++) {
      (_a = document.getElementById("accounts")) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", `
      <div class="account">
        <input type="checkbox" id="${accounts[i].accountId}" name="account" value="${accounts[i].accountId}" ${i === 0 ? "checked" : ""}>
        <label for="${accounts[i].accountId}"> ${accounts[i].accountId}</label>
        <br>
      </div>
      `);
    }

    (_b = document.getElementById("change-derivation-path-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
      (0,_SpecifyDerivationPath__WEBPACK_IMPORTED_MODULE_3__.renderSpecifyDerivationPath)(module);
    });
    (_c = document.getElementById("connect-button")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", e => {
      e.preventDefault();
      const accountCheckStatuses = Array.from(document.querySelectorAll("input[name='account']")).map(el => el.checked);
      const checkedAccounts = accounts.filter((_account, i) => accountCheckStatuses[i]);

      if (checkedAccounts.length < 1) {
        return;
      }

      (0,_LedgerAccountsOverviewList__WEBPACK_IMPORTED_MODULE_2__.renderLedgerAccountsOverviewList)(module, accounts, checkedAccounts);
    });
  });
  return _renderLedgerSelectAccount.apply(this, arguments);
}

/***/ }),

/***/ 49008:
/*!**************************************************************************!*\
  !*** ./packages/modal-ui-js/src/lib/components/NoLedgerAccountsFound.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderNoLedgerAccountsFound": () => (/* binding */ renderNoLedgerAccountsFound)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var _ConnectHardwareWallet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConnectHardwareWallet */ 97686);


function renderNoLedgerAccountsFound(_x) {
  return _renderNoLedgerAccountsFound.apply(this, arguments);
}

function _renderNoLedgerAccountsFound() {
  _renderNoLedgerAccountsFound = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (module) {
    var _a;

    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header-wrapper"><button class="back-button" id="back-button"><svg width="8" height="14" viewBox="0 0 8 14"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13L1 7L7 1" stroke="#6494EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            </path>
          </svg></button>
        <div class="nws-modal-header">
          <h3 class="middleTitle">No Accounts Found</h3><button class="close-button"><svg xmlns="http://www.w3.org/2000/svg"
              height="24" viewBox="0 0 24 24" width="24" fill="#C1C1C1">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
              </path>
            </svg></button>
        </div>
      </div>
      <div class="derivation-path-wrapper">
        <div class="no-accounts-found-wrapper">
          <p>Can't found any account associated with this Ledger. Please create a new NEAR account on <a
              href="https://testnet.mynearwallet.com/create" target="_blank">MyNearWallet</a> or connect an another Ledger.
          </p>
        </div>
      </div>
    </div>
  `;
    (_a = document.getElementById("back-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
      (0,_ConnectHardwareWallet__WEBPACK_IMPORTED_MODULE_1__.renderConnectHardwareWallet)(module);
    });
  });
  return _renderNoLedgerAccountsFound.apply(this, arguments);
}

/***/ }),

/***/ 6284:
/*!**************************************************************************!*\
  !*** ./packages/modal-ui-js/src/lib/components/SpecifyDerivationPath.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderSpecifyDerivationPath": () => (/* binding */ renderSpecifyDerivationPath)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modal */ 14016);
/* harmony import */ var _render_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../render-modal */ 71244);
/* harmony import */ var _ConnectHardwareWallet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ConnectHardwareWallet */ 97686);
/* harmony import */ var _LedgerAccountsOverviewList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LedgerAccountsOverviewList */ 6890);
/* harmony import */ var _LedgerSelectAccount__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LedgerSelectAccount */ 54672);
/* harmony import */ var _NoLedgerAccountsFound__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NoLedgerAccountsFound */ 49008);
/* harmony import */ var _WalletConnecting__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./WalletConnecting */ 70800);
/* harmony import */ var _WalletConnectionFailed__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./WalletConnectionFailed */ 1583);









function renderSpecifyDerivationPath(module) {
  var _a, _b, _c, _d;

  if (!_modal__WEBPACK_IMPORTED_MODULE_1__.modalState) {
    return;
  }

  document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header-wrapper"><button class="back-button" id="back-button"><svg width="8" height="14" viewBox="0 0 8 14"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13L1 7L7 1" stroke="#6494EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            </path>
          </svg></button>
        <div class="nws-modal-header">
          <h3 class="middleTitle">Specify HD Path</h3><button class="close-button"><svg xmlns="http://www.w3.org/2000/svg"
              height="24" viewBox="0 0 24 24" width="24" fill="#C1C1C1">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
              </path>
            </svg></button>
        </div>
      </div>
      <div class="derivation-path-wrapper">
        <div class="specify-path-wrapper">
          <div class="change-path-wrapper">
            <div class="display-path"><span>44'/397'/0'/0'/</span></div>
            <div class="change-path">
              <div class="path-value"><span id="derivation-path-index"></span></div>
              <div class="buttons-wrapper">
                <button id="increase-index-button">
                  <svg width="10" height="7" viewBox="0 0 10 7" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5.4762L5 1.4762L1 5.4762" stroke="#4F7CD1" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round"></path>
                  </svg>
                </button>
                <button id="decrease-index-button">
                  <svg width="10" height="7" viewBox="0 0 10 7" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.52382L5 5.52382L9 1.52382" stroke="#4F7CD1" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <p class="path-description">Enter your preferred HD path, then scan for any active accounts.</p>
          <div class="action-buttons"><button class="middleButton" id="scan-button">Scan</button></div>
        </div>
      </div>
    </div>
  `;
  const derivationPathIndexElement = document.getElementById("derivation-path-index");
  derivationPathIndexElement.innerText = _modal__WEBPACK_IMPORTED_MODULE_1__.modalState.derivationPath.slice(-2, -1);
  (_a = document.getElementById("increase-index-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    if (!_modal__WEBPACK_IMPORTED_MODULE_1__.modalState) {
      return;
    }

    const nextIndex = parseInt(derivationPathIndexElement.innerText) + 1;
    _modal__WEBPACK_IMPORTED_MODULE_1__.modalState.derivationPath = _modal__WEBPACK_IMPORTED_MODULE_1__.modalState.derivationPath.slice(0, -2) + nextIndex.toString() + "'";
    derivationPathIndexElement.innerText = nextIndex.toString();
  });
  (_b = document.getElementById("decrease-index-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    if (!_modal__WEBPACK_IMPORTED_MODULE_1__.modalState) {
      return;
    }

    const nextIndex = parseInt(derivationPathIndexElement.innerText) - 1;
    _modal__WEBPACK_IMPORTED_MODULE_1__.modalState.derivationPath = _modal__WEBPACK_IMPORTED_MODULE_1__.modalState.derivationPath.slice(0, -2) + nextIndex.toString() + "'";

    if (nextIndex >= 0) {
      derivationPathIndexElement.innerText = nextIndex.toString();
    }
  });
  (_c = document.getElementById("back-button")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    (0,_ConnectHardwareWallet__WEBPACK_IMPORTED_MODULE_3__.renderConnectHardwareWallet)(module);
  });
  (_d = document.getElementById("scan-button")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", /*#__PURE__*/(0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
    try {
      const wallet = yield module.wallet();
      (0,_WalletConnecting__WEBPACK_IMPORTED_MODULE_7__.renderWalletConnecting)(module);
      const accounts = yield (0,_render_modal__WEBPACK_IMPORTED_MODULE_2__.resolveAccounts)(wallet);

      if (!accounts || accounts.length < 1) {
        return (0,_NoLedgerAccountsFound__WEBPACK_IMPORTED_MODULE_6__.renderNoLedgerAccountsFound)(module);
      }

      if (accounts.length === 1) {
        (0,_LedgerAccountsOverviewList__WEBPACK_IMPORTED_MODULE_4__.renderLedgerAccountsOverviewList)(module, accounts, accounts);
      }

      (0,_LedgerSelectAccount__WEBPACK_IMPORTED_MODULE_5__.renderLedgerSelectAccount)(module, accounts);
    } catch (err) {
      yield (0,_WalletConnectionFailed__WEBPACK_IMPORTED_MODULE_8__.renderWalletConnectionFailed)(module, err);
    }
  }));
}

/***/ }),

/***/ 94880:
/*!******************************************************************!*\
  !*** ./packages/modal-ui-js/src/lib/components/WalletAccount.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderWalletAccount": () => (/* binding */ renderWalletAccount)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);

function renderWalletAccount() {
  return _renderWalletAccount.apply(this, arguments);
}

function _renderWalletAccount() {
  _renderWalletAccount = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (module = null) {
    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
    <div class="nws-modal-header">
        <div><span class="connected-flag">Connected</span></div>
        <button class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg"
              height="24" viewBox="0 0 24 24" width="24" fill="#C1C1C1">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
              </path>
          </svg>
        </button>
      </div>
      <div class="connecting-wrapper">
        <div class="content">
          <div class="icon"><img src="${module === null || module === void 0 ? void 0 : module.metadata.iconUrl}" alt="${module === null || module === void 0 ? void 0 : module.metadata.name}"></div>
          <h3 class="connecting-name">${module === null || module === void 0 ? void 0 : module.metadata.name}</h3>
          <div class="wallet-connected-success"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="12" fill="#51BD7C"></rect><path d="M7.75 12.75L10 15.25L16.25 8.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg><span>Connection Successful</span></div>
        </div>
      </div>
    </div>
  `;
  });
  return _renderWalletAccount.apply(this, arguments);
}

/***/ }),

/***/ 70800:
/*!*********************************************************************!*\
  !*** ./packages/modal-ui-js/src/lib/components/WalletConnecting.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderWalletConnecting": () => (/* binding */ renderWalletConnecting)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);

function renderWalletConnecting() {
  return _renderWalletConnecting.apply(this, arguments);
}

function _renderWalletConnecting() {
  _renderWalletConnecting = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (module = null) {
    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header">
        <h3 class="middleTitle"></h3>
        <button class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg"
              height="24" viewBox="0 0 24 24" width="24" fill="#C1C1C1">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
              </path>
          </svg>
        </button>
      </div>
      <div class="connecting-wrapper">
        <div class="content">
          <div class="icon"><img src="${module === null || module === void 0 ? void 0 : module.metadata.iconUrl}" alt="${module === null || module === void 0 ? void 0 : module.metadata.name}"></div>
          <h3 class="connecting-name">${module === null || module === void 0 ? void 0 : module.metadata.name}</h3>
          <div class="connecting-details">
            <div class="spinner"><img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAR3SURBVHgBpVZ9aJVVGH+e55z33bi7zY9hMz+yMAeNoEIq6A9ZRKQWEsQNFIIpsf5Y9E+GsD9iBEEDMUkDa6ShRKKZYIWiRkaKaUGUGCKOTGMF84PNO99773vOefq9720yK5ZzD/dwPt/nd37P17lEk5Qnuz9roUkKT7T5bNe+QjTNLCHv24h1Xgh+OmtwQYPH2jUXwlnW9NRooqePfLS6MmmQ59cdeEGJlkJZA5MGVecoAwghBYZTVY9ftuaDSy8x8w9fbFl95JZAXuw9dmelkvRAyXxS7wMFryG4bIyWZiqzPgMhaFfGfn3NY3AZG9sPf/Dy8HidZvxkZc/h1pqnPlKey6yspMqUd9jVAEYY6RCGDQTwjGDwGTgAlbwRijV1C9vanz577tT+6r+YrOz5rlXFrQ/qZ+FbDxCfXS5oOgxln4v473f3rbgwdn7FK5/MCaH2eAg6X8g3K2iBMTiBkNJVKbod+ze9mgPZsY/UaicYzCE1HgpZc558olCTjTvWLxv9p1n3bV45iO7T5zq3TU9j9xTOLwQ5D9t48aEYrtGj2P/2BpNS78nZJoRdlDsYd8vphz273lqyhW5Rnlnz3hOe6SEwghvxPUMTVfYe2rpuUOqOkZeIxdSbsSJ8eTIAmXy5tftrMPkzi0C4B2ZDNHp+INvLQURkhYiJ6gDGko376DbEJ8k3mcnYBSeSM2ptL/XGsurNnxfnDIQNwCKADO1845Ef6Tbk0M51g4joMgncDyBmkrtsNEMQovcDxGYsGL2yDNAUxPv0VySs4yxhfeYbabJg0Awg+ILylEB6nKMpSOp0WCR1+QSuD4ELljNDEfyRrdXPCU1BTEgD7pyOzVmC2iBm0KgYAMCEeXovoClIjdKiVdQ3FYbzmatxWRqMPcNsDHyfNWskWk5TkJhNEwVyxA6hLL5clLJsW7voFxa6LiR5CCOeWzo3XFxKtyEdy3tnp7VahAoDp6PEVGvJye09l3P7K9k9WQijXBv4B6WG+0pvD0ybFEBHZ6OPh+/OGaBsIvNRAGp/ZHv1jJeon+omszBkFsr3FhsLB7rev3JLQKVSyfjmaW2BJSavDlqR7c5VrR+4AbLttbkXMehH7gjA8gZiD/tq+Or/ABZ3dUW/J62LcPUGcrW8pKSVFAg6cHz3O0l25qZHa/XGwWPg9aAwwzdZAaDX+7tbNsMYf5+bpaUS0dDQEF8rtsUxCbI5e5KRzGhBMiqNxllKju7d8NOYXjseRBytQngcVDL3wD9H+7vf3YS7mnnzqrZpwSxrwkh04cpM5NTMyJdHbIgaESyxJ6tZ5cDbw3qd0tqVCp25Se/4yYdr5/zm/ehjwvpxZHgN0Wlub0/Yt7awdykqRYFHy6NUQVrBd4o6p6ngrVL2Bo8ksuJqoXzq9Ln9m6rj9U74b6Wjo8OeP082aY5NUxRsYzwDkeFsU+MdUU3U4PG0QtbahqhadDMuHTy4fvS/9EwIUpdeuW/ZiShOipFxURRbNdWETFMRZrCFlEZGkuPHdycTafgLExNiI6YfUpcAAAAASUVORK5CYII="
                alt="loading-icon"></div><span>Connecting to ${module === null || module === void 0 ? void 0 : module.metadata.name}...</span>
        </div>
      </div>
    </div>
  </div>
  `;
  });
  return _renderWalletConnecting.apply(this, arguments);
}

/***/ }),

/***/ 1583:
/*!***************************************************************************!*\
  !*** ./packages/modal-ui-js/src/lib/components/WalletConnectionFailed.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderWalletConnectionFailed": () => (/* binding */ renderWalletConnectionFailed)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var _render_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../render-modal */ 71244);


function renderWalletConnectionFailed(_x, _x2) {
  return _renderWalletConnectionFailed.apply(this, arguments);
}

function _renderWalletConnectionFailed() {
  _renderWalletConnectionFailed = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (module, err) {
    var _a;

    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header">
        <h3 class="middleTitle"></h3>
        <button class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg"
              height="24" viewBox="0 0 24 24" width="24" fill="#C1C1C1">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
              </path>
          </svg>
        </button>
      </div>
      <div class="alert-message connecting-wrapper connecting-wrapper-err">
        <div class="content">
          <div class="icon"><img src="${module.metadata.iconUrl}" alt="${module.metadata.name}"></div>
          <h3 class="connecting-name">${module.metadata.name}</h3>
          <div class="connecting-details">
            <div class="connection">
              <div class="error-wrapper">
                <div class="error"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http:/*www.w3.org/2000/svg">*/ <rect width="24" height="24" rx="12" fill="#CE5A6F"></rect>
                    <path d="M17.25 6.75L6.75 17.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round"></path>
                    <path d="M6.75 6.75L17.25 17.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round"></path>
                  </svg>Connection Failed</div>
                  <p>${err && err.message ? err.message : ""}</p>${!(module === null || module === void 0 ? void 0 : module.metadata.deprecated) && (module === null || module === void 0 ? void 0 : module.metadata.available) ? "<button id='retry-button'>Retry</button>" : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
    (_a = document.getElementById("retry-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
      (0,_render_modal__WEBPACK_IMPORTED_MODULE_1__.connectToWallet)(module);
    });
  });
  return _renderWalletConnectionFailed.apply(this, arguments);
}

/***/ }),

/***/ 37006:
/*!***********************************************************************!*\
  !*** ./packages/modal-ui-js/src/lib/components/WalletNotInstalled.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderWalletNotInstalled": () => (/* binding */ renderWalletNotInstalled)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modal */ 14016);

function renderWalletNotInstalled(module) {
    var _a, _b;
    if (!_modal__WEBPACK_IMPORTED_MODULE_0__.modalState) {
        return;
    }
    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
      <div class="nws-modal-header-wrapper"><button class="back-button"><svg width="8" height="14" viewBox="0 0 8 14"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13L1 7L7 1" stroke="#6494EE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            </path>
          </svg></button>
        <div class="nws-modal-header">
          <h3 class="middleTitle"></h3><button class="close-button"><svg xmlns="http://www.w3.org/2000/svg" height="24"
              viewBox="0 0 24 24" width="24" fill="#C1C1C1">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
              </path>
            </svg></button>
        </div>
      </div>
      <div class="wallet-not-installed-wrapper">
        <div class="wallet-data">
          <div class="wallet-icon-box"><img
              src="${module.metadata.iconUrl}" alt="${module.metadata.name}"></div>
          <p>${module.metadata.name}</p>
        </div>
        <p>You'll need to install ${module.metadata.name} to continue. After installing<span class="refresh-link" id="refresh-page-lint">&nbsp;refresh the
            page.</span></p>
        <div class="action-buttons"><button class="middleButton" id="download-button">Open ${module.metadata.name}</button></div>
      </div>
    </div>
  `;
    (_a = document
        .getElementById("refresh-page-lint")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        window.location.reload();
    });
    (_b = document.getElementById("download-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        if (module.type !== "injected") {
            return;
        }
        window.open(module.metadata.downloadUrl, "_blank");
    });
}


/***/ }),

/***/ 78491:
/*!******************************************************************!*\
  !*** ./packages/modal-ui-js/src/lib/components/WhatIsAWallet.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderWhatIsAWallet": () => (/* binding */ renderWhatIsAWallet)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var _GetAWallet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GetAWallet */ 78122);


function renderWhatIsAWallet() {
  return _renderWhatIsAWallet.apply(this, arguments);
}

function _renderWhatIsAWallet() {
  _renderWhatIsAWallet = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
    var _a, _b;

    document.querySelector(".modal-right").innerHTML = `
    <div class="nws-modal-body">
      <div class="wallet-home-wrapper">
        <div class="nws-modal-header-wrapper">
          <div class="nws-modal-header">
            <h3 class="middleTitle">What is a Wallet?</h3>
            <button class="close-button">
              <svg
                xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#C1C1C1">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                </path>
              </svg>
            </button>
          </div>
        </div>

        <div class="wallet-info-wrapper  what-wallet-hide">
          <div class="wallet-what">
            <div class="content-side">
              <h3>Secure &amp; Manage Your Digital Assets</h3>
              <p>Safely store and transfer your crypto and NFTs.</p>
            </div>
          </div>

          <div class="wallet-what">
              <div class="content-side">
                  <h3>Log In to Any NEAR App</h3>
                  <p>No need to create new accounts or credentials. Connect your wallet and you are good to go!</p>
              </div>
          </div>

            <div class="button-spacing"></div>
              <button class="middleButton" id="get-a-wallet-button">Get a Wallet</button>
        </div>

        <div class="what-wallet-mobile">
          <p>
            Use a wallet to secure and manage your NEAR assets, and to log in
            to any NEAR app without the need for usernames and passwords.
          </p>
          <button class="middleButton" id="get-a-wallet-button-mobile">Get a Wallet</button>
        </div>

      </div>
    </div>
  `;
    (_a = document.getElementById("get-a-wallet-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
      (0,_GetAWallet__WEBPACK_IMPORTED_MODULE_1__.renderGetAWallet)();
    });
    (_b = document.getElementById("get-a-wallet-button-mobile")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
      (0,_GetAWallet__WEBPACK_IMPORTED_MODULE_1__.renderGetAWallet)();
    });
  });
  return _renderWhatIsAWallet.apply(this, arguments);
}

/***/ }),

/***/ 14016:
/*!***********************************************!*\
  !*** ./packages/modal-ui-js/src/lib/modal.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_DERIVATION_PATH": () => (/* binding */ DEFAULT_DERIVATION_PATH),
/* harmony export */   "modalState": () => (/* binding */ modalState),
/* harmony export */   "setupModal": () => (/* binding */ setupModal),
/* harmony export */   "updateModalState": () => (/* binding */ updateModalState)
/* harmony export */ });
/* harmony import */ var _render_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render-modal */ 71244);
/* harmony import */ var _components_WhatIsAWallet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/WhatIsAWallet */ 78491);
/* harmony import */ var _components_WalletAccount__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/WalletAccount */ 94880);



const MODAL_ELEMENT_ID = "near-wallet-selector-modal";
const DEFAULT_DERIVATION_PATH = "44'/397'/0'/0'/1'";
let modalInstance = null;
let modalState = null;
function updateModalState(newModalState) {
    modalState = newModalState;
}
if (typeof window !== "undefined") {
    const el = document.createElement("div");
    el.id = MODAL_ELEMENT_ID;
    document.body.appendChild(el);
}
const setupModal = (selector, options) => {
    modalState = {
        container: document.getElementById(MODAL_ELEMENT_ID),
        selector,
        options,
        route: {
            name: "WalletOptions",
        },
        modules: [],
        derivationPath: DEFAULT_DERIVATION_PATH,
    };
    modalState.selector.store.observable.subscribe((state) => {
        if (!modalState) {
            return;
        }
        state.modules.sort((current, next) => {
            if (current.metadata.deprecated === next.metadata.deprecated) {
                return 0;
            }
            return current.metadata.deprecated ? 1 : -1;
        });
        modalState.modules = state.modules;
    });
    const close = (e) => {
        if (e.key === "Escape") {
            if (!modalState) {
                return;
            }
            modalState.container.children[0].classList.remove("open");
        }
    };
    window.addEventListener("keydown", close);
    (0,_render_modal__WEBPACK_IMPORTED_MODULE_0__.renderModal)();
    if (!modalInstance) {
        modalInstance = {
            show: () => {
                if (!modalState) {
                    return;
                }
                (0,_render_modal__WEBPACK_IMPORTED_MODULE_0__.renderModal)();
                const selectedWalletId = modalState.selector.store.getState().selectedWalletId;
                if (selectedWalletId) {
                    const module = modalState.modules.find((m) => m.id === selectedWalletId);
                    (0,_components_WalletAccount__WEBPACK_IMPORTED_MODULE_2__.renderWalletAccount)(module);
                }
                else {
                    (0,_components_WhatIsAWallet__WEBPACK_IMPORTED_MODULE_1__.renderWhatIsAWallet)();
                }
                modalState.container.children[0].classList.add("open");
            },
            hide: () => {
                if (!modalState) {
                    return;
                }
                modalState.container.children[0].classList.remove("open");
            },
        };
    }
    return modalInstance;
};


/***/ }),

/***/ 71244:
/*!******************************************************!*\
  !*** ./packages/modal-ui-js/src/lib/render-modal.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "connectToWallet": () => (/* binding */ connectToWallet),
/* harmony export */   "renderModal": () => (/* binding */ renderModal),
/* harmony export */   "resolveAccounts": () => (/* binding */ resolveAccounts)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var _components_ConnectHardwareWallet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ConnectHardwareWallet */ 97686);
/* harmony import */ var _components_LedgerAccountsOverviewList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/LedgerAccountsOverviewList */ 6890);
/* harmony import */ var _components_LedgerSelectAccount__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/LedgerSelectAccount */ 54672);
/* harmony import */ var _components_NoLedgerAccountsFound__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/NoLedgerAccountsFound */ 49008);
/* harmony import */ var _components_WalletConnecting__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/WalletConnecting */ 70800);
/* harmony import */ var _components_WalletConnectionFailed__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/WalletConnectionFailed */ 1583);
/* harmony import */ var _components_WalletNotInstalled__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/WalletNotInstalled */ 37006);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modal */ 14016);
/* harmony import */ var _components_WalletAccount__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/WalletAccount */ 94880);











const getAccountIds = /*#__PURE__*/function () {
  var _ref = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (publicKey) {
    if (!_modal__WEBPACK_IMPORTED_MODULE_8__.modalState) {
      return [];
    }

    const response = yield fetch(`${_modal__WEBPACK_IMPORTED_MODULE_8__.modalState.selector.options.network.indexerUrl}/publicKey/ed25519:${publicKey}/accounts`);

    if (!response.ok) {
      throw new Error("Failed to get account id from public key");
    }

    const accountIds = yield response.json();

    if (!Array.isArray(accountIds) || !accountIds.length) {
      return [];
    }

    return accountIds;
  });

  return function getAccountIds(_x) {
    return _ref.apply(this, arguments);
  };
}();

const resolveAccounts = /*#__PURE__*/function () {
  var _ref2 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (wallet) {
    if (!_modal__WEBPACK_IMPORTED_MODULE_8__.modalState) {
      return [];
    }

    const publicKey = yield wallet.getPublicKey(_modal__WEBPACK_IMPORTED_MODULE_8__.modalState.derivationPath);

    try {
      const accountIds = yield getAccountIds(publicKey);
      return accountIds.map((accountId, index) => {
        return {
          derivationPath: _modal__WEBPACK_IMPORTED_MODULE_8__.modalState.derivationPath,
          publicKey,
          accountId,
          selected: index === 0
        };
      });
    } catch (e) {
      return null;
    }
  });

  return function resolveAccounts(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
function connectToWallet(_x3) {
  return _connectToWallet.apply(this, arguments);
}

function _connectToWallet() {
  _connectToWallet = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (module) {
    if (!_modal__WEBPACK_IMPORTED_MODULE_8__.modalState) {
      return;
    }

    const {
      selectedWalletId
    } = _modal__WEBPACK_IMPORTED_MODULE_8__.modalState.selector.store.getState();

    if (selectedWalletId === module.id) {
      (0,_components_WalletAccount__WEBPACK_IMPORTED_MODULE_9__.renderWalletAccount)(module);
      return;
    }

    try {
      if (module.type === "injected" && !module.metadata.available) {
        return (0,_components_WalletNotInstalled__WEBPACK_IMPORTED_MODULE_7__.renderWalletNotInstalled)(module);
      }

      if (module.metadata.deprecated) {
        return (0,_components_WalletConnectionFailed__WEBPACK_IMPORTED_MODULE_6__.renderWalletConnectionFailed)(module, new Error("Wallet is deprecated"));
      }

      const wallet = yield module.wallet();
      yield (0,_components_WalletConnecting__WEBPACK_IMPORTED_MODULE_5__.renderWalletConnecting)(module);

      if (wallet.type === "hardware") {
        const accounts = yield resolveAccounts(wallet);

        if (!accounts || accounts.length < 1) {
          return (0,_components_NoLedgerAccountsFound__WEBPACK_IMPORTED_MODULE_4__.renderNoLedgerAccountsFound)(module);
        }

        if (accounts.length === 1) {
          return (0,_components_LedgerAccountsOverviewList__WEBPACK_IMPORTED_MODULE_2__.renderLedgerAccountsOverviewList)(module, accounts, accounts);
        } else {
          return (0,_components_LedgerSelectAccount__WEBPACK_IMPORTED_MODULE_3__.renderLedgerSelectAccount)(module, accounts);
        }
      }

      yield wallet.signIn({
        contractId: _modal__WEBPACK_IMPORTED_MODULE_8__.modalState.options.contractId,
        methodNames: _modal__WEBPACK_IMPORTED_MODULE_8__.modalState.options.methodNames
      });
      _modal__WEBPACK_IMPORTED_MODULE_8__.modalState.container.children[0].classList.remove("open");
    } catch (err) {
      const {
        name
      } = module.metadata;
      const message = err instanceof Error ? err.message : "Something went wrong";
      yield (0,_components_WalletConnectionFailed__WEBPACK_IMPORTED_MODULE_6__.renderWalletConnectionFailed)(module, new Error(`Failed to sign in with ${name}: ${message}`));
    }
  });
  return _connectToWallet.apply(this, arguments);
}

function renderModal() {
  var _a, _b, _c;

  if (!_modal__WEBPACK_IMPORTED_MODULE_8__.modalState) {
    return;
  }

  _modal__WEBPACK_IMPORTED_MODULE_8__.modalState.container.innerHTML = `
    <div class="nws-modal-wrapper ${_modal__WEBPACK_IMPORTED_MODULE_8__.modalState.options.theme === "dark" ? "dark-theme" : ""}">
      <div class="nws-modal-overlay"></div>
      <div class="nws-modal">
        <div class="modal-left">
          <div class="modal-left-title">
            <h2>Connect Your Wallet</h2>
          </div>
          <div class="nws-modal-body">
            <div class="wallet-options-wrapper">
              <ul class="options-list"></ul>
            </div>
          </div>
        </div>
        <div class="modal-right"></div>
      </div>
    </div>
  `;

  for (let i = 0; i < _modal__WEBPACK_IMPORTED_MODULE_8__.modalState.modules.length; i++) {
    const module = _modal__WEBPACK_IMPORTED_MODULE_8__.modalState.modules[i];
    const {
      name,
      description,
      iconUrl
    } = module.metadata;
    (_a = document.querySelector(".options-list")) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML("beforeend", `
        <div class="single-wallet ${module.id === _modal__WEBPACK_IMPORTED_MODULE_8__.modalState.selector.store.getState().selectedWalletId ? "selected-wallet connected-wallet" : ""} sidebar ${module.metadata.deprecated ? "deprecated-wallet" : ""}" id="module-${module.id}">
          <div class="icon"><img src="${iconUrl}" alt="${name}"></div>
          <div class="content">
            <div class="title">${name}</div>
            <div class="description">${description}</div>
          </div>
          ${module.metadata.deprecated ? `
              <div class="warning-triangle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.95215 16.3536L10.2152 5.85657C10.9531 4.38481 13.0538 4.38519 13.7912 5.85723L19.0494 16.3543C19.7156 17.6841 18.7486 19.25 17.2612 19.25H6.74001C5.25228 19.25 4.28535 17.6835 4.95215 16.3536Z" stroke="#E6B73E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 10V12" stroke="#E6B73E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.5 16C12.5 16.2761 12.2761 16.5 12 16.5C11.7239 16.5 11.5 16.2761 11.5 16C11.5 15.7239 11.7239 15.5 12 15.5C12.2761 15.5 12.5 15.7239 12.5 16Z" stroke="#E6B73E"></path></svg>
              </div>
                ` : ""}
        </div>
      `);
    (_b = document.getElementById("module-" + module.id)) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
      var _a;

      document.querySelectorAll(".selected-wallet").forEach(element => {
        element.classList.remove("selected-wallet");
      });
      (_a = document.getElementById("module-" + module.id)) === null || _a === void 0 ? void 0 : _a.classList.add("selected-wallet");

      if (module.type === "hardware") {
        return (0,_components_ConnectHardwareWallet__WEBPACK_IMPORTED_MODULE_1__.renderConnectHardwareWallet)(module);
      }

      connectToWallet(module);
    });
  }

  (_c = document.querySelector(".nws-modal-overlay")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    if (!_modal__WEBPACK_IMPORTED_MODULE_8__.modalState) {
      return;
    }

    _modal__WEBPACK_IMPORTED_MODULE_8__.modalState.container.children[0].classList.remove("open");
  });
  document.addEventListener("click", e => {
    if (!_modal__WEBPACK_IMPORTED_MODULE_8__.modalState) {
      return;
    }

    const target = e.target;

    if (target && target.className === "close-button") {
      _modal__WEBPACK_IMPORTED_MODULE_8__.modalState.container.children[0].classList.remove("open");
    }
  });
}

/***/ }),

/***/ 15502:
/*!**********************************************!*\
  !*** ./packages/my-near-wallet/src/index.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupMyNearWallet": () => (/* reexport safe */ _lib_my_near_wallet__WEBPACK_IMPORTED_MODULE_0__.setupMyNearWallet)
/* harmony export */ });
/* harmony import */ var _lib_my_near_wallet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/my-near-wallet */ 9281);



/***/ }),

/***/ 74531:
/*!*************************************************!*\
  !*** ./packages/my-near-wallet/src/lib/icon.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAD8UExURUdwTGx5rpLO8YOYx1Og0ly29X5ezR4mT0tiji4eWJ953KGn1Jxs7qB9xvfD/Us0gduu8yeh4HOq74dD647R91256eSz+j82cbvg/dSj/LuL79Wp6zCf24KN9xANGRANF59d/0W+/taa/8iN/3HL9uOn/z638Bil7l3G84TP+FHB8o5A/0i9/ZjU+47S+vq8/4Qy/S6w8O+x/5Rp/wyg7G2T/s+T/vO2/+qt/1qp/qDV/HyD/ki4+4R7/qnY/tyh/1Gx/ptU/76E/2bJ9Ld8/4t0/pxe+XvN9iOq7rB0/0i88aRk/6ps/z++/naL/mab/mGh/pVM/wub5mGd+fAEOhEAAAAgdFJOUwBEyWKA47EKJhnFluGA6l3H67Du6crdNOXs5q/I65rcQbfB9AAAIABJREFUeNrsnE9r4zoXxidOG9tNQqBvSrLKeKGF7WIz4J0WgSCuDc1s7vf/Mq/+S0d2p7Zkd7i0SsZJh3th+PGcR4+OpP748T3+4yNODofDKY2/SYxgdbhcfl4ul9M3rY9ZpZefbFwu6TeMD8dJwPp5Sb6l9eFIL5zW5TDoWrEc35wEjtOFDWPxjE2aJMkqWa3W6/WevuigPyVJ+tWngTg+HQ58PmSDQlqvt5Eax+jIBv2UY7umyL6u0JiMBK6DpETp4KqmL/ngX9hnwcEJYl8TGIV1EpzOEaNUCUBqFPwPfRX0W8GfFSPGgX255JCcTpwUByVY1WAU/FHwLxRWV3RdIYGtvhIvKqoVI0WriwoGK1CDvLi8JDouse5L8YqT08M2Op+vVFOYl54wJ+5PkppkJUkJZYlipN9RV1Ne69UXmCOT0zY6Xq+4Kip7GEYGmKZVyNF1ghj9whx//ZfltXQYTE/b8xnTUeFr1R82Lm7vwuPh6Cgz9jr+TVx8Mt+zcTgt0w6Ik310xIJVJXxdUaqgsIzH1w6tjlekxrVdpX/FSlb7zW63a+lrt3vazG8JFiqHVa2ewOQLlR70W1oX58XlhSiv7aerKz4xUvd7Rse9pWO32xxm/VfE6To64yt1KyEsgUt8ckT99GDsHUpL6oq9EaKT4+cWY5weNrvfbZtlNwqLfkpcM0o8XtFMhZlRUT7YYDLKEtmhsurQJNO6R0sEL0brk3FRWe3+ydpMDvblzpDtnvYz/SPihIYFzHRFYYE6xMazBnJWYTyrhsri4uqEfSESPX+WdcWnza7NbjemKyYpVob/Ml5Zu9vP0cmME1aBxZXDuSpdKWSGlK0qxUqteSxUphA7hLoOsednWVe8YiV4y34zTYkX9a4bhXejtbgJp8VQcVmJuDA4Gyp7d2K8TFn1oGnJWbEjqO5ywnLE5+iK8mGyEnbFlMV0dWO1GEyLmhWdA1kKrdiTG7y2duPvss3QWx1qVLVLSxZiJwRWdOQTxJXsd9qrGKvMHsznn4JocbNic6B5KWW5wlLMBmbDesjcOzN4KZLj0uKKD7tWcslcVIJgiLbi1fasSYk3p2WUJTsOdsqqHGVBw9I5q7BQcVp0XlxYXKdNa4Tlqkp8/uNNi0UrzupqawsLd8cYqqoXSkHOqu0ED5SF1AshQo1+tRyteM+F1RhGjXy0oiwZLU9txWwdKEhpTKIIjWv1pDUQHGpXW66uUGfTWi8WIk5Pd6Ao5VqNNDCGq7170WIx9IqFqq4iuXNUVyWr95RVDeYsSKqwPEvSkrgQLcXFhHW/STz8T2uqz9DKfHwrPVisMP/GSV0tZdkxvq6qgf6fzu+1hQsoC+mwRQd/Pi5kXOnmt+Jh53fH4mkG220m/gOSh0gpyuBSVVhhuNxRsbRfh+5sCH1LCqpjvNg39kHYrLiIcfEqZHwah5DzM8tbk2glbBbEVgHKqVANMxViJzvApWFd9wOWcng9FSrHQtLpaUJdgFa8euqHheExzeWptRuzMgqzgpaO8bClVVXuhoXSVT0kLCEtwUo+mG2hxwVoxetdNhYW09YkXUFQ3LIMJ1OJGPJyFoiqVVrD6K6VpSdCpS0xlqjEdD8a1hRa8fYs8DiuBUrRpSWF1e/+DbSzrCq0YpaaDjv2mJ9Wutll9w8xNWKGpLT242gl0fnDEsRDylKkqoF2Vu24FoxYcsGjypDQEa3npRVvRllWw8MXXWGPpJVE0bXvWCad2sLCfc9yZkSoqkI3suyljnQrrimOi+Q5mplWuhnp7zKqUm2lo6wQlqGqQygsteDBoAFfuWsdp1Oquu+82dBZyoKuRdhr3kqksMbSov8dja8jtZVsoyFlye6DrSwtLVxbydQA05hqW1qOZ1mrQ1GENGyxx7y0KKzbOFgNz6ajXT5xogO+2j0H4Fm2tNxeqZXgB5SF3JQFBnWtefPW2DJsVLRvR9KKk4GgpV1LSQv0HjDcwh8CpTfCQHPGWJampF1+zrw12rPElDghQXBa2PV3LFc9lrIwbCtbs2ExBMzOo9ZEqCtQUpLFmOfH59lW1emYAN+2rb1snEDrHWm56QE7uAZmQ1iInb3QkaTEgwhgiIgPNCetdNxqpzUmn4kexFhauOdbYDVtdwAr9zzb8JahyqSwCjtkS4vwwX/K82g7T38rnqgs9Rf30S5/xX9QlhO1avNyldVzeKejbKpQSosI46Jhi+Rzxa109DoajFs2ntYfpNWbEHstmrofsmQZFrD5Dk2LCJNnpkWBoXlMPh4Jq4ENG563vLTVC1qgDut+F75/5AiUIfR36er6Wy4URrp5bCsZBavpb2fcRva3+tqCMb7CTg+w6p8qfb8MkeblmpaweOZblFl5nKPRHHuW4fj+FshbeIgXPPBQgSNa8iwpnAjtIjTuToBpyaW0GvPYFlXWPYTWhDnRNJcx1rs8yrC0ZfWOO4CGA5gLkW1ZrJ2skAlBWQPl5CXctpiyfGG12ciVz0lWIjZLa6Osyj3XVtfvG5YmVViGZa11pGUREUpFepDSIjPYlqeyGtXfmpK3sNUAtGj1TmnB3p+7aWiON1jW3klJ6ToEwqKoaNp6iP8KrEa5/di8dbLnRNxrl1Z21JLLRJgd3MMzrrur7E6QeQBYpCRRMkPO8itDtbc4tmNzBgZvw3Kb8AM7PEJbmhXYMESgj0V0yDI1mHNplcdgafkbPKfF9hPHnA0cWPmArGV1acCJtt5+YQH9ynYsgvS6EDllSGnRKB/s8QEGb3Yxxs6Jg5YFtyyArApnbSjPdPcSKQLKUgbveFYe7vFB0WFKf6u3kYhB9wH2ljUrFUrroe1CI6qOGGERhFCfE/8IlVaYsqZ0bNTKB2OVIrBTifJy4cAR3HcWOhKYG0d7M+Fc0vJTlld/C86JIGrpJQ/olaqLTXVtoSqsRGpWOTC5m3DFKTFQ3LVCc7yXstp+f2vUno/JW043XsbSuhq4kDJ07hZurMJAOmBXiloZJi3fBN/CoyNsPzGdsPKxYZmzy8KvsK5F9WUok0LXIqCfbCJDrljlYpRh0krDytBaJ07RluNa8Jj3UV0if5b3pu2DpI6yYMAyjQYrMhD9CpVWHBwdVH/r9xRaIMTbTRoBar9aJWKs+H1XSqxn8JpVJ2dDiQrBKEqAsgKlFbaQhnlrdCVewTa+Vha/X89+iUMM/49EACsKc/IdwfMNBLRIkWtYufb5IGkxZbE7AtMXh9nAefnt6P1ErNfV8iYPxmd2QeKdS3txslpTXPJeU1cg5PRnUK/+BB9LVDNIi+0btu2f3Gg0vZFnbHQPomK3U0Qgra7nj26Is9s/xyOlUxRDZ9d0KLXjlealPCsnQdJK+CZrm80w2imVKLqB/HoKV9W7ooK4okJ1sxCMWUQld2QbFvArupbmrZpVgLL+xy6DZfdwUqzLNS1viWXO9Rptk1E7e1xdtAaVbSHU26oAwT03ZiWZlbQO/ZsPFNbrLbsNH7qd0gzU57fS8VmeX9SkFTj+kH+SbKNanGCTJ7E63vgjCEYsouZBRYm7OzP4kL4WhfXr9XYb3H+ePjfesmYCLd6Jv068bMPEpY/O2Cdm1E40sqrQrUTOy9/iGSxFqwlgpc9vNU9jK5HdAJ4kK3W++vkIt+w7qzmK+v0GC1Qelh44rF//3uTN6CbMuW6j89aPlHdsztH0y7rsArGqxM5q+BF3BW3lK0WLLRD9LV7Aotq6ZzJvNb7RwfS3Rs2JlBaNml7XRpLt8UiorApwykjHhtwOC4ZUKT/KR986lLAorYErdF7r63a0ttbedwOpcRHSdXCXAsYG1fIjDi/28K1DBYvTalvv4OD0t0ZpK/b/JRuMlrMJTdw8CrO7paz8JRSW0FZIx9Ta8hmprZBuCaWVy/1CGLGsuK54lcLdpbJy7zo0sLhvZd77Yg04NHJfntY2Mg1lgnrtPuDrSloS1+NzGgpLJoh7gLIm97dCGuLbI4E79o6/W7hIqVmVtAx969CG1U+nPnOizBC/F6e1itR2DhlY5pjuqO1ZUlovq3BYglbr5fONX38rpCW+juz9HOT0sGzLKqVxleLta1oQFvetW3Zv5+lBbBf+HQvUtuSBoj/VoPH4UqAqc+JnWg4sOSe2QctEfdBmwv1EP9uKOnUeC2gqH/YrSYo9/JKWC4vTus0grAnpNLAQYcJyls9lbmJDKQ2ePl7mgRWUt5yY2ixNK3k+8gPJTsCydSVQKUxSWW+PXhv5fVgib4V2A6f1t/yldRwMDU5TRvAy0aEs0cNMsGbpb8lfntE0y9JKoiM76O4IK7eDOzAshuqNKeshnQmWS6v1tq3x9xP9XYvYsKyOe8nempYsQEXMz+FF82+YVtuG2tZtcd+iyZRYW6nvKctQkuMlmUtZpr/VhvsWpbVdjla6PZZcWQ4qKCrbsdh4K70yvFbW68Cc6N+yUbm0bTit5bQVr6J8uN0ODMtW1hufDn0yPNvd+TWsLf9EqhY+7LNZ2OWTl37/2O7J6LhgAXsLgcVxvc6Yt8zvSWKLxmZJWunzsXRxldzaS9utchsVez94K+v11+uwbwVKq2kFrHY5WjRqlWYjh6jFoFw8A1BvFqvH5yBlDWnLt2Uj9qcbRqvhymr+T9vZtTaOZGG4m51O3M3AsDOEgaEDXhjsxr6JcXxh3AKLHQnFDk68/v//ZavOV51TVfKHpJRkxUl6LubhOW+dKtlO9VG0fGhFrajsxiihfqi8grPLUpphtbhV9lhH4wdN4fjA3Pr88PcPvcahXQZdgRoVserUaHEZiluGGd5P7BD0TqeyFq18xn8YrdHvf4fmXWJd1oNRg7Wj8z8P3WA9zcmsltwqO9JybQMdOD6oEu//lXRY0X6MTIEECi4dYc0F1DzfQdy8v+UJ4bnU4/FDaEGnlZglpH7sog6LaHWGRbjmuZiH/a36JqfGJbGKYDm3PuJDMSHhCdR/bRf6Q9XezuT7rpdZ8/ZK7HDHgutPToL17QNoueUhvxg5tA2zdDm4I2a7fmXIauV53XY/sQ51aMWq3OHduv8QWDOJLIXqh4703Uyfuy6LQzILec3T+TB7P7E+qxaQqmOriNcH0Bo9yEvVeB6cmbTaxcB2HVfSbBYAw2JM7bpyfwuLcImJtRwniQWX6tvQtD4/SNdOG6N6caP7djnc+PJ5gMxq706vuZ+4ZLeYVSSWgzW4W86szK6MXTdrWjt4dHk7nZg1n8/VtBhXI+xvjc/uby3JqmWmaSCxMLaGdotghbUg35UIMs0w1yned2jWfefM0p3pvGUP4qJZwoucGusCJFp+fBv0k/hGDz/0YtDs8dneKqCaDGKWZNdT4tbljrTWdbhMpkJmVT3+OiQtB2um7jnbxY0qQJ1YPcyai1y6i8j2W/t2qZYRqXEovzpYVQ3uFpo1i7YZQv3586cpQW9Wl92/XGaZ6DK5db4/LTmyIrGqcHwELc4sm+ncJESUhoL1FBqurFpP6t0F7QvCjFdwFlqsQWn5MkxWzrtMtyCgJu4yhFmm45onbpXnb1EsWxosa1WBtIaaEwFWvBZUC5uIFdLqDusYVaEqQusXvV7+TOfOk+BYNe2+XYi88mOolIeAT2/ghElwNrOoepnlWR3n84xhmQ6i9fVb3F2N064dkSmzCj8eB3Jr9CDNle7Wd7swD052P9GncBmoDMPM+DTP3/NJtmw8onKZmwi5Fw2kioqOohiGlocFbu1UtxDSPVSeOXqU4TFHLJv14FYN7xVe2i0stcixabXUNViwWJV3a4hKFLNmihdTwifCKDzpUYZHC0zahywtiK19VIDpRMiNu80rJZaj9fsAtBjWTjUMO92ua7Xw7BnwSOqYmpVu2+A6Mbzblxv3fIdly7CAMgxjiA4CYamJb5ZMfgGVXL/80sMsVqtlZmztIJZxgxUCq9LrQc0KcG38uRmgEo1ZyqbJ2aM7LMaVZpfs3cyztPCtFRmvKu5IbbqHCgRag1QiwFJTn2GlmanI6m+W+HWMaCVuHZlW3da5i1TWrFCDHtVmsxmAloMlQTWTXQWKp0kUVSHgf+kd8MfsnJj2XEfcCoTw2ktoRfvtUeMeEqsiq1wZAq1+f6uKzOJdPV2CkxSS59cPVnokXVfccdWv+HmS/iVY+2XYw4q2RTWqQoe7w7QZhhaYtTPrZQ3JcuJHH1hH/7DhdcxFl4w7/5dJa9pp2OdWg8s42yuNisXyoyctb1ayUtZJBXAmhItpdYSFlEItJlH/xIvroNcfd3/+dkevvvKvWEv3RdMaND0DmMW0Nr1oebNyLdXErnCi0RkWD7aLWJ1x64/fvn79fId/7HZZi1e1whRt91FYVRmzerpFZXi2X5jIV8bWDVZ9LAWUkMo1EtJ1Aaz7T/fOrVevVT3WVsUb7rJyjkixWQd39HILzTJNekBjrhOFqxesSK44up4ULoL16etvd/tXvPds072qkiosKqa1kcZBxPK4utNCWJNs/ck1HovesCDobXTlNm3mHhb8x86t2t7ICbcmosCy6b7hA8069KFFZsVa7VSq6yeTvmVYGrtEMNui6m1nMMv915/vKKdqulTSt5ttGdlpUGFlxDocDo933WiNHtKEujAWPc0qLau5jq9owRhgebd0uHupinQbWa8HqXUnXAcgBaxWh45uxbAmqldQeOiER68yLMsScSlk8zpdWwsyhgWViFpVyzTZk/WglKASC6rw4HF1oxVgtXQJA5tVloKq1Dmvp8fjXG1yCSxPqwpuKbVUMxol1maz4XTHqRBjyz2+dKE1ejgPCYyyhzs7wgJSZUlfkuyisrSGBVi+g6jiFWGVqEW0glgqsCCywK1OKe9gRY1CWnxcfwuB1xkWc4IncTWa3YgjNRAKFtGqlrl90ciqWCzMduAEo1NueViZOmOFBJvF1QXWCM2CzEJmx1SxOOafDCxPCzjV0GApXoXZdGepCh1X9GBYqw65hWYlrGwJmktvsxAXSEWtRGnnRtN6GVjgVpXZkpEVYdUa7oeN9srBWt2cWzmzJtqsuBi7Z9Y3gCU1SJXIlqXtRA4Wp3yyHoxQ8RZWCCsK9kDLfXcrLQ9rkYZ5kCgN+K5mMSxGFqqR7Kqj+IJLBAtzq1qmPYPdwrK9aJgHoQLJrMOtuQVmJYjgXOgiNN9MBoClHHOUyriz5+g6xrDAragOw3KwkPWNFCEtcgQVksLr6TZaZFb7KZR6Z5aDNfbv/ir5UqoqlGqsfYuq6jGBhbRyN1PNPFgYs6QAV+HwxG7LLQernU/4brHAi79O+phV+3Os1QpVidkPvKivd5cUVkRLbnpVIlZh58GDqkGsQjpXb7f18lSGhtWCSjBAmqjrortZY4+pRrESwUqFS6mVgWVpFYlaG7V8Pti8Ikj0ZXXjnAhmLfQ5YVDqqYDql1ke1jjQMry4Eo/Y53PY58yiDsJsM5gGy/buB91fHYhVGDek/Oi7AWN1khqkn6FYPc1CYgxprHDRUsi2qVlYwa1CZ9aGOyyn1SFaO4cGS+N6W51ucGv0fTGxXlnBFgttFz/vCsvfLGVa4NhYcCGyY62v3rA8rOBW6LA20jUUei3Im1hhKgyk4Pp29arawbJjop43Ot0n8rNFD1j0MVBAyrHSuPx3ZoKEamyBxbQKfTdHljgFpxUvni0qKcM3h8qN1ZX3qhWsiSq/JsKmYPpf/bsrrJI+6hftGktdcoJFRXlsNYtpFXaJYzZGD3bxvDJinUgsr9bpykqMzGqUPnSNqPkfTjrC2qcfkFyOpSxrnfiyOfFrGyykpefBTaEXz9E8uJJ+VInlI4vduoJWBGvSLK4ZA8ESZPi1DGVZcpNRtpoFtEzPYBpRnALtrowpQc4sxHX6ckUlOlgN+nQBk9arh1l7OrLAalWTXJXtZqFbUS9qbk4c1EYyLQkF1xtVIMXW++mKSiSzCFdDlwy5ZjCz8NPYWqjpyMce9gwscMvcdi4MqDiwbIPlig9JrQDW6XLKs1lGL/u0SdB1N2vvxhgeltWeQOFnO2F/AW7V58zCfqsw97z0grAt3FEsZPUORXg6gVsXaOnMaoSOMo1/1ah/1nSHxQcz4xPJ7eUznsSzs2ZRJRZF1LdT9W3OouLGwU2GDta7w3aJFpnVhPJrDJ7G/gwf/cxiu1gxOeGo4aAPfPefnHwelneL2lHdim7OspIqpHHy4/39Ii0d8E2sUfhBNAv0gIVA9qKXyMWo8M8QwMce+uMSLMotuxq02wwZrzwqYYW0PKwLtDwsB6KhSxNUEoKNqVP4TVdY2RFwuVHTQ8ZFWOBWYe7Qm3VzbpHDnTtOhG/vPNbvp3O0Rt+bhlGFcmzEpsY84cegsOzwRYiVCI8rYHm3HjniDxu7MarMsmqFxDoJqbW7nnOLYZFYGlljZsfmw8w6P66ABbSCVXb/KrCKpsFQgGTWybFar8/RElgtgkXNF3zpDOvV/c+/wtk2kl+91lfA8q+xeTQNVnTXK+MV8joRrTcQy7t1WrfT8rCm7rDEwhFCKyRZD1ivROsVTz7CU48Hjj3942vMgtx6DHtYuRoM+wzgFdegEwraBjDrtPZne245WFODa5EyW1hinc16JRpBL4WIkfkTBn7zch2sT/d/3lVKLLMzGtL9zezMYLxLuK9JrnWrW6Pv0ymgmvqvLQOLk89FH1ivTIUhAROtGP8S/+XrlbA+3VMl4vbVJocq6q5wInS03kLCr5lW9p1cDhZyimuxaTLJz5r1MUtXnsYkHMUtP16uhoW0HKeVeQVI3GCtQsC/265BxPIpn/3kCjZrinKdI7YI0HqZJVwUMEtIf3ctLKjEx41e56R3clCslXglWgGkdzrWbZUIsIDV9KJbIfS7wopNujxerof16SvQStbPqh19W0WstFlrMWvrjhwthBWAYX41TWt+NU0/WFcRen2h8+UWWOiWbbHS2xOrRKt3UYpTfutwZWgFWOQWxDxNkPkkW0y7wnrZnyUEpx9Myz/55wZYQCu8SkZe0hDFO+z5ua7hzXglgYVjkqHlYT1PY2DypSX3hzbrhVGFg8S6ySyitUn7dtW4UzNKvZUmpVk5uVJaDtYzY9K0zrLqCusl8QiBvITn8iMef90Ei93KRLtZ5mSLkONq61vTHK3R92ej1tRY1UiG6THtAYvNoZMtwrrjIlTjn9vMIlq5lbPak1G5rkgJLjdmp+02peVhAa7nJkn6WLJesO4BFvIJGW4jKgL18o87bjTLDaAVrQdDWtEsqHCZuNqiXOstDttvEayp8at5bkI3kavHHma9hHKTQE8oMSl33A4rdSvpGUJgSXvlzi2H1RaKMXWLyjCuxQSUUqyzWVJsJphSTMypo1mf7kdIK4DSeaXbqzWtCY1ZAsqPn5qWg/X8jLQI2rT5nyR+nldXs15UQOkyNJg0KT86wLK01B7y6i1e5di2fcsZvyW9ttv/83Z+PY3kWBSHpdkkZBtlHjYtQr9UlaCkliXUKGuIZClRKQ8QbQlU+f7fZe17/edel9MTXMlWMmmGHqTh1+ceHx9XB0FpASxnW7XV19uyb161TxTZBv9OEkHq2vLHFv7JejsnQ4t2ok5Ze8fKVDOfetEzjd+Ki8rL6pcR1urxMdCa/DSoGC+trC6o641RsmIbAovO3n8PiMqj0srKei8GT4tW7vuervYrlkYBlMe12uEgBm15ZcFLZ4B1b5yTw1UP8iyAlRBWwBNe6LXIfOMKoPXxYW9Y2//nY7+PhtDPn98PkhFU9lXpy7v85CfoarnUcqqJvKzfL98It8BsAKweKfvqTCpoatuYR45nMW3t9dOdOn+QLJrK7ZvVhrq7sayNMNrCBDH52SEqa/PE6Ol+0UsMX08Ea+ul5fhwVTX6uch+S5TxP6/hFhm8FQssa0+ncPUZzyCbQ60tYXBpYKq4/of53xgjLFRWR5TFokScU/NgbWOHsoMXJpCBgscAWCNDC6Koze57X7f7JOpZbbyugrLEBqdQCVGYe2xGZm+4tLyctpZ8FD2wN6+vXFhbMn3bSFRJVEOUhdr6cJEU7pQBTh9hCtnFSCnrWRqVVlZr1sTxj5+1QQW4nLaiWXzju+xBytoGUfE49Z4gBdcQWIbWB4mjENo/yAjS/TOCoroCezdjKIq2ba///e3bz87pCrVFvQscfslBwcdDYPUiQkpSICoANgjWhZtER2tF94Mstq+YtysrK41KGGKFxnV9ff2XhtWhtGqnrbAq8j2QP9sYMIY9Ub0fGsATKIvR6jUNn/EySMYQdWXsSr8abcH1WHeIy0qrphvr5VsoI2qyCcqHFRC9p43KU8KrWgx9g7Bvek2047fHzSAxrE/r7DwyWF2Z0CBUIdQv7VpFWxQaWW0Gsevq9CxaeXGvz4S15VuZ9yglbPkAGlTDYRlaRlQmv/ePU10rs+EJSxhXN7TEpoA5dNJq2zeqrc5vrP0vxMLsJObCOjx7yCpSVnUCZekEoWkZZe0/UVurz55fRbJyjmWEZUSlgRlVaZEhrSWZRKetlKgGKiusfO9pT2cj2FTVcFigLXunzH7fWwXjAssqC0htQFqgKGGYASzU1rKjq2LtaHmNLUM1mA8r7VV9XBWwak4Cy2gLItZ+7/srnq74MiiU3RQKq6y2LdzVIi3CqrZPjwsF9rY8jbKSsgJM20hWp/Asq61Pcwix/4zWwY2vGryyhN0/Y2wwBl+wy2srTlxdWBxJjljWA2AxaTV+DWxIDnWiAlwngWW0Ze/s49vBOLe7rgG2hPphrp0A14IRLITo06ptogdp9TY/g5WVSFXc1wOuxWney91M4iqxErLcDnvnYFdGWIBMGVYQTAtM823NJtE3gh1fGHE9PAmsHiSNaFv5+TulsqxvOVR7XvWtIllZUgBIuCn0w4jawry1rLl18YrLfmIgrKb/oFbVBFQng4W+FUh5Wa2ItVtZbUBROikQQu6DHX46sSZ6YFxay2GwGp4XmjgveGWdFhbSYstgcPcI6FJiAAASE0lEQVRQNIBZaWIGijP3yOJ3zuUJrM6VzXXweEttAKwmmr8tD1aoqSYM4uKEPwmG0Nq4jMWmUOAiuAFdCcQUxhA/2rXpNbGrvXeBdXVuHLNhNdtD80eiFVGWlCeEZXyLnTvTgAUrILRX2I3iI9JUAVtEKy3UVnShprrwSz0EVjKruxXQ6coP4UmVBdpiLXLQlYIO2ccrE0VVawaxcN6lGDNVJGjV4eiH9Db5sJreZpmJinECaZ0UltfWph+wbCVj94PWs4qIkGiDifV2PmRx7IysrMByYTmv2vZUZXn5LHoeWJggrFWtwrmzcr0oqqpVrfAzVxR9ajuBnU1bp/eJ/mCxyx9Db+69FFr5dEVRyZPDsrT4aWrQFZbIkBsEiiteCp2yIKQWpN86FCKWy2xYyW6hYcHKfSBPbvDBt1jZ/mjrmLAOqp6tk2URgykw1Z/6XdM1saN53hlYPqwmHkNnV02wdmlFBR/cXZ78x9AirfhAFVVlHZ0aFqyJ7Y6jcwkfsrzRFdv+kI4rX1l/RuUEFSZRympx+p9w7GgBscfQyeB2MK0sl0a9siyuVAfhZQXtc6ayFgcmkGwGvbSke9ydHtbI0lIrUrmbGVT+ZCINrGWDCKPo+61+5HLOlQVruqj6siKJoUFhyWBYAGt6clhWWyt+kANHXgJ9XbXUrLyiRG8Qd3rpJNpKKmwArMQEelQkZUmUl4F1hh9ib7QFth4OCKEYRc+yWaFVTFHCK4poS7TK561umR7GHFij74skqortcGSQlQEm5d3NGWBdXFxqWuSGBhhCJURR9MOooFGLwCpsM6hh/a5TsAYoa3T1r2jLTLbNTUDlE5a9ZuNzwLrw2jLhARq+X86wqDfxrNUzMnCuonD9Fjh6F81jFqzLBeHkHcuLSpIBNJqytMrZ5ehstADW4wZEFQ4Hv3IplyDImuiP+FFdWbB+zMLWpgp7G/2AkSNRFJFZXPOr88BC34JbioATFsi0wHJBVJiQJeKkhToT9ouifmuosi4AVt/VUVmNdJx8aLDXmUzL0wKbh+8bTijcrKVVJrCDUNGqyPstrqw8WOOblLHTnkHa5EAcS8r1mUwLaYGqrLebUewzOpRQhbctVFbc2HjHz4KFEb6i5UKvkeETKM86h4GWu5lB4bGXlY7oc1IJXm59DLT43qfOh1Vxw/Lbm/QMlrIszxNLKS17WI8nN2n9GMcSETIVBhG+OJxVW2SWWBas0XRBW74qLvuca+EQVo7WGefQ+ZaAATTDJBIxQdjaPSEx5feJqqDniR3ND3nKurzbVtGpoI+fvpIJU1jio6zm30dnpaVshSASXV+UT6nAqMUXzuxs3iJxq8tT1uWC1XxEYBVtsIhflRLm8P580gJaQrV2Z6iK/jYwlA5t6t9cA4Fx9rfb+Xh95SlLZwfaWjWVbLysnLhoHnXKktX5LN7Ran2PwDCFIot8NqjLHZbZSWT9lh/DPGXp7CCdR5HkwHVFUFla8szSsi4P37Ld8YiCHUf/IT8UeMBvx9in086ZVpc9hpPpXRXvnoOkYAL9QljapRCe5VmlBbR+qVan0h1fDnloJ5m+JTUgftIBM0YftYF5yhpdLXp6on0Mze0WF8Bay7vZOaUF+0TjW5jgRTJOaY8SCXIicHL7xIL3W5ljqB2+Cmc4TcTLSUwGwypRWmtZnnNBdLTghiIRO1PUv8M2sWDBwX+NzhgC/4bBG0mlmbAuftykMrskyyBPWGBZa7kuy7tzdQ+EljL3qhX+kEuIY7Y+9r4kP5IGF79/KxcWmJYvZWQ4wmH5ypKynoUKO7PHO1pws7vpinHLp0Xy94cXCXi+gxgwhmBatDqWdPtMAlYp0aykxEEsy/V6Pj0/LfNtKvVoJol2ovE+cRcXhIwV3lH5O/hWLqzLWWxU9JCQ0iq9sNC5jG1Nzktrgr7lTriCHSlCSdBKXvGzV8G0Ze8NzIZlkhbt2yUVVkwKJ3FtnuXaDOLsanTxf/EtkEbRMvOmdbP4w3F13G91+bDMCY+MhSXjUqaM10KYQzkfQGs0Gn3F5TFdujrB16RhZVQpz1dMWf4em1xYbA5lhAuAlfxhRLWG14chtEaX08sjaYW8hSIr4v1PwuEVKylYvzVAWaPxTcRKVgd0FeI7sCo1rTKX1uTqdn6c5QEtPIaAb3f3x9OK5G+LqA3MhgVzSJo+CwpRVSEyBFpISssLXvNojae3t0+3t8fS+qUK51voUja779KpQSSaU8heeJ44AJYO8bKJ+/aoRi5tYCDCkmvgZWh9H39Zzfe3T/o6ntaj/jYdrSMbeUFKVbelBnVpbWXD0uvhXcOPJ6SkrEpuWWYpRHWtgdZ6Ppt+7Qc4ji41q5enp5eX2+Mm0SQIE0ahaFbpLgvVJZzszG/6/yDut+p8WKMrHeJlQxJDf/ccRGWVVeIUmqt8mN9ffSFwjb/Pb180K8PreG35xKQOnYmlT1zdEPrLZPl8WBc/ZjJq26XXVhmCu9/nrO2KuMYLbP5ocenVd377+voE18vr8bR22G/tFHekHasf1CF7xzICnprWAFi4P/TZiuqqlL0toZtBMCyA9fCg4+n99yNwjUbjqZWV1hX88vQFl29dhEjeDn+wDPSoXK3fXufD0n/YMj4frDgrNolrqiszhlpb2rlmf4drNBlPjaxeYALx+fTyhUmENlCIg86+a/HgJ/xFDOHvfRC+5jJvzfJtwNt43Nw5s5L9ZZBpStplkPPS6jJGr4dxMjosqqv7+e0zyOn1+cldL1/xrfZw5dD7GwShq+f7b+N6Q2CZ6kGy4C57wd0qax1CVgRLPzUuPY3j3j5G72zGl05Uz0/P1t2f3CAeTcv0UiSR28r5byZyJ4IcbYgYAuticnMXWneuLRm1DTSUMlRw3Rle0++X4/FkMjLXZDIZj6+m9zON6vn55fnFXd6zvkgLd9M75TpRyKnh6HB3jIu1g2Bpacn+zTJS0sAQMkOIWLgYPoTnw8Prej6fGWT6mpqX2b3mdKvn75nCeqIm/3Kky0/ifmsnxIGB3P0psKpBsLRrrdlJDstYss/K03pAXERcmtfD66vOBHO87m7/197V9CaOBNGwBGEmCkJIOEKcMHK0QpbQ+GD3wVLfkfj/f2e7+rOqus0ANtFqEq82yaz2sPvy6vWrV9VG1OrPtcGqtlA9xq3efCti1SVRnn6LcFgZgjENnDrw8qNoBcUqUswCpEoQfKF/BpD0F8CKVKEVLf1DfTu3rudbUXtYRXcxBjNLqVZxOHCl8k0hyxu0d0d1iLCy3DLwCA0T/KFtMVwn83cg1l3cYvlWVbGCO/uUSx+HPqzp/N2xgcxS1MpTviF4d9cT0irUSAWsZCkMVsJ8hQJ030WoQouVF632PpVn+Rbuf7reKH5MZukDMZVgFThywNTCCi8tVE6yNECGX74EqcC3vgI9v+7QLZRv7aveCuzzYoOZpai1OjR8WcYNc5zJgkBZUktqqWXx0lhZ5QI2aVJ5yBy1Tr4K2xOqxdvRwvlWmE2fk1JvDD3ZxRnMrJc5dIimv4FqLIjAG+cOKZYsUljJcBKWZW2p5bEKAo+5RY7DO9H6VOrel2+lr9hhyl0Gg/Xy8Us2h4KOCaPD0Hc7xGVJxCwNmAh41eFAbJFsBY+FEbvHb/F8i3Gq613jGl6GEItvi0NTsAm0mxK63F2yXocB5cAKSAl7KCaYdWqxwt/rt+yQiwcQfA0Crwg6CIeDBc60cYYh2IUQY7kmOnCrRJJFkcJw+aclttSTCjGrvT2x+cT5VnrNpkfqx2AWRDUWLdoRNrglbJLdDvZYlFmWXbVxDgnNailcj+VbzKKfA6vQ6k3g2AhgvSzeVSFagMyiLUlmcPRexL5B4m4nwIUf5LSQuj+k8nG+db4i9mc8uR6FWVCIBW6g4fvBTVYbHzdwzZJMtIwjLSmzrH8P5gEz61G0XL7V4bvT1R9s1kjMgkIsDiwZtUVImRVpFrWk2DtY6yA8Wix3iAzE4/lWxUuyS1rVkZg1VydiOAllg6Y5wV/hxMEplkMMkaoMx6EXeSZaqKNmaL3d3Ccav/Vp7iCevfPq2FUxvBFRdaOABaPiLZpQSLcEQjxDiP1KKVO+oceUuk46xDRO3eNSvGNCdtH78tH+FtEwshzRVSOBNQfZKhBeZPZFAuUS5zOo16FFaMtQJJl1aoPTah9Ay+VbnX/9n4GrSvsHN3sci1latkjgwEK/okfc0VmITsOa+Cx2HBIbT587slOUL8f51vnCOFaNySzjH2B32zHLjSh46OfR4k10KYi8Y8B0qhXxqk0YiMfzra7q3ZZ3ujUeWDBzDWZUaxaqQ4nSGdwUBoUX1Gfh3tAUYU3L8JQowkH5Fr2+Eu1MjlmGGq28CdkM7gm5yXIpKZH4kjY7tBRRtOzrMMksjVZ2o251aLvvfGWSuB+dWeq3tcsLnMzwsU7BipD7d1KIdbI3JMRK2Yfb0YLOpwqJzYV2h1qviN8aOGRN7E9tnV41XNujrpCGMyU/CyOhJ3FpGwxEohJXt+9v0XyrZ4/SBPKqDKejvlsO0DJWq0li5aYU/iiUUatjoaprFjxQT4rz0rgS83s2knC+1XGnFe75jA2WQctcaYK/Ghl5Uq9WVxTLwcVki4wtyFgs5tZtl8+yK/lWdDRWY4Ol0dKGlJ6EEtt3pFgso4m8Q8JnOWaRyXQbNz43/W/xfOvaNjP4rMnLqM98sttawUo5UjoCI71OD7FSHv7PzFrduCQX51vn3rcDKrDGvkezALSkkXncQIc+Giv8NWax7rDFVovMpaMucXn7zTOSb/kbKuHlBej9LF21Gf3S0fzj11YSVkWtDmdW1BcGWmHNQvlf29sdAla7O27pxftbFdetyjFrfLBAt3JrSMNeJNOsMNyh1KJ4mWF+GzstNmltqV7t7tqCDvkW9aM8n7+MaeAjlZcS2Xgi8bKkXbRHill4wRKtOHlIlODy3ht62dTfT6zsx/LAzxcSCyr2/R5b3x1ab7kxWqV1EQVLsiQ17wnvQJvD1IEYpha2IFuzanp3rSi0rN+CzzGi40R/GVZht37SPcmP9xxEvpTR8gxay5LJmWHiLAzMYkENppVZE1lNH7jLaKav5h75J+SmlVuUtDmXNvlPqUI7el2Z7rDEK1ncOkhmSvt8ViJZpi7LbZk+eAHbvPUHADt3x+6otBzsRNiG1xH05mkXcOeLiTkUrbYXkkwqJG116lRvGKjV+jKkIk/j5Rbk6tFrW6DynXt3ML2/ad4fcpw99WUnH2+5kEVBAmW278fNQ8lNVp/Ae3lvUUiavz/+u9d+qzOvsKEpvN3jmq2ferN7nk1XW1WGDq2SRMpsN6ukDt5zq7cMww6g+bbMd4PegaDzLfPpMu4dbdU+vPPoMnvyGxbAzecNGYKVvdNV6uB9CYq0wLPFNh00ZIM/EfCoDddlb1/C5d6VpP7B+XnqjgeKK1AuvVnLh2DSrd5a8xAx69rw8GRFy9JquRuuKIvp5viphz1ddzzqt/8YAVN2dPaavTz/WUzeVtuyARfhFmeSAU3Zw6xoxBNymlNtLqm0Il8NpZX9b93M9r/trOe815+GCHVZzdbTr8DKwJWL0otWgdRd9galxGiJVAJ4EgYpEPa3yVjzvNfZWctWePa/j/+8ZvOXL3oWIPSluTTXo1oRs5KTQ8otDVXdKmEf8deeTdf6rrCWLv31c7b5KlqZX9j84321DPfAPKd6NatGTqsvATydhFDWapwKxEf4Zvbv0b5JdzbbrL+QVki6cjq5v+azBK5AMrIIkiXq8aEycE1e1xv9rF+nky+Hypw1Ci4U/PHWsExrVjzDd3CJZf4EqEwlLLJskmWJW31fVoyGXTJK30WsWXUqKiXMWj4Nqv/LA9oVtF57L5s3hHEYmRtquPQlHrvwoKklalV/Stb/ZqjMyaivptalbKRbCHGpgyDxn2hxCRrkNFLCkGrxt0NlqvFjqvGSOpZx8QxCy2+V+mtiUI3KqgOCLSA1yb4DUgSvrbYSNbpsWCYyeCCU8lOaW8Cpt+k3QsrhpW9AA2CWXLWguXJtL7IKW4MA1E5xavHdoPKGRhFspRADWkkMV+0WQ+D8g5vA6l97n35XoJCjmb7rS/Y5YMYaRGCTvpY/zb45UKQmgWQ7hRl5dj8wXaPZQr/PQeGTLfQLHn5A+Xl+np/n53nC8x/tAMljWkeBnAAAAABJRU5ErkJggg==`);


/***/ }),

/***/ 9281:
/*!***********************************************************!*\
  !*** ./packages/my-near-wallet/src/lib/my-near-wallet.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupMyNearWallet": () => (/* binding */ setupMyNearWallet)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! near-api-js */ 17873);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(near_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @near-wallet-selector/wallet-utils */ 11557);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icon */ 74531);





const resolveWalletUrl = (network, walletUrl) => {
  if (walletUrl) {
    return walletUrl;
  }

  switch (network.networkId) {
    case "mainnet":
      return "https://app.mynearwallet.com";

    case "testnet":
      return "https://testnet.mynearwallet.com";

    default:
      throw new Error("Invalid wallet url");
  }
};

const setupWalletState = /*#__PURE__*/function () {
  var _ref = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (params, network) {
    const keyStore = new near_api_js__WEBPACK_IMPORTED_MODULE_1__.keyStores.BrowserLocalStorageKeyStore();
    const near = yield (0,near_api_js__WEBPACK_IMPORTED_MODULE_1__.connect)(Object.assign(Object.assign({
      keyStore,
      walletUrl: params.walletUrl
    }, network), {
      headers: {}
    }));
    const wallet = new near_api_js__WEBPACK_IMPORTED_MODULE_1__.WalletConnection(near, "near_app"); // Cleanup up any pending keys (cancelled logins).

    if (!wallet.isSignedIn()) {
      yield keyStore.clear();
    }

    return {
      wallet,
      keyStore
    };
  });

  return function setupWalletState(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

const MyNearWallet = /*#__PURE__*/function () {
  var _ref2 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
    metadata,
    options,
    store,
    params,
    logger
  }) {
    const _state = yield setupWalletState(params, options.network);

    const cleanup = () => {
      _state.keyStore.clear();
    };

    const getAccounts = () => {
      const accountId = _state.wallet.getAccountId();

      if (!accountId) {
        return [];
      }

      return [{
        accountId
      }];
    };

    const transformTransactions = /*#__PURE__*/function () {
      var _ref3 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (transactions) {
        const account = _state.wallet.account();

        const {
          networkId,
          signer,
          provider
        } = account.connection;
        const localKey = yield signer.getPublicKey(account.accountId, networkId);
        return Promise.all(transactions.map( /*#__PURE__*/function () {
          var _ref4 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (transaction, index) {
            const actions = transaction.actions.map(action => (0,_near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_2__.createAction)(action));
            const accessKey = yield account.accessKeyForTransaction(transaction.receiverId, actions, localKey);

            if (!accessKey) {
              throw new Error(`Failed to find matching key for transaction sent to ${transaction.receiverId}`);
            }

            const block = yield provider.block({
              finality: "final"
            });
            return near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.createTransaction(account.accountId, near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.PublicKey.from(accessKey.public_key), transaction.receiverId, accessKey.access_key.nonce + index + 1, actions, near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.serialize.base_decode(block.header.hash));
          });

          return function (_x5, _x6) {
            return _ref4.apply(this, arguments);
          };
        }()));
      });

      return function transformTransactions(_x4) {
        return _ref3.apply(this, arguments);
      };
    }();

    return {
      signIn({
        contractId,
        methodNames
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          const existingAccounts = getAccounts();

          if (existingAccounts.length) {
            return existingAccounts;
          }

          yield _state.wallet.requestSignIn({
            contractId,
            methodNames
          });
          return getAccounts();
        })();
      },

      signOut() {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          if (_state.wallet.isSignedIn()) {
            _state.wallet.signOut();
          }

          cleanup();
        })();
      },

      getAccounts() {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          return getAccounts();
        })();
      },

      verifyOwner({
        message,
        callbackUrl,
        meta
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("verifyOwner", {
            message
          });

          const account = _state.wallet.account();

          if (!account) {
            throw new Error("Wallet not signed in");
          }

          const locationUrl = typeof window !== "undefined" ? window.location.href : "";
          const url = callbackUrl || locationUrl;

          if (!url) {
            throw new Error(`The callbackUrl is missing for ${metadata.name}`);
          }

          const encodedUrl = encodeURIComponent(url);
          const extraMeta = meta ? `&meta=${meta}` : "";
          window.location.replace(`${params.walletUrl}/verify-owner?message=${message}&callbackUrl=${encodedUrl}${extraMeta}`);
          return;
        })();
      },

      signAndSendTransaction({
        signerId,
        receiverId,
        actions,
        callbackUrl
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("signAndSendTransaction", {
            signerId,
            receiverId,
            actions,
            callbackUrl
          });
          const {
            contract
          } = store.getState();

          if (!_state.wallet.isSignedIn() || !contract) {
            throw new Error("Wallet not signed in");
          }

          const account = _state.wallet.account();

          return account["signAndSendTransaction"]({
            receiverId: receiverId || contract.contractId,
            actions: actions.map(action => (0,_near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_2__.createAction)(action)),
            walletCallbackUrl: callbackUrl
          });
        })();
      },

      signAndSendTransactions({
        transactions,
        callbackUrl
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("signAndSendTransactions", {
            transactions,
            callbackUrl
          });

          if (!_state.wallet.isSignedIn()) {
            throw new Error("Wallet not signed in");
          }

          return _state.wallet.requestSignTransactions({
            transactions: yield transformTransactions(transactions),
            callbackUrl
          });
        })();
      }

    };
  });

  return function MyNearWallet(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

function setupMyNearWallet({
  walletUrl,
  iconUrl = _icon__WEBPACK_IMPORTED_MODULE_3__["default"],
  deprecated = false
} = {}) {
  return /*#__PURE__*/(0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
    return {
      id: "my-near-wallet",
      type: "browser",
      metadata: {
        name: "MyNearWallet",
        description: "NEAR wallet to store, buy, send and stake assets for DeFi.",
        iconUrl,
        deprecated,
        available: true
      },
      init: options => {
        return MyNearWallet(Object.assign(Object.assign({}, options), {
          params: {
            walletUrl: resolveWalletUrl(options.options.network, walletUrl)
          }
        }));
      }
    };
  });
}

/***/ }),

/***/ 27480:
/*!*******************************************!*\
  !*** ./packages/near-wallet/src/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupNearWallet": () => (/* reexport safe */ _lib_near_wallet__WEBPACK_IMPORTED_MODULE_0__.setupNearWallet)
/* harmony export */ });
/* harmony import */ var _lib_near_wallet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/near-wallet */ 30780);



/***/ }),

/***/ 59409:
/*!**********************************************!*\
  !*** ./packages/near-wallet/src/lib/icon.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`data:image/png;base64,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`);


/***/ }),

/***/ 30780:
/*!*****************************************************!*\
  !*** ./packages/near-wallet/src/lib/near-wallet.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupNearWallet": () => (/* binding */ setupNearWallet)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var _near_wallet_selector_my_near_wallet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @near-wallet-selector/my-near-wallet */ 15502);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icon */ 59409);




const resolveWalletUrl = (network, walletUrl) => {
  if (walletUrl) {
    return walletUrl;
  }

  switch (network.networkId) {
    case "mainnet":
      return "https://wallet.near.org";

    case "testnet":
      return "https://wallet.testnet.near.org";

    default:
      throw new Error("Invalid wallet url");
  }
};

function setupNearWallet({
  walletUrl,
  iconUrl = _icon__WEBPACK_IMPORTED_MODULE_2__["default"],
  deprecated = false
} = {}) {
  return /*#__PURE__*/function () {
    var _ref = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (options) {
      const wallet = yield (0,_near_wallet_selector_my_near_wallet__WEBPACK_IMPORTED_MODULE_1__.setupMyNearWallet)({
        walletUrl: resolveWalletUrl(options.options.network, walletUrl),
        iconUrl
      })(options);

      if (!wallet) {
        return null;
      }

      return Object.assign(Object.assign({}, wallet), {
        id: "near-wallet",
        metadata: Object.assign(Object.assign({}, wallet.metadata), {
          name: "NEAR Wallet",
          description: "Web wallet for NEAR Protocol",
          iconUrl,
          deprecated,
          available: true
        })
      });
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
}

/***/ }),

/***/ 15377:
/*!***********************************************!*\
  !*** ./packages/nightly-connect/src/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupNightlyConnect": () => (/* reexport safe */ _lib_nightly_connect__WEBPACK_IMPORTED_MODULE_0__.setupNightlyConnect)
/* harmony export */ });
/* harmony import */ var _lib_nightly_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/nightly-connect */ 79378);



/***/ }),

/***/ 53119:
/*!**************************************************!*\
  !*** ./packages/nightly-connect/src/lib/icon.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`data:image/png;base64,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`);


/***/ }),

/***/ 79378:
/*!*************************************************************!*\
  !*** ./packages/nightly-connect/src/lib/nightly-connect.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupNightlyConnect": () => (/* binding */ setupNightlyConnect)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! near-api-js */ 17873);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(near_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _nightlylabs_connect_near__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nightlylabs/connect-near */ 69031);
/* harmony import */ var _nightlylabs_connect_near__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_nightlylabs_connect_near__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @near-wallet-selector/core */ 15643);
/* harmony import */ var _near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @near-wallet-selector/wallet-utils */ 11557);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icon */ 53119);







const setupNightlyConnectState = () => {
  return {
    client: null,
    modal: new _nightlylabs_connect_near__WEBPACK_IMPORTED_MODULE_2__.NightlyConnectModal(),
    accounts: []
  };
};

const NightlyConnect = /*#__PURE__*/function () {
  var _ref = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
    metadata,
    store,
    params,
    logger,
    options,
    provider,
    emitter
  }) {
    const _state = setupNightlyConnectState();

    const getAccounts = () => {
      return _state.accounts;
    };

    const signer = {
      createKey: () => {
        throw new Error("Not implemented");
      },
      getPublicKey: function () {
        var _ref2 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (accountId) {
          const accounts = getAccounts();
          const account = accounts.find(a => a.accountId === accountId);

          if (!account) {
            throw new Error("Failed to find public key for account");
          }

          return near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.PublicKey.from(account.publicKey);
        });

        return function getPublicKey(_x2) {
          return _ref2.apply(this, arguments);
        };
      }(),
      signMessage: function () {
        var _ref3 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (message, accountId) {
          const accounts = getAccounts();
          const account = accounts.find(a => a.accountId === accountId);

          if (!account) {
            throw new Error("Failed to find account for signing");
          }

          try {
            const tx = near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.Transaction.decode(Buffer.from(message));
            const signedTx = yield _state.client.signTransaction(tx);
            return {
              signature: signedTx.signature.data,
              publicKey: tx.publicKey
            };
          } catch (err) {
            logger.log("Failed to sign message");
            logger.error(err);
            throw Error("Invalid message. Only transactions can be signed");
          }
        });

        return function signMessage(_x3, _x4) {
          return _ref3.apply(this, arguments);
        };
      }()
    };

    const signOut = /*#__PURE__*/function () {
      var _ref4 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        var _a;

        (0,_nightlylabs_connect_near__WEBPACK_IMPORTED_MODULE_2__.clearPersistedSessionId)();
        (0,_nightlylabs_connect_near__WEBPACK_IMPORTED_MODULE_2__.clearPersistedSessionPublicKey)();
        (0,_nightlylabs_connect_near__WEBPACK_IMPORTED_MODULE_2__.clearPersistedSessionAccountId)();
        (_a = _state.client) === null || _a === void 0 ? void 0 : _a.ws.close();
      });

      return function signOut() {
        return _ref4.apply(this, arguments);
      };
    }();

    const transformTransactions = transactions => {
      const account = (0,_near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_3__.getActiveAccount)(store.getState());
      const {
        contract
      } = store.getState();

      if (!account || !contract) {
        throw new Error("Wallet not signed in");
      }

      return transactions.map(transaction => {
        return {
          signerId: transaction.signerId || account.accountId,
          receiverId: transaction.receiverId || contract.contractId,
          actions: transaction.actions
        };
      });
    };

    return {
      signIn() {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          return new Promise((resolve, reject) => {
            const existingAccounts = getAccounts();

            if (existingAccounts.length) {
              return resolve(existingAccounts);
            }

            let persistedId = (0,_nightlylabs_connect_near__WEBPACK_IMPORTED_MODULE_2__.getPersistedSessionId)();
            const persistedPubkey = (0,_nightlylabs_connect_near__WEBPACK_IMPORTED_MODULE_2__.getPersistedSessionPublicKey)();
            const persistedAccountId = (0,_nightlylabs_connect_near__WEBPACK_IMPORTED_MODULE_2__.getPersistedSessionAccountId)();

            if (params.appMetadata.persistent !== false && persistedId !== null && (persistedPubkey === null || persistedAccountId === null)) {
              (0,_nightlylabs_connect_near__WEBPACK_IMPORTED_MODULE_2__.clearPersistedSessionId)();
              persistedId = null;
            }

            try {
              _nightlylabs_connect_near__WEBPACK_IMPORTED_MODULE_2__.AppNear.build(Object.assign(Object.assign({}, params), {
                onUserConnect: account => {
                  (0,_nightlylabs_connect_near__WEBPACK_IMPORTED_MODULE_2__.setPersistedSessionPublicKey)(account.publicKey.toString());
                  (0,_nightlylabs_connect_near__WEBPACK_IMPORTED_MODULE_2__.setPersistedSessionAccountId)(account.accountId.toString());

                  _state.accounts.push(account);

                  _state.modal.onClose = undefined;

                  _state.modal.closeModal();

                  resolve(getAccounts());
                }
              })).then(client => {
                client.ws.onclose = () => {
                  _state.client = null;
                  _state.accounts = [];
                  emitter.emit("signedOut", null);
                };

                _state.client = client;

                if (params.appMetadata.persistent !== false && persistedId === client.sessionId && persistedPubkey !== null && persistedAccountId !== null) {
                  _state.accounts.push({
                    accountId: persistedAccountId,
                    publicKey: near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.PublicKey.from(persistedPubkey)
                  });

                  _state.modal.onClose = undefined;
                  resolve(getAccounts());
                } else {
                  _state.modal.openModal(client.sessionId, _nightlylabs_connect_near__WEBPACK_IMPORTED_MODULE_2__.NETWORK.NEAR);

                  _state.modal.onClose = () => {
                    reject(new Error("User cancelled pairing"));
                  };
                }
              });
            } catch (err) {
              signOut();
              reject(err);
            }
          });
        })();
      },

      signOut,

      getAccounts() {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          return getAccounts().map(({
            accountId
          }) => ({
            accountId
          }));
        })();
      },

      verifyOwner({
        message
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("NightlyConnect:verifyOwner", {
            message
          });
          throw new Error(`Method not supported by ${metadata.name}`);
        })();
      },

      signAndSendTransaction({
        signerId,
        receiverId,
        actions
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          var _a;

          logger.log("signAndSendTransaction", {
            signerId,
            receiverId,
            actions
          });
          const accounts = getAccounts();

          if (!((_a = _state.client) === null || _a === void 0 ? void 0 : _a.sessionId) || !accounts.length) {
            throw new Error("Wallet not signed in");
          }

          const [signedTx] = yield (0,_near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_4__.signTransactions)(transformTransactions([{
            signerId,
            receiverId,
            actions
          }]), signer, options.network);
          return provider.sendTransaction(signedTx);
        })();
      },

      signAndSendTransactions({
        transactions
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          var _a;

          logger.log("signAndSendTransactions", {
            transactions
          });
          const accounts = getAccounts();

          if (!((_a = _state.client) === null || _a === void 0 ? void 0 : _a.sessionId) || !accounts.length) {
            throw new Error("Wallet not signed in");
          }

          const signedTxs = yield (0,_near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_4__.signTransactions)(transformTransactions(transactions), signer, options.network);
          const results = [];

          for (let i = 0; i < signedTxs.length; i++) {
            results.push(yield provider.sendTransaction(signedTxs[i]));
          }

          return results;
        })();
      }

    };
  });

  return function NightlyConnect(_x) {
    return _ref.apply(this, arguments);
  };
}();

function setupNightlyConnect({
  appMetadata,
  timeout,
  url,
  iconUrl = _icon__WEBPACK_IMPORTED_MODULE_5__["default"],
  deprecated = false
}) {
  return /*#__PURE__*/(0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
    return {
      id: "nightly-connect",
      type: "bridge",
      metadata: {
        name: "Nightly Connect",
        description: "Upcoming cutting-edge crypto bridge wallet.",
        iconUrl: iconUrl,
        deprecated,
        available: true
      },
      init: options => {
        return NightlyConnect(Object.assign(Object.assign({}, options), {
          params: {
            appMetadata,
            timeout,
            url
          }
        }));
      }
    };
  });
}

/***/ }),

/***/ 22654:
/*!***************************************!*\
  !*** ./packages/nightly/src/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupNightly": () => (/* reexport safe */ _lib_nightly__WEBPACK_IMPORTED_MODULE_0__.setupNightly)
/* harmony export */ });
/* harmony import */ var _lib_nightly__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/nightly */ 6303);



/***/ }),

/***/ 61389:
/*!******************************************!*\
  !*** ./packages/nightly/src/lib/icon.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`data:image/png;base64,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`);


/***/ }),

/***/ 6303:
/*!*********************************************!*\
  !*** ./packages/nightly/src/lib/nightly.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupNightly": () => (/* binding */ setupNightly)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var _near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @near-wallet-selector/core */ 15643);
/* harmony import */ var _near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @near-wallet-selector/wallet-utils */ 11557);
/* harmony import */ var is_mobile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! is-mobile */ 50266);
/* harmony import */ var is_mobile__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(is_mobile__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! near-api-js */ 17873);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(near_api_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icon */ 61389);







const setupNightlyState = /*#__PURE__*/function () {
  var _ref = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (store) {
    const {
      selectedWalletId
    } = store.getState();
    const wallet = window.nightly.near; // Attempt to reconnect wallet if previously selected.

    if (selectedWalletId === "nightly") {
      yield wallet.connect(undefined, true).catch(() => null);
    }

    return {
      wallet
    };
  });

  return function setupNightlyState(_x) {
    return _ref.apply(this, arguments);
  };
}();

const isInstalled = () => {
  return (0,_near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_1__.waitFor)(() => !!window.nightly.near).catch(() => false);
};

const Nightly = /*#__PURE__*/function () {
  var _ref2 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
    metadata,
    options,
    store,
    logger,
    provider
  }) {
    const _state = yield setupNightlyState(store);

    const getAccounts = () => {
      const {
        accountId,
        publicKey
      } = _state.wallet.account;

      if (!accountId) {
        return [];
      }

      return [{
        accountId,
        publicKey: publicKey.toString()
      }];
    };

    const transformTransactions = transactions => {
      const accounts = getAccounts();
      const {
        contract
      } = store.getState();

      if (!accounts.length || !contract) {
        throw new Error("Wallet not signed in");
      }

      return transactions.map(transaction => {
        return {
          signerId: transaction.signerId || accounts[0].accountId,
          receiverId: transaction.receiverId || contract.contractId,
          actions: transaction.actions
        };
      });
    };

    const signer = {
      createKey: () => {
        throw new Error("Not implemented");
      },
      getPublicKey: function () {
        var _ref3 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (accountId) {
          const accounts = getAccounts();
          const account = accounts.find(a => a.accountId === accountId);

          if (!account) {
            throw new Error("Failed to find public key for account");
          }

          return near_api_js__WEBPACK_IMPORTED_MODULE_4__.utils.PublicKey.from(account.publicKey);
        });

        return function getPublicKey(_x3) {
          return _ref3.apply(this, arguments);
        };
      }(),
      signMessage: function () {
        var _ref4 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (message, accountId) {
          const accounts = getAccounts();
          const account = accounts.find(a => a.accountId === accountId);

          if (!account) {
            throw new Error("Failed to find account for signing");
          }

          try {
            const tx = near_api_js__WEBPACK_IMPORTED_MODULE_4__.transactions.Transaction.decode(Buffer.from(message));
            const signedTx = yield _state.wallet.signTransaction(tx);
            return {
              signature: signedTx.signature.data,
              publicKey: tx.publicKey
            };
          } catch (err) {
            logger.log("Failed to sign message");
            logger.error(err);
            throw Error("Invalid message. Only transactions can be signed");
          }
        });

        return function signMessage(_x4, _x5) {
          return _ref4.apply(this, arguments);
        };
      }()
    };
    return {
      signIn() {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          const existingAccounts = getAccounts();

          if (existingAccounts.length) {
            return existingAccounts;
          }

          yield _state.wallet.connect();
          return getAccounts();
        })();
      },

      signOut() {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          yield _state.wallet.disconnect();
        })();
      },

      getAccounts() {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          return getAccounts().map(({
            accountId
          }) => ({
            accountId
          }));
        })();
      },

      verifyOwner({
        message
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("Nightly:verifyOwner", {
            message
          });
          throw new Error(`Method not supported by ${metadata.name}`);
        })();
      },

      signAndSendTransaction({
        signerId,
        receiverId,
        actions
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("signAndSendTransaction", {
            signerId,
            receiverId,
            actions
          });
          const {
            contract
          } = store.getState();
          const accounts = getAccounts();

          if (!accounts.length || !contract) {
            throw new Error("Wallet not signed in");
          }

          const [signedTx] = yield (0,_near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_2__.signTransactions)(transformTransactions([{
            signerId,
            receiverId,
            actions
          }]), signer, options.network);
          return provider.sendTransaction(signedTx);
        })();
      },

      signAndSendTransactions({
        transactions
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("signAndSendTransactions", {
            transactions
          });
          const signedTxs = yield (0,_near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_2__.signTransactions)(transformTransactions(transactions), signer, options.network);
          const results = [];

          for (let i = 0; i < signedTxs.length; i++) {
            results.push(yield provider.sendTransaction(signedTxs[i]));
          }

          return results;
        })();
      }

    };
  });

  return function Nightly(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

function setupNightly({
  iconUrl = _icon__WEBPACK_IMPORTED_MODULE_5__["default"],
  deprecated = false
} = {}) {
  return /*#__PURE__*/(0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
    const mobile = (0,is_mobile__WEBPACK_IMPORTED_MODULE_3__.isMobile)();
    const installed = yield isInstalled();

    if (mobile) {
      return null;
    }

    yield (0,_near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_1__.waitFor)(() => {
      var _a;

      return !!((_a = window.nightly) === null || _a === void 0 ? void 0 : _a.near);
    }, {
      timeout: 300
    }).catch(() => false);
    return {
      id: "nightly",
      type: "injected",
      metadata: {
        name: "Nightly",
        description: "Upcoming cutting-edge crypto wallet.",
        iconUrl,
        // Will replace we open beta with stable version
        downloadUrl: "https://www.nightly.app",
        deprecated,
        available: installed
      },
      init: Nightly
    };
  });
}

/***/ }),

/***/ 56117:
/*!**************************************!*\
  !*** ./packages/sender/src/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupSender": () => (/* reexport safe */ _lib_sender__WEBPACK_IMPORTED_MODULE_0__.setupSender)
/* harmony export */ });
/* harmony import */ var _lib_sender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/sender */ 27596);



/***/ }),

/***/ 8181:
/*!*****************************************!*\
  !*** ./packages/sender/src/lib/icon.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`data:image/png;base64,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`);


/***/ }),

/***/ 27596:
/*!*******************************************!*\
  !*** ./packages/sender/src/lib/sender.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupSender": () => (/* binding */ setupSender)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var is_mobile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! is-mobile */ 50266);
/* harmony import */ var is_mobile__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(is_mobile__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @near-wallet-selector/core */ 15643);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./icon */ 8181);





const isInstalled = () => {
  return (0,_near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_2__.waitFor)(() => {
    var _a;

    return !!((_a = window.near) === null || _a === void 0 ? void 0 : _a.isSender);
  }).catch(() => false);
};

const setupSenderState = () => {
  const wallet = window.near;
  return {
    wallet
  };
};

const Sender = /*#__PURE__*/function () {
  var _ref = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
    options,
    metadata,
    store,
    provider,
    emitter,
    logger
  }) {
    const _state = setupSenderState();

    const cleanup = () => {
      for (const key in _state.wallet.callbacks) {
        _state.wallet.remove(key);
      }
    };

    const signOut = /*#__PURE__*/function () {
      var _ref2 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        if (!_state.wallet.isSignedIn()) {
          return;
        }

        cleanup();
        const res = yield _state.wallet.signOut();

        if (res === true) {
          return;
        }

        const error = new Error(typeof res.error === "string" ? res.error : res.error.type); // Prevent signing out by throwing.

        if (error.message === "User reject") {
          throw error;
        } // Continue signing out but log the issue.


        logger.log("Failed to sign out");
        logger.error(error);
      });

      return function signOut() {
        return _ref2.apply(this, arguments);
      };
    }();

    const setupEvents = () => {
      _state.wallet.on("accountChanged", /*#__PURE__*/function () {
        var _ref3 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (newAccountId) {
          logger.log("onAccountChange", newAccountId);
          emitter.emit("signedOut", null);
        });

        return function (_x2) {
          return _ref3.apply(this, arguments);
        };
      }());

      _state.wallet.on("rpcChanged", /*#__PURE__*/function () {
        var _ref4 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (rpc) {
          logger.log("onNetworkChange", rpc);

          if (options.network.networkId !== rpc.networkId) {
            yield signOut();
            emitter.emit("signedOut", null);
            emitter.emit("networkChanged", {
              networkId: rpc.networkId
            });
          }
        });

        return function (_x3) {
          return _ref4.apply(this, arguments);
        };
      }());
    };

    const getAccounts = () => {
      const accountId = _state.wallet.getAccountId();

      if (!accountId) {
        return [];
      }

      return [{
        accountId
      }];
    };

    const isValidActions = actions => {
      return actions.every(x => x.type === "FunctionCall");
    };

    const transformActions = actions => {
      const validActions = isValidActions(actions);

      if (!validActions) {
        throw new Error(`Only 'FunctionCall' actions types are supported by ${metadata.name}`);
      }

      return actions.map(x => x.params);
    };

    const transformTransactions = transactions => {
      return transactions.map(transaction => {
        return {
          receiverId: transaction.receiverId,
          actions: transformActions(transaction.actions)
        };
      });
    };

    if (_state.wallet && _state.wallet.isSignedIn()) {
      setupEvents();
    }

    return {
      signIn({
        contractId,
        methodNames
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          const existingAccounts = getAccounts();

          if (existingAccounts.length) {
            return existingAccounts;
          }

          const {
            accessKey,
            error
          } = yield _state.wallet.requestSignIn({
            contractId,
            methodNames
          });

          if (!accessKey || error) {
            yield signOut();
            throw new Error((typeof error === "string" ? error : error.type) || "Failed to sign in");
          }

          setupEvents();
          return getAccounts();
        })();
      },

      signOut,

      getAccounts() {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          return getAccounts();
        })();
      },

      verifyOwner({
        message
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("Sender:verifyOwner", {
            message
          });

          const account = _state.wallet.account();

          if (!account) {
            throw new Error("Wallet not signed in");
          } // Note: When the wallet is locked, Sender returns an empty Signer interface.
          // Even after unlocking the wallet, the user will need to refresh to gain
          // access to these methods.


          if (!account.connection.signer.signMessage) {
            throw new Error("Wallet is locked");
          }

          const networkId = options.network.networkId;
          const accountId = account.accountId;
          const pubKey = yield account.connection.signer.getPublicKey(accountId, networkId);
          const block = yield provider.block({
            finality: "final"
          });
          const data = {
            accountId,
            message,
            blockId: block.header.hash,
            publicKey: Buffer.from(pubKey.data).toString("base64"),
            keyType: pubKey.keyType
          };
          const encoded = JSON.stringify(data);
          const signed = yield account.connection.signer.signMessage(new Uint8Array(Buffer.from(encoded)), accountId, networkId);
          return Object.assign(Object.assign({}, data), {
            signature: Buffer.from(signed.signature).toString("base64"),
            keyType: signed.publicKey.keyType
          });
        })();
      },

      signAndSendTransaction({
        signerId,
        receiverId,
        actions
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("signAndSendTransaction", {
            signerId,
            receiverId,
            actions
          });
          const {
            contract
          } = store.getState();

          if (!_state.wallet.isSignedIn() || !contract) {
            throw new Error("Wallet not signed in");
          }

          return _state.wallet.signAndSendTransaction({
            receiverId: receiverId || contract.contractId,
            actions: transformActions(actions)
          }).then(res => {
            var _a;

            if (res.error) {
              throw new Error(res.error);
            } else if (res.response && "error" in res.response) {
              throw new Error(res.response.error.message);
            } // Shouldn't happen but avoids inconsistent responses.


            if (!((_a = res.response) === null || _a === void 0 ? void 0 : _a.length)) {
              throw new Error("Invalid response");
            }

            return res.response[0];
          });
        })();
      },

      signAndSendTransactions({
        transactions
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("signAndSendTransactions", {
            transactions
          });

          if (!_state.wallet.isSignedIn()) {
            throw new Error("Wallet not signed in");
          }

          return _state.wallet.requestSignTransactions({
            transactions: transformTransactions(transactions)
          }).then(res => {
            var _a;

            if (res.error) {
              throw new Error(res.error);
            } else if (res.response && "error" in res.response) {
              throw new Error(res.response.error.message);
            } // Shouldn't happen but avoids inconsistent responses.


            if (!((_a = res.response) === null || _a === void 0 ? void 0 : _a.length)) {
              throw new Error("Invalid response");
            }

            return res.response;
          });
        })();
      }

    };
  });

  return function Sender(_x) {
    return _ref.apply(this, arguments);
  };
}();

function setupSender({
  iconUrl = _icon__WEBPACK_IMPORTED_MODULE_3__["default"],
  deprecated = false
} = {}) {
  return /*#__PURE__*/(0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
    const mobile = (0,is_mobile__WEBPACK_IMPORTED_MODULE_1__.isMobile)();
    const installed = yield isInstalled();

    if (mobile) {
      return null;
    } // Add extra wait to ensure Sender's sign in status is read from the
    // browser extension background env.


    yield (0,_near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_2__.waitFor)(() => {
      var _a;

      return !!((_a = window.near) === null || _a === void 0 ? void 0 : _a.isSignedIn());
    }, {
      timeout: 300
    }).catch(() => false);
    return {
      id: "sender",
      type: "injected",
      metadata: {
        name: "Sender",
        description: "Browser extension wallet built on NEAR.",
        iconUrl,
        downloadUrl: "https://chrome.google.com/webstore/detail/sender-wallet/epapihdplajcdnnkdeiahlgigofloibg",
        deprecated,
        available: installed
      },
      init: Sender
    };
  });
}

/***/ }),

/***/ 13542:
/*!**********************************************!*\
  !*** ./packages/wallet-connect/src/index.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupWalletConnect": () => (/* reexport safe */ _lib_wallet_connect__WEBPACK_IMPORTED_MODULE_0__.setupWalletConnect)
/* harmony export */ });
/* harmony import */ var _lib_wallet_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/wallet-connect */ 75269);



/***/ }),

/***/ 23011:
/*!*************************************************!*\
  !*** ./packages/wallet-connect/src/lib/icon.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`data:image/png;base64,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`);


/***/ }),

/***/ 28444:
/*!******************************************************************!*\
  !*** ./packages/wallet-connect/src/lib/wallet-connect-client.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var _walletconnect_sign_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @walletconnect/sign-client */ 11111);
/* harmony import */ var _walletconnect_qrcode_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @walletconnect/qrcode-modal */ 809);
/* harmony import */ var _walletconnect_qrcode_modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_walletconnect_qrcode_modal__WEBPACK_IMPORTED_MODULE_2__);




class WalletConnectClient {
  init(opts) {
    var _this = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.client = yield _walletconnect_sign_client__WEBPACK_IMPORTED_MODULE_1__["default"].init(opts);
    })();
  }

  get session() {
    return this.client.session;
  }

  on(event, callback) {
    this.client.on(event, callback);
    return {
      remove: () => this.client.removeListener(event, callback)
    };
  }

  once(event, callback) {
    this.client.once(event, callback);
  }

  connect(params) {
    var _this2 = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return new Promise((resolve, reject) => {
        _this2.client.connect(params).then(({
          uri,
          approval
        }) => {
          if (uri) {
            _walletconnect_qrcode_modal__WEBPACK_IMPORTED_MODULE_2___default().open(uri, () => {
              reject(new Error("User cancelled pairing"));
            });
          }

          approval().then(resolve).catch(reject).finally(() => _walletconnect_qrcode_modal__WEBPACK_IMPORTED_MODULE_2___default().close());
        }).catch(reject);
      });
    })();
  }

  request(params) {
    var _this3 = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return _this3.client.request(params);
    })();
  }

  disconnect(params) {
    var _this4 = this;

    return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return _this4.client.disconnect(params);
    })();
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WalletConnectClient);

/***/ }),

/***/ 75269:
/*!***********************************************************!*\
  !*** ./packages/wallet-connect/src/lib/wallet-connect.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupWalletConnect": () => (/* binding */ setupWalletConnect)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! near-api-js */ 17873);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(near_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @near-wallet-selector/core */ 15643);
/* harmony import */ var _near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @near-wallet-selector/wallet-utils */ 11557);
/* harmony import */ var _wallet_connect_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wallet-connect-client */ 28444);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icon */ 23011);






const WC_METHODS = ["near_signIn", "near_signOut", "near_getAccounts", "near_signTransaction", "near_signTransactions"];
const WC_EVENTS = ["chainChanged", "accountsChanged"];

const setupWalletConnectState = /*#__PURE__*/function () {
  var _ref = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (id, params) {
    const client = new _wallet_connect_client__WEBPACK_IMPORTED_MODULE_4__["default"]();
    let session = null;
    const keystore = new near_api_js__WEBPACK_IMPORTED_MODULE_1__.keyStores.BrowserLocalStorageKeyStore(window.localStorage, `near-wallet-selector:${id}:keystore:`);
    yield client.init({
      projectId: params.projectId,
      metadata: params.metadata,
      relayUrl: params.relayUrl
    });

    if (client.session.length) {
      const lastKeyIndex = client.session.keys.length - 1;
      session = client.session.get(client.session.keys[lastKeyIndex]);
    }

    return {
      client,
      session,
      keystore,
      subscriptions: []
    };
  });

  return function setupWalletConnectState(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

const WalletConnect = /*#__PURE__*/function () {
  var _ref2 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
    id,
    options,
    store,
    params,
    provider,
    emitter,
    logger,
    metadata
  }) {
    const _state = yield setupWalletConnectState(id, params);

    const getChainId = () => {
      if (params.chainId) {
        return params.chainId;
      }

      const {
        networkId
      } = options.network;

      if (["mainnet", "testnet"].includes(networkId)) {
        return `near:${networkId}`;
      }

      throw new Error("Invalid chain id");
    };

    const getAccounts = () => {
      var _a;

      return (((_a = _state.session) === null || _a === void 0 ? void 0 : _a.namespaces["near"].accounts) || []).map(x => ({
        accountId: x.split(":")[2]
      }));
    };

    const cleanup = /*#__PURE__*/function () {
      var _ref3 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        _state.subscriptions.forEach(subscription => subscription.remove());

        _state.subscriptions = [];
        _state.session = null;
        yield _state.keystore.clear();
      });

      return function cleanup() {
        return _ref3.apply(this, arguments);
      };
    }();

    const validateAccessKey = (transaction, accessKey) => {
      if (accessKey.permission === "FullAccess") {
        return accessKey;
      } // eslint-disable-next-line @typescript-eslint/naming-convention


      const {
        receiver_id,
        method_names
      } = accessKey.permission.FunctionCall;

      if (transaction.receiverId !== receiver_id) {
        return null;
      }

      return transaction.actions.every(action => {
        if (action.type !== "FunctionCall") {
          return false;
        }

        const {
          methodName,
          deposit
        } = action.params;

        if (method_names.length && method_names.includes(methodName)) {
          return false;
        }

        return parseFloat(deposit) <= 0;
      });
    };

    const signTransactions = /*#__PURE__*/function () {
      var _ref4 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (transactions) {
        const signer = new near_api_js__WEBPACK_IMPORTED_MODULE_1__.InMemorySigner(_state.keystore);
        const signedTransactions = [];
        const block = yield provider.block({
          finality: "final"
        });

        for (let i = 0; i < transactions.length; i += 1) {
          const transaction = transactions[i];
          const publicKey = yield signer.getPublicKey(transaction.signerId, options.network.networkId);

          if (!publicKey) {
            throw new Error("No public key found");
          }

          const accessKey = yield provider.query({
            request_type: "view_access_key",
            finality: "final",
            account_id: transaction.signerId,
            public_key: publicKey.toString()
          });

          if (!validateAccessKey(transaction, accessKey)) {
            throw new Error("Invalid access key");
          }

          const tx = near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.createTransaction(transactions[i].signerId, near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.PublicKey.from(publicKey.toString()), transactions[i].receiverId, accessKey.nonce + i + 1, transaction.actions.map(action => (0,_near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_3__.createAction)(action)), near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.serialize.base_decode(block.header.hash));
          const [, signedTx] = yield near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.signTransaction(tx, signer, transactions[i].signerId, options.network.networkId);
          signedTransactions.push(signedTx);
        }

        return signedTransactions;
      });

      return function signTransactions(_x4) {
        return _ref4.apply(this, arguments);
      };
    }();

    const requestAccounts = /*#__PURE__*/function () {
      var _ref5 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        return _state.client.request({
          topic: _state.session.topic,
          chainId: getChainId(),
          request: {
            method: "near_getAccounts",
            params: {}
          }
        });
      });

      return function requestAccounts() {
        return _ref5.apply(this, arguments);
      };
    }();

    const requestSignTransaction = /*#__PURE__*/function () {
      var _ref6 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (transaction) {
        const accounts = yield requestAccounts();
        const account = accounts.find(x => x.accountId === transaction.signerId);

        if (!account) {
          throw new Error("Invalid signer id");
        }

        const [block, accessKey] = yield Promise.all([provider.block({
          finality: "final"
        }), provider.query({
          request_type: "view_access_key",
          finality: "final",
          account_id: transaction.signerId,
          public_key: account.publicKey
        })]);
        const tx = near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.createTransaction(transaction.signerId, near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.PublicKey.from(account.publicKey), transaction.receiverId, accessKey.nonce + 1, transaction.actions.map(action => (0,_near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_3__.createAction)(action)), near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.serialize.base_decode(block.header.hash));
        const result = yield _state.client.request({
          topic: _state.session.topic,
          chainId: getChainId(),
          request: {
            method: "near_signTransaction",
            params: {
              transaction: tx.encode()
            }
          }
        });
        return near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.SignedTransaction.decode(Buffer.from(result));
      });

      return function requestSignTransaction(_x5) {
        return _ref6.apply(this, arguments);
      };
    }();

    const requestSignTransactions = /*#__PURE__*/function () {
      var _ref7 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (transactions) {
        if (!transactions.length) {
          return [];
        }

        const txs = [];
        const [block, accounts] = yield Promise.all([provider.block({
          finality: "final"
        }), requestAccounts()]);

        for (let i = 0; i < transactions.length; i += 1) {
          const transaction = transactions[i];
          const account = accounts.find(x => x.accountId === transaction.signerId);

          if (!account) {
            throw new Error("Invalid signer id");
          }

          const accessKey = yield provider.query({
            request_type: "view_access_key",
            finality: "final",
            account_id: transaction.signerId,
            public_key: account.publicKey
          });
          txs.push(near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.createTransaction(transaction.signerId, near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.PublicKey.from(account.publicKey), transaction.receiverId, accessKey.nonce + i + 1, transaction.actions.map(action => (0,_near_wallet_selector_wallet_utils__WEBPACK_IMPORTED_MODULE_3__.createAction)(action)), near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.serialize.base_decode(block.header.hash)));
        }

        const results = yield _state.client.request({
          topic: _state.session.topic,
          chainId: getChainId(),
          request: {
            method: "near_signAndSendTransactions",
            params: {
              transactions: txs.map(x => x.encode())
            }
          }
        });
        return results.map(result => {
          return near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.SignedTransaction.decode(Buffer.from(result));
        });
      });

      return function requestSignTransactions(_x6) {
        return _ref7.apply(this, arguments);
      };
    }();

    const createLimitedAccessKeyPairs = () => {
      const accounts = getAccounts();
      return accounts.map(({
        accountId
      }) => ({
        accountId,
        keyPair: near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.KeyPair.fromRandom("ed25519")
      }));
    };

    const requestSignIn = /*#__PURE__*/function () {
      var _ref8 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (permission) {
        const keyPairs = createLimitedAccessKeyPairs();
        const limitedAccessAccounts = keyPairs.map(({
          accountId,
          keyPair
        }) => ({
          accountId,
          publicKey: keyPair.getPublicKey().toString()
        }));
        yield _state.client.request({
          topic: _state.session.topic,
          chainId: getChainId(),
          request: {
            method: "near_signIn",
            params: {
              permission: permission,
              accounts: limitedAccessAccounts
            }
          }
        });

        for (let i = 0; i < keyPairs.length; i += 1) {
          const {
            accountId,
            keyPair
          } = keyPairs[i];
          yield _state.keystore.setKey(options.network.networkId, accountId, keyPair);
        }
      });

      return function requestSignIn(_x7) {
        return _ref8.apply(this, arguments);
      };
    }();

    const requestSignOut = /*#__PURE__*/function () {
      var _ref9 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const accounts = getAccounts();
        const limitedAccessAccounts = [];

        for (let i = 0; i < accounts.length; i += 1) {
          const account = accounts[i];
          const keyPair = yield _state.keystore.getKey(options.network.networkId, account.accountId);

          if (!keyPair) {
            continue;
          }

          limitedAccessAccounts.push({
            accountId: account.accountId,
            publicKey: keyPair.getPublicKey().toString()
          });
        }

        if (!limitedAccessAccounts.length) {
          return;
        }

        yield _state.client.request({
          topic: _state.session.topic,
          chainId: getChainId(),
          request: {
            method: "near_signOut",
            params: {
              accounts: limitedAccessAccounts
            }
          }
        });

        for (let i = 0; i < limitedAccessAccounts.length; i += 1) {
          const {
            accountId
          } = limitedAccessAccounts[i];
          yield _state.keystore.removeKey(options.network.networkId, accountId);
        }
      });

      return function requestSignOut() {
        return _ref9.apply(this, arguments);
      };
    }();

    const signOut = /*#__PURE__*/function () {
      var _ref10 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        if (_state.session) {
          yield requestSignOut();
          yield _state.client.disconnect({
            topic: _state.session.topic,
            reason: {
              code: 5900,
              message: "User disconnected"
            }
          });
        }

        yield cleanup();
      });

      return function signOut() {
        return _ref10.apply(this, arguments);
      };
    }();

    const setupEvents = () => {
      _state.subscriptions.push(_state.client.on("session_update", event => {
        var _a;

        logger.log("Session Update", event);

        if (event.topic === ((_a = _state.session) === null || _a === void 0 ? void 0 : _a.topic)) {
          _state.session = Object.assign(Object.assign({}, _state.client.session.get(event.topic)), {
            namespaces: event.params.namespaces
          });
          emitter.emit("accountsChanged", {
            accounts: getAccounts()
          });
        }
      }));

      _state.subscriptions.push(_state.client.on("session_delete", /*#__PURE__*/function () {
        var _ref11 = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (event) {
          var _a;

          logger.log("Session Deleted", event);

          if (event.topic === ((_a = _state.session) === null || _a === void 0 ? void 0 : _a.topic)) {
            yield cleanup();
            emitter.emit("signedOut", null);
          }
        });

        return function (_x8) {
          return _ref11.apply(this, arguments);
        };
      }()));
    };

    if (_state.session) {
      setupEvents();
    }

    return {
      signIn({
        contractId,
        methodNames = []
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          const existingAccounts = getAccounts();

          if (existingAccounts.length) {
            return existingAccounts;
          }

          try {
            _state.session = yield _state.client.connect({
              requiredNamespaces: {
                near: {
                  chains: [getChainId()],
                  methods: WC_METHODS,
                  events: WC_EVENTS
                }
              }
            });
            yield requestSignIn({
              receiverId: contractId,
              methodNames
            });
            setupEvents();
            return getAccounts();
          } catch (err) {
            yield signOut();
            throw err;
          }
        })();
      },

      signOut,

      getAccounts() {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          return getAccounts();
        })();
      },

      verifyOwner({
        message
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("WalletConnect:verifyOwner", {
            message
          });
          throw new Error(`Method not supported by ${metadata.name}`);
        })();
      },

      signAndSendTransaction({
        signerId,
        receiverId,
        actions
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("signAndSendTransaction", {
            signerId,
            receiverId,
            actions
          });
          const {
            contract
          } = store.getState();

          if (!_state.session || !contract) {
            throw new Error("Wallet not signed in");
          }

          const account = (0,_near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_2__.getActiveAccount)(store.getState());

          if (!account) {
            throw new Error("No active account");
          }

          const resolvedTransaction = {
            signerId: signerId || account.accountId,
            receiverId: receiverId || contract.contractId,
            actions
          };

          try {
            const [signedTx] = yield signTransactions([resolvedTransaction]);
            return provider.sendTransaction(signedTx);
          } catch (err) {
            logger.log("Falling back to WalletConnect to sign transaction", err);
            const signedTx = yield requestSignTransaction(resolvedTransaction);
            return provider.sendTransaction(signedTx);
          }
        })();
      },

      signAndSendTransactions({
        transactions
      }) {
        return (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          logger.log("signAndSendTransactions", {
            transactions
          });
          const {
            contract
          } = store.getState();

          if (!_state.session || !contract) {
            throw new Error("Wallet not signed in");
          }

          const account = (0,_near_wallet_selector_core__WEBPACK_IMPORTED_MODULE_2__.getActiveAccount)(store.getState());

          if (!account) {
            throw new Error("No active account");
          }

          const resolvedTransactions = transactions.map(x => ({
            signerId: x.signerId || account.accountId,
            receiverId: x.receiverId,
            actions: x.actions
          }));

          try {
            const signedTxs = yield signTransactions(resolvedTransactions);
            const results = [];

            for (let i = 0; i < signedTxs.length; i += 1) {
              results.push(yield provider.sendTransaction(signedTxs[i]));
            }

            return results;
          } catch (err) {
            const signedTxs = yield requestSignTransactions(resolvedTransactions);
            const results = [];

            for (let i = 0; i < signedTxs.length; i += 1) {
              results.push(yield provider.sendTransaction(signedTxs[i]));
            }

            return results;
          }
        })();
      }

    };
  });

  return function WalletConnect(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

function setupWalletConnect({
  projectId,
  metadata,
  chainId,
  relayUrl = "wss://relay.walletconnect.com",
  iconUrl = _icon__WEBPACK_IMPORTED_MODULE_5__["default"],
  deprecated = false
}) {
  return /*#__PURE__*/(0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
    return {
      id: "wallet-connect",
      type: "bridge",
      metadata: {
        name: "WalletConnect",
        description: "Bridge wallet for NEAR.",
        iconUrl,
        deprecated,
        available: true
      },
      init: options => {
        return WalletConnect(Object.assign(Object.assign({}, options), {
          params: {
            projectId,
            metadata,
            relayUrl,
            chainId
          }
        }));
      }
    };
  });
}

/***/ }),

/***/ 11557:
/*!********************************************!*\
  !*** ./packages/wallet-utils/src/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createAction": () => (/* reexport safe */ _lib_wallet_utils__WEBPACK_IMPORTED_MODULE_0__.createAction),
/* harmony export */   "signTransactions": () => (/* reexport safe */ _lib_wallet_utils__WEBPACK_IMPORTED_MODULE_0__.signTransactions)
/* harmony export */ });
/* harmony import */ var _lib_wallet_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/wallet-utils */ 95839);



/***/ }),

/***/ 59111:
/*!********************************************************!*\
  !*** ./packages/wallet-utils/src/lib/create-action.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createAction": () => (/* binding */ createAction)
/* harmony export */ });
/* harmony import */ var bn_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bn.js */ 6585);
/* harmony import */ var bn_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bn_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! near-api-js */ 17873);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(near_api_js__WEBPACK_IMPORTED_MODULE_1__);


const getAccessKey = (permission) => {
    if (permission === "FullAccess") {
        return near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.fullAccessKey();
    }
    const { receiverId, methodNames = [] } = permission;
    const allowance = permission.allowance
        ? new bn_js__WEBPACK_IMPORTED_MODULE_0__.BN(permission.allowance)
        : undefined;
    return near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.functionCallAccessKey(receiverId, methodNames, allowance);
};
const createAction = (action) => {
    switch (action.type) {
        case "CreateAccount":
            return near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.createAccount();
        case "DeployContract": {
            const { code } = action.params;
            return near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.deployContract(code);
        }
        case "FunctionCall": {
            const { methodName, args, gas, deposit } = action.params;
            return near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.functionCall(methodName, args, new bn_js__WEBPACK_IMPORTED_MODULE_0__.BN(gas), new bn_js__WEBPACK_IMPORTED_MODULE_0__.BN(deposit));
        }
        case "Transfer": {
            const { deposit } = action.params;
            return near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.transfer(new bn_js__WEBPACK_IMPORTED_MODULE_0__.BN(deposit));
        }
        case "Stake": {
            const { stake, publicKey } = action.params;
            return near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.stake(new bn_js__WEBPACK_IMPORTED_MODULE_0__.BN(stake), near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.PublicKey.from(publicKey));
        }
        case "AddKey": {
            const { publicKey, accessKey } = action.params;
            return near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.addKey(near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.PublicKey.from(publicKey), 
            // TODO: Use accessKey.nonce? near-api-js seems to think 0 is fine?
            getAccessKey(accessKey.permission));
        }
        case "DeleteKey": {
            const { publicKey } = action.params;
            return near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.deleteKey(near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.PublicKey.from(publicKey));
        }
        case "DeleteAccount": {
            const { beneficiaryId } = action.params;
            return near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.deleteAccount(beneficiaryId);
        }
        default:
            throw new Error("Invalid action type");
    }
};


/***/ }),

/***/ 12489:
/*!************************************************************!*\
  !*** ./packages/wallet-utils/src/lib/sign-transactions.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "signTransactions": () => (/* binding */ signTransactions)
/* harmony export */ });
/* harmony import */ var C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 83918);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! near-api-js */ 17873);
/* harmony import */ var near_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(near_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _create_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create-action */ 59111);



const signTransactions = /*#__PURE__*/function () {
  var _ref = (0,C_Users_haris_WebstormProjects_wallet_selector_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (transactions, signer, network) {
    const provider = new near_api_js__WEBPACK_IMPORTED_MODULE_1__.providers.JsonRpcProvider({
      url: network.nodeUrl
    });
    const signedTransactions = [];

    for (let i = 0; i < transactions.length; i++) {
      const publicKey = yield signer.getPublicKey(transactions[i].signerId, network.networkId);
      const [block, accessKey] = yield Promise.all([provider.block({
        finality: "final"
      }), provider.query({
        request_type: "view_access_key",
        finality: "final",
        account_id: transactions[i].signerId,
        public_key: publicKey.toString()
      })]);
      const actions = transactions[i].actions.map(action => (0,_create_action__WEBPACK_IMPORTED_MODULE_2__.createAction)(action));
      const transaction = near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.createTransaction(transactions[i].signerId, near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.PublicKey.from(publicKey.toString()), transactions[i].receiverId, accessKey.nonce + i + 1, actions, near_api_js__WEBPACK_IMPORTED_MODULE_1__.utils.serialize.base_decode(block.header.hash));
      const response = yield near_api_js__WEBPACK_IMPORTED_MODULE_1__.transactions.signTransaction(transaction, signer, transactions[i].signerId, network.networkId);
      signedTransactions.push(response[1]);
    }

    return signedTransactions;
  });

  return function signTransactions(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ 95839:
/*!*******************************************************!*\
  !*** ./packages/wallet-utils/src/lib/wallet-utils.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createAction": () => (/* reexport safe */ _create_action__WEBPACK_IMPORTED_MODULE_0__.createAction),
/* harmony export */   "signTransactions": () => (/* reexport safe */ _sign_transactions__WEBPACK_IMPORTED_MODULE_1__.signTransactions)
/* harmony export */ });
/* harmony import */ var _create_action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-action */ 59111);
/* harmony import */ var _sign_transactions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sign-transactions */ 12489);





/***/ }),

/***/ 90378:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 89002:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 35883:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 46601:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 73105:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 65308:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 55024:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(85515)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map