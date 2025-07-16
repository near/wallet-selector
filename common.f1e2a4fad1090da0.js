(self.webpackChunkangular=self.webpackChunkangular||[]).push([[8592],{46915:(R,y,t)=>{"use strict";function e(c){var g,C,v="";if("string"==typeof c||"number"==typeof c)v+=c;else if("object"==typeof c)if(Array.isArray(c))for(g=0;g<c.length;g++)c[g]&&(C=e(c[g]))&&(v&&(v+=" "),v+=C);else for(g in c)c[g]&&(v&&(v+=" "),v+=g);return v}function d(){for(var c,g,C=0,v="";C<arguments.length;)(c=arguments[C++])&&(g=e(c))&&(v&&(v+=" "),v+=g);return v}t.r(y),t.d(y,{clsx:()=>d,default:()=>x});const x=d},30890:R=>{var y=1e3,t=60*y,e=60*t,d=24*e,x=7*d,c=365.25*d;function h(n,s,o,i){var l=s>=1.5*o;return Math.round(n/o)+" "+i+(l?"s":"")}R.exports=function(n,s){s=s||{};var o=typeof n;if("string"===o&&n.length>0)return function g(n){if(n=String(n),!(n.length>100)){var s=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(n);if(s){var o=parseFloat(s[1]);switch((s[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return o*c;case"weeks":case"week":case"w":return o*x;case"days":case"day":case"d":return o*d;case"hours":case"hour":case"hrs":case"hr":case"h":return o*e;case"minutes":case"minute":case"mins":case"min":case"m":return o*t;case"seconds":case"second":case"secs":case"sec":case"s":return o*y;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return o;default:return}}}}(n);if("number"===o&&isFinite(n))return s.long?function v(n){var s=Math.abs(n);return s>=d?h(n,s,d,"day"):s>=e?h(n,s,e,"hour"):s>=t?h(n,s,t,"minute"):s>=y?h(n,s,y,"second"):n+" ms"}(n):function C(n){var s=Math.abs(n);return s>=d?Math.round(n/d)+"d":s>=e?Math.round(n/e)+"h":s>=t?Math.round(n/t)+"m":s>=y?Math.round(n/y)+"s":n+"ms"}(n);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(n))}},20563:(R,y,t)=>{y.formatArgs=function d(v){if(v[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+v[0]+(this.useColors?"%c ":" ")+"+"+R.exports.humanize(this.diff),!this.useColors)return;const h="color: "+this.color;v.splice(1,0,h,"color: inherit");let n=0,s=0;v[0].replace(/%[a-zA-Z%]/g,o=>{"%%"!==o&&(n++,"%c"===o&&(s=n))}),v.splice(s,0,h)},y.save=function x(v){try{v?y.storage.setItem("debug",v):y.storage.removeItem("debug")}catch{}},y.load=function c(){let v;try{v=y.storage.getItem("debug")}catch{}return!v&&typeof process<"u"&&"env"in process&&(v=process.env.DEBUG),v},y.useColors=function e(){return!(!(typeof window<"u"&&window.process)||"renderer"!==window.process.type&&!window.process.__nwjs)||!(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&(typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},y.storage=function g(){try{return localStorage}catch{}}(),y.destroy=(()=>{let v=!1;return()=>{v||(v=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),y.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],y.log=console.debug||console.log||(()=>{}),R.exports=t(56018)(y);const{formatters:C}=R.exports;C.j=function(v){try{return JSON.stringify(v)}catch(h){return"[UnexpectedJSONParseError]: "+h.message}}},56018:(R,y,t)=>{R.exports=function e(d){function c(i){let l,r,u,a=null;function w(...p){if(!w.enabled)return;const f=w,b=Number(new Date),_=b-(l||b);f.diff=_,f.prev=l,f.curr=b,l=b,p[0]=c.coerce(p[0]),"string"!=typeof p[0]&&p.unshift("%O");let E=0;p[0]=p[0].replace(/%([a-zA-Z%])/g,(O,m)=>{if("%%"===O)return"%";E++;const F=c.formatters[m];if("function"==typeof F){const T=p[E];O=F.call(f,T),p.splice(E,1),E--}return O}),c.formatArgs.call(f,p),(f.log||c.log).apply(f,p)}return w.namespace=i,w.useColors=c.useColors(),w.color=c.selectColor(i),w.extend=g,w.destroy=c.destroy,Object.defineProperty(w,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==a?a:(r!==c.namespaces&&(r=c.namespaces,u=c.enabled(i)),u),set:p=>{a=p}}),"function"==typeof c.init&&c.init(w),w}function g(i,l){const a=c(this.namespace+(typeof l>"u"?":":l)+i);return a.log=this.log,a}function n(i){return i.toString().substring(2,i.toString().length-2).replace(/\.\*\?$/,"*")}return c.debug=c,c.default=c,c.coerce=function s(i){return i instanceof Error?i.stack||i.message:i},c.disable=function v(){const i=[...c.names.map(n),...c.skips.map(n).map(l=>"-"+l)].join(",");return c.enable(""),i},c.enable=function C(i){let l;c.save(i),c.namespaces=i,c.names=[],c.skips=[];const a=("string"==typeof i?i:"").split(/[\s,]+/),r=a.length;for(l=0;l<r;l++)a[l]&&("-"===(i=a[l].replace(/\*/g,".*?"))[0]?c.skips.push(new RegExp("^"+i.slice(1)+"$")):c.names.push(new RegExp("^"+i+"$")))},c.enabled=function h(i){if("*"===i[i.length-1])return!0;let l,a;for(l=0,a=c.skips.length;l<a;l++)if(c.skips[l].test(i))return!1;for(l=0,a=c.names.length;l<a;l++)if(c.names[l].test(i))return!0;return!1},c.humanize=t(30890),c.destroy=function o(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(d).forEach(i=>{c[i]=d[i]}),c.names=[],c.skips=[],c.formatters={},c.selectColor=function x(i){let l=0;for(let a=0;a<i.length;a++)l=(l<<5)-l+i.charCodeAt(a),l|=0;return c.colors[Math.abs(l)%c.colors.length]},c.enable(c.load()),c}},32622:(R,y,t)=>{"use strict";t.d(y,{JQ:()=>i});var e=t(93284),d=t(40512);function c(a,r,u){return a&r^~a&u}function g(a,r,u){return a&r^a&u^r&u}class C extends d.kb{constructor(r,u,w,p){super(),this.blockLen=r,this.outputLen=u,this.padOffset=w,this.isLE=p,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(r),this.view=(0,d.GL)(this.buffer)}update(r){(0,e.$h)(this);const{view:u,buffer:w,blockLen:p}=this,f=(r=(0,d.O0)(r)).length;for(let b=0;b<f;){const _=Math.min(p-this.pos,f-b);if(_!==p)w.set(r.subarray(b,b+_),this.pos),this.pos+=_,b+=_,this.pos===p&&(this.process(u,0),this.pos=0);else{const E=(0,d.GL)(r);for(;p<=f-b;b+=p)this.process(E,b)}}return this.length+=r.length,this.roundClean(),this}digestInto(r){(0,e.$h)(this),(0,e.eB)(r,this),this.finished=!0;const{buffer:u,view:w,blockLen:p,isLE:f}=this;let{pos:b}=this;u[b++]=128,this.buffer.subarray(b).fill(0),this.padOffset>p-b&&(this.process(w,0),b=0);for(let m=b;m<p;m++)u[m]=0;(function x(a,r,u,w){if("function"==typeof a.setBigUint64)return a.setBigUint64(r,u,w);const p=BigInt(32),f=BigInt(4294967295),b=Number(u>>p&f),_=Number(u&f),E=w?4:0,S=w?0:4;a.setUint32(r+E,b,w),a.setUint32(r+S,_,w)})(w,p-8,BigInt(8*this.length),f),this.process(w,0);const _=(0,d.GL)(r),E=this.outputLen;if(E%4)throw new Error("_sha2: outputLen should be aligned to 32bit");const S=E/4,O=this.get();if(S>O.length)throw new Error("_sha2: outputLen bigger than state");for(let m=0;m<S;m++)_.setUint32(4*m,O[m],f)}digest(){const{buffer:r,outputLen:u}=this;this.digestInto(r);const w=r.slice(0,u);return this.destroy(),w}_cloneInto(r){r||(r=new this.constructor),r.set(...this.get());const{blockLen:u,buffer:w,length:p,finished:f,destroyed:b,pos:_}=this;return r.length=p,r.pos=_,r.finished=f,r.destroyed=b,p%u&&r.buffer.set(w),r}}const v=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),h=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),n=new Uint32Array(64);class s extends C{constructor(){super(64,32,8,!1),this.A=0|h[0],this.B=0|h[1],this.C=0|h[2],this.D=0|h[3],this.E=0|h[4],this.F=0|h[5],this.G=0|h[6],this.H=0|h[7]}get(){const{A:r,B:u,C:w,D:p,E:f,F:b,G:_,H:E}=this;return[r,u,w,p,f,b,_,E]}set(r,u,w,p,f,b,_,E){this.A=0|r,this.B=0|u,this.C=0|w,this.D=0|p,this.E=0|f,this.F=0|b,this.G=0|_,this.H=0|E}process(r,u){for(let m=0;m<16;m++,u+=4)n[m]=r.getUint32(u,!1);for(let m=16;m<64;m++){const F=n[m-15],T=n[m-2],P=(0,d.np)(F,7)^(0,d.np)(F,18)^F>>>3,A=(0,d.np)(T,17)^(0,d.np)(T,19)^T>>>10;n[m]=A+n[m-7]+P+n[m-16]|0}let{A:w,B:p,C:f,D:b,E:_,F:E,G:S,H:O}=this;for(let m=0;m<64;m++){const T=O+((0,d.np)(_,6)^(0,d.np)(_,11)^(0,d.np)(_,25))+c(_,E,S)+v[m]+n[m]|0,A=((0,d.np)(w,2)^(0,d.np)(w,13)^(0,d.np)(w,22))+g(w,p,f)|0;O=S,S=E,E=_,_=b+T|0,b=f,f=p,p=w,w=T+A|0}w=w+this.A|0,p=p+this.B|0,f=f+this.C|0,b=b+this.D|0,_=_+this.E|0,E=E+this.F|0,S=S+this.G|0,O=O+this.H|0,this.set(w,p,f,b,_,E,S,O)}roundClean(){n.fill(0)}destroy(){this.set(0,0,0,0,0,0,0,0),this.buffer.fill(0)}}const i=(0,d.hE)(()=>new s)},17170:(R,y,t)=>{"use strict";t.d(y,{U:()=>e});const e={URLS:{FAQ:"https://walletconnect.com/faq"}}},43695:(R,y,t)=>{"use strict";t.d(y,{f:()=>C});var e=t(24688),d=t(99071),x=t(34198);const c=(0,e.sj)({message:"",open:!1,triggerRect:{width:0,height:0,top:0,left:0},variant:"shade"}),g={state:c,subscribe:v=>(0,e.Ld)(c,()=>v(c)),subscribeKey:(v,h)=>(0,d.VW)(c,v,h),showTooltip({message:v,triggerRect:h,variant:n}){c.open=!0,c.message=v,c.triggerRect=h,c.variant=n},hide(){c.open=!1,c.message="",c.triggerRect={width:0,height:0,top:0,left:0}}},C=(0,x.P)(g)},39168:(R,y,t)=>{"use strict";t.d(y,{y0:()=>u});var e=t(49671),d=t(86450),x=t(22917),c=t(20597),g=t(86424),C=t(79282),v=t(24380),h=t(76169),n=t(18445),s=t(22429);function l(){return(l=(0,e.Z)(function*(){v.RouterController.push("ConnectingFarcaster");const p=g.ConnectorController.getAuthConnector();if(p&&!x.AccountController.state.farcasterUrl)try{const{url:f}=yield p.provider.getFarcasterUri();x.AccountController.setFarcasterUrl(f,c.R.state.activeChain)}catch(f){v.RouterController.goBack(),h.SnackController.showError(f)}})).apply(this,arguments)}function r(){return(r=(0,e.Z)(function*(p){v.RouterController.push("ConnectingSocial");const f=g.ConnectorController.getAuthConnector();let b=null;try{const _=setTimeout(()=>{throw new Error("Social login timed out. Please try again.")},45e3);if(f&&p){if(n.j.isTelegram()||(b=function o(){try{return n.j.returnOpenHref(`${d.b.SECURE_SITE_SDK_ORIGIN}/loading`,"popupWindow","width=600,height=800,scrollbars=yes")}catch{throw new Error("Could not open social popup")}}()),b)x.AccountController.setSocialWindow(b,c.R.state.activeChain);else if(!n.j.isTelegram())throw new Error("Could not create social popup");const{uri:E}=yield f.provider.getSocialRedirectUri({provider:p});if(!E)throw b?.close(),new Error("Could not fetch the social redirect uri");if(b&&(b.location.href=E),n.j.isTelegram()){s.M.setTelegramSocialProvider(p);const S=n.j.formatTelegramSocialLoginUrl(E);n.j.openHref(S,"_top")}clearTimeout(_)}}catch(_){b?.close(),h.SnackController.showError(_?.message)}})).apply(this,arguments)}function u(p){return w.apply(this,arguments)}function w(){return w=(0,e.Z)(function*(p){x.AccountController.setSocialProvider(p,c.R.state.activeChain),C.X.sendEvent({type:"track",event:"SOCIAL_LOGIN_STARTED",properties:{provider:p}}),"farcaster"===p?yield function i(){return l.apply(this,arguments)}():yield function a(p){return r.apply(this,arguments)}(p)}),w.apply(this,arguments)}},48788:(R,y,t)=>{"use strict";t.d(y,{A:()=>n});var e=t(59799),d=t(86523),x=t(24380),c=t(43695),g=t(50860),C=t(37847);const v=e.iv`
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
`;var h=function(s,o,i,l){var u,a=arguments.length,r=a<3?o:null===l?l=Object.getOwnPropertyDescriptor(o,i):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(s,o,i,l);else for(var w=s.length-1;w>=0;w--)(u=s[w])&&(r=(a<3?u(r):a>3?u(o,i,r):u(o,i))||r);return a>3&&r&&Object.defineProperty(o,i,r),r};let n=class extends e.oi{constructor(){super(),this.resizeObserver=void 0,this.prevHeight="0px",this.prevHistoryLength=1,this.unsubscribe=[],this.view=x.RouterController.state.view,this.viewDirection="",this.unsubscribe.push(x.RouterController.subscribeKey("view",o=>this.onViewChange(o)))}firstUpdated(){this.resizeObserver=new ResizeObserver(([o])=>{const i=`${o?.contentRect.height}px`;"0px"!==this.prevHeight&&(this.style.setProperty("--prev-height",this.prevHeight),this.style.setProperty("--new-height",i),this.style.animation="w3m-view-height 150ms forwards ease",this.style.height="auto"),setTimeout(()=>{this.prevHeight=i,this.style.animation="unset"},C.b.ANIMATION_DURATIONS.ModalHeight)}),this.resizeObserver?.observe(this.getWrapper())}disconnectedCallback(){this.resizeObserver?.unobserve(this.getWrapper()),this.unsubscribe.forEach(o=>o())}render(){return e.dy`<div class="w3m-router-container" view-direction="${this.viewDirection}">
      ${this.viewTemplate()}
    </div>`}viewTemplate(){switch(this.view){case"AccountSettings":return e.dy`<w3m-account-settings-view></w3m-account-settings-view>`;case"Account":return e.dy`<w3m-account-view></w3m-account-view>`;case"AllWallets":return e.dy`<w3m-all-wallets-view></w3m-all-wallets-view>`;case"ApproveTransaction":return e.dy`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;case"BuyInProgress":return e.dy`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;case"ChooseAccountName":return e.dy`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;case"Connect":default:return e.dy`<w3m-connect-view></w3m-connect-view>`;case"Create":return e.dy`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;case"ConnectingWalletConnect":return e.dy`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;case"ConnectingWalletConnectBasic":return e.dy`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;case"ConnectingExternal":return e.dy`<w3m-connecting-external-view></w3m-connecting-external-view>`;case"ConnectingSiwe":return e.dy`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;case"ConnectWallets":return e.dy`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;case"ConnectSocials":return e.dy`<w3m-connect-socials-view></w3m-connect-socials-view>`;case"ConnectingSocial":return e.dy`<w3m-connecting-social-view></w3m-connecting-social-view>`;case"Downloads":return e.dy`<w3m-downloads-view></w3m-downloads-view>`;case"EmailLogin":return e.dy`<w3m-email-login-view></w3m-email-login-view>`;case"EmailVerifyOtp":return e.dy`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;case"EmailVerifyDevice":return e.dy`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;case"GetWallet":return e.dy`<w3m-get-wallet-view></w3m-get-wallet-view>`;case"Networks":return e.dy`<w3m-networks-view></w3m-networks-view>`;case"SwitchNetwork":return e.dy`<w3m-network-switch-view></w3m-network-switch-view>`;case"Profile":return e.dy`<w3m-profile-view></w3m-profile-view>`;case"SwitchAddress":return e.dy`<w3m-switch-address-view></w3m-switch-address-view>`;case"Transactions":return e.dy`<w3m-transactions-view></w3m-transactions-view>`;case"OnRampProviders":return e.dy`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;case"OnRampActivity":return e.dy`<w3m-onramp-activity-view></w3m-onramp-activity-view>`;case"OnRampTokenSelect":return e.dy`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;case"OnRampFiatSelect":return e.dy`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;case"UpgradeEmailWallet":return e.dy`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;case"UpdateEmailWallet":return e.dy`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;case"UpdateEmailPrimaryOtp":return e.dy`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;case"UpdateEmailSecondaryOtp":return e.dy`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;case"UnsupportedChain":return e.dy`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;case"Swap":return e.dy`<w3m-swap-view></w3m-swap-view>`;case"SwapSelectToken":return e.dy`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;case"SwapPreview":return e.dy`<w3m-swap-preview-view></w3m-swap-preview-view>`;case"WalletSend":return e.dy`<w3m-wallet-send-view></w3m-wallet-send-view>`;case"WalletSendSelectToken":return e.dy`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;case"WalletSendPreview":return e.dy`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;case"WhatIsABuy":return e.dy`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;case"WalletReceive":return e.dy`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;case"WalletCompatibleNetworks":return e.dy`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;case"WhatIsAWallet":return e.dy`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;case"ConnectingMultiChain":return e.dy`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;case"WhatIsANetwork":return e.dy`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;case"ConnectingFarcaster":return e.dy`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;case"SwitchActiveChain":return e.dy`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;case"RegisterAccountName":return e.dy`<w3m-register-account-name-view></w3m-register-account-name-view>`;case"RegisterAccountNameSuccess":return e.dy`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;case"SmartSessionCreated":return e.dy`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;case"SmartSessionList":return e.dy`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;case"SIWXSignMessage":return e.dy`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`;case"Pay":return e.dy`<w3m-pay-view></w3m-pay-view>`;case"PayLoading":return e.dy`<w3m-pay-loading-view></w3m-pay-loading-view>`}}onViewChange(o){c.f.hide();let i=C.b.VIEW_DIRECTION.Next;const{history:l}=x.RouterController.state;l.length<this.prevHistoryLength&&(i=C.b.VIEW_DIRECTION.Prev),this.prevHistoryLength=l.length,this.viewDirection=i,setTimeout(()=>{this.view=o},C.b.ANIMATION_DURATIONS.ViewTransition)}getWrapper(){return this.shadowRoot?.querySelector("div")}};n.styles=v,h([(0,d.SB)()],n.prototype,"view",void 0),h([(0,d.SB)()],n.prototype,"viewDirection",void 0),n=h([(0,g.Mo)("w3m-router")],n)},33223:(R,y,t)=>{"use strict";var e=t(59799),d=t(86523),x=t(43695),c=t(24380),g=t(57745),C=t(50860);const v=e.iv`
  :host {
    width: 100%;
    display: block;
  }
`;var h=function(s,o,i,l){var u,a=arguments.length,r=a<3?o:null===l?l=Object.getOwnPropertyDescriptor(o,i):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(s,o,i,l);else for(var w=s.length-1;w>=0;w--)(u=s[w])&&(r=(a<3?u(r):a>3?u(o,i,r):u(o,i))||r);return a>3&&r&&Object.defineProperty(o,i,r),r};let n=class extends e.oi{constructor(){super(),this.unsubscribe=[],this.text="",this.open=x.f.state.open,this.unsubscribe.push(c.RouterController.subscribeKey("view",()=>{x.f.hide()}),g.I.subscribeKey("open",o=>{o||x.f.hide()}),x.f.subscribeKey("open",o=>{this.open=o}))}disconnectedCallback(){this.unsubscribe.forEach(o=>o()),x.f.hide()}render(){return e.dy`
      <div
        @pointermove=${this.onMouseEnter.bind(this)}
        @pointerleave=${this.onMouseLeave.bind(this)}
      >
        ${this.renderChildren()}
      </div>
    `}renderChildren(){return e.dy`<slot></slot> `}onMouseEnter(){const o=this.getBoundingClientRect();this.open||x.f.showTooltip({message:this.text,triggerRect:{width:o.width,height:o.height,left:o.left,top:o.top},variant:"shade"})}onMouseLeave(o){this.contains(o.relatedTarget)||x.f.hide()}};n.styles=[v],h([(0,d.Cb)()],n.prototype,"text",void 0),h([(0,d.SB)()],n.prototype,"open",void 0),n=h([(0,C.Mo)("w3m-tooltip-trigger")],n)},62700:(R,y,t)=>{"use strict";var e=t(59799),d=t(86523),x=t(43695),c=t(50860);t(937),t(51078),t(54575);const h=e.iv`
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
`;var n=function(o,i,l,a){var w,r=arguments.length,u=r<3?i:null===a?a=Object.getOwnPropertyDescriptor(i,l):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)u=Reflect.decorate(o,i,l,a);else for(var p=o.length-1;p>=0;p--)(w=o[p])&&(u=(r<3?w(u):r>3?w(i,l,u):w(i,l))||u);return r>3&&u&&Object.defineProperty(i,l,u),u};let s=class extends e.oi{constructor(){super(),this.unsubscribe=[],this.open=x.f.state.open,this.message=x.f.state.message,this.triggerRect=x.f.state.triggerRect,this.variant=x.f.state.variant,this.unsubscribe.push(x.f.subscribe(i=>{this.open=i.open,this.message=i.message,this.triggerRect=i.triggerRect,this.variant=i.variant}))}disconnectedCallback(){this.unsubscribe.forEach(i=>i())}render(){this.dataset.variant=this.variant;const i=this.triggerRect.top,l=this.triggerRect.left;return this.style.cssText=`\n    --w3m-tooltip-top: ${i}px;\n    --w3m-tooltip-left: ${l}px;\n    --w3m-tooltip-parent-width: ${this.triggerRect.width/2}px;\n    --w3m-tooltip-display: ${this.open?"flex":"none"};\n    --w3m-tooltip-opacity: ${this.open?1:0};\n    `,e.dy`<wui-flex>
      <wui-icon data-placement="top" color="fg-100" size="inherit" name="cursor"></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>
    </wui-flex>`}};s.styles=[h],n([(0,d.SB)()],s.prototype,"open",void 0),n([(0,d.SB)()],s.prototype,"message",void 0),n([(0,d.SB)()],s.prototype,"triggerRect",void 0),n([(0,d.SB)()],s.prototype,"variant",void 0),s=n([(0,c.Mo)("w3m-tooltip"),(0,c.Mo)("w3m-tooltip")],s)},64356:(R,y,t)=>{"use strict";var e=t(59799),d=t(86523),C=(t(72686),t(11252),t(10831),t(25518)),v=t(88814),h=t(70075);const n=e.iv`
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
`;var s=function(i,l,a,r){var p,u=arguments.length,w=u<3?l:null===r?r=Object.getOwnPropertyDescriptor(l,a):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)w=Reflect.decorate(i,l,a,r);else for(var f=i.length-1;f>=0;f--)(p=i[f])&&(w=(u<3?p(w):u>3?p(l,a,w):p(l,a))||w);return u>3&&w&&Object.defineProperty(l,a,w),w};let o=class extends e.oi{constructor(){super(...arguments),this.variant="fill",this.imageSrc=void 0,this.imageIcon=void 0,this.imageIconSize="md",this.disabled=!1,this.icon="externalLink",this.href="",this.text=void 0}render(){const a="success"===this.variant||"transparent"===this.variant||"shadeSmall"===this.variant?"small-600":"paragraph-600";return e.dy`
      <a
        rel="noreferrer"
        target="_blank"
        href=${this.href}
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
      >
        ${this.imageTemplate()}
        <wui-text variant=${a} color="inherit">
          ${this.title?this.title:v.H.getHostName(this.href)}
        </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </a>
    `}imageTemplate(){return this.imageSrc?e.dy`<wui-image src=${this.imageSrc}></wui-image>`:this.imageIcon?e.dy`<wui-icon
        name=${this.imageIcon}
        color="inherit"
        size=${this.imageIconSize}
        class="image-icon"
      ></wui-icon>`:null}};o.styles=[C.ET,C.ZM,n],s([(0,d.Cb)()],o.prototype,"variant",void 0),s([(0,d.Cb)()],o.prototype,"imageSrc",void 0),s([(0,d.Cb)()],o.prototype,"imageIcon",void 0),s([(0,d.Cb)()],o.prototype,"imageIconSize",void 0),s([(0,d.Cb)({type:Boolean})],o.prototype,"disabled",void 0),s([(0,d.Cb)()],o.prototype,"icon",void 0),s([(0,d.Cb)()],o.prototype,"href",void 0),s([(0,d.Cb)()],o.prototype,"text",void 0),o=s([(0,h.M)("wui-chip")],o)},8894:(R,y,t)=>{"use strict";var e=t(59799),d=t(86523),x=t(23107),g=(t(10831),t(25518)),C=t(70075);t(87162);const h=e.iv`
  :host {
    position: relative;
    display: inline-block;
  }

  wui-text {
    margin: var(--wui-spacing-xxs) var(--wui-spacing-m) var(--wui-spacing-0) var(--wui-spacing-m);
  }
`;var n=function(o,i,l,a){var w,r=arguments.length,u=r<3?i:null===a?a=Object.getOwnPropertyDescriptor(i,l):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)u=Reflect.decorate(o,i,l,a);else for(var p=o.length-1;p>=0;p--)(w=o[p])&&(u=(r<3?w(u):r>3?w(i,l,u):w(i,l))||u);return r>3&&u&&Object.defineProperty(i,l,u),u};let s=class extends e.oi{constructor(){super(...arguments),this.disabled=!1}render(){return e.dy`
      <wui-input-text
        type="email"
        placeholder="Email"
        icon="mail"
        size="mdl"
        .disabled=${this.disabled}
        .value=${this.value}
        data-testid="wui-email-input"
        tabIdx=${(0,x.o)(this.tabIdx)}
      ></wui-input-text>
      ${this.templateError()}
    `}templateError(){return this.errorMessage?e.dy`<wui-text variant="tiny-500" color="error-100">${this.errorMessage}</wui-text>`:null}};s.styles=[g.ET,h],n([(0,d.Cb)()],s.prototype,"errorMessage",void 0),n([(0,d.Cb)({type:Boolean})],s.prototype,"disabled",void 0),n([(0,d.Cb)()],s.prototype,"value",void 0),n([(0,d.Cb)()],s.prototype,"tabIdx",void 0),s=n([(0,C.M)("wui-email-input")],s)},73527:(R,y,t)=>{"use strict";var e=t(59799),d=t(86523),c=(t(72686),t(25518)),g=t(70075);const C=e.iv`
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
`;var v=function(n,s,o,i){var r,l=arguments.length,a=l<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(n,s,o,i);else for(var u=n.length-1;u>=0;u--)(r=n[u])&&(a=(l<3?r(a):l>3?r(s,o,a):r(s,o))||a);return l>3&&a&&Object.defineProperty(s,o,a),a};let h=class extends e.oi{constructor(){super(...arguments),this.text="",this.icon="card"}render(){return e.dy`<button>
      <wui-icon color="accent-100" name=${this.icon} size="lg"></wui-icon>
    </button>`}};h.styles=[c.ET,c.ZM,C],v([(0,d.Cb)()],h.prototype,"text",void 0),v([(0,d.Cb)()],h.prototype,"icon",void 0),h=v([(0,g.M)("wui-icon-button")],h)},11539:(R,y,t)=>{"use strict";var e=t(59799),d=t(86523),c=(t(72686),t(25518)),g=t(70075);const C=e.iv`
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
`;var v=function(n,s,o,i){var r,l=arguments.length,a=l<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(n,s,o,i);else for(var u=n.length-1;u>=0;u--)(r=n[u])&&(a=(l<3?r(a):l>3?r(s,o,a):r(s,o))||a);return l>3&&a&&Object.defineProperty(s,o,a),a};let h=class extends e.oi{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.icon="copy",this.iconColor="inherit"}render(){const s="lg"===this.size?"--wui-border-radius-xs":"--wui-border-radius-xxs",o="lg"===this.size?"--wui-spacing-1xs":"--wui-spacing-2xs";return this.style.cssText=`\n    --local-border-radius: var(${s});\n    --local-padding: var(${o});\n`,e.dy`
      <button ?disabled=${this.disabled}>
        <wui-icon color=${this.iconColor} size=${this.size} name=${this.icon}></wui-icon>
      </button>
    `}};h.styles=[c.ET,c.ZM,c.Bp,C],v([(0,d.Cb)()],h.prototype,"size",void 0),v([(0,d.Cb)({type:Boolean})],h.prototype,"disabled",void 0),v([(0,d.Cb)()],h.prototype,"icon",void 0),v([(0,d.Cb)()],h.prototype,"iconColor",void 0),h=v([(0,g.M)("wui-icon-link")],h)},15465:(R,y,t)=>{"use strict";t(11252)},50699:(R,y,t)=>{"use strict";var e=t(59799),d=t(86523),x=t(23107),g=(t(10831),t(25518)),C=t(70075);t(96666);const h=e.iv`
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
`;var n=function(o,i,l,a){var w,r=arguments.length,u=r<3?i:null===a?a=Object.getOwnPropertyDescriptor(i,l):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)u=Reflect.decorate(o,i,l,a);else for(var p=o.length-1;p>=0;p--)(w=o[p])&&(u=(r<3?w(u):r>3?w(i,l,u):w(i,l))||u);return r>3&&u&&Object.defineProperty(i,l,u),u};let s=class extends e.oi{constructor(){super(...arguments),this.logo="google",this.name="Continue with google",this.align="left",this.disabled=!1}render(){return e.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,x.o)(this.tabIdx)}>
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
    `}templatePlacement(){return"center"===this.align?e.dy` <wui-logo class="invisible" logo=${this.logo}></wui-logo>`:null}};s.styles=[g.ET,g.ZM,h],n([(0,d.Cb)()],s.prototype,"logo",void 0),n([(0,d.Cb)()],s.prototype,"name",void 0),n([(0,d.Cb)()],s.prototype,"align",void 0),n([(0,d.Cb)()],s.prototype,"tabIdx",void 0),n([(0,d.Cb)({type:Boolean})],s.prototype,"disabled",void 0),s=n([(0,C.M)("wui-list-social")],s)},55155:(R,y,t)=>{"use strict";var e=t(59799),d=t(86523),v=(t(72686),t(11252),t(10831),t(79348),t(25518)),h=t(88814),n=t(70075);const s=e.iv`
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
`;var o=function(l,a,r,u){var f,w=arguments.length,p=w<3?a:null===u?u=Object.getOwnPropertyDescriptor(a,r):u;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)p=Reflect.decorate(l,a,r,u);else for(var b=l.length-1;b>=0;b--)(f=l[b])&&(p=(w<3?f(p):w>3?f(a,r,p):f(a,r))||p);return w>3&&p&&Object.defineProperty(a,r,p),p};let i=class extends e.oi{constructor(){super(...arguments),this.tokenName="",this.tokenImageUrl="",this.tokenValue=0,this.tokenAmount="0.0",this.tokenCurrency="",this.clickable=!1}render(){return e.dy`
      <button data-clickable=${String(this.clickable)}>
        <wui-flex gap="s" alignItems="center">
          ${this.visualTemplate()}
          <wui-flex flexDirection="column" justifyContent="spaceBetween">
            <wui-text variant="paragraph-500" color="fg-100">${this.tokenName}</wui-text>
            <wui-text variant="small-400" color="fg-200">
              ${h.H.formatNumberToLocalString(this.tokenAmount,4)} ${this.tokenCurrency}
            </wui-text>
          </wui-flex>
        </wui-flex>
        <wui-text variant="paragraph-500" color="fg-100">$${this.tokenValue.toFixed(2)}</wui-text>
      </button>
    `}visualTemplate(){return this.tokenName&&this.tokenImageUrl?e.dy`<wui-image alt=${this.tokenName} src=${this.tokenImageUrl}></wui-image>`:e.dy`<wui-icon name="coinPlaceholder" color="fg-100"></wui-icon>`}};i.styles=[v.ET,v.ZM,s],o([(0,d.Cb)()],i.prototype,"tokenName",void 0),o([(0,d.Cb)()],i.prototype,"tokenImageUrl",void 0),o([(0,d.Cb)({type:Number})],i.prototype,"tokenValue",void 0),o([(0,d.Cb)()],i.prototype,"tokenAmount",void 0),o([(0,d.Cb)()],i.prototype,"tokenCurrency",void 0),o([(0,d.Cb)({type:Boolean})],i.prototype,"clickable",void 0),i=o([(0,n.M)("wui-list-token")],i)},32714:(R,y,t)=>{"use strict";t(7890)},3715:(R,y,t)=>{"use strict";var e=t(59799),d=t(86523),c=(t(10831),t(25518)),g=t(70075);const C=e.iv`
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
`;var v=function(n,s,o,i){var r,l=arguments.length,a=l<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(n,s,o,i);else for(var u=n.length-1;u>=0;u--)(r=n[u])&&(a=(l<3?r(a):l>3?r(s,o,a):r(s,o))||a);return l>3&&a&&Object.defineProperty(s,o,a),a};let h=class extends e.oi{constructor(){super(...arguments),this.text=""}render(){return e.dy`${this.template()}`}template(){return this.text?e.dy`<wui-text variant="small-500" color="fg-200">${this.text}</wui-text>`:null}};h.styles=[c.ET,C],v([(0,d.Cb)()],h.prototype,"text",void 0),h=v([(0,g.M)("wui-separator")],h)},39927:(R,y,t)=>{"use strict";t(28019)},35205:(R,y,t)=>{"use strict";var e=t(59799),d=t(86523),c=(t(11252),t(25518)),g=t(88814),C=t(70075);const v=e.iv`
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
`;var h=function(s,o,i,l){var u,a=arguments.length,r=a<3?o:null===l?l=Object.getOwnPropertyDescriptor(o,i):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(s,o,i,l);else for(var w=s.length-1;w>=0;w--)(u=s[w])&&(r=(a<3?u(r):a>3?u(o,i,r):u(o,i))||r);return a>3&&r&&Object.defineProperty(o,i,r),r};let n=class extends e.oi{constructor(){super(...arguments),this.imageSrc=void 0,this.alt=void 0,this.address=void 0,this.size="xl"}render(){return this.style.cssText=`\n    --local-width: var(--wui-icon-box-size-${this.size});\n    --local-height: var(--wui-icon-box-size-${this.size});\n    `,e.dy`${this.visualTemplate()}`}visualTemplate(){if(this.imageSrc)return this.dataset.variant="image",e.dy`<wui-image src=${this.imageSrc} alt=${this.alt??"avatar"}></wui-image>`;if(this.address){this.dataset.variant="generated";const o=g.H.generateAvatarColors(this.address);return this.style.cssText+=`\n ${o}`,null}return this.dataset.variant="default",null}};n.styles=[c.ET,v],h([(0,d.Cb)()],n.prototype,"imageSrc",void 0),h([(0,d.Cb)()],n.prototype,"alt",void 0),h([(0,d.Cb)()],n.prototype,"address",void 0),h([(0,d.Cb)()],n.prototype,"size",void 0),n=h([(0,C.M)("wui-avatar")],n)},96666:(R,y,t)=>{"use strict";var e=t(59799),d=t(86523),c=(t(72686),t(25518)),g=t(70075);const C=e.iv`
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
`;var v=function(n,s,o,i){var r,l=arguments.length,a=l<3?s:null===i?i=Object.getOwnPropertyDescriptor(s,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(n,s,o,i);else for(var u=n.length-1;u>=0;u--)(r=n[u])&&(a=(l<3?r(a):l>3?r(s,o,a):r(s,o))||a);return l>3&&a&&Object.defineProperty(s,o,a),a};let h=class extends e.oi{constructor(){super(...arguments),this.logo="google"}render(){return e.dy`<wui-icon color="inherit" size="inherit" name=${this.logo}></wui-icon> `}};h.styles=[c.ET,C],v([(0,d.Cb)()],h.prototype,"logo",void 0),h=v([(0,g.M)("wui-logo")],h)},7890:(R,y,t)=>{"use strict";var e=t(59799),d=t(86523);const x=e.YP`<svg width="86" height="96" fill="none">
  <path
    d="M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z"
  />
</svg>`;var c=t(85359);const g=e.YP`
  <svg fill="none" viewBox="0 0 36 40">
    <path
      d="M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z"
    />
  </svg>
`;t(72686),t(11252);var h=t(25518),n=t(70075);const s=e.iv`
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
`;var o=function(l,a,r,u){var f,w=arguments.length,p=w<3?a:null===u?u=Object.getOwnPropertyDescriptor(a,r):u;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)p=Reflect.decorate(l,a,r,u);else for(var b=l.length-1;b>=0;b--)(f=l[b])&&(p=(w<3?f(p):w>3?f(a,r,p):f(a,r))||p);return w>3&&p&&Object.defineProperty(a,r,p),p};let i=class extends e.oi{constructor(){super(...arguments),this.size="md",this.name="uknown",this.networkImagesBySize={sm:g,md:c.W,lg:x},this.selected=!1,this.round=!1}render(){return this.round?(this.dataset.round="true",this.style.cssText="\n      --local-width: var(--wui-spacing-3xl);\n      --local-height: var(--wui-spacing-3xl);\n      --local-icon-size: var(--wui-spacing-l);\n    "):this.style.cssText=`\n\n      --local-path: var(--wui-path-network-${this.size});\n      --local-width:  var(--wui-width-network-${this.size});\n      --local-height:  var(--wui-height-network-${this.size});\n      --local-icon-size:  var(--wui-icon-size-network-${this.size});\n    `,e.dy`${this.templateVisual()} ${this.svgTemplate()} `}svgTemplate(){return this.round?null:this.networkImagesBySize[this.size]}templateVisual(){return this.imageSrc?e.dy`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:e.dy`<wui-icon size="inherit" color="fg-200" name="networkPlaceholder"></wui-icon>`}};i.styles=[h.ET,s],o([(0,d.Cb)()],i.prototype,"size",void 0),o([(0,d.Cb)()],i.prototype,"name",void 0),o([(0,d.Cb)({type:Object})],i.prototype,"networkImagesBySize",void 0),o([(0,d.Cb)()],i.prototype,"imageSrc",void 0),o([(0,d.Cb)({type:Boolean})],i.prototype,"selected",void 0),o([(0,d.Cb)({type:Boolean})],i.prototype,"round",void 0),i=o([(0,n.M)("wui-network-image")],i)},62277:(R,y,t)=>{"use strict";t.d(y,{w:()=>p,M:()=>w});var e=t(49671),d=t(17627),x=t(66848),c=t(76577),g=t(28544),C=t(89840),v=t(5383),h=t(16537);var s=t(80770),o=t(62910),i=t(30930);const l="/docs/contract/encodeErrorResult";function a(_){const{abi:E,errorName:S,args:O}=_;let m=E[0];if(S){const A=(0,i.mE)({abi:E,args:O,name:S});if(!A)throw new c.MS(S,{docsPath:l});m=A}if("error"!==m.type)throw new c.MS(void 0,{docsPath:l});const F=(0,h.t)(m),T=(0,C.C)(F);let P="0x";if(O&&O.length>0){if(!m.inputs)throw new c.Zh(m.name,{docsPath:l});P=(0,o.E)(m.inputs,O)}return(0,s.SM)([T,P])}const r="/docs/contract/encodeFunctionResult";const w="x-batch-gateway:true";function p(_){return f.apply(this,arguments)}function f(){return f=(0,e.Z)(function*(_){const{data:E,ccipRequest:S}=_,{args:[O]}=function n(_){const{abi:E,data:S}=_,O=(0,g.tP)(S,0,4),m=E.find(F=>"function"===F.type&&O===(0,C.C)((0,h.t)(F)));if(!m)throw new c.eF(O,{docsPath:"/docs/contract/decodeFunctionData"});return{functionName:m.name,args:"inputs"in m&&m.inputs&&m.inputs.length>0?(0,v.r)(m.inputs,(0,g.tP)(S,4)):void 0}}({abi:d.Yi,data:E}),m=[],F=[];return yield Promise.all(O.map(function(){var T=(0,e.Z)(function*(P,A){try{F[A]=yield S(P),m[A]=!1}catch(M){m[A]=!0,F[A]=function b(_){return"HttpRequestError"===_.name&&_.status?a({abi:d.Yi,errorName:"HttpError",args:[_.status,_.shortMessage]}):a({abi:[x.Up],errorName:"Error",args:["shortMessage"in _?_.shortMessage:_.message]})}(M)}});return function(P,A){return T.apply(this,arguments)}}())),function u(_){const{abi:E,functionName:S,result:O}=_;let m=E[0];if(S){const T=(0,i.mE)({abi:E,name:S});if(!T)throw new c.xL(S,{docsPath:r});m=T}if("function"!==m.type)throw new c.xL(void 0,{docsPath:r});if(!m.outputs)throw new c.MX(m.name,{docsPath:r});const F=(()=>{if(0===m.outputs.length)return[];if(1===m.outputs.length)return[O];if(Array.isArray(O))return O;throw new c.hn(O)})();return(0,o.E)(m.outputs,F)}({abi:d.Yi,functionName:"query",result:[m,F]})}),f.apply(this,arguments)}}}]);