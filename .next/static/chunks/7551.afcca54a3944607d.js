"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7551],{87551:function(e,t,i){i.r(t),i.d(t,{W3mEmailLoginView:function(){return U},W3mEmailVerifyDeviceView:function(){return S},W3mEmailVerifyOtpView:function(){return A},W3mUpdateEmailPrimaryOtpView:function(){return N},W3mUpdateEmailSecondaryOtpView:function(){return L},W3mUpdateEmailWalletView:function(){return j}});var r=i(2706),o=i(86321),n=i(556),a=i(86126),l=i(91368),s=i(77405),c=i(25721),u=i(23704),d=i(93907),p=i(44920),h=i(30077),m=i(44984);i(52042),i(42255),i(40442),i(55802);var f=i(17770),w=i(57172),g=i(66501),v=p.iv`
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
`,b=function(e,t,i,r){var o,n=arguments.length,a=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let y=class extends p.oi{constructor(){super(...arguments),this.disabled=!1,this.value=""}render(){return p.dy`<input
      type="number"
      maxlength="1"
      inputmode="numeric"
      autofocus
      ?disabled=${this.disabled}
      value=${this.value}
    /> `}};y.styles=[f.ET,f.ZM,v],b([(0,h.Cb)({type:Boolean})],y.prototype,"disabled",void 0),b([(0,h.Cb)({type:String})],y.prototype,"value",void 0),y=b([(0,g.M)("wui-input-numeric")],y);var x=p.iv`
  :host {
    position: relative;
    display: block;
  }
`,E=function(e,t,i,r){var o,n=arguments.length,a=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let I=class extends p.oi{constructor(){super(...arguments),this.length=6,this.otp="",this.values=Array.from({length:this.length}).map(()=>""),this.numerics=[],this.shouldInputBeEnabled=e=>{let t=this.values.slice(0,e);return t.every(e=>""!==e)},this.handleKeyDown=(e,t)=>{let i=e.target,r=this.getInputElement(i);if(!r)return;["ArrowLeft","ArrowRight","Shift","Delete"].includes(e.key)&&e.preventDefault();let o=r.selectionStart;switch(e.key){case"ArrowLeft":o&&r.setSelectionRange(o+1,o+1),this.focusInputField("prev",t);break;case"ArrowRight":case"Shift":this.focusInputField("next",t);break;case"Delete":case"Backspace":""===r.value?this.focusInputField("prev",t):this.updateInput(r,t,"")}},this.focusInputField=(e,t)=>{if("next"===e){let e=t+1;if(!this.shouldInputBeEnabled(e))return;let i=this.numerics[e<this.length?e:t],r=i?this.getInputElement(i):void 0;r&&(r.disabled=!1,r.focus())}if("prev"===e){let e=t-1,i=this.numerics[e>-1?e:t],r=i?this.getInputElement(i):void 0;r&&r.focus()}}}firstUpdated(){this.otp&&(this.values=this.otp.split(""));let e=this.shadowRoot?.querySelectorAll("wui-input-numeric");e&&(this.numerics=Array.from(e)),this.numerics[0]?.focus()}render(){return p.dy`
      <wui-flex gap="xxs" data-testid="wui-otp-input">
        ${Array.from({length:this.length}).map((e,t)=>p.dy`
            <wui-input-numeric
              @input=${e=>this.handleInput(e,t)}
              @click=${e=>this.selectInput(e)}
              @keydown=${e=>this.handleKeyDown(e,t)}
              .disabled=${!this.shouldInputBeEnabled(t)}
              .value=${this.values[t]||""}
            >
            </wui-input-numeric>
          `)}
      </wui-flex>
    `}updateInput(e,t,i){let r=this.numerics[t],o=e||(r?this.getInputElement(r):void 0);o&&(o.value=i,this.values=this.values.map((e,r)=>r===t?i:e))}selectInput(e){let t=e.target;if(t){let e=this.getInputElement(t);e?.select()}}handleInput(e,t){let i=e.target,r=this.getInputElement(i);if(r){let i=r.value;if("insertFromPaste"===e.inputType)this.handlePaste(r,i,t);else{let o=w.H.isNumber(i);o&&e.data?(this.updateInput(r,t,e.data),this.focusInputField("next",t)):this.updateInput(r,t,"")}}this.dispatchInputChangeEvent()}handlePaste(e,t,i){let r=t[0],o=r&&w.H.isNumber(r);if(o){this.updateInput(e,i,r);let o=t.substring(1);if(i+1<this.length&&o.length){let e=this.numerics[i+1],t=e?this.getInputElement(e):void 0;t&&this.handlePaste(t,o,i+1)}else this.focusInputField("next",i)}else this.updateInput(e,i,"")}getInputElement(e){return e.shadowRoot?.querySelector("input")?e.shadowRoot.querySelector("input"):null}dispatchInputChangeEvent(){let e=this.values.join("");this.dispatchEvent(new CustomEvent("inputChange",{detail:e,bubbles:!0,composed:!0}))}};I.styles=[f.ET,x],E([(0,h.Cb)({type:Number})],I.prototype,"length",void 0),E([(0,h.Cb)({type:String})],I.prototype,"otp",void 0),E([(0,h.SB)()],I.prototype,"values",void 0),I=E([(0,g.M)("wui-otp")],I),i(93595);var C=i(80924),O=p.iv`
  wui-loading-spinner {
    margin: 9px auto;
  }

  .email-display,
  .email-display wui-text {
    max-width: 100%;
  }
`,R=function(e,t,i,r){var o,n=arguments.length,a=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let k=class extends p.oi{firstUpdated(){this.startOTPTimeout()}disconnectedCallback(){clearTimeout(this.OTPTimeout)}constructor(){super(),this.loading=!1,this.timeoutTimeLeft=C.$.getTimeToNextEmailLogin(),this.error="",this.otp="",this.email=s.P.state.data?.email,this.authConnector=m.A.getAuthConnector()}render(){if(!this.email)throw Error("w3m-email-otp-widget: No email provided");let e=!!this.timeoutTimeLeft,t=this.getFooterLabels(e);return p.dy`
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

        ${this.loading?p.dy`<wui-loading-spinner size="xl" color="accent-100"></wui-loading-spinner>`:p.dy` <wui-flex flexDirection="column" alignItems="center" gap="xs">
              <wui-otp
                dissabled
                length="6"
                @inputChange=${this.onOtpInputChange.bind(this)}
                .otp=${this.otp}
              ></wui-otp>
              ${this.error?p.dy`
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
    `}startOTPTimeout(){this.timeoutTimeLeft=C.$.getTimeToNextEmailLogin(),this.OTPTimeout=setInterval(()=>{this.timeoutTimeLeft>0?this.timeoutTimeLeft=C.$.getTimeToNextEmailLogin():clearInterval(this.OTPTimeout)},1e3)}async onOtpInputChange(e){try{!this.loading&&(this.otp=e.detail,this.authConnector&&6===this.otp.length&&(this.loading=!0,await this.onOtpSubmit?.(this.otp)))}catch(e){this.error=u.j.parseError(e),this.loading=!1}}async onResendCode(){try{if(this.onOtpResend){if(!this.loading&&!this.timeoutTimeLeft){this.error="",this.otp="";let e=m.A.getAuthConnector();if(!e||!this.email)throw Error("w3m-email-otp-widget: Unable to resend email");this.loading=!0,await this.onOtpResend(this.email),this.startOTPTimeout(),c.K.showSuccess("Code email resent")}}else this.onStartOver&&this.onStartOver()}catch(e){c.K.showError(e)}finally{this.loading=!1}}getFooterLabels(e){return this.onStartOver?{title:"Something wrong?",action:`Try again ${e?`in ${this.timeoutTimeLeft}s`:""}`}:{title:"Didn't receive it?",action:`Resend ${e?`in ${this.timeoutTimeLeft}s`:"Code"}`}}};k.styles=O,R([(0,h.SB)()],k.prototype,"loading",void 0),R([(0,h.SB)()],k.prototype,"timeoutTimeLeft",void 0),R([(0,h.SB)()],k.prototype,"error",void 0),k=R([(0,d.Mo)("w3m-email-otp-widget")],k);let A=class extends k{constructor(){super(...arguments),this.onOtpSubmit=async e=>{try{if(this.authConnector){let t=r.R.state.activeChain,i=o.l.getConnections(t),u=n.h.state.remoteFeatures?.multiWallet,d=i.length>0;if(await this.authConnector.provider.connectOtp({otp:e}),a.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),t)await o.l.connectExternal(this.authConnector,t);else throw Error("Active chain is not set on ChainControll");a.X.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"email",name:this.authConnector.name||"Unknown",caipNetworkId:r.R.getActiveCaipNetwork()?.caipNetworkId}}),n.h.state.siwx?l.I.close():d&&u?(s.P.replace("ProfileWallets"),c.K.showSuccess("New Wallet Added")):l.I.close()}}catch(e){throw a.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:u.j.parseError(e)}}),e}},this.onOtpResend=async e=>{this.authConnector&&(await this.authConnector.provider.connectEmail({email:e}),a.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}))}}};A=function(e,t,i,r){var o,n=arguments.length,a=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a}([(0,d.Mo)("w3m-email-verify-otp-view")],A),i(2065);var P=p.iv`
  wui-icon-box {
    height: var(--wui-icon-box-size-xl);
    width: var(--wui-icon-box-size-xl);
  }
`,T=function(e,t,i,r){var o,n=arguments.length,a=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let S=class extends p.oi{constructor(){super(),this.email=s.P.state.data?.email,this.authConnector=m.A.getAuthConnector(),this.loading=!1,this.listenForDeviceApproval()}render(){if(!this.email)throw Error("w3m-email-verify-device-view: No email provided");if(!this.authConnector)throw Error("w3m-email-verify-device-view: No auth connector provided");return p.dy`
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
    `}async listenForDeviceApproval(){if(this.authConnector)try{await this.authConnector.provider.connectDevice(),a.X.sendEvent({type:"track",event:"DEVICE_REGISTERED_FOR_EMAIL"}),a.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),s.P.replace("EmailVerifyOtp",{email:this.email})}catch(e){s.P.goBack()}}async onResendCode(){try{if(!this.loading){if(!this.authConnector||!this.email)throw Error("w3m-email-login-widget: Unable to resend email");this.loading=!0,await this.authConnector.provider.connectEmail({email:this.email}),this.listenForDeviceApproval(),c.K.showSuccess("Code email resent")}}catch(e){c.K.showError(e)}finally{this.loading=!1}}};S.styles=P,T([(0,h.SB)()],S.prototype,"loading",void 0),S=T([(0,d.Mo)("w3m-email-verify-device-view")],S);var $=i(91308);i(24863),i(46336);var D=p.iv`
  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }
`,_=function(e,t,i,r){var o,n=arguments.length,a=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let j=class extends p.oi{constructor(){super(...arguments),this.formRef=(0,$.V)(),this.initialEmail=s.P.state.data?.email??"",this.redirectView=s.P.state.data?.redirectView,this.email="",this.loading=!1}firstUpdated(){this.formRef.value?.addEventListener("keydown",e=>{"Enter"===e.key&&this.onSubmitEmail(e)})}render(){return p.dy`
      <wui-flex flexDirection="column" padding="m" gap="m">
        <form ${(0,$.i)(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
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
    `}onEmailInputChange(e){this.email=e.detail}async onSubmitEmail(e){try{if(this.loading)return;this.loading=!0,e.preventDefault();let t=m.A.getAuthConnector();if(!t)throw Error("w3m-update-email-wallet: Auth connector not found");let i=await t.provider.updateEmail({email:this.email});a.X.sendEvent({type:"track",event:"EMAIL_EDIT"}),"VERIFY_SECONDARY_OTP"===i.action?s.P.push("UpdateEmailSecondaryOtp",{email:this.initialEmail,newEmail:this.email,redirectView:this.redirectView}):s.P.push("UpdateEmailPrimaryOtp",{email:this.initialEmail,newEmail:this.email,redirectView:this.redirectView})}catch(e){c.K.showError(e),this.loading=!1}}buttonsTemplate(){let e=!this.loading&&this.email.length>3&&this.email!==this.initialEmail;return this.redirectView?p.dy`
      <wui-flex gap="s">
        <wui-button size="md" variant="neutral" fullWidth @click=${s.P.goBack}>
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
    `:p.dy`
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
      `}};j.styles=D,_([(0,h.SB)()],j.prototype,"email",void 0),_([(0,h.SB)()],j.prototype,"loading",void 0),j=_([(0,d.Mo)("w3m-update-email-wallet-view")],j);let N=class extends k{constructor(){super(),this.email=s.P.state.data?.email,this.onOtpSubmit=async e=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailPrimaryOtp({otp:e}),a.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),s.P.replace("UpdateEmailSecondaryOtp",s.P.state.data))}catch(e){throw a.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:u.j.parseError(e)}}),e}},this.onStartOver=()=>{s.P.replace("UpdateEmailWallet",s.P.state.data)}}};N=function(e,t,i,r){var o,n=arguments.length,a=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a}([(0,d.Mo)("w3m-update-email-primary-otp-view")],N);let L=class extends k{constructor(){super(),this.email=s.P.state.data?.newEmail,this.redirectView=s.P.state.data?.redirectView,this.onOtpSubmit=async e=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailSecondaryOtp({otp:e}),a.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),this.redirectView&&s.P.reset(this.redirectView))}catch(e){throw a.X.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:u.j.parseError(e)}}),e}},this.onStartOver=()=>{s.P.replace("UpdateEmailWallet",s.P.state.data)}}};L=function(e,t,i,r){var o,n=arguments.length,a=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a}([(0,d.Mo)("w3m-update-email-secondary-otp-view")],L);var V=i(16541),F=i(27577),M=function(e,t,i,r){var o,n=arguments.length,a=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let U=class extends p.oi{constructor(){super(),this.authConnector=m.A.getAuthConnector(),this.isEmailEnabled=n.h.state.remoteFeatures?.email,this.isAuthEnabled=this.checkIfAuthEnabled(m.A.state.connectors),this.connectors=m.A.state.connectors,m.A.subscribeKey("connectors",e=>{this.connectors=e,this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors)})}render(){if(!this.isEmailEnabled)throw Error("w3m-email-login-view: Email is not enabled");if(!this.isAuthEnabled)throw Error("w3m-email-login-view: No auth connector provided");return p.dy`<wui-flex
      flexDirection="column"
      .padding=${["3xs","m","m","m"]}
      gap="l"
    >
      <w3m-email-login-widget></w3m-email-login-widget>
    </wui-flex> `}checkIfAuthEnabled(e){let t=e.filter(e=>e.type===F.b.CONNECTOR_TYPE_AUTH).map(e=>e.chain),i=V.b.AUTH_CONNECTOR_SUPPORTED_CHAINS;return i.some(e=>t.includes(e))}};M([(0,h.SB)()],U.prototype,"connectors",void 0),U=M([(0,d.Mo)("w3m-email-login-view")],U)},46336:function(e,t,i){var r=i(44920),o=i(30077),n=i(52608);i(99671);var a=i(17770),l=i(66501);i(14619);var s=r.iv`
  :host {
    position: relative;
    display: inline-block;
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`,c=function(e,t,i,r){var o,n=arguments.length,a=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let u=class extends r.oi{constructor(){super(...arguments),this.disabled=!1}render(){return r.dy`
      <wui-input-text
        type="email"
        placeholder="Email"
        icon="mail"
        size="mdl"
        .disabled=${this.disabled}
        .value=${this.value}
        data-testid="wui-email-input"
        tabIdx=${(0,n.o)(this.tabIdx)}
      ></wui-input-text>
      ${this.templateError()}
    `}templateError(){return this.errorMessage?r.dy`<wui-text variant="tiny-500" color="error-100">${this.errorMessage}</wui-text>`:null}};u.styles=[a.ET,s],c([(0,o.Cb)()],u.prototype,"errorMessage",void 0),c([(0,o.Cb)({type:Boolean})],u.prototype,"disabled",void 0),c([(0,o.Cb)()],u.prototype,"value",void 0),c([(0,o.Cb)()],u.prototype,"tabIdx",void 0),u=c([(0,l.M)("wui-email-input")],u)},2065:function(e,t,i){i(42559)},42255:function(e,t,i){var r=i(44920),o=i(30077),n=i(52608);i(99671);var a=i(17770),l=i(66501),s=r.iv`
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
`,c=function(e,t,i,r){var o,n=arguments.length,a=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(a=(n<3?o(a):n>3?o(t,i,a):o(t,i))||a);return n>3&&a&&Object.defineProperty(t,i,a),a};let u=class extends r.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return r.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,n.o)(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};u.styles=[a.ET,a.ZM,s],c([(0,o.Cb)()],u.prototype,"tabIdx",void 0),c([(0,o.Cb)({type:Boolean})],u.prototype,"disabled",void 0),c([(0,o.Cb)()],u.prototype,"color",void 0),u=c([(0,l.M)("wui-link")],u)},40442:function(e,t,i){i(54521)}}]);