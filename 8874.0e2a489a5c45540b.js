"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[8874],{38874:(Z,A,r)=>{r.r(A),r.d(A,{W3mSendSelectTokenView:()=>b,W3mWalletSendPreviewView:()=>v,W3mWalletSendView:()=>g});var h=r(49671),o=r(59799),u=r(86523),d=r(68669),U=r(30891),m=r(24380),T=r(18445),f=r(20597),p=r(50860),w=(r(99409),r(937),r(6500),r(29768)),C=r(10053);r(51078),r(54575);const O=o.iv`
  :host {
    width: 100%;
    height: 100px;
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
    position: relative;
  }

  :host(:hover) {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-flex {
    width: 100%;
    height: fit-content;
  }

  wui-button {
    display: ruby;
    color: var(--wui-color-fg-100);
    margin: 0 var(--wui-spacing-xs);
  }

  .instruction {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }

  .paste {
    display: inline-flex;
  }

  textarea {
    background: transparent;
    width: 100%;
    font-family: var(--w3m-font-family);
    font-size: var(--wui-font-size-medium);
    font-style: normal;
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    letter-spacing: var(--wui-letter-spacing-medium);
    color: var(--wui-color-fg-100);
    caret-color: var(--wui-color-accent-100);
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
    border: none;
    outline: none;
    appearance: none;
    resize: none;
    overflow: hidden;
  }
`;var M=function(l,e,i,n){var a,s=arguments.length,t=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(l,e,i,n);else for(var c=l.length-1;c>=0;c--)(a=l[c])&&(t=(s<3?a(t):s>3?a(e,i,t):a(e,i))||t);return s>3&&t&&Object.defineProperty(e,i,t),t};let P=class extends o.oi{constructor(){var e;super(...arguments),e=this,this.inputElementRef=(0,w.V)(),this.instructionElementRef=(0,w.V)(),this.instructionHidden=!!this.value,this.pasting=!1,this.onDebouncedSearch=T.j.debounce(function(){var i=(0,h.Z)(function*(n){if(!n.length)return void e.setReceiverAddress("");const s=f.R.state.activeChain;if(T.j.isAddress(n,s))e.setReceiverAddress(n);else try{const a=yield C.ConnectionController.getEnsAddress(n);if(a){d.S.setReceiverProfileName(n),d.S.setReceiverAddress(a);const c=yield C.ConnectionController.getEnsAvatar(n);d.S.setReceiverProfileImageUrl(c||void 0)}}catch{e.setReceiverAddress(n)}finally{d.S.setLoading(!1)}});return function(n){return i.apply(this,arguments)}}())}firstUpdated(){this.value&&(this.instructionHidden=!0),this.checkHidden()}render(){return o.dy` <wui-flex
      @click=${this.onBoxClick.bind(this)}
      flexDirection="column"
      justifyContent="center"
      gap="4xs"
      .padding=${["2xl","l","xl","l"]}
    >
      <wui-text
        ${(0,w.i)(this.instructionElementRef)}
        class="instruction"
        color="fg-300"
        variant="medium-400"
      >
        Type or
        <wui-button
          class="paste"
          size="md"
          variant="neutral"
          iconLeft="copy"
          @click=${this.onPasteClick.bind(this)}
        >
          <wui-icon size="sm" color="inherit" slot="iconLeft" name="copy"></wui-icon>
          Paste
        </wui-button>
        address
      </wui-text>
      <textarea
        spellcheck="false"
        ?disabled=${!this.instructionHidden}
        ${(0,w.i)(this.inputElementRef)}
        @input=${this.onInputChange.bind(this)}
        @blur=${this.onBlur.bind(this)}
        .value=${this.value??""}
        autocomplete="off"
      >
${this.value??""}</textarea
      >
    </wui-flex>`}focusInput(){var e=this;return(0,h.Z)(function*(){e.instructionElementRef.value&&(e.instructionHidden=!0,yield e.toggleInstructionFocus(!1),e.instructionElementRef.value.style.pointerEvents="none",e.inputElementRef.value?.focus(),e.inputElementRef.value&&(e.inputElementRef.value.selectionStart=e.inputElementRef.value.selectionEnd=e.inputElementRef.value.value.length))})()}focusInstruction(){var e=this;return(0,h.Z)(function*(){e.instructionElementRef.value&&(e.instructionHidden=!1,yield e.toggleInstructionFocus(!0),e.instructionElementRef.value.style.pointerEvents="auto",e.inputElementRef.value?.blur())})()}toggleInstructionFocus(e){var i=this;return(0,h.Z)(function*(){i.instructionElementRef.value&&(yield i.instructionElementRef.value.animate([{opacity:e?0:1},{opacity:e?1:0}],{duration:100,easing:"ease",fill:"forwards"}).finished)})()}onBoxClick(){!this.value&&!this.instructionHidden&&this.focusInput()}onBlur(){!this.value&&this.instructionHidden&&!this.pasting&&this.focusInstruction()}checkHidden(){this.instructionHidden&&this.focusInput()}onPasteClick(){var e=this;return(0,h.Z)(function*(){e.pasting=!0;const i=yield navigator.clipboard.readText();d.S.setReceiverAddress(i),e.focusInput()})()}onInputChange(e){const i=e.target;this.pasting=!1,this.value=e.target?.value,i.value&&!this.instructionHidden&&this.focusInput(),d.S.setLoading(!0),this.onDebouncedSearch(i.value)}setReceiverAddress(e){d.S.setReceiverAddress(e),d.S.setReceiverProfileName(void 0),d.S.setReceiverProfileImageUrl(void 0),d.S.setLoading(!1)}};P.styles=O,M([(0,u.Cb)()],P.prototype,"value",void 0),M([(0,u.SB)()],P.prototype,"instructionHidden",void 0),M([(0,u.SB)()],P.prototype,"pasting",void 0),P=M([(0,p.Mo)("w3m-input-address")],P);var J=r(37069),X=r(16155),N=r(25518),F=r(70075);const Q=o.iv`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    background: transparent;
    width: 100%;
    height: auto;
    font-family: var(--wui-font-family);
    color: var(--wui-color-fg-100);

    font-feature-settings: 'case' on;
    font-size: 32px;
    font-weight: var(--wui-font-weight-light);
    caret-color: var(--wui-color-accent-100);
    line-height: 130%;
    letter-spacing: -1.28px;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: 0px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }
`;var H=function(l,e,i,n){var a,s=arguments.length,t=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(l,e,i,n);else for(var c=l.length-1;c>=0;c--)(a=l[c])&&(t=(s<3?a(t):s>3?a(e,i,t):a(e,i))||t);return s>3&&t&&Object.defineProperty(e,i,t),t};let B=class extends o.oi{constructor(){super(...arguments),this.inputElementRef=(0,w.V)(),this.disabled=!1,this.value="",this.placeholder="0"}render(){return this.inputElementRef?.value&&this.value&&(this.inputElementRef.value.value=this.value),o.dy`<input
      ${(0,w.i)(this.inputElementRef)}
      type="text"
      inputmode="decimal"
      pattern="[0-9,.]*"
      placeholder=${this.placeholder}
      ?disabled=${this.disabled}
      autofocus
      value=${this.value??""}
      @input=${this.dispatchInputChangeEvent.bind(this)}
    /> `}dispatchInputChangeEvent(e){const i=e.data;if(i&&this.inputElementRef?.value)if(","===i){const n=this.inputElementRef.value.value.replace(",",".");this.inputElementRef.value.value=n,this.value=`${this.value}${n}`}else X.ee.test(i)||(this.inputElementRef.value.value=this.value.replace(new RegExp(i.replace(X.Cv,"\\$&"),"gu"),""));this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};B.styles=[N.ET,N.ZM,Q],H([(0,u.Cb)({type:Boolean})],B.prototype,"disabled",void 0),H([(0,u.Cb)({type:String})],B.prototype,"value",void 0),H([(0,u.Cb)({type:String})],B.prototype,"placeholder",void 0),B=H([(0,F.M)("wui-input-amount")],B);r(88198),r(66799);const _=o.iv`
  :host {
    width: 100%;
    height: 100px;
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  :host(:hover) {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-flex {
    width: 100%;
    height: fit-content;
  }

  wui-button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  wui-input-amount {
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

  .totalValue {
    width: 100%;
  }
`;var Y=function(l,e,i,n){var a,s=arguments.length,t=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(l,e,i,n);else for(var c=l.length-1;c>=0;c--)(a=l[c])&&(t=(s<3?a(t):s>3?a(e,i,t):a(e,i))||t);return s>3&&t&&Object.defineProperty(e,i,t),t};let W=class extends o.oi{render(){return o.dy` <wui-flex
      flexDirection="column"
      gap="4xs"
      .padding=${["xl","s","l","l"]}
    >
      <wui-flex alignItems="center">
        <wui-input-amount
          @inputChange=${this.onInputChange.bind(this)}
          ?disabled=${!this.token&&!0}
          .value=${this.sendTokenAmount?String(this.sendTokenAmount):""}
        ></wui-input-amount>
        ${this.buttonTemplate()}
      </wui-flex>
      <wui-flex alignItems="center" justifyContent="space-between">
        ${this.sendValueTemplate()}
        <wui-flex alignItems="center" gap="4xs" justifyContent="flex-end">
          ${this.maxAmountTemplate()} ${this.actionTemplate()}
        </wui-flex>
      </wui-flex>
    </wui-flex>`}buttonTemplate(){return this.token?o.dy`<wui-token-button
        text=${this.token.symbol}
        imageSrc=${this.token.iconUrl}
        @click=${this.handleSelectButtonClick.bind(this)}
      >
      </wui-token-button>`:o.dy`<wui-button
      size="md"
      variant="accent"
      @click=${this.handleSelectButtonClick.bind(this)}
      >Select token</wui-button
    >`}handleSelectButtonClick(){m.RouterController.push("WalletSendSelectToken")}sendValueTemplate(){if(this.token&&this.sendTokenAmount){const i=this.token.price*this.sendTokenAmount;return o.dy`<wui-text class="totalValue" variant="small-400" color="fg-200"
        >${i?`$${p.Hg.formatNumberToLocalString(i,2)}`:"Incorrect value"}</wui-text
      >`}return null}maxAmountTemplate(){return this.token?this.sendTokenAmount&&this.sendTokenAmount>Number(this.token.quantity.numeric)?o.dy` <wui-text variant="small-400" color="error-100">
          ${p.Hg.roundNumber(Number(this.token.quantity.numeric),6,5)}
        </wui-text>`:o.dy` <wui-text variant="small-400" color="fg-200">
        ${p.Hg.roundNumber(Number(this.token.quantity.numeric),6,5)}
      </wui-text>`:null}actionTemplate(){return this.token?this.sendTokenAmount&&this.sendTokenAmount>Number(this.token.quantity.numeric)?o.dy`<wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>`:o.dy`<wui-link @click=${this.onMaxClick.bind(this)}>Max</wui-link>`:null}onInputChange(e){d.S.setTokenAmount(e.detail)}onMaxClick(){if(this.token){const e=J.C.bigNumber(this.token.quantity.numeric);d.S.setTokenAmount(Number(e.toFixed(20)))}}onBuyClick(){m.RouterController.push("OnRampProviders")}};W.styles=_,Y([(0,u.Cb)({type:Object})],W.prototype,"token",void 0),Y([(0,u.Cb)({type:Number})],W.prototype,"sendTokenAmount",void 0),W=Y([(0,p.Mo)("w3m-input-token")],W);const q=o.iv`
  :host {
    display: block;
  }

  wui-flex {
    position: relative;
  }

  wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xs) !important;
    border: 5px solid var(--wui-color-bg-125);
    background: var(--wui-color-bg-175);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }

  wui-button {
    --local-border-radius: var(--wui-border-radius-xs) !important;
  }

  .inputContainer {
    height: fit-content;
  }
`;var S=function(l,e,i,n){var a,s=arguments.length,t=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(l,e,i,n);else for(var c=l.length-1;c>=0;c--)(a=l[c])&&(t=(s<3?a(t):s>3?a(e,i,t):a(e,i))||t);return s>3&&t&&Object.defineProperty(e,i,t),t};let g=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.token=d.S.state.token,this.sendTokenAmount=d.S.state.sendTokenAmount,this.receiverAddress=d.S.state.receiverAddress,this.receiverProfileName=d.S.state.receiverProfileName,this.loading=d.S.state.loading,this.message="Preview Send",this.fetchNetworkPrice(),this.fetchBalances(),this.unsubscribe.push(d.S.subscribe(e=>{this.token=e.token,this.sendTokenAmount=e.sendTokenAmount,this.receiverAddress=e.receiverAddress,this.receiverProfileName=e.receiverProfileName,this.loading=e.loading}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return this.getMessage(),o.dy` <wui-flex flexDirection="column" .padding=${["0","l","l","l"]}>
      <wui-flex class="inputContainer" gap="xs" flexDirection="column">
        <w3m-input-token
          .token=${this.token}
          .sendTokenAmount=${this.sendTokenAmount}
        ></w3m-input-token>
        <wui-icon-box
          size="inherit"
          backgroundColor="fg-300"
          iconSize="lg"
          iconColor="fg-250"
          background="opaque"
          icon="arrowBottom"
        ></wui-icon-box>
        <w3m-input-address
          .value=${this.receiverProfileName?this.receiverProfileName:this.receiverAddress}
        ></w3m-input-address>
      </wui-flex>
      <wui-flex .margin=${["l","0","0","0"]}>
        <wui-button
          @click=${this.onButtonClick.bind(this)}
          ?disabled=${!this.message.startsWith("Preview Send")}
          size="lg"
          variant="main"
          ?loading=${this.loading}
          fullWidth
        >
          ${this.message}
        </wui-button>
      </wui-flex>
    </wui-flex>`}fetchBalances(){return(0,h.Z)(function*(){yield d.S.fetchTokenBalance(),d.S.fetchNetworkBalance()})()}fetchNetworkPrice(){return(0,h.Z)(function*(){yield U.nY.getNetworkTokenPrice()})()}onButtonClick(){m.RouterController.push("WalletSendPreview")}getMessage(){this.message="Preview Send",this.receiverAddress&&!T.j.isAddress(this.receiverAddress,f.R.state.activeChain)&&(this.message="Invalid Address"),this.receiverAddress||(this.message="Add Address"),this.sendTokenAmount&&this.token&&this.sendTokenAmount>Number(this.token.quantity.numeric)&&(this.message="Insufficient Funds"),this.sendTokenAmount||(this.message="Add Amount"),this.sendTokenAmount&&this.token?.price&&(this.sendTokenAmount*this.token.price||(this.message="Incorrect Value")),this.token||(this.message="Select Token")}};g.styles=q,S([(0,u.SB)()],g.prototype,"token",void 0),S([(0,u.SB)()],g.prototype,"sendTokenAmount",void 0),S([(0,u.SB)()],g.prototype,"receiverAddress",void 0),S([(0,u.SB)()],g.prototype,"receiverProfileName",void 0),S([(0,u.SB)()],g.prototype,"loading",void 0),S([(0,u.SB)()],g.prototype,"message",void 0),g=S([(0,p.Mo)("w3m-wallet-send-view")],g);r(44448),r(55155),r(3715);const ee=o.iv`
  .contentContainer {
    height: 440px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }

  wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }
`;var D=function(l,e,i,n){var a,s=arguments.length,t=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(l,e,i,n);else for(var c=l.length-1;c>=0;c--)(a=l[c])&&(t=(s<3?a(t):s>3?a(e,i,t):a(e,i))||t);return s>3&&t&&Object.defineProperty(e,i,t),t};let b=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tokenBalances=d.S.state.tokenBalances,this.search="",this.onDebouncedSearch=T.j.debounce(e=>{this.search=e}),this.unsubscribe.push(d.S.subscribe(e=>{this.tokenBalances=e.tokenBalances}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return o.dy`
      <wui-flex flexDirection="column">
        ${this.templateSearchInput()} <wui-separator></wui-separator> ${this.templateTokens()}
      </wui-flex>
    `}templateSearchInput(){return o.dy`
      <wui-flex gap="xs" padding="s">
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="sm"
          placeholder="Search token"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `}templateTokens(){return this.tokens=this.tokenBalances?.filter(e=>e.chainId===f.R.state.activeCaipNetwork?.caipNetworkId),this.search?this.filteredTokens=this.tokenBalances?.filter(e=>e.name.toLowerCase().includes(this.search.toLowerCase())):this.filteredTokens=this.tokens,o.dy`
      <wui-flex
        class="contentContainer"
        flexDirection="column"
        .padding=${["0","s","0","s"]}
      >
        <wui-flex justifyContent="flex-start" .padding=${["m","s","s","s"]}>
          <wui-text variant="paragraph-500" color="fg-200">Your tokens</wui-text>
        </wui-flex>
        <wui-flex flexDirection="column" gap="xs">
          ${this.filteredTokens&&this.filteredTokens.length>0?this.filteredTokens.map(e=>o.dy`<wui-list-token
                    @click=${this.handleTokenClick.bind(this,e)}
                    ?clickable=${!0}
                    tokenName=${e.name}
                    tokenImageUrl=${e.iconUrl}
                    tokenAmount=${e.quantity.numeric}
                    tokenValue=${e.value}
                    tokenCurrency=${e.symbol}
                  ></wui-list-token>`):o.dy`<wui-flex
                .padding=${["4xl","0","0","0"]}
                alignItems="center"
                flexDirection="column"
                gap="l"
              >
                <wui-icon-box
                  icon="coinPlaceholder"
                  size="inherit"
                  iconColor="fg-200"
                  backgroundColor="fg-200"
                  iconSize="lg"
                ></wui-icon-box>
                <wui-flex
                  class="textContent"
                  gap="xs"
                  flexDirection="column"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <wui-text variant="paragraph-500" align="center" color="fg-100"
                    >No tokens found</wui-text
                  >
                  <wui-text variant="small-400" align="center" color="fg-200"
                    >Your tokens will appear here</wui-text
                  >
                </wui-flex>
                <wui-link @click=${this.onBuyClick.bind(this)}>Buy</wui-link>
              </wui-flex>`}
        </wui-flex>
      </wui-flex>
    `}onBuyClick(){m.RouterController.push("OnRampProviders")}onInputChange(e){this.onDebouncedSearch(e.detail)}handleTokenClick(e){d.S.setToken(e),d.S.setTokenAmount(void 0),m.RouterController.goBack()}};b.styles=ee,D([(0,u.SB)()],b.prototype,"tokenBalances",void 0),D([(0,u.SB)()],b.prototype,"tokens",void 0),D([(0,u.SB)()],b.prototype,"filteredTokens",void 0),D([(0,u.SB)()],b.prototype,"search",void 0),b=D([(0,p.Mo)("w3m-wallet-send-select-token-view")],b);var K=r(76169),te=r(79282),ie=r(22917);r(72686),r(11252),r(10831),r(79348),r(35205);const ne=o.iv`
  :host {
    display: flex;
    gap: var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-2xs) var(--wui-spacing-xs) var(--wui-spacing-2xs)
      var(--wui-spacing-s);
    align-items: center;
  }

  wui-avatar,
  wui-icon,
  wui-image {
    width: 32px;
    height: 32px;
    border: 1px solid var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-002);
  }
`;var V=function(l,e,i,n){var a,s=arguments.length,t=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(l,e,i,n);else for(var c=l.length-1;c>=0;c--)(a=l[c])&&(t=(s<3?a(t):s>3?a(e,i,t):a(e,i))||t);return s>3&&t&&Object.defineProperty(e,i,t),t};let $=class extends o.oi{constructor(){super(...arguments),this.text="",this.address="",this.isAddress=!1}render(){return o.dy`<wui-text variant="large-500" color="fg-100">${this.text}</wui-text>
      ${this.imageTemplate()}`}imageTemplate(){return this.isAddress?o.dy`<wui-avatar address=${this.address} .imageSrc=${this.imageSrc}></wui-avatar>`:this.imageSrc?o.dy`<wui-image src=${this.imageSrc}></wui-image>`:o.dy`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`}};$.styles=[N.ET,N.ZM,ne],V([(0,u.Cb)()],$.prototype,"text",void 0),V([(0,u.Cb)()],$.prototype,"address",void 0),V([(0,u.Cb)()],$.prototype,"imageSrc",void 0),V([(0,u.Cb)({type:Boolean})],$.prototype,"isAddress",void 0),$=V([(0,F.M)("wui-preview-item")],$);var oe=r(64599),re=r(23107),se=r(17111);const ae=o.iv`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    padding: 17px 18px 17px var(--wui-spacing-m);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
  }

  wui-image {
    width: var(--wui-icon-size-lg);
    height: var(--wui-icon-size-lg);
    border-radius: var(--wui-border-radius-3xl);
  }

  wui-icon {
    width: var(--wui-icon-size-lg);
    height: var(--wui-icon-size-lg);
  }
`;var L=function(l,e,i,n){var a,s=arguments.length,t=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(l,e,i,n);else for(var c=l.length-1;c>=0;c--)(a=l[c])&&(t=(s<3?a(t):s>3?a(e,i,t):a(e,i))||t);return s>3&&t&&Object.defineProperty(e,i,t),t};let E=class extends o.oi{constructor(){super(...arguments),this.imageSrc=void 0,this.textTitle="",this.textValue=void 0}render(){return o.dy`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="paragraph-500" color=${this.textValue?"fg-200":"fg-100"}>
          ${this.textTitle}
        </wui-text>
        ${this.templateContent()}
      </wui-flex>
    `}templateContent(){return this.imageSrc?o.dy`<wui-image src=${this.imageSrc} alt=${this.textTitle}></wui-image>`:this.textValue?o.dy` <wui-text variant="paragraph-400" color="fg-100"> ${this.textValue} </wui-text>`:o.dy`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`}};E.styles=[N.ET,N.ZM,ae],L([(0,u.Cb)()],E.prototype,"imageSrc",void 0),L([(0,u.Cb)()],E.prototype,"textTitle",void 0),L([(0,u.Cb)()],E.prototype,"textValue",void 0),E=L([(0,F.M)("wui-list-content")],E);const le=o.iv`
  :host {
    display: flex;
    width: auto;
    flex-direction: column;
    gap: var(--wui-border-radius-1xs);
    border-radius: var(--wui-border-radius-s);
    background: var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-s) var(--wui-spacing-1xs) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }

  wui-text {
    padding: 0 var(--wui-spacing-1xs);
  }

  wui-flex {
    margin-top: var(--wui-spacing-1xs);
  }

  .network {
    cursor: pointer;
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  .network:focus-visible {
    border: 1px solid var(--wui-color-accent-100);
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  .network:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .network:active {
    background-color: var(--wui-color-gray-glass-010);
  }
`;var G=function(l,e,i,n){var a,s=arguments.length,t=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(l,e,i,n);else for(var c=l.length-1;c>=0;c--)(a=l[c])&&(t=(s<3?a(t):s>3?a(e,i,t):a(e,i))||t);return s>3&&t&&Object.defineProperty(e,i,t),t};let z=class extends o.oi{render(){return o.dy` <wui-text variant="small-400" color="fg-200">Details</wui-text>
      <wui-flex flexDirection="column" gap="xxs">
        <wui-list-content
          textTitle="Address"
          textValue=${p.Hg.getTruncateString({string:this.receiverAddress??"",charsStart:4,charsEnd:4,truncate:"middle"})}
        >
        </wui-list-content>
        ${this.networkTemplate()}
      </wui-flex>`}networkTemplate(){return this.caipNetwork?.name?o.dy` <wui-list-content
        @click=${()=>this.onNetworkClick(this.caipNetwork)}
        class="network"
        textTitle="Network"
        imageSrc=${(0,re.o)(se.f.getNetworkImage(this.caipNetwork))}
      ></wui-list-content>`:null}onNetworkClick(e){e&&m.RouterController.push("Networks",{network:e})}};z.styles=le,G([(0,u.Cb)()],z.prototype,"receiverAddress",void 0),G([(0,u.Cb)({type:Object})],z.prototype,"caipNetwork",void 0),z=G([(0,p.Mo)("w3m-wallet-send-details")],z);const ue=o.iv`
  wui-avatar,
  wui-image {
    display: ruby;
    width: 32px;
    height: 32px;
    border-radius: var(--wui-border-radius-3xl);
  }

  .sendButton {
    width: 70%;
    --local-width: 100% !important;
    --local-border-radius: var(--wui-border-radius-xs) !important;
  }

  .cancelButton {
    width: 30%;
    --local-width: 100% !important;
    --local-border-radius: var(--wui-border-radius-xs) !important;
  }
`;var k=function(l,e,i,n){var a,s=arguments.length,t=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(l,e,i,n);else for(var c=l.length-1;c>=0;c--)(a=l[c])&&(t=(s<3?a(t):s>3?a(e,i,t):a(e,i))||t);return s>3&&t&&Object.defineProperty(e,i,t),t};let v=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.token=d.S.state.token,this.sendTokenAmount=d.S.state.sendTokenAmount,this.receiverAddress=d.S.state.receiverAddress,this.receiverProfileName=d.S.state.receiverProfileName,this.receiverProfileImageUrl=d.S.state.receiverProfileImageUrl,this.caipNetwork=f.R.state.activeCaipNetwork,this.loading=d.S.state.loading,this.unsubscribe.push(d.S.subscribe(e=>{this.token=e.token,this.sendTokenAmount=e.sendTokenAmount,this.receiverAddress=e.receiverAddress,this.receiverProfileName=e.receiverProfileName,this.receiverProfileImageUrl=e.receiverProfileImageUrl,this.loading=e.loading}),f.R.subscribeKey("activeCaipNetwork",e=>this.caipNetwork=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return o.dy` <wui-flex flexDirection="column" .padding=${["0","l","l","l"]}>
      <wui-flex gap="xs" flexDirection="column" .padding=${["0","xs","0","xs"]}>
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-flex flexDirection="column" gap="4xs">
            <wui-text variant="small-400" color="fg-150">Send</wui-text>
            ${this.sendValueTemplate()}
          </wui-flex>
          <wui-preview-item
            text="${this.sendTokenAmount?p.Hg.roundNumber(this.sendTokenAmount,6,5):"unknown"} ${this.token?.symbol}"
            .imageSrc=${this.token?.iconUrl}
          ></wui-preview-item>
        </wui-flex>
        <wui-flex>
          <wui-icon color="fg-200" size="md" name="arrowBottom"></wui-icon>
        </wui-flex>
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="small-400" color="fg-150">To</wui-text>
          <wui-preview-item
            text="${this.receiverProfileName?p.Hg.getTruncateString({string:this.receiverProfileName,charsStart:20,charsEnd:0,truncate:"end"}):p.Hg.getTruncateString({string:this.receiverAddress?this.receiverAddress:"",charsStart:4,charsEnd:4,truncate:"middle"})}"
            address=${this.receiverAddress??""}
            .imageSrc=${this.receiverProfileImageUrl??void 0}
            .isAddress=${!0}
          ></wui-preview-item>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" .padding=${["xxl","0","0","0"]}>
        <w3m-wallet-send-details
          .caipNetwork=${this.caipNetwork}
          .receiverAddress=${this.receiverAddress}
        ></w3m-wallet-send-details>
        <wui-flex justifyContent="center" gap="xxs" .padding=${["s","0","0","0"]}>
          <wui-icon size="sm" color="fg-200" name="warningCircle"></wui-icon>
          <wui-text variant="small-400" color="fg-200">Review transaction carefully</wui-text>
        </wui-flex>
        <wui-flex justifyContent="center" gap="s" .padding=${["l","0","0","0"]}>
          <wui-button
            class="cancelButton"
            @click=${this.onCancelClick.bind(this)}
            size="lg"
            variant="neutral"
          >
            Cancel
          </wui-button>
          <wui-button
            class="sendButton"
            @click=${this.onSendClick.bind(this)}
            size="lg"
            variant="main"
            .loading=${this.loading}
          >
            Send
          </wui-button>
        </wui-flex>
      </wui-flex></wui-flex
    >`}sendValueTemplate(){if(this.token&&this.sendTokenAmount){const i=this.token.price*this.sendTokenAmount;return o.dy`<wui-text variant="paragraph-400" color="fg-100"
        >$${i.toFixed(2)}</wui-text
      >`}return null}onSendClick(){var e=this;return(0,h.Z)(function*(){if(e.sendTokenAmount&&e.receiverAddress)try{yield d.S.sendToken(),K.SnackController.showSuccess("Transaction started"),m.RouterController.replace("Account")}catch(i){K.SnackController.showError("Failed to send transaction. Please try again."),console.error("SendController:sendToken - failed to send transaction",i);const n=f.R.state.activeChain,s=i instanceof Error?i.message:"Unknown error";te.X.sendEvent({type:"track",event:"SEND_ERROR",properties:{message:s,isSmartAccount:ie.AccountController.state.preferredAccountTypes?.[n]===oe.y_.ACCOUNT_TYPES.SMART_ACCOUNT,token:e.token?.symbol||"",amount:e.sendTokenAmount,network:f.R.state.activeCaipNetwork?.caipNetworkId||""}})}else K.SnackController.showError("Please enter a valid amount and receiver address")})()}onCancelClick(){m.RouterController.goBack()}};v.styles=ue,k([(0,u.SB)()],v.prototype,"token",void 0),k([(0,u.SB)()],v.prototype,"sendTokenAmount",void 0),k([(0,u.SB)()],v.prototype,"receiverAddress",void 0),k([(0,u.SB)()],v.prototype,"receiverProfileName",void 0),k([(0,u.SB)()],v.prototype,"receiverProfileImageUrl",void 0),k([(0,u.SB)()],v.prototype,"caipNetwork",void 0),k([(0,u.SB)()],v.prototype,"loading",void 0),v=k([(0,p.Mo)("w3m-wallet-send-preview-view")],v)},6500:(Z,A,r)=>{r(87538)},88198:(Z,A,r)=>{var h=r(59799),o=r(86523),u=r(23107),U=(r(10831),r(25518)),m=r(70075);const T=h.iv`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`;var f=function(I,y,R,w){var j,C=arguments.length,x=C<3?y:null===w?w=Object.getOwnPropertyDescriptor(y,R):w;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)x=Reflect.decorate(I,y,R,w);else for(var O=I.length-1;O>=0;O--)(j=I[O])&&(x=(C<3?j(x):C>3?j(y,R,x):j(y,R))||x);return C>3&&x&&Object.defineProperty(y,R,x),x};let p=class extends h.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return h.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,u.o)(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};p.styles=[U.ET,U.ZM,T],f([(0,o.Cb)()],p.prototype,"tabIdx",void 0),f([(0,o.Cb)({type:Boolean})],p.prototype,"disabled",void 0),f([(0,o.Cb)()],p.prototype,"color",void 0),p=f([(0,m.M)("wui-link")],p)},16155:(Z,A,r)=>{r.d(A,{Cv:()=>h,Ub:()=>u,ee:()=>o});const h=/[.*+?^${}()|[\]\\]/gu,o=/[0-9,.]/u,u="https://reown.com"}}]);