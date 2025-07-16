"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[4817],{75129:(z,$,r)=>{r.r($),r.d($,{AppKitModal:()=>Z,W3mModal:()=>G,W3mModalBase:()=>T});var C=r(49671),n=r(59799),p=r(86523),k=r(23107),W=r(86450),y=r(66301),u=r(57745),d=r(20597),v=r(86424),w=r(87563),s=r(24380),b=r(30422);const m={isUnsupportedChainView:()=>"UnsupportedChain"===s.RouterController.state.view||"SwitchNetwork"===s.RouterController.state.view&&s.RouterController.state.history.includes("UnsupportedChain"),safeClose(){var c=this;return(0,C.Z)(function*(){c.isUnsupportedChainView()||(yield b.w.isSIWXCloseDisabled())?u.I.shake():u.I.close()})()}};var f=r(56364),g=r(76169),x=r(18445),R=r(50860),N=r(25518),j=r(70075);const oe=n.iv`
  :host {
    display: block;
    border-radius: clamp(0px, var(--wui-border-radius-l), 44px);
    box-shadow: 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-modal-bg);
    overflow: hidden;
  }

  :host([data-embedded='true']) {
    box-shadow:
      0 0 0 1px var(--wui-color-gray-glass-005),
      0px 4px 12px 4px var(--w3m-card-embedded-shadow-color);
  }
`;let H=class extends n.oi{render(){return n.dy`<slot></slot>`}};H.styles=[N.ET,oe],H=function(c,e,t,i){var l,a=arguments.length,o=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,t):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(c,e,t,i);else for(var h=c.length-1;h>=0;h--)(l=c[h])&&(o=(a<3?l(o):a>3?l(e,t,o):l(e,t))||o);return a>3&&o&&Object.defineProperty(e,t,o),o}([(0,j.M)("wui-card")],H);r(937);var M=r(13314);r(72686),r(10831),r(79348);const re=n.iv`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-dark-glass-100);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-325);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: var(--wui-border-radius-3xs);
    background-color: var(--local-icon-bg-value);
  }
`;var P=function(c,e,t,i){var l,a=arguments.length,o=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,t):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(c,e,t,i);else for(var h=c.length-1;h>=0;h--)(l=c[h])&&(o=(a<3?l(o):a>3?l(e,t,o):l(e,t))||o);return a>3&&o&&Object.defineProperty(e,t,o),o};let I=class extends n.oi{constructor(){super(...arguments),this.message="",this.backgroundColor="accent-100",this.iconColor="accent-100",this.icon="info"}render(){return this.style.cssText=`\n      --local-icon-bg-value: var(--wui-color-${this.backgroundColor});\n   `,n.dy`
      <wui-flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <wui-flex columnGap="xs" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color=${this.iconColor} size="md" name=${this.icon}></wui-icon>
          </wui-flex>
          <wui-text variant="small-500" color="bg-350" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="bg-350"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `}onClose(){M.AlertController.close()}};I.styles=[N.ET,re],P([(0,p.Cb)()],I.prototype,"message",void 0),P([(0,p.Cb)()],I.prototype,"backgroundColor",void 0),P([(0,p.Cb)()],I.prototype,"iconColor",void 0),P([(0,p.Cb)()],I.prototype,"icon",void 0),I=P([(0,j.M)("wui-alertbar")],I);const ne=n.iv`
  :host {
    display: block;
    position: absolute;
    top: var(--wui-spacing-s);
    left: var(--wui-spacing-l);
    right: var(--wui-spacing-l);
    opacity: 0;
    pointer-events: none;
  }
`;var F=function(c,e,t,i){var l,a=arguments.length,o=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,t):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(c,e,t,i);else for(var h=c.length-1;h>=0;h--)(l=c[h])&&(o=(a<3?l(o):a>3?l(e,t,o):l(e,t))||o);return a>3&&o&&Object.defineProperty(e,t,o),o};const ae={info:{backgroundColor:"fg-350",iconColor:"fg-325",icon:"info"},success:{backgroundColor:"success-glass-reown-020",iconColor:"success-125",icon:"checkmark"},warning:{backgroundColor:"warning-glass-reown-020",iconColor:"warning-100",icon:"warningCircle"},error:{backgroundColor:"error-glass-reown-020",iconColor:"error-125",icon:"exclamationTriangle"}};let U=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.open=M.AlertController.state.open,this.onOpen(!0),this.unsubscribe.push(M.AlertController.subscribeKey("open",e=>{this.open=e,this.onOpen(!1)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{message:e,variant:t}=M.AlertController.state,i=ae[t];return n.dy`
      <wui-alertbar
        message=${e}
        backgroundColor=${i?.backgroundColor}
        iconColor=${i?.iconColor}
        icon=${i?.icon}
      ></wui-alertbar>
    `}onOpen(e){this.open?(this.animate([{opacity:0,transform:"scale(0.85)"},{opacity:1,transform:"scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: auto"):e||(this.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: none")}};U.styles=ne,F([(0,p.SB)()],U.prototype,"open",void 0),U=F([(0,R.Mo)("w3m-alertbar")],U);var J=r(22917),V=r(17111),se=r(80152),Q=r(79282);r(11539),r(11252),r(87538);const le=n.iv`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: var(--wui-spacing-xxs);
    gap: var(--wui-spacing-xxs);
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xxs);
  }

  wui-image {
    border-radius: 100%;
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  wui-icon-box {
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }
`;var q=function(c,e,t,i){var l,a=arguments.length,o=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,t):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(c,e,t,i);else for(var h=c.length-1;h>=0;h--)(l=c[h])&&(o=(a<3?l(o):a>3?l(e,t,o):l(e,t))||o);return a>3&&o&&Object.defineProperty(e,t,o),o};let D=class extends n.oi{constructor(){super(...arguments),this.imageSrc=""}render(){return n.dy`<button>
      ${this.imageTemplate()}
      <wui-icon size="xs" color="fg-200" name="chevronBottom"></wui-icon>
    </button>`}imageTemplate(){return this.imageSrc?n.dy`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`:n.dy`<wui-icon-box
      size="xxs"
      iconColor="fg-200"
      backgroundColor="fg-100"
      background="opaque"
      icon="networkPlaceholder"
    ></wui-icon-box>`}};D.styles=[N.ET,N.ZM,N.Bp,le],q([(0,p.Cb)()],D.prototype,"imageSrc",void 0),D=q([(0,j.M)("wui-select")],D);r(39927),r(54575);var Y=r(37847);const ce=n.iv`
  :host {
    height: 64px;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards var(--wui-ease-out-power-2),
      slide-down-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards var(--wui-ease-out-power-2),
      slide-up-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-icon-link[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;var A=function(c,e,t,i){var l,a=arguments.length,o=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,t):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(c,e,t,i);else for(var h=c.length-1;h>=0;h--)(l=c[h])&&(o=(a<3?l(o):a>3?l(e,t,o):l(e,t))||o);return a>3&&o&&Object.defineProperty(e,t,o),o};const de=["SmartSessionList"];function X(){const c=s.RouterController.state.data?.connector?.name,e=s.RouterController.state.data?.wallet?.name,t=s.RouterController.state.data?.network?.name,i=e??c,a=v.ConnectorController.getConnectors();return{Connect:`Connect ${1===a.length&&"w3m-email"===a[0]?.id?"Email":""} Wallet`,Create:"Create Wallet",ChooseAccountName:void 0,Account:void 0,AccountSettings:void 0,AllWallets:"All Wallets",ApproveTransaction:"Approve Transaction",BuyInProgress:"Buy",ConnectingExternal:i??"Connect Wallet",ConnectingWalletConnect:i??"WalletConnect",ConnectingWalletConnectBasic:"WalletConnect",ConnectingSiwe:"Sign In",Convert:"Convert",ConvertSelectToken:"Select token",ConvertPreview:"Preview convert",Downloads:i?`Get ${i}`:"Downloads",EmailLogin:"Email Login",EmailVerifyOtp:"Confirm Email",EmailVerifyDevice:"Register Device",GetWallet:"Get a wallet",Networks:"Choose Network",OnRampProviders:"Choose Provider",OnRampActivity:"Activity",OnRampTokenSelect:"Select Token",OnRampFiatSelect:"Select Currency",Pay:"How you pay",Profile:void 0,SwitchNetwork:t??"Switch Network",SwitchAddress:"Switch Address",Transactions:"Activity",UnsupportedChain:"Switch Network",UpgradeEmailWallet:"Upgrade your Wallet",UpdateEmailWallet:"Edit Email",UpdateEmailPrimaryOtp:"Confirm Current Email",UpdateEmailSecondaryOtp:"Confirm New Email",WhatIsABuy:"What is Buy?",RegisterAccountName:"Choose name",RegisterAccountNameSuccess:"",WalletReceive:"Receive",WalletCompatibleNetworks:"Compatible Networks",Swap:"Swap",SwapSelectToken:"Select token",SwapPreview:"Preview swap",WalletSend:"Send",WalletSendPreview:"Review send",WalletSendSelectToken:"Select Token",WhatIsANetwork:"What is a network?",WhatIsAWallet:"What is a wallet?",ConnectWallets:"Connect wallet",ConnectSocials:"All socials",ConnectingSocial:J.AccountController.state.socialProvider?J.AccountController.state.socialProvider:"Connect Social",ConnectingMultiChain:"Select chain",ConnectingFarcaster:"Farcaster",SwitchActiveChain:"Switch chain",SmartSessionCreated:void 0,SmartSessionList:"Smart Sessions",SIWXSignMessage:"Sign In",PayLoading:"Payment in progress"}}let S=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.heading=X()[s.RouterController.state.view],this.network=d.R.state.activeCaipNetwork,this.networkImage=V.f.getNetworkImage(this.network),this.showBack=!1,this.prevHistoryLength=1,this.view=s.RouterController.state.view,this.viewDirection="",this.headerText=X()[s.RouterController.state.view],this.unsubscribe.push(se.W.subscribeNetworkImages(()=>{this.networkImage=V.f.getNetworkImage(this.network)}),s.RouterController.subscribeKey("view",e=>{setTimeout(()=>{this.view=e,this.headerText=X()[e]},Y.b.ANIMATION_DURATIONS.HeaderText),this.onViewChange(),this.onHistoryChange()}),d.R.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=V.f.getNetworkImage(this.network)}))}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){return n.dy`
      <wui-flex .padding=${this.getPadding()} justifyContent="space-between" alignItems="center">
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `}onWalletHelp(){Q.X.sendEvent({type:"track",event:"CLICK_WALLET_HELP"}),s.RouterController.push("WhatIsAWallet")}onClose(){return(0,C.Z)(function*(){yield m.safeClose()})()}rightHeaderTemplate(){const e=y.OptionsController?.state?.features?.smartSessions;return"Account"===s.RouterController.state.view&&e?n.dy`<wui-flex>
      <wui-icon-link
        icon="clock"
        @click=${()=>s.RouterController.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-link>
      ${this.closeButtonTemplate()}
    </wui-flex> `:this.closeButtonTemplate()}closeButtonTemplate(){return n.dy`
      <wui-icon-link
        icon="close"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-link>
    `}titleTemplate(){const e=de.includes(this.view);return n.dy`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="xs"
      >
        <wui-text variant="paragraph-700" color="fg-100" data-testid="w3m-header-text"
          >${this.headerText}</wui-text
        >
        ${e?n.dy`<wui-tag variant="main">Beta</wui-tag>`:null}
      </wui-flex>
    `}leftHeaderTemplate(){const{view:e}=s.RouterController.state,t="Connect"===e,i=y.OptionsController.state.enableEmbedded,a="ApproveTransaction"===e,o="ConnectingSiwe"===e,l="Account"===e,h=y.OptionsController.state.enableNetworkSwitch,te=a||o||t&&i;return l&&h?n.dy`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${(0,k.o)(this.network?.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${(0,k.o)(this.networkImage)}
      ></wui-select>`:this.showBack&&!te?n.dy`<wui-icon-link
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-link>`:n.dy`<wui-icon-link
      data-hidden=${!t}
      id="dynamic"
      icon="helpCircle"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-link>`}onNetworks(){this.isAllowedNetworkSwitch()&&(Q.X.sendEvent({type:"track",event:"CLICK_NETWORKS"}),s.RouterController.push("Networks"))}isAllowedNetworkSwitch(){const e=d.R.getAllRequestedCaipNetworks(),t=!!e&&e.length>1,i=e?.find(({id:a})=>a===this.network?.id);return t||!i}getPadding(){return this.heading?["l","2l","l","2l"]:["0","2l","0","2l"]}onViewChange(){const{history:e}=s.RouterController.state;let t=Y.b.VIEW_DIRECTION.Next;e.length<this.prevHistoryLength&&(t=Y.b.VIEW_DIRECTION.Prev),this.prevHistoryLength=e.length,this.viewDirection=t}onHistoryChange(){var e=this;return(0,C.Z)(function*(){const{history:t}=s.RouterController.state,i=e.shadowRoot?.querySelector("#dynamic");t.length>1&&!e.showBack&&i?(yield i.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,e.showBack=!0,i.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})):t.length<=1&&e.showBack&&i&&(yield i.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,e.showBack=!1,i.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))})()}onGoBack(){s.RouterController.goBack()}};S.styles=ce,A([(0,p.SB)()],S.prototype,"heading",void 0),A([(0,p.SB)()],S.prototype,"network",void 0),A([(0,p.SB)()],S.prototype,"networkImage",void 0),A([(0,p.SB)()],S.prototype,"showBack",void 0),A([(0,p.SB)()],S.prototype,"prevHistoryLength",void 0),A([(0,p.SB)()],S.prototype,"view",void 0),A([(0,p.SB)()],S.prototype,"viewDirection",void 0),A([(0,p.SB)()],S.prototype,"headerText",void 0),S=A([(0,R.Mo)("w3m-header")],S);r(78549);const ue=n.iv`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    align-items: center;
    padding: var(--wui-spacing-xs) var(--wui-spacing-m) var(--wui-spacing-xs) var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-005);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-175);
    box-shadow:
      0px 14px 64px -4px rgba(0, 0, 0, 0.15),
      0px 8px 22px -6px rgba(0, 0, 0, 0.15);

    max-width: 300px;
  }

  :host wui-loading-spinner {
    margin-left: var(--wui-spacing-3xs);
  }
`;var B=function(c,e,t,i){var l,a=arguments.length,o=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,t):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(c,e,t,i);else for(var h=c.length-1;h>=0;h--)(l=c[h])&&(o=(a<3?l(o):a>3?l(e,t,o):l(e,t))||o);return a>3&&o&&Object.defineProperty(e,t,o),o};let E=class extends n.oi{constructor(){super(...arguments),this.backgroundColor="accent-100",this.iconColor="accent-100",this.icon="checkmark",this.message="",this.loading=!1,this.iconType="default"}render(){return n.dy`
      ${this.templateIcon()}
      <wui-text variant="paragraph-500" color="fg-100" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `}templateIcon(){return this.loading?n.dy`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:"default"===this.iconType?n.dy`<wui-icon size="xl" color=${this.iconColor} name=${this.icon}></wui-icon>`:n.dy`<wui-icon-box
      size="sm"
      iconSize="xs"
      iconColor=${this.iconColor}
      backgroundColor=${this.backgroundColor}
      icon=${this.icon}
      background="opaque"
    ></wui-icon-box>`}};E.styles=[N.ET,ue],B([(0,p.Cb)()],E.prototype,"backgroundColor",void 0),B([(0,p.Cb)()],E.prototype,"iconColor",void 0),B([(0,p.Cb)()],E.prototype,"icon",void 0),B([(0,p.Cb)()],E.prototype,"message",void 0),B([(0,p.Cb)()],E.prototype,"loading",void 0),B([(0,p.Cb)()],E.prototype,"iconType",void 0),E=B([(0,j.M)("wui-snackbar")],E);const he=n.iv`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`;var _=function(c,e,t,i){var l,a=arguments.length,o=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,t):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(c,e,t,i);else for(var h=c.length-1;h>=0;h--)(l=c[h])&&(o=(a<3?l(o):a>3?l(e,t,o):l(e,t))||o);return a>3&&o&&Object.defineProperty(e,t,o),o};const pe={loading:void 0,success:{backgroundColor:"success-100",iconColor:"success-100",icon:"checkmark"},error:{backgroundColor:"error-100",iconColor:"error-100",icon:"close"}};let L=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.open=g.SnackController.state.open,this.unsubscribe.push(g.SnackController.subscribeKey("open",e=>{this.open=e,this.onOpen()}))}disconnectedCallback(){clearTimeout(this.timeout),this.unsubscribe.forEach(e=>e())}render(){const{message:e,variant:t,svg:i}=g.SnackController.state,a=pe[t],{icon:o,iconColor:l}=i??a??{};return n.dy`
      <wui-snackbar
        message=${e}
        backgroundColor=${a?.backgroundColor}
        iconColor=${l}
        icon=${o}
        .loading=${"loading"===t}
      ></wui-snackbar>
    `}onOpen(){clearTimeout(this.timeout),this.open?(this.animate([{opacity:0,transform:"translateX(-50%) scale(0.85)"},{opacity:1,transform:"translateX(-50%) scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.timeout&&clearTimeout(this.timeout),g.SnackController.state.autoClose&&(this.timeout=setTimeout(()=>g.SnackController.hide(),2500))):this.animate([{opacity:1,transform:"translateX(-50%) scale(1)"},{opacity:0,transform:"translateX(-50%) scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"})}};L.styles=he,_([(0,p.SB)()],L.prototype,"open",void 0),L=_([(0,R.Mo)("w3m-snackbar")],L);r(62700),r(48788);const we=n.iv`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  :host(.appkit-modal) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host(.appkit-modal) wui-card {
    max-width: 400px;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: var(--local-border-bottom-mobile-radius);
      border-bottom-right-radius: var(--local-border-bottom-mobile-radius);
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`;var O=function(c,e,t,i){var l,a=arguments.length,o=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,t):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(c,e,t,i);else for(var h=c.length-1;h>=0;h--)(l=c[h])&&(o=(a<3?l(o):a>3?l(e,t,o):l(e,t))||o);return a>3&&o&&Object.defineProperty(e,t,o),o};const ee="scroll-lock";class T extends n.oi{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.hasPrefetched=!1,this.enableEmbedded=y.OptionsController.state.enableEmbedded,this.open=u.I.state.open,this.caipAddress=d.R.state.activeCaipAddress,this.caipNetwork=d.R.state.activeCaipNetwork,this.shake=u.I.state.shake,this.filterByNamespace=v.ConnectorController.state.filterByNamespace,this.initializeTheming(),w.ApiController.prefetchAnalyticsConfig(),this.unsubscribe.push(u.I.subscribeKey("open",e=>e?this.onOpen():this.onClose()),u.I.subscribeKey("shake",e=>this.shake=e),d.R.subscribeKey("activeCaipNetwork",e=>this.onNewNetwork(e)),d.R.subscribeKey("activeCaipAddress",e=>this.onNewAddress(e)),y.OptionsController.subscribeKey("enableEmbedded",e=>this.enableEmbedded=e),v.ConnectorController.subscribeKey("filterByNamespace",e=>{this.filterByNamespace!==e&&!d.R.getAccountData(e)?.caipAddress&&(w.ApiController.fetchRecommendedWallets(),this.filterByNamespace=e)}))}firstUpdated(){if(this.caipAddress){if(this.enableEmbedded)return u.I.close(),void this.prefetch();this.onNewAddress(this.caipAddress)}this.open&&this.onOpen(),this.enableEmbedded&&this.prefetch()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return this.style.cssText=`\n      --local-border-bottom-mobile-radius: ${this.enableEmbedded?"clamp(0px, var(--wui-border-radius-l), 44px)":"0px"};\n    `,this.enableEmbedded?n.dy`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `:this.open?n.dy`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}contentTemplate(){return n.dy` <wui-card
      shake="${this.shake}"
      data-embedded="${(0,k.o)(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`}onOverlayClick(e){var t=this;return(0,C.Z)(function*(){e.target===e.currentTarget&&(yield t.handleClose())})()}handleClose(){return(0,C.Z)(function*(){yield m.safeClose()})()}initializeTheming(){const{themeVariables:e,themeMode:t}=f.ThemeController.state,i=R.Hg.getColorTheme(t);(0,R.n)(e,i)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),g.SnackController.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){const e=document.createElement("style");e.dataset.w3m=ee,e.textContent="\n      body {\n        touch-action: none;\n        overflow: hidden;\n        overscroll-behavior: contain;\n      }\n      w3m-modal {\n        pointer-events: auto;\n      }\n    ",document.head.appendChild(e)}onScrollUnlock(){const e=document.head.querySelector(`style[data-w3m="${ee}"]`);e&&e.remove()}onAddKeyboardListener(){this.abortController=new AbortController;const e=this.shadowRoot?.querySelector("wui-card");e?.focus(),window.addEventListener("keydown",t=>{if("Escape"===t.key)this.handleClose();else if("Tab"===t.key){const{tagName:i}=t.target;i&&!i.includes("W3M-")&&!i.includes("WUI-")&&e?.focus()}},this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}onNewAddress(e){var t=this;return(0,C.Z)(function*(){const i=d.R.state.isSwitchingNamespace,a=x.j.getPlainAddress(e);a||i?i&&a&&s.RouterController.goBack():u.I.close(),yield b.w.initializeIfEnabled(),t.caipAddress=e,d.R.setIsSwitchingNamespace(!1)})()}onNewNetwork(e){const t=this.caipNetwork,i=t?.caipNetworkId?.toString(),a=t?.chainNamespace,o=e?.caipNetworkId?.toString(),l=e?.chainNamespace,h=i!==o,me=h&&!(a!==l),fe=t?.name===W.b.UNSUPPORTED_NETWORK_NAME,ve="ConnectingExternal"===s.RouterController.state.view,ge=!d.R.getAccountData(e?.chainNamespace)?.caipAddress,be="UnsupportedChain"===s.RouterController.state.view;let K=!1;u.I.state.open&&!ve&&(ge?h&&(K=!0):(be||me&&!fe)&&(K=!0)),K&&"SIWXSignMessage"!==s.RouterController.state.view&&s.RouterController.goBack(),this.caipNetwork=e}prefetch(){this.hasPrefetched||(w.ApiController.prefetch(),w.ApiController.fetchWalletsByPage({page:1}),this.hasPrefetched=!0)}}T.styles=we,O([(0,p.Cb)({type:Boolean})],T.prototype,"enableEmbedded",void 0),O([(0,p.SB)()],T.prototype,"open",void 0),O([(0,p.SB)()],T.prototype,"caipAddress",void 0),O([(0,p.SB)()],T.prototype,"caipNetwork",void 0),O([(0,p.SB)()],T.prototype,"shake",void 0),O([(0,p.SB)()],T.prototype,"filterByNamespace",void 0);let G=class extends T{};G=O([(0,R.Mo)("w3m-modal")],G);let Z=class extends T{};Z=O([(0,R.Mo)("appkit-modal")],Z)},51078:(z,$,r)=>{r(72686)},11252:(z,$,r)=>{var C=r(59799),n=r(86523),p=r(25518),k=r(70075);const W=C.iv`
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
`;var y=function(d,v,w,s){var f,b=arguments.length,m=b<3?v:null===s?s=Object.getOwnPropertyDescriptor(v,w):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)m=Reflect.decorate(d,v,w,s);else for(var g=d.length-1;g>=0;g--)(f=d[g])&&(m=(b<3?f(m):b>3?f(v,w,m):f(v,w))||m);return b>3&&m&&Object.defineProperty(v,w,m),m};let u=class extends C.oi{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`\n      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};\n      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};\n      `,C.dy`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};u.styles=[p.ET,p.Bp,W],y([(0,n.Cb)()],u.prototype,"src",void 0),y([(0,n.Cb)()],u.prototype,"alt",void 0),y([(0,n.Cb)()],u.prototype,"size",void 0),u=y([(0,k.M)("wui-image")],u)},78549:(z,$,r)=>{var C=r(59799),n=r(86523),p=r(25518),k=r(70075);const W=C.iv`
  :host {
    display: flex;
  }

  :host([data-size='sm']) > svg {
    width: 12px;
    height: 12px;
  }

  :host([data-size='md']) > svg {
    width: 16px;
    height: 16px;
  }

  :host([data-size='lg']) > svg {
    width: 24px;
    height: 24px;
  }

  :host([data-size='xl']) > svg {
    width: 32px;
    height: 32px;
  }

  svg {
    animation: rotate 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: var(--local-color);
    stroke-width: 4px;
    stroke-dasharray: 1, 124;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  :host([data-size='md']) > svg > circle {
    stroke-width: 6px;
  }

  :host([data-size='sm']) > svg > circle {
    stroke-width: 8px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 124;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 124;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dashoffset: -125;
    }
  }
`;var y=function(d,v,w,s){var f,b=arguments.length,m=b<3?v:null===s?s=Object.getOwnPropertyDescriptor(v,w):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)m=Reflect.decorate(d,v,w,s);else for(var g=d.length-1;g>=0;g--)(f=d[g])&&(m=(b<3?f(m):b>3?f(v,w,m):f(v,w))||m);return b>3&&m&&Object.defineProperty(v,w,m),m};let u=class extends C.oi{constructor(){super(...arguments),this.color="accent-100",this.size="lg"}render(){return this.style.cssText="--local-color: "+("inherit"===this.color?"inherit":`var(--wui-color-${this.color})`),this.dataset.size=this.size,C.dy`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`}};u.styles=[p.ET,W],y([(0,n.Cb)()],u.prototype,"color",void 0),y([(0,n.Cb)()],u.prototype,"size",void 0),u=y([(0,k.M)("wui-loading-spinner")],u)},87538:(z,$,r)=>{var C=r(59799),n=r(86523),k=(r(72686),r(25518)),W=r(70075);const y=C.iv`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: var(--wui-color-gray-glass-020);
    border-radius: var(--local-border-radius);
    border: var(--local-border);
    box-sizing: content-box;
    width: var(--local-size);
    height: var(--local-size);
    min-height: var(--local-size);
    min-width: var(--local-size);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host {
      background-color: color-mix(in srgb, var(--local-bg-value) var(--local-bg-mix), transparent);
    }
  }
`;var u=function(v,w,s,b){var g,m=arguments.length,f=m<3?w:null===b?b=Object.getOwnPropertyDescriptor(w,s):b;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)f=Reflect.decorate(v,w,s,b);else for(var x=v.length-1;x>=0;x--)(g=v[x])&&(f=(m<3?g(f):m>3?g(w,s,f):g(w,s))||f);return m>3&&f&&Object.defineProperty(w,s,f),f};let d=class extends C.oi{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){const w=this.iconSize||this.size,s="lg"===this.size,b="xl"===this.size,m=s?"12%":"16%",f=s?"xxs":b?"s":"3xl",g="gray"===this.background,x="opaque"===this.background,R="accent-100"===this.backgroundColor&&x||"success-100"===this.backgroundColor&&x||"error-100"===this.backgroundColor&&x||"inverse-100"===this.backgroundColor&&x;let N=`var(--wui-color-${this.backgroundColor})`;return R?N=`var(--wui-icon-box-bg-${this.backgroundColor})`:g&&(N=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`\n       --local-bg-value: ${N};\n       --local-bg-mix: ${R||g?"100%":m};\n       --local-border-radius: var(--wui-border-radius-${f});\n       --local-size: var(--wui-icon-box-size-${this.size});\n       --local-border: ${"wui-color-bg-125"===this.borderColor?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}\n   `,C.dy` <wui-icon color=${this.iconColor} size=${w} name=${this.icon}></wui-icon> `}};d.styles=[k.ET,k.ZM,y],u([(0,n.Cb)()],d.prototype,"size",void 0),u([(0,n.Cb)()],d.prototype,"backgroundColor",void 0),u([(0,n.Cb)()],d.prototype,"iconColor",void 0),u([(0,n.Cb)()],d.prototype,"iconSize",void 0),u([(0,n.Cb)()],d.prototype,"background",void 0),u([(0,n.Cb)({type:Boolean})],d.prototype,"border",void 0),u([(0,n.Cb)()],d.prototype,"borderColor",void 0),u([(0,n.Cb)()],d.prototype,"icon",void 0),d=u([(0,W.M)("wui-icon-box")],d)},28019:(z,$,r)=>{var C=r(59799),n=r(86523),k=(r(10831),r(25518)),W=r(70075);const y=C.iv`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--wui-spacing-m);
    padding: 0 var(--wui-spacing-3xs) !important;
    border-radius: var(--wui-border-radius-5xs);
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host > wui-text {
    transform: translateY(5%);
  }

  :host([data-variant='main']) {
    background-color: var(--wui-color-accent-glass-015);
    color: var(--wui-color-accent-100);
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  :host([data-variant='success']) {
    background-color: var(--wui-icon-box-bg-success-100);
    color: var(--wui-color-success-100);
  }

  :host([data-variant='error']) {
    background-color: var(--wui-icon-box-bg-error-100);
    color: var(--wui-color-error-100);
  }

  :host([data-size='lg']) {
    padding: 11px 5px !important;
  }

  :host([data-size='lg']) > wui-text {
    transform: translateY(2%);
  }
`;var u=function(v,w,s,b){var g,m=arguments.length,f=m<3?w:null===b?b=Object.getOwnPropertyDescriptor(w,s):b;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)f=Reflect.decorate(v,w,s,b);else for(var x=v.length-1;x>=0;x--)(g=v[x])&&(f=(m<3?g(f):m>3?g(w,s,f):g(w,s))||f);return m>3&&f&&Object.defineProperty(w,s,f),f};let d=class extends C.oi{constructor(){super(...arguments),this.variant="main",this.size="lg"}render(){this.dataset.variant=this.variant,this.dataset.size=this.size;const w="md"===this.size?"mini-700":"micro-700";return C.dy`
      <wui-text data-variant=${this.variant} variant=${w} color="inherit">
        <slot></slot>
      </wui-text>
    `}};d.styles=[k.ET,y],u([(0,n.Cb)()],d.prototype,"variant",void 0),u([(0,n.Cb)()],d.prototype,"size",void 0),d=u([(0,W.M)("wui-tag")],d)}}]);