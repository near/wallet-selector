"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[282],{27282:(v,p,n)=>{n.r(p),n.d(p,{W3mModal:()=>a});var m=n(49671),o=n(35879),w=n(34661),f=n(59799),h=n(86523);const g=f.iv`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation-duration: 0.2s;
    animation-name: zoom-in;
    animation-fill-mode: backwards;
    animation-timing-function: var(--wui-ease-out-power-2);
    outline: none;
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: none;
      animation-name: slide-in;
    }
  }
`;var c=function(u,e,t,i){var d,l=arguments.length,s=l<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,t):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(u,e,t,i);else for(var r=u.length-1;r>=0;r--)(d=u[r])&&(s=(l<3?d(s):l>3?d(e,t,s):d(e,t))||s);return l>3&&s&&Object.defineProperty(e,t,s),s};const b="scroll-lock";let a=class extends f.oi{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.open=o.IN.state.open,this.caipAddress=o.Ni.state.caipAddress,this.isSiweEnabled=o.OptionsController.state.isSiweEnabled,this.connected=o.Ni.state.isConnected,this.loading=o.IN.state.loading,this.initializeTheming(),o.ApiController.prefetch(),this.unsubscribe.push(o.IN.subscribeKey("open",e=>e?this.onOpen():this.onClose()),o.IN.subscribeKey("loading",e=>{this.loading=e,this.onNewAddress(o.Ni.state.caipAddress)}),o.Ni.subscribeKey("isConnected",e=>this.connected=e),o.Ni.subscribeKey("caipAddress",e=>this.onNewAddress(e)),o.OptionsController.subscribeKey("isSiweEnabled",e=>this.isSiweEnabled=e)),o.Xs.sendEvent({type:"track",event:"MODAL_LOADED"})}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return this.open?f.dy`
          <wui-flex @click=${this.onOverlayClick.bind(this)}>
            <wui-card role="alertdialog" aria-modal="true" tabindex="0">
              <w3m-header></w3m-header>
              <w3m-router></w3m-router>
              <w3m-snackbar></w3m-snackbar>
            </wui-card>
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}onOverlayClick(e){var t=this;return(0,m.Z)(function*(){e.target===e.currentTarget&&(yield t.handleClose())})()}handleClose(){var e=this;return(0,m.Z)(function*(){if(e.isSiweEnabled){const{SIWEController:t}=yield n.e(626).then(n.bind(n,24626));"success"!==t.state.status&&e.connected&&(yield o.ConnectionController.disconnect())}o.IN.close()})()}initializeTheming(){const{themeVariables:e,themeMode:t}=o.ThemeController.state,i=w.UiHelperUtil.getColorTheme(t);(0,w.initializeTheming)(e,i)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),o.SnackController.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){const e=document.createElement("style");e.dataset.w3m=b,e.textContent="\n      body {\n        touch-action: none;\n        overflow: hidden;\n        overscroll-behavior: contain;\n      }\n      w3m-modal {\n        pointer-events: auto;\n      }\n    ",document.head.appendChild(e)}onScrollUnlock(){const e=document.head.querySelector(`style[data-w3m="${b}"]`);e&&e.remove()}onAddKeyboardListener(){this.abortController=new AbortController;const e=this.shadowRoot?.querySelector("wui-card");e?.focus(),window.addEventListener("keydown",t=>{if("Escape"===t.key)this.handleClose();else if("Tab"===t.key){const{tagName:i}=t.target;i&&!i.includes("W3M-")&&!i.includes("WUI-")&&e?.focus()}},this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}onNewAddress(e){var t=this;return(0,m.Z)(function*(){if(!t.connected||t.loading)return;const i=o.j1.getPlainAddress(t.caipAddress),l=o.j1.getPlainAddress(e),s=o.j1.getNetworkId(t.caipAddress),d=o.j1.getNetworkId(e);if(t.caipAddress=e,t.isSiweEnabled){const{SIWEController:r}=yield n.e(626).then(n.bind(n,24626)),y=yield r.getSession();if(y&&i&&l&&i!==l)return void(r.state._client?.options.signOutOnAccountChange&&(yield r.signOut(),t.onSiweNavigation()));if(y&&s&&d&&s!==d)return void(r.state._client?.options.signOutOnNetworkChange&&(yield r.signOut(),t.onSiweNavigation()));t.onSiweNavigation()}})()}onSiweNavigation(){this.open?o.RouterController.push("ConnectingSiwe"):o.IN.open({view:"ConnectingSiwe"})}};a.styles=g,c([(0,h.SB)()],a.prototype,"open",void 0),c([(0,h.SB)()],a.prototype,"caipAddress",void 0),c([(0,h.SB)()],a.prototype,"isSiweEnabled",void 0),c([(0,h.SB)()],a.prototype,"connected",void 0),c([(0,h.SB)()],a.prototype,"loading",void 0),a=c([(0,w.customElement)("w3m-modal")],a)}}]);