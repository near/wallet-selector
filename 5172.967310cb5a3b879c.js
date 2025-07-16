"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[5172],{55172:(J,V,a)=>{a.r(V),a.d(V,{W3mBuyInProgressView:()=>C,W3mOnRampActivityView:()=>B,W3mOnRampProvidersView:()=>X,W3mOnrampFiatSelectView:()=>k,W3mOnrampTokensView:()=>j,W3mOnrampWidget:()=>I,W3mWhatIsABuyView:()=>ie});var p=a(49671),n=a(59799),l=a(86523),g=a(23107),G=a(88145),d=a(55338),T=a(70325),y=a(80152),b=a(22917),x=a(66301),v=a(50860),O=(a(937),a(54575),a(74690),a(87563));a(6500),a(15465),a(30189);const L=n.iv`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    width: 100%;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xs);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--wui-spacing-s);
  }

  :host > wui-flex:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  .purchase-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: var(--wui-icon-box-size-lg);
    height: var(--wui-icon-box-size-lg);
  }

  .purchase-image-container wui-image {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: calc(var(--wui-icon-box-size-lg) / 2);
  }

  .purchase-image-container wui-image::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    border-radius: calc(var(--wui-icon-box-size-lg) / 2);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  .purchase-image-container wui-icon-box {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(20%, 20%);
  }
`;var h=function(c,e,i,o){var s,r=arguments.length,t=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(c,e,i,o);else for(var u=c.length-1;u>=0;u--)(s=c[u])&&(t=(r<3?s(t):r>3?s(e,i,t):s(e,i))||t);return r>3&&t&&Object.defineProperty(e,i,t),t};let w=class extends n.oi{constructor(){super(...arguments),this.disabled=!1,this.color="inherit",this.label="Bought",this.purchaseValue="",this.purchaseCurrency="",this.date="",this.completed=!1,this.inProgress=!1,this.failed=!1,this.onClick=null,this.symbol=""}firstUpdated(){this.icon||this.fetchTokenImage()}render(){return n.dy`
      <wui-flex>
        ${this.imageTemplate()}
        <wui-flex flexDirection="column" gap="4xs" flexGrow="1">
          <wui-flex gap="xxs" alignItems="center" justifyContent="flex-start">
            ${this.statusIconTemplate()}
            <wui-text variant="paragraph-500" color="fg-100"> ${this.label}</wui-text>
          </wui-flex>
          <wui-text variant="small-400" color="fg-200">
            + ${this.purchaseValue} ${this.purchaseCurrency}
          </wui-text>
        </wui-flex>
        ${this.inProgress?n.dy`<wui-loading-spinner color="fg-200" size="md"></wui-loading-spinner>`:n.dy`<wui-text variant="micro-700" color="fg-300"><span>${this.date}</span></wui-text>`}
      </wui-flex>
    `}fetchTokenImage(){var e=this;return(0,p.Z)(function*(){yield O.ApiController._fetchTokenImage(e.purchaseCurrency)})()}statusIconTemplate(){return this.inProgress?null:this.completed?this.boughtIconTemplate():this.errorIconTemplate()}errorIconTemplate(){return n.dy`<wui-icon-box
      size="xxs"
      iconColor="error-100"
      backgroundColor="error-100"
      background="opaque"
      icon="close"
      borderColor="wui-color-bg-125"
    ></wui-icon-box>`}imageTemplate(){const e=this.icon||`https://avatar.vercel.sh/andrew.svg?size=50&text=${this.symbol}`;return n.dy`<wui-flex class="purchase-image-container">
      <wui-image src=${e}></wui-image>
    </wui-flex>`}boughtIconTemplate(){return n.dy`<wui-icon-box
      size="xxs"
      iconColor="success-100"
      backgroundColor="success-100"
      background="opaque"
      icon="arrowBottom"
      borderColor="wui-color-bg-125"
    ></wui-icon-box>`}};w.styles=[L],h([(0,l.Cb)({type:Boolean})],w.prototype,"disabled",void 0),h([(0,l.Cb)()],w.prototype,"color",void 0),h([(0,l.Cb)()],w.prototype,"label",void 0),h([(0,l.Cb)()],w.prototype,"purchaseValue",void 0),h([(0,l.Cb)()],w.prototype,"purchaseCurrency",void 0),h([(0,l.Cb)()],w.prototype,"date",void 0),h([(0,l.Cb)({type:Boolean})],w.prototype,"completed",void 0),h([(0,l.Cb)({type:Boolean})],w.prototype,"inProgress",void 0),h([(0,l.Cb)({type:Boolean})],w.prototype,"failed",void 0),h([(0,l.Cb)()],w.prototype,"onClick",void 0),h([(0,l.Cb)()],w.prototype,"symbol",void 0),h([(0,l.Cb)()],w.prototype,"icon",void 0),w=h([(0,v.Mo)("w3m-onramp-activity-item")],w);const K=n.iv`
  :host > wui-flex {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    padding: var(--wui-spacing-m);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }

  :host > wui-flex > wui-flex {
    width: 100%;
  }

  wui-transaction-list-item-loader {
    width: 100%;
  }
`;var Y=function(c,e,i,o){var s,r=arguments.length,t=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(c,e,i,o);else for(var u=c.length-1;u>=0;u--)(s=c[u])&&(t=(r<3?s(t):r>3?s(e,i,t):s(e,i))||t);return r>3&&t&&Object.defineProperty(e,i,t),t};let B=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.selectedOnRampProvider=d.ph.state.selectedProvider,this.loading=!1,this.coinbaseTransactions=T.s.state.coinbaseTransactions,this.tokenImages=y.W.state.tokenImages,this.unsubscribe.push(d.ph.subscribeKey("selectedProvider",e=>{this.selectedOnRampProvider=e}),y.W.subscribeKey("tokenImages",e=>this.tokenImages=e),()=>{clearTimeout(this.refetchTimeout)},T.s.subscribe(e=>{this.coinbaseTransactions={...e.coinbaseTransactions}})),T.s.clearCursor(),this.fetchTransactions()}render(){return n.dy`
      <wui-flex flexDirection="column" .padding=${["0","s","s","s"]} gap="xs">
        ${this.loading?this.templateLoading():this.templateTransactionsByYear()}
      </wui-flex>
    `}templateTransactions(e){return e?.map(i=>{const o=G.E.formatDate(i?.metadata?.minedAt),r=i.transfers[0],t=r?.fungible_info;if(!t)return null;const s=t?.icon?.url||this.tokenImages?.[t.symbol||""];return n.dy`
        <w3m-onramp-activity-item
          label="Bought"
          .completed=${"ONRAMP_TRANSACTION_STATUS_SUCCESS"===i.metadata.status}
          .inProgress=${"ONRAMP_TRANSACTION_STATUS_IN_PROGRESS"===i.metadata.status}
          .failed=${"ONRAMP_TRANSACTION_STATUS_FAILED"===i.metadata.status}
          purchaseCurrency=${(0,g.o)(t.symbol)}
          purchaseValue=${r.quantity.numeric}
          date=${o}
          icon=${(0,g.o)(s)}
          symbol=${(0,g.o)(t.symbol)}
        ></w3m-onramp-activity-item>
      `})}templateTransactionsByYear(){return Object.keys(this.coinbaseTransactions).sort().reverse().map(i=>{const o=parseInt(i,10);return new Array(12).fill(null).map((t,s)=>s).reverse().map(t=>{const s=v.AI.getTransactionGroupTitle(o,t),u=this.coinbaseTransactions[o]?.[t];return u?n.dy`
          <wui-flex flexDirection="column">
            <wui-flex
              alignItems="center"
              flexDirection="row"
              .padding=${["xs","s","s","s"]}
            >
              <wui-text variant="paragraph-500" color="fg-200">${s}</wui-text>
            </wui-flex>
            <wui-flex flexDirection="column" gap="xs">
              ${this.templateTransactions(u)}
            </wui-flex>
          </wui-flex>
        `:null})})}fetchTransactions(){var e=this;return(0,p.Z)(function*(){yield e.fetchCoinbaseTransactions()})()}fetchCoinbaseTransactions(){var e=this;return(0,p.Z)(function*(){const i=b.AccountController.state.address,o=x.OptionsController.state.projectId;if(!i)throw new Error("No address found");if(!o)throw new Error("No projectId found");e.loading=!0,yield T.s.fetchTransactions(i,"coinbase"),e.loading=!1,e.refetchLoadingTransactions()})()}refetchLoadingTransactions(){var e=this;const i=new Date;0!==(this.coinbaseTransactions[i.getFullYear()]?.[i.getMonth()]||[]).filter(t=>"ONRAMP_TRANSACTION_STATUS_IN_PROGRESS"===t.metadata.status).length?this.refetchTimeout=setTimeout((0,p.Z)(function*(){const t=b.AccountController.state.address;yield T.s.fetchTransactions(t,"coinbase"),e.refetchLoadingTransactions()}),3e3):clearTimeout(this.refetchTimeout)}templateLoading(){return Array(7).fill(n.dy` <wui-transaction-list-item-loader></wui-transaction-list-item-loader> `).map(e=>e)}};B.styles=K,Y([(0,l.SB)()],B.prototype,"selectedOnRampProvider",void 0),Y([(0,l.SB)()],B.prototype,"loading",void 0),Y([(0,l.SB)()],B.prototype,"coinbaseTransactions",void 0),Y([(0,l.SB)()],B.prototype,"tokenImages",void 0),B=Y([(0,v.Mo)("w3m-onramp-activity-view")],B);var H=a(96977),E=a(57745);a(72111),a(45231),a(81616);const le=n.iv`
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
`;var F=function(c,e,i,o){var s,r=arguments.length,t=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(c,e,i,o);else for(var u=c.length-1;u>=0;u--)(s=c[u])&&(t=(r<3?s(t):r>3?s(e,i,t):s(e,i))||t);return r>3&&t&&Object.defineProperty(e,i,t),t};let k=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.selectedCurrency=d.ph.state.paymentCurrency,this.currencies=d.ph.state.paymentCurrencies,this.currencyImages=y.W.state.currencyImages,this.checked=H.M.state.isLegalCheckboxChecked,this.unsubscribe.push(d.ph.subscribe(e=>{this.selectedCurrency=e.paymentCurrency,this.currencies=e.paymentCurrencies}),y.W.subscribeKey("currencyImages",e=>this.currencyImages=e),H.M.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{termsConditionsUrl:e,privacyPolicyUrl:i}=x.OptionsController.state,o=x.OptionsController.state.features?.legalCheckbox,s=!(!e&&!i||!o||this.checked);return n.dy`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${["0","s","s","s"]}
        gap="xs"
        class=${(0,g.o)(s?"disabled":void 0)}
      >
        ${this.currenciesTemplate(s)}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}currenciesTemplate(e=!1){return this.currencies.map(i=>n.dy`
        <wui-list-item
          imageSrc=${(0,g.o)(this.currencyImages?.[i.id])}
          @click=${()=>this.selectCurrency(i)}
          variant="image"
          tabIdx=${(0,g.o)(e?-1:void 0)}
        >
          <wui-text variant="paragraph-500" color="fg-100">${i.id}</wui-text>
        </wui-list-item>
      `)}selectCurrency(e){e&&(d.ph.setPaymentCurrency(e),E.I.close())}};k.styles=le,F([(0,l.SB)()],k.prototype,"selectedCurrency",void 0),F([(0,l.SB)()],k.prototype,"currencies",void 0),F([(0,l.SB)()],k.prototype,"currencyImages",void 0),F([(0,l.SB)()],k.prototype,"checked",void 0),k=F([(0,v.Mo)("w3m-onramp-fiat-select-view")],k);var M=a(20597),Z=a(24380),q=a(18445),oe=a(79282),ee=a(36882),re=a(21838),ne=a(64599),ce=a(17111);a(51078),a(23753);const ue=n.iv`
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
`;var W=function(c,e,i,o){var s,r=arguments.length,t=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(c,e,i,o);else for(var u=c.length-1;u>=0;u--)(s=c[u])&&(t=(r<3?s(t):r>3?s(e,i,t):s(e,i))||t);return r>3&&t&&Object.defineProperty(e,i,t),t};let A=class extends n.oi{constructor(){super(...arguments),this.disabled=!1,this.color="inherit",this.label="",this.feeRange="",this.loading=!1,this.onClick=null}render(){return n.dy`
      <button ?disabled=${this.disabled} @click=${this.onClick} ontouchstart>
        <wui-visual name=${(0,g.o)(this.name)} class="provider-image"></wui-visual>
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
        ${this.loading?n.dy`<wui-loading-spinner color="fg-200" size="md"></wui-loading-spinner>`:n.dy`<wui-icon name="chevronRight" color="fg-200" size="sm"></wui-icon>`}
      </button>
    `}networksTemplate(){const i=M.R.getAllRequestedCaipNetworks()?.filter(o=>o?.assets?.imageId)?.slice(0,5);return n.dy`
      <wui-flex class="networks">
        ${i?.map(o=>n.dy`
            <wui-flex class="network-icon">
              <wui-image src=${(0,g.o)(ce.f.getNetworkImage(o))}></wui-image>
            </wui-flex>
          `)}
      </wui-flex>
    `}};A.styles=[ue],W([(0,l.Cb)({type:Boolean})],A.prototype,"disabled",void 0),W([(0,l.Cb)()],A.prototype,"color",void 0),W([(0,l.Cb)()],A.prototype,"name",void 0),W([(0,l.Cb)()],A.prototype,"label",void 0),W([(0,l.Cb)()],A.prototype,"feeRange",void 0),W([(0,l.Cb)({type:Boolean})],A.prototype,"loading",void 0),W([(0,l.Cb)()],A.prototype,"onClick",void 0),A=W([(0,v.Mo)("w3m-onramp-provider-item")],A);a(88198);const de=n.iv`
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
`;let te=class extends n.oi{render(){const{termsConditionsUrl:e,privacyPolicyUrl:i}=x.OptionsController.state;return e||i?n.dy`
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
    `:null}howDoesItWorkTemplate(){return n.dy` <wui-link @click=${this.onWhatIsBuy.bind(this)}>
      <wui-icon size="xs" color="accent-100" slot="iconLeft" name="helpCircle"></wui-icon>
      How does it work?
    </wui-link>`}onWhatIsBuy(){const e=M.R.state.activeChain;oe.X.sendEvent({type:"track",event:"SELECT_WHAT_IS_A_BUY",properties:{isSmartAccount:b.AccountController.state.preferredAccountTypes?.[e]===ne.y_.ACCOUNT_TYPES.SMART_ACCOUNT}}),Z.RouterController.push("WhatIsABuy")}};te.styles=[de],te=function(c,e,i,o){var s,r=arguments.length,t=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(c,e,i,o);else for(var u=c.length-1;u>=0;u--)(s=c[u])&&(t=(r<3?s(t):r>3?s(e,i,t):s(e,i))||t);return r>3&&t&&Object.defineProperty(e,i,t),t}([(0,v.Mo)("w3m-onramp-providers-footer")],te);var se=function(c,e,i,o){var s,r=arguments.length,t=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(c,e,i,o);else for(var u=c.length-1;u>=0;u--)(s=c[u])&&(t=(r<3?s(t):r>3?s(e,i,t):s(e,i))||t);return r>3&&t&&Object.defineProperty(e,i,t),t};let X=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.providers=d.ph.state.providers,this.unsubscribe.push(d.ph.subscribeKey("providers",e=>{this.providers=e}))}firstUpdated(){var e=this;const i=this.providers.map(function(){var o=(0,p.Z)(function*(r){return"coinbase"===r.name?yield e.getCoinbaseOnRampURL():Promise.resolve(r?.url)});return function(r){return o.apply(this,arguments)}}());Promise.all(i).then(o=>{this.providers=this.providers.map((r,t)=>({...r,url:o[t]||""}))})}render(){return n.dy`
      <wui-flex flexDirection="column" .padding=${["0","s","s","s"]} gap="xs">
        ${this.onRampProvidersTemplate()}
      </wui-flex>
      <w3m-onramp-providers-footer></w3m-onramp-providers-footer>
    `}onRampProvidersTemplate(){return this.providers.filter(e=>e.supportedChains.includes(M.R.state.activeChain??"eip155")).map(e=>n.dy`
          <w3m-onramp-provider-item
            label=${e.label}
            name=${e.name}
            feeRange=${e.feeRange}
            @click=${()=>{this.onClickProvider(e)}}
            ?disabled=${!e.url}
            data-testid=${`onramp-provider-${e.name}`}
          ></w3m-onramp-provider-item>
        `)}onClickProvider(e){const i=M.R.state.activeChain;d.ph.setSelectedProvider(e),Z.RouterController.push("BuyInProgress"),q.j.openHref(e.url,"popupWindow","width=600,height=800,scrollbars=yes"),oe.X.sendEvent({type:"track",event:"SELECT_BUY_PROVIDER",properties:{provider:e.name,isSmartAccount:b.AccountController.state.preferredAccountTypes?.[i]===ne.y_.ACCOUNT_TYPES.SMART_ACCOUNT}})}getCoinbaseOnRampURL(){return(0,p.Z)(function*(){const e=b.AccountController.state.address,i=M.R.state.activeCaipNetwork;if(!e)throw new Error("No address found");if(!i?.name)throw new Error("No network found");const o=ee.bq.WC_COINBASE_PAY_SDK_CHAIN_NAME_MAP[i.name]??ee.bq.WC_COINBASE_PAY_SDK_FALLBACK_CHAIN,r=d.ph.state.purchaseCurrency,t=r?[r.symbol]:d.ph.state.purchaseCurrencies.map(s=>s.symbol);return yield re.L.generateOnRampURL({defaultNetwork:o,destinationWallets:[{address:e,blockchains:ee.bq.WC_COINBASE_PAY_SDK_CHAINS,assets:t}],partnerUserId:e,purchaseAmount:d.ph.state.purchaseAmount})})()}};se([(0,l.SB)()],X.prototype,"providers",void 0),X=se([(0,v.Mo)("w3m-onramp-providers-view")],X);const he=n.iv`
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
`;var _=function(c,e,i,o){var s,r=arguments.length,t=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(c,e,i,o);else for(var u=c.length-1;u>=0;u--)(s=c[u])&&(t=(r<3?s(t):r>3?s(e,i,t):s(e,i))||t);return r>3&&t&&Object.defineProperty(e,i,t),t};let j=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.selectedCurrency=d.ph.state.purchaseCurrencies,this.tokens=d.ph.state.purchaseCurrencies,this.tokenImages=y.W.state.tokenImages,this.checked=H.M.state.isLegalCheckboxChecked,this.unsubscribe.push(d.ph.subscribe(e=>{this.selectedCurrency=e.purchaseCurrencies,this.tokens=e.purchaseCurrencies}),y.W.subscribeKey("tokenImages",e=>this.tokenImages=e),H.M.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{termsConditionsUrl:e,privacyPolicyUrl:i}=x.OptionsController.state,o=x.OptionsController.state.features?.legalCheckbox,s=!(!e&&!i||!o||this.checked);return n.dy`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${["0","s","s","s"]}
        gap="xs"
        class=${(0,g.o)(s?"disabled":void 0)}
      >
        ${this.currenciesTemplate(s)}
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}currenciesTemplate(e=!1){return this.tokens.map(i=>n.dy`
        <wui-list-item
          imageSrc=${(0,g.o)(this.tokenImages?.[i.symbol])}
          @click=${()=>this.selectToken(i)}
          variant="image"
          tabIdx=${(0,g.o)(e?-1:void 0)}
        >
          <wui-flex gap="3xs" alignItems="center">
            <wui-text variant="paragraph-500" color="fg-100">${i.name}</wui-text>
            <wui-text variant="small-400" color="fg-200">${i.symbol}</wui-text>
          </wui-flex>
        </wui-list-item>
      `)}selectToken(e){e&&(d.ph.setPurchaseCurrency(e),E.I.close())}};j.styles=he,_([(0,l.SB)()],j.prototype,"selectedCurrency",void 0),_([(0,l.SB)()],j.prototype,"tokens",void 0),_([(0,l.SB)()],j.prototype,"tokenImages",void 0),_([(0,l.SB)()],j.prototype,"checked",void 0),j=_([(0,v.Mo)("w3m-onramp-token-select-view")],j);var me=a(10053),Q=a(76169),we=a(56364);a(99409),a(44411);const fe=n.iv`
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
`;var R=function(c,e,i,o){var s,r=arguments.length,t=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(c,e,i,o);else for(var u=c.length-1;u>=0;u--)(s=c[u])&&(t=(r<3?s(t):r>3?s(e,i,t):s(e,i))||t);return r>3&&t&&Object.defineProperty(e,i,t),t};let C=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.selectedOnRampProvider=d.ph.state.selectedProvider,this.uri=me.ConnectionController.state.wcUri,this.ready=!1,this.showRetry=!1,this.buffering=!1,this.error=!1,this.startTime=null,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(d.ph.subscribeKey("selectedProvider",e=>{this.selectedOnRampProvider=e})),this.watchTransactions()}disconnectedCallback(){this.intervalId&&clearInterval(this.intervalId)}render(){let e="Continue in external window";this.error?e="Buy failed":this.selectedOnRampProvider&&(e=`Buy in ${this.selectedOnRampProvider?.label}`);const i=this.error?"Buy can be declined from your side or due to and error on the provider app":"We\u2019ll notify you once your Buy is processed";return n.dy`
      <wui-flex
        data-error=${(0,g.o)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-visual
            name=${(0,g.o)(this.selectedOnRampProvider?.name)}
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
          <wui-text align="center" variant="small-500" color="fg-200">${i}</wui-text>
        </wui-flex>

        ${this.error?this.tryAgainTemplate():null}
      </wui-flex>

      <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
        <wui-link @click=${this.onCopyUri} color="fg-200">
          <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
          Copy link
        </wui-link>
      </wui-flex>
    `}watchTransactions(){if(this.selectedOnRampProvider&&"coinbase"===this.selectedOnRampProvider.name)this.startTime=Date.now(),this.initializeCoinbaseTransactions()}initializeCoinbaseTransactions(){var e=this;return(0,p.Z)(function*(){yield e.watchCoinbaseTransactions(),e.intervalId=setInterval(()=>e.watchCoinbaseTransactions(),4e3)})()}watchCoinbaseTransactions(){var e=this;return(0,p.Z)(function*(){try{const i=b.AccountController.state.address;if(!i)throw new Error("No address found");(yield re.L.fetchTransactions({account:i,onramp:"coinbase"})).data.filter(t=>new Date(t.metadata.minedAt)>new Date(e.startTime)||"ONRAMP_TRANSACTION_STATUS_IN_PROGRESS"===t.metadata.status).length?(clearInterval(e.intervalId),Z.RouterController.replace("OnRampActivity")):e.startTime&&Date.now()-e.startTime>=18e4&&(clearInterval(e.intervalId),e.error=!0)}catch(i){Q.SnackController.showError(i)}})()}onTryAgain(){this.selectedOnRampProvider&&(this.error=!1,q.j.openHref(this.selectedOnRampProvider.url,"popupWindow","width=600,height=800,scrollbars=yes"))}tryAgainTemplate(){return this.selectedOnRampProvider?.url?n.dy`<wui-button size="md" variant="accent" @click=${this.onTryAgain.bind(this)}>
      <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
      Try again
    </wui-button>`:null}loaderTemplate(){const e=we.ThemeController.state.themeVariables["--w3m-border-radius-master"],i=e?parseInt(e.replace("px",""),10):4;return n.dy`<wui-loading-thumbnail radius=${9*i}></wui-loading-thumbnail>`}onCopyUri(){if(!this.selectedOnRampProvider?.url)return Q.SnackController.showError("No link found"),void Z.RouterController.goBack();try{q.j.copyToClopboard(this.selectedOnRampProvider.url),Q.SnackController.showSuccess("Link copied")}catch{Q.SnackController.showError("Failed to copy")}}};C.styles=fe,R([(0,l.SB)()],C.prototype,"intervalId",void 0),R([(0,l.SB)()],C.prototype,"selectedOnRampProvider",void 0),R([(0,l.SB)()],C.prototype,"uri",void 0),R([(0,l.SB)()],C.prototype,"ready",void 0),R([(0,l.SB)()],C.prototype,"showRetry",void 0),R([(0,l.SB)()],C.prototype,"buffering",void 0),R([(0,l.SB)()],C.prototype,"error",void 0),R([(0,l.SB)()],C.prototype,"startTime",void 0),R([(0,l.Cb)({type:Boolean})],C.prototype,"isMobile",void 0),R([(0,l.Cb)()],C.prototype,"onRetry",void 0),C=R([(0,v.Mo)("w3m-buy-in-progress-view")],C);let ie=class extends n.oi{render(){return n.dy`
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
        <wui-button @click=${Z.RouterController.goBack}>
          <wui-icon size="sm" color="inherit" name="add" slot="iconLeft"></wui-icon>
          Buy
        </wui-button>
      </wui-flex>
    `}};ie=function(c,e,i,o){var s,r=arguments.length,t=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(c,e,i,o);else for(var u=c.length-1;u>=0;u--)(s=c[u])&&(t=(r<3?s(t):r>3?s(e,i,t):s(e,i))||t);return r>3&&t&&Object.defineProperty(e,i,t),t}([(0,v.Mo)("w3m-what-is-a-buy-view")],ie);a(44448);const ge=n.iv`
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
`;var z=function(c,e,i,o){var s,r=arguments.length,t=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(c,e,i,o);else for(var u=c.length-1;u>=0;u--)(s=c[u])&&(t=(r<3?s(t):r>3?s(e,i,t):s(e,i))||t);return r>3&&t&&Object.defineProperty(e,i,t),t};let S=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.type="Token",this.value=0,this.currencies=[],this.selectedCurrency=this.currencies?.[0],this.currencyImages=y.W.state.currencyImages,this.tokenImages=y.W.state.tokenImages,this.unsubscribe.push(d.ph.subscribeKey("purchaseCurrency",e=>{!e||"Fiat"===this.type||(this.selectedCurrency=this.formatPurchaseCurrency(e))}),d.ph.subscribeKey("paymentCurrency",e=>{!e||"Token"===this.type||(this.selectedCurrency=this.formatPaymentCurrency(e))}),d.ph.subscribe(e=>{"Fiat"===this.type?this.currencies=e.purchaseCurrencies.map(this.formatPurchaseCurrency):this.currencies=e.paymentCurrencies.map(this.formatPaymentCurrency)}),y.W.subscribe(e=>{this.currencyImages={...e.currencyImages},this.tokenImages={...e.tokenImages}}))}firstUpdated(){d.ph.getAvailableCurrencies()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.selectedCurrency?.symbol||"",i=this.currencyImages[e]||this.tokenImages[e];return n.dy`<wui-input-text type="number" size="lg" value=${this.value}>
      ${this.selectedCurrency?n.dy` <wui-flex
            class="currency-container"
            justifyContent="space-between"
            alignItems="center"
            gap="xxs"
            @click=${()=>E.I.open({view:`OnRamp${this.type}Select`})}
          >
            <wui-image src=${(0,g.o)(i)}></wui-image>
            <wui-text color="fg-100">${this.selectedCurrency.symbol}</wui-text>
          </wui-flex>`:n.dy`<wui-loading-spinner></wui-loading-spinner>`}
    </wui-input-text>`}formatPaymentCurrency(e){return{name:e.id,symbol:e.id}}formatPurchaseCurrency(e){return{name:e.name,symbol:e.symbol}}};S.styles=ge,z([(0,l.Cb)({type:String})],S.prototype,"type",void 0),z([(0,l.Cb)({type:Number})],S.prototype,"value",void 0),z([(0,l.SB)()],S.prototype,"currencies",void 0),z([(0,l.SB)()],S.prototype,"selectedCurrency",void 0),z([(0,l.SB)()],S.prototype,"currencyImages",void 0),z([(0,l.SB)()],S.prototype,"tokenImages",void 0),S=z([(0,v.Mo)("w3m-onramp-input")],S);const be=n.iv`
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
`;var N=function(c,e,i,o){var s,r=arguments.length,t=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(c,e,i,o);else for(var u=c.length-1;u>=0;u--)(s=c[u])&&(t=(r<3?s(t):r>3?s(e,i,t):s(e,i))||t);return r>3&&t&&Object.defineProperty(e,i,t),t};const ye={USD:"$",EUR:"\u20ac",GBP:"\xa3"},xe=[100,250,500,1e3];let I=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.caipAddress=M.R.state.activeCaipAddress,this.loading=E.I.state.loading,this.paymentCurrency=d.ph.state.paymentCurrency,this.paymentAmount=d.ph.state.paymentAmount,this.purchaseAmount=d.ph.state.purchaseAmount,this.quoteLoading=d.ph.state.quotesLoading,this.unsubscribe.push(M.R.subscribeKey("activeCaipAddress",e=>this.caipAddress=e),E.I.subscribeKey("loading",e=>{this.loading=e}),d.ph.subscribe(e=>{this.paymentCurrency=e.paymentCurrency,this.paymentAmount=e.paymentAmount,this.purchaseAmount=e.purchaseAmount,this.quoteLoading=e.quotesLoading}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return n.dy`
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
            ${xe.map(e=>n.dy`<wui-button
                  variant=${this.paymentAmount===e?"accent":"neutral"}
                  size="md"
                  textVariant="paragraph-600"
                  fullWidth
                  @click=${()=>this.selectPresetAmount(e)}
                  >${`${ye[this.paymentCurrency?.id||"USD"]} ${e}`}</wui-button
                >`)}
          </wui-flex>
          ${this.templateButton()}
        </wui-flex>
      </wui-flex>
    `}templateButton(){return this.caipAddress?n.dy`<wui-button
          @click=${this.getQuotes.bind(this)}
          variant="main"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Get quotes
        </wui-button>`:n.dy`<wui-button
          @click=${this.openModal.bind(this)}
          variant="accent"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Connect wallet
        </wui-button>`}getQuotes(){this.loading||E.I.open({view:"OnRampProviders"})}openModal(){E.I.open({view:"Connect"})}onPaymentAmountChange(e){return(0,p.Z)(function*(){d.ph.setPaymentAmount(Number(e.detail)),yield d.ph.getQuote()})()}selectPresetAmount(e){return(0,p.Z)(function*(){d.ph.setPaymentAmount(e),yield d.ph.getQuote()})()}};I.styles=be,N([(0,l.Cb)({type:Boolean})],I.prototype,"disabled",void 0),N([(0,l.SB)()],I.prototype,"caipAddress",void 0),N([(0,l.SB)()],I.prototype,"loading",void 0),N([(0,l.SB)()],I.prototype,"paymentCurrency",void 0),N([(0,l.SB)()],I.prototype,"paymentAmount",void 0),N([(0,l.SB)()],I.prototype,"purchaseAmount",void 0),N([(0,l.SB)()],I.prototype,"quoteLoading",void 0),I=N([(0,v.Mo)("w3m-onramp-widget")],I)},72111:(J,V,a)=>{var p=a(59799),n=a(86523),l=a(23107),b=(a(72686),a(11252),a(78549),a(10831),a(79348),a(25518)),x=a(70075);a(87538);const U=p.iv`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      color var(--wui-ease-out-power-1) var(--wui-duration-md),
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: color, background-color;
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:disabled {
    color: var(--wui-color-gray-glass-020);
  }

  button[data-loading='true'] > wui-icon {
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;var m=function(O,$,P,D){var w,L=arguments.length,h=L<3?$:null===D?D=Object.getOwnPropertyDescriptor($,P):D;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)h=Reflect.decorate(O,$,P,D);else for(var K=O.length-1;K>=0;K--)(w=O[K])&&(h=(L<3?w(h):L>3?w($,P,h):w($,P))||h);return L>3&&h&&Object.defineProperty($,P,h),h};let f=class extends p.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.variant="icon",this.disabled=!1,this.imageSrc=void 0,this.alt=void 0,this.chevron=!1,this.loading=!1}render(){return p.dy`
      <button
        ?disabled=${!!this.loading||!!this.disabled}
        data-loading=${this.loading}
        data-iconvariant=${(0,l.o)(this.iconVariant)}
        tabindex=${(0,l.o)(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `}visualTemplate(){if("image"===this.variant&&this.imageSrc)return p.dy`<wui-image src=${this.imageSrc} alt=${this.alt??"list item"}></wui-image>`;if("square"===this.iconVariant&&this.icon&&"icon"===this.variant)return p.dy`<wui-icon name=${this.icon}></wui-icon>`;if("icon"===this.variant&&this.icon&&this.iconVariant){const $=["blue","square-blue"].includes(this.iconVariant)?"accent-100":"fg-200",P="square-blue"===this.iconVariant?"mdl":"md",D=this.iconSize?this.iconSize:P;return p.dy`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${D}
          background="transparent"
          iconColor=${$}
          backgroundColor=${$}
          size=${P}
        ></wui-icon-box>
      `}return null}loadingTemplate(){return this.loading?p.dy`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`:p.dy``}chevronTemplate(){return this.chevron?p.dy`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`:null}};f.styles=[b.ET,b.ZM,U],m([(0,n.Cb)()],f.prototype,"icon",void 0),m([(0,n.Cb)()],f.prototype,"iconSize",void 0),m([(0,n.Cb)()],f.prototype,"tabIdx",void 0),m([(0,n.Cb)()],f.prototype,"variant",void 0),m([(0,n.Cb)()],f.prototype,"iconVariant",void 0),m([(0,n.Cb)({type:Boolean})],f.prototype,"disabled",void 0),m([(0,n.Cb)()],f.prototype,"imageSrc",void 0),m([(0,n.Cb)()],f.prototype,"alt",void 0),m([(0,n.Cb)({type:Boolean})],f.prototype,"chevron",void 0),m([(0,n.Cb)({type:Boolean})],f.prototype,"loading",void 0),f=m([(0,x.M)("wui-list-item")],f)},30189:(J,V,a)=>{a(78549)},11252:(J,V,a)=>{var p=a(59799),n=a(86523),l=a(25518),g=a(70075);const G=p.iv`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
  }
`;var d=function(y,b,x,v){var f,U=arguments.length,m=U<3?b:null===v?v=Object.getOwnPropertyDescriptor(b,x):v;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)m=Reflect.decorate(y,b,x,v);else for(var O=y.length-1;O>=0;O--)(f=y[O])&&(m=(U<3?f(m):U>3?f(b,x,m):f(b,x))||m);return U>3&&m&&Object.defineProperty(b,x,m),m};let T=class extends p.oi{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`\n      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};\n      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};\n      `,p.dy`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};T.styles=[l.ET,l.Bp,G],d([(0,n.Cb)()],T.prototype,"src",void 0),d([(0,n.Cb)()],T.prototype,"alt",void 0),d([(0,n.Cb)()],T.prototype,"size",void 0),T=d([(0,g.M)("wui-image")],T)}}]);