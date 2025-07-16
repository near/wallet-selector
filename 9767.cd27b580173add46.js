"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[9767],{48825:(N,S,t)=>{t.r(S),t.d(S,{W3mApproveTransactionView:()=>a,W3mRegisterAccountNameSuccess:()=>j,W3mRegisterAccountNameView:()=>y,W3mUpgradeWalletView:()=>M});var v=t(49671),o=t(59799),w=t(86523),I=t(79278),T=t(57745),C=t(86424),x=t(56364),m=t(50860);const p=o.iv`
  div {
    width: 100%;
  }

  [data-ready='false'] {
    transform: scale(1.05);
  }

  @media (max-width: 430px) {
    [data-ready='false'] {
      transform: translateY(-50px);
    }
  }
`;var c=function(l,e,n,r){var u,s=arguments.length,i=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(l,e,n,r);else for(var g=l.length-1;g>=0;g--)(u=l[g])&&(i=(s<3?u(i):s>3?u(e,n,i):u(e,n))||i);return s>3&&i&&Object.defineProperty(e,n,i),i};let a=class extends o.oi{constructor(){super(),this.bodyObserver=void 0,this.unsubscribe=[],this.iframe=document.getElementById("w3m-iframe"),this.ready=!1,this.unsubscribe.push(T.I.subscribeKey("open",e=>{e||this.onHideIframe()}),T.I.subscribeKey("shake",e=>{this.iframe.style.animation=e?"w3m-shake 500ms var(--wui-ease-out-power-2)":"none"}))}disconnectedCallback(){this.onHideIframe(),this.unsubscribe.forEach(e=>e()),this.bodyObserver?.unobserve(window.document.body)}firstUpdated(){var e=this;return(0,v.Z)(function*(){yield e.syncTheme(),e.iframe.style.display="block";const n=e?.renderRoot?.querySelector("div");e.bodyObserver=new ResizeObserver(r=>{const i=r?.[0]?.contentBoxSize?.[0]?.inlineSize;e.iframe.style.height="600px",n.style.height="600px",i&&i<=430?(e.iframe.style.width="100%",e.iframe.style.left="0px",e.iframe.style.bottom="0px",e.iframe.style.top="unset"):(e.iframe.style.width="360px",e.iframe.style.left="calc(50% - 180px)",e.iframe.style.top="calc(50% - 300px + 32px)",e.iframe.style.bottom="unset"),e.ready=!0,e.onShowIframe()}),e.bodyObserver.observe(window.document.body)})()}render(){return o.dy`<div data-ready=${this.ready} id="w3m-frame-container"></div>`}onShowIframe(){const e=window.innerWidth<=430;this.iframe.style.animation=e?"w3m-iframe-zoom-in-mobile 200ms var(--wui-ease-out-power-2)":"w3m-iframe-zoom-in 200ms var(--wui-ease-out-power-2)"}onHideIframe(){this.iframe.style.display="none",this.iframe.style.animation="w3m-iframe-fade-out 200ms var(--wui-ease-out-power-2)"}syncTheme(){return(0,v.Z)(function*(){const e=C.ConnectorController.getAuthConnector();if(e){const n=x.ThemeController.getSnapshot().themeMode,r=x.ThemeController.getSnapshot().themeVariables;yield e.provider.syncTheme({themeVariables:r,w3mThemeVariables:(0,I.t)(r,n)})}})()}};a.styles=p,c([(0,w.SB)()],a.prototype,"ready",void 0),a=c([(0,m.Mo)("w3m-approve-transaction-view")],a);var f=t(36882);t(64356),t(937),t(54575);let M=class extends o.oi{render(){return o.dy`
      <wui-flex flexDirection="column" alignItems="center" gap="xl" padding="xl">
        <wui-text variant="paragraph-400" color="fg-100">Follow the instructions on</wui-text>
        <wui-chip
          icon="externalLink"
          variant="fill"
          href=${f.bq.SECURE_SITE_DASHBOARD}
          imageSrc=${f.bq.SECURE_SITE_FAVICON}
          data-testid="w3m-secure-website-button"
        >
        </wui-chip>
        <wui-text variant="small-400" color="fg-200">
          You will have to reconnect for security reasons
        </wui-text>
      </wui-flex>
    `}};M=function(l,e,n,r){var u,s=arguments.length,i=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(l,e,n,r);else for(var g=l.length-1;g>=0;g--)(u=l[g])&&(i=(s<3?u(i):s>3?u(e,n,i):u(e,n))||i);return s>3&&i&&Object.defineProperty(e,n,i),i}([(0,m.Mo)("w3m-upgrade-wallet-view")],M);var _=t(29768),z=t(86450),E=t(8492),O=t(22917),B=t(18445),L=t(20597),P=t(79282),H=t(76169),F=t(23107),Y=(t(78549),t(10831),t(25518)),G=t(70075);t(87162);const K=o.iv`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  .error {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }

  .base-name {
    position: absolute;
    right: 45px;
    top: 15px;
    text-align: right;
  }
`;var U=function(l,e,n,r){var u,s=arguments.length,i=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(l,e,n,r);else for(var g=l.length-1;g>=0;g--)(u=l[g])&&(i=(s<3?u(i):s>3?u(e,n,i):u(e,n))||i);return s>3&&i&&Object.defineProperty(e,n,i),i};let $=class extends o.oi{constructor(){super(...arguments),this.disabled=!1,this.loading=!1}render(){return o.dy`
      <wui-input-text
        value=${(0,F.o)(this.value)}
        ?disabled=${this.disabled}
        .value=${this.value||""}
        data-testid="wui-ens-input"
        inputRightPadding="5xl"
      >
        ${this.baseNameTemplate()} ${this.errorTemplate()}${this.loadingTemplate()}
      </wui-input-text>
    `}baseNameTemplate(){return o.dy`<wui-text variant="paragraph-400" color="fg-200" class="base-name">
      ${z.b.WC_NAME_SUFFIX}
    </wui-text>`}loadingTemplate(){return this.loading?o.dy`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:null}errorTemplate(){return this.errorMessage?o.dy`<wui-text variant="tiny-500" color="error-100" class="error"
        >${this.errorMessage}</wui-text
      >`:null}};$.styles=[Y.ET,K],U([(0,w.Cb)()],$.prototype,"errorMessage",void 0),U([(0,w.Cb)({type:Boolean})],$.prototype,"disabled",void 0),U([(0,w.Cb)()],$.prototype,"value",void 0),U([(0,w.Cb)({type:Boolean})],$.prototype,"loading",void 0),$=U([(0,G.M)("wui-ens-input")],$);t(51078),t(11539),t(30189),t(39927);var D=t(64599);const X=o.iv`
  wui-flex {
    width: 100%;
  }

  .suggestion {
    background: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }

  .suggestion:hover {
    background-color: var(--wui-color-gray-glass-005);
    cursor: pointer;
  }

  .suggested-name {
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  form {
    width: 100%;
  }

  wui-icon-link {
    position: absolute;
    right: 20px;
    transform: translateY(11px);
  }
`;var A=function(l,e,n,r){var u,s=arguments.length,i=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(l,e,n,r);else for(var g=l.length-1;g>=0;g--)(u=l[g])&&(i=(s<3?u(i):s>3?u(e,n,i):u(e,n))||i);return s>3&&i&&Object.defineProperty(e,n,i),i};let y=class extends o.oi{constructor(){super(),this.formRef=(0,_.V)(),this.usubscribe=[],this.name="",this.error="",this.loading=E.a.state.loading,this.suggestions=E.a.state.suggestions,this.registered=!1,this.profileName=O.AccountController.state.profileName,this.onDebouncedNameInputChange=B.j.debounce(e=>{E.a.validateName(e)?(this.error="",this.name=e,E.a.getSuggestions(e),E.a.isNameRegistered(e).then(n=>{this.registered=n})):e.length<4?this.error="Name must be at least 4 characters long":this.error="Can only contain letters, numbers and - characters"}),this.usubscribe.push(E.a.subscribe(e=>{this.suggestions=e.suggestions,this.loading=e.loading}),O.AccountController.subscribeKey("profileName",e=>{this.profileName=e,e&&(this.error="You already own a name")}))}firstUpdated(){this.formRef.value?.addEventListener("keydown",this.onEnterKey.bind(this))}disconnectedCallback(){super.disconnectedCallback(),this.usubscribe.forEach(e=>e()),this.formRef.value?.removeEventListener("keydown",this.onEnterKey.bind(this))}render(){return o.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="m"
        .padding=${["0","s","m","s"]}
      >
        <form ${(0,_.i)(this.formRef)} @submit=${this.onSubmitName.bind(this)}>
          <wui-ens-input
            @inputChange=${this.onNameInputChange.bind(this)}
            .errorMessage=${this.error}
            .value=${this.name}
          >
          </wui-ens-input>
          ${this.submitButtonTemplate()}
          <input type="submit" hidden />
        </form>
        ${this.templateSuggestions()}
      </wui-flex>
    `}submitButtonTemplate(){return this.isAllowedToSubmit()?o.dy`
          <wui-icon-link
            size="sm"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitName.bind(this)}
          >
          </wui-icon-link>
        `:null}onSelectSuggestion(e){return()=>{this.name=e,this.registered=!1,this.requestUpdate()}}onNameInputChange(e){this.onDebouncedNameInputChange(e.detail)}nameSuggestionTagTemplate(){return this.loading?o.dy`<wui-loading-spinner size="lg" color="fg-100"></wui-loading-spinner>`:this.registered?o.dy`<wui-tag variant="shade" size="lg">Registered</wui-tag>`:o.dy`<wui-tag variant="success" size="lg">Available</wui-tag>`}templateSuggestions(){if(!this.name||this.name.length<4||this.error)return null;const e=this.registered?this.suggestions.filter(n=>n.name!==this.name):[];return o.dy`<wui-flex flexDirection="column" gap="xxs" alignItems="center">
      <wui-flex
        data-testid="account-name-suggestion"
        .padding=${["m","m","m","m"]}
        justifyContent="space-between"
        class="suggestion"
        @click=${this.onSubmitName.bind(this)}
      >
        <wui-text color="fg-100" variant="paragraph-400" class="suggested-name">
          ${this.name}</wui-text
        >${this.nameSuggestionTagTemplate()}
      </wui-flex>
      ${e.map(n=>this.availableNameTemplate(n.name))}
    </wui-flex>`}availableNameTemplate(e){return o.dy` <wui-flex
      data-testid="account-name-suggestion"
      .padding=${["m","m","m","m"]}
      justifyContent="space-between"
      class="suggestion"
      @click=${this.onSelectSuggestion(e)}
    >
      <wui-text color="fg-100" variant="paragraph-400" class="suggested-name">
        ${e}
      </wui-text>
      <wui-tag variant="success" size="lg">Available</wui-tag>
    </wui-flex>`}isAllowedToSubmit(){return!this.loading&&!this.registered&&!this.error&&!this.profileName&&E.a.validateName(this.name)}onSubmitName(){var e=this;return(0,v.Z)(function*(){const n=L.R.state.activeChain;try{if(!e.isAllowedToSubmit())return;const r=`${e.name}${z.b.WC_NAME_SUFFIX}`;P.X.sendEvent({type:"track",event:"REGISTER_NAME_INITIATED",properties:{isSmartAccount:O.AccountController.state.preferredAccountTypes?.[n]===D.y_.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:r}}),yield E.a.registerName(r),P.X.sendEvent({type:"track",event:"REGISTER_NAME_SUCCESS",properties:{isSmartAccount:O.AccountController.state.preferredAccountTypes?.[n]===D.y_.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:r}})}catch(r){H.SnackController.showError(r.message),P.X.sendEvent({type:"track",event:"REGISTER_NAME_ERROR",properties:{isSmartAccount:O.AccountController.state.preferredAccountTypes?.[n]===D.y_.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:`${e.name}${z.b.WC_NAME_SUFFIX}`,error:r?.message||"Unknown error"}})}})()}onEnterKey(e){"Enter"===e.key&&this.isAllowedToSubmit()&&this.onSubmitName()}};y.styles=X,A([(0,w.Cb)()],y.prototype,"errorMessage",void 0),A([(0,w.SB)()],y.prototype,"name",void 0),A([(0,w.SB)()],y.prototype,"error",void 0),A([(0,w.SB)()],y.prototype,"loading",void 0),A([(0,w.SB)()],y.prototype,"suggestions",void 0),A([(0,w.SB)()],y.prototype,"registered",void 0),A([(0,w.SB)()],y.prototype,"profileName",void 0),y=A([(0,m.Mo)("w3m-register-account-name-view")],y);var Z=t(17170),Q=t(24380);t(99409),t(6500),t(88198);const J=o.iv`
  .continue-button-container {
    width: 100%;
  }
`;let j=class extends o.oi{render(){return o.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="xxl"
        .padding=${["0","0","l","0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${()=>{B.j.openHref(Z.U.URLS.FAQ,"_blank")}}
        >
          Learn more
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
          size="xl"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="s">
        <wui-text align="center" variant="medium-600" color="fg-100">
          Account name chosen successfully
        </wui-text>
        <wui-text align="center" variant="paragraph-400" color="fg-100">
          You can now fund your account and trade crypto
        </wui-text>
      </wui-flex>
    </wui-flex>`}buttonsTemplate(){return o.dy`<wui-flex
      .padding=${["0","2l","0","2l"]}
      gap="s"
      class="continue-button-container"
    >
      <wui-button fullWidth size="lg" borderRadius="xs" @click=${this.redirectToAccount.bind(this)}
        >Let's Go!
      </wui-button>
    </wui-flex>`}redirectToAccount(){Q.RouterController.replace("Account")}};j.styles=J,j=function(l,e,n,r){var u,s=arguments.length,i=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(l,e,n,r);else for(var g=l.length-1;g>=0;g--)(u=l[g])&&(i=(s<3?u(i):s>3?u(e,n,i):u(e,n))||i);return s>3&&i&&Object.defineProperty(e,n,i),i}([(0,m.Mo)("w3m-register-account-name-success-view")],j)},6500:(N,S,t)=>{t(87538)},51078:(N,S,t)=>{t(72686)},88198:(N,S,t)=>{var v=t(59799),o=t(86523),w=t(23107),T=(t(10831),t(25518)),C=t(70075);const x=v.iv`
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
`;var m=function(c,d,b,h){var R,a=arguments.length,f=a<3?d:null===h?h=Object.getOwnPropertyDescriptor(d,b):h;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)f=Reflect.decorate(c,d,b,h);else for(var W=c.length-1;W>=0;W--)(R=c[W])&&(f=(a<3?R(f):a>3?R(d,b,f):R(d,b))||f);return a>3&&f&&Object.defineProperty(d,b,f),f};let p=class extends v.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return v.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,w.o)(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};p.styles=[T.ET,T.ZM,x],m([(0,o.Cb)()],p.prototype,"tabIdx",void 0),m([(0,o.Cb)({type:Boolean})],p.prototype,"disabled",void 0),m([(0,o.Cb)()],p.prototype,"color",void 0),p=m([(0,C.M)("wui-link")],p)},30189:(N,S,t)=>{t(78549)},11252:(N,S,t)=>{var v=t(59799),o=t(86523),w=t(25518),I=t(70075);const T=v.iv`
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
`;var C=function(m,p,c,d){var a,b=arguments.length,h=b<3?p:null===d?d=Object.getOwnPropertyDescriptor(p,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)h=Reflect.decorate(m,p,c,d);else for(var f=m.length-1;f>=0;f--)(a=m[f])&&(h=(b<3?a(h):b>3?a(p,c,h):a(p,c))||h);return b>3&&h&&Object.defineProperty(p,c,h),h};let x=class extends v.oi{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`\n      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};\n      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};\n      `,v.dy`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};x.styles=[w.ET,w.Bp,T],C([(0,o.Cb)()],x.prototype,"src",void 0),C([(0,o.Cb)()],x.prototype,"alt",void 0),C([(0,o.Cb)()],x.prototype,"size",void 0),x=C([(0,I.M)("wui-image")],x)},28019:(N,S,t)=>{var v=t(59799),o=t(86523),I=(t(10831),t(25518)),T=t(70075);const C=v.iv`
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
`;var x=function(p,c,d,b){var f,h=arguments.length,a=h<3?c:null===b?b=Object.getOwnPropertyDescriptor(c,d):b;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(p,c,d,b);else for(var R=p.length-1;R>=0;R--)(f=p[R])&&(a=(h<3?f(a):h>3?f(c,d,a):f(c,d))||a);return h>3&&a&&Object.defineProperty(c,d,a),a};let m=class extends v.oi{constructor(){super(...arguments),this.variant="main",this.size="lg"}render(){this.dataset.variant=this.variant,this.dataset.size=this.size;const c="md"===this.size?"mini-700":"micro-700";return v.dy`
      <wui-text data-variant=${this.variant} variant=${c} color="inherit">
        <slot></slot>
      </wui-text>
    `}};m.styles=[I.ET,C],x([(0,o.Cb)()],m.prototype,"variant",void 0),x([(0,o.Cb)()],m.prototype,"size",void 0),m=x([(0,T.M)("wui-tag")],m)}}]);