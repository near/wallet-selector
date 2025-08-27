"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6874],{6874:function(e,t,a){a.r(t),a.d(t,{W3mWalletReceiveView:function(){return C}});var i=a(44920),r=a(30077),o=a(52608),s=a(69479),n=a(2706),c=a(25721),l=a(93934),d=a(36139),u=a(40458),w=a(77405),p=a(23704),h=a(93907);a(31999),a(85724),a(50992),a(99671),a(55802);var g=a(17770),b=a(66501),v=i.iv`
  button {
    display: flex;
    gap: var(--wui-spacing-xl);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xxs);
    padding: var(--wui-spacing-m) var(--wui-spacing-s);
  }

  wui-text {
    width: 100%;
  }

  wui-flex {
    width: auto;
  }

  .network-icon {
    width: var(--wui-spacing-2l);
    height: var(--wui-spacing-2l);
    border-radius: calc(var(--wui-spacing-2l) / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px var(--wui-color-gray-glass-002),
      0 0 0 3px var(--wui-color-modal-bg);
  }
`,m=function(e,t,a,i){var r,o=arguments.length,s=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,a,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(o<3?r(s):o>3?r(t,a,s):r(t,a))||s);return o>3&&s&&Object.defineProperty(t,a,s),s};let f=class extends i.oi{constructor(){super(...arguments),this.networkImages=[""],this.text=""}render(){return i.dy`
      <button>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
        <wui-flex gap="3xs" alignItems="center">
          ${this.networksTemplate()}
          <wui-icon name="chevronRight" size="sm" color="fg-200"></wui-icon>
        </wui-flex>
      </button>
    `}networksTemplate(){let e=this.networkImages.slice(0,5);return i.dy` <wui-flex class="networks">
      ${e?.map(e=>i.dy` <wui-flex class="network-icon"> <wui-image src=${e}></wui-image> </wui-flex>`)}
    </wui-flex>`}};f.styles=[g.ET,g.ZM,v],m([(0,r.Cb)({type:Array})],f.prototype,"networkImages",void 0),m([(0,r.Cb)()],f.prototype,"text",void 0),f=m([(0,b.M)("wui-compatible-network")],f),a(52042),a(26405),a(93595);var y=a(89499),x=i.iv`
  wui-compatible-network {
    margin-top: var(--wui-spacing-l);
  }
`,k=function(e,t,a,i){var r,o=arguments.length,s=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,a,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(o<3?r(s):o>3?r(t,a,s):r(t,a))||s);return o>3&&s&&Object.defineProperty(t,a,s),s};let C=class extends i.oi{constructor(){super(),this.unsubscribe=[],this.address=s.N.state.address,this.profileName=s.N.state.profileName,this.network=n.R.state.activeCaipNetwork,this.unsubscribe.push(...[s.N.subscribe(e=>{e.address?(this.address=e.address,this.profileName=e.profileName):c.K.showError("Account not found")})],n.R.subscribeKey("activeCaipNetwork",e=>{e?.id&&(this.network=e)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!this.address)throw Error("w3m-wallet-receive-view: No account provided");let e=l.f.getNetworkImage(this.network);return i.dy` <wui-flex
      flexDirection="column"
      .padding=${["0","l","l","l"]}
      alignItems="center"
    >
      <wui-chip-button
        data-testid="receive-address-copy-button"
        @click=${this.onCopyClick.bind(this)}
        text=${h.Hg.getTruncateString({string:this.profileName||this.address||"",charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
        icon="copy"
        size="sm"
        imageSrc=${e||""}
        variant="gray"
      ></wui-chip-button>
      <wui-flex
        flexDirection="column"
        .padding=${["l","0","0","0"]}
        alignItems="center"
        gap="s"
      >
        <wui-qr-code
          size=${232}
          theme=${d.u.state.themeMode}
          uri=${this.address}
          ?arenaClear=${!0}
          color=${(0,o.o)(d.u.state.themeVariables["--w3m-qr-color"])}
          data-testid="wui-qr-code"
        ></wui-qr-code>
        <wui-text variant="paragraph-500" color="fg-100" align="center">
          Copy your address or scan this QR code
        </wui-text>
      </wui-flex>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){let e=n.R.getAllRequestedCaipNetworks(),t=n.R.checkIfSmartAccountEnabled(),a=n.R.state.activeCaipNetwork,r=e.filter(e=>e?.chainNamespace===a?.chainNamespace);if((0,u.r9)(a?.chainNamespace)===y.y_.ACCOUNT_TYPES.SMART_ACCOUNT&&t)return a?i.dy`<wui-compatible-network
        @click=${this.onReceiveClick.bind(this)}
        text="Only receive assets on this network"
        .networkImages=${[l.f.getNetworkImage(a)??""]}
      ></wui-compatible-network>`:null;let o=r?.filter(e=>e?.assets?.imageId)?.slice(0,5),s=o.map(l.f.getNetworkImage).filter(Boolean);return i.dy`<wui-compatible-network
      @click=${this.onReceiveClick.bind(this)}
      text="Only receive assets on these networks"
      .networkImages=${s}
    ></wui-compatible-network>`}onReceiveClick(){w.P.push("WalletCompatibleNetworks")}onCopyClick(){try{this.address&&(p.j.copyToClopboard(this.address),c.K.showSuccess("Address copied"))}catch{c.K.showError("Failed to copy")}}};C.styles=x,k([(0,r.SB)()],C.prototype,"address",void 0),k([(0,r.SB)()],C.prototype,"profileName",void 0),k([(0,r.SB)()],C.prototype,"network",void 0),C=k([(0,h.Mo)("w3m-wallet-receive-view")],C)},31999:function(e,t,a){var i=a(44920),r=a(30077);a(85724),a(50992),a(99671);var o=a(17770),s=a(66501),n=i.iv`
  button {
    border: none;
    border-radius: var(--wui-border-radius-3xl);
  }

  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='gray'] {
    background-color: transparent;
    color: var(--wui-color-fg-200);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='shade'] {
    background-color: transparent;
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-size='sm'] {
    height: 32px;
    padding: 0 var(--wui-spacing-s);
  }

  button[data-size='md'] {
    height: 40px;
    padding: 0 var(--wui-spacing-l);
  }

  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] > wui-icon {
    width: 14px;
    height: 14px;
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  button.disabled > wui-icon,
  button.disabled > wui-image {
    filter: grayscale(1);
  }

  button[data-variant='main'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  button[data-variant='shade'] > wui-image,
  button[data-variant='gray'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:focus-visible {
      background-color: var(--wui-color-accent-090);
    }

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

    button[data-variant='shade']:focus-visible,
    button[data-variant='gray']:focus-visible,
    button[data-variant='shade']:hover,
    button[data-variant='gray']:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    button[data-variant='gray']:active,
    button[data-variant='shade']:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  button.disabled {
    color: var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    pointer-events: none;
  }
`,c=function(e,t,a,i){var r,o=arguments.length,s=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,a,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(o<3?r(s):o>3?r(t,a,s):r(t,a))||s);return o>3&&s&&Object.defineProperty(t,a,s),s};let l=class extends i.oi{constructor(){super(...arguments),this.variant="accent",this.imageSrc="",this.disabled=!1,this.icon="externalLink",this.size="md",this.text=""}render(){let e="sm"===this.size?"small-600":"paragraph-600";return i.dy`
      <button
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc?i.dy`<wui-image src=${this.imageSrc}></wui-image>`:null}
        <wui-text variant=${e} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `}};l.styles=[o.ET,o.ZM,n],c([(0,r.Cb)()],l.prototype,"variant",void 0),c([(0,r.Cb)()],l.prototype,"imageSrc",void 0),c([(0,r.Cb)({type:Boolean})],l.prototype,"disabled",void 0),c([(0,r.Cb)()],l.prototype,"icon",void 0),c([(0,r.Cb)()],l.prototype,"size",void 0),c([(0,r.Cb)()],l.prototype,"text",void 0),l=c([(0,s.M)("wui-chip-button")],l)}}]);