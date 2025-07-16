"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[8212],{68212:(oo,xt,d)=>{d.r(xt),d.d(xt,{AppKitAccountButton:()=>Ke,AppKitButton:()=>Xe,AppKitConnectButton:()=>Je,AppKitNetworkButton:()=>qe,W3mAccountButton:()=>He,W3mAccountSettingsView:()=>P,W3mAccountView:()=>Ue,W3mAllWalletsView:()=>pi.b,W3mButton:()=>Ge,W3mChooseAccountNameView:()=>Ne,W3mConnectButton:()=>Ye,W3mConnectView:()=>R,W3mConnectWalletsView:()=>Re,W3mConnectingExternalView:()=>ct,W3mConnectingMultiChainView:()=>$e,W3mConnectingWcBasicView:()=>Ri.M,W3mConnectingWcView:()=>Ni.L,W3mDownloadsView:()=>Ei.X,W3mGetWalletView:()=>ut,W3mNetworkButton:()=>Qe,W3mNetworkSwitchView:()=>me,W3mNetworksView:()=>ie,W3mProfileView:()=>X,W3mRouter:()=>Ft.A,W3mSIWXSignMessageView:()=>Be,W3mSwitchActiveChainView:()=>Ie,W3mSwitchAddressView:()=>we,W3mUnsupportedChainView:()=>Ee,W3mWalletCompatibleNetworksView:()=>We,W3mWhatIsANetworkView:()=>ft,W3mWhatIsAWalletView:()=>pt});var T=d(49671),s=d(59799),c=d(86523),h=d(23107),u=d(20597),C=d(17111),g=d(66301),se=d(80152),p=d(22917),v=d(18445),S=d(57745),w=d(50860),b=(d(11252),d(78549),d(10831),d(79348),d(25518)),_e=d(88814),k=d(70075);d(35205),d(87538);const Ut=s.iv`
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
`;var D=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let I=class extends s.oi{constructor(){super(...arguments),this.networkSrc=void 0,this.avatarSrc=void 0,this.balance=void 0,this.isUnsupportedChain=void 0,this.disabled=!1,this.loading=!1,this.address="",this.profileName="",this.charsStart=4,this.charsEnd=6}render(){return s.dy`
      <button
        ?disabled=${this.disabled}
        class=${(0,h.o)(this.balance?void 0:"local-no-balance")}
      >
        ${this.balanceTemplate()}
        <wui-flex gap="xxs" alignItems="center">
          <wui-avatar
            .imageSrc=${this.avatarSrc}
            alt=${this.address}
            address=${this.address}
          ></wui-avatar>
          <wui-text variant="paragraph-600" color="inherit">
            ${this.address?_e.H.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?18:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"}):null}
          </wui-text>
        </wui-flex>
      </button>
    `}balanceTemplate(){if(this.isUnsupportedChain)return s.dy` <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
        ></wui-icon-box>
        <wui-text variant="paragraph-600" color="inherit"> Switch Network</wui-text>`;if(this.balance){const e=this.networkSrc?s.dy`<wui-image src=${this.networkSrc}></wui-image>`:s.dy`
            <wui-icon-box
              size="sm"
              iconColor="fg-200"
              backgroundColor="fg-300"
              icon="networkPlaceholder"
            ></wui-icon-box>
          `,i=this.loading?s.dy`<wui-loading-spinner size="md" color="fg-200"></wui-loading-spinner>`:s.dy`<wui-text variant="paragraph-600" color="inherit"> ${this.balance}</wui-text>`;return s.dy`${e} ${i}`}return null}};I.styles=[b.ET,b.ZM,Ut],D([(0,c.Cb)()],I.prototype,"networkSrc",void 0),D([(0,c.Cb)()],I.prototype,"avatarSrc",void 0),D([(0,c.Cb)()],I.prototype,"balance",void 0),D([(0,c.Cb)({type:Boolean})],I.prototype,"isUnsupportedChain",void 0),D([(0,c.Cb)({type:Boolean})],I.prototype,"disabled",void 0),D([(0,c.Cb)({type:Boolean})],I.prototype,"loading",void 0),D([(0,c.Cb)()],I.prototype,"address",void 0),D([(0,c.Cb)()],I.prototype,"profileName",void 0),D([(0,c.Cb)()],I.prototype,"charsStart",void 0),D([(0,c.Cb)()],I.prototype,"charsEnd",void 0),I=D([(0,k.M)("wui-account-button")],I);var A=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};class $ extends s.oi{constructor(){super(...arguments),this.unsubscribe=[],this.disabled=!1,this.balance="show",this.charsStart=4,this.charsEnd=6,this.namespace=void 0,this.caipAddress=u.R.getAccountData(this.namespace)?.caipAddress,this.balanceVal=u.R.getAccountData(this.namespace)?.balance,this.balanceSymbol=u.R.getAccountData(this.namespace)?.balanceSymbol,this.profileName=u.R.getAccountData(this.namespace)?.profileName,this.profileImage=u.R.getAccountData(this.namespace)?.profileImage,this.network=u.R.getNetworkData(this.namespace)?.caipNetwork,this.networkImage=C.f.getNetworkImage(this.network),this.isSupported=!!g.OptionsController.state.allowUnsupportedChain||(!u.R.state.activeChain||u.R.checkIfSupportedNetwork(u.R.state.activeChain))}firstUpdated(){const e=this.namespace;e?this.unsubscribe.push(u.R.subscribeChainProp("accountState",i=>{this.caipAddress=i?.caipAddress,this.balanceVal=i?.balance,this.balanceSymbol=i?.balanceSymbol,this.profileName=i?.profileName,this.profileImage=i?.profileImage},e),u.R.subscribeChainProp("networkState",i=>{this.network=i?.caipNetwork,this.isSupported=u.R.checkIfSupportedNetwork(e,i?.caipNetwork),this.networkImage=C.f.getNetworkImage(i?.caipNetwork)},e)):this.unsubscribe.push(se.W.subscribeNetworkImages(()=>{this.networkImage=C.f.getNetworkImage(this.network)}),u.R.subscribeKey("activeCaipAddress",i=>{this.caipAddress=i}),p.AccountController.subscribeKey("balance",i=>this.balanceVal=i),p.AccountController.subscribeKey("balanceSymbol",i=>this.balanceSymbol=i),p.AccountController.subscribeKey("profileName",i=>this.profileName=i),p.AccountController.subscribeKey("profileImage",i=>this.profileImage=i),u.R.subscribeKey("activeCaipNetwork",i=>{this.network=i,this.networkImage=C.f.getNetworkImage(i),this.isSupported=!i?.chainNamespace||u.R.checkIfSupportedNetwork(i?.chainNamespace),this.fetchNetworkImage(i)}))}updated(){this.fetchNetworkImage(this.network)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!u.R.state.activeChain)return null;const e="show"===this.balance,i="string"!=typeof this.balanceVal;return s.dy`
      <wui-account-button
        .disabled=${!!this.disabled}
        .isUnsupportedChain=${!g.OptionsController.state.allowUnsupportedChain&&!this.isSupported}
        address=${(0,h.o)(v.j.getPlainAddress(this.caipAddress))}
        profileName=${(0,h.o)(this.profileName)}
        networkSrc=${(0,h.o)(this.networkImage)}
        avatarSrc=${(0,h.o)(this.profileImage)}
        balance=${e?v.j.formatBalance(this.balanceVal,this.balanceSymbol):""}
        @click=${this.onClick.bind(this)}
        data-testid=${"account-button"+(this.namespace?`-${this.namespace}`:"")}
        .charsStart=${this.charsStart}
        .charsEnd=${this.charsEnd}
        ?loading=${i}
      >
      </wui-account-button>
    `}onClick(){this.isSupported||g.OptionsController.state.allowUnsupportedChain?S.I.open({namespace:this.namespace}):S.I.open({view:"UnsupportedChain"})}fetchNetworkImage(e){var i=this;return(0,T.Z)(function*(){e?.assets?.imageId&&(i.networkImage=yield C.f.fetchNetworkImage(e?.assets?.imageId))})()}}A([(0,c.Cb)({type:Boolean})],$.prototype,"disabled",void 0),A([(0,c.Cb)()],$.prototype,"balance",void 0),A([(0,c.Cb)()],$.prototype,"charsStart",void 0),A([(0,c.Cb)()],$.prototype,"charsEnd",void 0),A([(0,c.Cb)()],$.prototype,"namespace",void 0),A([(0,c.SB)()],$.prototype,"caipAddress",void 0),A([(0,c.SB)()],$.prototype,"balanceVal",void 0),A([(0,c.SB)()],$.prototype,"balanceSymbol",void 0),A([(0,c.SB)()],$.prototype,"profileName",void 0),A([(0,c.SB)()],$.prototype,"profileImage",void 0),A([(0,c.SB)()],$.prototype,"network",void 0),A([(0,c.SB)()],$.prototype,"networkImage",void 0),A([(0,c.SB)()],$.prototype,"isSupported",void 0);let He=class extends ${};He=A([(0,w.Mo)("w3m-account-button")],He);let Ke=class extends ${};Ke=A([(0,w.Mo)("appkit-account-button")],Ke);const Mt=s.iv`
  :host {
    display: block;
    width: max-content;
  }
`;var U=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};class B extends s.oi{constructor(){super(...arguments),this.unsubscribe=[],this.disabled=!1,this.balance=void 0,this.size=void 0,this.label=void 0,this.loadingLabel=void 0,this.charsStart=4,this.charsEnd=6,this.namespace=void 0,this.caipAddress=u.R.state.activeCaipAddress}firstUpdated(){this.namespace?this.unsubscribe.push(u.R.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress},this.namespace)):this.unsubscribe.push(u.R.subscribeKey("activeCaipAddress",e=>this.caipAddress=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return this.caipAddress?s.dy`
          <appkit-account-button
            .disabled=${!!this.disabled}
            balance=${(0,h.o)(this.balance)}
            .charsStart=${(0,h.o)(this.charsStart)}
            .charsEnd=${(0,h.o)(this.charsEnd)}
            namespace=${(0,h.o)(this.namespace)}
          >
          </appkit-account-button>
        `:s.dy`
          <appkit-connect-button
            size=${(0,h.o)(this.size)}
            label=${(0,h.o)(this.label)}
            loadingLabel=${(0,h.o)(this.loadingLabel)}
            namespace=${(0,h.o)(this.namespace)}
          ></appkit-connect-button>
        `}}B.styles=Mt,U([(0,c.Cb)({type:Boolean})],B.prototype,"disabled",void 0),U([(0,c.Cb)()],B.prototype,"balance",void 0),U([(0,c.Cb)()],B.prototype,"size",void 0),U([(0,c.Cb)()],B.prototype,"label",void 0),U([(0,c.Cb)()],B.prototype,"loadingLabel",void 0),U([(0,c.Cb)()],B.prototype,"charsStart",void 0),U([(0,c.Cb)()],B.prototype,"charsEnd",void 0),U([(0,c.Cb)()],B.prototype,"namespace",void 0),U([(0,c.SB)()],B.prototype,"caipAddress",void 0);let Ge=class extends B{};Ge=U([(0,w.Mo)("w3m-button")],Ge);let Xe=class extends B{};Xe=U([(0,w.Mo)("appkit-button")],Xe);const Lt=s.iv`
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
`;var Ze=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let xe=class extends s.oi{constructor(){super(...arguments),this.size="md",this.loading=!1}render(){const e="md"===this.size?"paragraph-600":"small-600";return s.dy`
      <button data-size=${this.size} ?disabled=${this.loading}>
        ${this.loadingTemplate()}
        <wui-text variant=${e} color=${this.loading?"accent-100":"inherit"}>
          <slot></slot>
        </wui-text>
      </button>
    `}loadingTemplate(){return this.loading?s.dy`<wui-loading-spinner size=${this.size} color="accent-100"></wui-loading-spinner>`:null}};xe.styles=[b.ET,b.ZM,Lt],Ze([(0,c.Cb)()],xe.prototype,"size",void 0),Ze([(0,c.Cb)({type:Boolean})],xe.prototype,"loading",void 0),xe=Ze([(0,k.M)("wui-connect-button")],xe);var Y=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};class J extends s.oi{constructor(){super(),this.unsubscribe=[],this.size="md",this.label="Connect Wallet",this.loadingLabel="Connecting...",this.open=S.I.state.open,this.loading=this.namespace?S.I.state.loadingNamespaceMap.get(this.namespace):S.I.state.loading,this.unsubscribe.push(S.I.subscribe(e=>{this.open=e.open,this.loading=this.namespace?e.loadingNamespaceMap.get(this.namespace):e.loading}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return s.dy`
      <wui-connect-button
        size=${(0,h.o)(this.size)}
        .loading=${this.loading}
        @click=${this.onClick.bind(this)}
        data-testid=${"connect-button"+(this.namespace?`-${this.namespace}`:"")}
      >
        ${this.loading?this.loadingLabel:this.label}
      </wui-connect-button>
    `}onClick(){this.open?S.I.close():this.loading||S.I.open({view:"Connect",namespace:this.namespace})}}Y([(0,c.Cb)()],J.prototype,"size",void 0),Y([(0,c.Cb)()],J.prototype,"label",void 0),Y([(0,c.Cb)()],J.prototype,"loadingLabel",void 0),Y([(0,c.Cb)()],J.prototype,"namespace",void 0),Y([(0,c.SB)()],J.prototype,"open",void 0),Y([(0,c.SB)()],J.prototype,"loading",void 0);let Ye=class extends J{};Ye=Y([(0,w.Mo)("w3m-connect-button")],Ye);let Je=class extends J{};Je=Y([(0,w.Mo)("appkit-connect-button")],Je);var y=d(79282);const Vt=s.iv`
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
`;var Pe=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let le=class extends s.oi{constructor(){super(...arguments),this.imageSrc=void 0,this.isUnsupportedChain=void 0,this.disabled=!1}render(){return s.dy`
      <button data-testid="wui-network-button" ?disabled=${this.disabled}>
        ${this.visualTemplate()}
        <wui-text variant="paragraph-600" color="inherit">
          <slot></slot>
        </wui-text>
      </button>
    `}visualTemplate(){return this.isUnsupportedChain?s.dy`
        <wui-icon-box
          size="sm"
          iconColor="error-100"
          backgroundColor="error-100"
          icon="warningCircle"
        ></wui-icon-box>
      `:this.imageSrc?s.dy`<wui-image src=${this.imageSrc}></wui-image>`:s.dy`
      <wui-icon-box
        size="sm"
        iconColor="inverse-100"
        backgroundColor="fg-100"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `}};le.styles=[b.ET,b.ZM,Vt],Pe([(0,c.Cb)()],le.prototype,"imageSrc",void 0),Pe([(0,c.Cb)({type:Boolean})],le.prototype,"isUnsupportedChain",void 0),Pe([(0,c.Cb)({type:Boolean})],le.prototype,"disabled",void 0),le=Pe([(0,k.M)("wui-network-button")],le);const zt=s.iv`
  :host {
    display: block;
    width: max-content;
  }
`;var K=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};class V extends s.oi{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.network=u.R.state.activeCaipNetwork,this.networkImage=C.f.getNetworkImage(this.network),this.caipAddress=u.R.state.activeCaipAddress,this.loading=S.I.state.loading,this.isSupported=!!g.OptionsController.state.allowUnsupportedChain||(!u.R.state.activeChain||u.R.checkIfSupportedNetwork(u.R.state.activeChain)),this.unsubscribe.push(se.W.subscribeNetworkImages(()=>{this.networkImage=C.f.getNetworkImage(this.network)}),u.R.subscribeKey("activeCaipAddress",e=>{this.caipAddress=e}),u.R.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=C.f.getNetworkImage(e),this.isSupported=!e?.chainNamespace||u.R.checkIfSupportedNetwork(e.chainNamespace),C.f.fetchNetworkImage(e?.assets?.imageId)}),S.I.subscribeKey("loading",e=>this.loading=e))}firstUpdated(){C.f.fetchNetworkImage(this.network?.assets?.imageId)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=!this.network||u.R.checkIfSupportedNetwork(this.network.chainNamespace);return s.dy`
      <wui-network-button
        .disabled=${!(!this.disabled&&!this.loading)}
        .isUnsupportedChain=${!g.OptionsController.state.allowUnsupportedChain&&!e}
        imageSrc=${(0,h.o)(this.networkImage)}
        @click=${this.onClick.bind(this)}
        data-testid="w3m-network-button"
      >
        ${this.getLabel()}
        <slot></slot>
      </wui-network-button>
    `}getLabel(){return this.network?this.isSupported||g.OptionsController.state.allowUnsupportedChain?this.network.name:"Switch Network":this.label?this.label:this.caipAddress?"Unknown Network":"Select Network"}onClick(){this.loading||(y.X.sendEvent({type:"track",event:"CLICK_NETWORKS"}),S.I.open({view:"Networks"}))}}V.styles=zt,K([(0,c.Cb)({type:Boolean})],V.prototype,"disabled",void 0),K([(0,c.Cb)({type:String})],V.prototype,"label",void 0),K([(0,c.SB)()],V.prototype,"network",void 0),K([(0,c.SB)()],V.prototype,"networkImage",void 0),K([(0,c.SB)()],V.prototype,"caipAddress",void 0),K([(0,c.SB)()],V.prototype,"loading",void 0),K([(0,c.SB)()],V.prototype,"isSupported",void 0);let Qe=class extends V{};Qe=K([(0,w.Mo)("w3m-network-button")],Qe);let qe=class extends V{};qe=K([(0,w.Mo)("appkit-network-button")],qe);var Ft=d(48788),x=d(86450),m=d(86424),_=d(36882),M=d(76169),f=d(24380),Q=d(10053),Ht=d(68669);d(937),d(11539),d(72111),d(72686),d(45841);const Kt=s.iv`
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
`;var je=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let ce=class extends s.oi{constructor(){super(...arguments),this.label="",this.description="",this.icon="wallet"}render(){return s.dy`
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
    `}};ce.styles=[b.ET,b.ZM,Kt],je([(0,c.Cb)()],ce.prototype,"label",void 0),je([(0,c.Cb)()],ce.prototype,"description",void 0),je([(0,c.Cb)()],ce.prototype,"icon",void 0),ce=je([(0,k.M)("wui-notice-card")],ce);d(54575);var E=d(64599),et=d(22429),Ct=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let tt=class extends s.oi{constructor(){super(),this.unsubscribe=[],this.socialProvider=et.M.getConnectedSocialProvider(),this.socialUsername=et.M.getConnectedSocialUsername(),this.namespace=u.R.state.activeChain,this.unsubscribe.push(u.R.subscribeKey("activeChain",e=>{this.namespace=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=m.ConnectorController.getConnectorId(this.namespace),i=m.ConnectorController.getAuthConnector();if(!i||e!==x.b.CONNECTOR_ID.AUTH)return this.style.cssText="display: none",null;const o=i.provider.getEmail()??"";return o||this.socialUsername?s.dy`
      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon=${this.socialProvider??"mail"}
        iconSize=${this.socialProvider?"xxl":"sm"}
        data-testid="w3m-account-email-update"
        ?chevron=${!this.socialProvider}
        @click=${()=>{this.onGoToUpdateEmail(o,this.socialProvider)}}
      >
        <wui-text variant="paragraph-500" color="fg-100">${this.getAuthName(o)}</wui-text>
      </wui-list-item>
    `:(this.style.cssText="display: none",null)}onGoToUpdateEmail(e,i){i||f.RouterController.push("UpdateEmailWallet",{email:e,redirectView:"Account"})}getAuthName(e){return this.socialUsername?"discord"===this.socialProvider&&this.socialUsername.endsWith("0")?this.socialUsername.slice(0,-1):this.socialUsername:e.length>30?`${e.slice(0,-3)}...`:e}};Ct([(0,c.SB)()],tt.prototype,"namespace",void 0),tt=Ct([(0,w.Mo)("w3m-account-auth-button")],tt);var z=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let P=class extends s.oi{constructor(){super(),this.usubscribe=[],this.networkImages=se.W.state.networkImages,this.address=p.AccountController.state.address,this.profileImage=p.AccountController.state.profileImage,this.profileName=p.AccountController.state.profileName,this.network=u.R.state.activeCaipNetwork,this.preferredAccountTypes=p.AccountController.state.preferredAccountTypes,this.disconnecting=!1,this.loading=!1,this.switched=!1,this.text="",this.usubscribe.push(p.AccountController.subscribe(e=>{e.address&&(this.address=e.address,this.profileImage=e.profileImage,this.profileName=e.profileName,this.preferredAccountTypes=e.preferredAccountTypes)}),p.AccountController.subscribeKey("preferredAccountTypes",e=>this.preferredAccountTypes=e),u.R.subscribeKey("activeCaipNetwork",e=>{e?.id&&(this.network=e)}))}disconnectedCallback(){this.usubscribe.forEach(e=>e())}render(){if(!this.address)throw new Error("w3m-account-settings-view: No account provided");const e=this.networkImages[this.network?.assets?.imageId??""];return s.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="l"
        .padding=${["0","xl","m","xl"]}
      >
        <wui-avatar
          alt=${this.address}
          address=${this.address}
          imageSrc=${(0,h.o)(this.profileImage)}
          size="2lg"
        ></wui-avatar>
        <wui-flex flexDirection="column" alignItems="center">
          <wui-flex gap="3xs" alignItems="center" justifyContent="center">
            <wui-text variant="title-6-600" color="fg-100" data-testid="account-settings-address">
              ${w.Hg.getTruncateString({string:this.address,charsStart:4,charsEnd:6,truncate:"middle"})}
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
            imageSrc=${(0,h.o)(e)}
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
    `}chooseNameButtonTemplate(){const e=this.network?.chainNamespace,i=m.ConnectorController.getConnectorId(e),o=m.ConnectorController.getAuthConnector();return u.R.checkIfNamesSupported()&&o&&i===x.b.CONNECTOR_ID.AUTH&&!this.profileName?s.dy`
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
    `:null}authCardTemplate(){const e=this.network?.chainNamespace,i=m.ConnectorController.getConnectorId(e),o=m.ConnectorController.getAuthConnector(),{origin:n}=location;return!o||i!==x.b.CONNECTOR_ID.AUTH||n.includes(_.bq.SECURE_SITE)?null:s.dy`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `}isAllowedNetworkSwitch(){const e=u.R.getAllRequestedCaipNetworks(),i=!!e&&e.length>1,o=e?.find(({id:n})=>n===this.network?.id);return i||!o}onCopyAddress(){try{this.address&&(v.j.copyToClopboard(this.address),M.SnackController.showSuccess("Address copied"))}catch{M.SnackController.showError("Failed to copy")}}togglePreferredAccountBtnTemplate(){const e=this.network?.chainNamespace,i=u.R.checkIfSmartAccountEnabled(),o=m.ConnectorController.getConnectorId(e);return m.ConnectorController.getAuthConnector()&&o===x.b.CONNECTOR_ID.AUTH&&i?(this.switched||(this.text=this.preferredAccountTypes?.[e]===E.y_.ACCOUNT_TYPES.SMART_ACCOUNT?"Switch to your EOA":"Switch to your smart account"),s.dy`
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
    `):null}onChooseName(){f.RouterController.push("ChooseAccountName")}changePreferredAccountType(){var e=this;return(0,T.Z)(function*(){const i=e.network?.chainNamespace,o=u.R.checkIfSmartAccountEnabled(),n=e.preferredAccountTypes?.[i]!==E.y_.ACCOUNT_TYPES.SMART_ACCOUNT&&o?E.y_.ACCOUNT_TYPES.SMART_ACCOUNT:E.y_.ACCOUNT_TYPES.EOA;m.ConnectorController.getAuthConnector()&&(e.loading=!0,yield Q.ConnectionController.setPreferredAccountType(n,i),e.text=n===E.y_.ACCOUNT_TYPES.SMART_ACCOUNT?"Switch to your EOA":"Switch to your smart account",e.switched=!0,Ht.S.resetSend(),e.loading=!1,e.requestUpdate())})()}onNetworks(){this.isAllowedNetworkSwitch()&&f.RouterController.push("Networks")}onDisconnect(){var e=this;return(0,T.Z)(function*(){try{e.disconnecting=!0,yield Q.ConnectionController.disconnect(),S.I.close()}catch{y.X.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),M.SnackController.showError("Failed to disconnect")}finally{e.disconnecting=!1}})()}onGoToUpgradeView(){y.X.sendEvent({type:"track",event:"EMAIL_UPGRADE_FROM_MODAL"}),f.RouterController.push("UpgradeEmailWallet")}};z([(0,c.SB)()],P.prototype,"address",void 0),z([(0,c.SB)()],P.prototype,"profileImage",void 0),z([(0,c.SB)()],P.prototype,"profileName",void 0),z([(0,c.SB)()],P.prototype,"network",void 0),z([(0,c.SB)()],P.prototype,"preferredAccountTypes",void 0),z([(0,c.SB)()],P.prototype,"disconnecting",void 0),z([(0,c.SB)()],P.prototype,"loading",void 0),z([(0,c.SB)()],P.prototype,"switched",void 0),z([(0,c.SB)()],P.prototype,"text",void 0),P=z([(0,w.Mo)("w3m-account-settings-view")],P);d(99409),d(51078);const Gt=s.iv`
  button {
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s) var(--wui-spacing-xs) var(--wui-spacing-xs);
    position: relative;
  }

  wui-avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 0;
    outline: 3px solid var(--wui-color-gray-glass-005);
  }

  wui-icon-box,
  wui-image {
    width: 16px;
    height: 16px;
    border-radius: var(--wui-border-radius-3xl);
    position: absolute;
    left: 26px;
    top: 24px;
  }

  wui-image {
    outline: 2px solid var(--wui-color-bg-125);
  }

  wui-icon-box {
    outline: 2px solid var(--wui-color-bg-200);
    background-color: var(--wui-color-bg-250);
  }
`;var oe=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let G=class extends s.oi{constructor(){super(...arguments),this.avatarSrc=void 0,this.profileName="",this.address="",this.icon="mail"}render(){const e=u.R.state.activeChain,o=m.ConnectorController.getConnectorId(e)===x.b.CONNECTOR_ID.AUTH;return s.dy`<button data-testid="wui-profile-button" @click=${this.handleClick}>
      <wui-flex gap="xs" alignItems="center">
        <wui-avatar
          .imageSrc=${this.avatarSrc}
          alt=${this.address}
          address=${this.address}
        ></wui-avatar>
        ${o?this.getIconTemplate(this.icon):""}
        <wui-flex gap="xs" alignItems="center">
          <wui-text variant="large-600" color="fg-100">
            ${_e.H.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
          </wui-text>
          <wui-icon size="sm" color="fg-200" name="copy" id="copy-address"></wui-icon>
        </wui-flex>
      </wui-flex>
    </button>`}handleClick(e){e.target instanceof HTMLElement&&"copy-address"===e.target.id?this.onCopyClick?.(e):this.onProfileClick?.(e)}getIconTemplate(e){return s.dy`
      <wui-icon-box
        size="xxs"
        iconColor="fg-200"
        backgroundColor="bg-100"
        icon="${e||"networkPlaceholder"}"
      ></wui-icon-box>
    `}};G.styles=[b.ET,b.ZM,Gt],oe([(0,c.Cb)()],G.prototype,"avatarSrc",void 0),oe([(0,c.Cb)()],G.prototype,"profileName",void 0),oe([(0,c.Cb)()],G.prototype,"address",void 0),oe([(0,c.Cb)()],G.prototype,"icon",void 0),oe([(0,c.Cb)()],G.prototype,"onProfileClick",void 0),oe([(0,c.Cb)()],G.prototype,"onCopyClick",void 0),G=oe([(0,k.M)("wui-profile-button-v2")],G);d(98618),d(39927);const Xt=s.iv`
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
`;var O=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let N=class extends s.oi{constructor(){super(),this.unsubscribe=[],this.caipAddress=p.AccountController.state.caipAddress,this.address=v.j.getPlainAddress(p.AccountController.state.caipAddress),this.allAccounts=p.AccountController.state.allAccounts,this.profileImage=p.AccountController.state.profileImage,this.profileName=p.AccountController.state.profileName,this.disconnecting=!1,this.balance=p.AccountController.state.balance,this.balanceSymbol=p.AccountController.state.balanceSymbol,this.features=g.OptionsController.state.features,this.remoteFeatures=g.OptionsController.state.remoteFeatures,this.namespace=u.R.state.activeChain,this.chainId=u.R.state.activeCaipNetwork?.id,this.unsubscribe.push(p.AccountController.subscribeKey("caipAddress",e=>{this.address=v.j.getPlainAddress(e),this.caipAddress=e}),p.AccountController.subscribeKey("balance",e=>this.balance=e),p.AccountController.subscribeKey("balanceSymbol",e=>this.balanceSymbol=e),p.AccountController.subscribeKey("profileName",e=>this.profileName=e),p.AccountController.subscribeKey("profileImage",e=>this.profileImage=e),g.OptionsController.subscribeKey("features",e=>this.features=e),g.OptionsController.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e),p.AccountController.subscribeKey("allAccounts",e=>{this.allAccounts=e}),g.OptionsController.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e),u.R.subscribeKey("activeChain",e=>this.namespace=e),u.R.subscribeKey("activeCaipNetwork",e=>{if(e){const[i,o]=e?.caipNetworkId?.split(":")||[];i&&o&&(this.namespace=i,this.chainId=o)}}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!this.caipAddress)return null;const e=u.R.state.activeChain!==x.b.CHAIN.SOLANA&&this.allAccounts.length>1;return s.dy`<wui-flex
        flexDirection="column"
        .padding=${["0","xl","m","xl"]}
        alignItems="center"
        gap="l"
      >
        ${e?this.multiAccountTemplate():this.singleAccountTemplate()}
        <wui-flex flexDirection="column" alignItems="center">
          <wui-text variant="paragraph-500" color="fg-200">
            ${v.j.formatBalance(this.balance,this.balanceSymbol)}
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
      </wui-flex>`}onrampTemplate(){if(!this.namespace)return null;const e=this.remoteFeatures?.onramp,i=_.bq.ONRAMP_SUPPORTED_CHAIN_NAMESPACES.includes(this.namespace);return e&&i?s.dy`
      <wui-list-item
        data-testid="w3m-account-default-onramp-button"
        iconVariant="blue"
        icon="card"
        ?chevron=${!0}
        @click=${this.handleClickPay.bind(this)}
      >
        <wui-text variant="paragraph-500" color="fg-100">Buy crypto</wui-text>
      </wui-list-item>
    `:null}orderedFeaturesTemplate(){return(this.features?.walletFeaturesOrder||_.bq.DEFAULT_FEATURES.walletFeaturesOrder).map(i=>{switch(i){case"onramp":return this.onrampTemplate();case"swaps":return this.swapsTemplate();case"send":return this.sendTemplate();default:return null}})}activityTemplate(){return this.namespace&&this.remoteFeatures?.activity&&_.bq.ACTIVITY_ENABLED_CHAIN_NAMESPACES.includes(this.namespace)?s.dy` <wui-list-item
          iconVariant="blue"
          icon="clock"
          iconSize="sm"
          ?chevron=${!0}
          @click=${this.onTransactions.bind(this)}
          data-testid="w3m-account-default-activity-button"
        >
          <wui-text variant="paragraph-500" color="fg-100">Activity</wui-text>
        </wui-list-item>`:null}swapsTemplate(){const e=this.remoteFeatures?.swaps,i=u.R.state.activeChain===x.b.CHAIN.EVM;return e&&i?s.dy`
      <wui-list-item
        iconVariant="blue"
        icon="recycleHorizontal"
        ?chevron=${!0}
        @click=${this.handleClickSwap.bind(this)}
        data-testid="w3m-account-default-swaps-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Swap</wui-text>
      </wui-list-item>
    `:null}sendTemplate(){const e=this.features?.send,i=u.R.state.activeChain,o=_.bq.SEND_SUPPORTED_NAMESPACES.includes(i);return e&&o?s.dy`
      <wui-list-item
        iconVariant="blue"
        icon="send"
        ?chevron=${!0}
        @click=${this.handleClickSend.bind(this)}
        data-testid="w3m-account-default-send-button"
      >
        <wui-text variant="paragraph-500" color="fg-100">Send</wui-text>
      </wui-list-item>
    `:null}authCardTemplate(){const e=u.R.state.activeChain,i=m.ConnectorController.getConnectorId(e),o=m.ConnectorController.getAuthConnector(),{origin:n}=location;return!o||i!==x.b.CONNECTOR_ID.AUTH||n.includes(_.bq.SECURE_SITE)?null:s.dy`
      <wui-notice-card
        @click=${this.onGoToUpgradeView.bind(this)}
        label="Upgrade your wallet"
        description="Transition to a self-custodial wallet"
        icon="wallet"
        data-testid="w3m-wallet-upgrade-card"
      ></wui-notice-card>
    `}handleSwitchAccountsView(){f.RouterController.push("SwitchAddress")}handleClickPay(){f.RouterController.push("OnRampProviders")}handleClickSwap(){f.RouterController.push("Swap")}handleClickSend(){f.RouterController.push("WalletSend")}explorerBtnTemplate(){return p.AccountController.state.addressExplorerUrl?s.dy`
      <wui-button size="md" variant="neutral" @click=${this.onExplorer.bind(this)}>
        <wui-icon size="sm" color="inherit" slot="iconLeft" name="compass"></wui-icon>
        Block Explorer
        <wui-icon size="sm" color="inherit" slot="iconRight" name="externalLink"></wui-icon>
      </wui-button>
    `:null}singleAccountTemplate(){return s.dy`
      <wui-avatar
        alt=${(0,h.o)(this.caipAddress)}
        address=${(0,h.o)(v.j.getPlainAddress(this.caipAddress))}
        imageSrc=${(0,h.o)(null===this.profileImage?void 0:this.profileImage)}
        data-testid="single-account-avatar"
      ></wui-avatar>
      <wui-flex flexDirection="column" alignItems="center">
        <wui-flex gap="3xs" alignItems="center" justifyContent="center">
          <wui-text variant="large-600" color="fg-100">
            ${this.profileName?w.Hg.getTruncateString({string:this.profileName,charsStart:20,charsEnd:0,truncate:"end"}):w.Hg.getTruncateString({string:this.address||"",charsStart:4,charsEnd:4,truncate:"middle"})}
          </wui-text>
          <wui-icon-link
            size="md"
            icon="copy"
            iconColor="fg-200"
            @click=${this.onCopyAddress}
          ></wui-icon-link> </wui-flex
      ></wui-flex>
    `}multiAccountTemplate(){if(!this.address)throw new Error("w3m-account-view: No account provided");const e=this.allAccounts.find(o=>o.address===this.address),i=p.AccountController.state.addressLabels.get(this.address);return"bip122"===this.namespace?this.btcAccountsTemplate():s.dy`
      <wui-profile-button-v2
        .onProfileClick=${this.handleSwitchAccountsView.bind(this)}
        address=${(0,h.o)(this.address)}
        icon="${e?.type===E.y_.ACCOUNT_TYPES.SMART_ACCOUNT&&u.R.state.activeChain===x.b.CHAIN.EVM?"lightbulb":"mail"}"
        avatarSrc=${(0,h.o)(this.profileImage?this.profileImage:void 0)}
        profileName=${(0,h.o)(i||this.profileName)}
        .onCopyClick=${this.onCopyAddress.bind(this)}
      ></wui-profile-button-v2>
    `}btcAccountsTemplate(){return s.dy`<wui-flex gap="m" alignItems="center" flexDirection="column">
      <wui-avatar
        .imageSrc=${(0,h.o)(this.profileImage?this.profileImage:void 0)}
        alt=${this.address}
        address=${this.address}
      ></wui-avatar>
      <wui-tabs
        .tabs=${[{label:"Payment"},{label:"Ordinals"}]}
        .onTabChange=${e=>p.AccountController.setCaipAddress(`bip122:${this.chainId}:${this.allAccounts[e]?.address||""}`,this.namespace)}
      ></wui-tabs>
      <wui-flex gap="xs" alignItems="center" justifyContent="center">
        <wui-text variant="large-600" color="fg-100">
          ${w.Hg.getTruncateString({string:this.profileName||this.address||"",charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
        </wui-text>
        <wui-icon-link
          size="md"
          icon="copy"
          iconColor="fg-200"
          @click=${this.onCopyAddress}
        ></wui-icon-link>
      </wui-flex>
    </wui-flex>`}onCopyAddress(){try{this.address&&(v.j.copyToClopboard(this.address),M.SnackController.showSuccess("Address copied"))}catch{M.SnackController.showError("Failed to copy")}}onTransactions(){const e=u.R.state.activeChain;y.X.sendEvent({type:"track",event:"CLICK_TRANSACTIONS",properties:{isSmartAccount:p.AccountController.state.preferredAccountTypes?.[e]===E.y_.ACCOUNT_TYPES.SMART_ACCOUNT}}),f.RouterController.push("Transactions")}onDisconnect(){var e=this;return(0,T.Z)(function*(){try{e.disconnecting=!0,yield Q.ConnectionController.disconnect(),S.I.close()}catch{y.X.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),M.SnackController.showError("Failed to disconnect")}finally{e.disconnecting=!1}})()}onExplorer(){const e=p.AccountController.state.addressExplorerUrl;e&&v.j.openHref(e,"_blank")}onGoToUpgradeView(){y.X.sendEvent({type:"track",event:"EMAIL_UPGRADE_FROM_MODAL"}),f.RouterController.push("UpgradeEmailWallet")}};N.styles=Xt,O([(0,c.SB)()],N.prototype,"caipAddress",void 0),O([(0,c.SB)()],N.prototype,"address",void 0),O([(0,c.SB)()],N.prototype,"allAccounts",void 0),O([(0,c.SB)()],N.prototype,"profileImage",void 0),O([(0,c.SB)()],N.prototype,"profileName",void 0),O([(0,c.SB)()],N.prototype,"disconnecting",void 0),O([(0,c.SB)()],N.prototype,"balance",void 0),O([(0,c.SB)()],N.prototype,"balanceSymbol",void 0),O([(0,c.SB)()],N.prototype,"features",void 0),O([(0,c.SB)()],N.prototype,"remoteFeatures",void 0),O([(0,c.SB)()],N.prototype,"namespace",void 0),O([(0,c.SB)()],N.prototype,"chainId",void 0),N=O([(0,w.Mo)("w3m-account-default-widget")],N);const Zt=s.iv`
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
`;var it=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let Ce=class extends s.oi{constructor(){super(...arguments),this.dollars="0",this.pennies="00"}render(){return s.dy`<span>$${this.dollars}<span class="pennies">.${this.pennies}</span></span>`}};Ce.styles=[b.ET,Zt],it([(0,c.Cb)()],Ce.prototype,"dollars",void 0),it([(0,c.Cb)()],Ce.prototype,"pennies",void 0),Ce=it([(0,k.M)("wui-balance")],Ce);d(73527);const Yt=s.iv`
  button {
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    border: 1px solid var(--wui-color-gray-glass-002);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s) var(--wui-spacing-xs) var(--wui-spacing-xs);
    position: relative;
  }

  wui-avatar {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 0;
    outline: 3px solid var(--wui-color-gray-glass-005);
  }

  wui-icon-box,
  wui-image {
    width: 16px;
    height: 16px;
    border-radius: var(--wui-border-radius-3xl);
    position: absolute;
    left: 26px;
    top: 24px;
  }

  wui-image {
    outline: 2px solid var(--wui-color-bg-125);
  }

  wui-icon-box {
    outline: 2px solid var(--wui-color-bg-200);
    background-color: var(--wui-color-bg-250);
  }
`;var ue=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let q=class extends s.oi{constructor(){super(...arguments),this.networkSrc=void 0,this.avatarSrc=void 0,this.profileName="",this.address="",this.icon="chevronBottom"}render(){return s.dy`<button data-testid="wui-profile-button">
      <wui-flex gap="xs" alignItems="center">
        <wui-avatar
          .imageSrc=${this.avatarSrc}
          alt=${this.address}
          address=${this.address}
        ></wui-avatar>
        ${this.networkImageTemplate()}
        <wui-flex gap="xs" alignItems="center">
          <wui-text variant="large-600" color="fg-100">
            ${_e.H.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
          </wui-text>
          <wui-icon size="sm" color="fg-200" name=${this.icon}></wui-icon>
        </wui-flex>
      </wui-flex>
    </button>`}networkImageTemplate(){return this.networkSrc?s.dy`<wui-image src=${this.networkSrc}></wui-image>`:s.dy`
      <wui-icon-box
        size="xxs"
        iconColor="fg-200"
        backgroundColor="bg-100"
        icon="networkPlaceholder"
      ></wui-icon-box>
    `}};q.styles=[b.ET,b.ZM,Yt],ue([(0,c.Cb)()],q.prototype,"networkSrc",void 0),ue([(0,c.Cb)()],q.prototype,"avatarSrc",void 0),ue([(0,c.Cb)()],q.prototype,"profileName",void 0),ue([(0,c.Cb)()],q.prototype,"address",void 0),ue([(0,c.Cb)()],q.prototype,"icon",void 0),q=ue([(0,k.M)("wui-profile-button")],q);const Jt=s.iv`
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
`;var De=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let de=class extends s.oi{constructor(){super(...arguments),this.placement="top",this.variant="fill",this.message=""}render(){return this.dataset.variant=this.variant,s.dy`<wui-icon
        data-placement=${this.placement}
        color="fg-100"
        size="inherit"
        name=${"fill"===this.variant?"cursor":"cursorTransparent"}
      ></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>`}};de.styles=[b.ET,b.ZM,Jt],De([(0,c.Cb)()],de.prototype,"placement",void 0),De([(0,c.Cb)()],de.prototype,"variant",void 0),De([(0,c.Cb)()],de.prototype,"message",void 0),de=De([(0,k.M)("wui-tooltip")],de);var yt=d(37847);const Qt={getTabsByNamespace:a=>a&&a===x.b.CHAIN.EVM?!1===g.OptionsController.state.remoteFeatures?.activity?yt.b.ACCOUNT_TABS.filter(i=>"Activity"!==i.label):yt.b.ACCOUNT_TABS:[]};d(41643);const qt=s.iv`
  :host {
    width: 100%;
    max-height: 280px;
    overflow: scroll;
    scrollbar-width: none;
  }

  :host::-webkit-scrollbar {
    display: none;
  }
`;let ot=class extends s.oi{render(){return s.dy`<w3m-activity-list page="account"></w3m-activity-list>`}};ot.styles=qt,ot=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t}([(0,w.Mo)("w3m-account-activity-widget")],ot);d(6500),d(88198);const ti=s.iv`
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
`;let nt=class extends s.oi{render(){return s.dy`${this.nftTemplate()}`}nftTemplate(){return s.dy` <wui-flex
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
    </wui-flex>`}onReceiveClick(){f.RouterController.push("WalletReceive")}};nt.styles=ti,nt=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t}([(0,w.Mo)("w3m-account-nfts-widget")],nt);d(28019);const oi=s.iv`
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
`;var ee=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let F=class extends s.oi{constructor(){super(...arguments),this.icon="card",this.text="",this.description="",this.tag=void 0,this.iconBackgroundColor="accent-100",this.iconColor="accent-100",this.disabled=!1}render(){return s.dy`
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
    `}titleTemplate(){return this.tag?s.dy` <wui-flex alignItems="center" gap="xxs"
        ><wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text
        ><wui-tag tagType="main" size="md">${this.tag}</wui-tag>
      </wui-flex>`:s.dy`<wui-text variant="paragraph-500" color="fg-100">${this.text}</wui-text>`}};F.styles=[b.ET,b.ZM,oi],ee([(0,c.Cb)()],F.prototype,"icon",void 0),ee([(0,c.Cb)()],F.prototype,"text",void 0),ee([(0,c.Cb)()],F.prototype,"description",void 0),ee([(0,c.Cb)()],F.prototype,"tag",void 0),ee([(0,c.Cb)()],F.prototype,"iconBackgroundColor",void 0),ee([(0,c.Cb)()],F.prototype,"iconColor",void 0),ee([(0,c.Cb)({type:Boolean})],F.prototype,"disabled",void 0),F=ee([(0,k.M)("wui-list-description")],F);d(55155);const ni=s.iv`
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
`;var rt=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let ye=class extends s.oi{constructor(){super(),this.unsubscribe=[],this.tokenBalance=p.AccountController.state.tokenBalance,this.remoteFeatures=g.OptionsController.state.remoteFeatures,this.unsubscribe.push(p.AccountController.subscribe(e=>{this.tokenBalance=e.tokenBalance}),g.OptionsController.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return s.dy`${this.tokenTemplate()}`}tokenTemplate(){return this.tokenBalance&&this.tokenBalance?.length>0?s.dy`<wui-flex class="contentContainer" flexDirection="column" gap="xs">
        ${this.tokenItemTemplate()}
      </wui-flex>`:s.dy` <wui-flex flexDirection="column" gap="xs"
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
    ></wui-flex>`}onRampTemplate(){return this.remoteFeatures?.onramp?s.dy`<wui-list-description
        @click=${this.onBuyClick.bind(this)}
        text="Buy Crypto"
        description="Easy with card or bank account"
        icon="card"
        iconColor="success-100"
        iconBackgroundColor="success-100"
        tag="popular"
        data-testid="buy-crypto"
      ></wui-list-description>`:s.dy``}tokenItemTemplate(){return this.tokenBalance?.map(e=>s.dy`<wui-list-token
          tokenName=${e.name}
          tokenImageUrl=${e.iconUrl}
          tokenAmount=${e.quantity.numeric}
          tokenValue=${e.value}
          tokenCurrency=${e.symbol}
        ></wui-list-token>`)}onReceiveClick(){f.RouterController.push("WalletReceive")}onBuyClick(){const e=u.R.state.activeChain;y.X.sendEvent({type:"track",event:"SELECT_BUY_CRYPTO",properties:{isSmartAccount:p.AccountController.state.preferredAccountTypes?.[e]===E.y_.ACCOUNT_TYPES.SMART_ACCOUNT}}),f.RouterController.push("OnRampProviders")}};ye.styles=ni,rt([(0,c.SB)()],ye.prototype,"tokenBalance",void 0),rt([(0,c.SB)()],ye.prototype,"remoteFeatures",void 0),ye=rt([(0,w.Mo)("w3m-account-tokens-widget")],ye);d(33223),d(62700);const ri=s.iv`
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
`;var L=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let W=class extends s.oi{constructor(){super(),this.unsubscribe=[],this.address=p.AccountController.state.address,this.profileImage=p.AccountController.state.profileImage,this.profileName=p.AccountController.state.profileName,this.network=u.R.state.activeCaipNetwork,this.currentTab=p.AccountController.state.currentTab,this.tokenBalance=p.AccountController.state.tokenBalance,this.features=g.OptionsController.state.features,this.remoteFeatures=g.OptionsController.state.remoteFeatures,this.networkImage=C.f.getNetworkImage(this.network),this.unsubscribe.push(se.W.subscribeNetworkImages(()=>{this.networkImage=C.f.getNetworkImage(this.network)}),p.AccountController.subscribe(e=>{e.address?(this.address=e.address,this.profileImage=e.profileImage,this.profileName=e.profileName,this.currentTab=e.currentTab,this.tokenBalance=e.tokenBalance):S.I.close()}),u.R.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=C.f.getNetworkImage(this.network)}),g.OptionsController.subscribeKey("features",e=>this.features=e),g.OptionsController.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e)),this.watchSwapValues()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),clearInterval(this.watchTokenBalance)}firstUpdated(){p.AccountController.fetchTokenBalance()}render(){if(!this.address)throw new Error("w3m-account-view: No account provided");return s.dy`<wui-flex
      flexDirection="column"
      .padding=${["0","xl","m","xl"]}
      alignItems="center"
      gap="m"
      data-testid="w3m-account-wallet-features-widget"
    >
      <wui-profile-button
        @click=${this.onProfileButtonClick.bind(this)}
        address=${(0,h.o)(this.address)}
        networkSrc=${(0,h.o)(this.networkImage)}
        icon="chevronBottom"
        avatarSrc=${(0,h.o)(this.profileImage?this.profileImage:void 0)}
        profileName=${(0,h.o)(this.profileName??void 0)}
        data-testid="w3m-profile-button"
      ></wui-profile-button>

      ${this.tokenBalanceTemplate()} ${this.orderedWalletFeatures()} ${this.tabsTemplate()}
      ${this.listContentTemplate()}
    </wui-flex>`}orderedWalletFeatures(){const e=this.features?.walletFeaturesOrder||_.bq.DEFAULT_FEATURES.walletFeaturesOrder;return e.every(o=>"send"===o||"receive"===o?!this.features?.[o]:"swaps"!==o&&"onramp"!==o||!this.remoteFeatures?.[o])?null:s.dy`<wui-flex gap="s">
      ${e.map(o=>{switch(o){case"onramp":return this.onrampTemplate();case"swaps":return this.swapsTemplate();case"receive":return this.receiveTemplate();case"send":return this.sendTemplate();default:return null}})}
    </wui-flex>`}onrampTemplate(){return this.remoteFeatures?.onramp?s.dy`
      <w3m-tooltip-trigger text="Buy">
        <wui-icon-button
          data-testid="wallet-features-onramp-button"
          @click=${this.onBuyClick.bind(this)}
          icon="card"
        ></wui-icon-button>
      </w3m-tooltip-trigger>
    `:null}swapsTemplate(){const e=this.remoteFeatures?.swaps,i=u.R.state.activeChain===x.b.CHAIN.EVM;return e&&i?s.dy`
      <w3m-tooltip-trigger text="Swap">
        <wui-icon-button
          data-testid="wallet-features-swaps-button"
          @click=${this.onSwapClick.bind(this)}
          icon="recycleHorizontal"
        >
        </wui-icon-button>
      </w3m-tooltip-trigger>
    `:null}receiveTemplate(){return this.features?.receive?s.dy`
      <w3m-tooltip-trigger text="Receive">
        <wui-icon-button
          data-testid="wallet-features-receive-button"
          @click=${this.onReceiveClick.bind(this)}
          icon="arrowBottomCircle"
        >
        </wui-icon-button>
      </w3m-tooltip-trigger>
    `:null}sendTemplate(){const e=this.features?.send,i=u.R.state.activeChain,o=_.bq.SEND_SUPPORTED_NAMESPACES.includes(i);return e&&o?s.dy`
      <w3m-tooltip-trigger text="Send">
        <wui-icon-button
          data-testid="wallet-features-send-button"
          @click=${this.onSendClick.bind(this)}
          icon="send"
        ></wui-icon-button>
      </w3m-tooltip-trigger>
    `:null}watchSwapValues(){this.watchTokenBalance=setInterval(()=>p.AccountController.fetchTokenBalance(e=>this.onTokenBalanceError(e)),1e4)}onTokenBalanceError(e){e instanceof Error&&e.cause instanceof Response&&e.cause.status===x.b.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE&&clearInterval(this.watchTokenBalance)}listContentTemplate(){return 0===this.currentTab?s.dy`<w3m-account-tokens-widget></w3m-account-tokens-widget>`:1===this.currentTab?s.dy`<w3m-account-nfts-widget></w3m-account-nfts-widget>`:2===this.currentTab?s.dy`<w3m-account-activity-widget></w3m-account-activity-widget>`:s.dy`<w3m-account-tokens-widget></w3m-account-tokens-widget>`}tokenBalanceTemplate(){if(this.tokenBalance&&this.tokenBalance?.length>=0){const e=v.j.calculateBalance(this.tokenBalance),{dollars:i="0",pennies:o="00"}=v.j.formatTokenBalance(e);return s.dy`<wui-balance dollars=${i} pennies=${o}></wui-balance>`}return s.dy`<wui-balance dollars="0" pennies="00"></wui-balance>`}tabsTemplate(){const e=Qt.getTabsByNamespace(u.R.state.activeChain);if(0===e.length)return null;let o="104px";return o=v.j.isMobile()&&window.innerWidth<430?(window.innerWidth-48)/e.length+"px":2===e.length?"156px":"104px",s.dy`<wui-tabs
      .onTabChange=${this.onTabChange.bind(this)}
      .activeTab=${this.currentTab}
      localTabWidth=${o}
      .tabs=${e}
    ></wui-tabs>`}onTabChange(e){p.AccountController.setCurrentTab(e)}onProfileButtonClick(){const{allAccounts:e}=p.AccountController.state;e.length>1?f.RouterController.push("Profile"):f.RouterController.push("AccountSettings")}onBuyClick(){f.RouterController.push("OnRampProviders")}onSwapClick(){const e=u.R.state.activeChain;this.network?.caipNetworkId&&!_.bq.SWAP_SUPPORTED_NETWORKS.includes(this.network?.caipNetworkId)?f.RouterController.push("UnsupportedChain",{swapUnsupportedChain:!0}):(y.X.sendEvent({type:"track",event:"OPEN_SWAP",properties:{network:this.network?.caipNetworkId||"",isSmartAccount:p.AccountController.state.preferredAccountTypes?.[e]===E.y_.ACCOUNT_TYPES.SMART_ACCOUNT}}),f.RouterController.push("Swap"))}onReceiveClick(){f.RouterController.push("WalletReceive")}onSendClick(){const e=u.R.state.activeChain;y.X.sendEvent({type:"track",event:"OPEN_SEND",properties:{network:this.network?.caipNetworkId||"",isSmartAccount:p.AccountController.state.preferredAccountTypes?.[e]===E.y_.ACCOUNT_TYPES.SMART_ACCOUNT}}),f.RouterController.push("WalletSend")}};W.styles=ri,L([(0,c.SB)()],W.prototype,"watchTokenBalance",void 0),L([(0,c.SB)()],W.prototype,"address",void 0),L([(0,c.SB)()],W.prototype,"profileImage",void 0),L([(0,c.SB)()],W.prototype,"profileName",void 0),L([(0,c.SB)()],W.prototype,"network",void 0),L([(0,c.SB)()],W.prototype,"currentTab",void 0),L([(0,c.SB)()],W.prototype,"tokenBalance",void 0),L([(0,c.SB)()],W.prototype,"features",void 0),L([(0,c.SB)()],W.prototype,"remoteFeatures",void 0),L([(0,c.SB)()],W.prototype,"networkImage",void 0),W=L([(0,w.Mo)("w3m-account-wallet-features-widget")],W);var St=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let Ue=class extends s.oi{constructor(){super(),this.unsubscribe=[],this.namespace=u.R.state.activeChain,this.unsubscribe.push(u.R.subscribeKey("activeChain",e=>{this.namespace=e}))}render(){if(!this.namespace)return null;const e=m.ConnectorController.getConnectorId(this.namespace),i=m.ConnectorController.getAuthConnector();return s.dy`
      ${i&&e===x.b.CONNECTOR_ID.AUTH?this.walletFeaturesTemplate():this.defaultTemplate()}
    `}walletFeaturesTemplate(){return s.dy`<w3m-account-wallet-features-widget></w3m-account-wallet-features-widget>`}defaultTemplate(){return s.dy`<w3m-account-default-widget></w3m-account-default-widget>`}};St([(0,c.SB)()],Ue.prototype,"namespace",void 0),Ue=St([(0,w.Mo)("w3m-account-view")],Ue);var kt=d(21838);const li=s.iv`
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

  wui-image {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    border-radius: var(--wui-border-radius-3xl);
  }

  wui-avatar {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    box-shadow: 0 0 0 0;
  }
  .address {
    color: var(--wui-color-fg-base-100);
  }
  .address-description {
    text-transform: capitalize;
    color: var(--wui-color-fg-base-200);
  }

  wui-icon-box {
    position: relative;
    right: 15px;
    top: 15px;
    border: 2px solid var(--wui-color-bg-150);
    background-color: var(--wui-color-bg-125);
  }
`;var Se=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let ne=class extends s.oi{constructor(){super(...arguments),this.accountAddress="",this.accountType="",this.labels=p.AccountController.state.addressLabels,this.caipNetwork=u.R.state.activeCaipNetwork,this.socialProvider=et.M.getConnectedSocialProvider(),this.balance=0,this.fetchingBalance=!0,this.shouldShowIcon=!1,this.selected=!1}connectedCallback(){super.connectedCallback(),kt.L.getBalance(this.accountAddress,this.caipNetwork?.caipNetworkId).then(e=>{let i=this.balance;e.balances.length>0&&(i=e.balances.reduce((o,n)=>o+(n?.value||0),0)),this.balance=i,this.fetchingBalance=!1,this.requestUpdate()}).catch(()=>{this.fetchingBalance=!1,this.requestUpdate()})}render(){const e=this.getLabel(),i=u.R.state.activeChain,o=m.ConnectorController.getConnectorId(i);return this.shouldShowIcon=o===x.b.CONNECTOR_ID.AUTH,s.dy`
      <wui-flex
        flexDirection="row"
        justifyContent="space-between"
        .padding=${["0","0","s","1xs"]}
      >
        <wui-flex gap="md" alignItems="center">
          <wui-avatar address=${this.accountAddress}></wui-avatar>
          ${this.shouldShowIcon?s.dy`<wui-icon-box
                size="sm"
                iconcolor="fg-200"
                backgroundcolor="fg-300"
                icon=${this.accountType===E.y_.ACCOUNT_TYPES.EOA?this.socialProvider??"mail":"lightbulb"}
                background="fg-300"
              ></wui-icon-box>`:s.dy`<wui-flex .padding="${["0","0","0","s"]}"></wui-flex>`}
          <wui-flex flexDirection="column">
            <wui-text class="address" variant="paragraph-500" color="fg-100"
              >${_e.H.getTruncateString({string:this.accountAddress,charsStart:4,charsEnd:6,truncate:"middle"})}</wui-text
            >
            <wui-text class="address-description" variant="small-400">${e}</wui-text></wui-flex
          >
        </wui-flex>
        <wui-flex gap="s" alignItems="center">
          <slot name="action"></slot>
          ${this.fetchingBalance?s.dy`<wui-loading-spinner size="sm" color="accent-100"></wui-loading-spinner>`:s.dy` <wui-text variant="small-400">$${this.balance.toFixed(2)}</wui-text>`}
        </wui-flex>
      </wui-flex>
    `}getLabel(){let e=this.labels?.get(this.accountAddress);const i=u.R.state.activeChain,o=m.ConnectorController.getConnectorId(i);return e||o!==x.b.CONNECTOR_ID.AUTH?e||(e="EOA"):e=`${"eoa"===this.accountType?this.socialProvider??"Email":"Smart"} Account`,e}};ne.styles=[b.ET,b.ZM,li],Se([(0,c.Cb)()],ne.prototype,"accountAddress",void 0),Se([(0,c.Cb)()],ne.prototype,"accountType",void 0),Se([(0,c.Cb)({type:Boolean})],ne.prototype,"selected",void 0),Se([(0,c.Cb)({type:Function})],ne.prototype,"onSelect",void 0),ne=Se([(0,k.M)("wui-list-account")],ne);const ci=s.iv`
  wui-flex {
    width: 100%;
  }

  wui-icon-link {
    margin-right: calc(var(--wui-icon-box-size-md) * -1);
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
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  .account-links wui-flex:hover {
    background: var(--dark-accent-glass-015, rgba(71, 161, 255, 0.15));
  }

  .account-links wui-flex wui-icon {
    width: var(--S, 20px);
    height: var(--S, 20px);
  }

  .account-links wui-flex wui-icon svg path {
    stroke: #47a1ff;
  }

  .account-settings-button {
    padding: calc(var(--wui-spacing-m) - 1px) var(--wui-spacing-2l);
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
    border: 1px solid var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    cursor: pointer;
  }

  .account-settings-button:hover {
    background: var(--wui-color-gray-glass-005);
  }
`;var pe=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let X=class extends s.oi{constructor(){super(),this.usubscribe=[],this.address=p.AccountController.state.address,this.profileImage=p.AccountController.state.profileImage,this.profileName=p.AccountController.state.profileName,this.accounts=p.AccountController.state.allAccounts,this.loading=!1,this.usubscribe.push(p.AccountController.subscribeKey("address",e=>{e?this.address=e:S.I.close()})),this.usubscribe.push(p.AccountController.subscribeKey("profileImage",e=>{this.profileImage=e})),this.usubscribe.push(p.AccountController.subscribeKey("profileName",e=>{this.profileName=e}))}disconnectedCallback(){this.usubscribe.forEach(e=>e())}render(){if(!this.address)throw new Error("w3m-profile-view: No account provided");return s.dy`
      <wui-flex flexDirection="column" gap="l" .padding=${["0","xl","m","xl"]}>
        <wui-flex flexDirection="column" alignItems="center" gap="l">
          <wui-avatar
            alt=${this.address}
            address=${this.address}
            imageSrc=${(0,h.o)(this.profileImage)}
            size="2lg"
          ></wui-avatar>
          <wui-flex flexDirection="column" alignItems="center">
            <wui-flex gap="3xs" alignItems="center" justifyContent="center">
              <wui-text variant="title-6-600" color="fg-100" data-testid="account-settings-address">
                ${this.profileName?w.Hg.getTruncateString({string:this.profileName,charsStart:20,charsEnd:0,truncate:"end"}):w.Hg.getTruncateString({string:this.address,charsStart:4,charsEnd:6,truncate:"middle"})}
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
        <wui-flex
          data-testid="account-settings-button"
          justifyContent="center"
          alignItems="center"
          class="account-settings-button"
          @click=${()=>f.RouterController.push("AccountSettings")}
        >
          <wui-text variant="paragraph-500" color="fg-100">Account Settings</wui-text>
        </wui-flex>
        ${this.accountsTemplate()}
      </wui-flex>
    `}accountsTemplate(){return s.dy`<wui-flex flexDirection="column">
      <wui-flex .padding=${["3xs","m","s","s"]}>
        <wui-text color="fg-200" variant="paragraph-400">Your accounts</wui-text>
      </wui-flex>
      <wui-flex flexDirection="column" gap="xxs">
        ${this.accounts.map(e=>this.accountTemplate(e))}
      </wui-flex>
    </wui-flex>`}onSwitchAccount(e){var i=this;return(0,T.Z)(function*(){const o=u.R.state.activeCaipNetwork?.chainNamespace;if(i.loading=!0,m.ConnectorController.getAuthConnector()){const t=e.type;yield Q.ConnectionController.setPreferredAccountType(t,o)}p.AccountController.setShouldUpdateToAddress(e.address,o),i.loading=!1})()}accountTemplate(e){return s.dy`<wui-list-account accountAddress=${e.address} accountType=${e.type}>
      ${e.address===this.address?"":s.dy`<wui-button
            slot="action"
            textVariant="small-600"
            size="md"
            variant="accent"
            @click=${()=>this.onSwitchAccount(e)}
            .loading=${this.loading}
            >Switch</wui-button
          >`}
    </wui-list-account>`}onCopyAddress(){try{this.address&&(v.j.copyToClopboard(this.address),M.SnackController.showSuccess("Address copied"))}catch{M.SnackController.showError("Failed to copy")}}};X.styles=ci,pe([(0,c.SB)()],X.prototype,"address",void 0),pe([(0,c.SB)()],X.prototype,"profileImage",void 0),pe([(0,c.SB)()],X.prototype,"profileName",void 0),pe([(0,c.SB)()],X.prototype,"accounts",void 0),pe([(0,c.SB)()],X.prototype,"loading",void 0),X=pe([(0,w.Mo)("w3m-profile-view")],X);const ui=s.iv`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-m);
    padding: var(--wui-spacing-1xs) var(--wui-spacing-s) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }
`;var Me=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let he=class extends s.oi{constructor(){super(...arguments),this.imageSrc="",this.text="",this.size=""}render(){return s.dy`
      <wui-flex gap="1xs" alignItems="center">
        <wui-avatar size=${this.size} imageSrc=${this.imageSrc}></wui-avatar>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
      </wui-flex>
    `}};he.styles=[b.ET,b.ZM,ui],Me([(0,c.Cb)()],he.prototype,"imageSrc",void 0),Me([(0,c.Cb)()],he.prototype,"text",void 0),Me([(0,c.Cb)()],he.prototype,"size",void 0),he=Me([(0,k.M)("wui-banner-img")],he);const di=s.iv`
  wui-avatar {
    width: var(--wui-spacing-3xl);
    height: var(--wui-spacing-3xl);
    box-shadow: 0 0 0 0;
  }

  wui-icon-box {
    position: relative;
    right: 15px;
    top: 15px;
    border: 2px solid var(--wui-color-bg-150);
    background-color: var(--wui-color-bg-125);
  }
`;var at=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let we=class extends s.oi{constructor(){super(),this.metadata=g.OptionsController.state.metadata,this.allAccounts=p.AccountController.state.allAccounts||[],this.balances={},this.labels=p.AccountController.state.addressLabels,this.currentAddress=p.AccountController.state.address||"",this.caipNetwork=u.R.state.activeCaipNetwork,p.AccountController.subscribeKey("allAccounts",e=>{this.allAccounts=e})}connectedCallback(){super.connectedCallback(),this.allAccounts.forEach(e=>{kt.L.getBalance(e.address,this.caipNetwork?.caipNetworkId).then(i=>{let o=this.balances[e.address]||0;i.balances.length>0&&(o=i.balances.reduce((n,t)=>n+(t?.value||0),0)),this.balances[e.address]=o,this.requestUpdate()})})}getAddressIcon(e){return"smartAccount"===e?"lightbulb":"mail"}render(){return s.dy`
      <wui-flex justifyContent="center" .padding=${["xl","0","xl","0"]}>
        <wui-banner-img
          imageSrc=${(0,h.o)(this.metadata?.icons[0])}
          text=${(0,h.o)(this.metadata?.url)}
          size="sm"
        ></wui-banner-img>
      </wui-flex>
      <wui-flex flexDirection="column" gap="xxl" .padding=${["l","xl","xl","xl"]}>
        ${this.allAccounts.map((e,i)=>this.getAddressTemplate(e,i))}
      </wui-flex>
    `}getAddressTemplate(e,i){const o=this.labels?.get(e.address),n=u.R.state.activeChain,r=m.ConnectorController.getConnectorId(n)===x.b.CONNECTOR_ID.AUTH;return s.dy`
      <wui-flex
        flexDirection="row"
        justifyContent="space-between"
        data-testid="switch-address-item"
      >
        <wui-flex alignItems="center">
          <wui-avatar address=${e.address}></wui-avatar>
          ${r?s.dy`<wui-icon-box
                size="sm"
                iconcolor="fg-200"
                backgroundcolor="glass-002"
                background="gray"
                icon="${this.getAddressIcon(e.type)}"
                ?border=${!0}
              ></wui-icon-box>`:s.dy`<wui-flex .padding="${["0","0","0","s"]}"></wui-flex>`}
          <wui-flex flexDirection="column">
            <wui-text class="address" variant="paragraph-500" color="fg-100"
              >${o||w.Hg.getTruncateString({string:e.address,charsStart:4,charsEnd:6,truncate:"middle"})}</wui-text
            >
            <wui-text class="address-description" variant="small-400">
              ${"number"==typeof this.balances[e.address]?`$${this.balances[e.address]?.toFixed(2)}`:s.dy`<wui-loading-spinner size="sm" color="accent-100"></wui-loading-spinner>`}
            </wui-text>
          </wui-flex>
        </wui-flex>
        <wui-flex gap="s" alignItems="center">
          ${e.address?.toLowerCase()===this.currentAddress?.toLowerCase()?"":s.dy`
                <wui-button
                  data-testid=${`w3m-switch-address-button-${i}`}
                  textVariant="small-600"
                  size="md"
                  variant="accent"
                  @click=${()=>this.onSwitchAddress(e.address)}
                  >Switch to</wui-button
                >
              `}
        </wui-flex>
      </wui-flex>
    `}onSwitchAddress(e){const i=u.R.state.activeCaipNetwork,o=i?.chainNamespace,n=`${o}:${i?.id}:${e}`;p.AccountController.setCaipAddress(n,o),S.I.close()}};we.styles=di,at([(0,c.SB)()],we.prototype,"allAccounts",void 0),at([(0,c.SB)()],we.prototype,"balances",void 0),we=at([(0,w.Mo)("w3m-switch-address-view")],we);var pi=d(43971),H=d(97663),At=d(69069),Le=d(96977);const hi=s.iv`
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
`;var Ve=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let fe=class extends s.oi{constructor(){super(...arguments),this.text="",this.disabled=!1,this.tabIdx=void 0}render(){return s.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,h.o)(this.tabIdx)}>
        <wui-text align="center" variant="paragraph-500" color="inherit">${this.text}</wui-text>
      </button>
    `}};fe.styles=[b.ET,b.ZM,hi],Ve([(0,c.Cb)()],fe.prototype,"text",void 0),Ve([(0,c.Cb)({type:Boolean})],fe.prototype,"disabled",void 0),Ve([(0,c.Cb)()],fe.prototype,"tabIdx",void 0),fe=Ve([(0,k.M)("wui-list-button")],fe);d(3715);var wi=d(98673),$t=d(29768);d(8894),d(30189);const fi=s.iv`
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
`;var ke=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let re=class extends s.oi{constructor(){super(...arguments),this.unsubscribe=[],this.formRef=(0,$t.V)(),this.email="",this.loading=!1,this.error=""}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}firstUpdated(){this.formRef.value?.addEventListener("keydown",e=>{"Enter"===e.key&&this.onSubmitEmail(e)})}render(){return s.dy`
      <form ${(0,$t.i)(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
        <wui-email-input
          @focus=${this.onFocusEvent.bind(this)}
          .disabled=${this.loading}
          @inputChange=${this.onEmailInputChange.bind(this)}
          tabIdx=${(0,h.o)(this.tabIdx)}
        >
        </wui-email-input>

        ${this.submitButtonTemplate()}${this.loadingTemplate()}
        <input type="submit" hidden />
      </form>
      ${this.templateError()}
    `}submitButtonTemplate(){return!this.loading&&this.email.length>3?s.dy`
          <wui-icon-link
            size="sm"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitEmail.bind(this)}
          >
          </wui-icon-link>
        `:null}loadingTemplate(){return this.loading?s.dy`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:null}templateError(){return this.error?s.dy`<wui-text variant="tiny-500" color="error-100">${this.error}</wui-text>`:null}onEmailInputChange(e){this.email=e.detail.trim(),this.error=""}onSubmitEmail(e){var i=this;return(0,T.Z)(function*(){if(!x.b.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(n=>n===u.R.state.activeChain)){const n=u.R.getFirstCaipNetworkSupportsAuthConnector();if(n)return void f.RouterController.push("SwitchNetwork",{network:n})}try{if(i.loading)return;i.loading=!0,e.preventDefault();const n=m.ConnectorController.getAuthConnector();if(!n)throw new Error("w3m-email-login-widget: Auth connector not found");const{action:t}=yield n.provider.connectEmail({email:i.email});y.X.sendEvent({type:"track",event:"EMAIL_SUBMITTED"}),"VERIFY_OTP"===t?(y.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),f.RouterController.push("EmailVerifyOtp",{email:i.email})):"VERIFY_DEVICE"===t?f.RouterController.push("EmailVerifyDevice",{email:i.email}):"CONNECT"===t&&(yield Q.ConnectionController.connectExternal(n,u.R.state.activeChain),f.RouterController.replace("Account"))}catch(n){v.j.parseError(n)?.includes("Invalid email")?i.error="Invalid email. Try again.":M.SnackController.showError(n)}finally{i.loading=!1}})()}onFocusEvent(){y.X.sendEvent({type:"track",event:"EMAIL_LOGIN_SELECTED"})}};re.styles=fi,ke([(0,c.Cb)()],re.prototype,"tabIdx",void 0),ke([(0,c.SB)()],re.prototype,"email",void 0),ke([(0,c.SB)()],re.prototype,"loading",void 0),ke([(0,c.SB)()],re.prototype,"error",void 0),re=ke([(0,w.Mo)("w3m-email-login-widget")],re);d(45231),d(81616);var gi=d(13314),mi=d(39168);d(50699),d(96666);const bi=s.iv`
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
`;var ze=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let ge=class extends s.oi{constructor(){super(...arguments),this.logo="google",this.disabled=!1,this.tabIdx=void 0}render(){return s.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,h.o)(this.tabIdx)}>
        <wui-logo logo=${this.logo}></wui-logo>
      </button>
    `}};ge.styles=[b.ET,b.ZM,bi],ze([(0,c.Cb)()],ge.prototype,"logo",void 0),ze([(0,c.Cb)({type:Boolean})],ge.prototype,"disabled",void 0),ze([(0,c.Cb)()],ge.prototype,"tabIdx",void 0),ge=ze([(0,k.M)("wui-logo-select")],ge);var vi=d(14823);const xi=s.iv`
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-m)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var ae=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let Z=class extends s.oi{constructor(){super(),this.unsubscribe=[],this.walletGuide="get-started",this.tabIdx=void 0,this.connectors=m.ConnectorController.state.connectors,this.remoteFeatures=g.OptionsController.state.remoteFeatures,this.authConnector=this.connectors.find(e=>"AUTH"===e.type),this.isPwaLoading=!1,this.unsubscribe.push(m.ConnectorController.subscribeKey("connectors",e=>{this.connectors=e,this.authConnector=this.connectors.find(i=>"AUTH"===i.type)}),g.OptionsController.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}connectedCallback(){super.connectedCallback(),this.handlePwaFrameLoad()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return s.dy`
      <wui-flex
        class="container"
        flexDirection="column"
        gap="xs"
        data-testid="w3m-social-login-widget"
      >
        ${this.topViewTemplate()}${this.bottomViewTemplate()}
      </wui-flex>
    `}topViewTemplate(){const e="explore"===this.walletGuide;let i=this.remoteFeatures?.socials;return!i&&e?(i=_.bq.DEFAULT_SOCIALS,this.renderTopViewContent(i)):i?this.renderTopViewContent(i):null}renderTopViewContent(e){return 2===e.length?s.dy` <wui-flex gap="xs">
        ${e.slice(0,2).map(i=>s.dy`<wui-logo-select
              data-testid=${`social-selector-${i}`}
              @click=${()=>{this.onSocialClick(i)}}
              logo=${i}
              tabIdx=${(0,h.o)(this.tabIdx)}
              ?disabled=${this.isPwaLoading}
            ></wui-logo-select>`)}
      </wui-flex>`:s.dy` <wui-list-social
      data-testid=${`social-selector-${e[0]}`}
      @click=${()=>{this.onSocialClick(e[0])}}
      logo=${(0,h.o)(e[0])}
      align="center"
      name=${`Continue with ${e[0]}`}
      tabIdx=${(0,h.o)(this.tabIdx)}
      ?disabled=${this.isPwaLoading}
    ></wui-list-social>`}bottomViewTemplate(){let e=this.remoteFeatures?.socials;const i="explore"===this.walletGuide;return(!this.authConnector||!e||0===e.length)&&i&&(e=_.bq.DEFAULT_SOCIALS),!e||e.length<=2?null:e&&e.length>6?s.dy`<wui-flex gap="xs">
        ${e.slice(1,5).map(n=>s.dy`<wui-logo-select
              data-testid=${`social-selector-${n}`}
              @click=${()=>{this.onSocialClick(n)}}
              logo=${n}
              tabIdx=${(0,h.o)(this.tabIdx)}
              ?focusable=${void 0!==this.tabIdx&&this.tabIdx>=0}
              ?disabled=${this.isPwaLoading}
            ></wui-logo-select>`)}
        <wui-logo-select
          logo="more"
          tabIdx=${(0,h.o)(this.tabIdx)}
          @click=${this.onMoreSocialsClick.bind(this)}
          ?disabled=${this.isPwaLoading}
          data-testid="social-selector-more"
        ></wui-logo-select>
      </wui-flex>`:e?s.dy`<wui-flex gap="xs">
      ${e.slice(1,e.length).map(n=>s.dy`<wui-logo-select
            data-testid=${`social-selector-${n}`}
            @click=${()=>{this.onSocialClick(n)}}
            logo=${n}
            tabIdx=${(0,h.o)(this.tabIdx)}
            ?focusable=${void 0!==this.tabIdx&&this.tabIdx>=0}
            ?disabled=${this.isPwaLoading}
          ></wui-logo-select>`)}
    </wui-flex>`:null}onMoreSocialsClick(){f.RouterController.push("ConnectSocials")}onSocialClick(e){return(0,T.Z)(function*(){if(!x.b.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(o=>o===u.R.state.activeChain)){const o=u.R.getFirstCaipNetworkSupportsAuthConnector();if(o)return void f.RouterController.push("SwitchNetwork",{network:o})}e&&(yield(0,mi.y0)(e))})()}handlePwaFrameLoad(){var e=this;return(0,T.Z)(function*(){if(v.j.isPWA()){e.isPwaLoading=!0;try{e.authConnector?.provider instanceof vi.S&&(yield e.authConnector.provider.init())}catch(i){gi.AlertController.open({shortMessage:"Error loading embedded wallet in PWA",longMessage:i.message},"error")}finally{e.isPwaLoading=!1}}})()}};Z.styles=xi,ae([(0,c.Cb)()],Z.prototype,"walletGuide",void 0),ae([(0,c.Cb)()],Z.prototype,"tabIdx",void 0),ae([(0,c.SB)()],Z.prototype,"connectors",void 0),ae([(0,c.SB)()],Z.prototype,"remoteFeatures",void 0),ae([(0,c.SB)()],Z.prototype,"authConnector",void 0),ae([(0,c.SB)()],Z.prototype,"isPwaLoading",void 0),Z=ae([(0,w.Mo)("w3m-social-login-widget")],Z);d(64356);const Ci=s.iv`
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
`;var st=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let Ae=class extends s.oi{constructor(){super(...arguments),this.walletGuide="get-started"}render(){return"explore"===this.walletGuide?s.dy`<wui-flex
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
        </wui-flex>`:s.dy`<wui-flex
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
            tabIdx=${(0,h.o)(this.tabIdx)}
          >
            Get started
          </wui-link>
        </wui-flex>`}onGetStarted(){f.RouterController.push("Create")}};Ae.styles=Ci,st([(0,c.Cb)()],Ae.prototype,"tabIdx",void 0),st([(0,c.Cb)()],Ae.prototype,"walletGuide",void 0),Ae=st([(0,w.Mo)("w3m-wallet-guide")],Ae);d(47093),d(88368);var Tt=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let lt=class extends s.oi{constructor(){super(...arguments),this.tabIdx=void 0}render(){return s.dy`
      <wui-flex flexDirection="column" gap="xs">
        <w3m-connector-list tabIdx=${(0,h.o)(this.tabIdx)}></w3m-connector-list>
        <w3m-all-wallets-widget tabIdx=${(0,h.o)(this.tabIdx)}></w3m-all-wallets-widget>
      </wui-flex>
    `}};Tt([(0,c.Cb)()],lt.prototype,"tabIdx",void 0),lt=Tt([(0,w.Mo)("w3m-wallet-login-list")],lt);var It=d(92796);const yi=s.iv`
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
`;var j=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let R=class extends s.oi{constructor(){super(),this.unsubscribe=[],this.connectors=m.ConnectorController.state.connectors,this.authConnector=this.connectors.find(e=>"AUTH"===e.type),this.features=g.OptionsController.state.features,this.remoteFeatures=g.OptionsController.state.remoteFeatures,this.enableWallets=g.OptionsController.state.enableWallets,this.noAdapters=u.R.state.noAdapters,this.walletGuide="get-started",this.checked=Le.M.state.isLegalCheckboxChecked,this.isEmailEnabled=this.remoteFeatures?.email&&!u.R.state.noAdapters,this.isSocialEnabled=this.remoteFeatures?.socials&&this.remoteFeatures.socials.length>0&&!u.R.state.noAdapters,this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors),this.unsubscribe.push(m.ConnectorController.subscribeKey("connectors",e=>{this.connectors=e,this.authConnector=this.connectors.find(i=>"AUTH"===i.type),this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors)}),g.OptionsController.subscribeKey("features",e=>{this.features=e}),g.OptionsController.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e,this.setEmailAndSocialEnableCheck(this.noAdapters,this.remoteFeatures)}),g.OptionsController.subscribeKey("enableWallets",e=>this.enableWallets=e),u.R.subscribeKey("noAdapters",e=>this.setEmailAndSocialEnableCheck(e,this.remoteFeatures)),Le.M.subscribeKey("isLegalCheckboxChecked",e=>this.checked=e))}disconnectedCallback(){this.unsubscribe.forEach(i=>i()),this.resizeObserver?.disconnect(),this.shadowRoot?.querySelector(".connect")?.removeEventListener("scroll",this.handleConnectListScroll.bind(this))}firstUpdated(){const e=this.shadowRoot?.querySelector(".connect");e&&(requestAnimationFrame(this.handleConnectListScroll.bind(this)),e?.addEventListener("scroll",this.handleConnectListScroll.bind(this)),this.resizeObserver=new ResizeObserver(()=>{this.handleConnectListScroll()}),this.resizeObserver?.observe(e),this.handleConnectListScroll())}render(){const{termsConditionsUrl:e,privacyPolicyUrl:i}=g.OptionsController.state,o=g.OptionsController.state.features?.legalCheckbox,r=!(!e&&!i||!o||"get-started"!==this.walletGuide||this.checked),l={connect:!0,disabled:r},vt=g.OptionsController.state.enableWalletGuide,eo=this.enableWallets,to=this.isSocialEnabled||this.authConnector,io=r?-1:void 0;return s.dy`
      <wui-flex flexDirection="column">
        ${this.legalCheckboxTemplate()}
        <wui-flex
          data-testid="w3m-connect-scroll-view"
          flexDirection="column"
          class=${(0,At.$)(l)}
        >
          <wui-flex
            class="connect-methods"
            flexDirection="column"
            gap="s"
            .padding=${to&&eo&&vt&&"get-started"===this.walletGuide?["3xs","s","0","s"]:["3xs","s","s","s"]}
          >
            ${this.renderConnectMethod(io)}
          </wui-flex>
        </wui-flex>
        ${this.guideTemplate(r)}
        <w3m-legal-footer></w3m-legal-footer>
      </wui-flex>
    `}setEmailAndSocialEnableCheck(e,i){this.isEmailEnabled=i?.email&&!e,this.isSocialEnabled=i?.socials&&i.socials.length>0&&!e,this.remoteFeatures=i,this.noAdapters=e}checkIfAuthEnabled(e){const i=e.filter(n=>n.type===wi.b.CONNECTOR_TYPE_AUTH).map(n=>n.chain);return x.b.AUTH_CONNECTOR_SUPPORTED_CHAINS.some(n=>i.includes(n))}renderConnectMethod(e){const i=It.J.getConnectOrderMethod(this.features,this.connectors);return s.dy`${i.map((o,n)=>{switch(o){case"email":return s.dy`${this.emailTemplate(e)} ${this.separatorTemplate(n,"email")}`;case"social":return s.dy`${this.socialListTemplate(e)}
          ${this.separatorTemplate(n,"social")}`;case"wallet":return s.dy`${this.walletListTemplate(e)}
          ${this.separatorTemplate(n,"wallet")}`;default:return null}})}`}checkMethodEnabled(e){switch(e){case"wallet":return this.enableWallets;case"social":return this.isSocialEnabled&&this.isAuthEnabled;case"email":return this.isEmailEnabled&&this.isAuthEnabled;default:return null}}checkIsThereNextMethod(e){const o=It.J.getConnectOrderMethod(this.features,this.connectors)[e+1];return o?this.checkMethodEnabled(o)?o:this.checkIsThereNextMethod(e+1):void 0}separatorTemplate(e,i){const o=this.checkIsThereNextMethod(e),n="explore"===this.walletGuide;switch(i){case"wallet":return this.enableWallets&&o&&!n?s.dy`<wui-separator data-testid="wui-separator" text="or"></wui-separator>`:null;case"email":{const t="social"===o;return this.isAuthEnabled&&this.isEmailEnabled&&!t&&o?s.dy`<wui-separator
              data-testid="w3m-email-login-or-separator"
              text="or"
            ></wui-separator>`:null}case"social":{const t="email"===o;return this.isAuthEnabled&&this.isSocialEnabled&&!t&&o?s.dy`<wui-separator data-testid="wui-separator" text="or"></wui-separator>`:null}default:return null}}emailTemplate(e){return this.isEmailEnabled&&this.isAuthEnabled?s.dy`<w3m-email-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${(0,h.o)(e)}
    ></w3m-email-login-widget>`:null}socialListTemplate(e){return this.isSocialEnabled&&this.isAuthEnabled?s.dy`<w3m-social-login-widget
      walletGuide=${this.walletGuide}
      tabIdx=${(0,h.o)(e)}
    ></w3m-social-login-widget>`:null}walletListTemplate(e){const i=this.enableWallets,o=!1===this.features?.emailShowWallets,n=this.features?.collapseWallets,t=o||n;return i&&(v.j.isTelegram()&&(v.j.isSafari()||v.j.isIos())&&Q.ConnectionController.connectWalletConnect().catch(l=>({})),"explore"!==this.walletGuide)?this.isAuthEnabled&&(this.isEmailEnabled||this.isSocialEnabled)&&t?s.dy`<wui-list-button
        data-testid="w3m-collapse-wallets-button"
        tabIdx=${(0,h.o)(e)}
        @click=${this.onContinueWalletClick.bind(this)}
        text="Continue with a wallet"
      ></wui-list-button>`:s.dy`<w3m-wallet-login-list tabIdx=${(0,h.o)(e)}></w3m-wallet-login-list>`:null}guideTemplate(e=!1){if(!g.OptionsController.state.enableWalletGuide)return null;const o={guide:!0,disabled:e},n=e?-1:void 0;return this.authConnector||this.isSocialEnabled?s.dy`
      ${"explore"!==this.walletGuide||u.R.state.noAdapters?null:s.dy`<wui-separator data-testid="wui-separator" id="explore" text="or"></wui-separator>`}
      <w3m-wallet-guide
        class=${(0,At.$)(o)}
        tabIdx=${(0,h.o)(n)}
        walletGuide=${this.walletGuide}
      ></w3m-wallet-guide>
    `:null}legalCheckboxTemplate(){return"explore"===this.walletGuide?null:s.dy`<w3m-legal-checkbox data-testid="w3m-legal-checkbox"></w3m-legal-checkbox>`}handleConnectListScroll(){const e=this.shadowRoot?.querySelector(".connect");e&&(e.scrollHeight>470?(e.style.setProperty("--connect-mask-image","linear-gradient(\n          to bottom,\n          rgba(0, 0, 0, calc(1 - var(--connect-scroll--top-opacity))) 0px,\n          rgba(200, 200, 200, calc(1 - var(--connect-scroll--top-opacity))) 1px,\n          black 40px,\n          black calc(100% - 40px),\n          rgba(155, 155, 155, calc(1 - var(--connect-scroll--bottom-opacity))) calc(100% - 1px),\n          rgba(0, 0, 0, calc(1 - var(--connect-scroll--bottom-opacity))) 100%\n        )"),e.style.setProperty("--connect-scroll--top-opacity",w.kj.interpolate([0,50],[0,1],e.scrollTop).toString()),e.style.setProperty("--connect-scroll--bottom-opacity",w.kj.interpolate([0,50],[0,1],e.scrollHeight-e.scrollTop-e.offsetHeight).toString())):(e.style.setProperty("--connect-mask-image","none"),e.style.setProperty("--connect-scroll--top-opacity","0"),e.style.setProperty("--connect-scroll--bottom-opacity","0")))}onContinueWalletClick(){f.RouterController.push("ConnectWallets")}};R.styles=yi,j([(0,H.S)()],R.prototype,"connectors",void 0),j([(0,H.S)()],R.prototype,"authConnector",void 0),j([(0,H.S)()],R.prototype,"features",void 0),j([(0,H.S)()],R.prototype,"remoteFeatures",void 0),j([(0,H.S)()],R.prototype,"enableWallets",void 0),j([(0,H.S)()],R.prototype,"noAdapters",void 0),j([(0,c.Cb)()],R.prototype,"walletGuide",void 0),j([(0,H.S)()],R.prototype,"checked",void 0),j([(0,H.S)()],R.prototype,"isEmailEnabled",void 0),j([(0,H.S)()],R.prototype,"isSocialEnabled",void 0),j([(0,H.S)()],R.prototype,"isAuthEnabled",void 0),R=j([(0,w.Mo)("w3m-connect-view")],R);var ki=d(34633);let ct=class extends ki.N{constructor(){if(super(),this.externalViewUnsubscribe=[],!this.connector)throw new Error("w3m-connecting-view: No connector provided");y.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.connector.name??"Unknown",platform:"browser"}}),this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),this.isWalletConnect=!1,this.externalViewUnsubscribe.push(u.R.subscribeKey("activeCaipAddress",e=>{e&&S.I.close()}))}disconnectedCallback(){this.externalViewUnsubscribe.forEach(e=>e())}onConnectProxy(){var e=this;return(0,T.Z)(function*(){try{e.error=!1,e.connector&&(e.connector.id!==x.b.CONNECTOR_ID.COINBASE_SDK||!e.error)&&(yield Q.ConnectionController.connectExternal(e.connector,e.connector.chain),y.X.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:e.connector.name||"Unknown"}}))}catch(i){y.X.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:i?.message??"Unknown"}}),e.error=!0}})()}};ct=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t}([(0,w.Mo)("w3m-connecting-external-view")],ct);d(67552),d(88078);const $i=s.iv`
  wui-flex,
  wui-list-wallet {
    width: 100%;
  }
`;var Et=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let $e=class extends s.oi{constructor(){super(),this.unsubscribe=[],this.activeConnector=m.ConnectorController.state.activeConnector,this.unsubscribe.push(m.ConnectorController.subscribeKey("activeConnector",e=>this.activeConnector=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return s.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["m","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image
            size="lg"
            imageSrc=${(0,h.o)(C.f.getConnectorImage(this.activeConnector))}
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
    `}networksTemplate(){return this.activeConnector?.connectors?.map(e=>e.name?s.dy`
            <wui-list-wallet
              imageSrc=${(0,h.o)(C.f.getChainImage(e.chain))}
              name=${x.b.CHAIN_NAME_MAP[e.chain]}
              @click=${()=>this.onConnector(e)}
              data-testid="wui-list-chain-${e.chain}"
            ></wui-list-wallet>
          `:null)}onConnector(e){const i=this.activeConnector?.connectors?.find(o=>o.chain===e.chain);i?"walletConnect"===i.id?v.j.isMobile()?f.RouterController.push("AllWallets"):f.RouterController.push("ConnectingWalletConnect"):f.RouterController.push("ConnectingExternal",{connector:i}):M.SnackController.showError("Failed to find connector")}};$e.styles=$i,Et([(0,c.SB)()],$e.prototype,"activeConnector",void 0),$e=Et([(0,w.Mo)("w3m-connecting-multi-chain-view")],$e);var Ni=d(87706),Ri=d(55136),Ti=d(17170);const Ii=s.iv`
  .continue-button-container {
    width: 100%;
  }
`;var Ot=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let Ne=class extends s.oi{constructor(){super(...arguments),this.loading=!1}render(){return s.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="xxl"
        .padding=${["0","0","l","0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${()=>{v.j.openHref(Ti.U.URLS.FAQ,"_blank")}}
        >
          Learn more about names
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `}onboardingTemplate(){return s.dy` <wui-flex
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
    </wui-flex>`}buttonsTemplate(){return s.dy`<wui-flex
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
    </wui-flex>`}handleContinue(){const e=u.R.state.activeChain;f.RouterController.push("RegisterAccountName"),y.X.sendEvent({type:"track",event:"OPEN_ENS_FLOW",properties:{isSmartAccount:p.AccountController.state.preferredAccountTypes?.[e]===E.y_.ACCOUNT_TYPES.SMART_ACCOUNT}})}};Ne.styles=Ii,Ot([(0,c.SB)()],Ne.prototype,"loading",void 0),Ne=Ot([(0,w.Mo)("w3m-choose-account-name-view")],Ne);var Ei=d(91986),Oi=d(87563);let ut=class extends s.oi{render(){return s.dy`
      <wui-flex flexDirection="column" .padding=${["0","s","s","s"]} gap="xs">
        ${this.recommendedWalletsTemplate()}
        <wui-list-wallet
          name="Explore all"
          showAllWallets
          walletIcon="allWallets"
          icon="externalLink"
          @click=${()=>{v.j.openHref("https://walletconnect.com/explorer?type=wallet","_blank")}}
        ></wui-list-wallet>
      </wui-flex>
    `}recommendedWalletsTemplate(){const{recommended:e,featured:i}=Oi.ApiController.state,{customWallets:o}=g.OptionsController.state;return[...i,...o??[],...e].slice(0,4).map(t=>s.dy`
        <wui-list-wallet
          name=${t.name??"Unknown"}
          tagVariant="main"
          imageSrc=${(0,h.o)(C.f.getWalletImage(t))}
          @click=${()=>{v.j.openHref(t.homepage??"https://walletconnect.com/explorer","_blank")}}
        ></wui-list-wallet>
      `)}};ut=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t}([(0,w.Mo)("w3m-get-wallet-view")],ut);d(23753);var Wt=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let dt=class extends s.oi{constructor(){super(...arguments),this.data=[]}render(){return s.dy`
      <wui-flex flexDirection="column" alignItems="center" gap="l">
        ${this.data.map(e=>s.dy`
            <wui-flex flexDirection="column" alignItems="center" gap="xl">
              <wui-flex flexDirection="row" justifyContent="center" gap="1xs">
                ${e.images.map(i=>s.dy`<wui-visual name=${i}></wui-visual>`)}
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
    `}};Wt([(0,c.Cb)({type:Array})],dt.prototype,"data",void 0),dt=Wt([(0,w.Mo)("w3m-help-widget")],dt);const Pi=[{images:["login","profile","lock"],title:"One login for all of web3",text:"Log in to any app by connecting your wallet. Say goodbye to countless passwords!"},{images:["defi","nft","eth"],title:"A home for your digital assets",text:"A wallet lets you store, send and receive digital assets like cryptocurrencies and NFTs."},{images:["browser","noun","dao"],title:"Your gateway to a new web",text:"With your wallet, you can explore and interact with DeFi, NFTs, DAOs, and much more."}];let pt=class extends s.oi{render(){return s.dy`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","xl","xl","xl"]}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${Pi}></w3m-help-widget>
        <wui-button variant="main" size="md" @click=${this.onGetWallet.bind(this)}>
          <wui-icon color="inherit" slot="iconLeft" name="wallet"></wui-icon>
          Get a wallet
        </wui-button>
      </wui-flex>
    `}onGetWallet(){y.X.sendEvent({type:"track",event:"CLICK_GET_WALLET"}),f.RouterController.push("GetWallet")}};pt=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t}([(0,w.Mo)("w3m-what-is-a-wallet-view")],pt);const ji=s.iv`
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
`;var Bt=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let Re=class extends s.oi{constructor(){super(),this.unsubscribe=[],this.checked=Le.M.state.isLegalCheckboxChecked,this.unsubscribe.push(Le.M.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{termsConditionsUrl:e,privacyPolicyUrl:i}=g.OptionsController.state,o=g.OptionsController.state.features?.legalCheckbox,t=!(!e&&!i||!o),r=t&&!this.checked,l=r?-1:void 0;return s.dy`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${t?["0","s","s","s"]:"s"}
        gap="xs"
        class=${(0,h.o)(r?"disabled":void 0)}
      >
        <w3m-wallet-login-list tabIdx=${(0,h.o)(l)}></w3m-wallet-login-list>
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}};Re.styles=ji,Bt([(0,c.SB)()],Re.prototype,"checked",void 0),Re=Bt([(0,w.Mo)("w3m-connect-wallets-view")],Re);const Di=s.iv`
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
`;let ht=class extends s.oi{render(){return s.dy`
      <svg viewBox="0 0 54 59">
        <path
          id="wui-loader-path"
          d="M17.22 5.295c3.877-2.277 5.737-3.363 7.72-3.726a11.44 11.44 0 0 1 4.12 0c1.983.363 3.844 1.45 7.72 3.726l6.065 3.562c3.876 2.276 5.731 3.372 7.032 4.938a11.896 11.896 0 0 1 2.06 3.63c.683 1.928.688 4.11.688 8.663v7.124c0 4.553-.005 6.735-.688 8.664a11.896 11.896 0 0 1-2.06 3.63c-1.3 1.565-3.156 2.66-7.032 4.937l-6.065 3.563c-3.877 2.276-5.737 3.362-7.72 3.725a11.46 11.46 0 0 1-4.12 0c-1.983-.363-3.844-1.449-7.72-3.726l-6.065-3.562c-3.876-2.276-5.731-3.372-7.032-4.938a11.885 11.885 0 0 1-2.06-3.63c-.682-1.928-.688-4.11-.688-8.663v-7.124c0-4.553.006-6.735.688-8.664a11.885 11.885 0 0 1 2.06-3.63c1.3-1.565 3.156-2.66 7.032-4.937l6.065-3.562Z"
        />
        <use xlink:href="#wui-loader-path"></use>
      </svg>
    `}};ht.styles=[b.ET,Di],ht=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t}([(0,k.M)("wui-loading-hexagon")],ht);d(32714);const Mi=s.iv`
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
`;var wt=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let me=class extends s.oi{constructor(){super(),this.network=f.RouterController.state.data?.network,this.unsubscribe=[],this.showRetry=!1,this.error=!1}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}firstUpdated(){this.onSwitchNetwork()}render(){if(!this.network)throw new Error("w3m-network-switch-view: No network provided");this.onShowRetry();const e=this.getLabel(),i=this.getSubLabel();return s.dy`
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
            imageSrc=${(0,h.o)(C.f.getNetworkImage(this.network))}
          ></wui-network-image>

          ${this.error?null:s.dy`<wui-loading-hexagon></wui-loading-hexagon>`}

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
          <wui-text align="center" variant="small-500" color="fg-200">${i}</wui-text>
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
    `}getSubLabel(){const e=u.R.state.activeChain,i=m.ConnectorController.getConnectorId(e);return m.ConnectorController.getAuthConnector()&&i===x.b.CONNECTOR_ID.AUTH?"":this.error?"Switch can be declined if chain is not supported by a wallet or previous request is still active":"Accept connection request in your wallet"}getLabel(){const e=u.R.state.activeChain,i=m.ConnectorController.getConnectorId(e);return m.ConnectorController.getAuthConnector()&&i===x.b.CONNECTOR_ID.AUTH?`Switching to ${this.network?.name??"Unknown"} network...`:this.error?"Switch declined":"Approve in wallet"}onShowRetry(){this.error&&!this.showRetry&&(this.showRetry=!0,this.shadowRoot?.querySelector("wui-button")?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"}))}onSwitchNetwork(){try{this.error=!1,u.R.state.activeChain!==this.network?.chainNamespace&&u.R.setIsSwitchingNamespace(!0),this.network&&u.R.switchActiveNetwork(this.network)}catch{this.error=!0}}};me.styles=Mi,wt([(0,c.SB)()],me.prototype,"showRetry",void 0),wt([(0,c.SB)()],me.prototype,"error",void 0),me=wt([(0,w.Mo)("w3m-network-switch-view")],me);var Li=d(43314);d(44448),d(7890);const Vi=s.iv`
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
`;var be=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let te=class extends s.oi{constructor(){super(...arguments),this.imageSrc="",this.name="",this.disabled=!1,this.selected=!1,this.transparent=!1}render(){return s.dy`
      <button data-transparent=${this.transparent} ?disabled=${this.disabled}>
        <wui-flex gap="s" alignItems="center">
          ${this.templateNetworkImage()}
          <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text></wui-flex
        >
        ${this.checkmarkTemplate()}
      </button>
    `}checkmarkTemplate(){return this.selected?s.dy`<wui-icon size="sm" color="accent-100" name="checkmarkBold"></wui-icon>`:null}templateNetworkImage(){return this.imageSrc?s.dy`<wui-image size="sm" src=${this.imageSrc} name=${this.name}></wui-image>`:this.imageSrc?null:s.dy`<wui-network-image
        ?round=${!0}
        size="md"
        name=${this.name}
      ></wui-network-image>`}};te.styles=[b.ET,b.ZM,Vi],be([(0,c.Cb)()],te.prototype,"imageSrc",void 0),be([(0,c.Cb)()],te.prototype,"name",void 0),be([(0,c.Cb)({type:Boolean})],te.prototype,"disabled",void 0),be([(0,c.Cb)({type:Boolean})],te.prototype,"selected",void 0),be([(0,c.Cb)({type:Boolean})],te.prototype,"transparent",void 0),te=be([(0,k.M)("wui-list-network")],te);const zi=s.iv`
  .container {
    max-height: 360px;
    overflow: auto;
  }

  .container::-webkit-scrollbar {
    display: none;
  }
`;var Te=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let ie=class extends s.oi{constructor(){super(),this.unsubscribe=[],this.network=u.R.state.activeCaipNetwork,this.requestedCaipNetworks=u.R.getCaipNetworks(),this.search="",this.onDebouncedSearch=v.j.debounce(e=>{this.search=e},100),this.unsubscribe.push(se.W.subscribeNetworkImages(()=>this.requestUpdate()),u.R.subscribeKey("activeCaipNetwork",e=>this.network=e),u.R.subscribe(()=>{this.requestedCaipNetworks=u.R.getAllRequestedCaipNetworks()}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return s.dy`
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
    `}templateSearchInput(){return s.dy`
      <wui-flex gap="xs" .padding=${["0","s","s","s"]}>
        <wui-input-text
          @inputChange=${this.onInputChange.bind(this)}
          class="network-search-input"
          size="md"
          placeholder="Search network"
          icon="search"
        ></wui-input-text>
      </wui-flex>
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onNetworkHelp(){y.X.sendEvent({type:"track",event:"CLICK_NETWORK_HELP"}),f.RouterController.push("WhatIsANetwork")}networksTemplate(){const e=u.R.getAllApprovedCaipNetworkIds(),i=v.j.sortRequestedNetworks(e,this.requestedCaipNetworks);return this.search?this.filteredNetworks=i?.filter(o=>o?.name?.toLowerCase().includes(this.search.toLowerCase())):this.filteredNetworks=i,this.filteredNetworks?.map(o=>s.dy`
        <wui-list-network
          .selected=${this.network?.id===o.id}
          imageSrc=${(0,h.o)(C.f.getNetworkImage(o))}
          type="network"
          name=${o.name??o.id}
          @click=${()=>this.onSwitchNetwork(o)}
          .disabled=${this.getNetworkDisabled(o)}
          data-testid=${`w3m-network-switch-${o.name??o.id}`}
        ></wui-list-network>
      `)}getNetworkDisabled(e){const i=e.chainNamespace,o=p.AccountController.getCaipAddress(i),n=u.R.getAllApprovedCaipNetworkIds(),t=!1!==u.R.getNetworkProp("supportsAllNetworks",i),r=m.ConnectorController.getConnectorId(i),l=m.ConnectorController.getAuthConnector(),vt=r===x.b.CONNECTOR_ID.AUTH&&l;return!(!o||t||vt)&&!n?.includes(e.caipNetworkId)}onSwitchNetwork(e){Li.p.onSwitchNetwork({network:e})}};ie.styles=zi,Te([(0,c.SB)()],ie.prototype,"network",void 0),Te([(0,c.SB)()],ie.prototype,"requestedCaipNetworks",void 0),Te([(0,c.SB)()],ie.prototype,"filteredNetworks",void 0),Te([(0,c.SB)()],ie.prototype,"search",void 0),ie=Te([(0,w.Mo)("w3m-networks-view")],ie);const Fi=s.iv`
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
`;var _t=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};const Hi={eip155:"eth",solana:"solana",bip122:"bitcoin",polkadot:void 0};let Ie=class extends s.oi{constructor(){super(...arguments),this.unsubscribe=[],this.switchToChain=f.RouterController.state.data?.switchToChain,this.caipNetwork=f.RouterController.state.data?.network,this.activeChain=u.R.state.activeChain}firstUpdated(){this.unsubscribe.push(u.R.subscribeKey("activeChain",e=>this.activeChain=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.switchToChain?x.b.CHAIN_NAME_MAP[this.switchToChain]:"supported";if(!this.switchToChain)return null;const i=x.b.CHAIN_NAME_MAP[this.switchToChain];return s.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" flexDirection="column" alignItems="center" gap="xl">
          <wui-visual name=${(0,h.o)(Hi[this.switchToChain])}></wui-visual>
          <wui-text
            data-testid=${`w3m-switch-active-chain-to-${i}`}
            variant="paragraph-500"
            color="fg-100"
            align="center"
            >Switch to <span class="capitalize">${i}</span></wui-text
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
    `}switchActiveChain(){var e=this;return(0,T.Z)(function*(){e.switchToChain&&(u.R.setIsSwitchingNamespace(!0),m.ConnectorController.setFilterByNamespace(e.switchToChain),e.caipNetwork?yield u.R.switchActiveNetwork(e.caipNetwork):u.R.setActiveNamespace(e.switchToChain),f.RouterController.reset("Connect"))})()}};Ie.styles=Fi,_t([(0,c.Cb)()],Ie.prototype,"activeChain",void 0),Ie=_t([(0,w.Mo)("w3m-switch-active-chain-view")],Ie);const Gi=[{images:["network","layers","system"],title:"The system\u2019s nuts and bolts",text:"A network is what brings the blockchain to life, as this technical infrastructure allows apps to access the ledger and smart contract services."},{images:["noun","defiAlt","dao"],title:"Designed for different uses",text:"Each network is designed differently, and may therefore suit certain apps and experiences."}];let ft=class extends s.oi{render(){return s.dy`
      <wui-flex
        flexDirection="column"
        .padding=${["xxl","xl","xl","xl"]}
        alignItems="center"
        gap="xl"
      >
        <w3m-help-widget .data=${Gi}></w3m-help-widget>
        <wui-button
          variant="main"
          size="md"
          @click=${()=>{v.j.openHref("https://ethereum.org/en/developers/docs/networks/","_blank")}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-button>
      </wui-flex>
    `}};ft=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t}([(0,w.Mo)("w3m-what-is-a-network-view")],ft);const Xi=s.iv`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`;var Pt=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let Ee=class extends s.oi{constructor(){super(),this.swapUnsupportedChain=f.RouterController.state.data?.swapUnsupportedChain,this.unsubscribe=[],this.disconecting=!1,this.unsubscribe.push(se.W.subscribeNetworkImages(()=>this.requestUpdate()))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return s.dy`
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
            .loading=${this.disconecting}
            @click=${this.onDisconnect.bind(this)}
            data-testid="disconnect-button"
          >
            <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
          </wui-list-item>
        </wui-flex>
      </wui-flex>
    `}descriptionTemplate(){return this.swapUnsupportedChain?s.dy`
        <wui-text variant="small-400" color="fg-200" align="center">
          The swap feature doesn’t support your current network. Switch to an available option to
          continue.
        </wui-text>
      `:s.dy`
      <wui-text variant="small-400" color="fg-200" align="center">
        This app doesn’t support your current network. Switch to an available option to continue.
      </wui-text>
    `}networksTemplate(){const e=u.R.getAllRequestedCaipNetworks(),i=u.R.getAllApprovedCaipNetworkIds(),o=v.j.sortRequestedNetworks(i,e);return(this.swapUnsupportedChain?o.filter(t=>_.bq.SWAP_SUPPORTED_NETWORKS.includes(t.caipNetworkId)):o).map(t=>s.dy`
        <wui-list-network
          imageSrc=${(0,h.o)(C.f.getNetworkImage(t))}
          name=${t.name??"Unknown"}
          @click=${()=>this.onSwitchNetwork(t)}
        >
        </wui-list-network>
      `)}onDisconnect(){var e=this;return(0,T.Z)(function*(){try{e.disconecting=!0,yield Q.ConnectionController.disconnect(),S.I.close()}catch{y.X.sendEvent({type:"track",event:"DISCONNECT_ERROR"}),M.SnackController.showError("Failed to disconnect")}finally{e.disconecting=!1}})()}onSwitchNetwork(e){return(0,T.Z)(function*(){const i=p.AccountController.state.caipAddress,o=u.R.getAllApprovedCaipNetworkIds(),t=(u.R.getNetworkProp("supportsAllNetworks",e.chainNamespace),f.RouterController.state.data);i?o?.includes(e.caipNetworkId)?yield u.R.switchActiveNetwork(e):f.RouterController.push("SwitchNetwork",{...t,network:e}):i||(u.R.setActiveCaipNetwork(e),f.RouterController.push("Connect"))})()}};Ee.styles=Xi,Pt([(0,c.SB)()],Ee.prototype,"disconecting",void 0),Ee=Pt([(0,w.Mo)("w3m-unsupported-chain-view")],Ee);const Zi=s.iv`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-s);
    padding: var(--wui-spacing-1xs) var(--wui-spacing-s) var(--wui-spacing-1xs)
      var(--wui-spacing-1xs);
  }
`;var gt=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let Oe=class extends s.oi{constructor(){super(...arguments),this.icon="externalLink",this.text=""}render(){return s.dy`
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
    `}};Oe.styles=[b.ET,b.ZM,Zi],gt([(0,c.Cb)()],Oe.prototype,"icon",void 0),gt([(0,c.Cb)()],Oe.prototype,"text",void 0),Oe=gt([(0,k.M)("wui-banner")],Oe);const Yi=s.iv`
  :host > wui-flex {
    max-height: clamp(360px, 540px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
  }

  :host > wui-flex::-webkit-scrollbar {
    display: none;
  }
`;var jt=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let We=class extends s.oi{constructor(){super(),this.unsubscribe=[],this.preferredAccountTypes=p.AccountController.state.preferredAccountTypes,this.unsubscribe.push(p.AccountController.subscribeKey("preferredAccountTypes",e=>{this.preferredAccountTypes=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return s.dy` <wui-flex
      flexDirection="column"
      .padding=${["xs","s","m","s"]}
      gap="xs"
    >
      <wui-banner
        icon="warningCircle"
        text="You can only receive assets on these networks"
      ></wui-banner>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){const e=u.R.getAllRequestedCaipNetworks(),i=u.R.getAllApprovedCaipNetworkIds(),o=u.R.state.activeCaipNetwork,n=u.R.checkIfSmartAccountEnabled();let t=v.j.sortRequestedNetworks(i,e);if(n&&this.preferredAccountTypes?.[o?.chainNamespace]===E.y_.ACCOUNT_TYPES.SMART_ACCOUNT){if(!o)return null;t=[o]}return t.filter(l=>l.chainNamespace===o?.chainNamespace).map(l=>s.dy`
        <wui-list-network
          imageSrc=${(0,h.o)(C.f.getNetworkImage(l))}
          name=${l.name??"Unknown"}
          ?transparent=${!0}
        >
        </wui-list-network>
      `)}};We.styles=Yi,jt([(0,c.SB)()],We.prototype,"preferredAccountTypes",void 0),We=jt([(0,w.Mo)("w3m-wallet-compatible-networks-view")],We);var Dt=d(30422);const Ji=s.iv`
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
`;var Fe=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let ve=class extends s.oi{render(){return this.style.cssText=`--local-border-radius: ${this.borderRadiusFull?"1000px":"20px"}; background-color: var(--wui-color-modal-bg);`,s.dy`${this.templateVisual()}`}templateVisual(){return this.imageSrc?s.dy`<wui-image src=${this.imageSrc} alt=${this.alt??""}></wui-image>`:s.dy`<wui-icon
      data-parent-size="md"
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};ve.styles=[b.ET,Ji],Fe([(0,c.Cb)()],ve.prototype,"imageSrc",void 0),Fe([(0,c.Cb)()],ve.prototype,"alt",void 0),Fe([(0,c.Cb)({type:Boolean})],ve.prototype,"borderRadiusFull",void 0),ve=Fe([(0,k.M)("wui-visual-thumbnail")],ve);const Qi=s.iv`
  :host {
    display: flex;
    justify-content: center;
    gap: var(--wui-spacing-2xl);
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`;let mt=class extends s.oi{constructor(){super(...arguments),this.dappImageUrl=g.OptionsController.state.metadata?.icons,this.walletImageUrl=p.AccountController.state.connectedWalletInfo?.icon}firstUpdated(){const e=this.shadowRoot?.querySelectorAll("wui-visual-thumbnail");e?.[0]&&this.createAnimation(e[0],"translate(18px)"),e?.[1]&&this.createAnimation(e[1],"translate(-18px)")}render(){return s.dy`
      <wui-visual-thumbnail
        ?borderRadiusFull=${!0}
        .imageSrc=${this.dappImageUrl?.[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `}createAnimation(e,i){e.animate([{transform:"translateX(0px)"},{transform:i}],{duration:1600,easing:"cubic-bezier(0.56, 0, 0.48, 1)",direction:"alternate",iterations:1/0})}};mt.styles=Qi,mt=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t}([(0,w.Mo)("w3m-siwx-sign-message-thumbnails")],mt);var bt=function(a,e,i,o){var r,n=arguments.length,t=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(a,e,i,o);else for(var l=a.length-1;l>=0;l--)(r=a[l])&&(t=(n<3?r(t):n>3?r(e,i,t):r(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let Be=class extends s.oi{constructor(){super(...arguments),this.dappName=g.OptionsController.state.metadata?.name,this.isCancelling=!1,this.isSigning=!1}render(){return s.dy`
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
    `}onSign(){var e=this;return(0,T.Z)(function*(){e.isSigning=!0,yield Dt.w.requestSignMessage().finally(()=>e.isSigning=!1)})()}onCancel(){var e=this;return(0,T.Z)(function*(){e.isCancelling=!0,yield Dt.w.cancelSignMessage().finally(()=>e.isCancelling=!1)})()}};bt([(0,c.SB)()],Be.prototype,"isCancelling",void 0),bt([(0,c.SB)()],Be.prototype,"isSigning",void 0),Be=bt([(0,w.Mo)("w3m-siwx-sign-message-view")],Be)}}]);