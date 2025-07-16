"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[879],{80879:(W,S,t)=>{t.r(S),t.d(S,{W3mWalletReceiveView:()=>p});var a=t(59799),n=t(86523),I=t(23107),y=t(22917),b=t(20597),f=t(76169),C=t(17111),A=t(56364),u=t(24380),s=t(18445),g=t(50860),m=(t(94215),t(72686),t(11252),t(10831),t(79348),t(25518)),$=t(70075);const O=a.iv`
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
`;var z=function(h,e,i,r){var l,c=arguments.length,o=c<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(h,e,i,r);else for(var d=h.length-1;d>=0;d--)(l=h[d])&&(o=(c<3?l(o):c>3?l(e,i,o):l(e,i))||o);return c>3&&o&&Object.defineProperty(e,i,o),o};let R=class extends a.oi{constructor(){super(...arguments),this.networkImages=[""],this.text=""}render(){return a.dy`
      <button>
        <wui-text variant="small-400" color="fg-200">${this.text}</wui-text>
        <wui-flex gap="3xs" alignItems="center">
          ${this.networksTemplate()}
          <wui-icon name="chevronRight" size="sm" color="fg-200"></wui-icon>
        </wui-flex>
      </button>
    `}networksTemplate(){const e=this.networkImages.slice(0,5);return a.dy` <wui-flex class="networks">
      ${e?.map(i=>a.dy` <wui-flex class="network-icon"> <wui-image src=${i}></wui-image> </wui-flex>`)}
    </wui-flex>`}};R.styles=[m.ET,m.ZM,O],z([(0,n.Cb)({type:Array})],R.prototype,"networkImages",void 0),z([(0,n.Cb)()],R.prototype,"text",void 0),R=z([(0,$.M)("wui-compatible-network")],R);t(937),t(73083),t(54575);var j=t(64599);const E=a.iv`
  wui-compatible-network {
    margin-top: var(--wui-spacing-l);
  }
`;var T=function(h,e,i,r){var l,c=arguments.length,o=c<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(h,e,i,r);else for(var d=h.length-1;d>=0;d--)(l=h[d])&&(o=(c<3?l(o):c>3?l(e,i,o):l(e,i))||o);return c>3&&o&&Object.defineProperty(e,i,o),o};let p=class extends a.oi{constructor(){super(),this.unsubscribe=[],this.address=y.AccountController.state.address,this.profileName=y.AccountController.state.profileName,this.network=b.R.state.activeCaipNetwork,this.preferredAccountTypes=y.AccountController.state.preferredAccountTypes,this.unsubscribe.push(y.AccountController.subscribe(e=>{e.address?(this.address=e.address,this.profileName=e.profileName,this.preferredAccountTypes=e.preferredAccountTypes):f.SnackController.showError("Account not found")}),b.R.subscribeKey("activeCaipNetwork",e=>{e?.id&&(this.network=e)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!this.address)throw new Error("w3m-wallet-receive-view: No account provided");const e=C.f.getNetworkImage(this.network);return a.dy` <wui-flex
      flexDirection="column"
      .padding=${["0","l","l","l"]}
      alignItems="center"
    >
      <wui-chip-button
        data-testid="receive-address-copy-button"
        @click=${this.onCopyClick.bind(this)}
        text=${g.Hg.getTruncateString({string:this.profileName||this.address||"",charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
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
          theme=${A.ThemeController.state.themeMode}
          uri=${this.address}
          ?arenaClear=${!0}
          color=${(0,I.o)(A.ThemeController.state.themeVariables["--w3m-qr-color"])}
          data-testid="wui-qr-code"
        ></wui-qr-code>
        <wui-text variant="paragraph-500" color="fg-100" align="center">
          Copy your address or scan this QR code
        </wui-text>
      </wui-flex>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){const e=b.R.getAllRequestedCaipNetworks(),i=b.R.checkIfSmartAccountEnabled(),r=b.R.state.activeCaipNetwork,c=e.filter(d=>d?.chainNamespace===r?.chainNamespace);if(this.preferredAccountTypes?.[r?.chainNamespace]===j.y_.ACCOUNT_TYPES.SMART_ACCOUNT&&i)return r?a.dy`<wui-compatible-network
        @click=${this.onReceiveClick.bind(this)}
        text="Only receive assets on this network"
        .networkImages=${[C.f.getNetworkImage(r)??""]}
      ></wui-compatible-network>`:null;const l=(c?.filter(d=>d?.assets?.imageId)?.slice(0,5)).map(C.f.getNetworkImage).filter(Boolean);return a.dy`<wui-compatible-network
      @click=${this.onReceiveClick.bind(this)}
      text="Only receive assets on these networks"
      .networkImages=${l}
    ></wui-compatible-network>`}onReceiveClick(){u.RouterController.push("WalletCompatibleNetworks")}onCopyClick(){try{this.address&&(s.j.copyToClopboard(this.address),f.SnackController.showSuccess("Address copied"))}catch{f.SnackController.showError("Failed to copy")}}};p.styles=E,T([(0,n.SB)()],p.prototype,"address",void 0),T([(0,n.SB)()],p.prototype,"profileName",void 0),T([(0,n.SB)()],p.prototype,"network",void 0),T([(0,n.SB)()],p.prototype,"preferredAccountTypes",void 0),p=T([(0,g.Mo)("w3m-wallet-receive-view")],p)},94215:(W,S,t)=>{var a=t(59799),n=t(86523),f=(t(72686),t(11252),t(10831),t(25518)),C=t(70075);const A=a.iv`
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
`;var u=function(g,w,x,k){var m,N=arguments.length,v=N<3?w:null===k?k=Object.getOwnPropertyDescriptor(w,x):k;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)v=Reflect.decorate(g,w,x,k);else for(var $=g.length-1;$>=0;$--)(m=g[$])&&(v=(N<3?m(v):N>3?m(w,x,v):m(w,x))||v);return N>3&&v&&Object.defineProperty(w,x,v),v};let s=class extends a.oi{constructor(){super(...arguments),this.variant="accent",this.imageSrc="",this.disabled=!1,this.icon="externalLink",this.size="md",this.text=""}render(){const w="sm"===this.size?"small-600":"paragraph-600";return a.dy`
      <button
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc?a.dy`<wui-image src=${this.imageSrc}></wui-image>`:null}
        <wui-text variant=${w} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `}};s.styles=[f.ET,f.ZM,A],u([(0,n.Cb)()],s.prototype,"variant",void 0),u([(0,n.Cb)()],s.prototype,"imageSrc",void 0),u([(0,n.Cb)({type:Boolean})],s.prototype,"disabled",void 0),u([(0,n.Cb)()],s.prototype,"icon",void 0),u([(0,n.Cb)()],s.prototype,"size",void 0),u([(0,n.Cb)()],s.prototype,"text",void 0),s=u([(0,C.M)("wui-chip-button")],s)}}]);