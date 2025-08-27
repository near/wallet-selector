"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2848],{42774:function(e,t,o){o.d(t,{M:function(){return s}});var i=o(62405),r=o(60052);let a=(0,i.sj)({isLegalCheckboxChecked:!1}),s={state:a,subscribe:e=>(0,i.Ld)(a,()=>e(a)),subscribeKey:(e,t)=>(0,r.VW)(a,e,t),setIsLegalCheckboxChecked(e){a.isLegalCheckboxChecked=e}}},88641:function(e,t,o){o.d(t,{y0:function(){return g}});var i=o(16541),r=o(69479),a=o(2706),s=o(44984),n=o(86126),c=o(77405),l=o(25721),d=o(23704),u=o(46719);async function h(){c.P.push("ConnectingFarcaster");let e=s.A.getAuthConnector();if(e&&!r.N.state.farcasterUrl)try{let{url:t}=await e.provider.getFarcasterUri();r.N.setFarcasterUrl(t,a.R.state.activeChain)}catch(e){c.P.goBack(),l.K.showError(e)}}async function p(e){c.P.push("ConnectingSocial");let t=s.A.getAuthConnector(),o=null;try{let s=setTimeout(()=>{throw Error("Social login timed out. Please try again.")},45e3);if(t&&e){if(d.j.isTelegram()||(o=function(){try{return d.j.returnOpenHref(`${i.b.SECURE_SITE_SDK_ORIGIN}/loading`,"popupWindow","width=600,height=800,scrollbars=yes")}catch(e){throw Error("Could not open social popup")}}()),o)r.N.setSocialWindow(o,a.R.state.activeChain);else if(!d.j.isTelegram())throw Error("Could not create social popup");let{uri:n}=await t.provider.getSocialRedirectUri({provider:e});if(!n)throw o?.close(),Error("Could not fetch the social redirect uri");if(o&&(o.location.href=n),d.j.isTelegram()){u.M.setTelegramSocialProvider(e);let t=d.j.formatTelegramSocialLoginUrl(n);d.j.openHref(t,"_top")}clearTimeout(s)}}catch(e){o?.close(),l.K.showError(e?.message)}}async function g(e){r.N.setSocialProvider(e,a.R.state.activeChain),n.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_STARTED",properties:{provider:e}}),"farcaster"===e?await h():await p(e)}},92848:function(e,t,o){o.r(t),o.d(t,{W3mConnectSocialsView:function(){return m},W3mConnectingFarcasterView:function(){return N},W3mConnectingSocialView:function(){return L}});var i=o(44920),r=o(30077),a=o(52608),s=o(42774),n=o(556),c=o(93907);o(52042),o(81433),o(36660);var l=o(44984),d=o(77405),u=o(72148),h=o(93921),p=o(88641),g=o(23704);o(38606);var v=o(74077),b=i.iv`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`,w=function(e,t,o,i){var r,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(a<3?r(s):a>3?r(t,o,s):r(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let f=class extends i.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=l.A.state.connectors,this.authConnector=this.connectors.find(e=>"AUTH"===e.type),this.remoteFeatures=n.h.state.remoteFeatures,this.isPwaLoading=!1,this.unsubscribe.push(l.A.subscribeKey("connectors",e=>{this.connectors=e,this.authConnector=this.connectors.find(e=>"AUTH"===e.type)}),n.h.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}connectedCallback(){super.connectedCallback(),this.handlePwaFrameLoad()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=this.remoteFeatures?.socials||[],t=!!this.authConnector,o=e?.length,r="ConnectSocials"===d.P.state.view;return t&&o||r?(r&&!o&&(e=u.bq.DEFAULT_SOCIALS),i.dy` <wui-flex flexDirection="column" gap="xs">
      ${e.map(e=>i.dy`<wui-list-social
            @click=${()=>{this.onSocialClick(e)}}
            data-testid=${`social-selector-${e}`}
            name=${e}
            logo=${e}
            ?disabled=${this.isPwaLoading}
          ></wui-list-social>`)}
    </wui-flex>`):null}async onSocialClick(e){e&&await (0,p.y0)(e)}async handlePwaFrameLoad(){if(g.j.isPWA()){this.isPwaLoading=!0;try{this.authConnector?.provider instanceof v.S&&await this.authConnector.provider.init()}catch(e){h.B.open({shortMessage:"Error loading embedded wallet in PWA",longMessage:e.message},"error")}finally{this.isPwaLoading=!1}}}};f.styles=b,w([(0,r.Cb)()],f.prototype,"tabIdx",void 0),w([(0,r.SB)()],f.prototype,"connectors",void 0),w([(0,r.SB)()],f.prototype,"authConnector",void 0),w([(0,r.SB)()],f.prototype,"remoteFeatures",void 0),w([(0,r.SB)()],f.prototype,"isPwaLoading",void 0),f=w([(0,c.Mo)("w3m-social-login-list")],f);var y=i.iv`
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
`,x=function(e,t,o,i){var r,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(a<3?r(s):a>3?r(t,o,s):r(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let m=class extends i.oi{constructor(){super(),this.unsubscribe=[],this.checked=s.M.state.isLegalCheckboxChecked,this.unsubscribe.push(s.M.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=n.h.state,o=n.h.state.features?.legalCheckbox,r=!!(e||t)&&!!o,s=r&&!this.checked;return i.dy`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${r?["0","s","s","s"]:"s"}
        gap="xs"
        class=${(0,a.o)(s?"disabled":void 0)}
      >
        <w3m-social-login-list tabIdx=${(0,a.o)(s?-1:void 0)}></w3m-social-login-list>
      </wui-flex>
      <w3m-legal-footer></w3m-legal-footer>
    `}};m.styles=y,x([(0,r.SB)()],m.prototype,"checked",void 0),m=x([(0,c.Mo)("w3m-connect-socials-view")],m);var k=o(69479),C=o(86321),$=o(2706),R=o(86126),P=o(46719),S=o(25721),T=o(91368),O=o(36139);o(2065),o(12377),o(84717),o(93595);var E=o(21257),j=o(28791),z=i.iv`
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
`,I=function(e,t,o,i){var r,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(a<3?r(s):a>3?r(t,o,s):r(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let L=class extends i.oi{constructor(){super(),this.unsubscribe=[],this.socialProvider=k.N.state.socialProvider,this.socialWindow=k.N.state.socialWindow,this.error=!1,this.connecting=!1,this.message="Connect in the provider window",this.remoteFeatures=n.h.state.remoteFeatures,this.address=k.N.state.address,this.connectionsByNamespace=C.l.getConnections($.R.state.activeChain),this.hasMultipleConnections=this.connectionsByNamespace.length>0,this.authConnector=l.A.getAuthConnector(),this.handleSocialConnection=async e=>{if(e.data?.resultUri){if(e.origin===j.b.SECURE_SITE_ORIGIN){window.removeEventListener("message",this.handleSocialConnection,!1);try{if(this.authConnector&&!this.connecting){this.socialWindow&&(this.socialWindow.close(),k.N.setSocialWindow(void 0,$.R.state.activeChain)),this.connecting=!0,this.updateMessage();let t=e.data.resultUri;this.socialProvider&&R.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_REQUEST_USER_DATA",properties:{provider:this.socialProvider}}),await C.l.connectExternal({id:this.authConnector.id,type:this.authConnector.type,socialUri:t},this.authConnector.chain),this.socialProvider&&(P.M.setConnectedSocialProvider(this.socialProvider),R.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_SUCCESS",properties:{provider:this.socialProvider,caipNetworkId:$.R.getActiveCaipNetwork()?.caipNetworkId}}))}}catch(e){this.error=!0,this.updateMessage(),this.socialProvider&&R.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:this.socialProvider}})}}else d.P.goBack(),S.K.showError("Untrusted Origin"),this.socialProvider&&R.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:this.socialProvider}})}};let e=E.j.EmbeddedWalletAbortController;e.signal.addEventListener("abort",()=>{this.socialWindow&&(this.socialWindow.close(),k.N.setSocialWindow(void 0,$.R.state.activeChain))}),this.unsubscribe.push(...[k.N.subscribe(e=>{e.socialProvider&&(this.socialProvider=e.socialProvider),e.socialWindow&&(this.socialWindow=e.socialWindow)}),n.h.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e}),k.N.subscribeKey("address",e=>{let t=this.remoteFeatures?.multiWallet;e&&e!==this.address&&(this.hasMultipleConnections&&t?(d.P.replace("ProfileWallets"),S.K.showSuccess("New Wallet Added")):(T.I.state.open||n.h.state.enableEmbedded)&&T.I.close())})]),this.authConnector&&this.connectSocial()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),window.removeEventListener("message",this.handleSocialConnection,!1),this.socialWindow?.close(),k.N.setSocialWindow(void 0,$.R.state.activeChain)}render(){return i.dy`
      <wui-flex
        data-error=${(0,a.o)(this.error)}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-logo logo=${(0,a.o)(this.socialProvider)}></wui-logo>
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
    `}loaderTemplate(){let e=O.u.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return i.dy`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}connectSocial(){let e=setInterval(()=>{this.socialWindow?.closed&&(this.connecting||"ConnectingSocial"!==d.P.state.view||(this.socialProvider&&R.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_CANCELED",properties:{provider:this.socialProvider}}),d.P.goBack()),clearInterval(e))},1e3);window.addEventListener("message",this.handleSocialConnection,!1)}updateMessage(){this.error?this.message="Something went wrong":this.connecting?this.message="Retrieving user data":this.message="Connect in the provider window"}};L.styles=z,I([(0,r.SB)()],L.prototype,"socialProvider",void 0),I([(0,r.SB)()],L.prototype,"socialWindow",void 0),I([(0,r.SB)()],L.prototype,"error",void 0),I([(0,r.SB)()],L.prototype,"connecting",void 0),I([(0,r.SB)()],L.prototype,"message",void 0),I([(0,r.SB)()],L.prototype,"remoteFeatures",void 0),L=I([(0,c.Mo)("w3m-connecting-social-view")],L),o(24863),o(89938),o(42255),o(26405),o(4695);var B=i.iv`
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
`,M=function(e,t,o,i){var r,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(a<3?r(s):a>3?r(t,o,s):r(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let N=class extends i.oi{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.socialProvider=k.N.state.socialProvider,this.uri=k.N.state.farcasterUrl,this.ready=!1,this.loading=!1,this.remoteFeatures=n.h.state.remoteFeatures,this.authConnector=l.A.getAuthConnector(),this.forceUpdate=()=>{this.requestUpdate()},this.unsubscribe.push(...[k.N.subscribeKey("farcasterUrl",e=>{e&&(this.uri=e,this.connectFarcaster())}),k.N.subscribeKey("socialProvider",e=>{e&&(this.socialProvider=e)}),n.h.subscribeKey("remoteFeatures",e=>{this.remoteFeatures=e})]),window.addEventListener("resize",this.forceUpdate)}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.timeout),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),i.dy`${this.platformTemplate()}`}platformTemplate(){return g.j.isMobile()?i.dy`${this.mobileTemplate()}`:i.dy`${this.desktopTemplate()}`}desktopTemplate(){return this.loading?i.dy`${this.loadingTemplate()}`:i.dy`${this.qrTemplate()}`}qrTemplate(){return i.dy` <wui-flex
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
    </wui-flex>`}loaderTemplate(){let e=O.u.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return i.dy`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}async connectFarcaster(){if(this.authConnector)try{await this.authConnector?.provider.connectFarcaster(),this.socialProvider&&(P.M.setConnectedSocialProvider(this.socialProvider),R.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_REQUEST_USER_DATA",properties:{provider:this.socialProvider}})),this.loading=!0;let e=C.l.getConnections(this.authConnector.chain),t=e.length>0;await C.l.connectExternal(this.authConnector,this.authConnector.chain);let o=this.remoteFeatures?.multiWallet;this.socialProvider&&R.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_SUCCESS",properties:{provider:this.socialProvider,caipNetworkId:$.R.getActiveCaipNetwork()?.caipNetworkId}}),this.loading=!1,t&&o?(d.P.replace("ProfileWallets"),S.K.showSuccess("New Wallet Added")):T.I.close()}catch(e){this.socialProvider&&R.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_ERROR",properties:{provider:this.socialProvider}}),d.P.goBack(),S.K.showError(e)}}mobileLinkTemplate(){return i.dy`<wui-button
      size="md"
      ?loading=${this.loading}
      ?disabled=${!this.uri||this.loading}
      @click=${()=>{this.uri&&g.j.openHref(this.uri,"_blank")}}
    >
      Open farcaster</wui-button
    >`}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;let e=this.getBoundingClientRect().width-40;return i.dy` <wui-qr-code
      size=${e}
      theme=${O.u.state.themeMode}
      uri=${this.uri}
      ?farcaster=${!0}
      data-testid="wui-qr-code"
      color=${(0,a.o)(O.u.state.themeVariables["--w3m-qr-color"])}
    ></wui-qr-code>`}copyTemplate(){let e=!this.uri||!this.ready;return i.dy`<wui-link
      .disabled=${e}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}onCopyUri(){try{this.uri&&(g.j.copyToClopboard(this.uri),S.K.showSuccess("Link copied"))}catch{S.K.showError("Failed to copy")}}};N.styles=B,M([(0,r.SB)()],N.prototype,"socialProvider",void 0),M([(0,r.SB)()],N.prototype,"uri",void 0),M([(0,r.SB)()],N.prototype,"ready",void 0),M([(0,r.SB)()],N.prototype,"loading",void 0),M([(0,r.SB)()],N.prototype,"remoteFeatures",void 0),N=M([(0,c.Mo)("w3m-connecting-farcaster-view")],N)},81433:function(e,t,o){var i=o(44920),r=o(30077),a=o(42774),s=o(556),n=o(93907),c=o(52608),l=o(91308);o(85724);var d=o(17770),u=o(66501),h=i.iv`
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    column-gap: var(--wui-spacing-1xs);
  }

  label > input[type='checkbox'] {
    height: 0;
    width: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
  }

  label > span {
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
    min-width: var(--wui-spacing-xl);
    min-height: var(--wui-spacing-xl);
    border-radius: var(--wui-border-radius-3xs);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-010);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: background-color;
  }

  label > span:hover,
  label > input[type='checkbox']:focus-visible + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  label input[type='checkbox']:checked + span {
    background-color: var(--wui-color-blue-base-90);
  }

  label > span > wui-icon {
    opacity: 0;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-lg);
    will-change: opacity;
  }

  label > input[type='checkbox']:checked + span wui-icon {
    opacity: 1;
  }
`,p=function(e,t,o,i){var r,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(a<3?r(s):a>3?r(t,o,s):r(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let g=class extends i.oi{constructor(){super(...arguments),this.inputElementRef=(0,l.V)(),this.checked=void 0}render(){return i.dy`
      <label>
        <input
          ${(0,l.i)(this.inputElementRef)}
          ?checked=${(0,c.o)(this.checked)}
          type="checkbox"
          @change=${this.dispatchChangeEvent}
        />
        <span>
          <wui-icon name="checkmarkBold" color="inverse-100" size="xxs"></wui-icon>
        </span>
        <slot></slot>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("checkboxChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};g.styles=[d.ET,h],p([(0,r.Cb)({type:Boolean})],g.prototype,"checked",void 0),g=p([(0,u.M)("wui-checkbox")],g),o(93595);var v=i.iv`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  wui-checkbox {
    padding: var(--wui-spacing-s);
  }
  a {
    text-decoration: none;
    color: var(--wui-color-fg-150);
    font-weight: 500;
  }
`,b=function(e,t,o,i){var r,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(a<3?r(s):a>3?r(t,o,s):r(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let w=class extends i.oi{constructor(){super(),this.unsubscribe=[],this.checked=a.M.state.isLegalCheckboxChecked,this.unsubscribe.push(a.M.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=s.h.state,o=s.h.state.features?.legalCheckbox;return(e||t)&&o?i.dy`
      <wui-checkbox
        ?checked=${this.checked}
        @checkboxChange=${this.onCheckboxChange.bind(this)}
        data-testid="wui-checkbox"
      >
        <wui-text color="fg-250" variant="small-400" align="left">
          I agree to our ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
        </wui-text>
      </wui-checkbox>
    `:null}andTemplate(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=s.h.state;return e&&t?"and":""}termsTemplate(){let{termsConditionsUrl:e}=s.h.state;return e?i.dy`<a rel="noreferrer" target="_blank" href=${e}>terms of service</a>`:null}privacyTemplate(){let{privacyPolicyUrl:e}=s.h.state;return e?i.dy`<a rel="noreferrer" target="_blank" href=${e}>privacy policy</a>`:null}onCheckboxChange(){a.M.setIsLegalCheckboxChecked(!this.checked)}};w.styles=[v],b([(0,r.SB)()],w.prototype,"checked",void 0),w=b([(0,n.Mo)("w3m-legal-checkbox")],w)},36660:function(e,t,o){var i=o(44920),r=o(30077),a=o(556),s=o(93907);o(52042),o(93595),o(5058);var n=i.iv`
  :host > wui-flex {
    background-color: var(--wui-color-gray-glass-005);
  }

  :host wui-ux-by-reown {
    padding-top: 0;
  }

  :host wui-ux-by-reown.branding-only {
    padding-top: var(--wui-spacing-m);
  }

  a {
    text-decoration: none;
    color: var(--wui-color-fg-175);
    font-weight: 500;
  }
`,c=function(e,t,o,i){var r,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(a<3?r(s):a>3?r(t,o,s):r(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let l=class extends i.oi{constructor(){super(),this.unsubscribe=[],this.remoteFeatures=a.h.state.remoteFeatures,this.unsubscribe.push(a.h.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=a.h.state,o=a.h.state.features?.legalCheckbox;return(e||t)&&!o?i.dy`
      <wui-flex flexDirection="column">
        <wui-flex .padding=${["m","s","s","s"]} justifyContent="center">
          <wui-text color="fg-250" variant="small-400" align="center">
            By connecting your wallet, you agree to our <br />
            ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
          </wui-text>
        </wui-flex>
        ${this.reownBrandingTemplate()}
      </wui-flex>
    `:i.dy`
        <wui-flex flexDirection="column"> ${this.reownBrandingTemplate(!0)} </wui-flex>
      `}andTemplate(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=a.h.state;return e&&t?"and":""}termsTemplate(){let{termsConditionsUrl:e}=a.h.state;return e?i.dy`<a href=${e} target="_blank" rel="noopener noreferrer"
      >Terms of Service</a
    >`:null}privacyTemplate(){let{privacyPolicyUrl:e}=a.h.state;return e?i.dy`<a href=${e} target="_blank" rel="noopener noreferrer"
      >Privacy Policy</a
    >`:null}reownBrandingTemplate(e=!1){return this.remoteFeatures?.reownBranding?e?i.dy`<wui-ux-by-reown class="branding-only"></wui-ux-by-reown>`:i.dy`<wui-ux-by-reown></wui-ux-by-reown>`:null}};l.styles=[n],c([(0,r.SB)()],l.prototype,"remoteFeatures",void 0),l=c([(0,s.Mo)("w3m-legal-footer")],l)},24863:function(e,t,o){o(25924)},2065:function(e,t,o){o(42559)},89938:function(e,t,o){o(85724)},42255:function(e,t,o){var i=o(44920),r=o(30077),a=o(52608);o(99671);var s=o(17770),n=o(66501),c=i.iv`
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
`,l=function(e,t,o,i){var r,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(a<3?r(s):a>3?r(t,o,s):r(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let d=class extends i.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return i.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,a.o)(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};d.styles=[s.ET,s.ZM,c],l([(0,r.Cb)()],d.prototype,"tabIdx",void 0),l([(0,r.Cb)({type:Boolean})],d.prototype,"disabled",void 0),l([(0,r.Cb)()],d.prototype,"color",void 0),d=l([(0,n.M)("wui-link")],d)},38606:function(e,t,o){var i=o(44920),r=o(30077),a=o(52608);o(99671);var s=o(17770),n=o(66501);o(84717);var c=i.iv`
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
`,l=function(e,t,o,i){var r,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(a<3?r(s):a>3?r(t,o,s):r(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let d=class extends i.oi{constructor(){super(...arguments),this.logo="google",this.name="Continue with google",this.align="left",this.disabled=!1}render(){return i.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,a.o)(this.tabIdx)}>
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
    `}templatePlacement(){return"center"===this.align?i.dy` <wui-logo class="invisible" logo=${this.logo}></wui-logo>`:null}};d.styles=[s.ET,s.ZM,c],l([(0,r.Cb)()],d.prototype,"logo",void 0),l([(0,r.Cb)()],d.prototype,"name",void 0),l([(0,r.Cb)()],d.prototype,"align",void 0),l([(0,r.Cb)()],d.prototype,"tabIdx",void 0),l([(0,r.Cb)({type:Boolean})],d.prototype,"disabled",void 0),d=l([(0,n.M)("wui-list-social")],d)},12377:function(e,t,o){var i=o(44920),r=o(30077),a=o(17770),s=o(66501),n=i.iv`
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`,c=function(e,t,o,i){var r,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(a<3?r(s):a>3?r(t,o,s):r(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let l=class extends i.oi{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){let e=this.radius>50?50:this.radius,t=36-e;return i.dy`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${e}
          stroke-dasharray="${116+t} ${245+t}"
          stroke-dashoffset=${360+1.75*t}
        />
      </svg>
    `}};l.styles=[a.ET,n],c([(0,r.Cb)({type:Number})],l.prototype,"radius",void 0),l=c([(0,s.M)("wui-loading-thumbnail")],l)},4695:function(e,t,o){o(94192)},5058:function(e,t,o){var i=o(44920);o(85724),o(99671),o(55802);var r=o(53208),a=o(17770),s=o(66501),n=i.iv`
  .reown-logo {
    height: var(--wui-spacing-xxl);
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    opacity: 0.9;
  }
`;let c=class extends i.oi{render(){return i.dy`
      <a
        data-testid="ux-branding-reown"
        href=${r.Ub}
        rel="noreferrer"
        target="_blank"
        style="text-decoration: none;"
      >
        <wui-flex
          justifyContent="center"
          alignItems="center"
          gap="xs"
          .padding=${["0","0","l","0"]}
        >
          <wui-text variant="small-500" color="fg-100"> UX by </wui-text>
          <wui-icon name="reown" size="xxxl" class="reown-logo"></wui-icon>
        </wui-flex>
      </a>
    `}};c.styles=[a.ET,a.ZM,n],c=function(e,t,o,i){var r,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(a<3?r(s):a>3?r(t,o,s):r(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s}([(0,s.M)("wui-ux-by-reown")],c)},54521:function(e,t,o){var i=o(44920),r=o(30077),a=o(17770),s=o(66501),n=i.iv`
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
`,c=function(e,t,o,i){var r,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(a<3?r(s):a>3?r(t,o,s):r(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let l=class extends i.oi{constructor(){super(...arguments),this.color="accent-100",this.size="lg"}render(){return this.style.cssText=`--local-color: ${"inherit"===this.color?"inherit":`var(--wui-color-${this.color})`}`,this.dataset.size=this.size,i.dy`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`}};l.styles=[a.ET,n],c([(0,r.Cb)()],l.prototype,"color",void 0),c([(0,r.Cb)()],l.prototype,"size",void 0),l=c([(0,s.M)("wui-loading-spinner")],l)},94192:function(e,t,o){var i=o(44920),r=o(30077),a=o(66501),s=i.iv`
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
`,n=function(e,t,o,i){var r,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(a<3?r(s):a>3?r(t,o,s):r(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let c=class extends i.oi{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m",this.variant="default"}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
      border-radius: clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px);
    `,i.dy`<slot></slot>`}};c.styles=[s],n([(0,r.Cb)()],c.prototype,"width",void 0),n([(0,r.Cb)()],c.prototype,"height",void 0),n([(0,r.Cb)()],c.prototype,"borderRadius",void 0),n([(0,r.Cb)()],c.prototype,"variant",void 0),c=n([(0,a.M)("wui-shimmer")],c)},25924:function(e,t,o){var i=o(44920),r=o(30077);o(54521),o(99671);var a=o(17770),s=o(66501),n=i.iv`
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
  button[data-size='xs'] {
    padding: var(--wui-spacing-3xs) var(--wui-spacing-s) var(--wui-spacing-3xs) var(--wui-spacing-s);
    height: 24px;
  }

  button[data-size='xs'][data-icon-left='true'][data-icon-right='false'] {
    padding: var(--wui-spacing-3xs) var(--wui-spacing-s) var(--wui-spacing-3xs) var(--wui-spacing-s);
  }

  button[data-size='xs'][data-icon-right='true'][data-icon-left='false'] {
    padding: var(--wui-spacing-3xs) var(--wui-spacing-s) var(--wui-spacing-3xs) var(--wui-spacing-s);
  }

  button[data-size='sm'] {
    padding: 7.2px var(--wui-spacing-s) 7.2px var(--wui-spacing-s);
    height: 32px;
  }

  button[data-size='sm'][data-icon-left='true'][data-icon-right='false'] {
    padding: 7.2px var(--wui-spacing-s) 7.2px var(--wui-spacing-s);
  }

  button[data-size='sm'][data-icon-right='true'][data-icon-left='false'] {
    padding: 7.2px var(--wui-spacing-s) 7.2px var(--wui-spacing-s);
  }

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
`,c=function(e,t,o,i){var r,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(a<3?r(s):a>3?r(t,o,s):r(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let l={main:"inverse-100",inverse:"inverse-000",accent:"accent-100","accent-error":"error-100","accent-success":"success-100",neutral:"fg-100",disabled:"gray-glass-020"},d={lg:"paragraph-600",md:"small-600",sm:"small-600",xs:"tiny-600"},u={lg:"md",md:"md",sm:"sm",xs:"sm"},h=class extends i.oi{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="main",this.hasIconLeft=!1,this.hasIconRight=!1,this.borderRadius="m"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
    --local-opacity-100: ${this.loading?0:1};
    --local-opacity-000: ${this.loading?1:0};
    --local-border-radius: var(--wui-border-radius-${this.borderRadius});
    `;let e=this.textVariant??d[this.size];return i.dy`
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${()=>this.handleSlotLeftChange()}></slot>
        <wui-text variant=${e} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${()=>this.handleSlotRightChange()}></slot>
      </button>
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){if(this.loading){let e=u[this.size],t=this.disabled?l.disabled:l[this.variant];return i.dy`<wui-loading-spinner color=${t} size=${e}></wui-loading-spinner>`}return i.dy``}};h.styles=[a.ET,a.ZM,n],c([(0,r.Cb)()],h.prototype,"size",void 0),c([(0,r.Cb)({type:Boolean})],h.prototype,"disabled",void 0),c([(0,r.Cb)({type:Boolean})],h.prototype,"fullWidth",void 0),c([(0,r.Cb)({type:Boolean})],h.prototype,"loading",void 0),c([(0,r.Cb)()],h.prototype,"variant",void 0),c([(0,r.Cb)({type:Boolean})],h.prototype,"hasIconLeft",void 0),c([(0,r.Cb)({type:Boolean})],h.prototype,"hasIconRight",void 0),c([(0,r.Cb)()],h.prototype,"borderRadius",void 0),c([(0,r.Cb)()],h.prototype,"textVariant",void 0),h=c([(0,s.M)("wui-button")],h)},42559:function(e,t,o){var i=o(44920),r=o(30077);o(85724);var a=o(17770),s=o(66501),n=i.iv`
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
`,c=function(e,t,o,i){var r,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(a<3?r(s):a>3?r(t,o,s):r(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let l=class extends i.oi{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){let e=this.iconSize||this.size,t="lg"===this.size,o="xl"===this.size,r="gray"===this.background,a="opaque"===this.background,s="accent-100"===this.backgroundColor&&a||"success-100"===this.backgroundColor&&a||"error-100"===this.backgroundColor&&a||"inverse-100"===this.backgroundColor&&a,n=`var(--wui-color-${this.backgroundColor})`;return s?n=`var(--wui-icon-box-bg-${this.backgroundColor})`:r&&(n=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`
       --local-bg-value: ${n};
       --local-bg-mix: ${s||r?"100%":t?"12%":"16%"};
       --local-border-radius: var(--wui-border-radius-${t?"xxs":o?"s":"3xl"});
       --local-size: var(--wui-icon-box-size-${this.size});
       --local-border: ${"wui-color-bg-125"===this.borderColor?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}
   `,i.dy` <wui-icon color=${this.iconColor} size=${e} name=${this.icon}></wui-icon> `}};l.styles=[a.ET,a.ZM,n],c([(0,r.Cb)()],l.prototype,"size",void 0),c([(0,r.Cb)()],l.prototype,"backgroundColor",void 0),c([(0,r.Cb)()],l.prototype,"iconColor",void 0),c([(0,r.Cb)()],l.prototype,"iconSize",void 0),c([(0,r.Cb)()],l.prototype,"background",void 0),c([(0,r.Cb)({type:Boolean})],l.prototype,"border",void 0),c([(0,r.Cb)()],l.prototype,"borderColor",void 0),c([(0,r.Cb)()],l.prototype,"icon",void 0),l=c([(0,s.M)("wui-icon-box")],l)},84717:function(e,t,o){var i=o(44920),r=o(30077);o(85724);var a=o(17770),s=o(66501),n=i.iv`
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
`,c=function(e,t,o,i){var r,a=arguments.length,s=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(a<3?r(s):a>3?r(t,o,s):r(t,o))||s);return a>3&&s&&Object.defineProperty(t,o,s),s};let l=class extends i.oi{constructor(){super(...arguments),this.logo="google"}render(){return i.dy`<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `}};l.styles=[a.ET,n],c([(0,r.Cb)()],l.prototype,"logo",void 0),l=c([(0,s.M)("wui-logo")],l)},53208:function(e,t,o){o.d(t,{Cv:function(){return i},Ub:function(){return a},ee:function(){return r}});let i=/[.*+?^${}()|[\]\\]/gu,r=/[0-9,.]/u,a="https://reown.com"},91308:function(e,t,o){o.d(t,{V:function(){return s},i:function(){return l}});var i=o(93311),r=o(77177),a=o(47514);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let s=()=>new n;class n{}let c=new WeakMap,l=(0,a.XM)(class extends r.sR{render(e){return i.Ld}update(e,[t]){let o=t!==this.G;return o&&void 0!==this.G&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),i.Ld}rt(e){if(this.isConnected||(e=void 0),"function"==typeof this.G){let t=this.ht??globalThis,o=c.get(t);void 0===o&&(o=new WeakMap,c.set(t,o)),void 0!==o.get(this.G)&&this.G.call(this.ht,void 0),o.set(this.G,e),void 0!==e&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return"function"==typeof this.G?c.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}})}}]);