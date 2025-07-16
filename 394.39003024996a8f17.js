"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[394],{14708:(W,E,e)=>{e.r(E),e.d(E,{W3mConnectSocialsView:()=>B,W3mConnectingFarcasterView:()=>z,W3mConnectingSocialView:()=>I});var i=e(59799),r=e(86523),R=e(23107),$=e(96977),y=e(66301),C=e(50860),l=(e(937),e(45231),e(81616),e(49671)),b=e(86424),c=e(24380),h=e(36882),d=e(13314),g=e(39168),m=e(18445),S=(e(50699),e(14823));const A=i.iv`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var P=function(f,o,n,s){var v,u=arguments.length,t=u<3?o:null===s?s=Object.getOwnPropertyDescriptor(o,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(f,o,n,s);else for(var x=f.length-1;x>=0;x--)(v=f[x])&&(t=(u<3?v(t):u>3?v(o,n,t):v(o,n))||t);return u>3&&t&&Object.defineProperty(o,n,t),t};let O=class extends i.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=b.ConnectorController.state.connectors,this.authConnector=this.connectors.find(o=>"AUTH"===o.type),this.remoteFeatures=y.OptionsController.state.remoteFeatures,this.isPwaLoading=!1,this.unsubscribe.push(b.ConnectorController.subscribeKey("connectors",o=>{this.connectors=o,this.authConnector=this.connectors.find(n=>"AUTH"===n.type)}),y.OptionsController.subscribeKey("remoteFeatures",o=>this.remoteFeatures=o))}connectedCallback(){super.connectedCallback(),this.handlePwaFrameLoad()}disconnectedCallback(){this.unsubscribe.forEach(o=>o())}render(){let o=this.remoteFeatures?.socials||[];const n=!!this.authConnector,s=o?.length,u="ConnectSocials"===c.RouterController.state.view;return n&&s||u?(u&&!s&&(o=h.bq.DEFAULT_SOCIALS),i.dy` <wui-flex flexDirection="column" gap="xs">
      ${o.map(t=>i.dy`<wui-list-social
            @click=${()=>{this.onSocialClick(t)}}
            data-testid=${`social-selector-${t}`}
            name=${t}
            logo=${t}
            ?disabled=${this.isPwaLoading}
          ></wui-list-social>`)}
    </wui-flex>`):null}onSocialClick(o){return(0,l.Z)(function*(){o&&(yield(0,g.y0)(o))})()}handlePwaFrameLoad(){var o=this;return(0,l.Z)(function*(){if(m.j.isPWA()){o.isPwaLoading=!0;try{o.authConnector?.provider instanceof S.S&&(yield o.authConnector.provider.init())}catch(n){d.AlertController.open({shortMessage:"Error loading embedded wallet in PWA",longMessage:n.message},"error")}finally{o.isPwaLoading=!1}}})()}};O.styles=A,P([(0,r.Cb)()],O.prototype,"tabIdx",void 0),P([(0,r.SB)()],O.prototype,"connectors",void 0),P([(0,r.SB)()],O.prototype,"authConnector",void 0),P([(0,r.SB)()],O.prototype,"remoteFeatures",void 0),P([(0,r.SB)()],O.prototype,"isPwaLoading",void 0),O=P([(0,C.Mo)("w3m-social-login-list")],O);const Z=i.iv`
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
`;var F=function(f,o,n,s){var v,u=arguments.length,t=u<3?o:null===s?s=Object.getOwnPropertyDescriptor(o,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(f,o,n,s);else for(var x=f.length-1;x>=0;x--)(v=f[x])&&(t=(u<3?v(t):u>3?v(o,n,t):v(o,n))||t);return u>3&&t&&Object.defineProperty(o,n,t),t};let B=class extends i.oi{constructor(){super(),this.unsubscribe=[],this.checked=$.M.state.isLegalCheckboxChecked,this.unsubscribe.push($.M.subscribeKey("isLegalCheckboxChecked",o=>{this.checked=o}))}disconnectedCallback(){this.unsubscribe.forEach(o=>o())}render(){const{termsConditionsUrl:o,privacyPolicyUrl:n}=y.OptionsController.state,s=y.OptionsController.state.features?.legalCheckbox,t=!(!o&&!n||!s),v=t&&!this.checked,x=v?-1:void 0;return i.dy`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${t?["0","s","s","s"]:"s"}
        gap="xs"
        class=${(0,R.o)(v?"disabled":void 0)}
      >
        <w3m-social-login-list tabIdx=${(0,R.o)(x)}></w3m-social-login-list>
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}};B.styles=Z,F([(0,r.SB)()],B.prototype,"checked",void 0),B=F([(0,C.Mo)("w3m-connect-socials-view")],B);var k=e(22917),G=e(20597),T=e(79282),N=e(10053),X=e(22429),M=e(76169),V=e(57745),D=e(56364),K=(e(6500),e(44411),e(96666),e(54575),e(57768)),H=e(37847);const Q=i.iv`
  wui-logo {
    width: 80px;
    height: 80px;
    border-radius: var(--wui-border-radius-m);
  }
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
    transition: all var(--wui-ease-out-power-2) var(--wui-duration-lg);
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
  .capitalize {
    text-transform: capitalize;
  }
`;var U=function(f,o,n,s){var v,u=arguments.length,t=u<3?o:null===s?s=Object.getOwnPropertyDescriptor(o,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(f,o,n,s);else for(var x=f.length-1;x>=0;x--)(v=f[x])&&(t=(u<3?v(t):u>3?v(o,n,t):v(o,n))||t);return u>3&&t&&Object.defineProperty(o,n,t),t};let I=class extends i.oi{constructor(){var o;super(),o=this,this.unsubscribe=[],this.socialProvider=k.AccountController.state.socialProvider,this.socialWindow=k.AccountController.state.socialWindow,this.error=!1,this.connecting=!1,this.message="Connect in the provider window",this.authConnector=b.ConnectorController.getAuthConnector(),this.handleSocialConnection=function(){var s=(0,l.Z)(function*(u){if(u.data?.resultUri)if(u.origin===H.b.SECURE_SITE_ORIGIN){window.removeEventListener("message",o.handleSocialConnection,!1);try{if(o.authConnector&&!o.connecting){o.socialWindow&&(o.socialWindow.close(),k.AccountController.setSocialWindow(void 0,G.R.state.activeChain)),o.connecting=!0,o.updateMessage();const t=u.data.resultUri;o.socialProvider&&T.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_REQUEST_USER_DATA",properties:{provider:o.socialProvider}}),yield N.ConnectionController.connectExternal({id:o.authConnector.id,type:o.authConnector.type,socialUri:t},o.authConnector.chain),o.socialProvider&&(X.M.setConnectedSocialProvider(o.socialProvider),T.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_SUCCESS",properties:{provider:o.socialProvider}}))}}catch{o.error=!0,o.updateMessage(),o.socialProvider&&T.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:o.socialProvider}})}}else c.RouterController.goBack(),M.SnackController.showError("Untrusted Origin"),o.socialProvider&&T.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:o.socialProvider}})});return function(u){return s.apply(this,arguments)}}(),K.j.EmbeddedWalletAbortController.signal.addEventListener("abort",()=>{this.socialWindow&&(this.socialWindow.close(),k.AccountController.setSocialWindow(void 0,G.R.state.activeChain))}),this.unsubscribe.push(k.AccountController.subscribe(s=>{s.socialProvider&&(this.socialProvider=s.socialProvider),s.socialWindow&&(this.socialWindow=s.socialWindow),s.address&&(V.I.state.open||y.OptionsController.state.enableEmbedded)&&V.I.close()})),this.authConnector&&this.connectSocial()}disconnectedCallback(){this.unsubscribe.forEach(o=>o()),window.removeEventListener("message",this.handleSocialConnection,!1),this.socialWindow?.close(),k.AccountController.setSocialWindow(void 0,G.R.state.activeChain)}render(){return i.dy`
      <wui-flex
        data-error=${(0,R.o)(this.error)}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo=${(0,R.o)(this.socialProvider)}></wui-logo>
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
          <wui-text align="center" variant="paragraph-500" color="fg-100"
            >Log in with
            <span class="capitalize">${this.socialProvider??"Social"}</span></wui-text
          >
          <wui-text align="center" variant="small-400" color=${this.error?"error-100":"fg-200"}
            >${this.message}</wui-text
          ></wui-flex
        >
      </wui-flex>
    `}loaderTemplate(){const o=D.ThemeController.state.themeVariables["--w3m-border-radius-master"],n=o?parseInt(o.replace("px",""),10):4;return i.dy`<wui-loading-thumbnail radius=${9*n}></wui-loading-thumbnail>`}connectSocial(){const o=setInterval(()=>{this.socialWindow?.closed&&(!this.connecting&&"ConnectingSocial"===c.RouterController.state.view&&(this.socialProvider&&T.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_CANCELED",properties:{provider:this.socialProvider}}),c.RouterController.goBack()),clearInterval(o))},1e3);window.addEventListener("message",this.handleSocialConnection,!1)}updateMessage(){this.error?this.message="Something went wrong":this.connecting?this.message="Retrieving user data":this.message="Connect in the provider window"}};I.styles=Q,U([(0,r.SB)()],I.prototype,"socialProvider",void 0),U([(0,r.SB)()],I.prototype,"socialWindow",void 0),U([(0,r.SB)()],I.prototype,"error",void 0),U([(0,r.SB)()],I.prototype,"connecting",void 0),U([(0,r.SB)()],I.prototype,"message",void 0),I=U([(0,C.Mo)("w3m-connecting-social-view")],I);e(99409),e(51078),e(88198),e(73083),e(75165);const Y=i.iv`
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

  wui-logo {
    width: 80px;
    height: 80px;
    border-radius: var(--wui-border-radius-m);
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
    transition: all var(--wui-ease-out-power-2) var(--wui-duration-lg);
  }
`;var j=function(f,o,n,s){var v,u=arguments.length,t=u<3?o:null===s?s=Object.getOwnPropertyDescriptor(o,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(f,o,n,s);else for(var x=f.length-1;x>=0;x--)(v=f[x])&&(t=(u<3?v(t):u>3?v(o,n,t):v(o,n))||t);return u>3&&t&&Object.defineProperty(o,n,t),t};let z=class extends i.oi{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.socialProvider=k.AccountController.state.socialProvider,this.uri=k.AccountController.state.farcasterUrl,this.ready=!1,this.loading=!1,this.authConnector=b.ConnectorController.getAuthConnector(),this.forceUpdate=()=>{this.requestUpdate()},this.unsubscribe.push(k.AccountController.subscribeKey("farcasterUrl",o=>{o&&(this.uri=o,this.connectFarcaster())}),k.AccountController.subscribeKey("socialProvider",o=>{o&&(this.socialProvider=o)})),window.addEventListener("resize",this.forceUpdate)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.timeout),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),i.dy`${this.platformTemplate()}`}platformTemplate(){return m.j.isMobile()?i.dy`${this.mobileTemplate()}`:i.dy`${this.desktopTemplate()}`}desktopTemplate(){return this.loading?i.dy`${this.loadingTemplate()}`:i.dy`${this.qrTemplate()}`}qrTemplate(){return i.dy` <wui-flex
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
    </wui-flex>`}loadingTemplate(){return i.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo="farcaster"></wui-logo>
          ${this.loaderTemplate()}
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
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            Loading user data
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            Please wait a moment while we load your data.
          </wui-text>
        </wui-flex>
      </wui-flex>
    `}mobileTemplate(){return i.dy` <wui-flex
      flexDirection="column"
      alignItems="center"
      .padding=${["3xl","xl","xl","xl"]}
      gap="xl"
    >
      <wui-flex justifyContent="center" alignItems="center">
        <wui-logo logo="farcaster"></wui-logo>
        ${this.loaderTemplate()}
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
        <wui-text align="center" variant="paragraph-500" color="fg-100"
          >Continue in Farcaster</span></wui-text
        >
        <wui-text align="center" variant="small-400" color="fg-200"
          >Accept connection request in the app</wui-text
        ></wui-flex
      >
      ${this.mobileLinkTemplate()}
    </wui-flex>`}loaderTemplate(){const o=D.ThemeController.state.themeVariables["--w3m-border-radius-master"],n=o?parseInt(o.replace("px",""),10):4;return i.dy`<wui-loading-thumbnail radius=${9*n}></wui-loading-thumbnail>`}connectFarcaster(){var o=this;return(0,l.Z)(function*(){if(o.authConnector)try{yield o.authConnector?.provider.connectFarcaster(),o.socialProvider&&(X.M.setConnectedSocialProvider(o.socialProvider),T.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_REQUEST_USER_DATA",properties:{provider:o.socialProvider}})),o.loading=!0,yield N.ConnectionController.connectExternal(o.authConnector,o.authConnector.chain),o.socialProvider&&T.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_SUCCESS",properties:{provider:o.socialProvider}}),o.loading=!1,V.I.close()}catch(n){o.socialProvider&&T.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:o.socialProvider}}),c.RouterController.goBack(),M.SnackController.showError(n)}})()}mobileLinkTemplate(){return i.dy`<wui-button
      size="md"
      ?loading=${this.loading}
      ?disabled=${!this.uri||this.loading}
      @click=${()=>{this.uri&&m.j.openHref(this.uri,"_blank")}}
    >
      Open farcaster</wui-button
    >`}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const o=this.getBoundingClientRect().width-40;return i.dy` <wui-qr-code
      size=${o}
      theme=${D.ThemeController.state.themeMode}
      uri=${this.uri}
      ?farcaster=${!0}
      data-testid="wui-qr-code"
      color=${(0,R.o)(D.ThemeController.state.themeVariables["--w3m-qr-color"])}
    ></wui-qr-code>`}copyTemplate(){const o=!this.uri||!this.ready;return i.dy`<wui-link
      .disabled=${o}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}onCopyUri(){try{this.uri&&(m.j.copyToClopboard(this.uri),M.SnackController.showSuccess("Link copied"))}catch{M.SnackController.showError("Failed to copy")}}};z.styles=Y,j([(0,r.SB)()],z.prototype,"socialProvider",void 0),j([(0,r.SB)()],z.prototype,"uri",void 0),j([(0,r.SB)()],z.prototype,"ready",void 0),j([(0,r.SB)()],z.prototype,"loading",void 0),z=j([(0,C.Mo)("w3m-connecting-farcaster-view")],z)},99409:(W,E,e)=>{e(45841)},75165:(W,E,e)=>{e(294)},78549:(W,E,e)=>{var i=e(59799),r=e(86523),R=e(25518),$=e(70075);const y=i.iv`
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
`;var C=function(a,p,l,b){var d,c=arguments.length,h=c<3?p:null===b?b=Object.getOwnPropertyDescriptor(p,l):b;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)h=Reflect.decorate(a,p,l,b);else for(var g=a.length-1;g>=0;g--)(d=a[g])&&(h=(c<3?d(h):c>3?d(p,l,h):d(p,l))||h);return c>3&&h&&Object.defineProperty(p,l,h),h};let w=class extends i.oi{constructor(){super(...arguments),this.color="accent-100",this.size="lg"}render(){return this.style.cssText="--local-color: "+("inherit"===this.color?"inherit":`var(--wui-color-${this.color})`),this.dataset.size=this.size,i.dy`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`}};w.styles=[R.ET,y],C([(0,r.Cb)()],w.prototype,"color",void 0),C([(0,r.Cb)()],w.prototype,"size",void 0),w=C([(0,$.M)("wui-loading-spinner")],w)},45841:(W,E,e)=>{var i=e(59799),r=e(86523),y=(e(78549),e(10831),e(25518)),C=e(70075);const w=i.iv`
  :host {
    width: var(--local-width);
    position: relative;
  }

  button {
    border: none;
    border-radius: var(--local-border-radius);
    width: var(--local-width);
    white-space: nowrap;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='md'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-l);
    height: 36px;
  }

  button[data-size='md'][data-icon-left='true'][data-icon-right='false'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-s);
  }

  button[data-size='md'][data-icon-right='true'][data-icon-left='false'] {
    padding: 8.2px var(--wui-spacing-s) 9px var(--wui-spacing-l);
  }

  button[data-size='lg'] {
    padding: var(--wui-spacing-m) var(--wui-spacing-2l);
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='inverse'] {
    background-color: var(--wui-color-inverse-100);
    color: var(--wui-color-inverse-000);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='accent-error'] {
    background: var(--wui-color-error-glass-015);
    color: var(--wui-color-error-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-error-glass-010);
  }

  button[data-variant='accent-success'] {
    background: var(--wui-color-success-glass-015);
    color: var(--wui-color-success-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-success-glass-010);
  }

  button[data-variant='neutral'] {
    background: transparent;
    color: var(--wui-color-fg-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-variant='main']:focus-visible:enabled {
    background-color: var(--wui-color-accent-090);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='inverse']:focus-visible:enabled {
    background-color: var(--wui-color-inverse-100);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent']:focus-visible:enabled {
    background-color: var(--wui-color-accent-glass-010);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent-error']:focus-visible:enabled {
    background: var(--wui-color-error-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-error-100),
      0 0 0 4px var(--wui-color-error-glass-020);
  }
  button[data-variant='accent-success']:focus-visible:enabled {
    background: var(--wui-color-success-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-success-100),
      0 0 0 4px var(--wui-color-success-glass-020);
  }
  button[data-variant='neutral']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
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

    button[data-variant='accent-error']:hover:enabled {
      background: var(--wui-color-error-glass-020);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-error']:active:enabled {
      background: var(--wui-color-error-glass-030);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-success']:hover:enabled {
      background: var(--wui-color-success-glass-020);
      color: var(--wui-color-success-100);
    }

    button[data-variant='accent-success']:active:enabled {
      background: var(--wui-color-success-glass-030);
      color: var(--wui-color-success-100);
    }

    button[data-variant='neutral']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='neutral']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }

    button[data-size='lg'][data-icon-left='true'][data-icon-right='false'] {
      padding-left: var(--wui-spacing-m);
    }

    button[data-size='lg'][data-icon-right='true'][data-icon-left='false'] {
      padding-right: var(--wui-spacing-m);
    }
  }

  /* -- Disabled state --------------------------------------------------- */
  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    color: var(--wui-color-gray-glass-020);
    cursor: not-allowed;
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  wui-loading-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: var(--local-opacity-000);
  }
`;var a=function(h,d,g,m){var A,L=arguments.length,S=L<3?d:null===m?m=Object.getOwnPropertyDescriptor(d,g):m;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)S=Reflect.decorate(h,d,g,m);else for(var P=h.length-1;P>=0;P--)(A=h[P])&&(S=(L<3?A(S):L>3?A(d,g,S):A(d,g))||S);return L>3&&S&&Object.defineProperty(d,g,S),S};const p={main:"inverse-100",inverse:"inverse-000",accent:"accent-100","accent-error":"error-100","accent-success":"success-100",neutral:"fg-100",disabled:"gray-glass-020"},l={lg:"paragraph-600",md:"small-600"},b={lg:"md",md:"md"};let c=class extends i.oi{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="main",this.hasIconLeft=!1,this.hasIconRight=!1,this.borderRadius="m"}render(){this.style.cssText=`\n    --local-width: ${this.fullWidth?"100%":"auto"};\n    --local-opacity-100: ${this.loading?0:1};\n    --local-opacity-000: ${this.loading?1:0};\n    --local-border-radius: var(--wui-border-radius-${this.borderRadius});\n    `;const d=this.textVariant??l[this.size];return i.dy`
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${()=>this.handleSlotLeftChange()}></slot>
        <wui-text variant=${d} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${()=>this.handleSlotRightChange()}></slot>
      </button>
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){if(this.loading){const d=b[this.size],g=this.disabled?p.disabled:p[this.variant];return i.dy`<wui-loading-spinner color=${g} size=${d}></wui-loading-spinner>`}return i.dy``}};c.styles=[y.ET,y.ZM,w],a([(0,r.Cb)()],c.prototype,"size",void 0),a([(0,r.Cb)({type:Boolean})],c.prototype,"disabled",void 0),a([(0,r.Cb)({type:Boolean})],c.prototype,"fullWidth",void 0),a([(0,r.Cb)({type:Boolean})],c.prototype,"loading",void 0),a([(0,r.Cb)()],c.prototype,"variant",void 0),a([(0,r.Cb)({type:Boolean})],c.prototype,"hasIconLeft",void 0),a([(0,r.Cb)({type:Boolean})],c.prototype,"hasIconRight",void 0),a([(0,r.Cb)()],c.prototype,"borderRadius",void 0),a([(0,r.Cb)()],c.prototype,"textVariant",void 0),c=a([(0,C.M)("wui-button")],c)},87538:(W,E,e)=>{var i=e(59799),r=e(86523),$=(e(72686),e(25518)),y=e(70075);const C=i.iv`
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
`;var w=function(p,l,b,c){var g,h=arguments.length,d=h<3?l:null===c?c=Object.getOwnPropertyDescriptor(l,b):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(p,l,b,c);else for(var m=p.length-1;m>=0;m--)(g=p[m])&&(d=(h<3?g(d):h>3?g(l,b,d):g(l,b))||d);return h>3&&d&&Object.defineProperty(l,b,d),d};let a=class extends i.oi{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){const l=this.iconSize||this.size,b="lg"===this.size,c="xl"===this.size,h=b?"12%":"16%",d=b?"xxs":c?"s":"3xl",g="gray"===this.background,m="opaque"===this.background,L="accent-100"===this.backgroundColor&&m||"success-100"===this.backgroundColor&&m||"error-100"===this.backgroundColor&&m||"inverse-100"===this.backgroundColor&&m;let S=`var(--wui-color-${this.backgroundColor})`;return L?S=`var(--wui-icon-box-bg-${this.backgroundColor})`:g&&(S=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`\n       --local-bg-value: ${S};\n       --local-bg-mix: ${L||g?"100%":h};\n       --local-border-radius: var(--wui-border-radius-${d});\n       --local-size: var(--wui-icon-box-size-${this.size});\n       --local-border: ${"wui-color-bg-125"===this.borderColor?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}\n   `,i.dy` <wui-icon color=${this.iconColor} size=${l} name=${this.icon}></wui-icon> `}};a.styles=[$.ET,$.ZM,C],w([(0,r.Cb)()],a.prototype,"size",void 0),w([(0,r.Cb)()],a.prototype,"backgroundColor",void 0),w([(0,r.Cb)()],a.prototype,"iconColor",void 0),w([(0,r.Cb)()],a.prototype,"iconSize",void 0),w([(0,r.Cb)()],a.prototype,"background",void 0),w([(0,r.Cb)({type:Boolean})],a.prototype,"border",void 0),w([(0,r.Cb)()],a.prototype,"borderColor",void 0),w([(0,r.Cb)()],a.prototype,"icon",void 0),a=w([(0,y.M)("wui-icon-box")],a)},29768:(W,E,e)=>{e.d(E,{V:()=>$,i:()=>w});var i=e(35221),r=e(36603),R=e(49501);const $=()=>new y;class y{}const C=new WeakMap,w=(0,R.XM)(class extends r.sR{render(a){return i.Ld}update(a,[p]){const l=p!==this.G;return l&&void 0!==this.G&&this.rt(void 0),(l||this.lt!==this.ct)&&(this.G=p,this.ht=a.options?.host,this.rt(this.ct=a.element)),i.Ld}rt(a){if(this.isConnected||(a=void 0),"function"==typeof this.G){const p=this.ht??globalThis;let l=C.get(p);void 0===l&&(l=new WeakMap,C.set(p,l)),void 0!==l.get(this.G)&&this.G.call(this.ht,void 0),l.set(this.G,a),void 0!==a&&this.G.call(this.ht,a)}else this.G.value=a}get lt(){return"function"==typeof this.G?C.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}})}}]);