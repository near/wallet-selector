"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[7324],{87324:(P,C,a)=>{a.r(C),a.d(C,{W3mEmailLoginView:()=>D,W3mEmailVerifyDeviceView:()=>S,W3mEmailVerifyOtpView:()=>U,W3mUpdateEmailPrimaryOtpView:()=>F,W3mUpdateEmailSecondaryOtpView:()=>M,W3mUpdateEmailWalletView:()=>y});var p=a(49671),m=a(79282),T=a(20597),B=a(10053),x=a(66301),$=a(57745),b=a(18445),f=a(50860),u=a(59799),d=a(86523),c=a(24380),h=a(86424),v=a(76169),W=(a(937),a(88198),a(30189),a(79348),a(25518)),k=a(88814),z=a(70075);const G=u.iv`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    width: 50px;
    height: 50px;
    background: var(--wui-color-gray-glass-010);
    border-radius: var(--wui-border-radius-xs);
    border: 1px solid var(--wui-color-gray-glass-005);
    font-family: var(--wui-font-family);
    font-size: var(--wui-font-size-large);
    font-weight: var(--wui-font-weight-regular);
    letter-spacing: var(--wui-letter-spacing-large);
    text-align: center;
    color: var(--wui-color-fg-100);
    caret-color: var(--wui-color-accent-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
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

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
    background: var(--wui-color-gray-glass-005);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-015);
    border: 1px solid var(--wui-color-accent-100);
    -webkit-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow: 0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      background-color: var(--wui-color-gray-glass-015);
    }
  }
`;var L=function(l,e,t,n){var r,o=arguments.length,i=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,t):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(l,e,t,n);else for(var s=l.length-1;s>=0;s--)(r=l[s])&&(i=(o<3?r(i):o>3?r(e,t,i):r(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let R=class extends u.oi{constructor(){super(...arguments),this.disabled=!1,this.value=""}render(){return u.dy`<input
      type="number"
      maxlength="1"
      inputmode="numeric"
      autofocus
      ?disabled=${this.disabled}
      value=${this.value}
    /> `}};R.styles=[W.ET,W.ZM,G],L([(0,d.Cb)({type:Boolean})],R.prototype,"disabled",void 0),L([(0,d.Cb)({type:String})],R.prototype,"value",void 0),R=L([(0,z.M)("wui-input-numeric")],R);const Y=u.iv`
  :host {
    position: relative;
    display: block;
  }
`;var A=function(l,e,t,n){var r,o=arguments.length,i=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,t):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(l,e,t,n);else for(var s=l.length-1;s>=0;s--)(r=l[s])&&(i=(o<3?r(i):o>3?r(e,t,i):r(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let E=class extends u.oi{constructor(){super(...arguments),this.length=6,this.otp="",this.values=Array.from({length:this.length}).map(()=>""),this.numerics=[],this.shouldInputBeEnabled=e=>this.values.slice(0,e).every(n=>""!==n),this.handleKeyDown=(e,t)=>{const n=e.target,o=this.getInputElement(n);if(!o)return;["ArrowLeft","ArrowRight","Shift","Delete"].includes(e.key)&&e.preventDefault();const r=o.selectionStart;switch(e.key){case"ArrowLeft":r&&o.setSelectionRange(r+1,r+1),this.focusInputField("prev",t);break;case"ArrowRight":case"Shift":this.focusInputField("next",t);break;case"Delete":case"Backspace":""===o.value?this.focusInputField("prev",t):this.updateInput(o,t,"")}},this.focusInputField=(e,t)=>{if("next"===e){const n=t+1;if(!this.shouldInputBeEnabled(n))return;const o=this.numerics[n<this.length?n:t],i=o?this.getInputElement(o):void 0;i&&(i.disabled=!1,i.focus())}if("prev"===e){const n=t-1,o=this.numerics[n>-1?n:t],i=o?this.getInputElement(o):void 0;i&&i.focus()}}}firstUpdated(){this.otp&&(this.values=this.otp.split(""));const e=this.shadowRoot?.querySelectorAll("wui-input-numeric");e&&(this.numerics=Array.from(e)),this.numerics[0]?.focus()}render(){return u.dy`
      <wui-flex gap="xxs" data-testid="wui-otp-input">
        ${Array.from({length:this.length}).map((e,t)=>u.dy`
            <wui-input-numeric
              @input=${n=>this.handleInput(n,t)}
              @click=${n=>this.selectInput(n)}
              @keydown=${n=>this.handleKeyDown(n,t)}
              .disabled=${!this.shouldInputBeEnabled(t)}
              .value=${this.values[t]||""}
            >
            </wui-input-numeric>
          `)}
      </wui-flex>
    `}updateInput(e,t,n){const o=this.numerics[t],i=e||(o?this.getInputElement(o):void 0);i&&(i.value=n,this.values=this.values.map((r,s)=>s===t?n:r))}selectInput(e){const t=e.target;t&&this.getInputElement(t)?.select()}handleInput(e,t){const n=e.target,o=this.getInputElement(n);if(o){const i=o.value;"insertFromPaste"===e.inputType?this.handlePaste(o,i,t):k.H.isNumber(i)&&e.data?(this.updateInput(o,t,e.data),this.focusInputField("next",t)):this.updateInput(o,t,"")}this.dispatchInputChangeEvent()}handlePaste(e,t,n){const o=t[0];if(o&&k.H.isNumber(o)){this.updateInput(e,n,o);const r=t.substring(1);if(n+1<this.length&&r.length){const s=this.numerics[n+1],K=s?this.getInputElement(s):void 0;K&&this.handlePaste(K,r,n+1)}else this.focusInputField("next",n)}else this.updateInput(e,n,"")}getInputElement(e){return e.shadowRoot?.querySelector("input")?e.shadowRoot.querySelector("input"):null}dispatchInputChangeEvent(){const e=this.values.join("");this.dispatchEvent(new CustomEvent("inputChange",{detail:e,bubbles:!0,composed:!0}))}};E.styles=[W.ET,Y],A([(0,d.Cb)({type:Number})],E.prototype,"length",void 0),A([(0,d.Cb)({type:String})],E.prototype,"otp",void 0),A([(0,d.SB)()],E.prototype,"values",void 0),E=A([(0,z.M)("wui-otp")],E);a(54575);var j=a(24508);const J=u.iv`
  wui-loading-spinner {
    margin: 9px auto;
  }

  .email-display,
  .email-display wui-text {
    max-width: 100%;
  }
`;var V=function(l,e,t,n){var r,o=arguments.length,i=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,t):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(l,e,t,n);else for(var s=l.length-1;s>=0;s--)(r=l[s])&&(i=(o<3?r(i):o>3?r(e,t,i):r(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let g=class extends u.oi{firstUpdated(){this.startOTPTimeout()}disconnectedCallback(){clearTimeout(this.OTPTimeout)}constructor(){super(),this.loading=!1,this.timeoutTimeLeft=j.$.getTimeToNextEmailLogin(),this.error="",this.otp="",this.email=c.RouterController.state.data?.email,this.authConnector=h.ConnectorController.getAuthConnector()}render(){if(!this.email)throw new Error("w3m-email-otp-widget: No email provided");const e=!!this.timeoutTimeLeft,t=this.getFooterLabels(e);return u.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["l","0","l","0"]}
        gap="l"
      >
        <wui-flex
          class="email-display"
          flexDirection="column"
          alignItems="center"
          .padding=${["0","xl","0","xl"]}
        >
          <wui-text variant="paragraph-400" color="fg-100" align="center">
            Enter the code we sent to
          </wui-text>
          <wui-text variant="paragraph-500" color="fg-100" lineClamp="1" align="center">
            ${this.email}
          </wui-text>
        </wui-flex>

        <wui-text variant="small-400" color="fg-200">The code expires in 20 minutes</wui-text>

        ${this.loading?u.dy`<wui-loading-spinner size="xl" color="accent-100"></wui-loading-spinner>`:u.dy` <wui-flex flexDirection="column" alignItems="center" gap="xs">
              <wui-otp
                dissabled
                length="6"
                @inputChange=${this.onOtpInputChange.bind(this)}
                .otp=${this.otp}
              ></wui-otp>
              ${this.error?u.dy`
                    <wui-text variant="small-400" align="center" color="error-100">
                      ${this.error}. Try Again
                    </wui-text>
                  `:null}
            </wui-flex>`}

        <wui-flex alignItems="center" gap="xs">
          <wui-text variant="small-400" color="fg-200">${t.title}</wui-text>
          <wui-link @click=${this.onResendCode.bind(this)} .disabled=${e}>
            ${t.action}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `}startOTPTimeout(){this.timeoutTimeLeft=j.$.getTimeToNextEmailLogin(),this.OTPTimeout=setInterval(()=>{this.timeoutTimeLeft>0?this.timeoutTimeLeft=j.$.getTimeToNextEmailLogin():clearInterval(this.OTPTimeout)},1e3)}onOtpInputChange(e){var t=this;return(0,p.Z)(function*(){try{t.loading||(t.otp=e.detail,t.authConnector&&6===t.otp.length&&(t.loading=!0,yield t.onOtpSubmit?.(t.otp)))}catch(n){t.error=b.j.parseError(n),t.loading=!1}})()}onResendCode(){var e=this;return(0,p.Z)(function*(){try{if(e.onOtpResend){if(!e.loading&&!e.timeoutTimeLeft){if(e.error="",e.otp="",!h.ConnectorController.getAuthConnector()||!e.email)throw new Error("w3m-email-otp-widget: Unable to resend email");e.loading=!0,yield e.onOtpResend(e.email),e.startOTPTimeout(),v.SnackController.showSuccess("Code email resent")}}else e.onStartOver&&e.onStartOver()}catch(t){v.SnackController.showError(t)}finally{e.loading=!1}})()}getFooterLabels(e){return this.onStartOver?{title:"Something wrong?",action:"Try again "+(e?`in ${this.timeoutTimeLeft}s`:"")}:{title:"Didn't receive it?",action:"Resend "+(e?`in ${this.timeoutTimeLeft}s`:"Code")}}};g.styles=J,V([(0,d.SB)()],g.prototype,"loading",void 0),V([(0,d.SB)()],g.prototype,"timeoutTimeLeft",void 0),V([(0,d.SB)()],g.prototype,"error",void 0),g=V([(0,f.Mo)("w3m-email-otp-widget")],g);let U=class extends g{constructor(){var e;super(...arguments),e=this,this.onOtpSubmit=function(){var t=(0,p.Z)(function*(n){try{if(e.authConnector){if(yield e.authConnector.provider.connectOtp({otp:n}),m.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),!T.R.state.activeChain)throw new Error("Active chain is not set on ChainControll");yield B.ConnectionController.connectExternal(e.authConnector,T.R.state.activeChain),m.X.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"email",name:e.authConnector.name||"Unknown"}}),x.OptionsController.state.siwx||$.I.close()}}catch(o){throw m.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:b.j.parseError(o)}}),o}});return function(n){return t.apply(this,arguments)}}(),this.onOtpResend=function(){var t=(0,p.Z)(function*(n){e.authConnector&&(yield e.authConnector.provider.connectEmail({email:n}),m.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}))});return function(n){return t.apply(this,arguments)}}()}};U=function(l,e,t,n){var r,o=arguments.length,i=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,t):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(l,e,t,n);else for(var s=l.length-1;s>=0;s--)(r=l[s])&&(i=(o<3?r(i):o>3?r(e,t,i):r(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i}([(0,f.Mo)("w3m-email-verify-otp-view")],U);a(6500);const ee=u.iv`
  wui-icon-box {
    height: var(--wui-icon-box-size-xl);
    width: var(--wui-icon-box-size-xl);
  }
`;var X=function(l,e,t,n){var r,o=arguments.length,i=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,t):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(l,e,t,n);else for(var s=l.length-1;s>=0;s--)(r=l[s])&&(i=(o<3?r(i):o>3?r(e,t,i):r(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let S=class extends u.oi{constructor(){super(),this.email=c.RouterController.state.data?.email,this.authConnector=h.ConnectorController.getAuthConnector(),this.loading=!1,this.listenForDeviceApproval()}render(){if(!this.email)throw new Error("w3m-email-verify-device-view: No email provided");if(!this.authConnector)throw new Error("w3m-email-verify-device-view: No auth connector provided");return u.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["xxl","s","xxl","s"]}
        gap="l"
      >
        <wui-icon-box
          size="xl"
          iconcolor="accent-100"
          backgroundcolor="accent-100"
          icon="verify"
          background="opaque"
        ></wui-icon-box>

        <wui-flex flexDirection="column" alignItems="center" gap="s">
          <wui-flex flexDirection="column" alignItems="center">
            <wui-text variant="paragraph-400" color="fg-100">
              Approve the login link we sent to
            </wui-text>
            <wui-text variant="paragraph-400" color="fg-100"><b>${this.email}</b></wui-text>
          </wui-flex>

          <wui-text variant="small-400" color="fg-200" align="center">
            The code expires in 20 minutes
          </wui-text>

          <wui-flex alignItems="center" id="w3m-resend-section" gap="xs">
            <wui-text variant="small-400" color="fg-100" align="center">
              Didn't receive it?
            </wui-text>
            <wui-link @click=${this.onResendCode.bind(this)} .disabled=${this.loading}>
              Resend email
            </wui-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}listenForDeviceApproval(){var e=this;return(0,p.Z)(function*(){if(e.authConnector)try{yield e.authConnector.provider.connectDevice(),m.X.sendEvent({type:"track",event:"DEVICE_REGISTERED_FOR_EMAIL"}),m.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),c.RouterController.replace("EmailVerifyOtp",{email:e.email})}catch{c.RouterController.goBack()}})()}onResendCode(){var e=this;return(0,p.Z)(function*(){try{if(!e.loading){if(!e.authConnector||!e.email)throw new Error("w3m-email-login-widget: Unable to resend email");e.loading=!0,yield e.authConnector.provider.connectEmail({email:e.email}),e.listenForDeviceApproval(),v.SnackController.showSuccess("Code email resent")}}catch(t){v.SnackController.showError(t)}finally{e.loading=!1}})()}};S.styles=ee,X([(0,d.SB)()],S.prototype,"loading",void 0),S=X([(0,f.Mo)("w3m-email-verify-device-view")],S);var Z=a(29768);a(99409),a(8894);const te=u.iv`
  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }
`;var N=function(l,e,t,n){var r,o=arguments.length,i=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,t):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(l,e,t,n);else for(var s=l.length-1;s>=0;s--)(r=l[s])&&(i=(o<3?r(i):o>3?r(e,t,i):r(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let y=class extends u.oi{constructor(){super(...arguments),this.formRef=(0,Z.V)(),this.initialEmail=c.RouterController.state.data?.email??"",this.redirectView=c.RouterController.state.data?.redirectView,this.email="",this.loading=!1}firstUpdated(){this.formRef.value?.addEventListener("keydown",e=>{"Enter"===e.key&&this.onSubmitEmail(e)})}render(){return u.dy`
      <wui-flex flexDirection="column" padding="m" gap="m">
        <form ${(0,Z.i)(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
          <wui-email-input
            value=${this.initialEmail}
            .disabled=${this.loading}
            @inputChange=${this.onEmailInputChange.bind(this)}
          >
          </wui-email-input>
          <input type="submit" hidden />
        </form>
        ${this.buttonsTemplate()}
      </wui-flex>
    `}onEmailInputChange(e){this.email=e.detail}onSubmitEmail(e){var t=this;return(0,p.Z)(function*(){try{if(t.loading)return;t.loading=!0,e.preventDefault();const n=h.ConnectorController.getAuthConnector();if(!n)throw new Error("w3m-update-email-wallet: Auth connector not found");const o=yield n.provider.updateEmail({email:t.email});m.X.sendEvent({type:"track",event:"EMAIL_EDIT"}),"VERIFY_SECONDARY_OTP"===o.action?c.RouterController.push("UpdateEmailSecondaryOtp",{email:t.initialEmail,newEmail:t.email,redirectView:t.redirectView}):c.RouterController.push("UpdateEmailPrimaryOtp",{email:t.initialEmail,newEmail:t.email,redirectView:t.redirectView})}catch(n){v.SnackController.showError(n),t.loading=!1}})()}buttonsTemplate(){const e=!this.loading&&this.email.length>3&&this.email!==this.initialEmail;return this.redirectView?u.dy`
      <wui-flex gap="s">
        <wui-button size="md" variant="neutral" fullWidth @click=${c.RouterController.goBack}>
          Cancel
        </wui-button>

        <wui-button
          size="md"
          variant="main"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!e}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      </wui-flex>
    `:u.dy`
        <wui-button
          size="md"
          variant="main"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!e}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      `}};y.styles=te,N([(0,d.SB)()],y.prototype,"email",void 0),N([(0,d.SB)()],y.prototype,"loading",void 0),y=N([(0,f.Mo)("w3m-update-email-wallet-view")],y);let F=class extends g{constructor(){var e;super(),e=this,this.email=c.RouterController.state.data?.email,this.onOtpSubmit=function(){var t=(0,p.Z)(function*(n){try{e.authConnector&&(yield e.authConnector.provider.updateEmailPrimaryOtp({otp:n}),m.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),c.RouterController.replace("UpdateEmailSecondaryOtp",c.RouterController.state.data))}catch(o){throw m.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:b.j.parseError(o)}}),o}});return function(n){return t.apply(this,arguments)}}(),this.onStartOver=()=>{c.RouterController.replace("UpdateEmailWallet",c.RouterController.state.data)}}};F=function(l,e,t,n){var r,o=arguments.length,i=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,t):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(l,e,t,n);else for(var s=l.length-1;s>=0;s--)(r=l[s])&&(i=(o<3?r(i):o>3?r(e,t,i):r(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i}([(0,f.Mo)("w3m-update-email-primary-otp-view")],F);let M=class extends g{constructor(){var e;super(),e=this,this.email=c.RouterController.state.data?.newEmail,this.redirectView=c.RouterController.state.data?.redirectView,this.onOtpSubmit=function(){var t=(0,p.Z)(function*(n){try{e.authConnector&&(yield e.authConnector.provider.updateEmailSecondaryOtp({otp:n}),m.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),e.redirectView&&c.RouterController.reset(e.redirectView))}catch(o){throw m.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:b.j.parseError(o)}}),o}});return function(n){return t.apply(this,arguments)}}(),this.onStartOver=()=>{c.RouterController.replace("UpdateEmailWallet",c.RouterController.state.data)}}};M=function(l,e,t,n){var r,o=arguments.length,i=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,t):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(l,e,t,n);else for(var s=l.length-1;s>=0;s--)(r=l[s])&&(i=(o<3?r(i):o>3?r(e,t,i):r(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i}([(0,f.Mo)("w3m-update-email-secondary-otp-view")],M);var oe=a(86450),re=a(98673),H=function(l,e,t,n){var r,o=arguments.length,i=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,t):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(l,e,t,n);else for(var s=l.length-1;s>=0;s--)(r=l[s])&&(i=(o<3?r(i):o>3?r(e,t,i):r(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};let D=class extends u.oi{constructor(){super(),this.authConnector=h.ConnectorController.getAuthConnector(),this.isEmailEnabled=x.OptionsController.state.remoteFeatures?.email,this.isAuthEnabled=this.checkIfAuthEnabled(h.ConnectorController.state.connectors),this.connectors=h.ConnectorController.state.connectors,h.ConnectorController.subscribeKey("connectors",e=>{this.connectors=e,this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors)})}render(){if(!this.isEmailEnabled)throw new Error("w3m-email-login-view: Email is not enabled");if(!this.isAuthEnabled)throw new Error("w3m-email-login-view: No auth connector provided");return u.dy`<wui-flex
      flexDirection="column"
      .padding=${["3xs","m","m","m"]}
      gap="l"
    >
      <w3m-email-login-widget></w3m-email-login-widget>
    </wui-flex> `}checkIfAuthEnabled(e){const t=e.filter(o=>o.type===re.b.CONNECTOR_TYPE_AUTH).map(o=>o.chain);return oe.b.AUTH_CONNECTOR_SUPPORTED_CHAINS.some(o=>t.includes(o))}};H([(0,d.SB)()],D.prototype,"connectors",void 0),D=H([(0,f.Mo)("w3m-email-login-view")],D)},6500:(P,C,a)=>{a(87538)},88198:(P,C,a)=>{var p=a(59799),m=a(86523),T=a(23107),x=(a(10831),a(25518)),$=a(70075);const b=p.iv`
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
`;var f=function(d,c,h,v){var O,I=arguments.length,w=I<3?c:null===v?v=Object.getOwnPropertyDescriptor(c,h):v;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)w=Reflect.decorate(d,c,h,v);else for(var _=d.length-1;_>=0;_--)(O=d[_])&&(w=(I<3?O(w):I>3?O(c,h,w):O(c,h))||w);return I>3&&w&&Object.defineProperty(c,h,w),w};let u=class extends p.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return p.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,T.o)(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};u.styles=[x.ET,x.ZM,b],f([(0,m.Cb)()],u.prototype,"tabIdx",void 0),f([(0,m.Cb)({type:Boolean})],u.prototype,"disabled",void 0),f([(0,m.Cb)()],u.prototype,"color",void 0),u=f([(0,$.M)("wui-link")],u)},30189:(P,C,a)=>{a(78549)}}]);