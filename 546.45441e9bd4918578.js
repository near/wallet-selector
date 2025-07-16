"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[546],{47093:(q,Q,t)=>{var n=t(59799),i=t(86523),b=t(23107),U=t(86424),V=t(87563),T=t(66301),K=t(18445),N=t(79282),x=t(24380),E=t(50860),v=(t(67552),function(y,u,C,h){var $,f=arguments.length,O=f<3?u:null===h?h=Object.getOwnPropertyDescriptor(u,C):h;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)O=Reflect.decorate(y,u,C,h);else for(var I=y.length-1;I>=0;I--)($=y[I])&&(O=(f<3?$(O):f>3?$(u,C,O):$(u,C))||O);return f>3&&O&&Object.defineProperty(u,C,O),O});let w=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=U.ConnectorController.state.connectors,this.count=V.ApiController.state.count,this.filteredCount=V.ApiController.state.filteredWallets.length,this.isFetchingRecommendedWallets=V.ApiController.state.isFetchingRecommendedWallets,this.unsubscribe.push(U.ConnectorController.subscribeKey("connectors",u=>this.connectors=u),V.ApiController.subscribeKey("count",u=>this.count=u),V.ApiController.subscribeKey("filteredWallets",u=>this.filteredCount=u.length),V.ApiController.subscribeKey("isFetchingRecommendedWallets",u=>this.isFetchingRecommendedWallets=u))}disconnectedCallback(){this.unsubscribe.forEach(u=>u())}render(){const u=this.connectors.find(P=>"walletConnect"===P.id),{allWallets:C}=T.OptionsController.state;if(!u||"HIDE"===C||"ONLY_MOBILE"===C&&!K.j.isMobile())return null;const h=V.ApiController.state.featured.length,f=this.count+h,O=f<10?f:10*Math.floor(f/10),$=this.filteredCount>0?this.filteredCount:O;let I=`${$}`;return this.filteredCount>0?I=`${this.filteredCount}`:$<f&&(I=`${$}+`),n.dy`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${I}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${(0,b.o)(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets?"fg-300":"accent-100"}
      ></wui-list-wallet>
    `}onAllWallets(){N.X.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),x.RouterController.push("AllWallets")}};v([(0,i.Cb)()],w.prototype,"tabIdx",void 0),v([(0,i.SB)()],w.prototype,"connectors",void 0),v([(0,i.SB)()],w.prototype,"count",void 0),v([(0,i.SB)()],w.prototype,"filteredCount",void 0),v([(0,i.SB)()],w.prototype,"isFetchingRecommendedWallets",void 0),w=v([(0,E.Mo)("w3m-all-wallets-widget")],w)},88368:(q,Q,t)=>{var n=t(59799),i=t(86523),b=t(23107),U=t(86424),V=t(87563),T=t(50860),N=(t(937),t(17111)),x=t(18445),E=t(24380),v=(t(67552),t(80465)),w=function(D,e,s,p){var o,g=arguments.length,r=g<3?e:null===p?p=Object.getOwnPropertyDescriptor(e,s):p;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(D,e,s,p);else for(var a=D.length-1;a>=0;a--)(o=D[a])&&(r=(g<3?o(r):g>3?o(e,s,r):o(e,s))||r);return g>3&&r&&Object.defineProperty(e,s,r),r};let y=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=U.ConnectorController.state.connectors,this.unsubscribe.push(U.ConnectorController.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.filter(s=>"ANNOUNCED"===s.type);return e?.length?n.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${e.filter(v.C.showConnector).map(s=>n.dy`
              <wui-list-wallet
                imageSrc=${(0,b.o)(N.f.getConnectorImage(s))}
                name=${s.name??"Unknown"}
                @click=${()=>this.onConnector(s)}
                tagVariant="success"
                tagLabel="installed"
                data-testid=${`wallet-selector-${s.id}`}
                .installed=${!0}
                tabIdx=${(0,b.o)(this.tabIdx)}
              >
              </wui-list-wallet>
            `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){"walletConnect"===e.id?x.j.isMobile()?E.RouterController.push("AllWallets"):E.RouterController.push("ConnectingWalletConnect"):E.RouterController.push("ConnectingExternal",{connector:e})}};w([(0,i.Cb)()],y.prototype,"tabIdx",void 0),w([(0,i.SB)()],y.prototype,"connectors",void 0),y=w([(0,T.Mo)("w3m-connect-announced-widget")],y);var u=t(10053),C=t(66301),h=t(22429),f=function(D,e,s,p){var o,g=arguments.length,r=g<3?e:null===p?p=Object.getOwnPropertyDescriptor(e,s):p;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(D,e,s,p);else for(var a=D.length-1;a>=0;a--)(o=D[a])&&(r=(g<3?o(r):g>3?o(e,s,r):o(e,s))||r);return g>3&&r&&Object.defineProperty(e,s,r),r};let O=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=U.ConnectorController.state.connectors,this.loading=!1,this.unsubscribe.push(U.ConnectorController.subscribeKey("connectors",e=>this.connectors=e)),x.j.isTelegram()&&x.j.isIos()&&(this.loading=!u.ConnectionController.state.wcUri,this.unsubscribe.push(u.ConnectionController.subscribeKey("wcUri",e=>this.loading=!e)))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{customWallets:e}=C.OptionsController.state;if(!e?.length)return this.style.cssText="display: none",null;const s=this.filterOutDuplicateWallets(e);return n.dy`<wui-flex flexDirection="column" gap="xs">
      ${s.map(p=>n.dy`
          <wui-list-wallet
            imageSrc=${(0,b.o)(N.f.getWalletImage(p))}
            name=${p.name??"Unknown"}
            @click=${()=>this.onConnectWallet(p)}
            data-testid=${`wallet-selector-${p.id}`}
            tabIdx=${(0,b.o)(this.tabIdx)}
            ?loading=${this.loading}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`}filterOutDuplicateWallets(e){const s=h.M.getRecentWallets(),p=this.connectors.map(a=>a.info?.rdns).filter(Boolean),g=s.map(a=>a.rdns).filter(Boolean),r=p.concat(g);if(r.includes("io.metamask.mobile")&&x.j.isMobile()){const a=r.indexOf("io.metamask.mobile");r[a]="io.metamask"}return e.filter(a=>!r.includes(String(a?.rdns)))}onConnectWallet(e){this.loading||E.RouterController.push("ConnectingWalletConnect",{wallet:e})}};f([(0,i.Cb)()],O.prototype,"tabIdx",void 0),f([(0,i.SB)()],O.prototype,"connectors",void 0),f([(0,i.SB)()],O.prototype,"loading",void 0),O=f([(0,T.Mo)("w3m-connect-custom-widget")],O);var $=t(86450),I=function(D,e,s,p){var o,g=arguments.length,r=g<3?e:null===p?p=Object.getOwnPropertyDescriptor(e,s):p;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(D,e,s,p);else for(var a=D.length-1;a>=0;a--)(o=D[a])&&(r=(g<3?o(r):g>3?o(e,s,r):o(e,s))||r);return g>3&&r&&Object.defineProperty(e,s,r),r};let P=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=U.ConnectorController.state.connectors,this.unsubscribe.push(U.ConnectorController.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const p=this.connectors.filter(g=>"EXTERNAL"===g.type).filter(v.C.showConnector).filter(g=>g.id!==$.b.CONNECTOR_ID.COINBASE_SDK);return p?.length?n.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${p.map(g=>n.dy`
            <wui-list-wallet
              imageSrc=${(0,b.o)(N.f.getConnectorImage(g))}
              .installed=${!0}
              name=${g.name??"Unknown"}
              data-testid=${`wallet-selector-external-${g.id}`}
              @click=${()=>this.onConnector(g)}
              tabIdx=${(0,b.o)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){E.RouterController.push("ConnectingExternal",{connector:e})}};I([(0,i.Cb)()],P.prototype,"tabIdx",void 0),I([(0,i.SB)()],P.prototype,"connectors",void 0),P=I([(0,T.Mo)("w3m-connect-external-widget")],P);var z=function(D,e,s,p){var o,g=arguments.length,r=g<3?e:null===p?p=Object.getOwnPropertyDescriptor(e,s):p;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(D,e,s,p);else for(var a=D.length-1;a>=0;a--)(o=D[a])&&(r=(g<3?o(r):g>3?o(e,s,r):o(e,s))||r);return g>3&&r&&Object.defineProperty(e,s,r),r};let L=class extends n.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.wallets=[]}render(){return this.wallets.length?n.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(e=>n.dy`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${e.id}`}
              imageSrc=${(0,b.o)(N.f.getWalletImage(e))}
              name=${e.name??"Unknown"}
              @click=${()=>this.onConnectWallet(e)}
              tabIdx=${(0,b.o)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){U.ConnectorController.selectWalletConnector(e)}};z([(0,i.Cb)()],L.prototype,"tabIdx",void 0),z([(0,i.Cb)()],L.prototype,"wallets",void 0),L=z([(0,T.Mo)("w3m-connect-featured-widget")],L);var X=function(D,e,s,p){var o,g=arguments.length,r=g<3?e:null===p?p=Object.getOwnPropertyDescriptor(e,s):p;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(D,e,s,p);else for(var a=D.length-1;a>=0;a--)(o=D[a])&&(r=(g<3?o(r):g>3?o(e,s,r):o(e,s))||r);return g>3&&r&&Object.defineProperty(e,s,r),r};let G=class extends n.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.connectors=[]}render(){const e=this.connectors.filter(v.C.showConnector);return 0===e.length?(this.style.cssText="display: none",null):n.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(s=>n.dy`
            <wui-list-wallet
              imageSrc=${(0,b.o)(N.f.getConnectorImage(s))}
              .installed=${!0}
              name=${s.name??"Unknown"}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${s.id}`}
              @click=${()=>this.onConnector(s)}
              tabIdx=${(0,b.o)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnector(e){U.ConnectorController.setActiveConnector(e),E.RouterController.push("ConnectingExternal",{connector:e})}};X([(0,i.Cb)()],G.prototype,"tabIdx",void 0),X([(0,i.Cb)()],G.prototype,"connectors",void 0),G=X([(0,T.Mo)("w3m-connect-injected-widget")],G);var Z=function(D,e,s,p){var o,g=arguments.length,r=g<3?e:null===p?p=Object.getOwnPropertyDescriptor(e,s):p;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(D,e,s,p);else for(var a=D.length-1;a>=0;a--)(o=D[a])&&(r=(g<3?o(r):g>3?o(e,s,r):o(e,s))||r);return g>3&&r&&Object.defineProperty(e,s,r),r};let F=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=U.ConnectorController.state.connectors,this.unsubscribe.push(U.ConnectorController.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.filter(s=>"MULTI_CHAIN"===s.type&&"WalletConnect"!==s.name);return e?.length?n.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(s=>n.dy`
            <wui-list-wallet
              imageSrc=${(0,b.o)(N.f.getConnectorImage(s))}
              .installed=${!0}
              name=${s.name??"Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${s.id}`}
              @click=${()=>this.onConnector(s)}
              tabIdx=${(0,b.o)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){U.ConnectorController.setActiveConnector(e),E.RouterController.push("ConnectingMultiChain")}};Z([(0,i.Cb)()],F.prototype,"tabIdx",void 0),Z([(0,i.SB)()],F.prototype,"connectors",void 0),F=Z([(0,T.Mo)("w3m-connect-multi-chain-widget")],F);var ot=t(20597),ht=t(92796),ut=function(D,e,s,p){var o,g=arguments.length,r=g<3?e:null===p?p=Object.getOwnPropertyDescriptor(e,s):p;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(D,e,s,p);else for(var a=D.length-1;a>=0;a--)(o=D[a])&&(r=(g<3?o(r):g>3?o(e,s,r):o(e,s))||r);return g>3&&r&&Object.defineProperty(e,s,r),r};let rt=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=U.ConnectorController.state.connectors,this.loading=!1,this.unsubscribe.push(U.ConnectorController.subscribeKey("connectors",e=>this.connectors=e)),x.j.isTelegram()&&x.j.isIos()&&(this.loading=!u.ConnectionController.state.wcUri,this.unsubscribe.push(u.ConnectionController.subscribeKey("wcUri",e=>this.loading=!e)))}render(){const s=h.M.getRecentWallets().filter(p=>!ht.J.isExcluded(p)).filter(p=>!this.hasWalletConnector(p)).filter(p=>this.isWalletCompatibleWithCurrentChain(p));return s.length?n.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${s.map(p=>n.dy`
            <wui-list-wallet
              imageSrc=${(0,b.o)(N.f.getWalletImage(p))}
              name=${p.name??"Unknown"}
              @click=${()=>this.onConnectWallet(p)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${(0,b.o)(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){this.loading||U.ConnectorController.selectWalletConnector(e)}hasWalletConnector(e){return this.connectors.some(s=>s.id===e.id||s.name===e.name)}isWalletCompatibleWithCurrentChain(e){const s=ot.R.state.activeChain;return!s||!e.chains||e.chains.some(p=>{const g=p.split(":")[0];return s===g})}};ut([(0,i.Cb)()],rt.prototype,"tabIdx",void 0),ut([(0,i.SB)()],rt.prototype,"connectors",void 0),ut([(0,i.SB)()],rt.prototype,"loading",void 0),rt=ut([(0,T.Mo)("w3m-connect-recent-widget")],rt);var lt=function(D,e,s,p){var o,g=arguments.length,r=g<3?e:null===p?p=Object.getOwnPropertyDescriptor(e,s):p;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(D,e,s,p);else for(var a=D.length-1;a>=0;a--)(o=D[a])&&(r=(g<3?o(r):g>3?o(e,s,r):o(e,s))||r);return g>3&&r&&Object.defineProperty(e,s,r),r};let nt=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.wallets=[],this.loading=!1,x.j.isTelegram()&&x.j.isIos()&&(this.loading=!u.ConnectionController.state.wcUri,this.unsubscribe.push(u.ConnectionController.subscribeKey("wcUri",e=>this.loading=!e)))}render(){const{connectors:e}=U.ConnectorController.state,{customWallets:s,featuredWalletIds:p}=C.OptionsController.state,g=h.M.getRecentWallets(),r=e.find(_=>"walletConnect"===_.id),a=e.filter(_=>"INJECTED"===_.type||"ANNOUNCED"===_.type||"MULTI_CHAIN"===_.type).filter(_=>"Browser Wallet"!==_.name);if(!r)return null;if(p||s||!this.wallets.length)return this.style.cssText="display: none",null;const W=a.length+g.length,S=Math.max(0,2-W),d=ht.J.filterOutDuplicateWallets(this.wallets).slice(0,S);return d.length?n.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${d.map(_=>n.dy`
            <wui-list-wallet
              imageSrc=${(0,b.o)(N.f.getWalletImage(_))}
              name=${_?.name??"Unknown"}
              @click=${()=>this.onConnectWallet(_)}
              tabIdx=${(0,b.o)(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){if(this.loading)return;const s=U.ConnectorController.getConnector(e.id,e.rdns);s?E.RouterController.push("ConnectingExternal",{connector:s}):E.RouterController.push("ConnectingWalletConnect",{wallet:e})}};lt([(0,i.Cb)()],nt.prototype,"tabIdx",void 0),lt([(0,i.Cb)()],nt.prototype,"wallets",void 0),lt([(0,i.SB)()],nt.prototype,"loading",void 0),nt=lt([(0,T.Mo)("w3m-connect-recommended-widget")],nt);var tt=t(80152),at=function(D,e,s,p){var o,g=arguments.length,r=g<3?e:null===p?p=Object.getOwnPropertyDescriptor(e,s):p;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(D,e,s,p);else for(var a=D.length-1;a>=0;a--)(o=D[a])&&(r=(g<3?o(r):g>3?o(e,s,r):o(e,s))||r);return g>3&&r&&Object.defineProperty(e,s,r),r};let J=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=U.ConnectorController.state.connectors,this.connectorImages=tt.W.state.connectorImages,this.unsubscribe.push(U.ConnectorController.subscribeKey("connectors",e=>this.connectors=e),tt.W.subscribeKey("connectorImages",e=>this.connectorImages=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(x.j.isMobile())return this.style.cssText="display: none",null;const e=this.connectors.find(p=>"walletConnect"===p.id);if(!e)return this.style.cssText="display: none",null;const s=e.imageUrl||this.connectorImages[e?.imageId??""];return n.dy`
      <wui-list-wallet
        imageSrc=${(0,b.o)(s)}
        name=${e.name??"Unknown"}
        @click=${()=>this.onConnector(e)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${(0,b.o)(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `}onConnector(e){U.ConnectorController.setActiveConnector(e),E.RouterController.push("ConnectingWalletConnect")}};at([(0,i.Cb)()],J.prototype,"tabIdx",void 0),at([(0,i.SB)()],J.prototype,"connectors",void 0),at([(0,i.SB)()],J.prototype,"connectorImages",void 0),J=at([(0,T.Mo)("w3m-connect-walletconnect-widget")],J);const Y=n.iv`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var it=function(D,e,s,p){var o,g=arguments.length,r=g<3?e:null===p?p=Object.getOwnPropertyDescriptor(e,s):p;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(D,e,s,p);else for(var a=D.length-1;a>=0;a--)(o=D[a])&&(r=(g<3?o(r):g>3?o(e,s,r):o(e,s))||r);return g>3&&r&&Object.defineProperty(e,s,r),r};let et=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=U.ConnectorController.state.connectors,this.recommended=V.ApiController.state.recommended,this.featured=V.ApiController.state.featured,this.unsubscribe.push(U.ConnectorController.subscribeKey("connectors",e=>this.connectors=e),V.ApiController.subscribeKey("recommended",e=>this.recommended=e),V.ApiController.subscribeKey("featured",e=>this.featured=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return n.dy`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){const{custom:e,recent:s,announced:p,injected:g,multiChain:r,recommended:o,featured:a,external:W}=v.C.getConnectorsByType(this.connectors,this.recommended,this.featured);return v.C.getConnectorTypeOrder({custom:e,recent:s,announced:p,injected:g,multiChain:r,recommended:o,featured:a,external:W}).map(d=>{switch(d){case"injected":return n.dy`
            ${r.length?n.dy`<w3m-connect-multi-chain-widget
                  tabIdx=${(0,b.o)(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`:null}
            ${p.length?n.dy`<w3m-connect-announced-widget
                  tabIdx=${(0,b.o)(this.tabIdx)}
                ></w3m-connect-announced-widget>`:null}
            ${g.length?n.dy`<w3m-connect-injected-widget
                  .connectors=${g}
                  tabIdx=${(0,b.o)(this.tabIdx)}
                ></w3m-connect-injected-widget>`:null}
          `;case"walletConnect":return n.dy`<w3m-connect-walletconnect-widget
            tabIdx=${(0,b.o)(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;case"recent":return n.dy`<w3m-connect-recent-widget
            tabIdx=${(0,b.o)(this.tabIdx)}
          ></w3m-connect-recent-widget>`;case"featured":return n.dy`<w3m-connect-featured-widget
            .wallets=${a}
            tabIdx=${(0,b.o)(this.tabIdx)}
          ></w3m-connect-featured-widget>`;case"custom":return n.dy`<w3m-connect-custom-widget
            tabIdx=${(0,b.o)(this.tabIdx)}
          ></w3m-connect-custom-widget>`;case"external":return n.dy`<w3m-connect-external-widget
            tabIdx=${(0,b.o)(this.tabIdx)}
          ></w3m-connect-external-widget>`;case"recommended":return n.dy`<w3m-connect-recommended-widget
            .wallets=${o}
            tabIdx=${(0,b.o)(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;default:return console.warn(`Unknown connector type: ${d}`),null}})}};et.styles=Y,it([(0,i.Cb)()],et.prototype,"tabIdx",void 0),it([(0,i.SB)()],et.prototype,"connectors",void 0),it([(0,i.SB)()],et.prototype,"recommended",void 0),it([(0,i.SB)()],et.prototype,"featured",void 0),et=it([(0,T.Mo)("w3m-connector-list")],et)},41800:(q,Q,t)=>{var n=t(59799),i=t(86523),b=t(18445),U=t(24380),V=t(50860),x=(t(10831),t(94215),t(79348),t(25518)),E=t(70075);const R=n.iv`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;var v=function(h,f,O,$){var z,I=arguments.length,P=I<3?f:null===$?$=Object.getOwnPropertyDescriptor(f,O):$;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)P=Reflect.decorate(h,f,O,$);else for(var L=h.length-1;L>=0;L--)(z=h[L])&&(P=(I<3?z(P):I>3?z(f,O,P):z(f,O))||P);return I>3&&P&&Object.defineProperty(f,O,P),P};let w=class extends n.oi{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return n.dy`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs","2l","1xs","2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `}};w.styles=[x.ET,x.ZM,R],v([(0,i.Cb)({type:Boolean})],w.prototype,"disabled",void 0),v([(0,i.Cb)()],w.prototype,"label",void 0),v([(0,i.Cb)()],w.prototype,"buttonLabel",void 0),w=v([(0,E.M)("wui-cta-button")],w);const y=n.iv`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`;var u=function(h,f,O,$){var z,I=arguments.length,P=I<3?f:null===$?$=Object.getOwnPropertyDescriptor(f,O):$;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)P=Reflect.decorate(h,f,O,$);else for(var L=h.length-1;L>=0;L--)(z=h[L])&&(P=(I<3?z(P):I>3?z(f,O,P):z(f,O))||P);return I>3&&P&&Object.defineProperty(f,O,P),P};let C=class extends n.oi{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;const{name:f,app_store:O,play_store:$,chrome_store:I,homepage:P}=this.wallet,z=b.j.isMobile(),L=b.j.isIos(),X=b.j.isAndroid(),G=[O,$,P,I].filter(Boolean).length>1,Z=V.Hg.getTruncateString({string:f,charsStart:12,charsEnd:0,truncate:"end"});return G&&!z?n.dy`
        <wui-cta-button
          label=${`Don't have ${Z}?`}
          buttonLabel="Get"
          @click=${()=>U.RouterController.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!G&&P?n.dy`
        <wui-cta-button
          label=${`Don't have ${Z}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:O&&L?n.dy`
        <wui-cta-button
          label=${`Don't have ${Z}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:$&&X?n.dy`
        <wui-cta-button
          label=${`Don't have ${Z}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){this.wallet?.app_store&&b.j.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&b.j.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&b.j.openHref(this.wallet.homepage,"_blank")}};C.styles=[y],u([(0,i.Cb)({type:Object})],C.prototype,"wallet",void 0),C=u([(0,V.Mo)("w3m-mobile-download-links")],C)},34633:(q,Q,t)=>{t.d(Q,{N:()=>I});var n=t(59799),i=t(86523),b=t(23107),U=t(24380),V=t(17111),T=t(10053),K=t(18445),N=t(56364),x=t(76169);t(99409),t(937),t(51078),t(6500),t(88198),t(44411),t(54575),t(88078),t(41800);const O=n.iv`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`;var $=function(P,z,L,X){var F,G=arguments.length,Z=G<3?z:null===X?X=Object.getOwnPropertyDescriptor(z,L):X;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)Z=Reflect.decorate(P,z,L,X);else for(var ot=P.length-1;ot>=0;ot--)(F=P[ot])&&(Z=(G<3?F(Z):G>3?F(z,L,Z):F(z,L))||Z);return G>3&&Z&&Object.defineProperty(z,L,Z),Z};class I extends n.oi{constructor(){super(),this.wallet=U.RouterController.state.data?.wallet,this.connector=U.RouterController.state.data?.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=V.f.getWalletImage(this.wallet)??V.f.getConnectorImage(this.connector),this.name=this.wallet?.name??this.connector?.name??"Wallet",this.isRetrying=!1,this.uri=T.ConnectionController.state.wcUri,this.error=T.ConnectionController.state.wcError,this.ready=!1,this.showRetry=!1,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(T.ConnectionController.subscribeKey("wcUri",z=>{this.uri=z,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())}),T.ConnectionController.subscribeKey("wcError",z=>this.error=z)),(K.j.isTelegram()||K.j.isSafari())&&K.j.isIos()&&T.ConnectionController.state.wcUri&&this.onConnect?.()}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(z=>z()),T.ConnectionController.setWcError(!1),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();const z=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel;let L=`Continue in ${this.name}`;return this.error&&(L="Connection declined"),n.dy`
      <wui-flex
        data-error=${(0,b.o)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${(0,b.o)(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error?"error-100":"fg-100"}>
            ${L}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${z}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?n.dy`
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying||this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            `:null}
      </wui-flex>

      ${this.isWalletConnect?n.dy`
            <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){this.error&&!this.showRetry&&(this.showRetry=!0,this.shadowRoot?.querySelector("wui-button")?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"}))}onTryAgain(){T.ConnectionController.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.()}loaderTemplate(){const z=N.ThemeController.state.themeVariables["--w3m-border-radius-master"],L=z?parseInt(z.replace("px",""),10):4;return n.dy`<wui-loading-thumbnail radius=${9*L}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(K.j.copyToClopboard(this.uri),x.SnackController.showSuccess("Link copied"))}catch{x.SnackController.showError("Failed to copy")}}}I.styles=O,$([(0,i.SB)()],I.prototype,"isRetrying",void 0),$([(0,i.SB)()],I.prototype,"uri",void 0),$([(0,i.SB)()],I.prototype,"error",void 0),$([(0,i.SB)()],I.prototype,"ready",void 0),$([(0,i.SB)()],I.prototype,"showRetry",void 0),$([(0,i.SB)()],I.prototype,"secondaryBtnLabel",void 0),$([(0,i.SB)()],I.prototype,"secondaryLabel",void 0),$([(0,i.SB)()],I.prototype,"isLoading",void 0),$([(0,i.Cb)({type:Boolean})],I.prototype,"isMobile",void 0),$([(0,i.Cb)()],I.prototype,"onRetry",void 0)},43971:(q,Q,t)=>{t.d(Q,{b:()=>dt});var n=t(59799),i=t(86523),b=t(23107),U=t(18445),V=t(76169),T=t(24380),K=t(50860),x=(t(72686),t(25518)),E=t(70075),R=t(29768);const v=n.iv`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`;var w=function(M,l,m,j){var A,B=arguments.length,c=B<3?l:null===j?j=Object.getOwnPropertyDescriptor(l,m):j;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(M,l,m,j);else for(var H=M.length-1;H>=0;H--)(A=M[H])&&(c=(B<3?A(c):B>3?A(l,m,c):A(l,m))||c);return B>3&&c&&Object.defineProperty(l,m,c),c};let y=class extends n.oi{constructor(){super(...arguments),this.inputElementRef=(0,R.V)(),this.checked=void 0}render(){return n.dy`
      <label>
        <input
          ${(0,R.i)(this.inputElementRef)}
          type="checkbox"
          ?checked=${(0,b.o)(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("switchChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};y.styles=[x.ET,x.ZM,x.Bp,v],w([(0,i.Cb)({type:Boolean})],y.prototype,"checked",void 0),y=w([(0,E.M)("wui-switch")],y);const u=n.iv`
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;var C=function(M,l,m,j){var A,B=arguments.length,c=B<3?l:null===j?j=Object.getOwnPropertyDescriptor(l,m):j;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(M,l,m,j);else for(var H=M.length-1;H>=0;H--)(A=M[H])&&(c=(B<3?A(c):B>3?A(l,m,c):A(l,m))||c);return B>3&&c&&Object.defineProperty(l,m,c),c};let h=class extends n.oi{constructor(){super(...arguments),this.checked=void 0}render(){return n.dy`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${(0,b.o)(this.checked)}></wui-switch>
      </button>
    `}};h.styles=[x.ET,x.ZM,u],C([(0,i.Cb)({type:Boolean})],h.prototype,"checked",void 0),h=C([(0,E.M)("wui-certified-switch")],h);t(937),t(6500);const $=n.iv`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`;var I=function(M,l,m,j){var A,B=arguments.length,c=B<3?l:null===j?j=Object.getOwnPropertyDescriptor(l,m):j;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(M,l,m,j);else for(var H=M.length-1;H>=0;H--)(A=M[H])&&(c=(B<3?A(c):B>3?A(l,m,c):A(l,m))||c);return B>3&&c&&Object.defineProperty(l,m,c),c};let P=class extends n.oi{constructor(){super(...arguments),this.icon="copy"}render(){return n.dy`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};P.styles=[x.ET,x.ZM,$],I([(0,i.Cb)()],P.prototype,"icon",void 0),P=I([(0,E.M)("wui-input-element")],P);t(87162);const L=n.iv`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;let G=class extends n.oi{constructor(){super(...arguments),this.inputComponentRef=(0,R.V)()}render(){return n.dy`
      <wui-input-text
        ${(0,R.i)(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){const m=this.inputComponentRef.value?.inputElementRef.value;m&&(m.value="",m.focus(),m.dispatchEvent(new Event("input")))}};G.styles=[x.ET,L],G=function(M,l,m,j){var A,B=arguments.length,c=B<3?l:null===j?j=Object.getOwnPropertyDescriptor(l,m):j;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(M,l,m,j);else for(var H=M.length-1;H>=0;H--)(A=M[H])&&(c=(B<3?A(c):B>3?A(l,m,c):A(l,m))||c);return B>3&&c&&Object.defineProperty(l,m,c),c}([(0,E.M)("wui-search-bar")],G);var Z=t(49671),F=t(87563),ot=t(86424),ht=t(85359);t(294);const rt=n.iv`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;var lt=function(M,l,m,j){var A,B=arguments.length,c=B<3?l:null===j?j=Object.getOwnPropertyDescriptor(l,m):j;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(M,l,m,j);else for(var H=M.length-1;H>=0;H--)(A=M[H])&&(c=(B<3?A(c):B>3?A(l,m,c):A(l,m))||c);return B>3&&c&&Object.defineProperty(l,m,c),c};let nt=class extends n.oi{constructor(){super(...arguments),this.type="wallet"}render(){return n.dy`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return"network"===this.type?n.dy` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${ht.W}`:n.dy`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};nt.styles=[x.ET,x.ZM,rt],lt([(0,i.Cb)()],nt.prototype,"type",void 0),nt=lt([(0,E.M)("wui-card-select-loader")],nt);var tt=t(88814);const at=n.iv`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var J=function(M,l,m,j){var A,B=arguments.length,c=B<3?l:null===j?j=Object.getOwnPropertyDescriptor(l,m):j;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(M,l,m,j);else for(var H=M.length-1;H>=0;H--)(A=M[H])&&(c=(B<3?A(c):B>3?A(l,m,c):A(l,m))||c);return B>3&&c&&Object.defineProperty(l,m,c),c};let Y=class extends n.oi{render(){return this.style.cssText=`\n      grid-template-rows: ${this.gridTemplateRows};\n      grid-template-columns: ${this.gridTemplateColumns};\n      justify-items: ${this.justifyItems};\n      align-items: ${this.alignItems};\n      justify-content: ${this.justifyContent};\n      align-content: ${this.alignContent};\n      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};\n      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};\n      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};\n      padding-top: ${this.padding&&tt.H.getSpacingStyles(this.padding,0)};\n      padding-right: ${this.padding&&tt.H.getSpacingStyles(this.padding,1)};\n      padding-bottom: ${this.padding&&tt.H.getSpacingStyles(this.padding,2)};\n      padding-left: ${this.padding&&tt.H.getSpacingStyles(this.padding,3)};\n      margin-top: ${this.margin&&tt.H.getSpacingStyles(this.margin,0)};\n      margin-right: ${this.margin&&tt.H.getSpacingStyles(this.margin,1)};\n      margin-bottom: ${this.margin&&tt.H.getSpacingStyles(this.margin,2)};\n      margin-left: ${this.margin&&tt.H.getSpacingStyles(this.margin,3)};\n    `,n.dy`<slot></slot>`}};Y.styles=[x.ET,at],J([(0,i.Cb)()],Y.prototype,"gridTemplateRows",void 0),J([(0,i.Cb)()],Y.prototype,"gridTemplateColumns",void 0),J([(0,i.Cb)()],Y.prototype,"justifyItems",void 0),J([(0,i.Cb)()],Y.prototype,"alignItems",void 0),J([(0,i.Cb)()],Y.prototype,"justifyContent",void 0),J([(0,i.Cb)()],Y.prototype,"alignContent",void 0),J([(0,i.Cb)()],Y.prototype,"columnGap",void 0),J([(0,i.Cb)()],Y.prototype,"rowGap",void 0),J([(0,i.Cb)()],Y.prototype,"gap",void 0),J([(0,i.Cb)()],Y.prototype,"padding",void 0),J([(0,i.Cb)()],Y.prototype,"margin",void 0),Y=J([(0,E.M)("wui-grid")],Y);var it=t(92796),et=t(17111);t(51078),t(75165),t(54575),t(88078);const g=n.iv`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;var r=function(M,l,m,j){var A,B=arguments.length,c=B<3?l:null===j?j=Object.getOwnPropertyDescriptor(l,m):j;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(M,l,m,j);else for(var H=M.length-1;H>=0;H--)(A=M[H])&&(c=(B<3?A(c):B>3?A(l,m,c):A(l,m))||c);return B>3&&c&&Object.defineProperty(l,m,c),c};let o=class extends n.oi{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.wallet=void 0,this.observer=new IntersectionObserver(l=>{l.forEach(m=>{m.isIntersecting?(this.visible=!0,this.fetchImageSrc()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){const l="certified"===this.wallet?.badge_type;return n.dy`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${(0,b.o)(l?"certified":void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${l?n.dy`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){return!this.visible&&!this.imageSrc||this.imageLoading?this.shimmerTemplate():n.dy`
      <wui-wallet-image
        size="md"
        imageSrc=${(0,b.o)(this.imageSrc)}
        name=${this.wallet?.name}
        .installed=${this.wallet?.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `}shimmerTemplate(){return n.dy`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}fetchImageSrc(){var l=this;return(0,Z.Z)(function*(){l.wallet&&(l.imageSrc=et.f.getWalletImage(l.wallet),!l.imageSrc&&(l.imageLoading=!0,l.imageSrc=yield et.f.fetchWalletImage(l.wallet.image_id),l.imageLoading=!1))})()}};o.styles=g,r([(0,i.SB)()],o.prototype,"visible",void 0),r([(0,i.SB)()],o.prototype,"imageSrc",void 0),r([(0,i.SB)()],o.prototype,"imageLoading",void 0),r([(0,i.Cb)()],o.prototype,"wallet",void 0),o=r([(0,K.Mo)("w3m-all-wallets-list-item")],o);const a=n.iv`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;var W=function(M,l,m,j){var A,B=arguments.length,c=B<3?l:null===j?j=Object.getOwnPropertyDescriptor(l,m):j;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(M,l,m,j);else for(var H=M.length-1;H>=0;H--)(A=M[H])&&(c=(B<3?A(c):B>3?A(l,m,c):A(l,m))||c);return B>3&&c&&Object.defineProperty(l,m,c),c};const S="local-paginator";let d=class extends n.oi{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!F.ApiController.state.wallets.length,this.wallets=F.ApiController.state.wallets,this.recommended=F.ApiController.state.recommended,this.featured=F.ApiController.state.featured,this.filteredWallets=F.ApiController.state.filteredWallets,this.unsubscribe.push(F.ApiController.subscribeKey("wallets",l=>this.wallets=l),F.ApiController.subscribeKey("recommended",l=>this.recommended=l),F.ApiController.subscribeKey("featured",l=>this.featured=l),F.ApiController.subscribeKey("filteredWallets",l=>this.filteredWallets=l))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(l=>l()),this.paginationObserver?.disconnect()}render(){return n.dy`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","s","s","s"]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}initialFetch(){var l=this;return(0,Z.Z)(function*(){l.loading=!0;const m=l.shadowRoot?.querySelector("wui-grid");m&&(yield F.ApiController.fetchWalletsByPage({page:1}),yield m.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,l.loading=!1,m.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))})()}shimmerTemplate(l,m){return[...Array(l)].map(()=>n.dy`
        <wui-card-select-loader type="wallet" id=${(0,b.o)(m)}></wui-card-select-loader>
      `)}walletsTemplate(){const l=this.filteredWallets?.length>0?U.j.uniqueBy([...this.featured,...this.recommended,...this.filteredWallets],"id"):U.j.uniqueBy([...this.featured,...this.recommended,...this.wallets],"id");return it.J.markWalletsAsInstalled(l).map(j=>n.dy`
        <w3m-all-wallets-list-item
          @click=${()=>this.onConnectWallet(j)}
          .wallet=${j}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){const{wallets:l,recommended:m,featured:j,count:B}=F.ApiController.state,c=window.innerWidth<352?3:4,A=l.length+m.length;let wt=Math.ceil(A/c)*c-A+c;return wt-=l.length?j.length%c:0,0===B&&j.length>0?null:0===B||[...j,...l,...m].length<B?this.shimmerTemplate(wt,S):null}createPaginationObserver(){const l=this.shadowRoot?.querySelector(`#${S}`);l&&(this.paginationObserver=new IntersectionObserver(([m])=>{if(m?.isIntersecting&&!this.loading){const{page:j,count:B,wallets:c}=F.ApiController.state;c.length<B&&F.ApiController.fetchWalletsByPage({page:j+1})}}),this.paginationObserver.observe(l))}onConnectWallet(l){ot.ConnectorController.selectWalletConnector(l)}};d.styles=a,W([(0,i.SB)()],d.prototype,"loading",void 0),W([(0,i.SB)()],d.prototype,"wallets",void 0),W([(0,i.SB)()],d.prototype,"recommended",void 0),W([(0,i.SB)()],d.prototype,"featured",void 0),W([(0,i.SB)()],d.prototype,"filteredWallets",void 0),d=W([(0,K.Mo)("w3m-all-wallets-list")],d);t(30189);const k=n.iv`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;var ct=function(M,l,m,j){var A,B=arguments.length,c=B<3?l:null===j?j=Object.getOwnPropertyDescriptor(l,m):j;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(M,l,m,j);else for(var H=M.length-1;H>=0;H--)(A=M[H])&&(c=(B<3?A(c):B>3?A(l,m,c):A(l,m))||c);return B>3&&c&&Object.defineProperty(l,m,c),c};let st=class extends n.oi{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?n.dy`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}onSearch(){var l=this;return(0,Z.Z)(function*(){(l.query.trim()!==l.prevQuery.trim()||l.badge!==l.prevBadge)&&(l.prevQuery=l.query,l.prevBadge=l.badge,l.loading=!0,yield F.ApiController.searchWallet({search:l.query,badge:l.badge}),l.loading=!1)})()}walletsTemplate(){const{search:l}=F.ApiController.state,m=it.J.markWalletsAsInstalled(l);return l.length?n.dy`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","s","s","s"]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${m.map(j=>n.dy`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(j)}
              .wallet=${j}
              data-testid="wallet-search-item-${j.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:n.dy`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(l){ot.ConnectorController.selectWalletConnector(l)}};st.styles=k,ct([(0,i.SB)()],st.prototype,"loading",void 0),ct([(0,i.Cb)()],st.prototype,"query",void 0),ct([(0,i.Cb)()],st.prototype,"badge",void 0),st=ct([(0,K.Mo)("w3m-all-wallets-search")],st);var pt=function(M,l,m,j){var A,B=arguments.length,c=B<3?l:null===j?j=Object.getOwnPropertyDescriptor(l,m):j;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(M,l,m,j);else for(var H=M.length-1;H>=0;H--)(A=M[H])&&(c=(B<3?A(c):B>3?A(l,m,c):A(l,m))||c);return B>3&&c&&Object.defineProperty(l,m,c),c};let dt=class extends n.oi{constructor(){super(...arguments),this.search="",this.onDebouncedSearch=U.j.debounce(l=>{this.search=l})}render(){const l=this.search.length>=2;return n.dy`
      <wui-flex .padding=${["0","s","s","s"]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${l||this.badge?n.dy`<w3m-all-wallets-search
            query=${this.search}
            badge=${(0,b.o)(this.badge)}
          ></w3m-all-wallets-search>`:n.dy`<w3m-all-wallets-list badge=${(0,b.o)(this.badge)}></w3m-all-wallets-list>`}
    `}onInputChange(l){this.onDebouncedSearch(l.detail)}onClick(){"certified"!==this.badge?(this.badge="certified",V.SnackController.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})):this.badge=void 0}qrButtonTemplate(){return U.j.isMobile()?n.dy`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){T.RouterController.push("ConnectingWalletConnect")}};pt([(0,i.SB)()],dt.prototype,"search",void 0),pt([(0,i.SB)()],dt.prototype,"badge",void 0),dt=pt([(0,K.Mo)("w3m-all-wallets-view")],dt)},55136:(q,Q,t)=>{t.d(Q,{M:()=>w});var n=t(59799),i=t(86523),b=t(18445),U=t(87563),V=t(66301),T=t(22429),K=t(50860),v=(t(937),t(47093),t(88368),t(87706),function(y,u,C,h){var $,f=arguments.length,O=f<3?u:null===h?h=Object.getOwnPropertyDescriptor(u,C):h;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)O=Reflect.decorate(y,u,C,h);else for(var I=y.length-1;I>=0;I--)($=y[I])&&(O=(f<3?$(O):f>3?$(u,C,O):$(u,C))||O);return f>3&&O&&Object.defineProperty(u,C,O),O});let w=class extends n.oi{constructor(){super(...arguments),this.isMobile=b.j.isMobile()}render(){if(this.isMobile){const{featured:u,recommended:C}=U.ApiController.state,{customWallets:h}=V.OptionsController.state,f=T.M.getRecentWallets(),O=u.length||C.length||h?.length||f.length;return n.dy`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${["3xs","s","s","s"]}
      >
        ${O?n.dy`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return n.dy`<wui-flex flexDirection="column" .padding=${["0","0","l","0"]}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${["0","m","0","m"]}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`}};v([(0,i.SB)()],w.prototype,"isMobile",void 0),w=v([(0,K.Mo)("w3m-connecting-wc-basic-view")],w)},87706:(q,Q,t)=>{t.d(Q,{L:()=>g});var n=t(49671),i=t(59799),b=t(86523),U=t(24380),V=t(66301),T=t(10053),K=t(18445),N=t(57745),x=t(79282),E=t(76169),R=t(20597),v=t(50860),u=(t(937),t(98618),function(r,o,a,W){var _,S=arguments.length,d=S<3?o:null===W?W=Object.getOwnPropertyDescriptor(o,a):W;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(r,o,a,W);else for(var k=r.length-1;k>=0;k--)(_=r[k])&&(d=(S<3?_(d):S>3?_(o,a,d):_(o,a))||d);return S>3&&d&&Object.defineProperty(o,a,d),d});let C=class extends i.oi{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(o=>o())}render(){const o=this.generateTabs();return i.dy`
      <wui-flex justifyContent="center" .padding=${["0","0","l","0"]}>
        <wui-tabs .tabs=${o} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){const o=this.platforms.map(a=>"browser"===a?{label:"Browser",icon:"extension",platform:"browser"}:"mobile"===a?{label:"Mobile",icon:"mobile",platform:"mobile"}:"qrcode"===a?{label:"Mobile",icon:"mobile",platform:"qrcode"}:"web"===a?{label:"Webapp",icon:"browser",platform:"web"}:"desktop"===a?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=o.map(({platform:a})=>a),o}onTabChange(o){const a=this.platformTabs[o];a&&this.onSelectPlatfrom?.(a)}};u([(0,b.Cb)({type:Array})],C.prototype,"platforms",void 0),u([(0,b.Cb)()],C.prototype,"onSelectPlatfrom",void 0),C=u([(0,v.Mo)("w3m-connecting-header")],C);var h=t(86424),f=t(34633);let $=class extends f.N{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),x.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}onConnectProxy(){var o=this;return(0,n.Z)(function*(){try{o.error=!1;const{connectors:a}=h.ConnectorController.state,W=a.find(S=>"ANNOUNCED"===S.type&&S.info?.rdns===o.wallet?.rdns||"INJECTED"===S.type||S.name===o.wallet?.name);if(!W)throw new Error("w3m-connecting-wc-browser: No connector found");yield T.ConnectionController.connectExternal(W,W.chain),N.I.close(),x.X.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:o.wallet?.name||"Unknown"}})}catch(a){x.X.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:a?.message??"Unknown"}}),o.error=!0}})()}};$=function(r,o,a,W){var _,S=arguments.length,d=S<3?o:null===W?W=Object.getOwnPropertyDescriptor(o,a):W;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(r,o,a,W);else for(var k=r.length-1;k>=0;k--)(_=r[k])&&(d=(S<3?_(d):S>3?_(o,a,d):_(o,a))||d);return S>3&&d&&Object.defineProperty(o,a,d),d}([(0,v.Mo)("w3m-connecting-wc-browser")],$);let P=class extends f.N{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),x.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop"}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;const{desktop_link:o,name:a}=this.wallet,{redirect:W,href:S}=K.j.formatNativeUrl(o,this.uri);T.ConnectionController.setWcLinking({name:a,href:S}),T.ConnectionController.setRecentWallet(this.wallet),K.j.openHref(W,"_blank")}catch{this.error=!0}}};P=function(r,o,a,W){var _,S=arguments.length,d=S<3?o:null===W?W=Object.getOwnPropertyDescriptor(o,a):W;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(r,o,a,W);else for(var k=r.length-1;k>=0;k--)(_=r[k])&&(d=(S<3?_(d):S>3?_(o,a,d):_(o,a))||d);return S>3&&d&&Object.defineProperty(o,a,d),d}([(0,v.Mo)("w3m-connecting-wc-desktop")],P);var z=t(36882),L=function(r,o,a,W){var _,S=arguments.length,d=S<3?o:null===W?W=Object.getOwnPropertyDescriptor(o,a):W;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(r,o,a,W);else for(var k=r.length-1;k>=0;k--)(_=r[k])&&(d=(S<3?_(d):S>3?_(o,a,d):_(o,a))||d);return S>3&&d&&Object.defineProperty(o,a,d),d};let X=class extends f.N{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=V.OptionsController.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{if(this.wallet?.mobile_link&&this.uri)try{this.error=!1;const{mobile_link:o,link_mode:a,name:W}=this.wallet,{redirect:S,redirectUniversalLink:d,href:_}=K.j.formatNativeUrl(o,this.uri,a);this.redirectDeeplink=S,this.redirectUniversalLink=d,this.target=K.j.isIframe()?"_top":"_self",T.ConnectionController.setWcLinking({name:W,href:_}),T.ConnectionController.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?K.j.openHref(this.redirectUniversalLink,this.target):K.j.openHref(this.redirectDeeplink,this.target)}catch(o){x.X.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:o instanceof Error?o.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw new Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=z.bq.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(T.ConnectionController.subscribeKey("wcUri",()=>{this.onHandleURI()})),x.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile"}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onTryAgain(){T.ConnectionController.setWcError(!1),this.onConnect?.()}};L([(0,b.SB)()],X.prototype,"redirectDeeplink",void 0),L([(0,b.SB)()],X.prototype,"redirectUniversalLink",void 0),L([(0,b.SB)()],X.prototype,"target",void 0),L([(0,b.SB)()],X.prototype,"preferUniversalLinks",void 0),L([(0,b.SB)()],X.prototype,"isLoading",void 0),X=L([(0,v.Mo)("w3m-connecting-wc-mobile")],X);var G=t(23107),Z=t(56364),F=t(17111);t(51078),t(88198),t(73083),t(75165),t(54575),t(30956),t(41800);const at=i.iv`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`;let Y=class extends f.N{constructor(){super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),x.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet?.name??"WalletConnect",platform:"qrcode"}})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.forEach(o=>o()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),i.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","xl","xl","xl"]}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const o=this.getBoundingClientRect().width-40,a=this.wallet?this.wallet.name:void 0;return T.ConnectionController.setWcLinking(void 0),T.ConnectionController.setRecentWallet(this.wallet),i.dy` <wui-qr-code
      size=${o}
      theme=${Z.ThemeController.state.themeMode}
      uri=${this.uri}
      imageSrc=${(0,G.o)(F.f.getWalletImage(this.wallet))}
      color=${(0,G.o)(Z.ThemeController.state.themeVariables["--w3m-qr-color"])}
      alt=${(0,G.o)(a)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){const o=!this.uri||!this.ready;return i.dy`<wui-link
      .disabled=${o}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};Y.styles=at,Y=function(r,o,a,W){var _,S=arguments.length,d=S<3?o:null===W?W=Object.getOwnPropertyDescriptor(o,a):W;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(r,o,a,W);else for(var k=r.length-1;k>=0;k--)(_=r[k])&&(d=(S<3?_(d):S>3?_(o,a,d):_(o,a))||d);return S>3&&d&&Object.defineProperty(o,a,d),d}([(0,v.Mo)("w3m-connecting-wc-qrcode")],Y);t(88078);let D=class extends i.oi{constructor(){if(super(),this.wallet=U.RouterController.state.data?.wallet,!this.wallet)throw new Error("w3m-connecting-wc-unsupported: No wallet provided");x.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}render(){return i.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${(0,G.o)(F.f.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};D=function(r,o,a,W){var _,S=arguments.length,d=S<3?o:null===W?W=Object.getOwnPropertyDescriptor(o,a):W;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(r,o,a,W);else for(var k=r.length-1;k>=0;k--)(_=r[k])&&(d=(S<3?_(d):S>3?_(o,a,d):_(o,a))||d);return S>3&&d&&Object.defineProperty(o,a,d),d}([(0,v.Mo)("w3m-connecting-wc-unsupported")],D);var e=function(r,o,a,W){var _,S=arguments.length,d=S<3?o:null===W?W=Object.getOwnPropertyDescriptor(o,a):W;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(r,o,a,W);else for(var k=r.length-1;k>=0;k--)(_=r[k])&&(d=(S<3?_(d):S>3?_(o,a,d):_(o,a))||d);return S>3&&d&&Object.defineProperty(o,a,d),d};let s=class extends f.N{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw new Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=z.bq.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(T.ConnectionController.subscribeKey("wcUri",()=>{this.updateLoadingState()})),x.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web"}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;const{webapp_link:o,name:a}=this.wallet,{redirect:W,href:S}=K.j.formatUniversalUrl(o,this.uri);T.ConnectionController.setWcLinking({name:a,href:S}),T.ConnectionController.setRecentWallet(this.wallet),K.j.openHref(W,"_blank")}catch{this.error=!0}}};e([(0,b.SB)()],s.prototype,"isLoading",void 0),s=e([(0,v.Mo)("w3m-connecting-wc-web")],s);var p=function(r,o,a,W){var _,S=arguments.length,d=S<3?o:null===W?W=Object.getOwnPropertyDescriptor(o,a):W;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(r,o,a,W);else for(var k=r.length-1;k>=0;k--)(_=r[k])&&(d=(S<3?_(d):S>3?_(o,a,d):_(o,a))||d);return S>3&&d&&Object.defineProperty(o,a,d),d};let g=class extends i.oi{constructor(){super(),this.wallet=U.RouterController.state.data?.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!V.OptionsController.state.siwx,this.remoteFeatures=V.OptionsController.state.remoteFeatures,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(V.OptionsController.subscribeKey("remoteFeatures",o=>this.remoteFeatures=o))}disconnectedCallback(){this.unsubscribe.forEach(o=>o())}render(){return i.dy`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding?i.dy`<wui-ux-by-reown></wui-ux-by-reown>`:null}initializeConnection(o=!1){var a=this;return(0,n.Z)(function*(){if("browser"!==a.platform&&(!V.OptionsController.state.manualWCControl||o))try{const{wcPairingExpiry:W,status:S}=T.ConnectionController.state;(o||V.OptionsController.state.enableEmbedded||K.j.isPairingExpired(W)||"connecting"===S)&&(yield T.ConnectionController.connectWalletConnect(),a.isSiwxEnabled||N.I.close())}catch(W){x.X.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:W?.message??"Unknown"}}),T.ConnectionController.setWcError(!0),E.SnackController.showError(W.message??"Connection error"),T.ConnectionController.resetWcConnection(),U.RouterController.goBack()}})()}determinePlatforms(){if(!this.wallet)return this.platforms.push("qrcode"),void(this.platform="qrcode");if(this.platform)return;const{mobile_link:o,desktop_link:a,webapp_link:W,injected:S,rdns:d}=this.wallet,_=S?.map(({injected_id:m})=>m).filter(Boolean),k=[...d?[d]:_??[]],ct=!V.OptionsController.state.isUniversalProvider&&k.length,st=o,pt=W,dt=T.ConnectionController.checkInstalled(k),M=ct&&dt,l=a&&!K.j.isMobile();M&&!R.R.state.noAdapters&&this.platforms.push("browser"),st&&this.platforms.push(K.j.isMobile()?"mobile":"qrcode"),pt&&this.platforms.push("web"),l&&this.platforms.push("desktop"),!M&&ct&&!R.R.state.noAdapters&&this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return i.dy`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return i.dy`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return i.dy`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return i.dy`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return i.dy`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return i.dy`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?i.dy`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}onSelectPlatform(o){var a=this;return(0,n.Z)(function*(){const W=a.shadowRoot?.querySelector("div");W&&(yield W.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,a.platform=o,W.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))})()}};p([(0,b.SB)()],g.prototype,"platform",void 0),p([(0,b.SB)()],g.prototype,"platforms",void 0),p([(0,b.SB)()],g.prototype,"isSiwxEnabled",void 0),p([(0,b.SB)()],g.prototype,"remoteFeatures",void 0),g=p([(0,v.Mo)("w3m-connecting-wc-view")],g)},91986:(q,Q,t)=>{t.d(Q,{X:()=>x});var n=t(59799),i=t(24380),b=t(18445),U=t(50860);t(937),t(72111),t(54575);let x=class extends n.oi{constructor(){super(...arguments),this.wallet=i.RouterController.state.data?.wallet}render(){if(!this.wallet)throw new Error("w3m-downloads-view");return n.dy`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s","s","l","s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){return this.wallet?.chrome_store?n.dy`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?n.dy`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?n.dy`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?n.dy`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){this.wallet?.chrome_store&&b.j.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){this.wallet?.app_store&&b.j.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&b.j.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&b.j.openHref(this.wallet.homepage,"_blank")}};x=function(E,R,v,w){var C,y=arguments.length,u=y<3?R:null===w?w=Object.getOwnPropertyDescriptor(R,v):w;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)u=Reflect.decorate(E,R,v,w);else for(var h=E.length-1;h>=0;h--)(C=E[h])&&(u=(y<3?C(u):y>3?C(R,v,u):C(R,v))||u);return y>3&&u&&Object.defineProperty(R,v,u),u}([(0,U.Mo)("w3m-downloads-view")],x)},72111:(q,Q,t)=>{var n=t(59799),i=t(86523),b=t(23107),x=(t(72686),t(11252),t(78549),t(10831),t(79348),t(25518)),E=t(70075);t(87538);const v=n.iv`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      color var(--wui-ease-out-power-1) var(--wui-duration-md),
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: color, background-color;
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:disabled {
    color: var(--wui-color-gray-glass-020);
  }

  button[data-loading='true'] > wui-icon {
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;var w=function(u,C,h,f){var I,O=arguments.length,$=O<3?C:null===f?f=Object.getOwnPropertyDescriptor(C,h):f;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)$=Reflect.decorate(u,C,h,f);else for(var P=u.length-1;P>=0;P--)(I=u[P])&&($=(O<3?I($):O>3?I(C,h,$):I(C,h))||$);return O>3&&$&&Object.defineProperty(C,h,$),$};let y=class extends n.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.variant="icon",this.disabled=!1,this.imageSrc=void 0,this.alt=void 0,this.chevron=!1,this.loading=!1}render(){return n.dy`
      <button
        ?disabled=${!!this.loading||!!this.disabled}
        data-loading=${this.loading}
        data-iconvariant=${(0,b.o)(this.iconVariant)}
        tabindex=${(0,b.o)(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `}visualTemplate(){if("image"===this.variant&&this.imageSrc)return n.dy`<wui-image src=${this.imageSrc} alt=${this.alt??"list item"}></wui-image>`;if("square"===this.iconVariant&&this.icon&&"icon"===this.variant)return n.dy`<wui-icon name=${this.icon}></wui-icon>`;if("icon"===this.variant&&this.icon&&this.iconVariant){const C=["blue","square-blue"].includes(this.iconVariant)?"accent-100":"fg-200",h="square-blue"===this.iconVariant?"mdl":"md",f=this.iconSize?this.iconSize:h;return n.dy`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${f}
          background="transparent"
          iconColor=${C}
          backgroundColor=${C}
          size=${h}
        ></wui-icon-box>
      `}return null}loadingTemplate(){return this.loading?n.dy`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`:n.dy``}chevronTemplate(){return this.chevron?n.dy`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`:null}};y.styles=[x.ET,x.ZM,v],w([(0,i.Cb)()],y.prototype,"icon",void 0),w([(0,i.Cb)()],y.prototype,"iconSize",void 0),w([(0,i.Cb)()],y.prototype,"tabIdx",void 0),w([(0,i.Cb)()],y.prototype,"variant",void 0),w([(0,i.Cb)()],y.prototype,"iconVariant",void 0),w([(0,i.Cb)({type:Boolean})],y.prototype,"disabled",void 0),w([(0,i.Cb)()],y.prototype,"imageSrc",void 0),w([(0,i.Cb)()],y.prototype,"alt",void 0),w([(0,i.Cb)({type:Boolean})],y.prototype,"chevron",void 0),w([(0,i.Cb)({type:Boolean})],y.prototype,"loading",void 0),y=w([(0,E.M)("wui-list-item")],y)},67552:(q,Q,t)=>{var n=t(59799),i=t(86523),b=t(23107),K=(t(72686),t(10831),t(87538),t(25518)),N=t(70075);t(79348),t(9958);const R=n.iv`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`;var v=function(O,$,I,P){var X,z=arguments.length,L=z<3?$:null===P?P=Object.getOwnPropertyDescriptor($,I):P;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)L=Reflect.decorate(O,$,I,P);else for(var G=O.length-1;G>=0;G--)(X=O[G])&&(L=(z<3?X(L):z>3?X($,I,L):X($,I))||L);return z>3&&L&&Object.defineProperty($,I,L),L};let y=class extends n.oi{constructor(){super(...arguments),this.walletImages=[]}render(){const $=this.walletImages.length<4;return n.dy`${this.walletImages.slice(0,4).map(({src:I,walletName:P})=>n.dy`
            <wui-wallet-image
              size="inherit"
              imageSrc=${I}
              name=${(0,b.o)(P)}
            ></wui-wallet-image>
          `)}
      ${$?[...Array(4-this.walletImages.length)].map(()=>n.dy` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};y.styles=[K.ET,R],v([(0,i.Cb)({type:Array})],y.prototype,"walletImages",void 0),y=v([(0,N.M)("wui-all-wallets-image")],y);t(28019);const C=n.iv`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`;var h=function(O,$,I,P){var X,z=arguments.length,L=z<3?$:null===P?P=Object.getOwnPropertyDescriptor($,I):P;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)L=Reflect.decorate(O,$,I,P);else for(var G=O.length-1;G>=0;G--)(X=O[G])&&(L=(z<3?X(L):z>3?X($,I,L):X($,I))||L);return z>3&&L&&Object.defineProperty($,I,L),L};let f=class extends n.oi{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.tabIdx=void 0,this.installed=!1,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100"}render(){return n.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,b.o)(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?n.dy` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?n.dy` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?n.dy`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:this.showAllWallets||this.imageSrc?null:n.dy`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`}templateStatus(){return this.loading?n.dy`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?n.dy`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?n.dy`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};f.styles=[K.ET,K.ZM,C],h([(0,i.Cb)({type:Array})],f.prototype,"walletImages",void 0),h([(0,i.Cb)()],f.prototype,"imageSrc",void 0),h([(0,i.Cb)()],f.prototype,"name",void 0),h([(0,i.Cb)()],f.prototype,"tagLabel",void 0),h([(0,i.Cb)()],f.prototype,"tagVariant",void 0),h([(0,i.Cb)()],f.prototype,"icon",void 0),h([(0,i.Cb)()],f.prototype,"walletIcon",void 0),h([(0,i.Cb)()],f.prototype,"tabIdx",void 0),h([(0,i.Cb)({type:Boolean})],f.prototype,"installed",void 0),h([(0,i.Cb)({type:Boolean})],f.prototype,"disabled",void 0),h([(0,i.Cb)({type:Boolean})],f.prototype,"showAllWallets",void 0),h([(0,i.Cb)({type:Boolean})],f.prototype,"loading",void 0),h([(0,i.Cb)({type:String})],f.prototype,"loadingSpinnerColor",void 0),f=h([(0,N.M)("wui-list-wallet")],f)},30189:(q,Q,t)=>{t(78549)},75165:(q,Q,t)=>{t(294)},98618:(q,Q,t)=>{var n=t(59799),i=t(86523),V=(t(72686),t(10831),t(25518)),T=t(70075);const K=n.iv`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`;var N=function(E,R,v,w){var C,y=arguments.length,u=y<3?R:null===w?w=Object.getOwnPropertyDescriptor(R,v):w;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)u=Reflect.decorate(E,R,v,w);else for(var h=E.length-1;h>=0;h--)(C=E[h])&&(u=(y<3?C(u):y>3?C(R,v,u):C(R,v))||u);return y>3&&u&&Object.defineProperty(R,v,u),u};let x=class extends n.oi{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.localTabWidth="100px",this.activeTab=0,this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`\n      --local-tab: ${this.activeTab};\n      --local-tab-width: ${this.localTabWidth};\n    `,this.dataset.type=this.isDense?"flex":"block",this.tabs.map((R,v)=>{const w=v===this.activeTab;return n.dy`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(v)}
          data-active=${w}
          data-testid="tab-${R.label?.toLowerCase()}"
        >
          ${this.iconTemplate(R)}
          <wui-text variant="small-600" color="inherit"> ${R.label} </wui-text>
        </button>
      `})}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll("button")],setTimeout(()=>{this.animateTabs(0,!0)},0))}iconTemplate(R){return R.icon?n.dy`<wui-icon size="xs" color="inherit" name=${R.icon}></wui-icon>`:null}onTabClick(R){this.buttons&&this.animateTabs(R,!1),this.activeTab=R,this.onTabChange(R)}animateTabs(R,v){const w=this.buttons[this.activeTab],y=this.buttons[R],u=w?.querySelector("wui-text"),C=y?.querySelector("wui-text"),h=y?.getBoundingClientRect(),f=C?.getBoundingClientRect();w&&u&&!v&&R!==this.activeTab&&(u.animate([{opacity:0}],{duration:50,easing:"ease",fill:"forwards"}),w.animate([{width:"34px"}],{duration:500,easing:"ease",fill:"forwards"})),y&&h&&f&&C&&(R!==this.activeTab||v)&&(this.localTabWidth=`${Math.round(h.width+f.width)+6}px`,y.animate([{width:`${h.width+f.width}px`}],{duration:v?0:500,fill:"forwards",easing:"ease"}),C.animate([{opacity:1}],{duration:v?0:125,delay:v?0:200,fill:"forwards",easing:"ease"}))}};x.styles=[V.ET,V.ZM,K],N([(0,i.Cb)({type:Array})],x.prototype,"tabs",void 0),N([(0,i.Cb)()],x.prototype,"onTabChange",void 0),N([(0,i.Cb)({type:Array})],x.prototype,"buttons",void 0),N([(0,i.Cb)({type:Boolean})],x.prototype,"disabled",void 0),N([(0,i.Cb)()],x.prototype,"localTabWidth",void 0),N([(0,i.SB)()],x.prototype,"activeTab",void 0),N([(0,i.SB)()],x.prototype,"isDense",void 0),x=N([(0,T.M)("wui-tabs")],x)},88078:(q,Q,t)=>{t(9958)},85359:(q,Q,t)=>{t.d(Q,{W:()=>i});const i=t(59799).YP`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`},94215:(q,Q,t)=>{var n=t(59799),i=t(86523),T=(t(72686),t(11252),t(10831),t(25518)),K=t(70075);const N=n.iv`
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
`;var x=function(R,v,w,y){var h,u=arguments.length,C=u<3?v:null===y?y=Object.getOwnPropertyDescriptor(v,w):y;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)C=Reflect.decorate(R,v,w,y);else for(var f=R.length-1;f>=0;f--)(h=R[f])&&(C=(u<3?h(C):u>3?h(v,w,C):h(v,w))||C);return u>3&&C&&Object.defineProperty(v,w,C),C};let E=class extends n.oi{constructor(){super(...arguments),this.variant="accent",this.imageSrc="",this.disabled=!1,this.icon="externalLink",this.size="md",this.text=""}render(){const v="sm"===this.size?"small-600":"paragraph-600";return n.dy`
      <button
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc?n.dy`<wui-image src=${this.imageSrc}></wui-image>`:null}
        <wui-text variant=${v} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `}};E.styles=[T.ET,T.ZM,N],x([(0,i.Cb)()],E.prototype,"variant",void 0),x([(0,i.Cb)()],E.prototype,"imageSrc",void 0),x([(0,i.Cb)({type:Boolean})],E.prototype,"disabled",void 0),x([(0,i.Cb)()],E.prototype,"icon",void 0),x([(0,i.Cb)()],E.prototype,"size",void 0),x([(0,i.Cb)()],E.prototype,"text",void 0),E=x([(0,K.M)("wui-chip-button")],E)},28019:(q,Q,t)=>{var n=t(59799),i=t(86523),U=(t(10831),t(25518)),V=t(70075);const T=n.iv`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--wui-spacing-m);
    padding: 0 var(--wui-spacing-3xs) !important;
    border-radius: var(--wui-border-radius-5xs);
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host > wui-text {
    transform: translateY(5%);
  }

  :host([data-variant='main']) {
    background-color: var(--wui-color-accent-glass-015);
    color: var(--wui-color-accent-100);
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  :host([data-variant='success']) {
    background-color: var(--wui-icon-box-bg-success-100);
    color: var(--wui-color-success-100);
  }

  :host([data-variant='error']) {
    background-color: var(--wui-icon-box-bg-error-100);
    color: var(--wui-color-error-100);
  }

  :host([data-size='lg']) {
    padding: 11px 5px !important;
  }

  :host([data-size='lg']) > wui-text {
    transform: translateY(2%);
  }
`;var K=function(x,E,R,v){var u,w=arguments.length,y=w<3?E:null===v?v=Object.getOwnPropertyDescriptor(E,R):v;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)y=Reflect.decorate(x,E,R,v);else for(var C=x.length-1;C>=0;C--)(u=x[C])&&(y=(w<3?u(y):w>3?u(E,R,y):u(E,R))||y);return w>3&&y&&Object.defineProperty(E,R,y),y};let N=class extends n.oi{constructor(){super(...arguments),this.variant="main",this.size="lg"}render(){this.dataset.variant=this.variant,this.dataset.size=this.size;const E="md"===this.size?"mini-700":"micro-700";return n.dy`
      <wui-text data-variant=${this.variant} variant=${E} color="inherit">
        <slot></slot>
      </wui-text>
    `}};N.styles=[U.ET,T],K([(0,i.Cb)()],N.prototype,"variant",void 0),K([(0,i.Cb)()],N.prototype,"size",void 0),N=K([(0,V.M)("wui-tag")],N)},9958:(q,Q,t)=>{var n=t(59799),i=t(86523),T=(t(72686),t(11252),t(79348),t(25518)),K=t(70075);t(87538);const x=n.iv`
  :host {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-size);
    height: var(--local-size);
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host([name='Extension'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  :host([data-wallet-icon='allWallets']) {
    background-color: var(--wui-all-wallets-bg-100);
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 18px;
    height: 18px;
  }

  wui-icon[data-parent-size='md'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='lg'] {
    width: 42px;
    height: 42px;
  }

  wui-icon[data-parent-size='full'] {
    width: 100%;
    height: 100%;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid var(--wui-color-bg-150, #1e1f1f);
    padding: 1px;
  }
`;var E=function(v,w,y,u){var f,C=arguments.length,h=C<3?w:null===u?u=Object.getOwnPropertyDescriptor(w,y):u;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)h=Reflect.decorate(v,w,y,u);else for(var O=v.length-1;O>=0;O--)(f=v[O])&&(h=(C<3?f(h):C>3?f(w,y,h):f(w,y))||h);return C>3&&h&&Object.defineProperty(w,y,h),h};let R=class extends n.oi{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let w="xxs";return w="lg"===this.size?"m":"md"===this.size?"xs":"xxs",this.style.cssText=`\n       --local-border-radius: var(--wui-border-radius-${w});\n       --local-size: var(--wui-wallet-image-size-${this.size});\n   `,this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),n.dy`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?n.dy`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?n.dy`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`:n.dy`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};R.styles=[T.ZM,T.ET,x],E([(0,i.Cb)()],R.prototype,"size",void 0),E([(0,i.Cb)()],R.prototype,"name",void 0),E([(0,i.Cb)()],R.prototype,"imageSrc",void 0),E([(0,i.Cb)()],R.prototype,"walletIcon",void 0),E([(0,i.Cb)({type:Boolean})],R.prototype,"installed",void 0),E([(0,i.Cb)()],R.prototype,"badgeSize",void 0),R=E([(0,K.M)("wui-wallet-image")],R)}}]);