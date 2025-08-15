(self.webpackChunkangular=self.webpackChunkangular||[]).push([[8592],{46915:(C,g,t)=>{"use strict";function e(a){var h,y,d="";if("string"==typeof a||"number"==typeof a)d+=a;else if("object"==typeof a)if(Array.isArray(a))for(h=0;h<a.length;h++)a[h]&&(y=e(a[h]))&&(d&&(d+=" "),d+=y);else for(h in a)a[h]&&(d&&(d+=" "),d+=h);return d}function u(){for(var a,h,y=0,d="";y<arguments.length;)(a=arguments[y++])&&(h=e(a))&&(d&&(d+=" "),d+=h);return d}t.r(g),t.d(g,{clsx:()=>u,default:()=>f});const f=u},30890:C=>{var g=1e3,t=60*g,e=60*t,u=24*e,f=7*u,a=365.25*u;function v(l,i,o,r){var n=i>=1.5*o;return Math.round(l/o)+" "+r+(n?"s":"")}C.exports=function(l,i){i=i||{};var o=typeof l;if("string"===o&&l.length>0)return function h(l){if(l=String(l),!(l.length>100)){var i=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(l);if(i){var o=parseFloat(i[1]);switch((i[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return o*a;case"weeks":case"week":case"w":return o*f;case"days":case"day":case"d":return o*u;case"hours":case"hour":case"hrs":case"hr":case"h":return o*e;case"minutes":case"minute":case"mins":case"min":case"m":return o*t;case"seconds":case"second":case"secs":case"sec":case"s":return o*g;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return o;default:return}}}}(l);if("number"===o&&isFinite(l))return i.long?function d(l){var i=Math.abs(l);return i>=u?v(l,i,u,"day"):i>=e?v(l,i,e,"hour"):i>=t?v(l,i,t,"minute"):i>=g?v(l,i,g,"second"):l+" ms"}(l):function y(l){var i=Math.abs(l);return i>=u?Math.round(l/u)+"d":i>=e?Math.round(l/e)+"h":i>=t?Math.round(l/t)+"m":i>=g?Math.round(l/g)+"s":l+"ms"}(l);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(l))}},20563:(C,g,t)=>{g.formatArgs=function u(d){if(d[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+d[0]+(this.useColors?"%c ":" ")+"+"+C.exports.humanize(this.diff),!this.useColors)return;const v="color: "+this.color;d.splice(1,0,v,"color: inherit");let l=0,i=0;d[0].replace(/%[a-zA-Z%]/g,o=>{"%%"!==o&&(l++,"%c"===o&&(i=l))}),d.splice(i,0,v)},g.save=function f(d){try{d?g.storage.setItem("debug",d):g.storage.removeItem("debug")}catch{}},g.load=function a(){let d;try{d=g.storage.getItem("debug")}catch{}return!d&&typeof process<"u"&&"env"in process&&(d=process.env.DEBUG),d},g.useColors=function e(){return!(!(typeof window<"u"&&window.process)||"renderer"!==window.process.type&&!window.process.__nwjs)||!(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&(typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},g.storage=function h(){try{return localStorage}catch{}}(),g.destroy=(()=>{let d=!1;return()=>{d||(d=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),g.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],g.log=console.debug||console.log||(()=>{}),C.exports=t(56018)(g);const{formatters:y}=C.exports;y.j=function(d){try{return JSON.stringify(d)}catch(v){return"[UnexpectedJSONParseError]: "+v.message}}},56018:(C,g,t)=>{C.exports=function e(u){function a(r){let n,c,w,s=null;function m(...p){if(!m.enabled)return;const b=m,_=Number(new Date),E=_-(n||_);b.diff=E,b.prev=n,b.curr=_,n=_,p[0]=a.coerce(p[0]),"string"!=typeof p[0]&&p.unshift("%O");let R=0;p[0]=p[0].replace(/%([a-zA-Z%])/g,(S,x)=>{if("%%"===S)return"%";R++;const T=a.formatters[x];if("function"==typeof T){const F=p[R];S=T.call(b,F),p.splice(R,1),R--}return S}),a.formatArgs.call(b,p),(b.log||a.log).apply(b,p)}return m.namespace=r,m.useColors=a.useColors(),m.color=a.selectColor(r),m.extend=h,m.destroy=a.destroy,Object.defineProperty(m,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==s?s:(c!==a.namespaces&&(c=a.namespaces,w=a.enabled(r)),w),set:p=>{s=p}}),"function"==typeof a.init&&a.init(m),m}function h(r,n){const s=a(this.namespace+(typeof n>"u"?":":n)+r);return s.log=this.log,s}function l(r){return r.toString().substring(2,r.toString().length-2).replace(/\.\*\?$/,"*")}return a.debug=a,a.default=a,a.coerce=function i(r){return r instanceof Error?r.stack||r.message:r},a.disable=function d(){const r=[...a.names.map(l),...a.skips.map(l).map(n=>"-"+n)].join(",");return a.enable(""),r},a.enable=function y(r){let n;a.save(r),a.namespaces=r,a.names=[],a.skips=[];const s=("string"==typeof r?r:"").split(/[\s,]+/),c=s.length;for(n=0;n<c;n++)s[n]&&("-"===(r=s[n].replace(/\*/g,".*?"))[0]?a.skips.push(new RegExp("^"+r.slice(1)+"$")):a.names.push(new RegExp("^"+r+"$")))},a.enabled=function v(r){if("*"===r[r.length-1])return!0;let n,s;for(n=0,s=a.skips.length;n<s;n++)if(a.skips[n].test(r))return!1;for(n=0,s=a.names.length;n<s;n++)if(a.names[n].test(r))return!0;return!1},a.humanize=t(30890),a.destroy=function o(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(u).forEach(r=>{a[r]=u[r]}),a.names=[],a.skips=[],a.formatters={},a.selectColor=function f(r){let n=0;for(let s=0;s<r.length;s++)n=(n<<5)-n+r.charCodeAt(s),n|=0;return a.colors[Math.abs(n)%a.colors.length]},a.enable(a.load()),a}},17170:(C,g,t)=>{"use strict";t.d(g,{U:()=>e});const e={URLS:{FAQ:"https://walletconnect.com/faq"}}},43695:(C,g,t)=>{"use strict";t.d(g,{f:()=>y});var e=t(24688),u=t(99071),f=t(34198);const a=(0,e.sj)({message:"",open:!1,triggerRect:{width:0,height:0,top:0,left:0},variant:"shade"}),h={state:a,subscribe:d=>(0,e.Ld)(a,()=>d(a)),subscribeKey:(d,v)=>(0,u.VW)(a,d,v),showTooltip({message:d,triggerRect:v,variant:l}){a.open=!0,a.message=d,a.triggerRect=v,a.variant=l},hide(){a.open=!1,a.message="",a.triggerRect={width:0,height:0,top:0,left:0}}},y=(0,f.P)(h)},39168:(C,g,t)=>{"use strict";t.d(g,{y0:()=>w});var e=t(49671),u=t(86450),f=t(22917),a=t(20597),h=t(86424),y=t(79282),d=t(24380),v=t(76169),l=t(18445),i=t(22429);function n(){return(n=(0,e.Z)(function*(){d.RouterController.push("ConnectingFarcaster");const p=h.ConnectorController.getAuthConnector();if(p&&!f.AccountController.state.farcasterUrl)try{const{url:b}=yield p.provider.getFarcasterUri();f.AccountController.setFarcasterUrl(b,a.R.state.activeChain)}catch(b){d.RouterController.goBack(),v.SnackController.showError(b)}})).apply(this,arguments)}function c(){return(c=(0,e.Z)(function*(p){d.RouterController.push("ConnectingSocial");const b=h.ConnectorController.getAuthConnector();let _=null;try{const E=setTimeout(()=>{throw new Error("Social login timed out. Please try again.")},45e3);if(b&&p){if(l.j.isTelegram()||(_=function o(){try{return l.j.returnOpenHref(`${u.b.SECURE_SITE_SDK_ORIGIN}/loading`,"popupWindow","width=600,height=800,scrollbars=yes")}catch{throw new Error("Could not open social popup")}}()),_)f.AccountController.setSocialWindow(_,a.R.state.activeChain);else if(!l.j.isTelegram())throw new Error("Could not create social popup");const{uri:R}=yield b.provider.getSocialRedirectUri({provider:p});if(!R)throw _?.close(),new Error("Could not fetch the social redirect uri");if(_&&(_.location.href=R),l.j.isTelegram()){i.M.setTelegramSocialProvider(p);const O=l.j.formatTelegramSocialLoginUrl(R);l.j.openHref(O,"_top")}clearTimeout(E)}}catch(E){_?.close(),v.SnackController.showError(E?.message)}})).apply(this,arguments)}function w(p){return m.apply(this,arguments)}function m(){return m=(0,e.Z)(function*(p){f.AccountController.setSocialProvider(p,a.R.state.activeChain),y.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_STARTED",properties:{provider:p}}),"farcaster"===p?yield function r(){return n.apply(this,arguments)}():yield function s(p){return c.apply(this,arguments)}(p)}),m.apply(this,arguments)}},48788:(C,g,t)=>{"use strict";t.d(g,{A:()=>l});var e=t(59799),u=t(86523),f=t(24380),a=t(43695),h=t(50860),y=t(37847);const d=e.iv`
  :host {
    --prev-height: 0px;
    --new-height: 0px;
    display: block;
  }

  div.w3m-router-container {
    transform: translateY(0);
    opacity: 1;
  }

  div.w3m-router-container[view-direction='prev'] {
    animation:
      slide-left-out 150ms forwards ease,
      slide-left-in 150ms forwards ease;
    animation-delay: 0ms, 200ms;
  }

  div.w3m-router-container[view-direction='next'] {
    animation:
      slide-right-out 150ms forwards ease,
      slide-right-in 150ms forwards ease;
    animation-delay: 0ms, 200ms;
  }

  @keyframes slide-left-out {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(10px);
      opacity: 0;
    }
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-right-out {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(-10px);
      opacity: 0;
    }
  }

  @keyframes slide-right-in {
    from {
      transform: translateX(10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;var v=function(i,o,r,n){var w,s=arguments.length,c=s<3?o:null===n?n=Object.getOwnPropertyDescriptor(o,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(i,o,r,n);else for(var m=i.length-1;m>=0;m--)(w=i[m])&&(c=(s<3?w(c):s>3?w(o,r,c):w(o,r))||c);return s>3&&c&&Object.defineProperty(o,r,c),c};let l=class extends e.oi{constructor(){super(),this.resizeObserver=void 0,this.prevHeight="0px",this.prevHistoryLength=1,this.unsubscribe=[],this.view=f.RouterController.state.view,this.viewDirection="",this.unsubscribe.push(f.RouterController.subscribeKey("view",o=>this.onViewChange(o)))}firstUpdated(){this.resizeObserver=new ResizeObserver(([o])=>{const r=`${o?.contentRect.height}px`;"0px"!==this.prevHeight&&(this.style.setProperty("--prev-height",this.prevHeight),this.style.setProperty("--new-height",r),this.style.animation="w3m-view-height 150ms forwards ease",this.style.height="auto"),setTimeout(()=>{this.prevHeight=r,this.style.animation="unset"},y.b.ANIMATION_DURATIONS.ModalHeight)}),this.resizeObserver?.observe(this.getWrapper())}disconnectedCallback(){this.resizeObserver?.unobserve(this.getWrapper()),this.unsubscribe.forEach(o=>o())}render(){return e.dy`<div class="w3m-router-container" view-direction="${this.viewDirection}">
      ${this.viewTemplate()}
    </div>`}viewTemplate(){switch(this.view){case"AccountSettings":return e.dy`<w3m-account-settings-view></w3m-account-settings-view>`;case"Account":return e.dy`<w3m-account-view></w3m-account-view>`;case"AllWallets":return e.dy`<w3m-all-wallets-view></w3m-all-wallets-view>`;case"ApproveTransaction":return e.dy`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;case"BuyInProgress":return e.dy`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;case"ChooseAccountName":return e.dy`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;case"Connect":default:return e.dy`<w3m-connect-view></w3m-connect-view>`;case"Create":return e.dy`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;case"ConnectingWalletConnect":return e.dy`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;case"ConnectingWalletConnectBasic":return e.dy`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;case"ConnectingExternal":return e.dy`<w3m-connecting-external-view></w3m-connecting-external-view>`;case"ConnectingSiwe":return e.dy`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;case"ConnectWallets":return e.dy`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;case"ConnectSocials":return e.dy`<w3m-connect-socials-view></w3m-connect-socials-view>`;case"ConnectingSocial":return e.dy`<w3m-connecting-social-view></w3m-connecting-social-view>`;case"Downloads":return e.dy`<w3m-downloads-view></w3m-downloads-view>`;case"EmailLogin":return e.dy`<w3m-email-login-view></w3m-email-login-view>`;case"EmailVerifyOtp":return e.dy`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;case"EmailVerifyDevice":return e.dy`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;case"GetWallet":return e.dy`<w3m-get-wallet-view></w3m-get-wallet-view>`;case"Networks":return e.dy`<w3m-networks-view></w3m-networks-view>`;case"SwitchNetwork":return e.dy`<w3m-network-switch-view></w3m-network-switch-view>`;case"Profile":return e.dy`<w3m-profile-view></w3m-profile-view>`;case"SwitchAddress":return e.dy`<w3m-switch-address-view></w3m-switch-address-view>`;case"Transactions":return e.dy`<w3m-transactions-view></w3m-transactions-view>`;case"OnRampProviders":return e.dy`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;case"OnRampActivity":return e.dy`<w3m-onramp-activity-view></w3m-onramp-activity-view>`;case"OnRampTokenSelect":return e.dy`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;case"OnRampFiatSelect":return e.dy`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;case"UpgradeEmailWallet":return e.dy`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;case"UpdateEmailWallet":return e.dy`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;case"UpdateEmailPrimaryOtp":return e.dy`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;case"UpdateEmailSecondaryOtp":return e.dy`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;case"UnsupportedChain":return e.dy`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;case"Swap":return e.dy`<w3m-swap-view></w3m-swap-view>`;case"SwapSelectToken":return e.dy`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;case"SwapPreview":return e.dy`<w3m-swap-preview-view></w3m-swap-preview-view>`;case"WalletSend":return e.dy`<w3m-wallet-send-view></w3m-wallet-send-view>`;case"WalletSendSelectToken":return e.dy`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;case"WalletSendPreview":return e.dy`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;case"WhatIsABuy":return e.dy`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;case"WalletReceive":return e.dy`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;case"WalletCompatibleNetworks":return e.dy`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;case"WhatIsAWallet":return e.dy`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;case"ConnectingMultiChain":return e.dy`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;case"WhatIsANetwork":return e.dy`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;case"ConnectingFarcaster":return e.dy`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;case"SwitchActiveChain":return e.dy`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;case"RegisterAccountName":return e.dy`<w3m-register-account-name-view></w3m-register-account-name-view>`;case"RegisterAccountNameSuccess":return e.dy`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;case"SmartSessionCreated":return e.dy`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;case"SmartSessionList":return e.dy`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;case"SIWXSignMessage":return e.dy`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`;case"Pay":return e.dy`<w3m-pay-view></w3m-pay-view>`;case"PayLoading":return e.dy`<w3m-pay-loading-view></w3m-pay-loading-view>`}}onViewChange(o){a.f.hide();let r=y.b.VIEW_DIRECTION.Next;const{history:n}=f.RouterController.state;n.length<this.prevHistoryLength&&(r=y.b.VIEW_DIRECTION.Prev),this.prevHistoryLength=n.length,this.viewDirection=r,setTimeout(()=>{this.view=o},y.b.ANIMATION_DURATIONS.ViewTransition)}getWrapper(){return this.shadowRoot?.querySelector("div")}};l.styles=d,v([(0,u.SB)()],l.prototype,"view",void 0),v([(0,u.SB)()],l.prototype,"viewDirection",void 0),l=v([(0,h.Mo)("w3m-router")],l)},33223:(C,g,t)=>{"use strict";var e=t(59799),u=t(86523),f=t(43695),a=t(24380),h=t(57745),y=t(50860);const d=e.iv`
  :host {
    width: 100%;
    display: block;
  }
`;var v=function(i,o,r,n){var w,s=arguments.length,c=s<3?o:null===n?n=Object.getOwnPropertyDescriptor(o,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(i,o,r,n);else for(var m=i.length-1;m>=0;m--)(w=i[m])&&(c=(s<3?w(c):s>3?w(o,r,c):w(o,r))||c);return s>3&&c&&Object.defineProperty(o,r,c),c};let l=class extends e.oi{constructor(){super(),this.unsubscribe=[],this.text="",this.open=f.f.state.open,this.unsubscribe.push(a.RouterController.subscribeKey("view",()=>{f.f.hide()}),h.I.subscribeKey("open",o=>{o||f.f.hide()}),f.f.subscribeKey("open",o=>{this.open=o}))}disconnectedCallback(){this.unsubscribe.forEach(o=>o()),f.f.hide()}render(){return e.dy`
      <div
        @pointermove=${this.onMouseEnter.bind(this)}
        @pointerleave=${this.onMouseLeave.bind(this)}
      >
        ${this.renderChildren()}
      </div>
    `}renderChildren(){return e.dy`<slot></slot> `}onMouseEnter(){const o=this.getBoundingClientRect();this.open||f.f.showTooltip({message:this.text,triggerRect:{width:o.width,height:o.height,left:o.left,top:o.top},variant:"shade"})}onMouseLeave(o){this.contains(o.relatedTarget)||f.f.hide()}};l.styles=[d],v([(0,u.Cb)()],l.prototype,"text",void 0),v([(0,u.SB)()],l.prototype,"open",void 0),l=v([(0,y.Mo)("w3m-tooltip-trigger")],l)},62700:(C,g,t)=>{"use strict";var e=t(59799),u=t(86523),f=t(43695),a=t(50860);t(937),t(51078),t(54575);const v=e.iv`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    color: var(--wui-color-bg-100);
    position: fixed;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--w3m-modal-width) - var(--wui-spacing-xl));
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: var(--wui-color-bg-150);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: var(--wui-color-fg-150);
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: var(--wui-color-fg-100);
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: var(--wui-color-bg-150);
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
`;var l=function(o,r,n,s){var m,c=arguments.length,w=c<3?r:null===s?s=Object.getOwnPropertyDescriptor(r,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)w=Reflect.decorate(o,r,n,s);else for(var p=o.length-1;p>=0;p--)(m=o[p])&&(w=(c<3?m(w):c>3?m(r,n,w):m(r,n))||w);return c>3&&w&&Object.defineProperty(r,n,w),w};let i=class extends e.oi{constructor(){super(),this.unsubscribe=[],this.open=f.f.state.open,this.message=f.f.state.message,this.triggerRect=f.f.state.triggerRect,this.variant=f.f.state.variant,this.unsubscribe.push(f.f.subscribe(r=>{this.open=r.open,this.message=r.message,this.triggerRect=r.triggerRect,this.variant=r.variant}))}disconnectedCallback(){this.unsubscribe.forEach(r=>r())}render(){this.dataset.variant=this.variant;const r=this.triggerRect.top,n=this.triggerRect.left;return this.style.cssText=`\n    --w3m-tooltip-top: ${r}px;\n    --w3m-tooltip-left: ${n}px;\n    --w3m-tooltip-parent-width: ${this.triggerRect.width/2}px;\n    --w3m-tooltip-display: ${this.open?"flex":"none"};\n    --w3m-tooltip-opacity: ${this.open?1:0};\n    `,e.dy`<wui-flex>
      <wui-icon data-placement="top" color="fg-100" size="inherit" name="cursor"></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>
    </wui-flex>`}};i.styles=[v],l([(0,u.SB)()],i.prototype,"open",void 0),l([(0,u.SB)()],i.prototype,"message",void 0),l([(0,u.SB)()],i.prototype,"triggerRect",void 0),l([(0,u.SB)()],i.prototype,"variant",void 0),i=l([(0,a.Mo)("w3m-tooltip"),(0,a.Mo)("w3m-tooltip")],i)},64356:(C,g,t)=>{"use strict";var e=t(59799),u=t(86523),y=(t(72686),t(11252),t(10831),t(25518)),d=t(88814),v=t(70075);const l=e.iv`
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
`;var i=function(r,n,s,c){var p,w=arguments.length,m=w<3?n:null===c?c=Object.getOwnPropertyDescriptor(n,s):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)m=Reflect.decorate(r,n,s,c);else for(var b=r.length-1;b>=0;b--)(p=r[b])&&(m=(w<3?p(m):w>3?p(n,s,m):p(n,s))||m);return w>3&&m&&Object.defineProperty(n,s,m),m};let o=class extends e.oi{constructor(){super(...arguments),this.variant="fill",this.imageSrc=void 0,this.imageIcon=void 0,this.imageIconSize="md",this.disabled=!1,this.icon="externalLink",this.href="",this.text=void 0}render(){const s="success"===this.variant||"transparent"===this.variant||"shadeSmall"===this.variant?"small-600":"paragraph-600";return e.dy`
      <a
        rel="noreferrer"
        target="_blank"
        href=${this.href}
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
      >
        ${this.imageTemplate()}
        <wui-text variant=${s} color="inherit">
          ${this.title?this.title:d.H.getHostName(this.href)}
        </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </a>
    `}imageTemplate(){return this.imageSrc?e.dy`<wui-image src=${this.imageSrc}></wui-image>`:this.imageIcon?e.dy`<wui-icon
        name=${this.imageIcon}
        color="inherit"
        size=${this.imageIconSize}
        class="image-icon"
      ></wui-icon>`:null}};o.styles=[y.ET,y.ZM,l],i([(0,u.Cb)()],o.prototype,"variant",void 0),i([(0,u.Cb)()],o.prototype,"imageSrc",void 0),i([(0,u.Cb)()],o.prototype,"imageIcon",void 0),i([(0,u.Cb)()],o.prototype,"imageIconSize",void 0),i([(0,u.Cb)({type:Boolean})],o.prototype,"disabled",void 0),i([(0,u.Cb)()],o.prototype,"icon",void 0),i([(0,u.Cb)()],o.prototype,"href",void 0),i([(0,u.Cb)()],o.prototype,"text",void 0),o=i([(0,v.M)("wui-chip")],o)},8894:(C,g,t)=>{"use strict";var e=t(59799),u=t(86523),f=t(23107),h=(t(10831),t(25518)),y=t(70075);t(87162);const v=e.iv`
  :host {
    position: relative;
    display: inline-block;
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`;var l=function(o,r,n,s){var m,c=arguments.length,w=c<3?r:null===s?s=Object.getOwnPropertyDescriptor(r,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)w=Reflect.decorate(o,r,n,s);else for(var p=o.length-1;p>=0;p--)(m=o[p])&&(w=(c<3?m(w):c>3?m(r,n,w):m(r,n))||w);return c>3&&w&&Object.defineProperty(r,n,w),w};let i=class extends e.oi{constructor(){super(...arguments),this.disabled=!1}render(){return e.dy`
      <wui-input-text
        type="email"
        placeholder="Email"
        icon="mail"
        size="mdl"
        .disabled=${this.disabled}
        .value=${this.value}
        data-testid="wui-email-input"
        tabIdx=${(0,f.o)(this.tabIdx)}
      ></wui-input-text>
      ${this.templateError()}
    `}templateError(){return this.errorMessage?e.dy`<wui-text variant="tiny-500" color="error-100">${this.errorMessage}</wui-text>`:null}};i.styles=[h.ET,v],l([(0,u.Cb)()],i.prototype,"errorMessage",void 0),l([(0,u.Cb)({type:Boolean})],i.prototype,"disabled",void 0),l([(0,u.Cb)()],i.prototype,"value",void 0),l([(0,u.Cb)()],i.prototype,"tabIdx",void 0),i=l([(0,y.M)("wui-email-input")],i)},73527:(C,g,t)=>{"use strict";var e=t(59799),u=t(86523),a=(t(72686),t(25518)),h=t(70075);const y=e.iv`
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
`;var d=function(l,i,o,r){var c,n=arguments.length,s=n<3?i:null===r?r=Object.getOwnPropertyDescriptor(i,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(l,i,o,r);else for(var w=l.length-1;w>=0;w--)(c=l[w])&&(s=(n<3?c(s):n>3?c(i,o,s):c(i,o))||s);return n>3&&s&&Object.defineProperty(i,o,s),s};let v=class extends e.oi{constructor(){super(...arguments),this.text="",this.icon="card"}render(){return e.dy`<button>
      <wui-icon color="accent-100" name=${this.icon} size="lg"></wui-icon>
    </button>`}};v.styles=[a.ET,a.ZM,y],d([(0,u.Cb)()],v.prototype,"text",void 0),d([(0,u.Cb)()],v.prototype,"icon",void 0),v=d([(0,h.M)("wui-icon-button")],v)},11539:(C,g,t)=>{"use strict";var e=t(59799),u=t(86523),a=(t(72686),t(25518)),h=t(70075);const y=e.iv`
  button {
    border-radius: var(--local-border-radius);
    color: var(--wui-color-fg-100);
    padding: var(--local-padding);
  }

  @media (max-width: 700px) {
    button {
      padding: var(--wui-spacing-s);
    }
  }

  button > wui-icon {
    pointer-events: none;
  }

  button:disabled > wui-icon {
    color: var(--wui-color-bg-300) !important;
  }

  button:disabled {
    background-color: transparent;
  }
`;var d=function(l,i,o,r){var c,n=arguments.length,s=n<3?i:null===r?r=Object.getOwnPropertyDescriptor(i,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(l,i,o,r);else for(var w=l.length-1;w>=0;w--)(c=l[w])&&(s=(n<3?c(s):n>3?c(i,o,s):c(i,o))||s);return n>3&&s&&Object.defineProperty(i,o,s),s};let v=class extends e.oi{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.icon="copy",this.iconColor="inherit"}render(){const i="lg"===this.size?"--wui-border-radius-xs":"--wui-border-radius-xxs",o="lg"===this.size?"--wui-spacing-1xs":"--wui-spacing-2xs";return this.style.cssText=`\n    --local-border-radius: var(${i});\n    --local-padding: var(${o});\n`,e.dy`
      <button ?disabled=${this.disabled}>
        <wui-icon color=${this.iconColor} size=${this.size} name=${this.icon}></wui-icon>
      </button>
    `}};v.styles=[a.ET,a.ZM,a.Bp,y],d([(0,u.Cb)()],v.prototype,"size",void 0),d([(0,u.Cb)({type:Boolean})],v.prototype,"disabled",void 0),d([(0,u.Cb)()],v.prototype,"icon",void 0),d([(0,u.Cb)()],v.prototype,"iconColor",void 0),v=d([(0,h.M)("wui-icon-link")],v)},15465:(C,g,t)=>{"use strict";t(11252)},50699:(C,g,t)=>{"use strict";var e=t(59799),u=t(86523),f=t(23107),h=(t(10831),t(25518)),y=t(70075);t(96666);const v=e.iv`
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
`;var l=function(o,r,n,s){var m,c=arguments.length,w=c<3?r:null===s?s=Object.getOwnPropertyDescriptor(r,n):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)w=Reflect.decorate(o,r,n,s);else for(var p=o.length-1;p>=0;p--)(m=o[p])&&(w=(c<3?m(w):c>3?m(r,n,w):m(r,n))||w);return c>3&&w&&Object.defineProperty(r,n,w),w};let i=class extends e.oi{constructor(){super(...arguments),this.logo="google",this.name="Continue with google",this.align="left",this.disabled=!1}render(){return e.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,f.o)(this.tabIdx)}>
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
    `}templatePlacement(){return"center"===this.align?e.dy` <wui-logo class="invisible" logo=${this.logo}></wui-logo>`:null}};i.styles=[h.ET,h.ZM,v],l([(0,u.Cb)()],i.prototype,"logo",void 0),l([(0,u.Cb)()],i.prototype,"name",void 0),l([(0,u.Cb)()],i.prototype,"align",void 0),l([(0,u.Cb)()],i.prototype,"tabIdx",void 0),l([(0,u.Cb)({type:Boolean})],i.prototype,"disabled",void 0),i=l([(0,y.M)("wui-list-social")],i)},55155:(C,g,t)=>{"use strict";var e=t(59799),u=t(86523),d=(t(72686),t(11252),t(10831),t(79348),t(25518)),v=t(88814),l=t(70075);const i=e.iv`
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
`;var o=function(n,s,c,w){var b,m=arguments.length,p=m<3?s:null===w?w=Object.getOwnPropertyDescriptor(s,c):w;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)p=Reflect.decorate(n,s,c,w);else for(var _=n.length-1;_>=0;_--)(b=n[_])&&(p=(m<3?b(p):m>3?b(s,c,p):b(s,c))||p);return m>3&&p&&Object.defineProperty(s,c,p),p};let r=class extends e.oi{constructor(){super(...arguments),this.tokenName="",this.tokenImageUrl="",this.tokenValue=0,this.tokenAmount="0.0",this.tokenCurrency="",this.clickable=!1}render(){return e.dy`
      <button data-clickable=${String(this.clickable)}>
        <wui-flex gap="s" alignItems="center">
          ${this.visualTemplate()}
          <wui-flex flexDirection="column" justifyContent="spaceBetween">
            <wui-text variant="paragraph-500" color="fg-100">${this.tokenName}</wui-text>
            <wui-text variant="small-400" color="fg-200">
              ${v.H.formatNumberToLocalString(this.tokenAmount,4)} ${this.tokenCurrency}
            </wui-text>
          </wui-flex>
        </wui-flex>
        <wui-text variant="paragraph-500" color="fg-100">$${this.tokenValue.toFixed(2)}</wui-text>
      </button>
    `}visualTemplate(){return this.tokenName&&this.tokenImageUrl?e.dy`<wui-image alt=${this.tokenName} src=${this.tokenImageUrl}></wui-image>`:e.dy`<wui-icon name="coinPlaceholder" color="fg-100"></wui-icon>`}};r.styles=[d.ET,d.ZM,i],o([(0,u.Cb)()],r.prototype,"tokenName",void 0),o([(0,u.Cb)()],r.prototype,"tokenImageUrl",void 0),o([(0,u.Cb)({type:Number})],r.prototype,"tokenValue",void 0),o([(0,u.Cb)()],r.prototype,"tokenAmount",void 0),o([(0,u.Cb)()],r.prototype,"tokenCurrency",void 0),o([(0,u.Cb)({type:Boolean})],r.prototype,"clickable",void 0),r=o([(0,l.M)("wui-list-token")],r)},32714:(C,g,t)=>{"use strict";t(7890)},3715:(C,g,t)=>{"use strict";var e=t(59799),u=t(86523),a=(t(10831),t(25518)),h=t(70075);const y=e.iv`
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
`;var d=function(l,i,o,r){var c,n=arguments.length,s=n<3?i:null===r?r=Object.getOwnPropertyDescriptor(i,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(l,i,o,r);else for(var w=l.length-1;w>=0;w--)(c=l[w])&&(s=(n<3?c(s):n>3?c(i,o,s):c(i,o))||s);return n>3&&s&&Object.defineProperty(i,o,s),s};let v=class extends e.oi{constructor(){super(...arguments),this.text=""}render(){return e.dy`${this.template()}`}template(){return this.text?e.dy`<wui-text variant="small-500" color="fg-200">${this.text}</wui-text>`:null}};v.styles=[a.ET,y],d([(0,u.Cb)()],v.prototype,"text",void 0),v=d([(0,h.M)("wui-separator")],v)},39927:(C,g,t)=>{"use strict";t(28019)},35205:(C,g,t)=>{"use strict";var e=t(59799),u=t(86523),a=(t(11252),t(25518)),h=t(88814),y=t(70075);const d=e.iv`
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
`;var v=function(i,o,r,n){var w,s=arguments.length,c=s<3?o:null===n?n=Object.getOwnPropertyDescriptor(o,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(i,o,r,n);else for(var m=i.length-1;m>=0;m--)(w=i[m])&&(c=(s<3?w(c):s>3?w(o,r,c):w(o,r))||c);return s>3&&c&&Object.defineProperty(o,r,c),c};let l=class extends e.oi{constructor(){super(...arguments),this.imageSrc=void 0,this.alt=void 0,this.address=void 0,this.size="xl"}render(){return this.style.cssText=`\n    --local-width: var(--wui-icon-box-size-${this.size});\n    --local-height: var(--wui-icon-box-size-${this.size});\n    `,e.dy`${this.visualTemplate()}`}visualTemplate(){if(this.imageSrc)return this.dataset.variant="image",e.dy`<wui-image src=${this.imageSrc} alt=${this.alt??"avatar"}></wui-image>`;if(this.address){this.dataset.variant="generated";const o=h.H.generateAvatarColors(this.address);return this.style.cssText+=`\n ${o}`,null}return this.dataset.variant="default",null}};l.styles=[a.ET,d],v([(0,u.Cb)()],l.prototype,"imageSrc",void 0),v([(0,u.Cb)()],l.prototype,"alt",void 0),v([(0,u.Cb)()],l.prototype,"address",void 0),v([(0,u.Cb)()],l.prototype,"size",void 0),l=v([(0,y.M)("wui-avatar")],l)},96666:(C,g,t)=>{"use strict";var e=t(59799),u=t(86523),a=(t(72686),t(25518)),h=t(70075);const y=e.iv`
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
`;var d=function(l,i,o,r){var c,n=arguments.length,s=n<3?i:null===r?r=Object.getOwnPropertyDescriptor(i,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(l,i,o,r);else for(var w=l.length-1;w>=0;w--)(c=l[w])&&(s=(n<3?c(s):n>3?c(i,o,s):c(i,o))||s);return n>3&&s&&Object.defineProperty(i,o,s),s};let v=class extends e.oi{constructor(){super(...arguments),this.logo="google"}render(){return e.dy`<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `}};v.styles=[a.ET,y],d([(0,u.Cb)()],v.prototype,"logo",void 0),v=d([(0,h.M)("wui-logo")],v)},7890:(C,g,t)=>{"use strict";var e=t(59799),u=t(86523);const f=e.YP`<svg width="86" height="96" fill="none">
  <path
    d="M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z"
  />
</svg>`;var a=t(85359);const h=e.YP`
  <svg fill="none" viewBox="0 0 36 40">
    <path
      d="M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z"
    />
  </svg>
`;t(72686),t(11252);var v=t(25518),l=t(70075);const i=e.iv`
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
`;var o=function(n,s,c,w){var b,m=arguments.length,p=m<3?s:null===w?w=Object.getOwnPropertyDescriptor(s,c):w;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)p=Reflect.decorate(n,s,c,w);else for(var _=n.length-1;_>=0;_--)(b=n[_])&&(p=(m<3?b(p):m>3?b(s,c,p):b(s,c))||p);return m>3&&p&&Object.defineProperty(s,c,p),p};let r=class extends e.oi{constructor(){super(...arguments),this.size="md",this.name="uknown",this.networkImagesBySize={sm:h,md:a.W,lg:f},this.selected=!1,this.round=!1}render(){return this.round?(this.dataset.round="true",this.style.cssText="\n      --local-width: var(--wui-spacing-3xl);\n      --local-height: var(--wui-spacing-3xl);\n      --local-icon-size: var(--wui-spacing-l);\n    "):this.style.cssText=`\n\n      --local-path: var(--wui-path-network-${this.size});\n      --local-width:  var(--wui-width-network-${this.size});\n      --local-height:  var(--wui-height-network-${this.size});\n      --local-icon-size:  var(--wui-icon-size-network-${this.size});\n    `,e.dy`${this.templateVisual()} ${this.svgTemplate()} `}svgTemplate(){return this.round?null:this.networkImagesBySize[this.size]}templateVisual(){return this.imageSrc?e.dy`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:e.dy`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`}};r.styles=[v.ET,i],o([(0,u.Cb)()],r.prototype,"size",void 0),o([(0,u.Cb)()],r.prototype,"name",void 0),o([(0,u.Cb)({type:Object})],r.prototype,"networkImagesBySize",void 0),o([(0,u.Cb)()],r.prototype,"imageSrc",void 0),o([(0,u.Cb)({type:Boolean})],r.prototype,"selected",void 0),o([(0,u.Cb)({type:Boolean})],r.prototype,"round",void 0),r=o([(0,l.M)("wui-network-image")],r)},62277:(C,g,t)=>{"use strict";t.d(g,{w:()=>p,M:()=>m});var e=t(49671),u=t(17627),f=t(66848),a=t(76577),h=t(28544),y=t(89840),d=t(5383),v=t(16537);var i=t(80770),o=t(62910),r=t(30930);const n="/docs/contract/encodeErrorResult";function s(E){const{abi:R,errorName:O,args:S}=E;let x=R[0];if(O){const P=(0,r.mE)({abi:R,args:S,name:O});if(!P)throw new a.MS(O,{docsPath:n});x=P}if("error"!==x.type)throw new a.MS(void 0,{docsPath:n});const T=(0,v.t)(x),F=(0,y.C)(T);let M="0x";if(S&&S.length>0){if(!x.inputs)throw new a.Zh(x.name,{docsPath:n});M=(0,o.E)(x.inputs,S)}return(0,i.SM)([F,M])}const c="/docs/contract/encodeFunctionResult";const m="x-batch-gateway:true";function p(E){return b.apply(this,arguments)}function b(){return b=(0,e.Z)(function*(E){const{data:R,ccipRequest:O}=E,{args:[S]}=function l(E){const{abi:R,data:O}=E,S=(0,h.tP)(O,0,4),x=R.find(T=>"function"===T.type&&S===(0,y.C)((0,v.t)(T)));if(!x)throw new a.eF(S,{docsPath:"/docs/contract/decodeFunctionData"});return{functionName:x.name,args:"inputs"in x&&x.inputs&&x.inputs.length>0?(0,d.r)(x.inputs,(0,h.tP)(O,4)):void 0}}({abi:u.Yi,data:R}),x=[],T=[];return yield Promise.all(S.map(function(){var F=(0,e.Z)(function*(M,P){try{T[P]=yield O(M),x[P]=!1}catch(W){x[P]=!0,T[P]=function _(E){return"HttpRequestError"===E.name&&E.status?s({abi:u.Yi,errorName:"HttpError",args:[E.status,E.shortMessage]}):s({abi:[f.Up],errorName:"Error",args:["shortMessage"in E?E.shortMessage:E.message]})}(W)}});return function(M,P){return F.apply(this,arguments)}}())),function w(E){const{abi:R,functionName:O,result:S}=E;let x=R[0];if(O){const F=(0,r.mE)({abi:R,name:O});if(!F)throw new a.xL(O,{docsPath:c});x=F}if("function"!==x.type)throw new a.xL(void 0,{docsPath:c});if(!x.outputs)throw new a.MX(x.name,{docsPath:c});const T=(()=>{if(0===x.outputs.length)return[];if(1===x.outputs.length)return[S];if(Array.isArray(S))return S;throw new a.hn(S)})();return(0,o.E)(x.outputs,T)}({abi:u.Yi,functionName:"query",result:[x,T]})}),b.apply(this,arguments)}}}]);