"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[9337],{99409:(y,m,t)=>{t(45841)},78549:(y,m,t)=>{var c=t(59799),a=t(86523),f=t(25518),b=t(70075);const w=c.iv`
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
`;var v=function(i,u,o,n){var e,r=arguments.length,s=r<3?u:null===n?n=Object.getOwnPropertyDescriptor(u,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(i,u,o,n);else for(var l=i.length-1;l>=0;l--)(e=i[l])&&(s=(r<3?e(s):r>3?e(u,o,s):e(u,o))||s);return r>3&&s&&Object.defineProperty(u,o,s),s};let d=class extends c.oi{constructor(){super(...arguments),this.color="accent-100",this.size="lg"}render(){return this.style.cssText="--local-color: "+("inherit"===this.color?"inherit":`var(--wui-color-${this.color})`),this.dataset.size=this.size,c.dy`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`}};d.styles=[f.ET,w],v([(0,a.Cb)()],d.prototype,"color",void 0),v([(0,a.Cb)()],d.prototype,"size",void 0),d=v([(0,b.M)("wui-loading-spinner")],d)},45841:(y,m,t)=>{var c=t(59799),a=t(86523),w=(t(78549),t(10831),t(25518)),v=t(70075);const d=c.iv`
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
`;var i=function(s,e,l,p){var x,h=arguments.length,g=h<3?e:null===p?p=Object.getOwnPropertyDescriptor(e,l):p;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(s,e,l,p);else for(var z=s.length-1;z>=0;z--)(x=s[z])&&(g=(h<3?x(g):h>3?x(e,l,g):x(e,l))||g);return h>3&&g&&Object.defineProperty(e,l,g),g};const u={main:"inverse-100",inverse:"inverse-000",accent:"accent-100","accent-error":"error-100","accent-success":"success-100",neutral:"fg-100",disabled:"gray-glass-020"},o={lg:"paragraph-600",md:"small-600"},n={lg:"md",md:"md"};let r=class extends c.oi{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="main",this.hasIconLeft=!1,this.hasIconRight=!1,this.borderRadius="m"}render(){this.style.cssText=`\n    --local-width: ${this.fullWidth?"100%":"auto"};\n    --local-opacity-100: ${this.loading?0:1};\n    --local-opacity-000: ${this.loading?1:0};\n    --local-border-radius: var(--wui-border-radius-${this.borderRadius});\n    `;const e=this.textVariant??o[this.size];return c.dy`
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
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){if(this.loading){const e=n[this.size],l=this.disabled?u.disabled:u[this.variant];return c.dy`<wui-loading-spinner color=${l} size=${e}></wui-loading-spinner>`}return c.dy``}};r.styles=[w.ET,w.ZM,d],i([(0,a.Cb)()],r.prototype,"size",void 0),i([(0,a.Cb)({type:Boolean})],r.prototype,"disabled",void 0),i([(0,a.Cb)({type:Boolean})],r.prototype,"fullWidth",void 0),i([(0,a.Cb)({type:Boolean})],r.prototype,"loading",void 0),i([(0,a.Cb)()],r.prototype,"variant",void 0),i([(0,a.Cb)({type:Boolean})],r.prototype,"hasIconLeft",void 0),i([(0,a.Cb)({type:Boolean})],r.prototype,"hasIconRight",void 0),i([(0,a.Cb)()],r.prototype,"borderRadius",void 0),i([(0,a.Cb)()],r.prototype,"textVariant",void 0),r=i([(0,v.M)("wui-button")],r)},87538:(y,m,t)=>{var c=t(59799),a=t(86523),b=(t(72686),t(25518)),w=t(70075);const v=c.iv`
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
`;var d=function(u,o,n,r){var l,s=arguments.length,e=s<3?o:null===r?r=Object.getOwnPropertyDescriptor(o,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)e=Reflect.decorate(u,o,n,r);else for(var p=u.length-1;p>=0;p--)(l=u[p])&&(e=(s<3?l(e):s>3?l(o,n,e):l(o,n))||e);return s>3&&e&&Object.defineProperty(o,n,e),e};let i=class extends c.oi{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){const o=this.iconSize||this.size,n="lg"===this.size,r="xl"===this.size,s=n?"12%":"16%",e=n?"xxs":r?"s":"3xl",l="gray"===this.background,p="opaque"===this.background,h="accent-100"===this.backgroundColor&&p||"success-100"===this.backgroundColor&&p||"error-100"===this.backgroundColor&&p||"inverse-100"===this.backgroundColor&&p;let g=`var(--wui-color-${this.backgroundColor})`;return h?g=`var(--wui-icon-box-bg-${this.backgroundColor})`:l&&(g=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`\n       --local-bg-value: ${g};\n       --local-bg-mix: ${h||l?"100%":s};\n       --local-border-radius: var(--wui-border-radius-${e});\n       --local-size: var(--wui-icon-box-size-${this.size});\n       --local-border: ${"wui-color-bg-125"===this.borderColor?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}\n   `,c.dy` <wui-icon color=${this.iconColor} size=${o} name=${this.icon}></wui-icon> `}};i.styles=[b.ET,b.ZM,v],d([(0,a.Cb)()],i.prototype,"size",void 0),d([(0,a.Cb)()],i.prototype,"backgroundColor",void 0),d([(0,a.Cb)()],i.prototype,"iconColor",void 0),d([(0,a.Cb)()],i.prototype,"iconSize",void 0),d([(0,a.Cb)()],i.prototype,"background",void 0),d([(0,a.Cb)({type:Boolean})],i.prototype,"border",void 0),d([(0,a.Cb)()],i.prototype,"borderColor",void 0),d([(0,a.Cb)()],i.prototype,"icon",void 0),i=d([(0,w.M)("wui-icon-box")],i)},87162:(y,m,t)=>{var c=t(59799),a=t(86523),f=t(69069),b=t(23107),w=t(29768),d=(t(72686),t(25518)),i=t(70075);const u=c.iv`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  input {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
    color: var(--wui-color-fg-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
    caret-color: var(--wui-color-accent-100);
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  input:disabled::placeholder,
  input:disabled + wui-icon {
    color: var(--wui-color-fg-300);
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  input:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px var(--wui-spacing-s);
  }

  wui-icon + .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px 36px;
  }

  wui-icon[data-input='sm'] {
    left: var(--wui-spacing-s);
  }

  .wui-size-md {
    padding: 15px var(--wui-spacing-m) var(--wui-spacing-l) var(--wui-spacing-m);
  }

  wui-icon + .wui-size-md,
  wui-loading-spinner + .wui-size-md {
    padding: 10.5px var(--wui-spacing-3xl) 10.5px var(--wui-spacing-3xl);
  }

  wui-icon[data-input='md'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-lg {
    padding: var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-l);
    letter-spacing: var(--wui-letter-spacing-medium-title);
    font-size: var(--wui-font-size-medium-title);
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    color: var(--wui-color-fg-100);
    height: 64px;
  }

  .wui-padding-right-xs {
    padding-right: var(--wui-spacing-xs);
  }

  .wui-padding-right-s {
    padding-right: var(--wui-spacing-s);
  }

  .wui-padding-right-m {
    padding-right: var(--wui-spacing-m);
  }

  .wui-padding-right-l {
    padding-right: var(--wui-spacing-l);
  }

  .wui-padding-right-xl {
    padding-right: var(--wui-spacing-xl);
  }

  .wui-padding-right-2xl {
    padding-right: var(--wui-spacing-2xl);
  }

  .wui-padding-right-3xl {
    padding-right: var(--wui-spacing-3xl);
  }

  .wui-padding-right-4xl {
    padding-right: var(--wui-spacing-4xl);
  }

  .wui-padding-right-5xl {
    padding-right: var(--wui-spacing-5xl);
  }

  wui-icon + .wui-size-lg,
  wui-loading-spinner + .wui-size-lg {
    padding-left: 50px;
  }

  wui-icon[data-input='lg'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-m) 17.25px var(--wui-spacing-m);
  }
  wui-icon + .wui-size-mdl,
  wui-loading-spinner + .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-3xl) 17.25px 40px;
  }
  wui-icon[data-input='mdl'] {
    left: var(--wui-spacing-m);
  }

  input:placeholder-shown ~ ::slotted(wui-input-element),
  input:placeholder-shown ~ ::slotted(wui-icon) {
    opacity: 0;
    pointer-events: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  ::slotted(wui-input-element),
  ::slotted(wui-icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  ::slotted(wui-input-element) {
    right: var(--wui-spacing-m);
  }

  ::slotted(wui-icon) {
    right: 0px;
  }
`;var o=function(r,s,e,l){var g,p=arguments.length,h=p<3?s:null===l?l=Object.getOwnPropertyDescriptor(s,e):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)h=Reflect.decorate(r,s,e,l);else for(var x=r.length-1;x>=0;x--)(g=r[x])&&(h=(p<3?g(h):p>3?g(s,e,h):g(s,e))||h);return p>3&&h&&Object.defineProperty(s,e,h),h};let n=class extends c.oi{constructor(){super(...arguments),this.inputElementRef=(0,w.V)(),this.size="md",this.disabled=!1,this.placeholder="",this.type="text",this.value=""}render(){const s=`wui-padding-right-${this.inputRightPadding}`,l={[`wui-size-${this.size}`]:!0,[s]:!!this.inputRightPadding};return c.dy`${this.templateIcon()}
      <input
        data-testid="wui-input-text"
        ${(0,w.i)(this.inputElementRef)}
        class=${(0,f.$)(l)}
        type=${this.type}
        enterkeyhint=${(0,b.o)(this.enterKeyHint)}
        ?disabled=${this.disabled}
        placeholder=${this.placeholder}
        @input=${this.dispatchInputChangeEvent.bind(this)}
        .value=${this.value||""}
        tabindex=${(0,b.o)(this.tabIdx)}
      />
      <slot></slot>`}templateIcon(){return this.icon?c.dy`<wui-icon
        data-input=${this.size}
        size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};n.styles=[d.ET,d.ZM,u],o([(0,a.Cb)()],n.prototype,"size",void 0),o([(0,a.Cb)()],n.prototype,"icon",void 0),o([(0,a.Cb)({type:Boolean})],n.prototype,"disabled",void 0),o([(0,a.Cb)()],n.prototype,"placeholder",void 0),o([(0,a.Cb)()],n.prototype,"type",void 0),o([(0,a.Cb)()],n.prototype,"keyHint",void 0),o([(0,a.Cb)()],n.prototype,"value",void 0),o([(0,a.Cb)()],n.prototype,"inputRightPadding",void 0),o([(0,a.Cb)()],n.prototype,"tabIdx",void 0),n=o([(0,i.M)("wui-input-text")],n)},29768:(y,m,t)=>{t.d(m,{V:()=>b,i:()=>d});var c=t(35221),a=t(36603),f=t(49501);const b=()=>new w;class w{}const v=new WeakMap,d=(0,f.XM)(class extends a.sR{render(i){return c.Ld}update(i,[u]){const o=u!==this.G;return o&&void 0!==this.G&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.G=u,this.ht=i.options?.host,this.rt(this.ct=i.element)),c.Ld}rt(i){if(this.isConnected||(i=void 0),"function"==typeof this.G){const u=this.ht??globalThis;let o=v.get(u);void 0===o&&(o=new WeakMap,v.set(u,o)),void 0!==o.get(this.G)&&this.G.call(this.ht,void 0),o.set(this.G,i),void 0!==i&&this.G.call(this.ht,i)}else this.G.value=i}get lt(){return"function"==typeof this.G?v.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}})}}]);