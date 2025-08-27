"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8654],{88654:function(e,t,i){i.r(t),i.d(t,{W3mBuyInProgressView:function(){return E},W3mOnRampProvidersView:function(){return j},W3mOnrampFiatSelectView:function(){return w},W3mOnrampTokensView:function(){return S},W3mOnrampWidget:function(){return V},W3mWhatIsABuyView:function(){return M}});var r=i(44920),o=i(30077),s=i(52608),n=i(62640),a=i(91588),c=i(42774),l=i(556),u=i(91368),p=i(93907);i(52042),i(64153),i(93595),i(81433),i(36660);var d=r.iv`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-flex {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`,h=function(e,t,i,r){var o,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(s<3?o(n):s>3?o(t,i,n):o(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let w=class extends r.oi{constructor(){super(),this.unsubscribe=[],this.selectedCurrency=n.ph.state.paymentCurrency,this.currencies=n.ph.state.paymentCurrencies,this.currencyImages=a.W.state.currencyImages,this.checked=c.M.state.isLegalCheckboxChecked,this.unsubscribe.push(...[n.ph.subscribe(e=>{this.selectedCurrency=e.paymentCurrency,this.currencies=e.paymentCurrencies}),a.W.subscribeKey("currencyImages",e=>this.currencyImages=e),c.M.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e})])}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=l.h.state,i=l.h.state.features?.legalCheckbox,o=!!(e||t)&&!!i&&!this.checked;return r.dy`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${["0","s","s","s"]}
        gap="xs"
        class=${(0,s.o)(o?"disabled":void 0)}
      >
        ${this.currenciesTemplate(o)}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}currenciesTemplate(e=!1){return this.currencies.map(t=>r.dy`
        <wui-list-item
          imageSrc=${(0,s.o)(this.currencyImages?.[t.id])}
          @click=${()=>this.selectCurrency(t)}
          variant="image"
          tabIdx=${(0,s.o)(e?-1:void 0)}
        >
          <wui-text variant="paragraph-500" color="fg-100">${t.id}</wui-text>
        </wui-list-item>
      `)}selectCurrency(e){e&&(n.ph.setPaymentCurrency(e),u.I.close())}};w.styles=d,h([(0,o.SB)()],w.prototype,"selectedCurrency",void 0),h([(0,o.SB)()],w.prototype,"currencies",void 0),h([(0,o.SB)()],w.prototype,"currencyImages",void 0),h([(0,o.SB)()],w.prototype,"checked",void 0),w=h([(0,p.Mo)("w3m-onramp-fiat-select-view")],w);var y=i(2706),g=i(77405),m=i(23704),f=i(86126),b=i(40458),v=i(89499),x=i(93934);i(89938),i(52235),i(40442),i(82285);var C=r.iv`
  button {
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xs);
    border: none;
    outline: none;
    background-color: var(--wui-color-gray-glass-002);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--wui-spacing-s);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .provider-image {
    width: var(--wui-spacing-3xl);
    min-width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    border-radius: calc(var(--wui-border-radius-xs) - calc(var(--wui-spacing-s) / 2));
    position: relative;
    overflow: hidden;
  }

  .provider-image::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-border-radius-xs) - calc(var(--wui-spacing-s) / 2));
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  .network-icon {
    width: var(--wui-spacing-m);
    height: var(--wui-spacing-m);
    border-radius: calc(var(--wui-spacing-m) / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-002),
      0 0 0 3px var(--wui-color-modal-bg);
    transition: box-shadow var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: box-shadow;
  }

  button:hover .network-icon {
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-005),
      0 0 0 3px var(--wui-color-modal-bg);
  }
`,k=function(e,t,i,r){var o,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(s<3?o(n):s>3?o(t,i,n):o(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let $=class extends r.oi{constructor(){super(...arguments),this.disabled=!1,this.color="inherit",this.label="",this.feeRange="",this.loading=!1,this.onClick=null}render(){return r.dy`
      <button ?disabled=${this.disabled} @click=${this.onClick} ontouchstart>
        <wui-visual name=${(0,s.o)(this.name)} class="provider-image"></wui-visual>
        <wui-flex flexDirection="column" gap="4xs">
          <wui-text variant="paragraph-500" color="fg-100">${this.label}</wui-text>
          <wui-flex alignItems="center" justifyContent="flex-start" gap="l">
            <wui-text variant="tiny-500" color="fg-100">
              <wui-text variant="tiny-400" color="fg-200">Fees</wui-text>
              ${this.feeRange}
            </wui-text>
            <wui-flex gap="xxs">
              <wui-icon name="bank" size="xs" color="fg-150"></wui-icon>
              <wui-icon name="card" size="xs" color="fg-150"></wui-icon>
            </wui-flex>
            ${this.networksTemplate()}
          </wui-flex>
        </wui-flex>
        ${this.loading?r.dy`<wui-loading-spinner color="fg-200" size="md"></wui-loading-spinner>`:r.dy`<wui-icon name="chevronRight" color="fg-200" size="sm"></wui-icon>`}
      </button>
    `}networksTemplate(){let e=y.R.getAllRequestedCaipNetworks(),t=e?.filter(e=>e?.assets?.imageId)?.slice(0,5);return r.dy`
      <wui-flex class="networks">
        ${t?.map(e=>r.dy`
            <wui-flex class="network-icon">
              <wui-image src=${(0,s.o)(x.f.getNetworkImage(e))}></wui-image>
            </wui-flex>
          `)}
      </wui-flex>
    `}};$.styles=[C],k([(0,o.Cb)({type:Boolean})],$.prototype,"disabled",void 0),k([(0,o.Cb)()],$.prototype,"color",void 0),k([(0,o.Cb)()],$.prototype,"name",void 0),k([(0,o.Cb)()],$.prototype,"label",void 0),k([(0,o.Cb)()],$.prototype,"feeRange",void 0),k([(0,o.Cb)({type:Boolean})],$.prototype,"loading",void 0),k([(0,o.Cb)()],$.prototype,"onClick",void 0),$=k([(0,p.Mo)("w3m-onramp-provider-item")],$),i(42255);var R=r.iv`
  wui-flex {
    border-top: 1px solid var(--wui-color-gray-glass-005);
  }

  a {
    text-decoration: none;
    color: var(--wui-color-fg-175);
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-3xs);
  }
`;let P=class extends r.oi{render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=l.h.state;return e||t?r.dy`
      <wui-flex
        .padding=${["m","s","s","s"]}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="s"
      >
        <wui-text color="fg-250" variant="small-400" align="center">
          We work with the best providers to give you the lowest fees and best support. More options
          coming soon!
        </wui-text>

        ${this.howDoesItWorkTemplate()}
      </wui-flex>
    `:null}howDoesItWorkTemplate(){return r.dy` <wui-link @click=${this.onWhatIsBuy.bind(this)}>
      <wui-icon size="xs" color="accent-100" slot="iconLeft" name="helpCircle"></wui-icon>
      How does it work?
    </wui-link>`}onWhatIsBuy(){f.X.sendEvent({type:"track",event:"SELECT_WHAT_IS_A_BUY",properties:{isSmartAccount:(0,b.r9)(y.R.state.activeChain)===v.y_.ACCOUNT_TYPES.SMART_ACCOUNT}}),g.P.push("WhatIsABuy")}};P.styles=[R],P=function(e,t,i,r){var o,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(s<3?o(n):s>3?o(t,i,n):o(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n}([(0,p.Mo)("w3m-onramp-providers-footer")],P);var I=function(e,t,i,r){var o,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(s<3?o(n):s>3?o(t,i,n):o(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let j=class extends r.oi{constructor(){super(),this.unsubscribe=[],this.providers=n.ph.state.providers,this.unsubscribe.push(...[n.ph.subscribeKey("providers",e=>{this.providers=e})])}render(){return r.dy`
      <wui-flex flexDirection="column" .padding=${["0","s","s","s"]} gap="xs">
        ${this.onRampProvidersTemplate()}
      </wui-flex>
      <w3m-onramp-providers-footer></w3m-onramp-providers-footer>
    `}onRampProvidersTemplate(){return this.providers.filter(e=>e.supportedChains.includes(y.R.state.activeChain??"eip155")).map(e=>r.dy`
          <w3m-onramp-provider-item
            label=${e.label}
            name=${e.name}
            feeRange=${e.feeRange}
            @click=${()=>{this.onClickProvider(e)}}
            ?disabled=${!e.url}
            data-testid=${`onramp-provider-${e.name}`}
          ></w3m-onramp-provider-item>
        `)}onClickProvider(e){n.ph.setSelectedProvider(e),g.P.push("BuyInProgress"),m.j.openHref(n.ph.state.selectedProvider?.url||e.url,"popupWindow","width=600,height=800,scrollbars=yes"),f.X.sendEvent({type:"track",event:"SELECT_BUY_PROVIDER",properties:{provider:e.name,isSmartAccount:(0,b.r9)(y.R.state.activeChain)===v.y_.ACCOUNT_TYPES.SMART_ACCOUNT}})}};I([(0,o.SB)()],j.prototype,"providers",void 0),j=I([(0,p.Mo)("w3m-onramp-providers-view")],j);var O=r.iv`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-flex {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`,B=function(e,t,i,r){var o,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(s<3?o(n):s>3?o(t,i,n):o(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let S=class extends r.oi{constructor(){super(),this.unsubscribe=[],this.selectedCurrency=n.ph.state.purchaseCurrencies,this.tokens=n.ph.state.purchaseCurrencies,this.tokenImages=a.W.state.tokenImages,this.checked=c.M.state.isLegalCheckboxChecked,this.unsubscribe.push(...[n.ph.subscribe(e=>{this.selectedCurrency=e.purchaseCurrencies,this.tokens=e.purchaseCurrencies}),a.W.subscribeKey("tokenImages",e=>this.tokenImages=e),c.M.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e})])}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=l.h.state,i=l.h.state.features?.legalCheckbox,o=!!(e||t)&&!!i&&!this.checked;return r.dy`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${["0","s","s","s"]}
        gap="xs"
        class=${(0,s.o)(o?"disabled":void 0)}
      >
        ${this.currenciesTemplate(o)}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}currenciesTemplate(e=!1){return this.tokens.map(t=>r.dy`
        <wui-list-item
          imageSrc=${(0,s.o)(this.tokenImages?.[t.symbol])}
          @click=${()=>this.selectToken(t)}
          variant="image"
          tabIdx=${(0,s.o)(e?-1:void 0)}
        >
          <wui-flex gap="3xs" alignItems="center">
            <wui-text variant="paragraph-500" color="fg-100">${t.name}</wui-text>
            <wui-text variant="small-400" color="fg-200">${t.symbol}</wui-text>
          </wui-flex>
        </wui-list-item>
      `)}selectToken(e){e&&(n.ph.setPurchaseCurrency(e),u.I.close())}};S.styles=O,B([(0,o.SB)()],S.prototype,"selectedCurrency",void 0),B([(0,o.SB)()],S.prototype,"tokens",void 0),B([(0,o.SB)()],S.prototype,"tokenImages",void 0),B([(0,o.SB)()],S.prototype,"checked",void 0),S=B([(0,p.Mo)("w3m-onramp-token-select-view")],S);var A=i(86321),T=i(36139),W=i(25721);i(24863),i(2065),i(12377);var D=r.iv`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-visual {
    width: var(--wui-wallet-image-size-lg);
    height: var(--wui-wallet-image-size-lg);
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    position: relative;
    overflow: hidden;
  }

  wui-visual::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-border-radius-5xs) * 9 - var(--wui-border-radius-xxs));
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity var(--wui-ease-out-power-2) var(--wui-duration-lg),
      transform var(--wui-ease-out-power-2) var(--wui-duration-lg);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  wui-link {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
  }
`,z=function(e,t,i,r){var o,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(s<3?o(n):s>3?o(t,i,n):o(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let E=class extends r.oi{constructor(){super(),this.unsubscribe=[],this.selectedOnRampProvider=n.ph.state.selectedProvider,this.uri=A.l.state.wcUri,this.ready=!1,this.showRetry=!1,this.buffering=!1,this.error=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(...[n.ph.subscribeKey("selectedProvider",e=>{this.selectedOnRampProvider=e})])}disconnectedCallback(){this.intervalId&&clearInterval(this.intervalId)}render(){let e="Continue in external window";this.error?e="Buy failed":this.selectedOnRampProvider&&(e=`Buy in ${this.selectedOnRampProvider?.label}`);let t=this.error?"Buy can be declined from your side or due to and error on the provider app":`We’ll notify you once your Buy is processed`;return r.dy`
      <wui-flex
        data-error=${(0,s.o)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-visual
            name=${(0,s.o)(this.selectedOnRampProvider?.name)}
            size="lg"
            class="provider-image"
          >
          </wui-visual>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error?"error-100":"fg-100"}>
            ${e}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${t}</wui-text>
        </wui-flex>

        ${this.error?this.tryAgainTemplate():null}
      </wui-flex>

      <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
        <wui-link @click=${this.onCopyUri} color="fg-200">
          <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
          Copy link
        </wui-link>
      </wui-flex>
    `}onTryAgain(){this.selectedOnRampProvider&&(this.error=!1,m.j.openHref(this.selectedOnRampProvider.url,"popupWindow","width=600,height=800,scrollbars=yes"))}tryAgainTemplate(){return this.selectedOnRampProvider?.url?r.dy`<wui-button size="md" variant="accent" @click=${this.onTryAgain.bind(this)}>
      <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
      Try again
    </wui-button>`:null}loaderTemplate(){let e=T.u.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return r.dy`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}onCopyUri(){if(!this.selectedOnRampProvider?.url){W.K.showError("No link found"),g.P.goBack();return}try{m.j.copyToClopboard(this.selectedOnRampProvider.url),W.K.showSuccess("Link copied")}catch{W.K.showError("Failed to copy")}}};E.styles=D,z([(0,o.SB)()],E.prototype,"intervalId",void 0),z([(0,o.SB)()],E.prototype,"selectedOnRampProvider",void 0),z([(0,o.SB)()],E.prototype,"uri",void 0),z([(0,o.SB)()],E.prototype,"ready",void 0),z([(0,o.SB)()],E.prototype,"showRetry",void 0),z([(0,o.SB)()],E.prototype,"buffering",void 0),z([(0,o.SB)()],E.prototype,"error",void 0),z([(0,o.Cb)({type:Boolean})],E.prototype,"isMobile",void 0),z([(0,o.Cb)()],E.prototype,"onRetry",void 0),E=z([(0,p.Mo)("w3m-buy-in-progress-view")],E);let M=class extends r.oi{render(){return r.dy`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","3xl","xl","3xl"]}
        alignItems="center"
        gap="xl"
      >
        <wui-visual name="onrampCard"></wui-visual>
        <wui-flex flexDirection="column" gap="xs" alignItems="center">
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            Quickly and easily buy digital assets!
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            Simply select your preferred onramp provider and add digital assets to your account
            using your credit card or bank transfer
          </wui-text>
        </wui-flex>
        <wui-button @click=${g.P.goBack}>
          <wui-icon size="sm" color="inherit" name="add" slot="iconLeft"></wui-icon>
          Buy
        </wui-button>
      </wui-flex>
    `}};M=function(e,t,i,r){var o,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(s<3?o(n):s>3?o(t,i,n):o(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n}([(0,p.Mo)("w3m-what-is-a-buy-view")],M),i(98405);var L=r.iv`
  :host {
    width: 100%;
  }

  wui-loading-spinner {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }

  .currency-container {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: var(--wui-spacing-1xs);
    height: 40px;
    padding: var(--wui-spacing-xs) var(--wui-spacing-1xs) var(--wui-spacing-xs)
      var(--wui-spacing-xs);
    min-width: 95px;
    border-radius: var(--FULL, 1000px);
    border: 1px solid var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    cursor: pointer;
  }

  .currency-container > wui-image {
    height: 24px;
    width: 24px;
    border-radius: 50%;
  }
`,_=function(e,t,i,r){var o,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(s<3?o(n):s>3?o(t,i,n):o(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let U=class extends r.oi{constructor(){super(),this.unsubscribe=[],this.type="Token",this.value=0,this.currencies=[],this.selectedCurrency=this.currencies?.[0],this.currencyImages=a.W.state.currencyImages,this.tokenImages=a.W.state.tokenImages,this.unsubscribe.push(n.ph.subscribeKey("purchaseCurrency",e=>{e&&"Fiat"!==this.type&&(this.selectedCurrency=this.formatPurchaseCurrency(e))}),n.ph.subscribeKey("paymentCurrency",e=>{e&&"Token"!==this.type&&(this.selectedCurrency=this.formatPaymentCurrency(e))}),n.ph.subscribe(e=>{"Fiat"===this.type?this.currencies=e.purchaseCurrencies.map(this.formatPurchaseCurrency):this.currencies=e.paymentCurrencies.map(this.formatPaymentCurrency)}),a.W.subscribe(e=>{this.currencyImages={...e.currencyImages},this.tokenImages={...e.tokenImages}}))}firstUpdated(){n.ph.getAvailableCurrencies()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.selectedCurrency?.symbol||"",t=this.currencyImages[e]||this.tokenImages[e];return r.dy`<wui-input-text type="number" size="lg" value=${this.value}>
      ${this.selectedCurrency?r.dy` <wui-flex
            class="currency-container"
            justifyContent="space-between"
            alignItems="center"
            gap="xxs"
            @click=${()=>u.I.open({view:`OnRamp${this.type}Select`})}
          >
            <wui-image src=${(0,s.o)(t)}></wui-image>
            <wui-text color="fg-100">${this.selectedCurrency.symbol}</wui-text>
          </wui-flex>`:r.dy`<wui-loading-spinner></wui-loading-spinner>`}
    </wui-input-text>`}formatPaymentCurrency(e){return{name:e.id,symbol:e.id}}formatPurchaseCurrency(e){return{name:e.name,symbol:e.symbol}}};U.styles=L,_([(0,o.Cb)({type:String})],U.prototype,"type",void 0),_([(0,o.Cb)({type:Number})],U.prototype,"value",void 0),_([(0,o.SB)()],U.prototype,"currencies",void 0),_([(0,o.SB)()],U.prototype,"selectedCurrency",void 0),_([(0,o.SB)()],U.prototype,"currencyImages",void 0),_([(0,o.SB)()],U.prototype,"tokenImages",void 0),U=_([(0,p.Mo)("w3m-onramp-input")],U);var K=r.iv`
  :host > wui-flex {
    width: 100%;
    max-width: 360px;
  }

  :host > wui-flex > wui-flex {
    border-radius: var(--wui-border-radius-l);
    width: 100%;
  }

  .amounts-container {
    width: 100%;
  }
`,F=function(e,t,i,r){var o,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(s<3?o(n):s>3?o(t,i,n):o(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let N={USD:"$",EUR:"€",GBP:"\xa3"},q=[100,250,500,1e3],V=class extends r.oi{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.caipAddress=y.R.state.activeCaipAddress,this.loading=u.I.state.loading,this.paymentCurrency=n.ph.state.paymentCurrency,this.paymentAmount=n.ph.state.paymentAmount,this.purchaseAmount=n.ph.state.purchaseAmount,this.quoteLoading=n.ph.state.quotesLoading,this.unsubscribe.push(...[y.R.subscribeKey("activeCaipAddress",e=>this.caipAddress=e),u.I.subscribeKey("loading",e=>{this.loading=e}),n.ph.subscribe(e=>{this.paymentCurrency=e.paymentCurrency,this.paymentAmount=e.paymentAmount,this.purchaseAmount=e.purchaseAmount,this.quoteLoading=e.quotesLoading})])}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return r.dy`
      <wui-flex flexDirection="column" justifyContent="center" alignItems="center">
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <w3m-onramp-input
            type="Fiat"
            @inputChange=${this.onPaymentAmountChange.bind(this)}
            .value=${this.paymentAmount||0}
          ></w3m-onramp-input>
          <w3m-onramp-input
            type="Token"
            .value=${this.purchaseAmount||0}
            .loading=${this.quoteLoading}
          ></w3m-onramp-input>
          <wui-flex justifyContent="space-evenly" class="amounts-container" gap="xs">
            ${q.map(e=>r.dy`<wui-button
                  variant=${this.paymentAmount===e?"accent":"neutral"}
                  size="md"
                  textVariant="paragraph-600"
                  fullWidth
                  @click=${()=>this.selectPresetAmount(e)}
                  >${`${N[this.paymentCurrency?.id||"USD"]} ${e}`}</wui-button
                >`)}
          </wui-flex>
          ${this.templateButton()}
        </wui-flex>
      </wui-flex>
    `}templateButton(){return this.caipAddress?r.dy`<wui-button
          @click=${this.getQuotes.bind(this)}
          variant="main"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Get quotes
        </wui-button>`:r.dy`<wui-button
          @click=${this.openModal.bind(this)}
          variant="accent"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Connect wallet
        </wui-button>`}getQuotes(){this.loading||u.I.open({view:"OnRampProviders"})}openModal(){u.I.open({view:"Connect"})}async onPaymentAmountChange(e){n.ph.setPaymentAmount(Number(e.detail)),await n.ph.getQuote()}async selectPresetAmount(e){n.ph.setPaymentAmount(e),await n.ph.getQuote()}};V.styles=K,F([(0,o.Cb)({type:Boolean})],V.prototype,"disabled",void 0),F([(0,o.SB)()],V.prototype,"caipAddress",void 0),F([(0,o.SB)()],V.prototype,"loading",void 0),F([(0,o.SB)()],V.prototype,"paymentCurrency",void 0),F([(0,o.SB)()],V.prototype,"paymentAmount",void 0),F([(0,o.SB)()],V.prototype,"purchaseAmount",void 0),F([(0,o.SB)()],V.prototype,"quoteLoading",void 0),V=F([(0,p.Mo)("w3m-onramp-widget")],V)},52235:function(e,t,i){i(50992)},50992:function(e,t,i){var r=i(44920),o=i(30077),s=i(17770),n=i(66501),a=r.iv`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  :host([data-object-fit='cover']) img {
    object-fit: cover;
    object-position: center center;
  }

  :host([data-object-fit='contain']) img {
    object-fit: contain;
    object-position: center center;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
`,c=function(e,t,i,r){var o,s=arguments.length,n=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(s<3?o(n):s>3?o(t,i,n):o(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};let l=class extends r.oi{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0,this.objectFit="cover"}render(){return this.objectFit&&(this.dataset.objectFit=this.objectFit),this.style.cssText=`
      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      `,r.dy`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};l.styles=[s.ET,s.Bp,a],c([(0,o.Cb)()],l.prototype,"src",void 0),c([(0,o.Cb)()],l.prototype,"alt",void 0),c([(0,o.Cb)()],l.prototype,"size",void 0),c([(0,o.Cb)()],l.prototype,"objectFit",void 0),l=c([(0,n.M)("wui-image")],l)}}]);