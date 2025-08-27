"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1169],{5927:function(o,t,e){e.r(t),e.d(t,{W3mTransactionsView:function(){return c}});var r=e(44920),i=e(93907);e(52042),e(93265);var s=r.iv`
  :host > wui-flex:first-child {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }
`;let c=class extends r.oi{render(){return r.dy`
      <wui-flex flexDirection="column" .padding=${["0","m","m","m"]} gap="s">
        <w3m-activity-list page="activity"></w3m-activity-list>
      </wui-flex>
    `}};c.styles=s,c=function(o,t,e,r){var i,s=arguments.length,c=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(o,t,e,r);else for(var a=o.length-1;a>=0;a--)(i=o[a])&&(c=(s<3?i(c):s>3?i(t,e,c):i(t,e))||c);return s>3&&c&&Object.defineProperty(t,e,c),c}([(0,i.Mo)("w3m-transactions-view")],c)},2065:function(o,t,e){e(42559)},42255:function(o,t,e){var r=e(44920),i=e(30077),s=e(52608);e(99671);var c=e(17770),a=e(66501),n=r.iv`
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
`,l=function(o,t,e,r){var i,s=arguments.length,c=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(o,t,e,r);else for(var a=o.length-1;a>=0;a--)(i=o[a])&&(c=(s<3?i(c):s>3?i(t,e,c):i(t,e))||c);return s>3&&c&&Object.defineProperty(t,e,c),c};let d=class extends r.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return r.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,s.o)(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};d.styles=[c.ET,c.ZM,n],l([(0,i.Cb)()],d.prototype,"tabIdx",void 0),l([(0,i.Cb)({type:Boolean})],d.prototype,"disabled",void 0),l([(0,i.Cb)()],d.prototype,"color",void 0),d=l([(0,a.M)("wui-link")],d)},50992:function(o,t,e){var r=e(44920),i=e(30077),s=e(17770),c=e(66501),a=r.iv`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  :host([data-object-fit='cover']) img {
    object-fit: cover;
    object-position: center center;
  }

  :host([data-object-fit='contain']) img {
    object-fit: contain;
    object-position: center center;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
`,n=function(o,t,e,r){var i,s=arguments.length,c=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(o,t,e,r);else for(var a=o.length-1;a>=0;a--)(i=o[a])&&(c=(s<3?i(c):s>3?i(t,e,c):i(t,e))||c);return s>3&&c&&Object.defineProperty(t,e,c),c};let l=class extends r.oi{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0,this.objectFit="cover"}render(){return this.objectFit&&(this.dataset.objectFit=this.objectFit),this.style.cssText=`
      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      `,r.dy`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};l.styles=[s.ET,s.Bp,a],n([(0,i.Cb)()],l.prototype,"src",void 0),n([(0,i.Cb)()],l.prototype,"alt",void 0),n([(0,i.Cb)()],l.prototype,"size",void 0),n([(0,i.Cb)()],l.prototype,"objectFit",void 0),l=n([(0,c.M)("wui-image")],l)},42559:function(o,t,e){var r=e(44920),i=e(30077);e(85724);var s=e(17770),c=e(66501),a=r.iv`
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
`,n=function(o,t,e,r){var i,s=arguments.length,c=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(o,t,e,r);else for(var a=o.length-1;a>=0;a--)(i=o[a])&&(c=(s<3?i(c):s>3?i(t,e,c):i(t,e))||c);return s>3&&c&&Object.defineProperty(t,e,c),c};let l=class extends r.oi{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){let o=this.iconSize||this.size,t="lg"===this.size,e="xl"===this.size,i="gray"===this.background,s="opaque"===this.background,c="accent-100"===this.backgroundColor&&s||"success-100"===this.backgroundColor&&s||"error-100"===this.backgroundColor&&s||"inverse-100"===this.backgroundColor&&s,a=`var(--wui-color-${this.backgroundColor})`;return c?a=`var(--wui-icon-box-bg-${this.backgroundColor})`:i&&(a=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`
       --local-bg-value: ${a};
       --local-bg-mix: ${c||i?"100%":t?"12%":"16%"};
       --local-border-radius: var(--wui-border-radius-${t?"xxs":e?"s":"3xl"});
       --local-size: var(--wui-icon-box-size-${this.size});
       --local-border: ${"wui-color-bg-125"===this.borderColor?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}
   `,r.dy` <wui-icon color=${this.iconColor} size=${o} name=${this.icon}></wui-icon> `}};l.styles=[s.ET,s.ZM,a],n([(0,i.Cb)()],l.prototype,"size",void 0),n([(0,i.Cb)()],l.prototype,"backgroundColor",void 0),n([(0,i.Cb)()],l.prototype,"iconColor",void 0),n([(0,i.Cb)()],l.prototype,"iconSize",void 0),n([(0,i.Cb)()],l.prototype,"background",void 0),n([(0,i.Cb)({type:Boolean})],l.prototype,"border",void 0),n([(0,i.Cb)()],l.prototype,"borderColor",void 0),n([(0,i.Cb)()],l.prototype,"icon",void 0),l=n([(0,c.M)("wui-icon-box")],l)}}]);