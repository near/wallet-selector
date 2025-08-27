"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4708],{53108:function(e,t,i){i.d(t,{U:function(){return o}});let o={URLS:{FAQ:"https://walletconnect.com/faq"}}},88641:function(e,t,i){i.d(t,{y0:function(){return w}});var o=i(16541),a=i(69479),r=i(2706),n=i(44984),s=i(86126),l=i(77405),c=i(25721),d=i(23704),u=i(46719);async function h(){l.P.push("ConnectingFarcaster");let e=n.A.getAuthConnector();if(e&&!a.N.state.farcasterUrl)try{let{url:t}=await e.provider.getFarcasterUri();a.N.setFarcasterUrl(t,r.R.state.activeChain)}catch(e){l.P.goBack(),c.K.showError(e)}}async function p(e){l.P.push("ConnectingSocial");let t=n.A.getAuthConnector(),i=null;try{let n=setTimeout(()=>{throw Error("Social login timed out. Please try again.")},45e3);if(t&&e){if(d.j.isTelegram()||(i=function(){try{return d.j.returnOpenHref(`${o.b.SECURE_SITE_SDK_ORIGIN}/loading`,"popupWindow","width=600,height=800,scrollbars=yes")}catch(e){throw Error("Could not open social popup")}}()),i)a.N.setSocialWindow(i,r.R.state.activeChain);else if(!d.j.isTelegram())throw Error("Could not create social popup");let{uri:s}=await t.provider.getSocialRedirectUri({provider:e});if(!s)throw i?.close(),Error("Could not fetch the social redirect uri");if(i&&(i.location.href=s),d.j.isTelegram()){u.M.setTelegramSocialProvider(e);let t=d.j.formatTelegramSocialLoginUrl(s);d.j.openHref(t,"_top")}clearTimeout(n)}}catch(e){i?.close(),c.K.showError(e?.message)}}async function w(e){a.N.setSocialProvider(e,r.R.state.activeChain),s.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_STARTED",properties:{provider:e}}),"farcaster"===e?await h():await p(e)}},84708:function(e,t,i){i.r(t),i.d(t,{AppKitAccountButton:function(){return k},AppKitButton:function(){return T},AppKitConnectButton:function(){return B},AppKitNetworkButton:function(){return K},W3mAccountButton:function(){return C},W3mAccountSettingsView:function(){return el},W3mAccountView:function(){return eU},W3mAllWalletsView:function(){return tT},W3mButton:function(){return A},W3mChooseAccountNameView:function(){return i3},W3mConnectButton:function(){return j},W3mConnectView:function(){return ix},W3mConnectWalletsView:function(){return oe},W3mConnectingExternalView:function(){return iN},W3mConnectingMultiChainView:function(){return iB},W3mConnectingWcBasicView:function(){return iQ},W3mConnectingWcView:function(){return iX},W3mDownloadsView:function(){return i1},W3mGetWalletView:function(){return i2},W3mNetworkButton:function(){return F},W3mNetworkSwitchView:function(){return or},W3mNetworksView:function(){return oh},W3mProfileWalletsView:function(){return e4},W3mRouter:function(){return V.A},W3mSIWXSignMessageView:function(){return oj},W3mSwitchActiveChainView:function(){return ob},W3mUnsupportedChainView:function(){return ox},W3mWalletCompatibleNetworksView:function(){return oR},W3mWhatIsANetworkView:function(){return om},W3mWhatIsAWalletView:function(){return i7}});var o=i(44920),a=i(30077),r=i(52608),n=i(556),s=i(2706),l=i(91588),c=i(93934),d=i(69479),u=i(23704),h=i(91368),p=i(93907);i(50992),i(54521),i(99671),i(55802);var w=i(17770),g=i(57172),b=i(66501);i(20860),i(42559);var f=o.iv`
  :host {
    display: block;
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
    background: var(--wui-color-gray-glass-002);
    display: flex;
    gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-3xs) var(--wui-spacing-xs) var(--wui-spacing-3xs)
      var(--wui-spacing-xs);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  button:disabled {
    background: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-image,
  button:disabled > wui-flex > wui-avatar {
    filter: grayscale(1);
  }

  button:has(wui-image) {
    padding: var(--wui-spacing-3xs) var(--wui-spacing-3xs) var(--wui-spacing-3xs)
      var(--wui-spacing-xs);
  }

  wui-text {
    color: var(--wui-color-fg-100);
  }

  wui-flex > wui-text {
    color: var(--wui-color-fg-200);
  }

  wui-image,
  wui-icon-box {
    border-radius: var(--wui-border-radius-3xl);
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  wui-flex {
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-005);
    background: var(--wui-color-gray-glass-005);
    padding: 4px var(--wui-spacing-m) 4px var(--wui-spacing-xxs);
  }

  button.local-no-balance {
    border-radius: 0px;
    border: none;
    background: transparent;
  }

  wui-avatar {
    width: 20px;
    height: 20px;
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-010);
  }

  @media (max-width: 500px) {
    button {
      gap: 0px;
      padding: var(--wui-spacing-3xs) var(--wui-spacing-xs) !important;
      height: 32px;
    }
    wui-image,
    wui-icon-box,
    button > wui-text {
      visibility: hidden;
      width: 0px;
      height: 0px;
    }
    button {
      border-radius: 0px;
      border: none;
      background: transparent;
      padding: 0px;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled > wui-flex > wui-text {
      color: var(--wui-color-fg-175);
    }

    button:active:enabled > wui-flex > wui-text {
      color: var(--wui-color-fg-175);
    }
  }
`,m=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let v=class extends o.oi{constructor(){super(...arguments),this.networkSrc=void 0,this.avatarSrc=void 0,this.balance=void 0,this.isUnsupportedChain=void 0,this.disabled=!1,this.loading=!1,this.address="",this.profileName="",this.charsStart=4,this.charsEnd=6}render(){return o.dy`
      <button
        ?disabled=${this.disabled}
        class=${(0,r.o)(this.balance?void 0:"local-no-balance")}
      >
        ${this.balanceTemplate()}
        <wui-flex gap="xxs" alignItems="center">
          <wui-avatar
            .imageSrc=${this.avatarSrc}
            alt=${this.address}
            address=${this.address}
          ></wui-avatar>
          <wui-text variant="paragraph-600" color="inherit">
            ${this.address?g.H.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?18:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"}):null}
          </wui-text>
        </wui-flex>
      </button>
    `}balanceTemplate(){if(this.isUnsupportedChain)return o.dy` <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
          data-testid="wui-account-button-unsupported-chain"
        ></wui-icon-box>
        <wui-text variant="paragraph-600" color="inherit"> Switch Network</wui-text>`;if(this.balance){let e=this.networkSrc?o.dy`<wui-image src=${this.networkSrc}></wui-image>`:o.dy`
            <wui-icon-box
              size="sm"
              iconColor="fg-200"
              backgroundColor="fg-300"
              icon="networkPlaceholder"
            ></wui-icon-box>
          `,t=this.loading?o.dy`<wui-loading-spinner size="md" color="fg-200"></wui-loading-spinner>`:o.dy`<wui-text variant="paragraph-600" color="inherit"> ${this.balance}</wui-text>`;return o.dy`${e} ${t}`}return null}};v.styles=[w.ET,w.ZM,f],m([(0,a.Cb)()],v.prototype,"networkSrc",void 0),m([(0,a.Cb)()],v.prototype,"avatarSrc",void 0),m([(0,a.Cb)()],v.prototype,"balance",void 0),m([(0,a.Cb)({type:Boolean})],v.prototype,"isUnsupportedChain",void 0),m([(0,a.Cb)({type:Boolean})],v.prototype,"disabled",void 0),m([(0,a.Cb)({type:Boolean})],v.prototype,"loading",void 0),m([(0,a.Cb)()],v.prototype,"address",void 0),m([(0,a.Cb)()],v.prototype,"profileName",void 0),m([(0,a.Cb)()],v.prototype,"charsStart",void 0),m([(0,a.Cb)()],v.prototype,"charsEnd",void 0),v=m([(0,b.M)("wui-account-button")],v);var y=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};class x extends o.oi{constructor(){super(...arguments),this.unsubscribe=[],this.disabled=!1,this.balance="show",this.charsStart=4,this.charsEnd=6,this.namespace=void 0,this.isSupported=!!n.h.state.allowUnsupportedChain||!s.R.state.activeChain||s.R.checkIfSupportedNetwork(s.R.state.activeChain)}connectedCallback(){super.connectedCallback(),this.setAccountData(s.R.getAccountData(this.namespace)),this.setNetworkData(s.R.getNetworkData(this.namespace))}firstUpdated(){let e=this.namespace;e?this.unsubscribe.push(s.R.subscribeChainProp("accountState",e=>{this.setAccountData(e)},e),s.R.subscribeChainProp("networkState",t=>{this.setNetworkData(t),this.isSupported=s.R.checkIfSupportedNetwork(e,t?.caipNetwork)},e)):this.unsubscribe.push(l.W.subscribeNetworkImages(()=>{this.networkImage=c.f.getNetworkImage(this.network)}),s.R.subscribeKey("activeCaipAddress",e=>{this.caipAddress=e}),d.N.subscribeKey("balance",e=>this.balanceVal=e),d.N.subscribeKey("balanceSymbol",e=>this.balanceSymbol=e),d.N.subscribeKey("profileName",e=>this.profileName=e),d.N.subscribeKey("profileImage",e=>this.profileImage=e),s.R.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=c.f.getNetworkImage(e),this.isSupported=!e?.chainNamespace||s.R.checkIfSupportedNetwork(e?.chainNamespace),this.fetchNetworkImage(e)}))}updated(){this.fetchNetworkImage(this.network)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!s.R.state.activeChain)return null;let e="show"===this.balance,t="string"!=typeof this.balanceVal;return o.dy`
      <wui-account-button
        .disabled=${!!this.disabled}
        .isUnsupportedChain=${!n.h.state.allowUnsupportedChain&&!this.isSupported}
        address=${(0,r.o)(u.j.getPlainAddress(this.caipAddress))}
        profileName=${(0,r.o)(this.profileName)}
        networkSrc=${(0,r.o)(this.networkImage)}
        avatarSrc=${(0,r.o)(this.profileImage)}
        balance=${e?u.j.formatBalance(this.balanceVal,this.balanceSymbol):""}
        @click=${this.onClick.bind(this)}
        data-testid=${`account-button${this.namespace?`-${this.namespace}`:""}`}
        .charsStart=${this.charsStart}
        .charsEnd=${this.charsEnd}
        ?loading=${t}
      >
      </wui-account-button>
    `}onClick(){this.isSupported||n.h.state.allowUnsupportedChain?h.I.open({namespace:this.namespace}):h.I.open({view:"UnsupportedChain"})}async fetchNetworkImage(e){e?.assets?.imageId&&(this.networkImage=await c.f.fetchNetworkImage(e?.assets?.imageId))}setAccountData(e){e&&(this.caipAddress=e.caipAddress,this.balanceVal=e.balance,this.balanceSymbol=e.balanceSymbol,this.profileName=e.profileName,this.profileImage=e.profileImage)}setNetworkData(e){e&&(this.network=e.caipNetwork,this.networkImage=c.f.getNetworkImage(e.caipNetwork))}}y([(0,a.Cb)({type:Boolean})],x.prototype,"disabled",void 0),y([(0,a.Cb)()],x.prototype,"balance",void 0),y([(0,a.Cb)()],x.prototype,"charsStart",void 0),y([(0,a.Cb)()],x.prototype,"charsEnd",void 0),y([(0,a.Cb)()],x.prototype,"namespace",void 0),y([(0,a.SB)()],x.prototype,"caipAddress",void 0),y([(0,a.SB)()],x.prototype,"balanceVal",void 0),y([(0,a.SB)()],x.prototype,"balanceSymbol",void 0),y([(0,a.SB)()],x.prototype,"profileName",void 0),y([(0,a.SB)()],x.prototype,"profileImage",void 0),y([(0,a.SB)()],x.prototype,"network",void 0),y([(0,a.SB)()],x.prototype,"networkImage",void 0),y([(0,a.SB)()],x.prototype,"isSupported",void 0);let C=class extends x{};C=y([(0,p.Mo)("w3m-account-button")],C);let k=class extends x{};k=y([(0,p.Mo)("appkit-account-button")],k);var $=o.iv`
  :host {
    display: block;
    width: max-content;
  }
`,S=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};class R extends o.oi{constructor(){super(...arguments),this.unsubscribe=[],this.disabled=!1,this.balance=void 0,this.size=void 0,this.label=void 0,this.loadingLabel=void 0,this.charsStart=4,this.charsEnd=6,this.namespace=void 0}connectedCallback(){super.connectedCallback(),this.caipAddress=this.namespace?s.R.state.chains.get(this.namespace)?.accountState?.caipAddress:s.R.state.activeCaipAddress}firstUpdated(){this.namespace?this.unsubscribe.push(s.R.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress},this.namespace)):this.unsubscribe.push(s.R.subscribeKey("activeCaipAddress",e=>this.caipAddress=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return this.caipAddress?o.dy`
          <appkit-account-button
            .disabled=${!!this.disabled}
            balance=${(0,r.o)(this.balance)}
            .charsStart=${(0,r.o)(this.charsStart)}
            .charsEnd=${(0,r.o)(this.charsEnd)}
            namespace=${(0,r.o)(this.namespace)}
          >
          </appkit-account-button>
        `:o.dy`
          <appkit-connect-button
            size=${(0,r.o)(this.size)}
            label=${(0,r.o)(this.label)}
            loadingLabel=${(0,r.o)(this.loadingLabel)}
            namespace=${(0,r.o)(this.namespace)}
          ></appkit-connect-button>
        `}}R.styles=$,S([(0,a.Cb)({type:Boolean})],R.prototype,"disabled",void 0),S([(0,a.Cb)()],R.prototype,"balance",void 0),S([(0,a.Cb)()],R.prototype,"size",void 0),S([(0,a.Cb)()],R.prototype,"label",void 0),S([(0,a.Cb)()],R.prototype,"loadingLabel",void 0),S([(0,a.Cb)()],R.prototype,"charsStart",void 0),S([(0,a.Cb)()],R.prototype,"charsEnd",void 0),S([(0,a.Cb)()],R.prototype,"namespace",void 0),S([(0,a.SB)()],R.prototype,"caipAddress",void 0);let A=class extends R{};A=S([(0,p.Mo)("w3m-button")],A);let T=class extends R{};T=S([(0,p.Mo)("appkit-button")],T);var I=o.iv`
  :host {
    position: relative;
    display: block;
  }

  button {
    background: var(--wui-color-accent-100);
    border: 1px solid var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-m);
    gap: var(--wui-spacing-xs);
  }

  button.loading {
    background: var(--wui-color-gray-glass-010);
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  button:disabled > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button:active:enabled {
      background-color: var(--wui-color-accent-080);
    }
  }

  button:focus-visible {
    border: 1px solid var(--wui-color-gray-glass-010);
    background-color: var(--wui-color-accent-090);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  button[data-size='sm'] {
    padding: 6.75px 10px 7.25px;
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
    color: var(--wui-color-inverse-100);
  }

  button[data-size='md'] {
    padding: 9px var(--wui-spacing-l) 9px var(--wui-spacing-l);
  }

  button[data-size='md'] + wui-text {
    padding-left: var(--wui-spacing-3xs);
  }

  @media (max-width: 500px) {
    button[data-size='md'] {
      height: 32px;
      padding: 5px 12px;
    }

    button[data-size='md'] > wui-text > slot {
      font-size: 14px !important;
    }
  }

  wui-loading-spinner {
    width: 14px;
    height: 14px;
  }

  wui-loading-spinner::slotted(svg) {
    width: 10px !important;
    height: 10px !important;
  }

  button[data-size='sm'] > wui-loading-spinner {
    width: 12px;
    height: 12px;
  }
`,E=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let O=class extends o.oi{constructor(){super(...arguments),this.size="md",this.loading=!1}render(){let e="md"===this.size?"paragraph-600":"small-600";return o.dy`
      <button data-size=${this.size} ?disabled=${this.loading}>
        ${this.loadingTemplate()}
        <wui-text variant=${e} color=${this.loading?"accent-100":"inherit"}>
          <slot></slot>
        </wui-text>
      </button>
    `}loadingTemplate(){return this.loading?o.dy`<wui-loading-spinner size=${this.size} color="accent-100"></wui-loading-spinner>`:null}};O.styles=[w.ET,w.ZM,I],E([(0,a.Cb)()],O.prototype,"size",void 0),E([(0,a.Cb)({type:Boolean})],O.prototype,"loading",void 0),O=E([(0,b.M)("wui-connect-button")],O);var N=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};class P extends o.oi{constructor(){super(),this.unsubscribe=[],this.size="md",this.label="Connect Wallet",this.loadingLabel="Connecting...",this.open=h.I.state.open,this.loading=this.namespace?h.I.state.loadingNamespaceMap.get(this.namespace):h.I.state.loading,this.unsubscribe.push(h.I.subscribe(e=>{this.open=e.open,this.loading=this.namespace?e.loadingNamespaceMap.get(this.namespace):e.loading}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return o.dy`
      <wui-connect-button
        size=${(0,r.o)(this.size)}
        .loading=${this.loading}
        @click=${this.onClick.bind(this)}
        data-testid=${`connect-button${this.namespace?`-${this.namespace}`:""}`}
      >
        ${this.loading?this.loadingLabel:this.label}
      </wui-connect-button>
    `}onClick(){this.open?h.I.close():this.loading||h.I.open({view:"Connect",namespace:this.namespace})}}N([(0,a.Cb)()],P.prototype,"size",void 0),N([(0,a.Cb)()],P.prototype,"label",void 0),N([(0,a.Cb)()],P.prototype,"loadingLabel",void 0),N([(0,a.Cb)()],P.prototype,"namespace",void 0),N([(0,a.SB)()],P.prototype,"open",void 0),N([(0,a.SB)()],P.prototype,"loading",void 0);let j=class extends P{};j=N([(0,p.Mo)("w3m-connect-button")],j);let B=class extends P{};B=N([(0,p.Mo)("appkit-connect-button")],B);var D=i(86126),L=o.iv`
  :host {
    display: block;
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
    display: flex;
    gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-2xs) var(--wui-spacing-s) var(--wui-spacing-2xs)
      var(--wui-spacing-xs);
    border: 1px solid var(--wui-color-gray-glass-010);
    background-color: var(--wui-color-gray-glass-005);
    color: var(--wui-color-fg-100);
  }

  button:disabled {
    border: 1px solid var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-gray-glass-010);
    }

    button:active:enabled {
      background-color: var(--wui-color-gray-glass-015);
    }
  }

  wui-image,
  wui-icon-box {
    border-radius: var(--wui-border-radius-3xl);
    width: 24px;
    height: 24px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }
`,W=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let M=class extends o.oi{constructor(){super(...arguments),this.imageSrc=void 0,this.isUnsupportedChain=void 0,this.disabled=!1}render(){return o.dy`
      <button data-testid="wui-network-button" ?disabled=${this.disabled}>
        ${this.visualTemplate()}
        <wui-text variant="paragraph-600" color="inherit">
          <slot></slot>
        </wui-text>
      </button>
    `}visualTemplate(){return this.isUnsupportedChain?o.dy`
        <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
        ></wui-icon-box>
      `:this.imageSrc?o.dy`<wui-image src=${this.imageSrc}></wui-image>`:o.dy`
      <wui-icon-box
        size="sm"
        iconColor="inverse-100"
        backgroundColor="fg-100"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `}};M.styles=[w.ET,w.ZM,L],W([(0,a.Cb)()],M.prototype,"imageSrc",void 0),W([(0,a.Cb)({type:Boolean})],M.prototype,"isUnsupportedChain",void 0),W([(0,a.Cb)({type:Boolean})],M.prototype,"disabled",void 0),M=W([(0,b.M)("wui-network-button")],M);var z=o.iv`
  :host {
    display: block;
    width: max-content;
  }
`,U=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};class _ extends o.oi{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.network=s.R.state.activeCaipNetwork,this.networkImage=c.f.getNetworkImage(this.network),this.caipAddress=s.R.state.activeCaipAddress,this.loading=h.I.state.loading,this.isSupported=!!n.h.state.allowUnsupportedChain||!s.R.state.activeChain||s.R.checkIfSupportedNetwork(s.R.state.activeChain),this.unsubscribe.push(...[l.W.subscribeNetworkImages(()=>{this.networkImage=c.f.getNetworkImage(this.network)}),s.R.subscribeKey("activeCaipAddress",e=>{this.caipAddress=e}),s.R.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=c.f.getNetworkImage(e),this.isSupported=!e?.chainNamespace||s.R.checkIfSupportedNetwork(e.chainNamespace),c.f.fetchNetworkImage(e?.assets?.imageId)}),h.I.subscribeKey("loading",e=>this.loading=e)])}firstUpdated(){c.f.fetchNetworkImage(this.network?.assets?.imageId)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=!this.network||s.R.checkIfSupportedNetwork(this.network.chainNamespace);return o.dy`
      <wui-network-button
        .disabled=${!!(this.disabled||this.loading)}
        .isUnsupportedChain=${!n.h.state.allowUnsupportedChain&&!e}
        imageSrc=${(0,r.o)(this.networkImage)}
        @click=${this.onClick.bind(this)}
        data-testid="w3m-network-button"
      >
        ${this.getLabel()}
        <slot></slot>
      </wui-network-button>
    `}getLabel(){return this.network?this.isSupported||n.h.state.allowUnsupportedChain?this.network.name:"Switch Network":this.label?this.label:this.caipAddress?"Unknown Network":"Select Network"}onClick(){this.loading||(D.X.sendEvent({type:"track",event:"CLICK_NETWORKS"}),h.I.open({view:"Networks"}))}}_.styles=z,U([(0,a.Cb)({type:Boolean})],_.prototype,"disabled",void 0),U([(0,a.Cb)({type:String})],_.prototype,"label",void 0),U([(0,a.SB)()],_.prototype,"network",void 0),U([(0,a.SB)()],_.prototype,"networkImage",void 0),U([(0,a.SB)()],_.prototype,"caipAddress",void 0),U([(0,a.SB)()],_.prototype,"loading",void 0),U([(0,a.SB)()],_.prototype,"isSupported",void 0);let F=class extends _{};F=U([(0,p.Mo)("w3m-network-button")],F);let K=class extends _{};K=U([(0,p.Mo)("appkit-network-button")],K);var V=i(6090),H=i(16541),q=i(44984),G=i(72148),X=i(25721),Y=i(40458),Q=i(77405),Z=i(86321),J=i(27393);i(52042),i(74668),i(64153),i(85724),i(25924);var ee=o.iv`
  :host {
    display: block;
  }

  button {
    width: 100%;
    display: block;
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    padding-left: var(--wui-spacing-s);
    padding-right: var(--wui-spacing-2l);
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-accent-glass-010);
  }

  button:hover {
    background-color: var(--wui-color-accent-glass-015) !important;
  }

  button:active {
    background-color: var(--wui-color-accent-glass-020) !important;
  }
`,et=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let ei=class extends o.oi{constructor(){super(...arguments),this.label="",this.description="",this.icon="wallet"}render(){return o.dy`
      <button>
        <wui-flex gap="m" alignItems="center" justifyContent="space-between">
          <wui-icon-box
            size="lg"
            iconcolor="accent-100"
            backgroundcolor="accent-100"
            icon=${this.icon}
            background="transparent"
          ></wui-icon-box>

          <wui-flex flexDirection="column" gap="3xs">
            <wui-text variant="paragraph-500" color="fg-100">${this.label}</wui-text>
            <wui-text variant="small-400" color="fg-200">${this.description}</wui-text>
          </wui-flex>

          <wui-icon size="md" color="fg-200" name="chevronRight"></wui-icon>
        </wui-flex>
      </button>
    `}};ei.styles=[w.ET,w.ZM,ee],et([(0,a.Cb)()],ei.prototype,"label",void 0),et([(0,a.Cb)()],ei.prototype,"description",void 0),et([(0,a.Cb)()],ei.prototype,"icon",void 0),ei=et([(0,b.M)("wui-notice-card")],ei),i(93595);var eo=i(89499),ea=i(46719),er=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let en=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.socialProvider=ea.M.getConnectedSocialProvider(),this.socialUsername=ea.M.getConnectedSocialUsername(),this.namespace=s.R.state.activeChain,this.unsubscribe.push(s.R.subscribeKey("activeChain",e=>{this.namespace=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=q.A.getConnectorId(this.namespace),t=q.A.getAuthConnector();if(!t||e!==H.b.CONNECTOR_ID.AUTH)return this.style.cssText="display: none",null;let i=t.provider.getEmail()??"";return i||this.socialUsername?o.dy`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon=${this.socialProvider??"mail"}
        iconSize=${this.socialProvider?"xxl":"sm"}
        data-testid="w3m-account-email-update"
        ?chevron=${!this.socialProvider}
        @click=${()=>{this.onGoToUpdateEmail(i,this.socialProvider)}}
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.getAuthName(i)}</wui-text>
      </wui-list-item>
    `:(this.style.cssText="display: none",null)}onGoToUpdateEmail(e,t){t||Q.P.push("UpdateEmailWallet",{email:e,redirectView:"Account"})}getAuthName(e){return this.socialUsername?"discord"===this.socialProvider&&this.socialUsername.endsWith("0")?this.socialUsername.slice(0,-1):this.socialUsername:e.length>30?`${e.slice(0,-3)}...`:e}};er([(0,a.SB)()],en.prototype,"namespace",void 0),en=er([(0,p.Mo)("w3m-account-auth-button")],en);var es=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let el=class extends o.oi{constructor(){super(),this.usubscribe=[],this.networkImages=l.W.state.networkImages,this.address=d.N.state.address,this.profileImage=d.N.state.profileImage,this.profileName=d.N.state.profileName,this.network=s.R.state.activeCaipNetwork,this.disconnecting=!1,this.loading=!1,this.switched=!1,this.text="",this.remoteFeatures=n.h.state.remoteFeatures,this.usubscribe.push(...[d.N.subscribe(e=>{e.address&&(this.address=e.address,this.profileImage=e.profileImage,this.profileName=e.profileName)}),s.R.subscribeKey("activeCaipNetwork",e=>{e?.id&&(this.network=e)}),n.h.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e})])}disconnectedCallback(){this.usubscribe.forEach(e=>e())}render(){if(!this.address)throw Error("w3m-account-settings-view: No account provided");let e=this.networkImages[this.network?.assets?.imageId??""];return o.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="l"
        .padding=${["0","xl","m","xl"]}
      >
        <wui-avatar
          alt=${this.address}
          address=${this.address}
          imageSrc=${(0,r.o)(this.profileImage)}
          size="2lg"
        ></wui-avatar>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-flex gap="3xs" alignItems="center" justifyContent="center">
            <wui-text variant="title-6-600" color="fg-100" data-testid="account-settings-address">
              ${p.Hg.getTruncateString({string:this.address,charsStart:4,charsEnd:6,truncate:"middle"})}
            </wui-text>
            <wui-icon-link
              size="md"
              icon="copy"
              iconColor="fg-200"
              @click=${this.onCopyAddress}
            ></wui-icon-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
      <wui-flex flexDirection="column" gap="m">
        <wui-flex flexDirection="column" gap="xs" .padding=${["0","l","m","l"]}>
          ${this.authCardTemplate()}
          <w3m-account-auth-button></w3m-account-auth-button>
          <wui-list-item
            .variant=${e?"image":"icon"}
            iconVariant="overlay"
            icon="networkPlaceholder"
            imageSrc=${(0,r.o)(e)}
            ?chevron=${this.isAllowedNetworkSwitch()}
            @click=${this.onNetworks.bind(this)}
            data-testid="account-switch-network-button"
          >
            <wui-text variant="paragraph-500" color="fg-100">
              ${this.network?.name??"Unknown"}
            </wui-text>
          </wui-list-item>
          ${this.togglePreferredAccountBtnTemplate()} ${this.chooseNameButtonTemplate()}
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="disconnect"
            ?chevron=${!1}
            .loading=${this.disconnecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `}chooseNameButtonTemplate(){let e=this.network?.chainNamespace,t=q.A.getConnectorId(e),i=q.A.getAuthConnector(),a=s.R.checkIfNamesSupported();return a&&i&&t===H.b.CONNECTOR_ID.AUTH&&!this.profileName?o.dy`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="id"
        iconSize="sm"
        ?chevron=${!0}
        @click=${this.onChooseName.bind(this)}
        data-testid="account-choose-name-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Choose account name </wui-text>
      </wui-list-item>
    `:null}authCardTemplate(){let e=q.A.getConnectorId(this.network?.chainNamespace),t=q.A.getAuthConnector(),{origin:i}=location;return!t||e!==H.b.CONNECTOR_ID.AUTH||i.includes(G.bq.SECURE_SITE)?null:o.dy`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `}isAllowedNetworkSwitch(){let e=s.R.getAllRequestedCaipNetworks(),t=!!e&&e.length>1,i=e?.find(({id:e})=>e===this.network?.id);return t||!i}onCopyAddress(){try{this.address&&(u.j.copyToClopboard(this.address),X.K.showSuccess("Address copied"))}catch{X.K.showError("Failed to copy")}}togglePreferredAccountBtnTemplate(){let e=this.network?.chainNamespace,t=s.R.checkIfSmartAccountEnabled(),i=q.A.getConnectorId(e),a=q.A.getAuthConnector();return a&&i===H.b.CONNECTOR_ID.AUTH&&t?(this.switched||(this.text=(0,Y.r9)(e)===eo.y_.ACCOUNT_TYPES.SMART_ACCOUNT?"Switch to your EOA":"Switch to your Smart Account"),o.dy`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="swapHorizontalBold"
        iconSize="sm"
        ?chevron=${!0}
        ?loading=${this.loading}
        @click=${this.changePreferredAccountType.bind(this)}
        data-testid="account-toggle-preferred-account-type"
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>
      </wui-list-item>
    `):null}onChooseName(){Q.P.push("ChooseAccountName")}async changePreferredAccountType(){let e=this.network?.chainNamespace,t=s.R.checkIfSmartAccountEnabled(),i=(0,Y.r9)(e)!==eo.y_.ACCOUNT_TYPES.SMART_ACCOUNT&&t?eo.y_.ACCOUNT_TYPES.SMART_ACCOUNT:eo.y_.ACCOUNT_TYPES.EOA,o=q.A.getAuthConnector();o&&(this.loading=!0,await Z.l.setPreferredAccountType(i,e),this.text=i===eo.y_.ACCOUNT_TYPES.SMART_ACCOUNT?"Switch to your EOA":"Switch to your Smart Account",this.switched=!0,J.S.resetSend(),this.loading=!1,this.requestUpdate())}onNetworks(){this.isAllowedNetworkSwitch()&&Q.P.push("Networks")}async onDisconnect(){try{this.disconnecting=!0;let e=this.network?.chainNamespace,t=Z.l.getConnections(e),i=t.length>0,o=e&&q.A.state.activeConnectorIds[e],a=this.remoteFeatures?.multiWallet;await Z.l.disconnect(a?{id:o,namespace:e}:{}),i&&a&&(Q.P.push("ProfileWallets"),X.K.showSuccess("Wallet deleted"))}catch{D.X.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),X.K.showError("Failed to disconnect")}finally{this.disconnecting=!1}}onGoToUpgradeView(){D.X.sendEvent({type:"track",event:"EMAIL_UPGRADE_FROM_MODAL"}),Q.P.push("UpgradeEmailWallet")}};es([(0,a.SB)()],el.prototype,"address",void 0),es([(0,a.SB)()],el.prototype,"profileImage",void 0),es([(0,a.SB)()],el.prototype,"profileName",void 0),es([(0,a.SB)()],el.prototype,"network",void 0),es([(0,a.SB)()],el.prototype,"disconnecting",void 0),es([(0,a.SB)()],el.prototype,"loading",void 0),es([(0,a.SB)()],el.prototype,"switched",void 0),es([(0,a.SB)()],el.prototype,"text",void 0),es([(0,a.SB)()],el.prototype,"remoteFeatures",void 0),el=es([(0,p.Mo)("w3m-account-settings-view")],el),i(24863),i(89938);var ec=o.iv`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`,ed=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let eu=class extends o.oi{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.localTabWidth="100px",this.activeTab=0,this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `,this.dataset.type=this.isDense?"flex":"block",this.tabs.map((e,t)=>{let i=t===this.activeTab;return o.dy`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(t)}
          data-active=${i}
          data-testid="tab-${e.label?.toLowerCase()}"
        >
          ${this.iconTemplate(e)}
          <wui-text variant="small-600" color="inherit"> ${e.label} </wui-text>
        </button>
      `})}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll("button")],setTimeout(()=>{this.animateTabs(0,!0)},0))}iconTemplate(e){return e.icon?o.dy`<wui-icon size="xs" color="inherit" name=${e.icon}></wui-icon>`:null}onTabClick(e){this.buttons&&this.animateTabs(e,!1),this.activeTab=e,this.onTabChange(e)}animateTabs(e,t){let i=this.buttons[this.activeTab],o=this.buttons[e],a=i?.querySelector("wui-text"),r=o?.querySelector("wui-text"),n=o?.getBoundingClientRect(),s=r?.getBoundingClientRect();i&&a&&!t&&e!==this.activeTab&&(a.animate([{opacity:0}],{duration:50,easing:"ease",fill:"forwards"}),i.animate([{width:"34px"}],{duration:500,easing:"ease",fill:"forwards"})),o&&n&&s&&r&&(e!==this.activeTab||t)&&(this.localTabWidth=`${Math.round(n.width+s.width)+6}px`,o.animate([{width:`${n.width+s.width}px`}],{duration:t?0:500,fill:"forwards",easing:"ease"}),r.animate([{opacity:1}],{duration:t?0:125,delay:t?0:200,fill:"forwards",easing:"ease"}))}};eu.styles=[w.ET,w.ZM,ec],ed([(0,a.Cb)({type:Array})],eu.prototype,"tabs",void 0),ed([(0,a.Cb)()],eu.prototype,"onTabChange",void 0),ed([(0,a.Cb)({type:Array})],eu.prototype,"buttons",void 0),ed([(0,a.Cb)({type:Boolean})],eu.prototype,"disabled",void 0),ed([(0,a.Cb)()],eu.prototype,"localTabWidth",void 0),ed([(0,a.SB)()],eu.prototype,"activeTab",void 0),ed([(0,a.SB)()],eu.prototype,"isDense",void 0),eu=ed([(0,b.M)("wui-tabs")],eu),i(98972);var eh=o.iv`
  button {
    display: flex;
    align-items: center;
    padding: var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-xxs);
    column-gap: var(--wui-spacing-xs);
  }

  wui-image,
  .icon-box {
    width: var(--wui-spacing-xxl);
    height: var(--wui-spacing-xxl);
    border-radius: var(--wui-border-radius-3xs);
  }

  wui-text {
    flex: 1;
  }

  .icon-box {
    position: relative;
  }

  .icon-box[data-active='true'] {
    background-color: var(--wui-color-gray-glass-005);
  }

  .circle {
    position: absolute;
    left: 16px;
    top: 15px;
    width: var(--wui-spacing-1xs);
    height: var(--wui-spacing-1xs);
    background-color: var(--wui-color-success-100);
    border: 2px solid var(--wui-color-modal-bg);
    border-radius: 50%;
  }
`,ep=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let ew=class extends o.oi{constructor(){super(...arguments),this.address="",this.profileName="",this.alt="",this.imageSrc="",this.icon=void 0,this.iconSize="md",this.loading=!1,this.charsStart=4,this.charsEnd=6}render(){return o.dy`
      <button>
        ${this.leftImageTemplate()} ${this.textTemplate()} ${this.rightImageTemplate()}
      </button>
    `}leftImageTemplate(){let e=this.icon?o.dy`<wui-icon
          size=${this.iconSize}
          color="fg-200"
          name=${this.icon}
          class="icon"
        ></wui-icon>`:o.dy`<wui-image src=${this.imageSrc} alt=${this.alt}></wui-image>`;return o.dy`
      <wui-flex
        alignItems="center"
        justifyContent="center"
        class="icon-box"
        data-active=${!!this.icon}
      >
        ${e}
        <wui-flex class="circle"></wui-flex>
      </wui-flex>
    `}textTemplate(){return o.dy`
      <wui-text variant="paragraph-500" color="fg-100">
        ${g.H.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?16:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"})}
      </wui-text>
    `}rightImageTemplate(){return o.dy`<wui-icon name="chevronBottom" size="xs" color="fg-200"></wui-icon>`}};ew.styles=[w.ET,w.ZM,eh],ep([(0,a.Cb)()],ew.prototype,"address",void 0),ep([(0,a.Cb)()],ew.prototype,"profileName",void 0),ep([(0,a.Cb)()],ew.prototype,"alt",void 0),ep([(0,a.Cb)()],ew.prototype,"imageSrc",void 0),ep([(0,a.Cb)()],ew.prototype,"icon",void 0),ep([(0,a.Cb)()],ew.prototype,"iconSize",void 0),ep([(0,a.Cb)({type:Boolean})],ew.prototype,"loading",void 0),ep([(0,a.Cb)({type:Number})],ew.prototype,"charsStart",void 0),ep([(0,a.Cb)({type:Number})],ew.prototype,"charsEnd",void 0),ew=ep([(0,b.M)("wui-wallet-switch")],ew);var eg=o.iv`
  wui-flex {
    width: 100%;
  }

  :host > wui-flex:first-child {
    transform: translateY(calc(var(--wui-spacing-xxs) * -1));
  }

  wui-icon-link {
    margin-right: calc(var(--wui-icon-box-size-md) * -1);
  }

  wui-notice-card {
    margin-bottom: var(--wui-spacing-3xs);
  }

  wui-list-item > wui-text {
    flex: 1;
  }

  w3m-transactions-view {
    max-height: 200px;
  }

  .tab-content-container {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .tab-content-container::-webkit-scrollbar {
    display: none;
  }

  .account-button {
    width: auto;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-s);
    height: 48px;
    padding: var(--wui-spacing-xs);
    padding-right: var(--wui-spacing-s);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: 24px;
    transition: background-color 0.2s linear;
  }

  .account-button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }

  .avatar-container {
    position: relative;
  }

  wui-avatar.avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  wui-wallet-switch {
    margin-top: var(--wui-spacing-xs);
  }

  wui-avatar.network-avatar {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 100%;
    top: 100%;
    transform: translate(-75%, -75%);
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  .account-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .account-links wui-flex {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    background: red;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 10px;
    flex: 1 0 0;
    border-radius: var(--XS, 16px);
    border: 1px solid var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    background: var(--dark-accent-glass-010, rgba(71, 161, 255, 0.1));
    transition:
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md),
      opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  .account-links wui-flex:hover {
    background: var(--dark-accent-glass-015, rgba(71, 161, 255, 0.15));
  }

  .account-links wui-flex wui-icon {
    width: var(--S, 20px);
    height: var(--S, 20px);
  }

  .account-links wui-flex wui-icon svg path {
    stroke: #667dff;
  }
`,eb=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let ef=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.caipAddress=d.N.state.caipAddress,this.address=u.j.getPlainAddress(d.N.state.caipAddress),this.profileImage=d.N.state.profileImage,this.profileName=d.N.state.profileName,this.disconnecting=!1,this.balance=d.N.state.balance,this.balanceSymbol=d.N.state.balanceSymbol,this.features=n.h.state.features,this.remoteFeatures=n.h.state.remoteFeatures,this.namespace=s.R.state.activeChain,this.activeConnectorIds=q.A.state.activeConnectorIds,this.unsubscribe.push(...[d.N.subscribeKey("caipAddress",e=>{this.address=u.j.getPlainAddress(e),this.caipAddress=e}),d.N.subscribeKey("balance",e=>this.balance=e),d.N.subscribeKey("balanceSymbol",e=>this.balanceSymbol=e),d.N.subscribeKey("profileName",e=>this.profileName=e),d.N.subscribeKey("profileImage",e=>this.profileImage=e),n.h.subscribeKey("features",e=>this.features=e),n.h.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e),q.A.subscribeKey("activeConnectorIds",e=>{this.activeConnectorIds=e}),s.R.subscribeKey("activeChain",e=>this.namespace=e),s.R.subscribeKey("activeCaipNetwork",e=>{e?.chainNamespace&&(this.namespace=e?.chainNamespace)})])}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!this.caipAddress||!this.namespace)return null;let e=this.activeConnectorIds[this.namespace],t=e?q.A.getConnectorById(e):void 0,i=c.f.getConnectorImage(t);return o.dy`<wui-flex
        flexDirection="column"
        .padding=${["0","xl","m","xl"]}
        alignItems="center"
        gap="s"
      >
        <wui-avatar
          alt=${(0,r.o)(this.caipAddress)}
          address=${(0,r.o)(u.j.getPlainAddress(this.caipAddress))}
          imageSrc=${(0,r.o)(null===this.profileImage?void 0:this.profileImage)}
          data-testid="single-account-avatar"
        ></wui-avatar>
        <wui-wallet-switch
          profileName=${this.profileName}
          address=${this.address}
          imageSrc=${i}
          alt=${t?.name}
          @click=${this.onGoToProfileWalletsView.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-text variant="paragraph-500" color="fg-200">
            ${u.j.formatBalance(this.balance,this.balanceSymbol)}
          </wui-text>
        </wui-flex>
        ${this.explorerBtnTemplate()}
      </wui-flex>

      <wui-flex flexDirection="column" gap="xs" .padding=${["0","s","s","s"]}>
        ${this.authCardTemplate()} <w3m-account-auth-button></w3m-account-auth-button>
        ${this.orderedFeaturesTemplate()} ${this.activityTemplate()}
        <wui-list-item
          variant="icon"
          iconVariant="overlay"
          icon="disconnect"
          ?chevron=${!1}
          .loading=${this.disconnecting}
          @click=${this.onDisconnect.bind(this)}
          data-testid="disconnect-button"
        >
          <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>`}onrampTemplate(){if(!this.namespace)return null;let e=this.remoteFeatures?.onramp,t=G.bq.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.namespace);return e&&t?o.dy`
      <wui-list-item
        data-testid="w3m-account-default-onramp-button"
        iconVariant="blue"
        icon="card"
        ?chevron=${!0}
        @click=${this.handleClickPay.bind(this)}
      >
        <wui-text variant="paragraph-500" color="fg-100">Buy crypto</wui-text>
      </wui-list-item>
    `:null}orderedFeaturesTemplate(){let e=this.features?.walletFeaturesOrder||G.bq.DEFAULT_FEATURES.walletFeaturesOrder;return e.map(e=>{switch(e){case"onramp":return this.onrampTemplate();case"swaps":return this.swapsTemplate();case"send":return this.sendTemplate();default:return null}})}activityTemplate(){if(!this.namespace)return null;let e=this.remoteFeatures?.activity&&G.bq.ACTIVITY_ENABLED_CHAIN_NAMESPACES.includes(this.namespace);return e?o.dy` <wui-list-item
          iconVariant="blue"
          icon="clock"
          iconSize="sm"
          ?chevron=${!0}
          @click=${this.onTransactions.bind(this)}
          data-testid="w3m-account-default-activity-button"
        >
          <wui-text variant="paragraph-500" color="fg-100">Activity</wui-text>
        </wui-list-item>`:null}swapsTemplate(){let e=this.remoteFeatures?.swaps,t=s.R.state.activeChain===H.b.CHAIN.EVM;return e&&t?o.dy`
      <wui-list-item
        iconVariant="blue"
        icon="recycleHorizontal"
        ?chevron=${!0}
        @click=${this.handleClickSwap.bind(this)}
        data-testid="w3m-account-default-swaps-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Swap</wui-text>
      </wui-list-item>
    `:null}sendTemplate(){let e=this.features?.send,t=s.R.state.activeChain;if(!t)throw Error("SendController:sendTemplate - namespace is required");let i=G.bq.SEND_SUPPORTED_NAMESPACES.includes(t);return e&&i?o.dy`
      <wui-list-item
        iconVariant="blue"
        icon="send"
        ?chevron=${!0}
        @click=${this.handleClickSend.bind(this)}
        data-testid="w3m-account-default-send-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Send</wui-text>
      </wui-list-item>
    `:null}authCardTemplate(){let e=s.R.state.activeChain;if(!e)throw Error("AuthCardTemplate:authCardTemplate - namespace is required");let t=q.A.getConnectorId(e),i=q.A.getAuthConnector(),{origin:a}=location;return!i||t!==H.b.CONNECTOR_ID.AUTH||a.includes(G.bq.SECURE_SITE)?null:o.dy`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `}handleClickPay(){Q.P.push("OnRampProviders")}handleClickSwap(){Q.P.push("Swap")}handleClickSend(){Q.P.push("WalletSend")}explorerBtnTemplate(){let e=d.N.state.addressExplorerUrl;return e?o.dy`
      <wui-button size="md" variant="neutral" @click=${this.onExplorer.bind(this)}>
        <wui-icon size="sm" color="inherit" slot="iconLeft" name="compass"></wui-icon>
        Block Explorer
        <wui-icon size="sm" color="inherit" slot="iconRight" name="externalLink"></wui-icon>
      </wui-button>
    `:null}onTransactions(){D.X.sendEvent({type:"track",event:"CLICK_TRANSACTIONS",properties:{isSmartAccount:(0,Y.r9)(s.R.state.activeChain)===eo.y_.ACCOUNT_TYPES.SMART_ACCOUNT}}),Q.P.push("Transactions")}async onDisconnect(){try{this.disconnecting=!0;let e=Z.l.getConnections(this.namespace),t=e.length>0,i=this.namespace&&q.A.state.activeConnectorIds[this.namespace],o=this.remoteFeatures?.multiWallet;await Z.l.disconnect(o?{id:i,namespace:this.namespace}:{}),t&&o&&(Q.P.push("ProfileWallets"),X.K.showSuccess("Wallet deleted"))}catch{D.X.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),X.K.showError("Failed to disconnect")}finally{this.disconnecting=!1}}onExplorer(){let e=d.N.state.addressExplorerUrl;e&&u.j.openHref(e,"_blank")}onGoToUpgradeView(){D.X.sendEvent({type:"track",event:"EMAIL_UPGRADE_FROM_MODAL"}),Q.P.push("UpgradeEmailWallet")}onGoToProfileWalletsView(){Q.P.push("ProfileWallets")}};ef.styles=eg,eb([(0,a.SB)()],ef.prototype,"caipAddress",void 0),eb([(0,a.SB)()],ef.prototype,"address",void 0),eb([(0,a.SB)()],ef.prototype,"profileImage",void 0),eb([(0,a.SB)()],ef.prototype,"profileName",void 0),eb([(0,a.SB)()],ef.prototype,"disconnecting",void 0),eb([(0,a.SB)()],ef.prototype,"balance",void 0),eb([(0,a.SB)()],ef.prototype,"balanceSymbol",void 0),eb([(0,a.SB)()],ef.prototype,"features",void 0),eb([(0,a.SB)()],ef.prototype,"remoteFeatures",void 0),eb([(0,a.SB)()],ef.prototype,"namespace",void 0),eb([(0,a.SB)()],ef.prototype,"activeConnectorIds",void 0),ef=eb([(0,p.Mo)("w3m-account-default-widget")],ef);var em=o.iv`
  span {
    font-weight: 500;
    font-size: 40px;
    color: var(--wui-color-fg-100);
    line-height: 130%; /* 52px */
    letter-spacing: -1.6px;
    text-align: center;
  }

  .pennies {
    color: var(--wui-color-fg-200);
  }
`,ev=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let ey=class extends o.oi{constructor(){super(...arguments),this.dollars="0",this.pennies="00"}render(){return o.dy`<span>$${this.dollars}<span class="pennies">.${this.pennies}</span></span>`}};ey.styles=[w.ET,em],ev([(0,a.Cb)()],ey.prototype,"dollars",void 0),ev([(0,a.Cb)()],ey.prototype,"pennies",void 0),ey=ev([(0,b.M)("wui-balance")],ey),i(99294);var ex=o.iv`
  :host {
    display: block;
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);

    color: var(--wui-color-bg-100);
    position: relative;
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-bg-150);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  :host([data-variant='shade']) > wui-text {
    color: var(--wui-color-fg-150);
  }

  :host([data-variant='fill']) {
    background-color: var(--wui-color-fg-100);
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`,eC=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let ek=class extends o.oi{constructor(){super(...arguments),this.placement="top",this.variant="fill",this.message=""}render(){return this.dataset.variant=this.variant,o.dy`<wui-icon
        data-placement=${this.placement}
        color="fg-100"
        size="inherit"
        name=${"fill"===this.variant?"cursor":"cursorTransparent"}
      ></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>`}};ek.styles=[w.ET,w.ZM,ex],eC([(0,a.Cb)()],ek.prototype,"placement",void 0),eC([(0,a.Cb)()],ek.prototype,"variant",void 0),eC([(0,a.Cb)()],ek.prototype,"message",void 0),ek=eC([(0,b.M)("wui-tooltip")],ek);var e$=i(74769),eS=i(28791);let eR={getTabsByNamespace(e){let t=!!e&&e===H.b.CHAIN.EVM;return t?n.h.state.remoteFeatures?.activity===!1?eS.b.ACCOUNT_TABS.filter(e=>"Activity"!==e.label):eS.b.ACCOUNT_TABS:[]}};i(93265);var eA=o.iv`
  :host {
    width: 100%;
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  :host::-webkit-scrollbar {
    display: none;
  }
`;let eT=class extends o.oi{render(){return o.dy`<w3m-activity-list page="account"></w3m-activity-list>`}};eT.styles=eA,eT=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}([(0,p.Mo)("w3m-account-activity-widget")],eT),i(2065),i(42255);var eI=o.iv`
  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }

  .contentContainer > .textContent {
    width: 65%;
  }
`;let eE=class extends o.oi{render(){return o.dy`${this.nftTemplate()}`}nftTemplate(){return o.dy` <wui-flex
      class="contentContainer"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="l"
    >
      <wui-icon-box
        icon="wallet"
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
        <wui-text
          variant="paragraph-500"
          align="center"
          color="fg-100"
          data-testid="nft-template-title"
          >Coming soon</wui-text
        >
        <wui-text
          variant="small-400"
          align="center"
          color="fg-200"
          data-testid="nft-template-description"
          >Stay tuned for our upcoming NFT feature</wui-text
        >
      </wui-flex>
      <wui-link @click=${this.onReceiveClick.bind(this)} data-testid="link-receive-funds"
        >Receive funds</wui-link
      >
    </wui-flex>`}onReceiveClick(){Q.P.push("WalletReceive")}};eE.styles=eI,eE=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}([(0,p.Mo)("w3m-account-nfts-widget")],eE),i(82782);var eO=o.iv`
  button {
    width: 100%;
    display: flex;
    gap: var(--wui-spacing-s);
    align-items: center;
    justify-content: flex-start;
    padding: var(--wui-spacing-s) var(--wui-spacing-m) var(--wui-spacing-s) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon-box {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
  }

  wui-flex {
    width: auto;
  }
`,eN=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let eP=class extends o.oi{constructor(){super(...arguments),this.icon="card",this.text="",this.description="",this.tag=void 0,this.iconBackgroundColor="accent-100",this.iconColor="accent-100",this.disabled=!1}render(){return o.dy`
      <button ?disabled=${this.disabled}>
        <wui-icon-box
          iconColor=${this.iconColor}
          backgroundColor=${this.iconBackgroundColor}
          size="inherit"
          icon=${this.icon}
          iconSize="md"
        ></wui-icon-box>
        <wui-flex flexDirection="column" justifyContent="spaceBetween">
          ${this.titleTemplate()}
          <wui-text variant="small-400" color="fg-200"> ${this.description}</wui-text></wui-flex
        >
      </button>
    `}titleTemplate(){return this.tag?o.dy` <wui-flex alignItems="center" gap="xxs"
        ><wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text
        ><wui-tag tagType="main" size="md">${this.tag}</wui-tag>
      </wui-flex>`:o.dy`<wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>`}};eP.styles=[w.ET,w.ZM,eO],eN([(0,a.Cb)()],eP.prototype,"icon",void 0),eN([(0,a.Cb)()],eP.prototype,"text",void 0),eN([(0,a.Cb)()],eP.prototype,"description",void 0),eN([(0,a.Cb)()],eP.prototype,"tag",void 0),eN([(0,a.Cb)()],eP.prototype,"iconBackgroundColor",void 0),eN([(0,a.Cb)()],eP.prototype,"iconColor",void 0),eN([(0,a.Cb)({type:Boolean})],eP.prototype,"disabled",void 0),eP=eN([(0,b.M)("wui-list-description")],eP),i(88694);var ej=o.iv`
  :host {
    width: 100%;
  }

  wui-flex {
    width: 100%;
  }

  .contentContainer {
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  .contentContainer::-webkit-scrollbar {
    display: none;
  }
`,eB=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let eD=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tokenBalance=d.N.state.tokenBalance,this.remoteFeatures=n.h.state.remoteFeatures,this.unsubscribe.push(...[d.N.subscribe(e=>{this.tokenBalance=e.tokenBalance}),n.h.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e})])}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return o.dy`${this.tokenTemplate()}`}tokenTemplate(){return this.tokenBalance&&this.tokenBalance?.length>0?o.dy`<wui-flex class="contentContainer" flexDirection="column" gap="xs">
        ${this.tokenItemTemplate()}
      </wui-flex>`:o.dy` <wui-flex flexDirection="column" gap="xs"
      >${this.onRampTemplate()}
      <wui-list-description
        @click=${this.onReceiveClick.bind(this)}
        text="Receive funds"
        description="Transfer tokens on your wallet"
        icon="arrowBottomCircle"
        iconColor="fg-200"
        iconBackgroundColor="fg-200"
        data-testid="receive-funds"
      ></wui-list-description
    ></wui-flex>`}onRampTemplate(){return this.remoteFeatures?.onramp?o.dy`<wui-list-description
        @click=${this.onBuyClick.bind(this)}
        text="Buy Crypto"
        description="Easy with card or bank account"
        icon="card"
        iconColor="success-100"
        iconBackgroundColor="success-100"
        tag="popular"
        data-testid="buy-crypto"
      ></wui-list-description>`:o.dy``}tokenItemTemplate(){return this.tokenBalance?.map(e=>o.dy`<wui-list-token
          tokenName=${e.name}
          tokenImageUrl=${e.iconUrl}
          tokenAmount=${e.quantity.numeric}
          tokenValue=${e.value}
          tokenCurrency=${e.symbol}
        ></wui-list-token>`)}onReceiveClick(){Q.P.push("WalletReceive")}onBuyClick(){D.X.sendEvent({type:"track",event:"SELECT_BUY_CRYPTO",properties:{isSmartAccount:(0,Y.r9)(s.R.state.activeChain)===eo.y_.ACCOUNT_TYPES.SMART_ACCOUNT}}),Q.P.push("OnRampProviders")}};eD.styles=ej,eB([(0,a.SB)()],eD.prototype,"tokenBalance",void 0),eB([(0,a.SB)()],eD.prototype,"remoteFeatures",void 0),eD=eB([(0,p.Mo)("w3m-account-tokens-widget")],eD),i(72419),i(78747);var eL=o.iv`
  wui-flex {
    width: 100%;
  }

  wui-promo {
    position: absolute;
    top: -32px;
  }

  wui-profile-button {
    margin-top: calc(-1 * var(--wui-spacing-2l));
  }

  wui-promo + wui-profile-button {
    margin-top: var(--wui-spacing-2l);
  }

  wui-tabs {
    width: 100%;
  }

  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }

  .contentContainer > .textContent {
    width: 65%;
  }
`,eW=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let eM=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.address=d.N.state.address,this.profileName=d.N.state.profileName,this.network=s.R.state.activeCaipNetwork,this.currentTab=d.N.state.currentTab,this.tokenBalance=d.N.state.tokenBalance,this.features=n.h.state.features,this.namespace=s.R.state.activeChain,this.activeConnectorIds=q.A.state.activeConnectorIds,this.remoteFeatures=n.h.state.remoteFeatures,this.unsubscribe.push(...[d.N.subscribe(e=>{e.address?(this.address=e.address,this.profileName=e.profileName,this.currentTab=e.currentTab,this.tokenBalance=e.tokenBalance):h.I.close()})],q.A.subscribeKey("activeConnectorIds",e=>{this.activeConnectorIds=e}),s.R.subscribeKey("activeChain",e=>this.namespace=e),s.R.subscribeKey("activeCaipNetwork",e=>this.network=e),n.h.subscribeKey("features",e=>this.features=e),n.h.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e)),this.watchSwapValues()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),clearInterval(this.watchTokenBalance)}firstUpdated(){d.N.fetchTokenBalance()}render(){if(!this.address)throw Error("w3m-account-view: No account provided");if(!this.namespace)return null;let e=this.activeConnectorIds[this.namespace],t=e?q.A.getConnectorById(e):void 0,{icon:i,iconSize:a}=this.getAuthData();return o.dy`<wui-flex
      flexDirection="column"
      .padding=${["0","xl","m","xl"]}
      alignItems="center"
      gap="m"
      data-testid="w3m-account-wallet-features-widget"
    >
      <wui-flex flexDirection="column" justifyContent="center" alignItems="center" gap="xs">
        <wui-wallet-switch
          profileName=${this.profileName}
          address=${this.address}
          icon=${i}
          iconSize=${a}
          alt=${t?.name}
          @click=${this.onGoToProfileWalletsView.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>

        ${this.tokenBalanceTemplate()}
      </wui-flex>
      ${this.orderedWalletFeatures()} ${this.tabsTemplate()} ${this.listContentTemplate()}
    </wui-flex>`}orderedWalletFeatures(){let e=this.features?.walletFeaturesOrder||G.bq.DEFAULT_FEATURES.walletFeaturesOrder,t=e.every(e=>"send"===e||"receive"===e?!this.features?.[e]:"swaps"!==e&&"onramp"!==e||!this.remoteFeatures?.[e]);return t?null:o.dy`<wui-flex gap="s">
      ${e.map(e=>{switch(e){case"onramp":return this.onrampTemplate();case"swaps":return this.swapsTemplate();case"receive":return this.receiveTemplate();case"send":return this.sendTemplate();default:return null}})}
    </wui-flex>`}onrampTemplate(){let e=this.remoteFeatures?.onramp;return e?o.dy`
      <w3m-tooltip-trigger text="Buy">
        <wui-icon-button
          data-testid="wallet-features-onramp-button"
          @click=${this.onBuyClick.bind(this)}
          icon="card"
        ></wui-icon-button>
      </w3m-tooltip-trigger>
    `:null}swapsTemplate(){let e=this.remoteFeatures?.swaps,t=s.R.state.activeChain===H.b.CHAIN.EVM;return e&&t?o.dy`
      <w3m-tooltip-trigger text="Swap">
        <wui-icon-button
          data-testid="wallet-features-swaps-button"
          @click=${this.onSwapClick.bind(this)}
          icon="recycleHorizontal"
        >
        </wui-icon-button>
      </w3m-tooltip-trigger>
    `:null}receiveTemplate(){let e=this.features?.receive;return e?o.dy`
      <w3m-tooltip-trigger text="Receive">
        <wui-icon-button
          data-testid="wallet-features-receive-button"
          @click=${this.onReceiveClick.bind(this)}
          icon="arrowBottomCircle"
        >
        </wui-icon-button>
      </w3m-tooltip-trigger>
    `:null}sendTemplate(){let e=this.features?.send,t=s.R.state.activeChain,i=G.bq.SEND_SUPPORTED_NAMESPACES.includes(t);return e&&i?o.dy`
      <w3m-tooltip-trigger text="Send">
        <wui-icon-button
          data-testid="wallet-features-send-button"
          @click=${this.onSendClick.bind(this)}
          icon="send"
        ></wui-icon-button>
      </w3m-tooltip-trigger>
    `:null}watchSwapValues(){this.watchTokenBalance=setInterval(()=>d.N.fetchTokenBalance(e=>this.onTokenBalanceError(e)),1e4)}onTokenBalanceError(e){if(e instanceof Error&&e.cause instanceof Response){let t=e.cause.status;t===H.b.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE&&clearInterval(this.watchTokenBalance)}}listContentTemplate(){return 0===this.currentTab?o.dy`<w3m-account-tokens-widget></w3m-account-tokens-widget>`:1===this.currentTab?o.dy`<w3m-account-nfts-widget></w3m-account-nfts-widget>`:2===this.currentTab?o.dy`<w3m-account-activity-widget></w3m-account-activity-widget>`:o.dy`<w3m-account-tokens-widget></w3m-account-tokens-widget>`}tokenBalanceTemplate(){if(this.tokenBalance&&this.tokenBalance?.length>=0){let e=u.j.calculateBalance(this.tokenBalance),{dollars:t="0",pennies:i="00"}=u.j.formatTokenBalance(e);return o.dy`<wui-balance dollars=${t} pennies=${i}></wui-balance>`}return o.dy`<wui-balance dollars="0" pennies="00"></wui-balance>`}tabsTemplate(){let e=eR.getTabsByNamespace(s.R.state.activeChain);if(0===e.length)return null;let t=u.j.isMobile()&&window.innerWidth<430;return o.dy`<wui-tabs
      .onTabChange=${this.onTabChange.bind(this)}
      .activeTab=${this.currentTab}
      localTabWidth=${t?`${(window.innerWidth-48)/e.length}px`:2===e.length?"156px":"104px"}
      .tabs=${e}
    ></wui-tabs>`}onTabChange(e){d.N.setCurrentTab(e)}onBuyClick(){Q.P.push("OnRampProviders")}onSwapClick(){this.network?.caipNetworkId&&!G.bq.SWAP_SUPPORTED_NETWORKS.includes(this.network?.caipNetworkId)?Q.P.push("UnsupportedChain",{swapUnsupportedChain:!0}):(D.X.sendEvent({type:"track",event:"OPEN_SWAP",properties:{network:this.network?.caipNetworkId||"",isSmartAccount:(0,Y.r9)(s.R.state.activeChain)===eo.y_.ACCOUNT_TYPES.SMART_ACCOUNT}}),Q.P.push("Swap"))}getAuthData(){let e=ea.M.getConnectedSocialProvider(),t=ea.M.getConnectedSocialUsername(),i=q.A.getAuthConnector(),o=i?.provider.getEmail()??"";return{name:e$.C.getAuthName({email:o,socialUsername:t,socialProvider:e}),icon:e??"mail",iconSize:e?"xl":"md"}}onReceiveClick(){Q.P.push("WalletReceive")}onGoToProfileWalletsView(){Q.P.push("ProfileWallets")}onSendClick(){D.X.sendEvent({type:"track",event:"OPEN_SEND",properties:{network:this.network?.caipNetworkId||"",isSmartAccount:(0,Y.r9)(s.R.state.activeChain)===eo.y_.ACCOUNT_TYPES.SMART_ACCOUNT}}),Q.P.push("WalletSend")}};eM.styles=eL,eW([(0,a.SB)()],eM.prototype,"watchTokenBalance",void 0),eW([(0,a.SB)()],eM.prototype,"address",void 0),eW([(0,a.SB)()],eM.prototype,"profileName",void 0),eW([(0,a.SB)()],eM.prototype,"network",void 0),eW([(0,a.SB)()],eM.prototype,"currentTab",void 0),eW([(0,a.SB)()],eM.prototype,"tokenBalance",void 0),eW([(0,a.SB)()],eM.prototype,"features",void 0),eW([(0,a.SB)()],eM.prototype,"namespace",void 0),eW([(0,a.SB)()],eM.prototype,"activeConnectorIds",void 0),eW([(0,a.SB)()],eM.prototype,"remoteFeatures",void 0),eM=eW([(0,p.Mo)("w3m-account-wallet-features-widget")],eM);var ez=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let eU=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.namespace=s.R.state.activeChain,this.unsubscribe.push(s.R.subscribeKey("activeChain",e=>{this.namespace=e}))}render(){if(!this.namespace)return null;let e=q.A.getConnectorId(this.namespace),t=q.A.getAuthConnector();return o.dy`
      ${t&&e===H.b.CONNECTOR_ID.AUTH?this.walletFeaturesTemplate():this.defaultTemplate()}
    `}walletFeaturesTemplate(){return o.dy`<w3m-account-wallet-features-widget></w3m-account-wallet-features-widget>`}defaultTemplate(){return o.dy`<w3m-account-default-widget></w3m-account-default-widget>`}};ez([(0,a.SB)()],eU.prototype,"namespace",void 0),eU=ez([(0,p.Mo)("w3m-account-view")],eU);var e_=i(16025),eF=i(87729),eK=i(35776);i(83938),i(26193);var eV=o.iv`
  wui-image {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
    border-radius: var(--wui-border-radius-3xs);
  }

  wui-image,
  .icon-box {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
    border-radius: var(--wui-border-radius-3xs);
  }

  wui-icon:not(.custom-icon, .icon-badge) {
    cursor: pointer;
  }

  .icon-box {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
  }

  .icon-badge {
    position: absolute;
    top: 18px;
    left: 23px;
    z-index: 3;
    background-color: var(--wui-color-gray-glass-005);
    border: 2px solid var(--wui-color-modal-bg);
    border-radius: 50%;
    padding: var(--wui-spacing-4xs);
  }
`,eH=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let eq=class extends o.oi{constructor(){super(...arguments),this.address="",this.profileName="",this.content=[],this.alt="",this.imageSrc="",this.icon=void 0,this.iconSize="md",this.iconBadge=void 0,this.iconBadgeSize="md",this.buttonVariant="neutral",this.enableMoreButton=!1,this.charsStart=4,this.charsEnd=6}render(){return o.dy`
      <wui-flex flexDirection="column" rowGap="xs">
        ${this.topTemplate()} ${this.bottomTemplate()}
      </wui-flex>
    `}topTemplate(){return o.dy`
      <wui-flex alignItems="flex-start" justifyContent="space-between">
        ${this.imageOrIconTemplate()}
        <wui-icon-link
          iconColor="fg-200"
          size="sm"
          icon="copy"
          @click=${this.dispatchCopyEvent}
        ></wui-icon-link>
        <wui-icon-link
          iconColor="fg-200"
          size="sm"
          icon="externalLink"
          @click=${this.dispatchExternalLinkEvent}
        ></wui-icon-link>
        ${this.enableMoreButton?o.dy`<wui-icon-link
              iconColor="fg-200"
              size="sm"
              icon="threeDots"
              @click=${this.dispatchMoreButtonEvent}
              data-testid="wui-active-profile-wallet-item-more-button"
            ></wui-icon-link>`:null}
      </wui-flex>
    `}bottomTemplate(){return o.dy` <wui-flex flexDirection="column">${this.contentTemplate()}</wui-flex> `}imageOrIconTemplate(){return this.icon?o.dy`
        <wui-flex flexGrow="1" alignItems="center">
          <wui-flex alignItems="center" justifyContent="center" class="icon-box">
            <wui-icon
              size=${this.iconSize}
              color="fg-200"
              name=${this.icon}
              class="custom-icon"
            ></wui-icon>

            ${this.iconBadge?o.dy`<wui-icon
                  color="fg-175"
                  size=${this.iconBadgeSize}
                  name=${this.iconBadge}
                  class="icon-badge"
                ></wui-icon>`:null}
          </wui-flex>
        </wui-flex>
      `:o.dy`
      <wui-flex flexGrow="1" alignItems="center">
        <wui-image objectFit="contain" src=${this.imageSrc} alt=${this.alt}></wui-image>
      </wui-flex>
    `}contentTemplate(){return 0===this.content.length?null:o.dy`
      <wui-flex flexDirection="column" rowGap="s">
        ${this.content.map(e=>this.labelAndTagTemplate(e))}
      </wui-flex>
    `}labelAndTagTemplate({address:e,profileName:t,label:i,description:a,enableButton:r,buttonType:n,buttonLabel:s,buttonVariant:l,tagVariant:c,tagLabel:d,alignItems:u="flex-end"}){return o.dy`
      <wui-flex justifyContent="space-between" alignItems=${u} columnGap="3xs">
        <wui-flex flexDirection="column" rowGap="4xs">
          ${i?o.dy`<wui-text variant="micro-600" color="fg-200">${i}</wui-text>`:null}

          <wui-flex alignItems="center" columnGap="3xs">
            <wui-text variant="small-500" color="fg-100">
              ${g.H.getTruncateString({string:t||e,charsStart:t?16:this.charsStart,charsEnd:t?0:this.charsEnd,truncate:t?"end":"middle"})}
            </wui-text>

            ${c&&d?o.dy`<wui-tag variant=${c} size="xs">${d}</wui-tag>`:null}
          </wui-flex>

          ${a?o.dy`<wui-text variant="tiny-500" color="fg-200">${a}</wui-text>`:null}
        </wui-flex>

        ${r?this.buttonTemplate({buttonType:n,buttonLabel:s,buttonVariant:l}):null}
      </wui-flex>
    `}buttonTemplate({buttonType:e,buttonLabel:t,buttonVariant:i}){return o.dy`
      <wui-button
        size="xs"
        variant=${i}
        @click=${"disconnect"===e?this.dispatchDisconnectEvent.bind(this):this.dispatchSwitchEvent.bind(this)}
        data-testid=${"disconnect"===e?"wui-active-profile-wallet-item-disconnect-button":"wui-active-profile-wallet-item-switch-button"}
      >
        ${t}
      </wui-button>
    `}dispatchDisconnectEvent(){this.dispatchEvent(new CustomEvent("disconnect",{bubbles:!0,composed:!0}))}dispatchSwitchEvent(){this.dispatchEvent(new CustomEvent("switch",{bubbles:!0,composed:!0}))}dispatchExternalLinkEvent(){this.dispatchEvent(new CustomEvent("externalLink",{bubbles:!0,composed:!0}))}dispatchMoreButtonEvent(){this.dispatchEvent(new CustomEvent("more",{bubbles:!0,composed:!0}))}dispatchCopyEvent(){this.dispatchEvent(new CustomEvent("copy",{bubbles:!0,composed:!0}))}};eq.styles=[w.ET,w.ZM,eV],eH([(0,a.Cb)()],eq.prototype,"address",void 0),eH([(0,a.Cb)()],eq.prototype,"profileName",void 0),eH([(0,a.Cb)({type:Array})],eq.prototype,"content",void 0),eH([(0,a.Cb)()],eq.prototype,"alt",void 0),eH([(0,a.Cb)()],eq.prototype,"imageSrc",void 0),eH([(0,a.Cb)()],eq.prototype,"icon",void 0),eH([(0,a.Cb)()],eq.prototype,"iconSize",void 0),eH([(0,a.Cb)()],eq.prototype,"iconBadge",void 0),eH([(0,a.Cb)()],eq.prototype,"iconBadgeSize",void 0),eH([(0,a.Cb)()],eq.prototype,"buttonVariant",void 0),eH([(0,a.Cb)({type:Boolean})],eq.prototype,"enableMoreButton",void 0),eH([(0,a.Cb)({type:Number})],eq.prototype,"charsStart",void 0),eH([(0,a.Cb)({type:Number})],eq.prototype,"charsEnd",void 0),eq=eH([(0,b.M)("wui-active-profile-wallet-item")],eq);var eG=o.iv`
  wui-image,
  .icon-box {
    width: var(--wui-spacing-2xl);
    height: var(--wui-spacing-2xl);
    border-radius: var(--wui-border-radius-3xs);
  }

  .right-icon {
    cursor: pointer;
  }

  .icon-box {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
  }

  .icon-badge {
    position: absolute;
    top: 18px;
    left: 23px;
    z-index: 3;
    background-color: var(--wui-color-gray-glass-005);
    border: 2px solid var(--wui-color-modal-bg);
    border-radius: 50%;
    padding: var(--wui-spacing-4xs);
  }
`,eX=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let eY=class extends o.oi{constructor(){super(...arguments),this.address="",this.profileName="",this.alt="",this.buttonLabel="",this.buttonVariant="accent",this.imageSrc="",this.icon=void 0,this.iconSize="md",this.iconBadgeSize="md",this.rightIcon="off",this.rightIconSize="md",this.loading=!1,this.charsStart=4,this.charsEnd=6}render(){return o.dy`
      <wui-flex alignItems="center" columnGap="xs">
        ${this.imageOrIconTemplate()} ${this.labelAndDescriptionTemplate()}
        ${this.buttonActionTemplate()}
      </wui-flex>
    `}imageOrIconTemplate(){return this.icon?o.dy`
        <wui-flex alignItems="center" justifyContent="center" class="icon-box">
          <wui-flex alignItems="center" justifyContent="center" class="icon-box">
            <wui-icon
              size=${this.iconSize}
              color="fg-200"
              name=${this.icon}
              class="custom-icon"
            ></wui-icon>
            ${this.iconBadge?o.dy`<wui-icon
                  color="fg-175"
                  size=${this.iconBadgeSize}
                  name=${this.iconBadge}
                  class="icon-badge"
                ></wui-icon>`:null}
          </wui-flex>
        </wui-flex>
      `:o.dy`<wui-image objectFit="contain" src=${this.imageSrc} alt=${this.alt}></wui-image>`}labelAndDescriptionTemplate(){return o.dy`
      <wui-flex
        flexDirection="column"
        flexGrow="1"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <wui-text variant="small-500" color="fg-100">
          ${g.H.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?16:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"})}
        </wui-text>
      </wui-flex>
    `}buttonActionTemplate(){return o.dy`
      <wui-flex columnGap="3xs" alignItems="center" justifyContent="center">
        <wui-button
          size="xs"
          variant=${this.buttonVariant}
          .loading=${this.loading}
          @click=${this.handleButtonClick}
          data-testid="wui-inactive-profile-wallet-item-button"
        >
          ${this.buttonLabel}
        </wui-button>

        <wui-icon-link
          iconColor="fg-200"
          size=${this.rightIconSize}
          icon=${this.rightIcon}
          class="right-icon"
          @click=${this.handleIconClick}
        ></wui-icon-link>
      </wui-flex>
    `}handleButtonClick(){this.dispatchEvent(new CustomEvent("buttonClick",{bubbles:!0,composed:!0}))}handleIconClick(){this.dispatchEvent(new CustomEvent("iconClick",{bubbles:!0,composed:!0}))}};eY.styles=[w.ET,w.ZM,eG],eX([(0,a.Cb)()],eY.prototype,"address",void 0),eX([(0,a.Cb)()],eY.prototype,"profileName",void 0),eX([(0,a.Cb)()],eY.prototype,"alt",void 0),eX([(0,a.Cb)()],eY.prototype,"buttonLabel",void 0),eX([(0,a.Cb)()],eY.prototype,"buttonVariant",void 0),eX([(0,a.Cb)()],eY.prototype,"imageSrc",void 0),eX([(0,a.Cb)()],eY.prototype,"icon",void 0),eX([(0,a.Cb)()],eY.prototype,"iconSize",void 0),eX([(0,a.Cb)()],eY.prototype,"iconBadge",void 0),eX([(0,a.Cb)()],eY.prototype,"iconBadgeSize",void 0),eX([(0,a.Cb)()],eY.prototype,"rightIcon",void 0),eX([(0,a.Cb)()],eY.prototype,"rightIconSize",void 0),eX([(0,a.Cb)({type:Boolean})],eY.prototype,"loading",void 0),eX([(0,a.Cb)({type:Number})],eY.prototype,"charsStart",void 0),eX([(0,a.Cb)({type:Number})],eY.prototype,"charsEnd",void 0),eY=eX([(0,b.M)("wui-inactive-profile-wallet-item")],eY),i(76224);var eQ=i(17739);let eZ={getAuthData(e){let t=e.connectorId===H.b.CONNECTOR_ID.AUTH;if(!t)return{isAuth:!1,icon:void 0,iconSize:void 0,name:void 0};let i=e?.auth?.name??ea.M.getConnectedSocialProvider(),o=e?.auth?.username??ea.M.getConnectedSocialUsername(),a=q.A.getAuthConnector(),r=a?.provider.getEmail()??"";return{isAuth:!0,icon:i??"mail",iconSize:i?"xl":"md",name:t?e$.C.getAuthName({email:r,socialUsername:o,socialProvider:i}):void 0}}};var eJ=o.iv`
  :host {
    --connect-scroll--top-opacity: 0;
    --connect-scroll--bottom-opacity: 0;
  }

  .balance-amount {
    flex: 1;
  }

  .wallet-list {
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,
      rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,
      black 40px,
      black calc(100% - 40px),
      rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),
      rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%
    );
  }

  .active-wallets {
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  .active-wallets-box {
    height: 330px;
  }

  .empty-wallet-list-box {
    height: 400px;
  }

  .empty-box {
    width: 100%;
    padding: var(--wui-spacing-l);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  wui-separator {
    margin: var(--wui-spacing-xs) 0 var(--wui-spacing-xs) 0;
  }

  .active-connection {
    padding: var(--wui-spacing-xs);
  }

  .recent-connection {
    padding: var(--wui-spacing-xs) 0 var(--wui-spacing-xs) 0;
  }

  @media (max-width: 430px) {
    .active-wallets-box,
    .empty-wallet-list-box {
      height: auto;
      max-height: clamp(360px, 470px, 80vh);
    }
  }
`,e0=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let e3={ADDRESS_DISPLAY:{START:4,END:6},BADGE:{SIZE:"md",ICON:"lightbulb"},SCROLL_THRESHOLD:50,OPACITY_RANGE:[0,1]},e1={eip155:"ethereum",solana:"solana",bip122:"bitcoin"},e2=[{namespace:"eip155",icon:e1.eip155,label:"EVM"},{namespace:"solana",icon:e1.solana,label:"Solana"},{namespace:"bip122",icon:e1.bip122,label:"Bitcoin"}],e5={eip155:{title:"Add EVM Wallet",description:"Add your first EVM wallet"},solana:{title:"Add Solana Wallet",description:"Add your first Solana wallet"},bip122:{title:"Add Bitcoin Wallet",description:"Add your first Bitcoin wallet"}},e4=class extends o.oi{constructor(){super(),this.unsubscribers=[],this.currentTab=0,this.namespace=s.R.state.activeChain,this.namespaces=Array.from(s.R.state.chains.keys()),this.caipAddress=void 0,this.profileName=void 0,this.activeConnectorIds=q.A.state.activeConnectorIds,this.lastSelectedAddress="",this.lastSelectedConnectorId="",this.isSwitching=!1,this.caipNetwork=s.R.state.activeCaipNetwork,this.user=d.N.state.user,this.remoteFeatures=n.h.state.remoteFeatures,this.tabWidth="",this.currentTab=this.namespace?this.namespaces.indexOf(this.namespace):0,this.caipAddress=s.R.getAccountData(this.namespace)?.caipAddress,this.profileName=s.R.getAccountData(this.namespace)?.profileName,this.unsubscribers.push(...[Z.l.subscribeKey("connections",()=>this.requestUpdate()),Z.l.subscribeKey("recentConnections",()=>this.requestUpdate()),q.A.subscribeKey("activeConnectorIds",e=>{this.activeConnectorIds=e}),s.R.subscribeKey("activeCaipNetwork",e=>this.caipNetwork=e),d.N.subscribeKey("user",e=>this.user=e),n.h.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e)]),this.chainListener=s.R.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress,this.profileName=e?.profileName},this.namespace)}disconnectedCallback(){this.unsubscribers.forEach(e=>e()),this.resizeObserver?.disconnect(),this.tabsResizeObserver?.disconnect(),this.removeScrollListener(),this.chainListener?.()}firstUpdated(){let e=this.shadowRoot?.querySelector(".wallet-list"),t=this.shadowRoot?.querySelector("wui-tabs");if(!e)return;let i=()=>this.updateScrollOpacity(e);if(requestAnimationFrame(i),e.addEventListener("scroll",i),this.resizeObserver=new ResizeObserver(i),this.resizeObserver.observe(e),i(),t){let e=()=>{let e=e2.filter(e=>this.namespaces.includes(e.namespace)),t=e.length;if(t>1){let e=this.getBoundingClientRect()?.width;this.tabWidth=`${(e-32-8)/t}px`,this.requestUpdate()}};this.tabsResizeObserver=new ResizeObserver(e),this.tabsResizeObserver.observe(this),e()}}render(){let e=this.namespace;if(!e)throw Error("Namespace is not set");return o.dy`
      <wui-flex flexDirection="column" .padding=${["0","l","l","l"]} gap="l">
        ${this.renderTabs()} ${this.renderHeader(e)} ${this.renderConnections(e)}
        ${this.renderAddConnectionButton(e)}
      </wui-flex>
    `}renderTabs(){let e=e2.filter(e=>this.namespaces.includes(e.namespace)),t=e.length;return t>1?o.dy`
        <wui-tabs
          .onTabChange=${e=>this.handleTabChange(e)}
          .activeTab=${this.currentTab}
          localTabWidth=${this.tabWidth}
          .tabs=${e}
        ></wui-tabs>
      `:null}renderHeader(e){let t=this.getActiveConnections(e),i=t.flatMap(({accounts:e})=>e).length+(this.caipAddress?1:0);return o.dy`
      <wui-flex alignItems="center" columnGap="3xs">
        <wui-icon
          name=${e1[e]??e1.eip155}
          size="lg"
        ></wui-icon>
        <wui-text color="fg-200" variant="small-400"
          >${i>1?"Wallets":"Wallet"}</wui-text
        >
        <wui-text
          color="fg-100"
          variant="small-400"
          class="balance-amount"
          data-testid="balance-amount"
        >
          ${i}
        </wui-text>
        <wui-link
          color="fg-200"
          @click=${()=>Z.l.disconnect({namespace:e})}
          ?disabled=${!this.hasAnyConnections(e)}
          data-testid="disconnect-all-button"
        >
          Disconnect All
        </wui-link>
      </wui-flex>
    `}renderConnections(e){let t=this.hasAnyConnections(e);return o.dy`
      <wui-flex flexDirection="column" class=${(0,e_.$)({"wallet-list":!0,"active-wallets-box":t,"empty-wallet-list-box":!t})} rowGap="s">
        ${t?this.renderActiveConnections(e):this.renderEmptyState(e)}
      </wui-flex>
    `}renderActiveConnections(e){let t=this.getActiveConnections(e),i=this.activeConnectorIds[e],a=this.getPlainAddress();return o.dy`
      ${a||i||t.length>0?o.dy`<wui-flex
            flexDirection="column"
            .padding=${["l","0","xs","0"]}
            class="active-wallets"
          >
            ${this.renderActiveProfile(e)} ${this.renderActiveConnectionsList(e)}
          </wui-flex>`:null}
      ${this.renderRecentConnections(e)}
    `}renderActiveProfile(e){let t=this.activeConnectorIds[e];if(!t)return null;let{connections:i}=eK.f.getConnectionsData(e),a=q.A.getConnectorById(t),r=c.f.getConnectorImage(a),n=this.getPlainAddress();if(!n)return null;let s=e===H.b.CHAIN.BITCOIN,l=eZ.getAuthData({connectorId:t,accounts:[]}),d=this.getActiveConnections(e).flatMap(e=>e.accounts).length>0,u=i.find(e=>e.connectorId===t),h=u?.accounts.filter(e=>!eQ.g.isLowerCaseMatch(e.address,n));return o.dy`
      <wui-flex flexDirection="column" .padding=${["0","l","0","l"]}>
        <wui-active-profile-wallet-item
          address=${n}
          alt=${a?.name}
          .content=${this.getProfileContent({address:n,connections:i,connectorId:t,namespace:e})}
          .charsStart=${e3.ADDRESS_DISPLAY.START}
          .charsEnd=${e3.ADDRESS_DISPLAY.END}
          .icon=${l.icon}
          .iconSize=${l.iconSize}
          .iconBadge=${this.isSmartAccount(n)?e3.BADGE.ICON:void 0}
          .iconBadgeSize=${this.isSmartAccount(n)?e3.BADGE.SIZE:void 0}
          imageSrc=${r}
          ?enableMoreButton=${l.isAuth}
          @copy=${()=>this.handleCopyAddress(n)}
          @disconnect=${()=>this.handleDisconnect(e,{id:t})}
          @switch=${()=>{s&&u&&h?.[0]&&this.handleSwitchWallet(u,h[0].address,e)}}
          @externalLink=${()=>this.handleExternalLink(n)}
          @more=${()=>this.handleMore()}
          data-testid="wui-active-profile-wallet-item"
        ></wui-active-profile-wallet-item>
        ${d?o.dy`<wui-separator></wui-separator>`:null}
      </wui-flex>
    `}renderActiveConnectionsList(e){let t=this.getActiveConnections(e);return 0===t.length?null:o.dy`
      <wui-flex flexDirection="column" .padding=${["0","xs","0","xs"]}>
        ${this.renderConnectionList(t,!1,e)}
      </wui-flex>
    `}renderRecentConnections(e){let{recentConnections:t}=eK.f.getConnectionsData(e),i=t.flatMap(e=>e.accounts);return 0===i.length?null:o.dy`
      <wui-flex flexDirection="column" .padding=${["0","xs","0","xs"]} rowGap="xs">
        <wui-text color="fg-200" variant="micro-500" data-testid="recently-connected-text"
          >RECENTLY CONNECTED</wui-text
        >
        <wui-flex flexDirection="column" .padding=${["0","xs","0","xs"]}>
          ${this.renderConnectionList(t,!0,e)}
        </wui-flex>
      </wui-flex>
    `}renderConnectionList(e,t,i){return e.filter(e=>e.accounts.length>0).map((e,a)=>{let r=q.A.getConnectorById(e.connectorId),n=c.f.getConnectorImage(r)??"",s=eZ.getAuthData(e);return e.accounts.map((r,l)=>{let c=this.isAccountLoading(e.connectorId,r.address);return o.dy`
            <wui-flex flexDirection="column">
              ${0!==a||0!==l?o.dy`<wui-separator></wui-separator>`:null}
              <wui-inactive-profile-wallet-item
                address=${r.address}
                alt=${e.connectorId}
                buttonLabel=${t?"Connect":"Switch"}
                buttonVariant=${t?"neutral":"accent"}
                rightIcon=${t?"bin":"off"}
                rightIconSize="sm"
                class=${t?"recent-connection":"active-connection"}
                data-testid=${t?"recent-connection":"active-connection"}
                imageSrc=${n}
                .iconBadge=${this.isSmartAccount(r.address)?e3.BADGE.ICON:void 0}
                .iconBadgeSize=${this.isSmartAccount(r.address)?e3.BADGE.SIZE:void 0}
                .icon=${s.icon}
                .iconSize=${s.iconSize}
                .loading=${c}
                .showBalance=${!1}
                .charsStart=${e3.ADDRESS_DISPLAY.START}
                .charsEnd=${e3.ADDRESS_DISPLAY.END}
                @buttonClick=${()=>this.handleSwitchWallet(e,r.address,i)}
                @iconClick=${()=>this.handleWalletAction({connection:e,address:r.address,isRecentConnection:t,namespace:i})}
              ></wui-inactive-profile-wallet-item>
            </wui-flex>
          `})})}renderAddConnectionButton(e){if(!this.isMultiWalletEnabled()&&this.caipAddress||!this.hasAnyConnections(e))return null;let{title:t}=this.getChainLabelInfo(e);return o.dy`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="plus"
        iconSize="sm"
        ?chevron=${!0}
        @click=${()=>this.handleAddConnection(e)}
        data-testid="add-connection-button"
      >
        <wui-text variant="paragraph-500" color="fg-200">${t}</wui-text>
      </wui-list-item>
    `}renderEmptyState(e){let{title:t,description:i}=this.getChainLabelInfo(e);return o.dy`
      <wui-flex alignItems="flex-start" class="empty-template" data-testid="empty-template">
        <wui-flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowGap="s"
          class="empty-box"
        >
          <wui-icon-box
            size="lg"
            icon="wallet"
            background="gray"
            iconColor="fg-200"
            backgroundColor="glass-002"
          ></wui-icon-box>

          <wui-flex flexDirection="column" alignItems="center" justifyContent="center" gap="3xs">
            <wui-text color="fg-100" variant="paragraph-500" data-testid="empty-state-text"
              >No wallet connected</wui-text
            >
            <wui-text color="fg-200" variant="tiny-500" data-testid="empty-state-description"
              >${i}</wui-text
            >
          </wui-flex>

          <wui-button
            variant="neutral"
            size="md"
            @click=${()=>this.handleAddConnection(e)}
            data-testid="empty-state-button"
          >
            <wui-icon color="inherit" slot="iconLeft" name="plus"></wui-icon>
            ${t}
          </wui-button>
        </wui-flex>
      </wui-flex>
    `}handleTabChange(e){let t=this.namespaces[e];t&&(this.chainListener?.(),this.currentTab=this.namespaces.indexOf(t),this.namespace=t,this.caipAddress=s.R.getAccountData(t)?.caipAddress,this.profileName=s.R.getAccountData(t)?.profileName,this.chainListener=s.R.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress},t))}async handleSwitchWallet(e,t,i){try{this.isSwitching=!0,this.lastSelectedConnectorId=e.connectorId,this.lastSelectedAddress=t,await Z.l.switchConnection({connection:e,address:t,namespace:i,closeModalOnConnect:!1,onChange({hasSwitchedAccount:e,hasSwitchedWallet:t}){t?X.K.showSuccess("Wallet switched"):e&&X.K.showSuccess("Account switched")}})}catch(e){X.K.showError("Failed to switch wallet")}finally{this.isSwitching=!1}}handleWalletAction(e){let{connection:t,address:i,isRecentConnection:o,namespace:a}=e;o?(ea.M.deleteAddressFromConnection({connectorId:t.connectorId,address:i,namespace:a}),Z.l.syncStorageConnections(),X.K.showSuccess("Wallet deleted")):this.handleDisconnect(a,{id:t.connectorId})}async handleDisconnect(e,{id:t}){try{await Z.l.disconnect({id:t,namespace:e}),X.K.showSuccess("Wallet disconnected")}catch{X.K.showError("Failed to disconnect wallet")}}handleCopyAddress(e){u.j.copyToClopboard(e),X.K.showSuccess("Address copied")}handleMore(){Q.P.push("AccountSettings")}handleExternalLink(e){let t=this.caipNetwork?.blockExplorers?.default.url;t&&u.j.openHref(`${t}/address/${e}`,"_blank")}handleAddConnection(e){q.A.setFilterByNamespace(e),Q.P.push("Connect")}getChainLabelInfo(e){return e5[e]??{title:"Add Wallet",description:"Add your first wallet"}}isSmartAccount(e){if(!this.namespace)return!1;let t=this.user?.accounts?.find(e=>"smartAccount"===e.type);return!!t&&!!e&&eQ.g.isLowerCaseMatch(t.address,e)}getPlainAddress(){return this.caipAddress?u.j.getPlainAddress(this.caipAddress):void 0}getActiveConnections(e){let t=this.activeConnectorIds[e],{connections:i}=eK.f.getConnectionsData(e),[o]=i.filter(e=>eQ.g.isLowerCaseMatch(e.connectorId,t));if(!t)return i;let a=e===H.b.CHAIN.BITCOIN,{address:r}=this.caipAddress?eF.u.parseCaipAddress(this.caipAddress):{},n=[...r?[r]:[]];return a&&o&&(n=o.accounts.map(e=>e.address)||[]),eK.f.excludeConnectorAddressFromConnections({connectorId:t,addresses:n,connections:i})}hasAnyConnections(e){let t=this.getActiveConnections(e),{recentConnections:i}=eK.f.getConnectionsData(e);return!!this.caipAddress||t.length>0||i.length>0}isAccountLoading(e,t){return eQ.g.isLowerCaseMatch(this.lastSelectedConnectorId,e)&&eQ.g.isLowerCaseMatch(this.lastSelectedAddress,t)&&this.isSwitching}getProfileContent(e){let{address:t,connections:i,connectorId:o,namespace:a}=e,[r]=i.filter(e=>eQ.g.isLowerCaseMatch(e.connectorId,o));if(a===H.b.CHAIN.BITCOIN&&r?.accounts.every(e=>"string"==typeof e.type))return this.getBitcoinProfileContent(r.accounts,t);let n=eZ.getAuthData({connectorId:o,accounts:[]});return[{address:t,tagLabel:"Active",tagVariant:"success",enableButton:!0,profileName:this.profileName,buttonType:"disconnect",buttonLabel:"Disconnect",buttonVariant:"neutral",...n.isAuth?{description:this.isSmartAccount(t)?"Smart Account":"EOA Account"}:{}}]}getBitcoinProfileContent(e,t){let i=e.length>1,o=this.getPlainAddress();return e.map(e=>{let a=eQ.g.isLowerCaseMatch(e.address,o),r="PAYMENT";return"ordinal"===e.type&&(r="ORDINALS"),{address:e.address,tagLabel:eQ.g.isLowerCaseMatch(e.address,t)?"Active":void 0,tagVariant:eQ.g.isLowerCaseMatch(e.address,t)?"success":void 0,enableButton:!0,...i?{label:r,alignItems:"flex-end",buttonType:a?"disconnect":"switch",buttonLabel:a?"Disconnect":"Switch",buttonVariant:a?"neutral":"accent"}:{alignItems:"center",buttonType:"disconnect",buttonLabel:"Disconnect",buttonVariant:"neutral"}}})}removeScrollListener(){let e=this.shadowRoot?.querySelector(".wallet-list");e&&e.removeEventListener("scroll",()=>this.handleConnectListScroll())}handleConnectListScroll(){let e=this.shadowRoot?.querySelector(".wallet-list");e&&this.updateScrollOpacity(e)}isMultiWalletEnabled(){return!!this.remoteFeatures?.multiWallet}updateScrollOpacity(e){e.style.setProperty("--connect-scroll--top-opacity",p.kj.interpolate([0,e3.SCROLL_THRESHOLD],e3.OPACITY_RANGE,e.scrollTop).toString()),e.style.setProperty("--connect-scroll--bottom-opacity",p.kj.interpolate([0,e3.SCROLL_THRESHOLD],e3.OPACITY_RANGE,e.scrollHeight-e.scrollTop-e.offsetHeight).toString())}};e4.styles=eJ,e0([(0,a.SB)()],e4.prototype,"currentTab",void 0),e0([(0,a.SB)()],e4.prototype,"namespace",void 0),e0([(0,a.SB)()],e4.prototype,"namespaces",void 0),e0([(0,a.SB)()],e4.prototype,"caipAddress",void 0),e0([(0,a.SB)()],e4.prototype,"profileName",void 0),e0([(0,a.SB)()],e4.prototype,"activeConnectorIds",void 0),e0([(0,a.SB)()],e4.prototype,"lastSelectedAddress",void 0),e0([(0,a.SB)()],e4.prototype,"lastSelectedConnectorId",void 0),e0([(0,a.SB)()],e4.prototype,"isSwitching",void 0),e0([(0,a.SB)()],e4.prototype,"caipNetwork",void 0),e0([(0,a.SB)()],e4.prototype,"user",void 0),e0([(0,a.SB)()],e4.prototype,"remoteFeatures",void 0),e0([(0,a.SB)()],e4.prototype,"tabWidth",void 0),e4=e0([(0,p.Mo)("w3m-profile-wallets-view")],e4);var e6=i(91308),e7=o.iv`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`,e9=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let e8=class extends o.oi{constructor(){super(...arguments),this.inputElementRef=(0,e6.V)(),this.checked=void 0}render(){return o.dy`
      <label>
        <input
          ${(0,e6.i)(this.inputElementRef)}
          type="checkbox"
          ?checked=${(0,r.o)(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("switchChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};e8.styles=[w.ET,w.ZM,w.Bp,e7],e9([(0,a.Cb)({type:Boolean})],e8.prototype,"checked",void 0),e8=e9([(0,b.M)("wui-switch")],e8);var te=o.iv`
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`,tt=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let ti=class extends o.oi{constructor(){super(...arguments),this.checked=void 0}render(){return o.dy`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${(0,r.o)(this.checked)}></wui-switch>
      </button>
    `}};ti.styles=[w.ET,w.ZM,te],tt([(0,a.Cb)({type:Boolean})],ti.prototype,"checked",void 0),ti=tt([(0,b.M)("wui-certified-switch")],ti);var to=o.iv`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`,ta=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let tr=class extends o.oi{constructor(){super(...arguments),this.icon="copy"}render(){return o.dy`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};tr.styles=[w.ET,w.ZM,to],ta([(0,a.Cb)()],tr.prototype,"icon",void 0),tr=ta([(0,b.M)("wui-input-element")],tr),i(14619);var tn=o.iv`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;let ts=class extends o.oi{constructor(){super(...arguments),this.inputComponentRef=(0,e6.V)()}render(){return o.dy`
      <wui-input-text
        ${(0,e6.i)(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){let e=this.inputComponentRef.value,t=e?.inputElementRef.value;t&&(t.value="",t.focus(),t.dispatchEvent(new Event("input")))}};ts.styles=[w.ET,tn],ts=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}([(0,b.M)("wui-search-bar")],ts);var tl=i(68157),tc=i(76902);i(94192);var td=o.iv`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`,tu=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let th=class extends o.oi{constructor(){super(...arguments),this.type="wallet"}render(){return o.dy`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return"network"===this.type?o.dy` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${tc.W}`:o.dy`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};th.styles=[w.ET,w.ZM,td],tu([(0,a.Cb)()],th.prototype,"type",void 0),th=tu([(0,b.M)("wui-card-select-loader")],th);var tp=o.iv`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`,tw=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let tg=class extends o.oi{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&g.H.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&g.H.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&g.H.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&g.H.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&g.H.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&g.H.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&g.H.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&g.H.getSpacingStyles(this.margin,3)};
    `,o.dy`<slot></slot>`}};tg.styles=[w.ET,tp],tw([(0,a.Cb)()],tg.prototype,"gridTemplateRows",void 0),tw([(0,a.Cb)()],tg.prototype,"gridTemplateColumns",void 0),tw([(0,a.Cb)()],tg.prototype,"justifyItems",void 0),tw([(0,a.Cb)()],tg.prototype,"alignItems",void 0),tw([(0,a.Cb)()],tg.prototype,"justifyContent",void 0),tw([(0,a.Cb)()],tg.prototype,"alignContent",void 0),tw([(0,a.Cb)()],tg.prototype,"columnGap",void 0),tw([(0,a.Cb)()],tg.prototype,"rowGap",void 0),tw([(0,a.Cb)()],tg.prototype,"gap",void 0),tw([(0,a.Cb)()],tg.prototype,"padding",void 0),tw([(0,a.Cb)()],tg.prototype,"margin",void 0),tg=tw([(0,b.M)("wui-grid")],tg);var tb=i(89933);i(4695),i(32798);var tf=o.iv`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`,tm=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let tv=class extends o.oi{constructor(){super(),this.observer=new IntersectionObserver(()=>void 0),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.wallet=void 0,this.observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting?(this.visible=!0,this.fetchImageSrc()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){let e=this.wallet?.badge_type==="certified";return o.dy`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${(0,r.o)(e?"certified":void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${e?o.dy`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){return(this.visible||this.imageSrc)&&!this.imageLoading?o.dy`
      <wui-wallet-image
        size="md"
        imageSrc=${(0,r.o)(this.imageSrc)}
        name=${this.wallet?.name}
        .installed=${this.wallet?.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `:this.shimmerTemplate()}shimmerTemplate(){return o.dy`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=c.f.getWalletImage(this.wallet),this.imageSrc||(this.imageLoading=!0,this.imageSrc=await c.f.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}};tv.styles=tf,tm([(0,a.SB)()],tv.prototype,"visible",void 0),tm([(0,a.SB)()],tv.prototype,"imageSrc",void 0),tm([(0,a.SB)()],tv.prototype,"imageLoading",void 0),tm([(0,a.Cb)()],tv.prototype,"wallet",void 0),tv=tm([(0,p.Mo)("w3m-all-wallets-list-item")],tv);var ty=o.iv`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`,tx=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let tC="local-paginator",tk=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!tl.Q.state.wallets.length,this.wallets=tl.Q.state.wallets,this.recommended=tl.Q.state.recommended,this.featured=tl.Q.state.featured,this.filteredWallets=tl.Q.state.filteredWallets,this.unsubscribe.push(...[tl.Q.subscribeKey("wallets",e=>this.wallets=e),tl.Q.subscribeKey("recommended",e=>this.recommended=e),tl.Q.subscribeKey("featured",e=>this.featured=e),tl.Q.subscribeKey("filteredWallets",e=>this.filteredWallets=e)])}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.paginationObserver?.disconnect()}render(){return o.dy`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","s","s","s"]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){this.loading=!0;let e=this.shadowRoot?.querySelector("wui-grid");e&&(await tl.Q.fetchWalletsByPage({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(e,t){return[...Array(e)].map(()=>o.dy`
        <wui-card-select-loader type="wallet" id=${(0,r.o)(t)}></wui-card-select-loader>
      `)}walletsTemplate(){let e=this.filteredWallets?.length>0?u.j.uniqueBy([...this.featured,...this.recommended,...this.filteredWallets],"id"):u.j.uniqueBy([...this.featured,...this.recommended,...this.wallets],"id"),t=tb.J.markWalletsAsInstalled(e);return t.map(e=>o.dy`
        <w3m-all-wallets-list-item
          @click=${()=>this.onConnectWallet(e)}
          .wallet=${e}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){let{wallets:e,recommended:t,featured:i,count:o}=tl.Q.state,a=window.innerWidth<352?3:4,r=e.length+t.length,n=Math.ceil(r/a)*a-r+a;return(n-=e.length?i.length%a:0,0===o&&i.length>0)?null:0===o||[...i,...e,...t].length<o?this.shimmerTemplate(n,tC):null}createPaginationObserver(){let e=this.shadowRoot?.querySelector(`#${tC}`);e&&(this.paginationObserver=new IntersectionObserver(([e])=>{if(e?.isIntersecting&&!this.loading){let{page:e,count:t,wallets:i}=tl.Q.state;i.length<t&&tl.Q.fetchWalletsByPage({page:e+1})}}),this.paginationObserver.observe(e))}onConnectWallet(e){q.A.selectWalletConnector(e)}};tk.styles=ty,tx([(0,a.SB)()],tk.prototype,"loading",void 0),tx([(0,a.SB)()],tk.prototype,"wallets",void 0),tx([(0,a.SB)()],tk.prototype,"recommended",void 0),tx([(0,a.SB)()],tk.prototype,"featured",void 0),tx([(0,a.SB)()],tk.prototype,"filteredWallets",void 0),tk=tx([(0,p.Mo)("w3m-all-wallets-list")],tk),i(40442);var t$=o.iv`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`,tS=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let tR=class extends o.oi{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?o.dy`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await tl.Q.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){let{search:e}=tl.Q.state,t=tb.J.markWalletsAsInstalled(e);return e.length?o.dy`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","s","s","s"]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${t.map(e=>o.dy`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(e)}
              .wallet=${e}
              data-testid="wallet-search-item-${e.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:o.dy`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(e){q.A.selectWalletConnector(e)}};tR.styles=t$,tS([(0,a.SB)()],tR.prototype,"loading",void 0),tS([(0,a.Cb)()],tR.prototype,"query",void 0),tS([(0,a.Cb)()],tR.prototype,"badge",void 0),tR=tS([(0,p.Mo)("w3m-all-wallets-search")],tR);var tA=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let tT=class extends o.oi{constructor(){super(...arguments),this.search="",this.onDebouncedSearch=u.j.debounce(e=>{this.search=e})}render(){let e=this.search.length>=2;return o.dy`
      <wui-flex .padding=${["0","s","s","s"]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${e||this.badge?o.dy`<w3m-all-wallets-search
            query=${this.search}
            badge=${(0,r.o)(this.badge)}
          ></w3m-all-wallets-search>`:o.dy`<w3m-all-wallets-list badge=${(0,r.o)(this.badge)}></w3m-all-wallets-list>`}
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onClick(){if("certified"===this.badge){this.badge=void 0;return}this.badge="certified",X.K.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})}qrButtonTemplate(){return u.j.isMobile()?o.dy`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){Q.P.push("ConnectingWalletConnect")}};tA([(0,a.SB)()],tT.prototype,"search",void 0),tA([(0,a.SB)()],tT.prototype,"badge",void 0),tT=tA([(0,p.Mo)("w3m-all-wallets-view")],tT);var tI=i(25331),tE=i(42774),tO=o.iv`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 16.5px var(--wui-spacing-l) 16.5px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
    justify-content: center;
    align-items: center;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }
`,tN=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let tP=class extends o.oi{constructor(){super(...arguments),this.text="",this.disabled=!1,this.tabIdx=void 0}render(){return o.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,r.o)(this.tabIdx)}>
        <wui-text align="center" variant="paragraph-500" color="inherit">${this.text}</wui-text>
      </button>
    `}};tP.styles=[w.ET,w.ZM,tO],tN([(0,a.Cb)()],tP.prototype,"text",void 0),tN([(0,a.Cb)({type:Boolean})],tP.prototype,"disabled",void 0),tN([(0,a.Cb)()],tP.prototype,"tabIdx",void 0),tP=tN([(0,b.M)("wui-list-button")],tP);var tj=i(27577);i(46336);var tB=o.iv`
  wui-separator {
    margin: var(--wui-spacing-s) calc(var(--wui-spacing-s) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }

  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }

  wui-icon-link,
  wui-loading-spinner {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  wui-icon-link {
    right: var(--wui-spacing-xs);
  }

  wui-loading-spinner {
    right: var(--wui-spacing-m);
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`,tD=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let tL=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.formRef=(0,e6.V)(),this.email="",this.loading=!1,this.error="",this.remoteFeatures=n.h.state.remoteFeatures,this.unsubscribe.push(n.h.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}firstUpdated(){this.formRef.value?.addEventListener("keydown",e=>{"Enter"===e.key&&this.onSubmitEmail(e)})}render(){let e=Z.l.hasAnyConnection(H.b.CONNECTOR_ID.AUTH);return o.dy`
      <form ${(0,e6.i)(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
        <wui-email-input
          @focus=${this.onFocusEvent.bind(this)}
          .disabled=${this.loading}
          @inputChange=${this.onEmailInputChange.bind(this)}
          tabIdx=${(0,r.o)(this.tabIdx)}
          ?disabled=${e}
        >
        </wui-email-input>

        ${this.submitButtonTemplate()}${this.loadingTemplate()}
        <input type="submit" hidden />
      </form>
      ${this.templateError()}
    `}submitButtonTemplate(){let e=!this.loading&&this.email.length>3;return e?o.dy`
          <wui-icon-link
            size="sm"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitEmail.bind(this)}
          >
          </wui-icon-link>
        `:null}loadingTemplate(){return this.loading?o.dy`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:null}templateError(){return this.error?o.dy`<wui-text variant="tiny-500" color="error-100">${this.error}</wui-text>`:null}onEmailInputChange(e){this.email=e.detail.trim(),this.error=""}async onSubmitEmail(e){let t=H.b.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(e=>e===s.R.state.activeChain);if(!t){let e=s.R.getFirstCaipNetworkSupportsAuthConnector();if(e){Q.P.push("SwitchNetwork",{network:e});return}}try{if(this.loading)return;this.loading=!0,e.preventDefault();let t=q.A.getAuthConnector();if(!t)throw Error("w3m-email-login-widget: Auth connector not found");let{action:i}=await t.provider.connectEmail({email:this.email});if(D.X.sendEvent({type:"track",event:"EMAIL_SUBMITTED"}),"VERIFY_OTP"===i)D.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),Q.P.push("EmailVerifyOtp",{email:this.email});else if("VERIFY_DEVICE"===i)Q.P.push("EmailVerifyDevice",{email:this.email});else if("CONNECT"===i){let e=this.remoteFeatures?.multiWallet;await Z.l.connectExternal(t,s.R.state.activeChain),e?(Q.P.replace("ProfileWallets"),X.K.showSuccess("New Wallet Added")):Q.P.replace("Account")}}catch(t){let e=u.j.parseError(t);e?.includes("Invalid email")?this.error="Invalid email. Try again.":X.K.showError(t)}finally{this.loading=!1}}onFocusEvent(){D.X.sendEvent({type:"track",event:"EMAIL_LOGIN_SELECTED"})}};tL.styles=tB,tD([(0,a.Cb)()],tL.prototype,"tabIdx",void 0),tD([(0,a.SB)()],tL.prototype,"email",void 0),tD([(0,a.SB)()],tL.prototype,"loading",void 0),tD([(0,a.SB)()],tL.prototype,"error",void 0),tD([(0,a.SB)()],tL.prototype,"remoteFeatures",void 0),tL=tD([(0,p.Mo)("w3m-email-login-widget")],tL),i(81433),i(36660);var tW=i(93921),tM=i(88641);i(38606),i(84717);var tz=o.iv`
  :host {
    display: block;
    width: 100%;
  }

  button {
    width: 100%;
    height: 56px;
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`,tU=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let t_=class extends o.oi{constructor(){super(...arguments),this.logo="google",this.disabled=!1,this.tabIdx=void 0}render(){return o.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,r.o)(this.tabIdx)}>
        <wui-logo logo=${this.logo}></wui-logo>
      </button>
    `}};t_.styles=[w.ET,w.ZM,tz],tU([(0,a.Cb)()],t_.prototype,"logo",void 0),tU([(0,a.Cb)({type:Boolean})],t_.prototype,"disabled",void 0),tU([(0,a.Cb)()],t_.prototype,"tabIdx",void 0),t_=tU([(0,b.M)("wui-logo-select")],t_);var tF=i(74077),tK=o.iv`
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-m)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`,tV=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let tH=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.walletGuide="get-started",this.tabIdx=void 0,this.connectors=q.A.state.connectors,this.remoteFeatures=n.h.state.remoteFeatures,this.authConnector=this.connectors.find(e=>"AUTH"===e.type),this.isPwaLoading=!1,this.unsubscribe.push(q.A.subscribeKey("connectors",e=>{this.connectors=e,this.authConnector=this.connectors.find(e=>"AUTH"===e.type)}),n.h.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}connectedCallback(){super.connectedCallback(),this.handlePwaFrameLoad()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return o.dy`
      <wui-flex
        class="container"
        flexDirection="column"
        gap="xs"
        data-testid="w3m-social-login-widget"
      >
        ${this.topViewTemplate()}${this.bottomViewTemplate()}
      </wui-flex>
    `}topViewTemplate(){let e="explore"===this.walletGuide,t=this.remoteFeatures?.socials;return!t&&e?(t=G.bq.DEFAULT_SOCIALS,this.renderTopViewContent(t)):t?this.renderTopViewContent(t):null}renderTopViewContent(e){return 2===e.length?o.dy` <wui-flex gap="xs">
        ${e.slice(0,2).map(e=>o.dy`<wui-logo-select
              data-testid=${`social-selector-${e}`}
              @click=${()=>{this.onSocialClick(e)}}
              logo=${e}
              tabIdx=${(0,r.o)(this.tabIdx)}
              ?disabled=${this.isPwaLoading||this.hasConnection()}
            ></wui-logo-select>`)}
      </wui-flex>`:o.dy` <wui-list-social
      data-testid=${`social-selector-${e[0]}`}
      @click=${()=>{this.onSocialClick(e[0])}}
      logo=${(0,r.o)(e[0])}
      align="center"
      name=${`Continue with ${e[0]}`}
      tabIdx=${(0,r.o)(this.tabIdx)}
      ?disabled=${this.isPwaLoading||this.hasConnection()}
    ></wui-list-social>`}bottomViewTemplate(){let e=this.remoteFeatures?.socials,t="explore"===this.walletGuide,i=!this.authConnector||!e||0===e.length;return(i&&t&&(e=G.bq.DEFAULT_SOCIALS),!e||e.length<=2)?null:e&&e.length>6?o.dy`<wui-flex gap="xs">
        ${e.slice(1,5).map(e=>o.dy`<wui-logo-select
              data-testid=${`social-selector-${e}`}
              @click=${()=>{this.onSocialClick(e)}}
              logo=${e}
              tabIdx=${(0,r.o)(this.tabIdx)}
              ?focusable=${void 0!==this.tabIdx&&this.tabIdx>=0}
              ?disabled=${this.isPwaLoading||this.hasConnection()}
            ></wui-logo-select>`)}
        <wui-logo-select
          logo="more"
          tabIdx=${(0,r.o)(this.tabIdx)}
          @click=${this.onMoreSocialsClick.bind(this)}
          ?disabled=${this.isPwaLoading||this.hasConnection()}
          data-testid="social-selector-more"
        ></wui-logo-select>
      </wui-flex>`:e?o.dy`<wui-flex gap="xs">
      ${e.slice(1,e.length).map(e=>o.dy`<wui-logo-select
            data-testid=${`social-selector-${e}`}
            @click=${()=>{this.onSocialClick(e)}}
            logo=${e}
            tabIdx=${(0,r.o)(this.tabIdx)}
            ?focusable=${void 0!==this.tabIdx&&this.tabIdx>=0}
            ?disabled=${this.isPwaLoading||this.hasConnection()}
          ></wui-logo-select>`)}
    </wui-flex>`:null}onMoreSocialsClick(){Q.P.push("ConnectSocials")}async onSocialClick(e){let t=H.b.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(e=>e===s.R.state.activeChain);if(!t){let e=s.R.getFirstCaipNetworkSupportsAuthConnector();if(e){Q.P.push("SwitchNetwork",{network:e});return}}e&&await (0,tM.y0)(e)}async handlePwaFrameLoad(){if(u.j.isPWA()){this.isPwaLoading=!0;try{this.authConnector?.provider instanceof tF.S&&await this.authConnector.provider.init()}catch(e){tW.B.open({shortMessage:"Error loading embedded wallet in PWA",longMessage:e.message},"error")}finally{this.isPwaLoading=!1}}}hasConnection(){return Z.l.hasAnyConnection(H.b.CONNECTOR_ID.AUTH)}};tH.styles=tK,tV([(0,a.Cb)()],tH.prototype,"walletGuide",void 0),tV([(0,a.Cb)()],tH.prototype,"tabIdx",void 0),tV([(0,a.SB)()],tH.prototype,"connectors",void 0),tV([(0,a.SB)()],tH.prototype,"remoteFeatures",void 0),tV([(0,a.SB)()],tH.prototype,"authConnector",void 0),tV([(0,a.SB)()],tH.prototype,"isPwaLoading",void 0),tH=tV([(0,p.Mo)("w3m-social-login-widget")],tH),i(71161);var tq=o.iv`
  wui-flex {
    width: 100%;
  }

  .wallet-guide {
    width: 100%;
  }

  .chip-box {
    width: fit-content;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }
`,tG=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let tX=class extends o.oi{constructor(){super(...arguments),this.walletGuide="get-started"}render(){return"explore"===this.walletGuide?o.dy`<wui-flex
          class="wallet-guide"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          rowGap="xs"
          data-testid="w3m-wallet-guide-explore"
        >
          <wui-text variant="small-400" color="fg-200" align="center">
            Looking for a self-custody wallet?
          </wui-text>

          <wui-flex class="chip-box">
            <wui-chip
              imageIcon="walletConnectLightBrown"
              icon="externalLink"
              variant="transparent"
              href="https://walletguide.walletconnect.network"
              title="Find one on WalletGuide"
            ></wui-chip>
          </wui-flex>
        </wui-flex>`:o.dy`<wui-flex
          columnGap="4xs"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          .padding=${["s","0","s","0"]}
        >
          <wui-text variant="small-400" class="title" color="fg-200"
            >Haven't got a wallet?</wui-text
          >
          <wui-link
            data-testid="w3m-wallet-guide-get-started"
            color="blue-100"
            class="get-started-link"
            @click=${this.onGetStarted}
            tabIdx=${(0,r.o)(this.tabIdx)}
          >
            Get started
          </wui-link>
        </wui-flex>`}onGetStarted(){Q.P.push("Create")}};tX.styles=tq,tG([(0,a.Cb)()],tX.prototype,"tabIdx",void 0),tG([(0,a.Cb)()],tX.prototype,"walletGuide",void 0),tX=tG([(0,p.Mo)("w3m-wallet-guide")],tX);var tY=o.iv`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`,tQ=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let tZ=class extends o.oi{constructor(){super(...arguments),this.walletImages=[]}render(){let e=this.walletImages.length<4;return o.dy`${this.walletImages.slice(0,4).map(({src:e,walletName:t})=>o.dy`
            <wui-wallet-image
              size="inherit"
              imageSrc=${e}
              name=${(0,r.o)(t)}
            ></wui-wallet-image>
          `)}
      ${e?[...Array(4-this.walletImages.length)].map(()=>o.dy` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};tZ.styles=[w.ET,tY],tQ([(0,a.Cb)({type:Array})],tZ.prototype,"walletImages",void 0),tZ=tQ([(0,b.M)("wui-all-wallets-image")],tZ);var tJ=o.iv`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`,t0=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let t3=class extends o.oi{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.tabIdx=void 0,this.installed=!1,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100"}render(){return o.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,r.o)(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?o.dy` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?o.dy` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?o.dy`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:this.showAllWallets||this.imageSrc?null:o.dy`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`}templateStatus(){return this.loading?o.dy`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?o.dy`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?o.dy`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};t3.styles=[w.ET,w.ZM,tJ],t0([(0,a.Cb)({type:Array})],t3.prototype,"walletImages",void 0),t0([(0,a.Cb)()],t3.prototype,"imageSrc",void 0),t0([(0,a.Cb)()],t3.prototype,"name",void 0),t0([(0,a.Cb)()],t3.prototype,"tagLabel",void 0),t0([(0,a.Cb)()],t3.prototype,"tagVariant",void 0),t0([(0,a.Cb)()],t3.prototype,"icon",void 0),t0([(0,a.Cb)()],t3.prototype,"walletIcon",void 0),t0([(0,a.Cb)()],t3.prototype,"tabIdx",void 0),t0([(0,a.Cb)({type:Boolean})],t3.prototype,"installed",void 0),t0([(0,a.Cb)({type:Boolean})],t3.prototype,"disabled",void 0),t0([(0,a.Cb)({type:Boolean})],t3.prototype,"showAllWallets",void 0),t0([(0,a.Cb)({type:Boolean})],t3.prototype,"loading",void 0),t0([(0,a.Cb)({type:String})],t3.prototype,"loadingSpinnerColor",void 0),t3=t0([(0,b.M)("wui-list-wallet")],t3);var t1=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let t2=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=q.A.state.connectors,this.count=tl.Q.state.count,this.filteredCount=tl.Q.state.filteredWallets.length,this.isFetchingRecommendedWallets=tl.Q.state.isFetchingRecommendedWallets,this.unsubscribe.push(q.A.subscribeKey("connectors",e=>this.connectors=e),tl.Q.subscribeKey("count",e=>this.count=e),tl.Q.subscribeKey("filteredWallets",e=>this.filteredCount=e.length),tl.Q.subscribeKey("isFetchingRecommendedWallets",e=>this.isFetchingRecommendedWallets=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.connectors.find(e=>"walletConnect"===e.id),{allWallets:t}=n.h.state;if(!e||"HIDE"===t||"ONLY_MOBILE"===t&&!u.j.isMobile())return null;let i=tl.Q.state.featured.length,a=this.count+i,s=this.filteredCount>0?this.filteredCount:a<10?a:10*Math.floor(a/10),l=`${s}`;this.filteredCount>0?l=`${this.filteredCount}`:s<a&&(l=`${s}+`);let c=Z.l.hasAnyConnection(H.b.CONNECTOR_ID.WALLET_CONNECT);return o.dy`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${l}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${(0,r.o)(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets?"fg-300":"accent-100"}
        ?disabled=${c}
      ></wui-list-wallet>
    `}onAllWallets(){D.X.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),Q.P.push("AllWallets")}};t1([(0,a.Cb)()],t2.prototype,"tabIdx",void 0),t1([(0,a.SB)()],t2.prototype,"connectors",void 0),t1([(0,a.SB)()],t2.prototype,"count",void 0),t1([(0,a.SB)()],t2.prototype,"filteredCount",void 0),t1([(0,a.SB)()],t2.prototype,"isFetchingRecommendedWallets",void 0),t2=t1([(0,p.Mo)("w3m-all-wallets-widget")],t2);var t5=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let t4=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=q.A.state.connectors,this.connections=Z.l.state.connections,this.unsubscribe.push(q.A.subscribeKey("connectors",e=>this.connectors=e),Z.l.subscribeKey("connections",e=>this.connections=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.connectors.filter(e=>"ANNOUNCED"===e.type);return e?.length?o.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${e.filter(e$.C.showConnector).map(e=>{let t=this.connections.get(e.chain)??[],i=t.some(t=>eQ.g.isLowerCaseMatch(t.connectorId,e.id));return o.dy`
            <wui-list-wallet
              imageSrc=${(0,r.o)(c.f.getConnectorImage(e))}
              name=${e.name??"Unknown"}
              @click=${()=>this.onConnector(e)}
              tagVariant=${i?"shade":"success"}
              tagLabel=${i?"connected":"installed"}
              data-testid=${`wallet-selector-${e.id}`}
              .installed=${!0}
              tabIdx=${(0,r.o)(this.tabIdx)}
            >
            </wui-list-wallet>
          `})}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){"walletConnect"===e.id?u.j.isMobile()?Q.P.push("AllWallets"):Q.P.push("ConnectingWalletConnect"):Q.P.push("ConnectingExternal",{connector:e})}};t5([(0,a.Cb)()],t4.prototype,"tabIdx",void 0),t5([(0,a.SB)()],t4.prototype,"connectors",void 0),t5([(0,a.SB)()],t4.prototype,"connections",void 0),t4=t5([(0,p.Mo)("w3m-connect-announced-widget")],t4);var t6=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let t7=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=q.A.state.connectors,this.loading=!1,this.unsubscribe.push(q.A.subscribeKey("connectors",e=>this.connectors=e)),u.j.isTelegram()&&u.j.isIos()&&(this.loading=!Z.l.state.wcUri,this.unsubscribe.push(Z.l.subscribeKey("wcUri",e=>this.loading=!e)))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{customWallets:e}=n.h.state;if(!e?.length)return this.style.cssText="display: none",null;let t=this.filterOutDuplicateWallets(e),i=Z.l.hasAnyConnection(H.b.CONNECTOR_ID.WALLET_CONNECT);return o.dy`<wui-flex flexDirection="column" gap="xs">
      ${t.map(e=>o.dy`
          <wui-list-wallet
            imageSrc=${(0,r.o)(c.f.getWalletImage(e))}
            name=${e.name??"Unknown"}
            @click=${()=>this.onConnectWallet(e)}
            data-testid=${`wallet-selector-${e.id}`}
            tabIdx=${(0,r.o)(this.tabIdx)}
            ?loading=${this.loading}
            ?disabled=${i}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`}filterOutDuplicateWallets(e){let t=ea.M.getRecentWallets(),i=this.connectors.map(e=>e.info?.rdns).filter(Boolean),o=t.map(e=>e.rdns).filter(Boolean),a=i.concat(o);if(a.includes("io.metamask.mobile")&&u.j.isMobile()){let e=a.indexOf("io.metamask.mobile");a[e]="io.metamask"}let r=e.filter(e=>!a.includes(String(e?.rdns)));return r}onConnectWallet(e){this.loading||Q.P.push("ConnectingWalletConnect",{wallet:e})}};t6([(0,a.Cb)()],t7.prototype,"tabIdx",void 0),t6([(0,a.SB)()],t7.prototype,"connectors",void 0),t6([(0,a.SB)()],t7.prototype,"loading",void 0),t7=t6([(0,p.Mo)("w3m-connect-custom-widget")],t7);var t9=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let t8=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=q.A.state.connectors,this.unsubscribe.push(q.A.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.connectors.filter(e=>"EXTERNAL"===e.type),t=e.filter(e$.C.showConnector),i=t.filter(e=>e.id!==H.b.CONNECTOR_ID.COINBASE_SDK);if(!i?.length)return this.style.cssText="display: none",null;let a=Z.l.hasAnyConnection(H.b.CONNECTOR_ID.WALLET_CONNECT);return o.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${i.map(e=>o.dy`
            <wui-list-wallet
              imageSrc=${(0,r.o)(c.f.getConnectorImage(e))}
              .installed=${!0}
              name=${e.name??"Unknown"}
              data-testid=${`wallet-selector-external-${e.id}`}
              @click=${()=>this.onConnector(e)}
              tabIdx=${(0,r.o)(this.tabIdx)}
              ?disabled=${a}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnector(e){Q.P.push("ConnectingExternal",{connector:e})}};t9([(0,a.Cb)()],t8.prototype,"tabIdx",void 0),t9([(0,a.SB)()],t8.prototype,"connectors",void 0),t8=t9([(0,p.Mo)("w3m-connect-external-widget")],t8);var ie=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let it=class extends o.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.wallets=[]}render(){if(!this.wallets.length)return this.style.cssText="display: none",null;let e=Z.l.hasAnyConnection(H.b.CONNECTOR_ID.WALLET_CONNECT);return o.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(t=>o.dy`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${t.id}`}
              imageSrc=${(0,r.o)(c.f.getWalletImage(t))}
              name=${t.name??"Unknown"}
              @click=${()=>this.onConnectWallet(t)}
              tabIdx=${(0,r.o)(this.tabIdx)}
              ?disabled=${e}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnectWallet(e){q.A.selectWalletConnector(e)}};ie([(0,a.Cb)()],it.prototype,"tabIdx",void 0),ie([(0,a.Cb)()],it.prototype,"wallets",void 0),it=ie([(0,p.Mo)("w3m-connect-featured-widget")],it);var ii=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let io=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=[],this.connections=Z.l.state.connections,this.unsubscribe.push(Z.l.subscribeKey("connections",e=>this.connections=e))}render(){let e=this.connectors.filter(e$.C.showConnector);return 0===e.length?(this.style.cssText="display: none",null):o.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(e=>{let t=this.connections.get(e.chain)??[],i=t.some(t=>eQ.g.isLowerCaseMatch(t.connectorId,e.id));return o.dy`
            <wui-list-wallet
              imageSrc=${(0,r.o)(c.f.getConnectorImage(e))}
              .installed=${!0}
              name=${e.name??"Unknown"}
              tagVariant=${i?"shade":"success"}
              tagLabel=${i?"connected":"installed"}
              data-testid=${`wallet-selector-${e.id}`}
              @click=${()=>this.onConnector(e)}
              tabIdx=${(0,r.o)(this.tabIdx)}
            >
            </wui-list-wallet>
          `})}
      </wui-flex>
    `}onConnector(e){q.A.setActiveConnector(e),Q.P.push("ConnectingExternal",{connector:e})}};ii([(0,a.Cb)()],io.prototype,"tabIdx",void 0),ii([(0,a.Cb)()],io.prototype,"connectors",void 0),ii([(0,a.SB)()],io.prototype,"connections",void 0),io=ii([(0,p.Mo)("w3m-connect-injected-widget")],io);var ia=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let ir=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=q.A.state.connectors,this.unsubscribe.push(q.A.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.connectors.filter(e=>"MULTI_CHAIN"===e.type&&"WalletConnect"!==e.name);return e?.length?o.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(e=>o.dy`
            <wui-list-wallet
              imageSrc=${(0,r.o)(c.f.getConnectorImage(e))}
              .installed=${!0}
              name=${e.name??"Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${e.id}`}
              @click=${()=>this.onConnector(e)}
              tabIdx=${(0,r.o)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){q.A.setActiveConnector(e),Q.P.push("ConnectingMultiChain")}};ia([(0,a.Cb)()],ir.prototype,"tabIdx",void 0),ia([(0,a.SB)()],ir.prototype,"connectors",void 0),ir=ia([(0,p.Mo)("w3m-connect-multi-chain-widget")],ir);var is=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let il=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=q.A.state.connectors,this.loading=!1,this.unsubscribe.push(q.A.subscribeKey("connectors",e=>this.connectors=e)),u.j.isTelegram()&&u.j.isIos()&&(this.loading=!Z.l.state.wcUri,this.unsubscribe.push(Z.l.subscribeKey("wcUri",e=>this.loading=!e)))}render(){let e=ea.M.getRecentWallets(),t=e.filter(e=>!tb.J.isExcluded(e)).filter(e=>!this.hasWalletConnector(e)).filter(e=>this.isWalletCompatibleWithCurrentChain(e));if(!t.length)return this.style.cssText="display: none",null;let i=Z.l.hasAnyConnection(H.b.CONNECTOR_ID.WALLET_CONNECT);return o.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map(e=>o.dy`
            <wui-list-wallet
              imageSrc=${(0,r.o)(c.f.getWalletImage(e))}
              name=${e.name??"Unknown"}
              @click=${()=>this.onConnectWallet(e)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${(0,r.o)(this.tabIdx)}
              ?loading=${this.loading}
              ?disabled=${i}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnectWallet(e){this.loading||q.A.selectWalletConnector(e)}hasWalletConnector(e){return this.connectors.some(t=>t.id===e.id||t.name===e.name)}isWalletCompatibleWithCurrentChain(e){let t=s.R.state.activeChain;return!t||!e.chains||e.chains.some(e=>{let i=e.split(":")[0];return t===i})}};is([(0,a.Cb)()],il.prototype,"tabIdx",void 0),is([(0,a.SB)()],il.prototype,"connectors",void 0),is([(0,a.SB)()],il.prototype,"loading",void 0),il=is([(0,p.Mo)("w3m-connect-recent-widget")],il);var ic=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let id=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.wallets=[],this.loading=!1,u.j.isTelegram()&&u.j.isIos()&&(this.loading=!Z.l.state.wcUri,this.unsubscribe.push(Z.l.subscribeKey("wcUri",e=>this.loading=!e)))}render(){let{connectors:e}=q.A.state,{customWallets:t,featuredWalletIds:i}=n.h.state,a=ea.M.getRecentWallets(),s=e.find(e=>"walletConnect"===e.id),l=e.filter(e=>"INJECTED"===e.type||"ANNOUNCED"===e.type||"MULTI_CHAIN"===e.type),d=l.filter(e=>"Browser Wallet"!==e.name);if(!s)return null;if(i||t||!this.wallets.length)return this.style.cssText="display: none",null;let u=d.length+a.length,h=tb.J.filterOutDuplicateWallets(this.wallets).slice(0,Math.max(0,2-u));if(!h.length)return this.style.cssText="display: none",null;let p=Z.l.hasAnyConnection(H.b.CONNECTOR_ID.WALLET_CONNECT);return o.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${h.map(e=>o.dy`
            <wui-list-wallet
              imageSrc=${(0,r.o)(c.f.getWalletImage(e))}
              name=${e?.name??"Unknown"}
              @click=${()=>this.onConnectWallet(e)}
              tabIdx=${(0,r.o)(this.tabIdx)}
              ?loading=${this.loading}
              ?disabled=${p}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnectWallet(e){if(this.loading)return;let t=q.A.getConnector(e.id,e.rdns);t?Q.P.push("ConnectingExternal",{connector:t}):Q.P.push("ConnectingWalletConnect",{wallet:e})}};ic([(0,a.Cb)()],id.prototype,"tabIdx",void 0),ic([(0,a.Cb)()],id.prototype,"wallets",void 0),ic([(0,a.SB)()],id.prototype,"loading",void 0),id=ic([(0,p.Mo)("w3m-connect-recommended-widget")],id);var iu=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let ih=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=q.A.state.connectors,this.connectorImages=l.W.state.connectorImages,this.unsubscribe.push(q.A.subscribeKey("connectors",e=>this.connectors=e),l.W.subscribeKey("connectorImages",e=>this.connectorImages=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(u.j.isMobile())return this.style.cssText="display: none",null;let e=this.connectors.find(e=>"walletConnect"===e.id);if(!e)return this.style.cssText="display: none",null;let t=e.imageUrl||this.connectorImages[e?.imageId??""],i=Z.l.hasAnyConnection(H.b.CONNECTOR_ID.WALLET_CONNECT);return o.dy`
      <wui-list-wallet
        imageSrc=${(0,r.o)(t)}
        name=${e.name??"Unknown"}
        @click=${()=>this.onConnector(e)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${(0,r.o)(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
        ?disabled=${i}
      >
      </wui-list-wallet>
    `}onConnector(e){q.A.setActiveConnector(e),Q.P.push("ConnectingWalletConnect")}};iu([(0,a.Cb)()],ih.prototype,"tabIdx",void 0),iu([(0,a.SB)()],ih.prototype,"connectors",void 0),iu([(0,a.SB)()],ih.prototype,"connectorImages",void 0),ih=iu([(0,p.Mo)("w3m-connect-walletconnect-widget")],ih);var ip=o.iv`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`,iw=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let ig=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=q.A.state.connectors,this.recommended=tl.Q.state.recommended,this.featured=tl.Q.state.featured,this.unsubscribe.push(q.A.subscribeKey("connectors",e=>this.connectors=e),tl.Q.subscribeKey("recommended",e=>this.recommended=e),tl.Q.subscribeKey("featured",e=>this.featured=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return o.dy`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){let{custom:e,recent:t,announced:i,injected:a,multiChain:n,recommended:s,featured:l,external:c}=e$.C.getConnectorsByType(this.connectors,this.recommended,this.featured),d=e$.C.getConnectorTypeOrder({custom:e,recent:t,announced:i,injected:a,multiChain:n,recommended:s,featured:l,external:c});return d.map(e=>{switch(e){case"injected":return o.dy`
            ${n.length?o.dy`<w3m-connect-multi-chain-widget
                  tabIdx=${(0,r.o)(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`:null}
            ${i.length?o.dy`<w3m-connect-announced-widget
                  tabIdx=${(0,r.o)(this.tabIdx)}
                ></w3m-connect-announced-widget>`:null}
            ${a.length?o.dy`<w3m-connect-injected-widget
                  .connectors=${a}
                  tabIdx=${(0,r.o)(this.tabIdx)}
                ></w3m-connect-injected-widget>`:null}
          `;case"walletConnect":return o.dy`<w3m-connect-walletconnect-widget
            tabIdx=${(0,r.o)(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;case"recent":return o.dy`<w3m-connect-recent-widget
            tabIdx=${(0,r.o)(this.tabIdx)}
          ></w3m-connect-recent-widget>`;case"featured":return o.dy`<w3m-connect-featured-widget
            .wallets=${l}
            tabIdx=${(0,r.o)(this.tabIdx)}
          ></w3m-connect-featured-widget>`;case"custom":return o.dy`<w3m-connect-custom-widget
            tabIdx=${(0,r.o)(this.tabIdx)}
          ></w3m-connect-custom-widget>`;case"external":return o.dy`<w3m-connect-external-widget
            tabIdx=${(0,r.o)(this.tabIdx)}
          ></w3m-connect-external-widget>`;case"recommended":return o.dy`<w3m-connect-recommended-widget
            .wallets=${s}
            tabIdx=${(0,r.o)(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;default:return console.warn(`Unknown connector type: ${e}`),null}})}};ig.styles=ip,iw([(0,a.Cb)()],ig.prototype,"tabIdx",void 0),iw([(0,a.SB)()],ig.prototype,"connectors",void 0),iw([(0,a.SB)()],ig.prototype,"recommended",void 0),iw([(0,a.SB)()],ig.prototype,"featured",void 0),ig=iw([(0,p.Mo)("w3m-connector-list")],ig);var ib=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let im=class extends o.oi{constructor(){super(...arguments),this.tabIdx=void 0}render(){return o.dy`
      <wui-flex flexDirection="column" gap="xs">
        <w3m-connector-list tabIdx=${(0,r.o)(this.tabIdx)}></w3m-connector-list>
        <w3m-all-wallets-widget tabIdx=${(0,r.o)(this.tabIdx)}></w3m-all-wallets-widget>
      </wui-flex>
    `}};ib([(0,a.Cb)()],im.prototype,"tabIdx",void 0),im=ib([(0,p.Mo)("w3m-wallet-login-list")],im);var iv=o.iv`
  :host {
    --connect-scroll--top-opacity: 0;
    --connect-scroll--bottom-opacity: 0;
    --connect-mask-image: none;
  }

  .connect {
    max-height: clamp(360px, 470px, 80vh);
    scrollbar-width: none;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    mask-image: var(--connect-mask-image);
  }

  .guide {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  .connect::-webkit-scrollbar {
    display: none;
  }

  .all-wallets {
    flex-flow: column;
  }

  .connect.disabled,
  .guide.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }

  wui-separator {
    margin: var(--wui-spacing-s) calc(var(--wui-spacing-s) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`,iy=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let ix=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.connectors=q.A.state.connectors,this.authConnector=this.connectors.find(e=>"AUTH"===e.type),this.features=n.h.state.features,this.remoteFeatures=n.h.state.remoteFeatures,this.enableWallets=n.h.state.enableWallets,this.noAdapters=s.R.state.noAdapters,this.walletGuide="get-started",this.checked=tE.M.state.isLegalCheckboxChecked,this.isEmailEnabled=this.remoteFeatures?.email&&!s.R.state.noAdapters,this.isSocialEnabled=this.remoteFeatures?.socials&&this.remoteFeatures.socials.length>0&&!s.R.state.noAdapters,this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors),this.unsubscribe.push(q.A.subscribeKey("connectors",e=>{this.connectors=e,this.authConnector=this.connectors.find(e=>"AUTH"===e.type),this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors)}),n.h.subscribeKey("features",e=>{this.features=e}),n.h.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e,this.setEmailAndSocialEnableCheck(this.noAdapters,this.remoteFeatures)}),n.h.subscribeKey("enableWallets",e=>this.enableWallets=e),s.R.subscribeKey("noAdapters",e=>this.setEmailAndSocialEnableCheck(e,this.remoteFeatures)),tE.M.subscribeKey("isLegalCheckboxChecked",e=>this.checked=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.resizeObserver?.disconnect();let e=this.shadowRoot?.querySelector(".connect");e?.removeEventListener("scroll",this.handleConnectListScroll.bind(this))}firstUpdated(){let e=this.shadowRoot?.querySelector(".connect");e&&(requestAnimationFrame(this.handleConnectListScroll.bind(this)),e?.addEventListener("scroll",this.handleConnectListScroll.bind(this)),this.resizeObserver=new ResizeObserver(()=>{this.handleConnectListScroll()}),this.resizeObserver?.observe(e),this.handleConnectListScroll())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=n.h.state,i=n.h.state.features?.legalCheckbox,a=!!(e||t)&&!!i&&"get-started"===this.walletGuide,r=a&&!this.checked,s=n.h.state.enableWalletGuide,l=this.enableWallets,c=this.isSocialEnabled||this.authConnector;return o.dy`
      <wui-flex flexDirection="column">
        ${this.legalCheckboxTemplate()}
        <wui-flex
          data-testid="w3m-connect-scroll-view"
          flexDirection="column"
          class=${(0,e_.$)({connect:!0,disabled:r})}
        >
          <wui-flex
            class="connect-methods"
            flexDirection="column"
            gap="s"
            .padding=${c&&l&&s&&"get-started"===this.walletGuide?["3xs","s","0","s"]:["3xs","s","s","s"]}
          >
            ${this.renderConnectMethod(r?-1:void 0)}
          </wui-flex>
        </wui-flex>
        ${this.guideTemplate(r)}
        <w3m-legal-footer></w3m-legal-footer>
      </wui-flex>
    `}setEmailAndSocialEnableCheck(e,t){this.isEmailEnabled=t?.email&&!e,this.isSocialEnabled=t?.socials&&t.socials.length>0&&!e,this.remoteFeatures=t,this.noAdapters=e}checkIfAuthEnabled(e){let t=e.filter(e=>e.type===tj.b.CONNECTOR_TYPE_AUTH).map(e=>e.chain),i=H.b.AUTH_CONNECTOR_SUPPORTED_CHAINS;return i.some(e=>t.includes(e))}renderConnectMethod(e){let t=tb.J.getConnectOrderMethod(this.features,this.connectors);return o.dy`${t.map((t,i)=>{switch(t){case"email":return o.dy`${this.emailTemplate(e)} ${this.separatorTemplate(i,"email")}`;case"social":return o.dy`${this.socialListTemplate(e)}
          ${this.separatorTemplate(i,"social")}`;case"wallet":return o.dy`${this.walletListTemplate(e)}
          ${this.separatorTemplate(i,"wallet")}`;default:return null}})}`}checkMethodEnabled(e){switch(e){case"wallet":return this.enableWallets;case"social":return this.isSocialEnabled&&this.isAuthEnabled;case"email":return this.isEmailEnabled&&this.isAuthEnabled;default:return null}}checkIsThereNextMethod(e){let t=tb.J.getConnectOrderMethod(this.features,this.connectors),i=t[e+1];if(!i)return;let o=this.checkMethodEnabled(i);return o?i:this.checkIsThereNextMethod(e+1)}separatorTemplate(e,t){let i=this.checkIsThereNextMethod(e),a="explore"===this.walletGuide;switch(t){case"wallet":{let e=this.enableWallets;return e&&i&&!a?o.dy`<wui-separator data-testid="wui-separator" text="or"></wui-separator>`:null}case"email":return this.isAuthEnabled&&this.isEmailEnabled&&"social"!==i&&i?o.dy`<wui-separator
              data-testid="w3m-email-login-or-separator"
              text="or"
            ></wui-separator>`:null;case"social":return this.isAuthEnabled&&this.isSocialEnabled&&"email"!==i&&i?o.dy`<wui-separator data-testid="wui-separator" text="or"></wui-separator>`:null;default:return null}}emailTemplate(e){return this.isEmailEnabled&&this.isAuthEnabled?o.dy`<w3m-email-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${(0,r.o)(e)}
    ></w3m-email-login-widget>`:null}socialListTemplate(e){return this.isSocialEnabled&&this.isAuthEnabled?o.dy`<w3m-social-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${(0,r.o)(e)}
    ></w3m-social-login-widget>`:null}walletListTemplate(e){let t=this.enableWallets,i=this.features?.emailShowWallets===!1,a=this.features?.collapseWallets;if(!t||(u.j.isTelegram()&&(u.j.isSafari()||u.j.isIos())&&Z.l.connectWalletConnect().catch(e=>({})),"explore"===this.walletGuide))return null;let n=this.isAuthEnabled&&(this.isEmailEnabled||this.isSocialEnabled);return n&&(i||a)?o.dy`<wui-list-button
        data-testid="w3m-collapse-wallets-button"
        tabIdx=${(0,r.o)(e)}
        @click=${this.onContinueWalletClick.bind(this)}
        text="Continue with a wallet"
      ></wui-list-button>`:o.dy`<w3m-wallet-login-list tabIdx=${(0,r.o)(e)}></w3m-wallet-login-list>`}guideTemplate(e=!1){let t=n.h.state.enableWalletGuide;return t&&(this.authConnector||this.isSocialEnabled)?o.dy`
      ${"explore"!==this.walletGuide||s.R.state.noAdapters?null:o.dy`<wui-separator data-testid="wui-separator" id="explore" text="or"></wui-separator>`}
      <w3m-wallet-guide
        class=${(0,e_.$)({guide:!0,disabled:e})}
        tabIdx=${(0,r.o)(e?-1:void 0)}
        walletGuide=${this.walletGuide}
      ></w3m-wallet-guide>
    `:null}legalCheckboxTemplate(){return"explore"===this.walletGuide?null:o.dy`<w3m-legal-checkbox data-testid="w3m-legal-checkbox"></w3m-legal-checkbox>`}handleConnectListScroll(){let e=this.shadowRoot?.querySelector(".connect");if(!e)return;let t=e.scrollHeight>470;t?(e.style.setProperty("--connect-mask-image",`linear-gradient(
          to bottom,
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,
          rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,
          black 40px,
          black calc(100% - 40px),
          rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),
          rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%
        )`),e.style.setProperty("--connect-scroll--top-opacity",p.kj.interpolate([0,50],[0,1],e.scrollTop).toString()),e.style.setProperty("--connect-scroll--bottom-opacity",p.kj.interpolate([0,50],[0,1],e.scrollHeight-e.scrollTop-e.offsetHeight).toString())):(e.style.setProperty("--connect-mask-image","none"),e.style.setProperty("--connect-scroll--top-opacity","0"),e.style.setProperty("--connect-scroll--bottom-opacity","0"))}onContinueWalletClick(){Q.P.push("ConnectWallets")}};ix.styles=iv,iy([(0,tI.S)()],ix.prototype,"connectors",void 0),iy([(0,tI.S)()],ix.prototype,"authConnector",void 0),iy([(0,tI.S)()],ix.prototype,"features",void 0),iy([(0,tI.S)()],ix.prototype,"remoteFeatures",void 0),iy([(0,tI.S)()],ix.prototype,"enableWallets",void 0),iy([(0,tI.S)()],ix.prototype,"noAdapters",void 0),iy([(0,a.Cb)()],ix.prototype,"walletGuide",void 0),iy([(0,tI.S)()],ix.prototype,"checked",void 0),iy([(0,tI.S)()],ix.prototype,"isEmailEnabled",void 0),iy([(0,tI.S)()],ix.prototype,"isSocialEnabled",void 0),iy([(0,tI.S)()],ix.prototype,"isAuthEnabled",void 0),ix=iy([(0,p.Mo)("w3m-connect-view")],ix);var iC=i(36139);i(12377),i(31999);var ik=o.iv`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`,i$=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let iS=class extends o.oi{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return o.dy`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs","2l","1xs","2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `}};iS.styles=[w.ET,w.ZM,ik],i$([(0,a.Cb)({type:Boolean})],iS.prototype,"disabled",void 0),i$([(0,a.Cb)()],iS.prototype,"label",void 0),i$([(0,a.Cb)()],iS.prototype,"buttonLabel",void 0),iS=i$([(0,b.M)("wui-cta-button")],iS);var iR=o.iv`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`,iA=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let iT=class extends o.oi{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;let{name:e,app_store:t,play_store:i,chrome_store:a,homepage:r}=this.wallet,n=u.j.isMobile(),s=u.j.isIos(),l=u.j.isAndroid(),c=[t,i,r,a].filter(Boolean).length>1,d=p.Hg.getTruncateString({string:e,charsStart:12,charsEnd:0,truncate:"end"});return c&&!n?o.dy`
        <wui-cta-button
          label=${`Don't have ${d}?`}
          buttonLabel="Get"
          @click=${()=>Q.P.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!c&&r?o.dy`
        <wui-cta-button
          label=${`Don't have ${d}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:t&&s?o.dy`
        <wui-cta-button
          label=${`Don't have ${d}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:i&&l?o.dy`
        <wui-cta-button
          label=${`Don't have ${d}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){this.wallet?.app_store&&u.j.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&u.j.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&u.j.openHref(this.wallet.homepage,"_blank")}};iT.styles=[iR],iA([(0,a.Cb)({type:Object})],iT.prototype,"wallet",void 0),iT=iA([(0,p.Mo)("w3m-mobile-download-links")],iT);var iI=o.iv`
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

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
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
`,iE=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};class iO extends o.oi{constructor(){super(),this.wallet=Q.P.state.data?.wallet,this.connector=Q.P.state.data?.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=c.f.getWalletImage(this.wallet)??c.f.getConnectorImage(this.connector),this.name=this.wallet?.name??this.connector?.name??"Wallet",this.isRetrying=!1,this.uri=Z.l.state.wcUri,this.error=Z.l.state.wcError,this.ready=!1,this.showRetry=!1,this.label=void 0,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(...[Z.l.subscribeKey("wcUri",e=>{this.uri=e,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())}),Z.l.subscribeKey("wcError",e=>this.error=e)]),(u.j.isTelegram()||u.j.isSafari())&&u.j.isIos()&&Z.l.state.wcUri&&this.onConnect?.()}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),Z.l.setWcError(!1),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();let e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel,t="";return this.label?t=this.label:(t=`Continue in ${this.name}`,this.error&&(t="Connection declined")),o.dy`
      <wui-flex
        data-error=${(0,r.o)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${(0,r.o)(this.imageSrc)}></wui-wallet-image>

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
          <wui-text
            align="center"
            variant="paragraph-500"
            color=${this.error?"error-100":"fg-100"}
          >
            ${t}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${e}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?o.dy`
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying||this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            `:null}
      </wui-flex>

      ${this.isWalletConnect?o.dy`
            <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){if(this.error&&!this.showRetry){this.showRetry=!0;let e=this.shadowRoot?.querySelector("wui-button");e?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onTryAgain(){Z.l.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.()}loaderTemplate(){let e=iC.u.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return o.dy`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(u.j.copyToClopboard(this.uri),X.K.showSuccess("Link copied"))}catch{X.K.showError("Failed to copy")}}}iO.styles=iI,iE([(0,a.SB)()],iO.prototype,"isRetrying",void 0),iE([(0,a.SB)()],iO.prototype,"uri",void 0),iE([(0,a.SB)()],iO.prototype,"error",void 0),iE([(0,a.SB)()],iO.prototype,"ready",void 0),iE([(0,a.SB)()],iO.prototype,"showRetry",void 0),iE([(0,a.SB)()],iO.prototype,"label",void 0),iE([(0,a.SB)()],iO.prototype,"secondaryBtnLabel",void 0),iE([(0,a.SB)()],iO.prototype,"secondaryLabel",void 0),iE([(0,a.SB)()],iO.prototype,"isLoading",void 0),iE([(0,a.Cb)({type:Boolean})],iO.prototype,"isMobile",void 0),iE([(0,a.Cb)()],iO.prototype,"onRetry",void 0);let iN=class extends iO{constructor(){if(super(),this.externalViewUnsubscribe=[],this.connectionsByNamespace=Z.l.getConnections(this.connector?.chain),this.hasMultipleConnections=this.connectionsByNamespace.length>0,this.remoteFeatures=n.h.state.remoteFeatures,this.currentActiveConnectorId=q.A.state.activeConnectorIds[this.connector?.chain],!this.connector)throw Error("w3m-connecting-view: No connector provided");let e=this.connector?.chain;this.isAlreadyConnected(this.connector)&&(this.secondaryBtnLabel=void 0,this.label=`This account is already linked, change your account in ${this.connector.name}`,this.secondaryLabel=`To link a new account, open ${this.connector.name} and switch to the account you want to link`),D.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.connector.name??"Unknown",platform:"browser"}}),this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),this.isWalletConnect=!1,this.externalViewUnsubscribe.push(q.A.subscribeKey("activeConnectorIds",t=>{let i=t[e],o=this.remoteFeatures?.multiWallet;i!==this.currentActiveConnectorId&&(this.hasMultipleConnections&&o?(Q.P.replace("ProfileWallets"),X.K.showSuccess("New Wallet Added")):h.I.close())}),Z.l.subscribeKey("connections",this.onConnectionsChange.bind(this)))}disconnectedCallback(){this.externalViewUnsubscribe.forEach(e=>e())}async onConnectProxy(){try{if(this.error=!1,this.connector){if(this.isAlreadyConnected(this.connector))return;this.connector.id===H.b.CONNECTOR_ID.COINBASE_SDK&&this.error||(await Z.l.connectExternal(this.connector,this.connector.chain),D.X.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.connector.name||"Unknown",caipNetworkId:s.R.getActiveCaipNetwork()?.caipNetworkId}}))}}catch(e){D.X.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),this.error=!0}}onConnectionsChange(e){if(this.connector?.chain&&e.get(this.connector.chain)&&this.isAlreadyConnected(this.connector)){let t=e.get(this.connector.chain)??[],i=this.remoteFeatures?.multiWallet;if(0===t.length)Q.P.replace("Connect");else{let e=eK.f.getConnectionsByConnectorId(this.connectionsByNamespace,this.connector.id).flatMap(e=>e.accounts),o=eK.f.getConnectionsByConnectorId(t,this.connector.id).flatMap(e=>e.accounts);if(0===o.length)this.hasMultipleConnections&&i?(Q.P.replace("ProfileWallets"),X.K.showSuccess("Wallet deleted")):h.I.close();else{let t=e.every(e=>o.some(t=>eQ.g.isLowerCaseMatch(e.address,t.address)));!t&&i&&Q.P.replace("ProfileWallets")}}}}isAlreadyConnected(e){return!!e&&this.connectionsByNamespace.some(t=>eQ.g.isLowerCaseMatch(t.connectorId,e.id))}};iN=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}([(0,p.Mo)("w3m-connecting-external-view")],iN);var iP=o.iv`
  wui-flex,
  wui-list-wallet {
    width: 100%;
  }
`,ij=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let iB=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.activeConnector=q.A.state.activeConnector,this.unsubscribe.push(...[q.A.subscribeKey("activeConnector",e=>this.activeConnector=e)])}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return o.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["m","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image
            size="lg"
            imageSrc=${(0,r.o)(c.f.getConnectorImage(this.activeConnector))}
          ></wui-wallet-image>
        </wui-flex>
        <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="xs"
          .padding=${["0","s","0","s"]}
        >
          <wui-text variant="paragraph-500" color="fg-100">
            Select Chain for ${this.activeConnector?.name}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200"
            >Select which chain to connect to your multi chain wallet</wui-text
          >
        </wui-flex>
        <wui-flex
          flexGrow="1"
          flexDirection="column"
          alignItems="center"
          gap="xs"
          .padding=${["xs","0","xs","0"]}
        >
          ${this.networksTemplate()}
        </wui-flex>
      </wui-flex>
    `}networksTemplate(){return this.activeConnector?.connectors?.map(e=>e.name?o.dy`
            <wui-list-wallet
              imageSrc=${(0,r.o)(c.f.getChainImage(e.chain))}
              name=${H.b.CHAIN_NAME_MAP[e.chain]}
              @click=${()=>this.onConnector(e)}
              data-testid="wui-list-chain-${e.chain}"
            ></wui-list-wallet>
          `:null)}onConnector(e){let t=this.activeConnector?.connectors?.find(t=>t.chain===e.chain);if(!t){X.K.showError("Failed to find connector");return}"walletConnect"===t.id?u.j.isMobile()?Q.P.push("AllWallets"):Q.P.push("ConnectingWalletConnect"):Q.P.push("ConnectingExternal",{connector:t})}};iB.styles=iP,ij([(0,a.SB)()],iB.prototype,"activeConnector",void 0),iB=ij([(0,p.Mo)("w3m-connecting-multi-chain-view")],iB);var iD=i(36563),iL=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let iW=class extends o.oi{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.generateTabs();return o.dy`
      <wui-flex justifyContent="center" .padding=${["0","0","l","0"]}>
        <wui-tabs .tabs=${e} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){let e=this.platforms.map(e=>"browser"===e?{label:"Browser",icon:"extension",platform:"browser"}:"mobile"===e?{label:"Mobile",icon:"mobile",platform:"mobile"}:"qrcode"===e?{label:"Mobile",icon:"mobile",platform:"qrcode"}:"web"===e?{label:"Webapp",icon:"browser",platform:"web"}:"desktop"===e?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=e.map(({platform:e})=>e),e}onTabChange(e){let t=this.platformTabs[e];t&&this.onSelectPlatfrom?.(t)}};iL([(0,a.Cb)({type:Array})],iW.prototype,"platforms",void 0),iL([(0,a.Cb)()],iW.prototype,"onSelectPlatfrom",void 0),iW=iL([(0,p.Mo)("w3m-connecting-header")],iW);let iM=class extends iO{constructor(){if(super(),!this.wallet)throw Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),D.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}async onConnectProxy(){try{this.error=!1;let{connectors:e}=q.A.state,t=e.find(e=>"ANNOUNCED"===e.type&&e.info?.rdns===this.wallet?.rdns||"INJECTED"===e.type||e.name===this.wallet?.name);if(t)await Z.l.connectExternal(t,t.chain);else throw Error("w3m-connecting-wc-browser: No connector found");h.I.close(),D.X.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.wallet?.name||"Unknown",caipNetworkId:s.R.getActiveCaipNetwork()?.caipNetworkId}})}catch(e){D.X.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),this.error=!0}}};iM=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}([(0,p.Mo)("w3m-connecting-wc-browser")],iM);let iz=class extends iO{constructor(){if(super(),!this.wallet)throw Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),D.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop"}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;let{desktop_link:e,name:t}=this.wallet,{redirect:i,href:o}=u.j.formatNativeUrl(e,this.uri);Z.l.setWcLinking({name:t,href:o}),Z.l.setRecentWallet(this.wallet),u.j.openHref(i,"_blank")}catch{this.error=!0}}};iz=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}([(0,p.Mo)("w3m-connecting-wc-desktop")],iz);var iU=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let i_=class extends iO{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=n.h.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{if(this.wallet?.mobile_link&&this.uri)try{this.error=!1;let{mobile_link:e,link_mode:t,name:i}=this.wallet,{redirect:o,redirectUniversalLink:a,href:r}=u.j.formatNativeUrl(e,this.uri,t);this.redirectDeeplink=o,this.redirectUniversalLink=a,this.target=u.j.isIframe()?"_top":"_self",Z.l.setWcLinking({name:i,href:r}),Z.l.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?u.j.openHref(this.redirectUniversalLink,this.target):u.j.openHref(this.redirectDeeplink,this.target)}catch(e){D.X.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:e instanceof Error?e.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=G.bq.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(Z.l.subscribeKey("wcUri",()=>{this.onHandleURI()})),D.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile"}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onTryAgain(){Z.l.setWcError(!1),this.onConnect?.()}};iU([(0,a.SB)()],i_.prototype,"redirectDeeplink",void 0),iU([(0,a.SB)()],i_.prototype,"redirectUniversalLink",void 0),iU([(0,a.SB)()],i_.prototype,"target",void 0),iU([(0,a.SB)()],i_.prototype,"preferUniversalLinks",void 0),iU([(0,a.SB)()],i_.prototype,"isLoading",void 0),i_=iU([(0,p.Mo)("w3m-connecting-wc-mobile")],i_),i(26405),i(5058);var iF=o.iv`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`;let iK=class extends iO{constructor(){super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),D.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet?.name??"WalletConnect",platform:"qrcode"}})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.forEach(e=>e()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),o.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","xl","xl","xl"]}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;let e=this.getBoundingClientRect().width-40,t=this.wallet?this.wallet.name:void 0;return Z.l.setWcLinking(void 0),Z.l.setRecentWallet(this.wallet),o.dy` <wui-qr-code
      size=${e}
      theme=${iC.u.state.themeMode}
      uri=${this.uri}
      imageSrc=${(0,r.o)(c.f.getWalletImage(this.wallet))}
      color=${(0,r.o)(iC.u.state.themeVariables["--w3m-qr-color"])}
      alt=${(0,r.o)(t)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){let e=!this.uri||!this.ready;return o.dy`<wui-link
      .disabled=${e}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};iK.styles=iF,iK=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}([(0,p.Mo)("w3m-connecting-wc-qrcode")],iK);let iV=class extends o.oi{constructor(){if(super(),this.wallet=Q.P.state.data?.wallet,!this.wallet)throw Error("w3m-connecting-wc-unsupported: No wallet provided");D.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}render(){return o.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${(0,r.o)(c.f.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};iV=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}([(0,p.Mo)("w3m-connecting-wc-unsupported")],iV);var iH=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let iq=class extends iO{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=G.bq.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(Z.l.subscribeKey("wcUri",()=>{this.updateLoadingState()})),D.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web"}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;let{webapp_link:e,name:t}=this.wallet,{redirect:i,href:o}=u.j.formatUniversalUrl(e,this.uri);Z.l.setWcLinking({name:t,href:o}),Z.l.setRecentWallet(this.wallet),u.j.openHref(i,"_blank")}catch{this.error=!0}}};iH([(0,a.SB)()],iq.prototype,"isLoading",void 0),iq=iH([(0,p.Mo)("w3m-connecting-wc-web")],iq);var iG=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let iX=class extends o.oi{constructor(){super(),this.wallet=Q.P.state.data?.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!n.h.state.siwx,this.remoteFeatures=n.h.state.remoteFeatures,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(n.h.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return o.dy`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding?o.dy`<wui-ux-by-reown></wui-ux-by-reown>`:null}async initializeConnection(e=!1){if("browser"!==this.platform&&(!n.h.state.manualWCControl||e))try{let{wcPairingExpiry:t,status:i}=Z.l.state;if(e||n.h.state.enableEmbedded||u.j.isPairingExpired(t)||"connecting"===i){let e=Z.l.getConnections(s.R.state.activeChain),t=this.remoteFeatures?.multiWallet,i=e.length>0;await Z.l.connectWalletConnect(),this.isSiwxEnabled||(i&&t?(Q.P.replace("ProfileWallets"),X.K.showSuccess("New Wallet Added")):h.I.close())}}catch(e){if(e instanceof Error&&e.message.includes("An error occurred when attempting to switch chain")&&!n.h.state.enableNetworkSwitch&&s.R.state.activeChain){s.R.setActiveCaipNetwork(iD.f.getUnsupportedNetwork(`${s.R.state.activeChain}:${s.R.state.activeCaipNetwork?.id}`)),s.R.showUnsupportedChainUI();return}D.X.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:e?.message??"Unknown"}}),Z.l.setWcError(!0),X.K.showError(e.message??"Connection error"),Z.l.resetWcConnection(),Q.P.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;let{mobile_link:e,desktop_link:t,webapp_link:i,injected:o,rdns:a}=this.wallet,r=o?.map(({injected_id:e})=>e).filter(Boolean),l=[...a?[a]:r??[]],c=!n.h.state.isUniversalProvider&&l.length,d=Z.l.checkInstalled(l),h=c&&d,p=t&&!u.j.isMobile();h&&!s.R.state.noAdapters&&this.platforms.push("browser"),e&&this.platforms.push(u.j.isMobile()?"mobile":"qrcode"),i&&this.platforms.push("web"),p&&this.platforms.push("desktop"),h||!c||s.R.state.noAdapters||this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return o.dy`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return o.dy`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return o.dy`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return o.dy`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return o.dy`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return o.dy`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){let e=this.platforms.length>1;return e?o.dy`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(e){let t=this.shadowRoot?.querySelector("div");t&&(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=e,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};iG([(0,a.SB)()],iX.prototype,"platform",void 0),iG([(0,a.SB)()],iX.prototype,"platforms",void 0),iG([(0,a.SB)()],iX.prototype,"isSiwxEnabled",void 0),iG([(0,a.SB)()],iX.prototype,"remoteFeatures",void 0),iX=iG([(0,p.Mo)("w3m-connecting-wc-view")],iX);var iY=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let iQ=class extends o.oi{constructor(){super(...arguments),this.isMobile=u.j.isMobile()}render(){if(this.isMobile){let{featured:e,recommended:t}=tl.Q.state,{customWallets:i}=n.h.state,a=ea.M.getRecentWallets(),r=e.length||t.length||i?.length||a.length;return o.dy`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${["3xs","s","s","s"]}
      >
        ${r?o.dy`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return o.dy`<wui-flex flexDirection="column" .padding=${["0","0","l","0"]}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${["0","m","0","m"]}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`}};iY([(0,a.SB)()],iQ.prototype,"isMobile",void 0),iQ=iY([(0,p.Mo)("w3m-connecting-wc-basic-view")],iQ);var iZ=i(53108),iJ=o.iv`
  .continue-button-container {
    width: 100%;
  }
`,i0=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let i3=class extends o.oi{constructor(){super(...arguments),this.loading=!1}render(){return o.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="xxl"
        .padding=${["0","0","l","0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${()=>{u.j.openHref(iZ.U.URLS.FAQ,"_blank")}}
        >
          Learn more about names
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `}onboardingTemplate(){return o.dy` <wui-flex
      flexDirection="column"
      gap="xxl"
      alignItems="center"
      .padding=${["0","xxl","0","xxl"]}
    >
      <wui-flex gap="s" alignItems="center" justifyContent="center">
        <wui-icon-box
          icon="id"
          size="xl"
          iconSize="xxl"
          iconColor="fg-200"
          backgroundColor="fg-200"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="s">
        <wui-text align="center" variant="medium-600" color="fg-100">
          Choose your account name
        </wui-text>
        <wui-text align="center" variant="paragraph-400" color="fg-100">
          Finally say goodbye to 0x addresses, name your account to make it easier to exchange
          assets
        </wui-text>
      </wui-flex>
    </wui-flex>`}buttonsTemplate(){return o.dy`<wui-flex
      .padding=${["0","2l","0","2l"]}
      gap="s"
      class="continue-button-container"
    >
      <wui-button
        fullWidth
        .loading=${this.loading}
        size="lg"
        borderRadius="xs"
        @click=${this.handleContinue.bind(this)}
        >Choose name
      </wui-button>
    </wui-flex>`}handleContinue(){Q.P.push("RegisterAccountName"),D.X.sendEvent({type:"track",event:"OPEN_ENS_FLOW",properties:{isSmartAccount:(0,Y.r9)(s.R.state.activeChain)===eo.y_.ACCOUNT_TYPES.SMART_ACCOUNT}})}};i3.styles=iJ,i0([(0,a.SB)()],i3.prototype,"loading",void 0),i3=i0([(0,p.Mo)("w3m-choose-account-name-view")],i3);let i1=class extends o.oi{constructor(){super(...arguments),this.wallet=Q.P.state.data?.wallet}render(){if(!this.wallet)throw Error("w3m-downloads-view");return o.dy`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s","s","l","s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){return this.wallet?.chrome_store?o.dy`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?o.dy`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?o.dy`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?o.dy`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){this.wallet?.chrome_store&&u.j.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){this.wallet?.app_store&&u.j.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&u.j.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&u.j.openHref(this.wallet.homepage,"_blank")}};i1=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}([(0,p.Mo)("w3m-downloads-view")],i1);let i2=class extends o.oi{render(){return o.dy`
      <wui-flex flexDirection="column" .padding=${["0","s","s","s"]} gap="xs">
        ${this.recommendedWalletsTemplate()}
        <wui-list-wallet
          name="Explore all"
          showAllWallets
          walletIcon="allWallets"
          icon="externalLink"
          @click=${()=>{u.j.openHref("https://walletconnect.com/explorer?type=wallet","_blank")}}
        ></wui-list-wallet>
      </wui-flex>
    `}recommendedWalletsTemplate(){let{recommended:e,featured:t}=tl.Q.state,{customWallets:i}=n.h.state,a=[...t,...i??[],...e].slice(0,4);return a.map(e=>o.dy`
        <wui-list-wallet
          name=${e.name??"Unknown"}
          tagVariant="main"
          imageSrc=${(0,r.o)(c.f.getWalletImage(e))}
          @click=${()=>{u.j.openHref(e.homepage??"https://walletconnect.com/explorer","_blank")}}
        ></wui-list-wallet>
      `)}};i2=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}([(0,p.Mo)("w3m-get-wallet-view")],i2),i(82285);var i5=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let i4=class extends o.oi{constructor(){super(...arguments),this.data=[]}render(){return o.dy`
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        ${this.data.map(e=>o.dy`
            <wui-flex flexDirection="column" alignItems="center" gap="xl">
              <wui-flex flexDirection="row" justifyContent="center" gap="1xs">
                ${e.images.map(e=>o.dy`<wui-visual name=${e}></wui-visual>`)}
              </wui-flex>
            </wui-flex>
            <wui-flex flexDirection="column" alignItems="center" gap="xxs">
              <wui-text variant="paragraph-500" color="fg-100" align="center">
                ${e.title}
              </wui-text>
              <wui-text variant="small-500" color="fg-200" align="center">${e.text}</wui-text>
            </wui-flex>
          `)}
      </wui-flex>
    `}};i5([(0,a.Cb)({type:Array})],i4.prototype,"data",void 0),i4=i5([(0,p.Mo)("w3m-help-widget")],i4);let i6=[{images:["login","profile","lock"],title:"One login for all of web3",text:"Log in to any app by connecting your wallet. Say goodbye to countless passwords!"},{images:["defi","nft","eth"],title:"A home for your digital assets",text:"A wallet lets you store, send and receive digital assets like cryptocurrencies and NFTs."},{images:["browser","noun","dao"],title:"Your gateway to a new web",text:"With your wallet, you can explore and interact with DeFi, NFTs, DAOs, and much more."}],i7=class extends o.oi{render(){return o.dy`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","xl","xl","xl"]}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${i6}></w3m-help-widget>
        <wui-button variant="main" size="md" @click=${this.onGetWallet.bind(this)}>
          <wui-icon color="inherit" slot="iconLeft" name="wallet"></wui-icon>
          Get a wallet
        </wui-button>
      </wui-flex>
    `}onGetWallet(){D.X.sendEvent({type:"track",event:"CLICK_GET_WALLET"}),Q.P.push("GetWallet")}};i7=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}([(0,p.Mo)("w3m-what-is-a-wallet-view")],i7);var i9=o.iv`
  wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }
  wui-flex::-webkit-scrollbar {
    display: none;
  }
  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`,i8=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let oe=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.checked=tE.M.state.isLegalCheckboxChecked,this.unsubscribe.push(tE.M.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=n.h.state,i=n.h.state.features?.legalCheckbox,a=!!(e||t)&&!!i,s=a&&!this.checked;return o.dy`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${a?["0","s","s","s"]:"s"}
        gap="xs"
        class=${(0,r.o)(s?"disabled":void 0)}
      >
        <w3m-wallet-login-list tabIdx=${(0,r.o)(s?-1:void 0)}></w3m-wallet-login-list>
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}};oe.styles=i9,i8([(0,a.SB)()],oe.prototype,"checked",void 0),oe=i8([(0,p.Mo)("w3m-connect-wallets-view")],oe);var ot=o.iv`
  :host {
    display: block;
    width: var(--wui-box-size-lg);
    height: var(--wui-box-size-lg);
  }

  svg {
    width: var(--wui-box-size-lg);
    height: var(--wui-box-size-lg);
    fill: none;
    stroke: transparent;
    stroke-linecap: round;
  }

  use {
    stroke: var(--wui-color-accent-100);
    stroke-width: 2px;
    stroke-dasharray: 54, 118;
    stroke-dashoffset: 172;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;let oi=class extends o.oi{render(){return o.dy`
      <svg viewBox="0 0 54 59">
        <path
          id="wui-loader-path"
          d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"
        />
        <use xlink:href="#wui-loader-path"></use>
      </svg>
    `}};oi.styles=[w.ET,ot],oi=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}([(0,b.M)("wui-loading-hexagon")],oi),i(83096);var oo=o.iv`
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

  wui-loading-hexagon {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: 4px;
    bottom: 0;
    opacity: 0;
    transform: scale(0.5);
    z-index: 1;
  }

  wui-button {
    display: none;
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  wui-button[data-retry='true'] {
    display: block;
    opacity: 1;
  }
`,oa=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let or=class extends o.oi{constructor(){super(),this.network=Q.P.state.data?.network,this.unsubscribe=[],this.showRetry=!1,this.error=!1}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}firstUpdated(){this.onSwitchNetwork()}render(){if(!this.network)throw Error("w3m-network-switch-view: No network provided");this.onShowRetry();let e=this.getLabel(),t=this.getSubLabel();return o.dy`
      <wui-flex
        data-error=${this.error}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","3xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-network-image
            size="lg"
            imageSrc=${(0,r.o)(c.f.getNetworkImage(this.network))}
          ></wui-network-image>

          ${this.error?null:o.dy`<wui-loading-hexagon></wui-loading-hexagon>`}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            ?border=${!0}
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100">${e}</wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${t}</wui-text>
        </wui-flex>

        <wui-button
          data-retry=${this.showRetry}
          variant="accent"
          size="md"
          .disabled=${!this.error}
          @click=${this.onSwitchNetwork.bind(this)}
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try again
        </wui-button>
      </wui-flex>
    `}getSubLabel(){let e=q.A.getConnectorId(s.R.state.activeChain),t=q.A.getAuthConnector();return t&&e===H.b.CONNECTOR_ID.AUTH?"":this.error?"Switch can be declined if chain is not supported by a wallet or previous request is still active":"Accept connection request in your wallet"}getLabel(){let e=q.A.getConnectorId(s.R.state.activeChain),t=q.A.getAuthConnector();return t&&e===H.b.CONNECTOR_ID.AUTH?`Switching to ${this.network?.name??"Unknown"} network...`:this.error?"Switch declined":"Approve in wallet"}onShowRetry(){if(this.error&&!this.showRetry){this.showRetry=!0;let e=this.shadowRoot?.querySelector("wui-button");e?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onSwitchNetwork(){try{this.error=!1,s.R.state.activeChain!==this.network?.chainNamespace&&s.R.setIsSwitchingNamespace(!0),this.network&&s.R.switchActiveNetwork(this.network)}catch(e){this.error=!0}}};or.styles=oo,oa([(0,a.SB)()],or.prototype,"showRetry",void 0),oa([(0,a.SB)()],or.prototype,"error",void 0),or=oa([(0,p.Mo)("w3m-network-switch-view")],or);var on=i(65360);i(98405),i(13185);var os=o.iv`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button[data-transparent='true'] {
    pointer-events: none;
    background-color: transparent;
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-image {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    border-radius: 100%;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }
`,ol=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let oc=class extends o.oi{constructor(){super(...arguments),this.imageSrc="",this.name="",this.disabled=!1,this.selected=!1,this.transparent=!1}render(){return o.dy`
      <button data-transparent=${this.transparent} ?disabled=${this.disabled}>
        <wui-flex gap="s" alignItems="center">
          ${this.templateNetworkImage()}
          <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text></wui-flex
        >
        ${this.checkmarkTemplate()}
      </button>
    `}checkmarkTemplate(){return this.selected?o.dy`<wui-icon size="sm" color="accent-100" name="checkmarkBold"></wui-icon>`:null}templateNetworkImage(){return this.imageSrc?o.dy`<wui-image size="sm" src=${this.imageSrc} name=${this.name}></wui-image>`:this.imageSrc?null:o.dy`<wui-network-image
        ?round=${!0}
        size="md"
        name=${this.name}
      ></wui-network-image>`}};oc.styles=[w.ET,w.ZM,os],ol([(0,a.Cb)()],oc.prototype,"imageSrc",void 0),ol([(0,a.Cb)()],oc.prototype,"name",void 0),ol([(0,a.Cb)({type:Boolean})],oc.prototype,"disabled",void 0),ol([(0,a.Cb)({type:Boolean})],oc.prototype,"selected",void 0),ol([(0,a.Cb)({type:Boolean})],oc.prototype,"transparent",void 0),oc=ol([(0,b.M)("wui-list-network")],oc);var od=o.iv`
  .container {
    max-height: 360px;
    overflow: auto;
  }

  .container::-webkit-scrollbar {
    display: none;
  }
`,ou=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let oh=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.network=s.R.state.activeCaipNetwork,this.requestedCaipNetworks=s.R.getCaipNetworks(),this.search="",this.onDebouncedSearch=u.j.debounce(e=>{this.search=e},100),this.unsubscribe.push(l.W.subscribeNetworkImages(()=>this.requestUpdate()),s.R.subscribeKey("activeCaipNetwork",e=>this.network=e),s.R.subscribe(()=>{this.requestedCaipNetworks=s.R.getAllRequestedCaipNetworks()}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return o.dy`
      ${this.templateSearchInput()}
      <wui-flex
        class="container"
        .padding=${["0","s","s","s"]}
        flexDirection="column"
        gap="xs"
      >
        ${this.networksTemplate()}
      </wui-flex>

      <wui-separator></wui-separator>

      <wui-flex padding="s" flexDirection="column" gap="m" alignItems="center">
        <wui-text variant="small-400" color="fg-300" align="center">
          Your connected wallet may not support some of the networks available for this dApp
        </wui-text>
        <wui-link @click=${this.onNetworkHelp.bind(this)}>
          <wui-icon size="xs" color="accent-100" slot="iconLeft" name="helpCircle"></wui-icon>
          What is a network
        </wui-link>
      </wui-flex>
    `}templateSearchInput(){return o.dy`
      <wui-flex gap="xs" .padding=${["0","s","s","s"]}>
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="md"
          placeholder="Search network"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onNetworkHelp(){D.X.sendEvent({type:"track",event:"CLICK_NETWORK_HELP"}),Q.P.push("WhatIsANetwork")}networksTemplate(){let e=s.R.getAllApprovedCaipNetworkIds(),t=u.j.sortRequestedNetworks(e,this.requestedCaipNetworks);return this.search?this.filteredNetworks=t?.filter(e=>e?.name?.toLowerCase().includes(this.search.toLowerCase())):this.filteredNetworks=t,this.filteredNetworks?.map(e=>o.dy`
        <wui-list-network
          .selected=${this.network?.id===e.id}
          imageSrc=${(0,r.o)(c.f.getNetworkImage(e))}
          type="network"
          name=${e.name??e.id}
          @click=${()=>this.onSwitchNetwork(e)}
          .disabled=${this.getNetworkDisabled(e)}
          data-testid=${`w3m-network-switch-${e.name??e.id}`}
        ></wui-list-network>
      `)}getNetworkDisabled(e){let t=e.chainNamespace,i=d.N.getCaipAddress(t),o=s.R.getAllApprovedCaipNetworkIds(),a=!1!==s.R.getNetworkProp("supportsAllNetworks",t),r=q.A.getConnectorId(t),n=q.A.getAuthConnector(),l=r===H.b.CONNECTOR_ID.AUTH&&n;return!!i&&!a&&!l&&!o?.includes(e.caipNetworkId)}onSwitchNetwork(e){on.p.onSwitchNetwork({network:e})}};oh.styles=od,ou([(0,a.SB)()],oh.prototype,"network",void 0),ou([(0,a.SB)()],oh.prototype,"requestedCaipNetworks",void 0),ou([(0,a.SB)()],oh.prototype,"filteredNetworks",void 0),ou([(0,a.SB)()],oh.prototype,"search",void 0),oh=ou([(0,p.Mo)("w3m-networks-view")],oh);var op=o.iv`
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

  .capitalize {
    text-transform: capitalize;
  }
`,ow=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let og={eip155:"eth",solana:"solana",bip122:"bitcoin",polkadot:void 0},ob=class extends o.oi{constructor(){super(...arguments),this.unsubscribe=[],this.switchToChain=Q.P.state.data?.switchToChain,this.caipNetwork=Q.P.state.data?.network,this.activeChain=s.R.state.activeChain}firstUpdated(){this.unsubscribe.push(s.R.subscribeKey("activeChain",e=>this.activeChain=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.switchToChain?H.b.CHAIN_NAME_MAP[this.switchToChain]:"supported";if(!this.switchToChain)return null;let t=H.b.CHAIN_NAME_MAP[this.switchToChain];return o.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" flexDirection="column" alignItems="center" gap="xl">
          <wui-visual name=${(0,r.o)(og[this.switchToChain])}></wui-visual>
          <wui-text
            data-testid=${`w3m-switch-active-chain-to-${t}`}
            variant="paragraph-500"
            color="fg-100"
            align="center"
            >Switch to <span class="capitalize">${t}</span></wui-text
          >
          <wui-text variant="small-400" color="fg-200" align="center">
            Connected wallet doesn't support connecting to ${e} chain. You
            need to connect with a different wallet.
          </wui-text>
          <wui-button
            data-testid="w3m-switch-active-chain-button"
            size="md"
            @click=${this.switchActiveChain.bind(this)}
            >Switch</wui-button
          >
        </wui-flex>
      </wui-flex>
    `}async switchActiveChain(){this.switchToChain&&(s.R.setIsSwitchingNamespace(!0),q.A.setFilterByNamespace(this.switchToChain),this.caipNetwork?await s.R.switchActiveNetwork(this.caipNetwork):s.R.setActiveNamespace(this.switchToChain),Q.P.reset("Connect"))}};ob.styles=op,ow([(0,a.Cb)()],ob.prototype,"activeChain",void 0),ob=ow([(0,p.Mo)("w3m-switch-active-chain-view")],ob);let of=[{images:["network","layers","system"],title:"The system’s nuts and bolts",text:"A network is what brings the blockchain to life, as this technical infrastructure allows apps to access the ledger and smart contract services."},{images:["noun","defiAlt","dao"],title:"Designed for different uses",text:"Each network is designed differently, and may therefore suit certain apps and experiences."}],om=class extends o.oi{render(){return o.dy`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","xl","xl","xl"]}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${of}></w3m-help-widget>
        <wui-button
          variant="main"
          size="md"
          @click=${()=>{u.j.openHref("https://ethereum.org/en/developers/docs/networks/","_blank")}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-button>
      </wui-flex>
    `}};om=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}([(0,p.Mo)("w3m-what-is-a-network-view")],om);var ov=o.iv`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`,oy=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let ox=class extends o.oi{constructor(){super(),this.swapUnsupportedChain=Q.P.state.data?.swapUnsupportedChain,this.unsubscribe=[],this.disconnecting=!1,this.remoteFeatures=n.h.state.remoteFeatures,this.unsubscribe.push(l.W.subscribeNetworkImages(()=>this.requestUpdate()),n.h.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return o.dy`
      <wui-flex class="container" flexDirection="column" gap="0">
        <wui-flex
          class="container"
          flexDirection="column"
          .padding=${["m","xl","xs","xl"]}
          alignItems="center"
          gap="xl"
        >
          ${this.descriptionTemplate()}
        </wui-flex>

        <wui-flex flexDirection="column" padding="s" gap="xs">
          ${this.networksTemplate()}
        </wui-flex>

        <wui-separator text="or"></wui-separator>
        <wui-flex flexDirection="column" padding="s" gap="xs">
          <wui-list-item
            variant="icon"
            iconVariant="overlay"
            icon="disconnect"
            ?chevron=${!1}
            .loading=${this.disconnecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `}descriptionTemplate(){return this.swapUnsupportedChain?o.dy`
        <wui-text variant="small-400" color="fg-200" align="center">
          The swap feature doesn’t support your current network. Switch to an available option to
          continue.
        </wui-text>
      `:o.dy`
      <wui-text variant="small-400" color="fg-200" align="center">
        This app doesn’t support your current network. Switch to an available option to continue.
      </wui-text>
    `}networksTemplate(){let e=s.R.getAllRequestedCaipNetworks(),t=s.R.getAllApprovedCaipNetworkIds(),i=u.j.sortRequestedNetworks(t,e),a=this.swapUnsupportedChain?i.filter(e=>G.bq.SWAP_SUPPORTED_NETWORKS.includes(e.caipNetworkId)):i;return a.map(e=>o.dy`
        <wui-list-network
          imageSrc=${(0,r.o)(c.f.getNetworkImage(e))}
          name=${e.name??"Unknown"}
          @click=${()=>this.onSwitchNetwork(e)}
        >
        </wui-list-network>
      `)}async onDisconnect(){try{this.disconnecting=!0;let e=s.R.state.activeChain,t=Z.l.getConnections(e),i=t.length>0,o=e&&q.A.state.activeConnectorIds[e],a=this.remoteFeatures?.multiWallet;await Z.l.disconnect(a?{id:o,namespace:e}:{}),i&&a&&(Q.P.push("ProfileWallets"),X.K.showSuccess("Wallet deleted"))}catch{D.X.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),X.K.showError("Failed to disconnect")}finally{this.disconnecting=!1}}async onSwitchNetwork(e){let t=d.N.state.caipAddress,i=s.R.getAllApprovedCaipNetworkIds(),o=(s.R.getNetworkProp("supportsAllNetworks",e.chainNamespace),Q.P.state.data);t?i?.includes(e.caipNetworkId)?await s.R.switchActiveNetwork(e):Q.P.push("SwitchNetwork",{...o,network:e}):t||(s.R.setActiveCaipNetwork(e),Q.P.push("Connect"))}};ox.styles=ov,oy([(0,a.SB)()],ox.prototype,"disconnecting",void 0),oy([(0,a.SB)()],ox.prototype,"remoteFeatures",void 0),ox=oy([(0,p.Mo)("w3m-unsupported-chain-view")],ox);var oC=o.iv`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-s);
    padding: var(--wui-spacing-1xs) var(--wui-spacing-s) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }
`,ok=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let o$=class extends o.oi{constructor(){super(...arguments),this.icon="externalLink",this.text=""}render(){return o.dy`
      <wui-flex gap="1xs" alignItems="center">
        <wui-icon-box
          size="sm"
          iconcolor="fg-200"
          backgroundcolor="fg-200"
          icon=${this.icon}
          background="transparent"
        ></wui-icon-box>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
      </wui-flex>
    `}};o$.styles=[w.ET,w.ZM,oC],ok([(0,a.Cb)()],o$.prototype,"icon",void 0),ok([(0,a.Cb)()],o$.prototype,"text",void 0),o$=ok([(0,b.M)("wui-banner")],o$);var oS=o.iv`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`;let oR=class extends o.oi{constructor(){super(),this.unsubscribe=[]}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return o.dy` <wui-flex
      flexDirection="column"
      .padding=${["xs","s","m","s"]}
      gap="xs"
    >
      <wui-banner
        icon="warningCircle"
        text="You can only receive assets on these networks"
      ></wui-banner>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){let e=s.R.getAllRequestedCaipNetworks(),t=s.R.getAllApprovedCaipNetworkIds(),i=s.R.state.activeCaipNetwork,a=s.R.checkIfSmartAccountEnabled(),n=u.j.sortRequestedNetworks(t,e);if(a&&(0,Y.r9)(i?.chainNamespace)===eo.y_.ACCOUNT_TYPES.SMART_ACCOUNT){if(!i)return null;n=[i]}let l=n.filter(e=>e.chainNamespace===i?.chainNamespace);return l.map(e=>o.dy`
        <wui-list-network
          imageSrc=${(0,r.o)(c.f.getNetworkImage(e))}
          name=${e.name??"Unknown"}
          ?transparent=${!0}
        >
        </wui-list-network>
      `)}};oR.styles=oS,oR=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}([(0,p.Mo)("w3m-wallet-compatible-networks-view")],oR);var oA=i(28672),oT=o.iv`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--wui-icon-box-size-xl);
    height: var(--wui-icon-box-size-xl);
    box-shadow: 0 0 0 8px var(--wui-thumbnail-border);
    border-radius: var(--local-border-radius);
    overflow: hidden;
  }

  wui-icon {
    width: 32px;
    height: 32px;
  }
`,oI=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let oE=class extends o.oi{render(){return this.style.cssText=`--local-border-radius: ${this.borderRadiusFull?"1000px":"20px"}; background-color: var(--wui-color-modal-bg);`,o.dy`${this.templateVisual()}`}templateVisual(){return this.imageSrc?o.dy`<wui-image src=${this.imageSrc} alt=${this.alt??""}></wui-image>`:o.dy`<wui-icon
      data-parent-size="md"
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};oE.styles=[w.ET,oT],oI([(0,a.Cb)()],oE.prototype,"imageSrc",void 0),oI([(0,a.Cb)()],oE.prototype,"alt",void 0),oI([(0,a.Cb)({type:Boolean})],oE.prototype,"borderRadiusFull",void 0),oE=oI([(0,b.M)("wui-visual-thumbnail")],oE);var oO=o.iv`
  :host {
    display: flex;
    justify-content: center;
    gap: var(--wui-spacing-2xl);
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`;let oN=class extends o.oi{constructor(){super(...arguments),this.dappImageUrl=n.h.state.metadata?.icons,this.walletImageUrl=d.N.state.connectedWalletInfo?.icon}firstUpdated(){let e=this.shadowRoot?.querySelectorAll("wui-visual-thumbnail");e?.[0]&&this.createAnimation(e[0],"translate(18px)"),e?.[1]&&this.createAnimation(e[1],"translate(-18px)")}render(){return o.dy`
      <wui-visual-thumbnail
        ?borderRadiusFull=${!0}
        .imageSrc=${this.dappImageUrl?.[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `}createAnimation(e,t){e.animate([{transform:"translateX(0px)"},{transform:t}],{duration:1600,easing:"cubic-bezier(0.56, 0, 0.48, 1)",direction:"alternate",iterations:1/0})}};oN.styles=oO,oN=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}([(0,p.Mo)("w3m-siwx-sign-message-thumbnails")],oN);var oP=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let oj=class extends o.oi{constructor(){super(...arguments),this.dappName=n.h.state.metadata?.name,this.isCancelling=!1,this.isSigning=!1}render(){return o.dy`
      <wui-flex justifyContent="center" .padding=${["2xl","0","xxl","0"]}>
        <w3m-siwx-sign-message-thumbnails></w3m-siwx-sign-message-thumbnails>
      </wui-flex>
      <wui-flex
        .padding=${["0","4xl","l","4xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100"
          >${this.dappName??"Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex
        .padding=${["0","3xl","l","3xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="small-400" align="center" color="fg-200"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["l","xl","xl","xl"]} gap="s" justifyContent="space-between">
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral"
          ?loading=${this.isCancelling}
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          ${this.isCancelling?"Cancelling...":"Cancel"}
        </wui-button>
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="main"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning?"Signing...":"Sign"}
        </wui-button>
      </wui-flex>
    `}async onSign(){this.isSigning=!0,await oA.w.requestSignMessage().finally(()=>this.isSigning=!1)}async onCancel(){this.isCancelling=!0,await oA.w.cancelSignMessage().finally(()=>this.isCancelling=!1)}};oP([(0,a.SB)()],oj.prototype,"isCancelling",void 0),oP([(0,a.SB)()],oj.prototype,"isSigning",void 0),oj=oP([(0,p.Mo)("w3m-siwx-sign-message-view")],oj)},72419:function(e,t,i){var o=i(44920),a=i(30077),r=i(60995),n=i(77405),s=i(91368),l=i(93907),c=o.iv`
  :host {
    width: 100%;
    display: block;
  }
`,d=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let u=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.text="",this.open=r.f.state.open,this.unsubscribe.push(n.P.subscribeKey("view",()=>{r.f.hide()}),s.I.subscribeKey("open",e=>{e||r.f.hide()}),r.f.subscribeKey("open",e=>{this.open=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),r.f.hide()}render(){return o.dy`
      <div
        @pointermove=${this.onMouseEnter.bind(this)}
        @pointerleave=${this.onMouseLeave.bind(this)}
      >
        ${this.renderChildren()}
      </div>
    `}renderChildren(){return o.dy`<slot></slot> `}onMouseEnter(){let e=this.getBoundingClientRect();this.open||r.f.showTooltip({message:this.text,triggerRect:{width:e.width,height:e.height,left:e.left,top:e.top},variant:"shade"})}onMouseLeave(e){this.contains(e.relatedTarget)||r.f.hide()}};u.styles=[c],d([(0,a.Cb)()],u.prototype,"text",void 0),d([(0,a.SB)()],u.prototype,"open",void 0),u=d([(0,l.Mo)("w3m-tooltip-trigger")],u)},71161:function(e,t,i){var o=i(44920),a=i(30077);i(85724),i(50992),i(99671);var r=i(17770),n=i(57172),s=i(66501),l=o.iv`
  a {
    border: 1px solid var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-3xl);
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  a.disabled > wui-icon:not(.image-icon),
  a.disabled > wui-image {
    filter: grayscale(1);
  }

  a[data-variant='fill'] {
    color: var(--wui-color-inverse-100);
    background-color: var(--wui-color-accent-100);
  }

  a[data-variant='shade'],
  a[data-variant='shadeSmall'] {
    background-color: transparent;
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  a[data-variant='success'] {
    column-gap: var(--wui-spacing-xxs);
    border: 1px solid var(--wui-color-success-glass-010);
    background-color: var(--wui-color-success-glass-010);
    color: var(--wui-color-success-100);
  }

  a[data-variant='error'] {
    column-gap: var(--wui-spacing-xxs);
    border: 1px solid var(--wui-color-error-glass-010);
    background-color: var(--wui-color-error-glass-010);
    color: var(--wui-color-error-100);
  }

  a[data-variant='transparent'] {
    column-gap: var(--wui-spacing-xxs);
    background-color: transparent;
    color: var(--wui-color-fg-150);
  }

  a[data-variant='transparent'],
  a[data-variant='success'],
  a[data-variant='shadeSmall'],
  a[data-variant='error'] {
    padding: 7px var(--wui-spacing-s) 7px 10px;
  }

  a[data-variant='transparent']:has(wui-text:first-child),
  a[data-variant='success']:has(wui-text:first-child),
  a[data-variant='shadeSmall']:has(wui-text:first-child),
  a[data-variant='error']:has(wui-text:first-child) {
    padding: 7px var(--wui-spacing-s);
  }

  a[data-variant='fill'],
  a[data-variant='shade'] {
    column-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-xxs)
      var(--wui-spacing-xs);
  }

  a[data-variant='fill']:has(wui-text:first-child),
  a[data-variant='shade']:has(wui-text:first-child) {
    padding: 9px var(--wui-spacing-m) 9px var(--wui-spacing-m);
  }

  a[data-variant='fill'] > wui-image,
  a[data-variant='shade'] > wui-image {
    width: 24px;
    height: 24px;
  }

  a[data-variant='fill'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  a[data-variant='shade'] > wui-image,
  a[data-variant='shadeSmall'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  a[data-variant='fill'] > wui-icon:not(.image-icon),
  a[data-variant='shade'] > wui-icon:not(.image-icon) {
    width: 14px;
    height: 14px;
  }

  a[data-variant='transparent'] > wui-image,
  a[data-variant='success'] > wui-image,
  a[data-variant='shadeSmall'] > wui-image,
  a[data-variant='error'] > wui-image {
    width: 14px;
    height: 14px;
  }

  a[data-variant='transparent'] > wui-icon:not(.image-icon),
  a[data-variant='success'] > wui-icon:not(.image-icon),
  a[data-variant='shadeSmall'] > wui-icon:not(.image-icon),
  a[data-variant='error'] > wui-icon:not(.image-icon) {
    width: 12px;
    height: 12px;
  }

  a[data-variant='fill']:focus-visible {
    background-color: var(--wui-color-accent-090);
  }

  a[data-variant='shade']:focus-visible,
  a[data-variant='shadeSmall']:focus-visible {
    background-color: var(--wui-color-gray-glass-015);
  }

  a[data-variant='transparent']:focus-visible {
    background-color: var(--wui-color-gray-glass-005);
  }

  a[data-variant='success']:focus-visible {
    background-color: var(--wui-color-success-glass-015);
  }

  a[data-variant='error']:focus-visible {
    background-color: var(--wui-color-error-glass-015);
  }

  a.disabled {
    color: var(--wui-color-gray-glass-015);
    background-color: var(--wui-color-gray-glass-015);
    pointer-events: none;
  }

  @media (hover: hover) and (pointer: fine) {
    a[data-variant='fill']:hover {
      background-color: var(--wui-color-accent-090);
    }

    a[data-variant='shade']:hover,
    a[data-variant='shadeSmall']:hover {
      background-color: var(--wui-color-gray-glass-015);
    }

    a[data-variant='transparent']:hover {
      background-color: var(--wui-color-gray-glass-005);
    }

    a[data-variant='success']:hover {
      background-color: var(--wui-color-success-glass-015);
    }

    a[data-variant='error']:hover {
      background-color: var(--wui-color-error-glass-015);
    }
  }

  a[data-variant='fill']:active {
    background-color: var(--wui-color-accent-080);
  }

  a[data-variant='shade']:active,
  a[data-variant='shadeSmall']:active {
    background-color: var(--wui-color-gray-glass-020);
  }

  a[data-variant='transparent']:active {
    background-color: var(--wui-color-gray-glass-010);
  }

  a[data-variant='success']:active {
    background-color: var(--wui-color-success-glass-020);
  }

  a[data-variant='error']:active {
    background-color: var(--wui-color-error-glass-020);
  }
`,c=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let d=class extends o.oi{constructor(){super(...arguments),this.variant="fill",this.imageSrc=void 0,this.imageIcon=void 0,this.imageIconSize="md",this.disabled=!1,this.icon="externalLink",this.href="",this.text=void 0}render(){let e="success"===this.variant||"transparent"===this.variant||"shadeSmall"===this.variant;return o.dy`
      <a
        rel="noreferrer"
        target="_blank"
        href=${this.href}
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
      >
        ${this.imageTemplate()}
        <wui-text variant=${e?"small-600":"paragraph-600"} color="inherit">
          ${this.title?this.title:n.H.getHostName(this.href)}
        </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </a>
    `}imageTemplate(){return this.imageSrc?o.dy`<wui-image src=${this.imageSrc}></wui-image>`:this.imageIcon?o.dy`<wui-icon
        name=${this.imageIcon}
        color="inherit"
        size=${this.imageIconSize}
        class="image-icon"
      ></wui-icon>`:null}};d.styles=[r.ET,r.ZM,l],c([(0,a.Cb)()],d.prototype,"variant",void 0),c([(0,a.Cb)()],d.prototype,"imageSrc",void 0),c([(0,a.Cb)()],d.prototype,"imageIcon",void 0),c([(0,a.Cb)()],d.prototype,"imageIconSize",void 0),c([(0,a.Cb)({type:Boolean})],d.prototype,"disabled",void 0),c([(0,a.Cb)()],d.prototype,"icon",void 0),c([(0,a.Cb)()],d.prototype,"href",void 0),c([(0,a.Cb)()],d.prototype,"text",void 0),d=c([(0,s.M)("wui-chip")],d)},46336:function(e,t,i){var o=i(44920),a=i(30077),r=i(52608);i(99671);var n=i(17770),s=i(66501);i(14619);var l=o.iv`
  :host {
    position: relative;
    display: inline-block;
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`,c=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let d=class extends o.oi{constructor(){super(...arguments),this.disabled=!1}render(){return o.dy`
      <wui-input-text
        type="email"
        placeholder="Email"
        icon="mail"
        size="mdl"
        .disabled=${this.disabled}
        .value=${this.value}
        data-testid="wui-email-input"
        tabIdx=${(0,r.o)(this.tabIdx)}
      ></wui-input-text>
      ${this.templateError()}
    `}templateError(){return this.errorMessage?o.dy`<wui-text variant="tiny-500" color="error-100">${this.errorMessage}</wui-text>`:null}};d.styles=[n.ET,l],c([(0,a.Cb)()],d.prototype,"errorMessage",void 0),c([(0,a.Cb)({type:Boolean})],d.prototype,"disabled",void 0),c([(0,a.Cb)()],d.prototype,"value",void 0),c([(0,a.Cb)()],d.prototype,"tabIdx",void 0),d=c([(0,s.M)("wui-email-input")],d)},99294:function(e,t,i){var o=i(44920),a=i(30077);i(85724);var r=i(17770),n=i(66501),s=o.iv`
  :host {
    position: relative;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 100%;
    background-color: var(--wui-color-accent-glass-010);
    border-radius: var(--wui-border-radius-xs);
    border: 1px solid var(--wui-color-accent-glass-010);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  wui-tooltip {
    padding: 7px var(--wui-spacing-s) 8px var(--wui-spacing-s);
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translate(-50%, -100%);
    opacity: 0;
    display: none;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }
  }
`,l=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let c=class extends o.oi{constructor(){super(...arguments),this.text="",this.icon="card"}render(){return o.dy`<button>
      <wui-icon color="accent-100" name=${this.icon} size="lg"></wui-icon>
    </button>`}};c.styles=[r.ET,r.ZM,s],l([(0,a.Cb)()],c.prototype,"text",void 0),l([(0,a.Cb)()],c.prototype,"icon",void 0),c=l([(0,n.M)("wui-icon-button")],c)},38606:function(e,t,i){var o=i(44920),a=i(30077),r=i(52608);i(99671);var n=i(17770),s=i(66501);i(84717);var l=o.iv`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    justify-content: flex-start;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-text[data-align='left'] {
    display: flex;
    flex: 1;
  }

  wui-text[data-align='center'] {
    display: flex;
    flex: 1;
    justify-content: center;
  }

  .invisible {
    opacity: 0;
    pointer-events: none;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }
`,c=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let d=class extends o.oi{constructor(){super(...arguments),this.logo="google",this.name="Continue with google",this.align="left",this.disabled=!1}render(){return o.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,r.o)(this.tabIdx)}>
        <wui-logo logo=${this.logo}></wui-logo>
        <wui-text
          data-align=${this.align}
          variant="paragraph-500"
          color="inherit"
          align=${this.align}
          >${this.name}</wui-text
        >
        ${this.templatePlacement()}
      </button>
    `}templatePlacement(){return"center"===this.align?o.dy` <wui-logo class="invisible" logo=${this.logo}></wui-logo>`:null}};d.styles=[n.ET,n.ZM,l],c([(0,a.Cb)()],d.prototype,"logo",void 0),c([(0,a.Cb)()],d.prototype,"name",void 0),c([(0,a.Cb)()],d.prototype,"align",void 0),c([(0,a.Cb)()],d.prototype,"tabIdx",void 0),c([(0,a.Cb)({type:Boolean})],d.prototype,"disabled",void 0),d=c([(0,s.M)("wui-list-social")],d)},88694:function(e,t,i){var o=i(44920),a=i(30077);i(85724),i(50992),i(99671),i(55802);var r=i(17770),n=i(57172),s=i(66501),l=o.iv`
  button {
    padding: 6.5px var(--wui-spacing-l) 6.5px var(--wui-spacing-xs);
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    background-color: var(--wui-color-gray-glass-002);
  }

  button[data-clickable='false'] {
    pointer-events: none;
    background-color: transparent;
  }

  wui-image,
  wui-icon {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
  }
`,c=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let d=class extends o.oi{constructor(){super(...arguments),this.tokenName="",this.tokenImageUrl="",this.tokenValue=0,this.tokenAmount="0.0",this.tokenCurrency="",this.clickable=!1}render(){return o.dy`
      <button data-clickable=${String(this.clickable)}>
        <wui-flex gap="s" alignItems="center">
          ${this.visualTemplate()}
          <wui-flex flexDirection="column" justifyContent="spaceBetween">
            <wui-text variant="paragraph-500" color="fg-100">${this.tokenName}</wui-text>
            <wui-text variant="small-400" color="fg-200">
              ${n.H.formatNumberToLocalString(this.tokenAmount,4)} ${this.tokenCurrency}
            </wui-text>
          </wui-flex>
        </wui-flex>
        <wui-text variant="paragraph-500" color="fg-100">$${this.tokenValue.toFixed(2)}</wui-text>
      </button>
    `}visualTemplate(){return this.tokenName&&this.tokenImageUrl?o.dy`<wui-image alt=${this.tokenName} src=${this.tokenImageUrl}></wui-image>`:o.dy`<wui-icon name="coinPlaceholder" color="fg-100"></wui-icon>`}};d.styles=[r.ET,r.ZM,l],c([(0,a.Cb)()],d.prototype,"tokenName",void 0),c([(0,a.Cb)()],d.prototype,"tokenImageUrl",void 0),c([(0,a.Cb)({type:Number})],d.prototype,"tokenValue",void 0),c([(0,a.Cb)()],d.prototype,"tokenAmount",void 0),c([(0,a.Cb)()],d.prototype,"tokenCurrency",void 0),c([(0,a.Cb)({type:Boolean})],d.prototype,"clickable",void 0),d=c([(0,s.M)("wui-list-token")],d)},83096:function(e,t,i){i(13185)},76224:function(e,t,i){var o=i(44920),a=i(30077);i(99671);var r=i(17770),n=i(66501),s=o.iv`
  :host {
    position: relative;
    display: flex;
    width: 100%;
    height: 1px;
    background-color: var(--wui-color-gray-glass-005);
    justify-content: center;
    align-items: center;
  }

  :host > wui-text {
    position: absolute;
    padding: 0px 10px;
    background-color: var(--wui-color-modal-bg);
    transition: background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color;
  }
`,l=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let c=class extends o.oi{constructor(){super(...arguments),this.text=""}render(){return o.dy`${this.template()}`}template(){return this.text?o.dy`<wui-text variant="small-500" color="fg-200">${this.text}</wui-text>`:null}};c.styles=[r.ET,s],l([(0,a.Cb)()],c.prototype,"text",void 0),c=l([(0,n.M)("wui-separator")],c)},4695:function(e,t,i){i(94192)},32798:function(e,t,i){i(26193)},76902:function(e,t,i){i.d(t,{W:function(){return a}});var o=i(44920);let a=o.YP`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`},20860:function(e,t,i){var o=i(44920),a=i(30077);i(50992);var r=i(17770),n=i(57172),s=i(66501),l=o.iv`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
    border-radius: var(--wui-border-radius-3xl);
    box-shadow: 0 0 0 8px var(--wui-color-gray-glass-005);
    overflow: hidden;
    position: relative;
  }

  :host([data-variant='generated']) {
    --mixed-local-color-1: var(--local-color-1);
    --mixed-local-color-2: var(--local-color-2);
    --mixed-local-color-3: var(--local-color-3);
    --mixed-local-color-4: var(--local-color-4);
    --mixed-local-color-5: var(--local-color-5);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host([data-variant='generated']) {
      --mixed-local-color-1: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-1)
      );
      --mixed-local-color-2: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-2)
      );
      --mixed-local-color-3: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-3)
      );
      --mixed-local-color-4: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-4)
      );
      --mixed-local-color-5: color-mix(
        in srgb,
        var(--w3m-color-mix) var(--w3m-color-mix-strength),
        var(--local-color-5)
      );
    }
  }

  :host([data-variant='generated']) {
    box-shadow: 0 0 0 8px var(--wui-color-gray-glass-005);
    background: radial-gradient(
      var(--local-radial-circle),
      #fff 0.52%,
      var(--mixed-local-color-5) 31.25%,
      var(--mixed-local-color-3) 51.56%,
      var(--mixed-local-color-2) 65.63%,
      var(--mixed-local-color-1) 82.29%,
      var(--mixed-local-color-4) 100%
    );
  }

  :host([data-variant='default']) {
    box-shadow: 0 0 0 8px var(--wui-color-gray-glass-005);
    background: radial-gradient(
      75.29% 75.29% at 64.96% 24.36%,
      #fff 0.52%,
      #f5ccfc 31.25%,
      #dba4f5 51.56%,
      #9a8ee8 65.63%,
      #6493da 82.29%,
      #6ebdea 100%
    );
  }
`,c=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let d=class extends o.oi{constructor(){super(...arguments),this.imageSrc=void 0,this.alt=void 0,this.address=void 0,this.size="xl"}render(){return this.style.cssText=`
    --local-width: var(--wui-icon-box-size-${this.size});
    --local-height: var(--wui-icon-box-size-${this.size});
    `,o.dy`${this.visualTemplate()}`}visualTemplate(){if(this.imageSrc)return this.dataset.variant="image",o.dy`<wui-image src=${this.imageSrc} alt=${this.alt??"avatar"}></wui-image>`;if(this.address){this.dataset.variant="generated";let e=n.H.generateAvatarColors(this.address);return this.style.cssText+=`
 ${e}`,null}return this.dataset.variant="default",null}};d.styles=[r.ET,l],c([(0,a.Cb)()],d.prototype,"imageSrc",void 0),c([(0,a.Cb)()],d.prototype,"alt",void 0),c([(0,a.Cb)()],d.prototype,"address",void 0),c([(0,a.Cb)()],d.prototype,"size",void 0),d=c([(0,s.M)("wui-avatar")],d)},31999:function(e,t,i){var o=i(44920),a=i(30077);i(85724),i(50992),i(99671);var r=i(17770),n=i(66501),s=o.iv`
  button {
    border: none;
    border-radius: var(--wui-border-radius-3xl);
  }

  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='gray'] {
    background-color: transparent;
    color: var(--wui-color-fg-200);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='shade'] {
    background-color: transparent;
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-size='sm'] {
    height: 32px;
    padding: 0 var(--wui-spacing-s);
  }

  button[data-size='md'] {
    height: 40px;
    padding: 0 var(--wui-spacing-l);
  }

  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] > wui-icon {
    width: 14px;
    height: 14px;
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  button.disabled > wui-icon,
  button.disabled > wui-image {
    filter: grayscale(1);
  }

  button[data-variant='main'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  button[data-variant='shade'] > wui-image,
  button[data-variant='gray'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:focus-visible {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='shade']:focus-visible,
    button[data-variant='gray']:focus-visible,
    button[data-variant='shade']:hover,
    button[data-variant='gray']:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    button[data-variant='gray']:active,
    button[data-variant='shade']:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  button.disabled {
    color: var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    pointer-events: none;
  }
`,l=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let c=class extends o.oi{constructor(){super(...arguments),this.variant="accent",this.imageSrc="",this.disabled=!1,this.icon="externalLink",this.size="md",this.text=""}render(){let e="sm"===this.size?"small-600":"paragraph-600";return o.dy`
      <button
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc?o.dy`<wui-image src=${this.imageSrc}></wui-image>`:null}
        <wui-text variant=${e} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `}};c.styles=[r.ET,r.ZM,s],l([(0,a.Cb)()],c.prototype,"variant",void 0),l([(0,a.Cb)()],c.prototype,"imageSrc",void 0),l([(0,a.Cb)({type:Boolean})],c.prototype,"disabled",void 0),l([(0,a.Cb)()],c.prototype,"icon",void 0),l([(0,a.Cb)()],c.prototype,"size",void 0),l([(0,a.Cb)()],c.prototype,"text",void 0),c=l([(0,n.M)("wui-chip-button")],c)},84717:function(e,t,i){var o=i(44920),a=i(30077);i(85724);var r=i(17770),n=i(66501),s=o.iv`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-005);
    overflow: hidden;
  }

  wui-icon {
    width: 100%;
    height: 100%;
  }
`,l=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let c=class extends o.oi{constructor(){super(...arguments),this.logo="google"}render(){return o.dy`<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `}};c.styles=[r.ET,s],l([(0,a.Cb)()],c.prototype,"logo",void 0),c=l([(0,n.M)("wui-logo")],c)},13185:function(e,t,i){var o=i(44920),a=i(30077);let r=o.YP`<svg width="86" height="96" fill="none">
  <path
    d="M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z"
  />
</svg>`;var n=i(76902);let s=o.YP`
  <svg fill="none" viewBox="0 0 36 40">
    <path
      d="M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z"
    />
  </svg>
`;i(85724),i(50992);var l=i(17770),c=i(66501),d=o.iv`
  :host {
    position: relative;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-width);
    height: var(--local-height);
  }

  :host([data-round='true']) {
    background: var(--wui-color-gray-glass-002);
    border-radius: 100%;
    outline: 1px solid var(--wui-color-gray-glass-005);
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    fill: var(--wui-color-gray-glass-002);
  }

  svg > path {
    stroke: var(--local-stroke);
  }

  wui-image {
    width: 100%;
    height: 100%;
    -webkit-clip-path: var(--local-path);
    clip-path: var(--local-path);
    background: var(--wui-color-gray-glass-002);
  }

  wui-icon {
    transform: translateY(-5%);
    width: var(--local-icon-size);
    height: var(--local-icon-size);
  }
`,u=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let h=class extends o.oi{constructor(){super(...arguments),this.size="md",this.name="uknown",this.networkImagesBySize={sm:s,md:n.W,lg:r},this.selected=!1,this.round=!1}render(){return this.round?(this.dataset.round="true",this.style.cssText=`
      --local-width: var(--wui-spacing-3xl);
      --local-height: var(--wui-spacing-3xl);
      --local-icon-size: var(--wui-spacing-l);
    `):this.style.cssText=`

      --local-path: var(--wui-path-network-${this.size});
      --local-width:  var(--wui-width-network-${this.size});
      --local-height:  var(--wui-height-network-${this.size});
      --local-icon-size:  var(--wui-icon-size-network-${this.size});
    `,o.dy`${this.templateVisual()} ${this.svgTemplate()} `}svgTemplate(){return this.round?null:this.networkImagesBySize[this.size]}templateVisual(){return this.imageSrc?o.dy`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:o.dy`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`}};h.styles=[l.ET,d],u([(0,a.Cb)()],h.prototype,"size",void 0),u([(0,a.Cb)()],h.prototype,"name",void 0),u([(0,a.Cb)({type:Object})],h.prototype,"networkImagesBySize",void 0),u([(0,a.Cb)()],h.prototype,"imageSrc",void 0),u([(0,a.Cb)({type:Boolean})],h.prototype,"selected",void 0),u([(0,a.Cb)({type:Boolean})],h.prototype,"round",void 0),h=u([(0,c.M)("wui-network-image")],h)},26193:function(e,t,i){var o=i(44920),a=i(30077);i(85724),i(50992),i(55802);var r=i(17770),n=i(66501);i(42559);var s=o.iv`
  :host {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-size);
    height: var(--local-size);
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host([name='Extension'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  :host([data-wallet-icon='allWallets']) {
    background-color: var(--wui-all-wallets-bg-100);
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 18px;
    height: 18px;
  }

  wui-icon[data-parent-size='md'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='lg'] {
    width: 42px;
    height: 42px;
  }

  wui-icon[data-parent-size='full'] {
    width: 100%;
    height: 100%;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid var(--wui-color-bg-150, #1e1f1f);
    padding: 1px;
  }
`,l=function(e,t,i,o){var a,r=arguments.length,n=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var s=e.length-1;s>=0;s--)(a=e[s])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n};let c=class extends o.oi{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let e="xxs";return e="lg"===this.size?"m":"md"===this.size?"xs":"xxs",this.style.cssText=`
       --local-border-radius: var(--wui-border-radius-${e});
       --local-size: var(--wui-wallet-image-size-${this.size});
   `,this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),o.dy`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?o.dy`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?o.dy`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`:o.dy`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};c.styles=[r.ZM,r.ET,s],l([(0,a.Cb)()],c.prototype,"size",void 0),l([(0,a.Cb)()],c.prototype,"name",void 0),l([(0,a.Cb)()],c.prototype,"imageSrc",void 0),l([(0,a.Cb)()],c.prototype,"walletIcon",void 0),l([(0,a.Cb)({type:Boolean})],c.prototype,"installed",void 0),l([(0,a.Cb)()],c.prototype,"badgeSize",void 0),c=l([(0,n.M)("wui-wallet-image")],c)}}]);