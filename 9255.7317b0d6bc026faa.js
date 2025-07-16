"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[9255],{78211:(f,w,e)=>{e.r(w),e.d(w,{W3mAllWalletsView:()=>c.b,W3mConnectingWcBasicView:()=>n.M,W3mDownloadsView:()=>p.X});var n=e(55136),c=e(43971),p=e(91986)},6500:(f,w,e)=>{e(87538)},51078:(f,w,e)=>{e(72686)},88198:(f,w,e)=>{var n=e(59799),c=e(86523),p=e(23107),v=(e(10831),e(25518)),u=e(70075);const _=n.iv`
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
`;var l=function(a,r,o,t){var b,s=arguments.length,d=s<3?r:null===t?t=Object.getOwnPropertyDescriptor(r,o):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(a,r,o,t);else for(var h=a.length-1;h>=0;h--)(b=a[h])&&(d=(s<3?b(d):s>3?b(r,o,d):b(r,o))||d);return s>3&&d&&Object.defineProperty(r,o,d),d};let i=class extends n.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return n.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,p.o)(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};i.styles=[v.ET,v.ZM,_],l([(0,c.Cb)()],i.prototype,"tabIdx",void 0),l([(0,c.Cb)({type:Boolean})],i.prototype,"disabled",void 0),l([(0,c.Cb)()],i.prototype,"color",void 0),i=l([(0,u.M)("wui-link")],i)},44411:(f,w,e)=>{var n=e(59799),c=e(86523),p=e(25518),g=e(70075);const v=n.iv`
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
`;var u=function(l,i,a,r){var s,o=arguments.length,t=o<3?i:null===r?r=Object.getOwnPropertyDescriptor(i,a):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)t=Reflect.decorate(l,i,a,r);else for(var d=l.length-1;d>=0;d--)(s=l[d])&&(t=(o<3?s(t):o>3?s(i,a,t):s(i,a))||t);return o>3&&t&&Object.defineProperty(i,a,t),t};let _=class extends n.oi{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){const i=this.radius>50?50:this.radius,r=36-i,o=116+r,t=245+r,s=360+1.75*r;return n.dy`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${i}
          stroke-dasharray="${o} ${t}"
          stroke-dashoffset=${s}
        />
      </svg>
    `}};_.styles=[p.ET,v],u([(0,c.Cb)({type:Number})],_.prototype,"radius",void 0),_=u([(0,g.M)("wui-loading-thumbnail")],_)},30956:(f,w,e)=>{var n=e(59799),v=(e(72686),e(10831),e(79348),e(16155)),u=e(25518),_=e(70075);const l=n.iv`
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
`;let a=class extends n.oi{render(){return n.dy`
      <a
        data-testid="ux-branding-reown"
        href=${v.Ub}
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
    `}};a.styles=[u.ET,u.ZM,l],a=function(r,o,t,s){var h,d=arguments.length,b=d<3?o:null===s?s=Object.getOwnPropertyDescriptor(o,t):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)b=Reflect.decorate(r,o,t,s);else for(var m=r.length-1;m>=0;m--)(h=r[m])&&(b=(d<3?h(b):d>3?h(o,t,b):h(o,t))||b);return d>3&&b&&Object.defineProperty(o,t,b),b}([(0,_.M)("wui-ux-by-reown")],a)},294:(f,w,e)=>{var n=e(59799),c=e(86523),p=e(70075);const g=n.iv`
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
`;var v=function(_,l,i,a){var t,r=arguments.length,o=r<3?l:null===a?a=Object.getOwnPropertyDescriptor(l,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(_,l,i,a);else for(var s=_.length-1;s>=0;s--)(t=_[s])&&(o=(r<3?t(o):r>3?t(l,i,o):t(l,i))||o);return r>3&&o&&Object.defineProperty(l,i,o),o};let u=class extends n.oi{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m",this.variant="default"}render(){return this.style.cssText=`\n      width: ${this.width};\n      height: ${this.height};\n      border-radius: clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px);\n    `,n.dy`<slot></slot>`}};u.styles=[g],v([(0,c.Cb)()],u.prototype,"width",void 0),v([(0,c.Cb)()],u.prototype,"height",void 0),v([(0,c.Cb)()],u.prototype,"borderRadius",void 0),v([(0,c.Cb)()],u.prototype,"variant",void 0),u=v([(0,p.M)("wui-shimmer")],u)},16155:(f,w,e)=>{e.d(w,{Cv:()=>n,Ub:()=>p,ee:()=>c});const n=/[.*+?^${}()|[\]\\]/gu,c=/[0-9,.]/u,p="https://reown.com"}}]);