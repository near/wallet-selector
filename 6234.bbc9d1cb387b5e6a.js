"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[6234],{34522:(w,g,r)=>{r.r(g),r.d(g,{W3mTransactionsView:()=>l});var d=r(59799),u=r(50860);r(937),r(41643);const p=d.iv`
  :host > wui-flex:first-child {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }
`;let l=class extends d.oi{render(){return d.dy`
      <wui-flex flexDirection="column" .padding=${["0","m","m","m"]} gap="s">
        <w3m-activity-list page="activity"></w3m-activity-list>
      </wui-flex>
    `}};l.styles=p,l=function(i,s,t,n){var e,a=arguments.length,o=a<3?s:null===n?n=Object.getOwnPropertyDescriptor(s,t):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(i,s,t,n);else for(var c=i.length-1;c>=0;c--)(e=i[c])&&(o=(a<3?e(o):a>3?e(s,t,o):e(s,t))||o);return a>3&&o&&Object.defineProperty(s,t,o),o}([(0,u.Mo)("w3m-transactions-view")],l)},6500:(w,g,r)=>{r(87538)},88198:(w,g,r)=>{var d=r(59799),u=r(86523),f=r(23107),p=(r(10831),r(25518)),h=r(70075);const l=d.iv`
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
`;var i=function(t,n,a,o){var b,e=arguments.length,c=e<3?n:null===o?o=Object.getOwnPropertyDescriptor(n,a):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,n,a,o);else for(var m=t.length-1;m>=0;m--)(b=t[m])&&(c=(e<3?b(c):e>3?b(n,a,c):b(n,a))||c);return e>3&&c&&Object.defineProperty(n,a,c),c};let s=class extends d.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return d.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,f.o)(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};s.styles=[p.ET,p.ZM,l],i([(0,u.Cb)()],s.prototype,"tabIdx",void 0),i([(0,u.Cb)({type:Boolean})],s.prototype,"disabled",void 0),i([(0,u.Cb)()],s.prototype,"color",void 0),s=i([(0,h.M)("wui-link")],s)},74690:(w,g,r)=>{var d=r(59799),v=(r(294),r(79348),r(25518)),p=r(70075);const h=d.iv`
  :host > wui-flex:first-child {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
  }

  wui-flex {
    display: flex;
    flex: 1;
  }
`;let i=class extends d.oi{render(){return d.dy`
      <wui-flex alignItems="center">
        <wui-shimmer width="40px" height="40px"></wui-shimmer>
        <wui-flex flexDirection="column" gap="2xs">
          <wui-shimmer width="72px" height="16px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="148px" height="14px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
        <wui-shimmer width="24px" height="12px" borderRadius="5xs"></wui-shimmer>
      </wui-flex>
    `}};i.styles=[v.ET,h],i=function(s,t,n,a){var c,o=arguments.length,e=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)e=Reflect.decorate(s,t,n,a);else for(var b=s.length-1;b>=0;b--)(c=s[b])&&(e=(o<3?c(e):o>3?c(t,n,e):c(t,n))||e);return o>3&&e&&Object.defineProperty(t,n,e),e}([(0,p.M)("wui-transaction-list-item-loader")],i)},11252:(w,g,r)=>{var d=r(59799),u=r(86523),f=r(25518),v=r(70075);const p=d.iv`
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
`;var h=function(i,s,t,n){var e,a=arguments.length,o=a<3?s:null===n?n=Object.getOwnPropertyDescriptor(s,t):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(i,s,t,n);else for(var c=i.length-1;c>=0;c--)(e=i[c])&&(o=(a<3?e(o):a>3?e(s,t,o):e(s,t))||o);return a>3&&o&&Object.defineProperty(s,t,o),o};let l=class extends d.oi{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`\n      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};\n      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};\n      `,d.dy`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};l.styles=[f.ET,f.Bp,p],h([(0,u.Cb)()],l.prototype,"src",void 0),h([(0,u.Cb)()],l.prototype,"alt",void 0),h([(0,u.Cb)()],l.prototype,"size",void 0),l=h([(0,v.M)("wui-image")],l)},294:(w,g,r)=>{var d=r(59799),u=r(86523),f=r(70075);const v=d.iv`
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
`;var p=function(l,i,s,t){var o,n=arguments.length,a=n<3?i:null===t?t=Object.getOwnPropertyDescriptor(i,s):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(l,i,s,t);else for(var e=l.length-1;e>=0;e--)(o=l[e])&&(a=(n<3?o(a):n>3?o(i,s,a):o(i,s))||a);return n>3&&a&&Object.defineProperty(i,s,a),a};let h=class extends d.oi{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m",this.variant="default"}render(){return this.style.cssText=`\n      width: ${this.width};\n      height: ${this.height};\n      border-radius: clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px);\n    `,d.dy`<slot></slot>`}};h.styles=[v],p([(0,u.Cb)()],h.prototype,"width",void 0),p([(0,u.Cb)()],h.prototype,"height",void 0),p([(0,u.Cb)()],h.prototype,"borderRadius",void 0),p([(0,u.Cb)()],h.prototype,"variant",void 0),h=p([(0,f.M)("wui-shimmer")],h)},87538:(w,g,r)=>{var d=r(59799),u=r(86523),v=(r(72686),r(25518)),p=r(70075);const h=d.iv`
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
`;var l=function(s,t,n,a){var c,o=arguments.length,e=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)e=Reflect.decorate(s,t,n,a);else for(var b=s.length-1;b>=0;b--)(c=s[b])&&(e=(o<3?c(e):o>3?c(t,n,e):c(t,n))||e);return o>3&&e&&Object.defineProperty(t,n,e),e};let i=class extends d.oi{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){const t=this.iconSize||this.size,n="lg"===this.size,a="xl"===this.size,o=n?"12%":"16%",e=n?"xxs":a?"s":"3xl",c="gray"===this.background,b="opaque"===this.background,m="accent-100"===this.backgroundColor&&b||"success-100"===this.backgroundColor&&b||"error-100"===this.backgroundColor&&b||"inverse-100"===this.backgroundColor&&b;let x=`var(--wui-color-${this.backgroundColor})`;return m?x=`var(--wui-icon-box-bg-${this.backgroundColor})`:c&&(x=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`\n       --local-bg-value: ${x};\n       --local-bg-mix: ${m||c?"100%":o};\n       --local-border-radius: var(--wui-border-radius-${e});\n       --local-size: var(--wui-icon-box-size-${this.size});\n       --local-border: ${"wui-color-bg-125"===this.borderColor?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}\n   `,d.dy` <wui-icon color=${this.iconColor} size=${t} name=${this.icon}></wui-icon> `}};i.styles=[v.ET,v.ZM,h],l([(0,u.Cb)()],i.prototype,"size",void 0),l([(0,u.Cb)()],i.prototype,"backgroundColor",void 0),l([(0,u.Cb)()],i.prototype,"iconColor",void 0),l([(0,u.Cb)()],i.prototype,"iconSize",void 0),l([(0,u.Cb)()],i.prototype,"background",void 0),l([(0,u.Cb)({type:Boolean})],i.prototype,"border",void 0),l([(0,u.Cb)()],i.prototype,"borderColor",void 0),l([(0,u.Cb)()],i.prototype,"icon",void 0),i=l([(0,p.M)("wui-icon-box")],i)}}]);