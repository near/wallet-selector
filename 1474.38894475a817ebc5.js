"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[1474],{96977:(k,_,t)=>{t.d(_,{M:()=>m});var r=t(24688),b=t(99071);const c=(0,r.sj)({isLegalCheckboxChecked:!1}),m={state:c,subscribe:p=>(0,r.Ld)(c,()=>p(c)),subscribeKey:(p,f)=>(0,b.VW)(c,p,f),setIsLegalCheckboxChecked(p){c.isLegalCheckboxChecked=p}}},45231:(k,_,t)=>{var r=t(59799),b=t(86523),c=t(96977),m=t(66301),p=t(50860),f=t(23107),w=t(29768),i=(t(72686),t(25518)),a=t(70075);const n=r.iv`
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
`;var e=function(g,l,y,C){var R,O=arguments.length,x=O<3?l:null===C?C=Object.getOwnPropertyDescriptor(l,y):C;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)x=Reflect.decorate(g,l,y,C);else for(var T=g.length-1;T>=0;T--)(R=g[T])&&(x=(O<3?R(x):O>3?R(l,y,x):R(l,y))||x);return O>3&&x&&Object.defineProperty(l,y,x),x};let o=class extends r.oi{constructor(){super(...arguments),this.inputElementRef=(0,w.V)(),this.checked=void 0}render(){return r.dy`
      <label>
        <input
          ${(0,w.i)(this.inputElementRef)}
          ?checked=${(0,f.o)(this.checked)}
          type="checkbox"
          @change=${this.dispatchChangeEvent}
        />
        <span>
          <wui-icon name="checkmarkBold" color="inverse-100" size="xxs"></wui-icon>
        </span>
        <slot></slot>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("checkboxChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};o.styles=[i.ET,n],e([(0,b.Cb)({type:Boolean})],o.prototype,"checked",void 0),o=e([(0,a.M)("wui-checkbox")],o);t(54575);const u=r.iv`
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
`;var d=function(g,l,y,C){var R,O=arguments.length,x=O<3?l:null===C?C=Object.getOwnPropertyDescriptor(l,y):C;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)x=Reflect.decorate(g,l,y,C);else for(var T=g.length-1;T>=0;T--)(R=g[T])&&(x=(O<3?R(x):O>3?R(l,y,x):R(l,y))||x);return O>3&&x&&Object.defineProperty(l,y,x),x};let v=class extends r.oi{constructor(){super(),this.unsubscribe=[],this.checked=c.M.state.isLegalCheckboxChecked,this.unsubscribe.push(c.M.subscribeKey("isLegalCheckboxChecked",l=>{this.checked=l}))}disconnectedCallback(){this.unsubscribe.forEach(l=>l())}render(){const{termsConditionsUrl:l,privacyPolicyUrl:y}=m.OptionsController.state,C=m.OptionsController.state.features?.legalCheckbox;return(l||y)&&C?r.dy`
      <wui-checkbox
        ?checked=${this.checked}
        @checkboxChange=${this.onCheckboxChange.bind(this)}
        data-testid="wui-checkbox"
      >
        <wui-text color="fg-250" variant="small-400" align="left">
          I agree to our ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
        </wui-text>
      </wui-checkbox>
    `:null}andTemplate(){const{termsConditionsUrl:l,privacyPolicyUrl:y}=m.OptionsController.state;return l&&y?"and":""}termsTemplate(){const{termsConditionsUrl:l}=m.OptionsController.state;return l?r.dy`<a rel="noreferrer" target="_blank" href=${l}>terms of service</a>`:null}privacyTemplate(){const{privacyPolicyUrl:l}=m.OptionsController.state;return l?r.dy`<a rel="noreferrer" target="_blank" href=${l}>privacy policy</a>`:null}onCheckboxChange(){c.M.setIsLegalCheckboxChecked(!this.checked)}};v.styles=[u],d([(0,b.SB)()],v.prototype,"checked",void 0),v=d([(0,p.Mo)("w3m-legal-checkbox")],v)},81616:(k,_,t)=>{var r=t(59799),b=t(86523),c=t(66301),m=t(50860);t(937),t(54575),t(30956);const h=r.iv`
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
`;var i=function(n,e,o,s){var v,u=arguments.length,d=u<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,o):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(n,e,o,s);else for(var g=n.length-1;g>=0;g--)(v=n[g])&&(d=(u<3?v(d):u>3?v(e,o,d):v(e,o))||d);return u>3&&d&&Object.defineProperty(e,o,d),d};let a=class extends r.oi{constructor(){super(),this.unsubscribe=[],this.remoteFeatures=c.OptionsController.state.remoteFeatures,this.unsubscribe.push(c.OptionsController.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{termsConditionsUrl:e,privacyPolicyUrl:o}=c.OptionsController.state,s=c.OptionsController.state.features?.legalCheckbox;return!e&&!o||s?r.dy`
        <wui-flex flexDirection="column"> ${this.reownBrandingTemplate(!0)} </wui-flex>
      `:r.dy`
      <wui-flex flexDirection="column">
        <wui-flex .padding=${["m","s","s","s"]} justifyContent="center">
          <wui-text color="fg-250" variant="small-400" align="center">
            By connecting your wallet, you agree to our <br />
            ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
          </wui-text>
        </wui-flex>
        ${this.reownBrandingTemplate()}
      </wui-flex>
    `}andTemplate(){const{termsConditionsUrl:e,privacyPolicyUrl:o}=c.OptionsController.state;return e&&o?"and":""}termsTemplate(){const{termsConditionsUrl:e}=c.OptionsController.state;return e?r.dy`<a href=${e}>Terms of Service</a>`:null}privacyTemplate(){const{privacyPolicyUrl:e}=c.OptionsController.state;return e?r.dy`<a href=${e}>Privacy Policy</a>`:null}reownBrandingTemplate(e=!1){return this.remoteFeatures?.reownBranding?e?r.dy`<wui-ux-by-reown class="branding-only"></wui-ux-by-reown>`:r.dy`<wui-ux-by-reown></wui-ux-by-reown>`:null}};a.styles=[h],i([(0,b.SB)()],a.prototype,"remoteFeatures",void 0),a=i([(0,m.Mo)("w3m-legal-footer")],a)},6500:(k,_,t)=>{t(87538)},51078:(k,_,t)=>{t(72686)},88198:(k,_,t)=>{var r=t(59799),b=t(86523),c=t(23107),p=(t(10831),t(25518)),f=t(70075);const w=r.iv`
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
`;var h=function(a,n,e,o){var d,s=arguments.length,u=s<3?n:null===o?o=Object.getOwnPropertyDescriptor(n,e):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)u=Reflect.decorate(a,n,e,o);else for(var v=a.length-1;v>=0;v--)(d=a[v])&&(u=(s<3?d(u):s>3?d(n,e,u):d(n,e))||u);return s>3&&u&&Object.defineProperty(n,e,u),u};let i=class extends r.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return r.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,c.o)(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};i.styles=[p.ET,p.ZM,w],h([(0,b.Cb)()],i.prototype,"tabIdx",void 0),h([(0,b.Cb)({type:Boolean})],i.prototype,"disabled",void 0),h([(0,b.Cb)()],i.prototype,"color",void 0),i=h([(0,f.M)("wui-link")],i)},44411:(k,_,t)=>{var r=t(59799),b=t(86523),c=t(25518),m=t(70075);const p=r.iv`
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
`;var f=function(h,i,a,n){var s,e=arguments.length,o=e<3?i:null===n?n=Object.getOwnPropertyDescriptor(i,a):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(h,i,a,n);else for(var u=h.length-1;u>=0;u--)(s=h[u])&&(o=(e<3?s(o):e>3?s(i,a,o):s(i,a))||o);return e>3&&o&&Object.defineProperty(i,a,o),o};let w=class extends r.oi{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){const i=this.radius>50?50:this.radius,n=36-i,e=116+n,o=245+n,s=360+1.75*n;return r.dy`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${i}
          stroke-dasharray="${e} ${o}"
          stroke-dashoffset=${s}
        />
      </svg>
    `}};w.styles=[c.ET,p],f([(0,b.Cb)({type:Number})],w.prototype,"radius",void 0),w=f([(0,m.M)("wui-loading-thumbnail")],w)},30956:(k,_,t)=>{var r=t(59799),p=(t(72686),t(10831),t(79348),t(16155)),f=t(25518),w=t(70075);const h=r.iv`
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
`;let a=class extends r.oi{render(){return r.dy`
      <a
        data-testid="ux-branding-reown"
        href=${p.Ub}
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
    `}};a.styles=[f.ET,f.ZM,h],a=function(n,e,o,s){var v,u=arguments.length,d=u<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,o):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(n,e,o,s);else for(var g=n.length-1;g>=0;g--)(v=n[g])&&(d=(u<3?v(d):u>3?v(e,o,d):v(e,o))||d);return u>3&&d&&Object.defineProperty(e,o,d),d}([(0,w.M)("wui-ux-by-reown")],a)},294:(k,_,t)=>{var r=t(59799),b=t(86523),c=t(70075);const m=r.iv`
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
`;var p=function(w,h,i,a){var o,n=arguments.length,e=n<3?h:null===a?a=Object.getOwnPropertyDescriptor(h,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)e=Reflect.decorate(w,h,i,a);else for(var s=w.length-1;s>=0;s--)(o=w[s])&&(e=(n<3?o(e):n>3?o(h,i,e):o(h,i))||e);return n>3&&e&&Object.defineProperty(h,i,e),e};let f=class extends r.oi{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m",this.variant="default"}render(){return this.style.cssText=`\n      width: ${this.width};\n      height: ${this.height};\n      border-radius: clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px);\n    `,r.dy`<slot></slot>`}};f.styles=[m],p([(0,b.Cb)()],f.prototype,"width",void 0),p([(0,b.Cb)()],f.prototype,"height",void 0),p([(0,b.Cb)()],f.prototype,"borderRadius",void 0),p([(0,b.Cb)()],f.prototype,"variant",void 0),f=p([(0,c.M)("wui-shimmer")],f)},16155:(k,_,t)=>{t.d(_,{Cv:()=>r,Ub:()=>c,ee:()=>b});const r=/[.*+?^${}()|[\]\\]/gu,b=/[0-9,.]/u,c="https://reown.com"}}]);