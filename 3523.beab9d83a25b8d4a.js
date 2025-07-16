"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[3523],{73523:(W,E,c)=>{c.r(E),c.d(E,{W3mSwapPreviewView:()=>w,W3mSwapSelectTokenView:()=>y,W3mSwapView:()=>h});var C=c(49671),s=c(59799),n=c(86523),A=c(37069),m=c(24380),x=c(22917),k=c(20597),i=c(30891),D=c(18445),Y=c(57745),P=c(79282),d=c(50860),H=(c(99409),c(937),c(51078),c(54575),c(64599)),F=c(36882);c(33223),c(62700);const Q=s.iv`
  :host {
    width: 100%;
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    cursor: pointer;
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    padding-top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s);
    padding-left: var(--wui-spacing-s);
    padding-right: var(--wui-spacing-1xs);
    border-radius: calc(var(--wui-border-radius-5xs) + var(--wui-border-radius-4xs));
    background: var(--wui-color-gray-glass-002);
  }

  .details-row-title {
    white-space: nowrap;
  }

  .details-row.provider-free-row {
    padding-right: var(--wui-spacing-xs);
  }
`;var T=function(u,t,o,r){var a,l=arguments.length,e=l<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)e=Reflect.decorate(u,t,o,r);else for(var p=u.length-1;p>=0;p--)(a=u[p])&&(e=(l<3?a(e):l>3?a(t,o,e):a(t,o))||e);return l>3&&e&&Object.defineProperty(t,o,e),e};const Z=F.bq.CONVERT_SLIPPAGE_TOLERANCE;let b=class extends s.oi{constructor(){super(),this.unsubscribe=[],this.networkName=k.R.state.activeCaipNetwork?.name,this.detailsOpen=!1,this.sourceToken=i.nY.state.sourceToken,this.toToken=i.nY.state.toToken,this.toTokenAmount=i.nY.state.toTokenAmount,this.sourceTokenPriceInUSD=i.nY.state.sourceTokenPriceInUSD,this.toTokenPriceInUSD=i.nY.state.toTokenPriceInUSD,this.priceImpact=i.nY.state.priceImpact,this.maxSlippage=i.nY.state.maxSlippage,this.networkTokenSymbol=i.nY.state.networkTokenSymbol,this.inputError=i.nY.state.inputError,this.unsubscribe.push(i.nY.subscribe(t=>{this.sourceToken=t.sourceToken,this.toToken=t.toToken,this.toTokenAmount=t.toTokenAmount,this.priceImpact=t.priceImpact,this.maxSlippage=t.maxSlippage,this.sourceTokenPriceInUSD=t.sourceTokenPriceInUSD,this.toTokenPriceInUSD=t.toTokenPriceInUSD,this.inputError=t.inputError}))}render(){const t=this.toTokenAmount&&this.maxSlippage?A.C.bigNumber(this.toTokenAmount).minus(this.maxSlippage).toString():null;if(!this.sourceToken||!this.toToken||this.inputError)return null;const o=this.sourceTokenPriceInUSD&&this.toTokenPriceInUSD?1/this.toTokenPriceInUSD*this.sourceTokenPriceInUSD:0;return s.dy`
      <wui-flex flexDirection="column" alignItems="center" gap="1xs" class="details-container">
        <wui-flex flexDirection="column">
          <button @click=${this.toggleDetails.bind(this)}>
            <wui-flex justifyContent="space-between" .padding=${["0","xs","0","xs"]}>
              <wui-flex justifyContent="flex-start" flexGrow="1" gap="xs">
                <wui-text variant="small-400" color="fg-100">
                  1 ${this.sourceToken.symbol} =
                  ${d.Hg.formatNumberToLocalString(o,3)}
                  ${this.toToken.symbol}
                </wui-text>
                <wui-text variant="small-400" color="fg-200">
                  $${d.Hg.formatNumberToLocalString(this.sourceTokenPriceInUSD)}
                </wui-text>
              </wui-flex>
              <wui-icon name="chevronBottom"></wui-icon>
            </wui-flex>
          </button>
          ${this.detailsOpen?s.dy`
                <wui-flex flexDirection="column" gap="xs" class="details-content-container">
                  ${this.priceImpact?s.dy` <wui-flex flexDirection="column" gap="xs">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="xs">
                            <wui-text class="details-row-title" variant="small-400" color="fg-150">
                              Price impact
                            </wui-text>
                            <w3m-tooltip-trigger
                              text="Price impact reflects the change in market price due to your trade"
                            >
                              <wui-icon size="xs" color="fg-250" name="infoCircle"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="small-400" color="fg-200">
                              ${d.Hg.formatNumberToLocalString(this.priceImpact,3)}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>`:null}
                  ${this.maxSlippage&&this.sourceToken.symbol?s.dy`<wui-flex flexDirection="column" gap="xs">
                        <wui-flex
                          justifyContent="space-between"
                          alignItems="center"
                          class="details-row"
                        >
                          <wui-flex alignItems="center" gap="xs">
                            <wui-text class="details-row-title" variant="small-400" color="fg-150">
                              Max. slippage
                            </wui-text>
                            <w3m-tooltip-trigger
                              text=${"Max slippage sets the minimum amount you must receive for the transaction to proceed. "+(t?`Transaction will be reversed if you receive less than ${d.Hg.formatNumberToLocalString(t,6)} ${this.toToken.symbol} due to price changes.`:"")}
                            >
                              <wui-icon size="xs" color="fg-250" name="infoCircle"></wui-icon>
                            </w3m-tooltip-trigger>
                          </wui-flex>
                          <wui-flex>
                            <wui-text variant="small-400" color="fg-200">
                              ${d.Hg.formatNumberToLocalString(this.maxSlippage,6)}
                              ${this.toToken.symbol} ${Z}%
                            </wui-text>
                          </wui-flex>
                        </wui-flex>
                      </wui-flex>`:null}
                  <wui-flex flexDirection="column" gap="xs">
                    <wui-flex
                      justifyContent="space-between"
                      alignItems="center"
                      class="details-row provider-free-row"
                    >
                      <wui-flex alignItems="center" gap="xs">
                        <wui-text class="details-row-title" variant="small-400" color="fg-150">
                          Provider fee
                        </wui-text>
                      </wui-flex>
                      <wui-flex>
                        <wui-text variant="small-400" color="fg-200">0.85%</wui-text>
                      </wui-flex>
                    </wui-flex>
                  </wui-flex>
                </wui-flex>
              `:null}
        </wui-flex>
      </wui-flex>
    `}toggleDetails(){this.detailsOpen=!this.detailsOpen}};b.styles=[Q],T([(0,n.SB)()],b.prototype,"networkName",void 0),T([(0,n.Cb)()],b.prototype,"detailsOpen",void 0),T([(0,n.SB)()],b.prototype,"sourceToken",void 0),T([(0,n.SB)()],b.prototype,"toToken",void 0),T([(0,n.SB)()],b.prototype,"toTokenAmount",void 0),T([(0,n.SB)()],b.prototype,"sourceTokenPriceInUSD",void 0),T([(0,n.SB)()],b.prototype,"toTokenPriceInUSD",void 0),T([(0,n.SB)()],b.prototype,"priceImpact",void 0),T([(0,n.SB)()],b.prototype,"maxSlippage",void 0),T([(0,n.SB)()],b.prototype,"networkTokenSymbol",void 0),T([(0,n.SB)()],b.prototype,"inputError",void 0),b=T([(0,d.Mo)("w3m-swap-details")],b);c(75165);const G=s.iv`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--wui-border-radius-s);
    padding: var(--wui-spacing-xl);
    padding-right: var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-002);
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    position: relative;
  }

  wui-shimmer.market-value {
    opacity: 0;
  }

  :host > wui-flex > svg.input_mask {
    position: absolute;
    inset: 0;
    z-index: 5;
  }

  :host wui-flex .input_mask__border,
  :host wui-flex .input_mask__background {
    transition: fill var(--wui-duration-md) var(--wui-ease-out-power-1);
    will-change: fill;
  }

  :host wui-flex .input_mask__border {
    fill: var(--wui-color-gray-glass-020);
  }

  :host wui-flex .input_mask__background {
    fill: var(--wui-color-gray-glass-002);
  }
`;var z=function(u,t,o,r){var a,l=arguments.length,e=l<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)e=Reflect.decorate(u,t,o,r);else for(var p=u.length-1;p>=0;p--)(a=u[p])&&(e=(l<3?a(e):l>3?a(t,o,e):a(t,o))||e);return l>3&&e&&Object.defineProperty(t,o,e),e};let U=class extends s.oi{constructor(){super(...arguments),this.target="sourceToken"}render(){return s.dy`
      <wui-flex class justifyContent="space-between">
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
          gap="xxs"
        >
          <wui-shimmer width="80px" height="40px" borderRadius="xxs" variant="light"></wui-shimmer>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `}templateTokenSelectButton(){return s.dy`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="xxs"
      >
        <wui-shimmer width="80px" height="40px" borderRadius="3xl" variant="light"></wui-shimmer>
      </wui-flex>
    `}};U.styles=[G],z([(0,n.Cb)()],U.prototype,"target",void 0),U=z([(0,d.Mo)("w3m-swap-input-skeleton")],U);const _={numericInputKeyDown(u,t,o){const l=u.metaKey||u.ctrlKey,e=u.key,a=e.toLocaleLowerCase(),L=","===e,O="."===e,K=e>="0"&&e<="9";!l&&("a"===a||"c"===a||"v"===a||"x"===a)&&u.preventDefault(),"0"===t&&!L&&!O&&"0"===e&&u.preventDefault(),"0"===t&&K&&(o(e),u.preventDefault()),(L||O)&&(t||(o("0."),u.preventDefault()),(t?.includes(".")||t?.includes(","))&&u.preventDefault()),!K&&!["Backspace","Meta","Ctrl","a","A","c","C","x","X","v","V","ArrowLeft","ArrowRight","Tab"].includes(e)&&!O&&!L&&u.preventDefault()}};c(66799);const X=s.iv`
  :host > wui-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-xl);
    padding-right: var(--wui-spacing-s);
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-002);
    position: relative;
    transition: box-shadow var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  :host wui-flex.focus {
    box-shadow: inset 0px 0px 0px 1px var(--wui-color-gray-glass-005);
  }

  :host > wui-flex .swap-input,
  :host > wui-flex .swap-token-button {
    z-index: 10;
  }

  :host > wui-flex .swap-input {
    -webkit-mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
    mask-image: linear-gradient(
      270deg,
      transparent 0px,
      transparent 8px,
      black 24px,
      black 25px,
      black 32px,
      black 100%
    );
  }

  :host > wui-flex .swap-input input {
    background: none;
    border: none;
    height: 42px;
    width: 100%;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: -1.28px;
    outline: none;
    caret-color: var(--wui-color-accent-100);
    color: var(--wui-color-fg-100);
    padding: 0px;
  }

  :host > wui-flex .swap-input input:focus-visible {
    outline: none;
  }

  :host > wui-flex .swap-input input::-webkit-outer-spin-button,
  :host > wui-flex .swap-input input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .max-value-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: var(--wui-color-gray-glass-020);
    padding-left: 0px;
  }

  .market-value {
    min-height: 18px;
  }
`;var S=function(u,t,o,r){var a,l=arguments.length,e=l<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)e=Reflect.decorate(u,t,o,r);else for(var p=u.length-1;p>=0;p--)(a=u[p])&&(e=(l<3?a(e):l>3?a(t,o,e):a(t,o))||e);return l>3&&e&&Object.defineProperty(t,o,e),e};let v=class extends s.oi{constructor(){super(...arguments),this.focused=!1,this.price=0,this.target="sourceToken",this.onSetAmount=null,this.onSetMaxValue=null}render(){const t=this.marketValue||"0",o=A.C.bigNumber(t).gt("0");return s.dy`
      <wui-flex class="${this.focused?"focus":""}" justifyContent="space-between">
        <wui-flex
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          class="swap-input"
        >
          <input
            data-testid="swap-input-${this.target}"
            @focusin=${()=>this.onFocusChange(!0)}
            @focusout=${()=>this.onFocusChange(!1)}
            ?disabled=${this.disabled}
            .value=${this.value}
            @input=${this.dispatchInputChangeEvent}
            @keydown=${this.handleKeydown}
            placeholder="0"
            type="text"
            inputmode="decimal"
          />
          <wui-text class="market-value" variant="small-400" color="fg-200">
            ${o?`$${d.Hg.formatNumberToLocalString(this.marketValue,2)}`:null}
          </wui-text>
        </wui-flex>
        ${this.templateTokenSelectButton()}
      </wui-flex>
    `}handleKeydown(t){return _.numericInputKeyDown(t,this.value,o=>this.onSetAmount?.(this.target,o))}dispatchInputChangeEvent(t){if(!this.onSetAmount)return;const o=t.target.value.replace(/[^0-9.]/gu,"");","===o||"."===o?this.onSetAmount(this.target,"0."):o.endsWith(",")?this.onSetAmount(this.target,o.replace(",",".")):this.onSetAmount(this.target,o)}setMaxValueToInput(){this.onSetMaxValue?.(this.target,this.balance)}templateTokenSelectButton(){return this.token?s.dy`
      <wui-flex
        class="swap-token-button"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        gap="xxs"
      >
        <wui-token-button
          data-testid="swap-input-token-${this.target}"
          text=${this.token.symbol}
          imageSrc=${this.token.logoUri}
          @click=${this.onSelectToken.bind(this)}
        >
        </wui-token-button>
        <wui-flex alignItems="center" gap="xxs"> ${this.tokenBalanceTemplate()} </wui-flex>
      </wui-flex>
    `:s.dy` <wui-button
        data-testid="swap-select-token-button-${this.target}"
        class="swap-token-button"
        size="md"
        variant="accent"
        @click=${this.onSelectToken.bind(this)}
      >
        Select token
      </wui-button>`}tokenBalanceTemplate(){const t=A.C.multiply(this.balance,this.price),o=!!t&&t?.gt(5e-5);return s.dy`
      ${o?s.dy`<wui-text variant="small-400" color="fg-200">
            ${d.Hg.formatNumberToLocalString(this.balance,2)}
          </wui-text>`:null}
      ${"sourceToken"===this.target?this.tokenActionButtonTemplate(o):null}
    `}tokenActionButtonTemplate(t){return t?s.dy` <button class="max-value-button" @click=${this.setMaxValueToInput.bind(this)}>
        <wui-text color="accent-100" variant="small-600">Max</wui-text>
      </button>`:s.dy` <button class="max-value-button" @click=${this.onBuyToken.bind(this)}>
      <wui-text color="accent-100" variant="small-600">Buy</wui-text>
    </button>`}onFocusChange(t){this.focused=t}onSelectToken(){P.X.sendEvent({type:"track",event:"CLICK_SELECT_TOKEN_TO_SWAP"}),m.RouterController.push("SwapSelectToken",{target:this.target})}onBuyToken(){m.RouterController.push("OnRampProviders")}};v.styles=[X],S([(0,n.Cb)()],v.prototype,"focused",void 0),S([(0,n.Cb)()],v.prototype,"balance",void 0),S([(0,n.Cb)()],v.prototype,"value",void 0),S([(0,n.Cb)()],v.prototype,"price",void 0),S([(0,n.Cb)()],v.prototype,"marketValue",void 0),S([(0,n.Cb)()],v.prototype,"disabled",void 0),S([(0,n.Cb)()],v.prototype,"target",void 0),S([(0,n.Cb)()],v.prototype,"token",void 0),S([(0,n.Cb)()],v.prototype,"onSetAmount",void 0),S([(0,n.Cb)()],v.prototype,"onSetMaxValue",void 0),v=S([(0,d.Mo)("w3m-swap-input")],v);const q=s.iv`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .action-button {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
  }

  .action-button:disabled {
    border-color: 1px solid var(--wui-color-gray-glass-005);
  }

  .swap-inputs-container {
    position: relative;
  }

  .replace-tokens-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: var(--wui-spacing-1xs);
    border-radius: var(--wui-border-radius-xs);
    background-color: var(--wui-color-modal-bg-base);
    padding: var(--wui-spacing-xxs);
  }

  .replace-tokens-button-container > button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    padding: var(--wui-spacing-xs);
    border: none;
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-duration-md) var(--wui-ease-out-power-1);
    will-change: background-color;
    z-index: 20;
  }

  .replace-tokens-button-container > button:hover {
    background: var(--wui-color-gray-glass-005);
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    transition: background 0.2s linear;
  }

  .details-container > wui-flex > button:hover {
    background: var(--wui-color-gray-glass-002);
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }
`;var g=function(u,t,o,r){var a,l=arguments.length,e=l<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)e=Reflect.decorate(u,t,o,r);else for(var p=u.length-1;p>=0;p--)(a=u[p])&&(e=(l<3?a(e):l>3?a(t,o,e):a(t,o))||e);return l>3&&e&&Object.defineProperty(t,o,e),e};let h=class extends s.oi{constructor(){super(),this.unsubscribe=[],this.initialParams=m.RouterController.state.data?.swap,this.detailsOpen=!1,this.caipAddress=x.AccountController.state.caipAddress,this.caipNetworkId=k.R.state.activeCaipNetwork?.caipNetworkId,this.initialized=i.nY.state.initialized,this.loadingQuote=i.nY.state.loadingQuote,this.loadingPrices=i.nY.state.loadingPrices,this.loadingTransaction=i.nY.state.loadingTransaction,this.sourceToken=i.nY.state.sourceToken,this.sourceTokenAmount=i.nY.state.sourceTokenAmount,this.sourceTokenPriceInUSD=i.nY.state.sourceTokenPriceInUSD,this.toToken=i.nY.state.toToken,this.toTokenAmount=i.nY.state.toTokenAmount,this.toTokenPriceInUSD=i.nY.state.toTokenPriceInUSD,this.inputError=i.nY.state.inputError,this.fetchError=i.nY.state.fetchError,this.onDebouncedGetSwapCalldata=D.j.debounce((0,C.Z)(function*(){yield i.nY.swapTokens()}),200),k.R.subscribeKey("activeCaipNetwork",t=>this.onCaipNetworkChange({newCaipNetwork:t,resetSwapState:!0,initializeSwapState:!1})),x.AccountController.subscribeKey("caipAddress",t=>this.onCaipAddressChange({newCaipAddress:t,resetSwapState:!0,initializeSwapState:!1})),this.unsubscribe.push(k.R.subscribeKey("activeCaipNetwork",t=>this.onCaipNetworkChange({newCaipNetwork:t,resetSwapState:!1,initializeSwapState:!0})),x.AccountController.subscribeKey("caipAddress",t=>this.onCaipAddressChange({newCaipAddress:t,resetSwapState:!1,initializeSwapState:!0})),Y.I.subscribeKey("open",t=>{t||i.nY.resetState()}),m.RouterController.subscribeKey("view",t=>{t.includes("Swap")||i.nY.resetValues()}),i.nY.subscribe(t=>{this.initialized=t.initialized,this.loadingQuote=t.loadingQuote,this.loadingPrices=t.loadingPrices,this.loadingTransaction=t.loadingTransaction,this.sourceToken=t.sourceToken,this.sourceTokenAmount=t.sourceTokenAmount,this.sourceTokenPriceInUSD=t.sourceTokenPriceInUSD,this.toToken=t.toToken,this.toTokenAmount=t.toTokenAmount,this.toTokenPriceInUSD=t.toTokenPriceInUSD,this.inputError=t.inputError,this.fetchError=t.fetchError}))}firstUpdated(){var t=this;return(0,C.Z)(function*(){i.nY.initializeState(),t.watchTokensAndValues(),yield t.handleSwapParameters()})()}disconnectedCallback(){this.unsubscribe.forEach(t=>t?.()),clearInterval(this.interval)}render(){return s.dy`
      <wui-flex flexDirection="column" .padding=${["0","l","l","l"]} gap="s">
        ${this.initialized?this.templateSwap():this.templateLoading()}
      </wui-flex>
    `}watchTokensAndValues(){this.interval=setInterval(()=>{i.nY.getNetworkTokenPrice(),i.nY.getMyTokensWithBalance(),i.nY.swapTokens()},1e4)}templateSwap(){return s.dy`
      <wui-flex flexDirection="column" gap="s">
        <wui-flex flexDirection="column" alignItems="center" gap="xs" class="swap-inputs-container">
          ${this.templateTokenInput("sourceToken",this.sourceToken)}
          ${this.templateTokenInput("toToken",this.toToken)} ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateDetails()} ${this.templateActionButton()}
      </wui-flex>
    `}actionButtonLabel(){return this.fetchError?"Swap":this.sourceToken&&this.toToken?this.sourceTokenAmount?this.inputError?this.inputError:"Review swap":"Enter amount":"Select token"}templateReplaceTokensButton(){return s.dy`
      <wui-flex class="replace-tokens-button-container">
        <button @click=${this.onSwitchTokens.bind(this)}>
          <wui-icon name="recycleHorizontal" color="fg-250" size="lg"></wui-icon>
        </button>
      </wui-flex>
    `}templateLoading(){return s.dy`
      <wui-flex flexDirection="column" gap="l">
        <wui-flex flexDirection="column" alignItems="center" gap="xs" class="swap-inputs-container">
          <w3m-swap-input-skeleton target="sourceToken"></w3m-swap-input-skeleton>
          <w3m-swap-input-skeleton target="toToken"></w3m-swap-input-skeleton>
          ${this.templateReplaceTokensButton()}
        </wui-flex>
        ${this.templateActionButton()}
      </wui-flex>
    `}templateTokenInput(t,o){const r=i.nY.state.myTokensWithBalance?.find(p=>p?.address===o?.address),l="toToken"===t?this.toTokenAmount:this.sourceTokenAmount,e="toToken"===t?this.toTokenPriceInUSD:this.sourceTokenPriceInUSD,a=A.C.parseLocalStringToNumber(l)*e;return s.dy`<w3m-swap-input
      .value=${"toToken"===t?this.toTokenAmount:this.sourceTokenAmount}
      .disabled=${"toToken"===t}
      .onSetAmount=${this.handleChangeAmount.bind(this)}
      target=${t}
      .token=${o}
      .balance=${r?.quantity?.numeric}
      .price=${r?.price}
      .marketValue=${a}
      .onSetMaxValue=${this.onSetMaxValue.bind(this)}
    ></w3m-swap-input>`}onSetMaxValue(t,o){const r=A.C.bigNumber(o||"0");this.handleChangeAmount(t,r.gt(0)?r.toFixed(20):"0")}templateDetails(){return this.sourceToken&&this.toToken&&!this.inputError?s.dy`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`:null}handleChangeAmount(t,o){i.nY.clearError(),"sourceToken"===t?i.nY.setSourceTokenAmount(o):i.nY.setToTokenAmount(o),this.onDebouncedGetSwapCalldata()}templateActionButton(){const t=!this.toToken||!this.sourceToken,o=!this.sourceTokenAmount,r=this.loadingQuote||this.loadingPrices||this.loadingTransaction,l=r||t||o||this.inputError;return s.dy` <wui-flex gap="xs">
      <wui-button
        data-testid="swap-action-button"
        class="action-button"
        fullWidth
        size="lg"
        borderRadius="xs"
        variant=${t?"neutral":"main"}
        .loading=${r}
        .disabled=${l}
        @click=${this.onSwapPreview.bind(this)}
      >
        ${this.actionButtonLabel()}
      </wui-button>
    </wui-flex>`}onSwitchTokens(){i.nY.switchTokens()}onSwapPreview(){var t=this;return(0,C.Z)(function*(){const o=k.R.state.activeChain;t.fetchError&&(yield i.nY.swapTokens()),P.X.sendEvent({type:"track",event:"INITIATE_SWAP",properties:{network:t.caipNetworkId||"",swapFromToken:t.sourceToken?.symbol||"",swapToToken:t.toToken?.symbol||"",swapFromAmount:t.sourceTokenAmount||"",swapToAmount:t.toTokenAmount||"",isSmartAccount:x.AccountController.state.preferredAccountTypes?.[o]===H.y_.ACCOUNT_TYPES.SMART_ACCOUNT}}),m.RouterController.push("SwapPreview")})()}handleSwapParameters(){var t=this;return(0,C.Z)(function*(){t.initialParams&&(i.nY.state.initialized||(yield new Promise(r=>{const l=i.nY.subscribeKey("initialized",e=>{e&&(l?.(),r())})})),yield t.setSwapParameters(t.initialParams))})()}setSwapParameters({amount:t,fromToken:o,toToken:r}){return(0,C.Z)(function*(){(!i.nY.state.tokens||!i.nY.state.myTokensWithBalance)&&(yield new Promise(a=>{const p=i.nY.subscribeKey("myTokensWithBalance",N=>{N&&N.length>0&&(p?.(),a())});setTimeout(()=>{p?.(),a()},5e3)}));const l=[...i.nY.state.tokens||[],...i.nY.state.myTokensWithBalance||[]];if(o){const e=l.find(a=>a.symbol.toLowerCase()===o.toLowerCase());e&&i.nY.setSourceToken(e)}if(r){const e=l.find(a=>a.symbol.toLowerCase()===r.toLowerCase());e&&i.nY.setToToken(e)}t&&!isNaN(Number(t))&&i.nY.setSourceTokenAmount(t)})()}onCaipAddressChange({newCaipAddress:t,resetSwapState:o,initializeSwapState:r}){this.caipAddress!==t&&(this.caipAddress=t,o&&i.nY.resetState(),r&&i.nY.initializeState())}onCaipNetworkChange({newCaipNetwork:t,resetSwapState:o,initializeSwapState:r}){this.caipNetworkId!==t?.caipNetworkId&&(this.caipNetworkId=t?.caipNetworkId,o&&i.nY.resetState(),r&&i.nY.initializeState())}};h.styles=q,g([(0,n.Cb)({type:Object})],h.prototype,"initialParams",void 0),g([(0,n.SB)()],h.prototype,"interval",void 0),g([(0,n.SB)()],h.prototype,"detailsOpen",void 0),g([(0,n.SB)()],h.prototype,"caipAddress",void 0),g([(0,n.SB)()],h.prototype,"caipNetworkId",void 0),g([(0,n.SB)()],h.prototype,"initialized",void 0),g([(0,n.SB)()],h.prototype,"loadingQuote",void 0),g([(0,n.SB)()],h.prototype,"loadingPrices",void 0),g([(0,n.SB)()],h.prototype,"loadingTransaction",void 0),g([(0,n.SB)()],h.prototype,"sourceToken",void 0),g([(0,n.SB)()],h.prototype,"sourceTokenAmount",void 0),g([(0,n.SB)()],h.prototype,"sourceTokenPriceInUSD",void 0),g([(0,n.SB)()],h.prototype,"toToken",void 0),g([(0,n.SB)()],h.prototype,"toTokenAmount",void 0),g([(0,n.SB)()],h.prototype,"toTokenPriceInUSD",void 0),g([(0,n.SB)()],h.prototype,"inputError",void 0),g([(0,n.SB)()],h.prototype,"fetchError",void 0),h=g([(0,d.Mo)("w3m-swap-view")],h);const tt=s.iv`
  :host > wui-flex:first-child {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  .preview-container,
  .details-container {
    width: 100%;
  }

  .token-image {
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: 12px;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .token-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-xxs);
    padding: var(--wui-spacing-xs);
    height: 40px;
    border: none;
    border-radius: 80px;
    background: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    cursor: pointer;
    transition: background 0.2s linear;
  }

  .token-item:hover {
    background: var(--wui-color-gray-glass-005);
  }

  .preview-token-details-container {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }

  .action-buttons-container {
    width: 100%;
    gap: var(--wui-spacing-xs);
  }

  .action-buttons-container > button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    height: 48px;
    border-radius: var(--wui-border-radius-xs);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  .action-buttons-container > button:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  .action-button > wui-loading-spinner {
    display: inline-block;
  }

  .cancel-button:hover,
  .action-button:hover {
    cursor: pointer;
  }

  .action-buttons-container > wui-button.cancel-button {
    flex: 2;
  }

  .action-buttons-container > wui-button.action-button {
    flex: 4;
  }

  .action-buttons-container > button.action-button > wui-text {
    color: white;
  }

  .details-container > wui-flex {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    width: 100%;
  }

  .details-container > wui-flex > button {
    border: none;
    background: none;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    transition: background 0.2s linear;
  }

  .details-container > wui-flex > button:hover {
    background: var(--wui-color-gray-glass-002);
  }

  .details-content-container {
    padding: var(--wui-spacing-1xs);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .details-content-container > wui-flex {
    width: 100%;
  }

  .details-row {
    width: 100%;
    padding: var(--wui-spacing-s) var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-xxs);
    background: var(--wui-color-gray-glass-002);
  }
`;var f=function(u,t,o,r){var a,l=arguments.length,e=l<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)e=Reflect.decorate(u,t,o,r);else for(var p=u.length-1;p>=0;p--)(a=u[p])&&(e=(l<3?a(e):l>3?a(t,o,e):a(t,o))||e);return l>3&&e&&Object.defineProperty(t,o,e),e};let w=class extends s.oi{constructor(){super(),this.unsubscribe=[],this.detailsOpen=!0,this.approvalTransaction=i.nY.state.approvalTransaction,this.swapTransaction=i.nY.state.swapTransaction,this.sourceToken=i.nY.state.sourceToken,this.sourceTokenAmount=i.nY.state.sourceTokenAmount??"",this.sourceTokenPriceInUSD=i.nY.state.sourceTokenPriceInUSD,this.toToken=i.nY.state.toToken,this.toTokenAmount=i.nY.state.toTokenAmount??"",this.toTokenPriceInUSD=i.nY.state.toTokenPriceInUSD,this.caipNetwork=k.R.state.activeCaipNetwork,this.balanceSymbol=x.AccountController.state.balanceSymbol,this.inputError=i.nY.state.inputError,this.loadingQuote=i.nY.state.loadingQuote,this.loadingApprovalTransaction=i.nY.state.loadingApprovalTransaction,this.loadingBuildTransaction=i.nY.state.loadingBuildTransaction,this.loadingTransaction=i.nY.state.loadingTransaction,this.unsubscribe.push(x.AccountController.subscribeKey("balanceSymbol",t=>{this.balanceSymbol!==t&&m.RouterController.goBack()}),k.R.subscribeKey("activeCaipNetwork",t=>{this.caipNetwork!==t&&(this.caipNetwork=t)}),i.nY.subscribe(t=>{this.approvalTransaction=t.approvalTransaction,this.swapTransaction=t.swapTransaction,this.sourceToken=t.sourceToken,this.toToken=t.toToken,this.toTokenPriceInUSD=t.toTokenPriceInUSD,this.sourceTokenAmount=t.sourceTokenAmount??"",this.toTokenAmount=t.toTokenAmount??"",this.inputError=t.inputError,t.inputError&&m.RouterController.goBack(),this.loadingQuote=t.loadingQuote,this.loadingApprovalTransaction=t.loadingApprovalTransaction,this.loadingBuildTransaction=t.loadingBuildTransaction,this.loadingTransaction=t.loadingTransaction}))}firstUpdated(){i.nY.getTransaction(),this.refreshTransaction()}disconnectedCallback(){this.unsubscribe.forEach(t=>t?.()),clearInterval(this.interval)}render(){return s.dy`
      <wui-flex flexDirection="column" .padding=${["0","l","l","l"]} gap="s">
        ${this.templateSwap()}
      </wui-flex>
    `}refreshTransaction(){this.interval=setInterval(()=>{i.nY.getApprovalLoadingState()||i.nY.getTransaction()},1e4)}templateSwap(){const t=`${d.Hg.formatNumberToLocalString(parseFloat(this.sourceTokenAmount))} ${this.sourceToken?.symbol}`,o=`${d.Hg.formatNumberToLocalString(parseFloat(this.toTokenAmount))} ${this.toToken?.symbol}`,r=parseFloat(this.sourceTokenAmount)*this.sourceTokenPriceInUSD,l=parseFloat(this.toTokenAmount)*this.toTokenPriceInUSD,e=d.Hg.formatNumberToLocalString(r),a=d.Hg.formatNumberToLocalString(l),p=this.loadingQuote||this.loadingBuildTransaction||this.loadingTransaction||this.loadingApprovalTransaction;return s.dy`
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        <wui-flex class="preview-container" flexDirection="column" alignItems="flex-start" gap="l">
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="l"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="4xs">
              <wui-text variant="small-400" color="fg-150">Send</wui-text>
              <wui-text variant="paragraph-400" color="fg-100">$${e}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${t}
              imageSrc=${this.sourceToken?.logoUri}
            >
            </wui-token-button>
          </wui-flex>
          <wui-icon name="recycleHorizontal" color="fg-200" size="md"></wui-icon>
          <wui-flex
            class="preview-token-details-container"
            alignItems="center"
            justifyContent="space-between"
            gap="l"
          >
            <wui-flex flexDirection="column" alignItems="flex-start" gap="4xs">
              <wui-text variant="small-400" color="fg-150">Receive</wui-text>
              <wui-text variant="paragraph-400" color="fg-100">$${a}</wui-text>
            </wui-flex>
            <wui-token-button
              flexDirection="row-reverse"
              text=${o}
              imageSrc=${this.toToken?.logoUri}
            >
            </wui-token-button>
          </wui-flex>
        </wui-flex>

        ${this.templateDetails()}

        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="xs">
          <wui-icon size="sm" color="fg-200" name="infoCircle"></wui-icon>
          <wui-text variant="small-400" color="fg-200">Review transaction carefully</wui-text>
        </wui-flex>

        <wui-flex
          class="action-buttons-container"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="xs"
        >
          <wui-button
            class="cancel-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="neutral"
            @click=${this.onCancelTransaction.bind(this)}
          >
            <wui-text variant="paragraph-600" color="fg-200">Cancel</wui-text>
          </wui-button>
          <wui-button
            class="action-button"
            fullWidth
            size="lg"
            borderRadius="xs"
            variant="main"
            ?loading=${p}
            ?disabled=${p}
            @click=${this.onSendTransaction.bind(this)}
          >
            <wui-text variant="paragraph-600" color="inverse-100">
              ${this.actionButtonLabel()}
            </wui-text>
          </wui-button>
        </wui-flex>
      </wui-flex>
    `}templateDetails(){return this.sourceToken&&this.toToken&&!this.inputError?s.dy`<w3m-swap-details .detailsOpen=${this.detailsOpen}></w3m-swap-details>`:null}actionButtonLabel(){return this.loadingApprovalTransaction?"Approving...":this.approvalTransaction?"Approve":"Swap"}onCancelTransaction(){m.RouterController.goBack()}onSendTransaction(){this.approvalTransaction?i.nY.sendTransactionForApproval(this.approvalTransaction):i.nY.sendTransactionForSwap(this.swapTransaction)}};w.styles=tt,f([(0,n.SB)()],w.prototype,"interval",void 0),f([(0,n.SB)()],w.prototype,"detailsOpen",void 0),f([(0,n.SB)()],w.prototype,"approvalTransaction",void 0),f([(0,n.SB)()],w.prototype,"swapTransaction",void 0),f([(0,n.SB)()],w.prototype,"sourceToken",void 0),f([(0,n.SB)()],w.prototype,"sourceTokenAmount",void 0),f([(0,n.SB)()],w.prototype,"sourceTokenPriceInUSD",void 0),f([(0,n.SB)()],w.prototype,"toToken",void 0),f([(0,n.SB)()],w.prototype,"toTokenAmount",void 0),f([(0,n.SB)()],w.prototype,"toTokenPriceInUSD",void 0),f([(0,n.SB)()],w.prototype,"caipNetwork",void 0),f([(0,n.SB)()],w.prototype,"balanceSymbol",void 0),f([(0,n.SB)()],w.prototype,"inputError",void 0),f([(0,n.SB)()],w.prototype,"loadingQuote",void 0),f([(0,n.SB)()],w.prototype,"loadingApprovalTransaction",void 0),f([(0,n.SB)()],w.prototype,"loadingBuildTransaction",void 0),f([(0,n.SB)()],w.prototype,"loadingTransaction",void 0),w=f([(0,d.Mo)("w3m-swap-preview-view")],w);c(44448),c(72686),c(11252),c(10831),c(79348);var V=c(25518),M=c(88814),et=c(70075);const ot=s.iv`
  :host {
    height: 60px;
    min-height: 60px;
  }

  :host > wui-flex {
    cursor: pointer;
    height: 100%;
    display: flex;
    column-gap: var(--wui-spacing-s);
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-l);
    width: 100%;
    background-color: transparent;
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      background-color var(--wui-ease-out-power-1) var(--wui-duration-lg),
      opacity var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color, opacity;
  }

  @media (hover: hover) and (pointer: fine) {
    :host > wui-flex:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    :host > wui-flex:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  :host([disabled]) > wui-flex {
    opacity: 0.6;
  }

  :host([disabled]) > wui-flex:hover {
    background-color: transparent;
  }

  :host > wui-flex > wui-flex {
    flex: 1;
  }

  :host > wui-flex > wui-image,
  :host > wui-flex > .token-item-image-placeholder {
    width: 40px;
    max-width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-3xl);
    position: relative;
  }

  :host > wui-flex > .token-item-image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host > wui-flex > wui-image::after,
  :host > wui-flex > .token-item-image-placeholder::after {
    position: absolute;
    content: '';
    inset: 0;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-l);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }
`;var B=function(u,t,o,r){var a,l=arguments.length,e=l<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)e=Reflect.decorate(u,t,o,r);else for(var p=u.length-1;p>=0;p--)(a=u[p])&&(e=(l<3?a(e):l>3?a(t,o,e):a(t,o))||e);return l>3&&e&&Object.defineProperty(t,o,e),e};let $=class extends s.oi{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.imageSrc=void 0,this.name=void 0,this.symbol=void 0,this.price=void 0,this.amount=void 0,this.visible=!1,this.imageError=!1,this.observer=new IntersectionObserver(t=>{t.forEach(o=>{o.isIntersecting?this.visible=!0:this.visible=!1})},{threshold:.1})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){if(!this.visible)return null;const t=this.amount&&this.price?A.C.multiply(this.price,this.amount)?.toFixed(3):null;return s.dy`
      <wui-flex alignItems="center">
        ${this.visualTemplate()}
        <wui-flex flexDirection="column" gap="3xs">
          <wui-flex justifyContent="space-between">
            <wui-text variant="paragraph-500" color="fg-100" lineClamp="1">${this.name}</wui-text>
            ${t?s.dy`
                  <wui-text variant="paragraph-500" color="fg-100">
                    $${M.H.formatNumberToLocalString(t,3)}
                  </wui-text>
                `:null}
          </wui-flex>
          <wui-flex justifyContent="space-between">
            <wui-text variant="small-400" color="fg-200" lineClamp="1">${this.symbol}</wui-text>
            ${this.amount?s.dy`<wui-text variant="small-400" color="fg-200">
                  ${M.H.formatNumberToLocalString(this.amount,4)}
                </wui-text>`:null}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}visualTemplate(){return this.imageError?s.dy`<wui-flex class="token-item-image-placeholder">
        <wui-icon name="image" color="inherit"></wui-icon>
      </wui-flex>`:this.imageSrc?s.dy`<wui-image
        width="40"
        height="40"
        src=${this.imageSrc}
        @onLoadError=${this.imageLoadError}
      ></wui-image>`:null}imageLoadError(){this.imageError=!0}};$.styles=[V.ET,V.ZM,ot],B([(0,n.Cb)()],$.prototype,"imageSrc",void 0),B([(0,n.Cb)()],$.prototype,"name",void 0),B([(0,n.Cb)()],$.prototype,"symbol",void 0),B([(0,n.Cb)()],$.prototype,"price",void 0),B([(0,n.Cb)()],$.prototype,"amount",void 0),B([(0,n.SB)()],$.prototype,"visible",void 0),B([(0,n.SB)()],$.prototype,"imageError",void 0),$=B([(0,et.M)("wui-token-list-item")],$);const it=s.iv`
  :host {
    --tokens-scroll--top-opacity: 0;
    --tokens-scroll--bottom-opacity: 1;
    --suggested-tokens-scroll--left-opacity: 0;
    --suggested-tokens-scroll--right-opacity: 1;
  }

  :host > wui-flex:first-child {
    overflow-y: hidden;
    overflow-x: hidden;
    scrollbar-width: none;
    scrollbar-height: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }

  wui-loading-hexagon {
    position: absolute;
  }

  .suggested-tokens-container {
    overflow-x: auto;
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--suggested-tokens-scroll--left-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--suggested-tokens-scroll--right-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--suggested-tokens-scroll--right-opacity))) 100%
    );
  }

  .suggested-tokens-container::-webkit-scrollbar {
    display: none;
  }

  .tokens-container {
    border-top: 1px solid var(--wui-color-gray-glass-005);
    height: 100%;
    max-height: 390px;
  }

  .tokens {
    width: 100%;
    overflow-y: auto;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--top-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--tokens-scroll--top-opacity))) 1px,
      black 50px,
      black 90px,
      black calc(100% - 90px),
      black calc(100% - 50px),
      rgba(155, 155, 155, calc(1 - var(--tokens-scroll--bottom-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--tokens-scroll--bottom-opacity))) 100%
    );
  }

  .network-search-input,
  .select-network-button {
    height: 40px;
  }

  .select-network-button {
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: transparent;
    border-radius: var(--wui-border-radius-xxs);
    padding: var(--wui-spacing-xs);
    align-items: center;
    transition: background-color 0.2s linear;
  }

  .select-network-button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  .select-network-button > wui-image {
    width: 26px;
    height: 26px;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }
`;var I=function(u,t,o,r){var a,l=arguments.length,e=l<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)e=Reflect.decorate(u,t,o,r);else for(var p=u.length-1;p>=0;p--)(a=u[p])&&(e=(l<3?a(e):l>3?a(t,o,e):a(t,o))||e);return l>3&&e&&Object.defineProperty(t,o,e),e};let y=class extends s.oi{constructor(){super(),this.unsubscribe=[],this.targetToken=m.RouterController.state.data?.target,this.sourceToken=i.nY.state.sourceToken,this.sourceTokenAmount=i.nY.state.sourceTokenAmount,this.toToken=i.nY.state.toToken,this.myTokensWithBalance=i.nY.state.myTokensWithBalance,this.popularTokens=i.nY.state.popularTokens,this.searchValue="",this.unsubscribe.push(i.nY.subscribe(t=>{this.sourceToken=t.sourceToken,this.toToken=t.toToken,this.myTokensWithBalance=t.myTokensWithBalance}))}updated(){this.renderRoot?.querySelector(".suggested-tokens-container")?.addEventListener("scroll",this.handleSuggestedTokensScroll.bind(this)),this.renderRoot?.querySelector(".tokens")?.addEventListener("scroll",this.handleTokenListScroll.bind(this))}disconnectedCallback(){super.disconnectedCallback();const t=this.renderRoot?.querySelector(".suggested-tokens-container"),o=this.renderRoot?.querySelector(".tokens");t?.removeEventListener("scroll",this.handleSuggestedTokensScroll.bind(this)),o?.removeEventListener("scroll",this.handleTokenListScroll.bind(this)),clearInterval(this.interval)}render(){return s.dy`
      <wui-flex flexDirection="column" gap="s">
        ${this.templateSearchInput()} ${this.templateSuggestedTokens()} ${this.templateTokens()}
      </wui-flex>
    `}onSelectToken(t){"sourceToken"===this.targetToken?i.nY.setSourceToken(t):(i.nY.setToToken(t),this.sourceToken&&this.sourceTokenAmount&&i.nY.swapTokens()),m.RouterController.goBack()}templateSearchInput(){return s.dy`
      <wui-flex .padding=${["3xs","s","0","s"]} gap="xs">
        <wui-input-text
          data-testid="swap-select-token-search-input"
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
          .value=${this.searchValue}
          @inputChange=${this.onSearchInputChange.bind(this)}
        ></wui-input-text>
      </wui-flex>
    `}templateTokens(){const t=this.myTokensWithBalance?Object.values(this.myTokensWithBalance):[],o=this.popularTokens?this.popularTokens:[],r=this.filterTokensWithText(t,this.searchValue),l=this.filterTokensWithText(o,this.searchValue);return s.dy`
      <wui-flex class="tokens-container">
        <wui-flex class="tokens" .padding=${["0","s","s","s"]} flexDirection="column">
          ${r?.length>0?s.dy`
                <wui-flex justifyContent="flex-start" padding="s">
                  <wui-text variant="paragraph-500" color="fg-200">Your tokens</wui-text>
                </wui-flex>
                ${r.map(e=>{const a=e.symbol===this.sourceToken?.symbol||e.symbol===this.toToken?.symbol;return s.dy`
                    <wui-token-list-item
                      data-testid="swap-select-token-item-${e.symbol}"
                      name=${e.name}
                      ?disabled=${a}
                      symbol=${e.symbol}
                      price=${e?.price}
                      amount=${e?.quantity?.numeric}
                      imageSrc=${e.logoUri}
                      @click=${()=>{a||this.onSelectToken(e)}}
                    >
                    </wui-token-list-item>
                  `})}
              `:null}

          <wui-flex justifyContent="flex-start" padding="s">
            <wui-text variant="paragraph-500" color="fg-200">Tokens</wui-text>
          </wui-flex>
          ${l?.length>0?l.map(e=>s.dy`
                  <wui-token-list-item
                    data-testid="swap-select-token-item-${e.symbol}"
                    name=${e.name}
                    symbol=${e.symbol}
                    imageSrc=${e.logoUri}
                    @click=${()=>this.onSelectToken(e)}
                  >
                  </wui-token-list-item>
                `):null}
        </wui-flex>
      </wui-flex>
    `}templateSuggestedTokens(){const t=i.nY.state.suggestedTokens?i.nY.state.suggestedTokens.slice(0,8):null;return t?s.dy`
      <wui-flex class="suggested-tokens-container" .padding=${["0","s","0","s"]} gap="xs">
        ${t.map(o=>s.dy`
            <wui-token-button
              text=${o.symbol}
              imageSrc=${o.logoUri}
              @click=${()=>this.onSelectToken(o)}
            >
            </wui-token-button>
          `)}
      </wui-flex>
    `:null}onSearchInputChange(t){this.searchValue=t.detail}handleSuggestedTokensScroll(){const t=this.renderRoot?.querySelector(".suggested-tokens-container");t&&(t.style.setProperty("--suggested-tokens-scroll--left-opacity",d.kj.interpolate([0,100],[0,1],t.scrollLeft).toString()),t.style.setProperty("--suggested-tokens-scroll--right-opacity",d.kj.interpolate([0,100],[0,1],t.scrollWidth-t.scrollLeft-t.offsetWidth).toString()))}handleTokenListScroll(){const t=this.renderRoot?.querySelector(".tokens");t&&(t.style.setProperty("--tokens-scroll--top-opacity",d.kj.interpolate([0,100],[0,1],t.scrollTop).toString()),t.style.setProperty("--tokens-scroll--bottom-opacity",d.kj.interpolate([0,100],[0,1],t.scrollHeight-t.scrollTop-t.offsetHeight).toString()))}filterTokensWithText(t,o){return t.filter(r=>`${r.symbol} ${r.name} ${r.address}`.toLowerCase().includes(o.toLowerCase()))}};y.styles=it,I([(0,n.SB)()],y.prototype,"interval",void 0),I([(0,n.SB)()],y.prototype,"targetToken",void 0),I([(0,n.SB)()],y.prototype,"sourceToken",void 0),I([(0,n.SB)()],y.prototype,"sourceTokenAmount",void 0),I([(0,n.SB)()],y.prototype,"toToken",void 0),I([(0,n.SB)()],y.prototype,"myTokensWithBalance",void 0),I([(0,n.SB)()],y.prototype,"popularTokens",void 0),I([(0,n.SB)()],y.prototype,"searchValue",void 0),y=I([(0,d.Mo)("w3m-swap-select-token-view")],y)},75165:(W,E,c)=>{c(294)},294:(W,E,c)=>{var C=c(59799),s=c(86523),n=c(70075);const A=C.iv`
  :host {
    display: block;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-200) 5%,
      var(--wui-color-bg-200) 48%,
      var(--wui-color-bg-300) 55%,
      var(--wui-color-bg-300) 60%,
      var(--wui-color-bg-300) calc(60% + 10px),
      var(--wui-color-bg-200) calc(60% + 12px),
      var(--wui-color-bg-200) 100%
    );
    background-size: 250%;
    animation: shimmer 3s linear infinite reverse;
  }

  :host([variant='light']) {
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-150) 5%,
      var(--wui-color-bg-150) 48%,
      var(--wui-color-bg-200) 55%,
      var(--wui-color-bg-200) 60%,
      var(--wui-color-bg-200) calc(60% + 10px),
      var(--wui-color-bg-150) calc(60% + 12px),
      var(--wui-color-bg-150) 100%
    );
    background-size: 250%;
  }

  @keyframes shimmer {
    from {
      background-position: -250% 0;
    }
    to {
      background-position: 250% 0;
    }
  }
`;var m=function(k,i,D,Y){var R,P=arguments.length,d=P<3?i:null===Y?Y=Object.getOwnPropertyDescriptor(i,D):Y;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(k,i,D,Y);else for(var j=k.length-1;j>=0;j--)(R=k[j])&&(d=(P<3?R(d):P>3?R(i,D,d):R(i,D))||d);return P>3&&d&&Object.defineProperty(i,D,d),d};let x=class extends C.oi{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m",this.variant="default"}render(){return this.style.cssText=`\n      width: ${this.width};\n      height: ${this.height};\n      border-radius: clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px);\n    `,C.dy`<slot></slot>`}};x.styles=[A],m([(0,s.Cb)()],x.prototype,"width",void 0),m([(0,s.Cb)()],x.prototype,"height",void 0),m([(0,s.Cb)()],x.prototype,"borderRadius",void 0),m([(0,s.Cb)()],x.prototype,"variant",void 0),x=m([(0,n.M)("wui-shimmer")],x)}}]);