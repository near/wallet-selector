"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[1643],{41643:(G,K,l)=>{var I,r,s=l(59799),c=l(86523),S=l(88145),y=l(20597),d=l(70325),$=l(18445),B=l(24380),j=l(66301),T=l(79282),L=l(22917),v=l(50860),D=(l(937),l(6500),l(88198),l(54575),l(23107)),Y=(l(72686),l(10831),l(79348),l(25518));(r=I||(I={})).approve="approved",r.bought="bought",r.borrow="borrowed",r.burn="burnt",r.cancel="canceled",r.claim="claimed",r.deploy="deployed",r.deposit="deposited",r.execute="executed",r.mint="minted",r.receive="received",r.repay="repaid",r.send="sent",r.sell="sold",r.stake="staked",r.trade="swapped",r.unstake="unstaked",r.withdraw="withdrawn";var O=l(70075);l(11252),l(87538);const V=s.iv`
  :host > wui-flex {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 40px;
    height: 40px;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-gray-glass-005);
  }

  :host > wui-flex wui-image {
    display: block;
  }

  :host > wui-flex,
  :host > wui-flex wui-image,
  .swap-images-container,
  .swap-images-container.nft,
  wui-image.nft {
    border-top-left-radius: var(--local-left-border-radius);
    border-top-right-radius: var(--local-right-border-radius);
    border-bottom-left-radius: var(--local-left-border-radius);
    border-bottom-right-radius: var(--local-right-border-radius);
  }

  wui-icon {
    width: 20px;
    height: 20px;
  }

  wui-icon-box {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(20%, 20%);
  }

  .swap-images-container {
    position: relative;
    width: 40px;
    height: 40px;
    overflow: hidden;
  }

  .swap-images-container wui-image:first-child {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    left: 0%;
    clip-path: inset(0px calc(50% + 2px) 0px 0%);
  }

  .swap-images-container wui-image:last-child {
    clip-path: inset(0px 0px 0px calc(50% + 2px));
  }
`;var w=function(r,t,e,o){var a,n=arguments.length,i=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,e):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(r,t,e,o);else for(var u=r.length-1;u>=0;u--)(a=r[u])&&(i=(n<3?a(i):n>3?a(t,e,i):a(t,e))||i);return n>3&&i&&Object.defineProperty(t,e,i),i};let g=class extends s.oi{constructor(){super(...arguments),this.images=[],this.secondImage={type:void 0,url:""}}render(){const[t,e]=this.images,o="NFT"===t?.type,i=o?"var(--wui-border-radius-xxs)":"var(--wui-border-radius-s)",a=(e?.url?"NFT"===e.type:o)?"var(--wui-border-radius-xxs)":"var(--wui-border-radius-s)";return this.style.cssText=`\n    --local-left-border-radius: ${i};\n    --local-right-border-radius: ${a};\n    `,s.dy`<wui-flex> ${this.templateVisual()} ${this.templateIcon()} </wui-flex>`}templateVisual(){const[t,e]=this.images,o=t?.type;return 2===this.images.length&&(t?.url||e?.url)?s.dy`<div class="swap-images-container">
        ${t?.url?s.dy`<wui-image src=${t.url} alt="Transaction image"></wui-image>`:null}
        ${e?.url?s.dy`<wui-image src=${e.url} alt="Transaction image"></wui-image>`:null}
      </div>`:t?.url?s.dy`<wui-image src=${t.url} alt="Transaction image"></wui-image>`:"NFT"===o?s.dy`<wui-icon size="inherit" color="fg-200" name="nftPlaceholder"></wui-icon>`:s.dy`<wui-icon size="inherit" color="fg-200" name="coinPlaceholder"></wui-icon>`}templateIcon(){let e,t="accent-100";return e=this.getIcon(),this.status&&(t=this.getStatusColor()),e?s.dy`
      <wui-icon-box
        size="xxs"
        iconColor=${t}
        backgroundColor=${t}
        background="opaque"
        icon=${e}
        ?border=${!0}
        borderColor="wui-color-bg-125"
      ></wui-icon-box>
    `:null}getDirectionIcon(){switch(this.direction){case"in":return"arrowBottom";case"out":return"arrowTop";default:return}}getIcon(){return this.onlyDirectionIcon?this.getDirectionIcon():"trade"===this.type?"swapHorizontalBold":"approve"===this.type?"checkmark":"cancel"===this.type?"close":this.getDirectionIcon()}getStatusColor(){switch(this.status){case"confirmed":return"success-100";case"failed":return"error-100";case"pending":return"inverse-100";default:return"accent-100"}}};g.styles=[V],w([(0,c.Cb)()],g.prototype,"type",void 0),w([(0,c.Cb)()],g.prototype,"status",void 0),w([(0,c.Cb)()],g.prototype,"direction",void 0),w([(0,c.Cb)({type:Boolean})],g.prototype,"onlyDirectionIcon",void 0),w([(0,c.Cb)({type:Array})],g.prototype,"images",void 0),w([(0,c.Cb)({type:Object})],g.prototype,"secondImage",void 0),g=w([(0,O.M)("wui-transaction-visual")],g);const z=s.iv`
  :host > wui-flex:first-child {
    align-items: center;
    column-gap: var(--wui-spacing-s);
    padding: 6.5px var(--wui-spacing-xs) 6.5px var(--wui-spacing-xs);
    width: 100%;
  }

  :host > wui-flex:first-child wui-text:nth-child(1) {
    text-transform: capitalize;
  }

  wui-transaction-visual {
    width: 40px;
    height: 40px;
  }

  wui-flex {
    flex: 1;
  }

  :host wui-flex wui-flex {
    overflow: hidden;
  }

  :host .description-container wui-text span {
    word-break: break-all;
  }

  :host .description-container wui-text {
    overflow: hidden;
  }

  :host .description-separator-icon {
    margin: 0px 6px;
  }

  :host wui-text > span {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
`;var h=function(r,t,e,o){var a,n=arguments.length,i=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,e):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(r,t,e,o);else for(var u=r.length-1;u>=0;u--)(a=r[u])&&(i=(n<3?a(i):n>3?a(t,e,i):a(t,e))||i);return n>3&&i&&Object.defineProperty(t,e,i),i};let p=class extends s.oi{constructor(){super(...arguments),this.type="approve",this.onlyDirectionIcon=!1,this.images=[],this.price=[],this.amount=[],this.symbol=[]}render(){return s.dy`
      <wui-flex>
        <wui-transaction-visual
          .status=${this.status}
          direction=${(0,D.o)(this.direction)}
          type=${this.type}
          onlyDirectionIcon=${(0,D.o)(this.onlyDirectionIcon)}
          .images=${this.images}
        ></wui-transaction-visual>
        <wui-flex flexDirection="column" gap="3xs">
          <wui-text variant="paragraph-600" color="fg-100">
            ${I[this.type]||this.type}
          </wui-text>
          <wui-flex class="description-container">
            ${this.templateDescription()} ${this.templateSecondDescription()}
          </wui-flex>
        </wui-flex>
        <wui-text variant="micro-700" color="fg-300"><span>${this.date}</span></wui-text>
      </wui-flex>
    `}templateDescription(){const t=this.descriptions?.[0];return t?s.dy`
          <wui-text variant="small-500" color="fg-200">
            <span>${t}</span>
          </wui-text>
        `:null}templateSecondDescription(){const t=this.descriptions?.[1];return t?s.dy`
          <wui-icon class="description-separator-icon" size="xxs" name="arrowRight"></wui-icon>
          <wui-text variant="small-400" color="fg-200">
            <span>${t}</span>
          </wui-text>
        `:null}};p.styles=[Y.ET,z],h([(0,c.Cb)()],p.prototype,"type",void 0),h([(0,c.Cb)({type:Array})],p.prototype,"descriptions",void 0),h([(0,c.Cb)()],p.prototype,"date",void 0),h([(0,c.Cb)({type:Boolean})],p.prototype,"onlyDirectionIcon",void 0),h([(0,c.Cb)()],p.prototype,"status",void 0),h([(0,c.Cb)()],p.prototype,"direction",void 0),h([(0,c.Cb)({type:Array})],p.prototype,"images",void 0),h([(0,c.Cb)({type:Array})],p.prototype,"price",void 0),h([(0,c.Cb)({type:Array})],p.prototype,"amount",void 0),h([(0,c.Cb)({type:Array})],p.prototype,"symbol",void 0),p=h([(0,O.M)("wui-transaction-list-item")],p);l(74690);var E=l(64599);const W=s.iv`
  :host {
    min-height: 100%;
  }

  .group-container[last-group='true'] {
    padding-bottom: var(--wui-spacing-m);
  }

  .contentContainer {
    height: 280px;
  }

  .contentContainer > wui-icon-box {
    width: 40px;
    height: 40px;
    border-radius: var(--wui-border-radius-xxs);
  }

  .contentContainer > .textContent {
    width: 65%;
  }

  .emptyContainer {
    height: 100%;
  }
`;var x=function(r,t,e,o){var a,n=arguments.length,i=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,e):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(r,t,e,o);else for(var u=r.length-1;u>=0;u--)(a=r[u])&&(i=(n<3?a(i):n>3?a(t,e,i):a(t,e))||i);return n>3&&i&&Object.defineProperty(t,e,i),i};const b="last-transaction";let m=class extends s.oi{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.page="activity",this.caipAddress=y.R.state.activeCaipAddress,this.transactionsByYear=d.s.state.transactionsByYear,this.loading=d.s.state.loading,this.empty=d.s.state.empty,this.next=d.s.state.next,d.s.clearCursor(),this.unsubscribe.push(y.R.subscribeKey("activeCaipAddress",t=>{t&&this.caipAddress!==t&&(d.s.resetTransactions(),d.s.fetchTransactions(t)),this.caipAddress=t}),y.R.subscribeKey("activeCaipNetwork",()=>{this.updateTransactionView()}),d.s.subscribe(t=>{this.transactionsByYear=t.transactionsByYear,this.loading=t.loading,this.empty=t.empty,this.next=t.next}))}firstUpdated(){this.updateTransactionView(),this.createPaginationObserver()}updated(){this.setPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){return s.dy` ${this.empty?null:this.templateTransactionsByYear()}
    ${this.loading?this.templateLoading():null}
    ${!this.loading&&this.empty?this.templateEmpty():null}`}updateTransactionView(){const t=y.R.state.activeCaipNetwork?.caipNetworkId;d.s.state.lastNetworkInView!==t&&(d.s.resetTransactions(),this.caipAddress&&d.s.fetchTransactions($.j.getPlainAddress(this.caipAddress))),d.s.setLastNetworkInView(t)}templateTransactionsByYear(){return Object.keys(this.transactionsByYear).sort().reverse().map(e=>{const o=parseInt(e,10),n=new Array(12).fill(null).map((i,a)=>{const u=v.AI.getTransactionGroupTitle(o,a),f=this.transactionsByYear[o]?.[a];return{groupTitle:u,transactions:f}}).filter(({transactions:i})=>i).reverse();return n.map(({groupTitle:i,transactions:a},u)=>{const f=u===n.length-1;return a?s.dy`
          <wui-flex
            flexDirection="column"
            class="group-container"
            last-group="${f?"true":"false"}"
            data-testid="month-indexes"
          >
            <wui-flex
              alignItems="center"
              flexDirection="row"
              .padding=${["xs","s","s","s"]}
            >
              <wui-text variant="paragraph-500" color="fg-200" data-testid="group-title"
                >${i}</wui-text
              >
            </wui-flex>
            <wui-flex flexDirection="column" gap="xs">
              ${this.templateTransactions(a,f)}
            </wui-flex>
          </wui-flex>
        `:null})})}templateRenderTransaction(t,e){const{date:o,descriptions:n,direction:i,isAllNFT:a,images:u,status:f,transfers:C,type:A}=this.getTransactionListItemProps(t),M=C?.length>1;return 2!==C?.length||a?M?C.map((R,N)=>{const U=v.AI.getTransferDescription(R),k=e&&N===C.length-1;return s.dy` <wui-transaction-list-item
          date=${o}
          direction=${R.direction}
          id=${k&&this.next?b:""}
          status=${f}
          type=${A}
          .onlyDirectionIcon=${!0}
          .images=${[u[N]]}
          .descriptions=${[U]}
        ></wui-transaction-list-item>`}):s.dy`
      <wui-transaction-list-item
        date=${o}
        .direction=${i}
        id=${e&&this.next?b:""}
        status=${f}
        type=${A}
        .images=${u}
        .descriptions=${n}
      ></wui-transaction-list-item>
    `:s.dy`
        <wui-transaction-list-item
          date=${o}
          .direction=${i}
          id=${e&&this.next?b:""}
          status=${f}
          type=${A}
          .images=${u}
          .descriptions=${n}
        ></wui-transaction-list-item>
      `}templateTransactions(t,e){return t.map((o,n)=>{const i=e&&n===t.length-1;return s.dy`${this.templateRenderTransaction(o,i)}`})}emptyStateActivity(){return s.dy`<wui-flex
      class="emptyContainer"
      flexGrow="1"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      .padding=${["3xl","xl","3xl","xl"]}
      gap="xl"
      data-testid="empty-activity-state"
    >
      <wui-icon-box
        backgroundColor="gray-glass-005"
        background="gray"
        iconColor="fg-200"
        icon="wallet"
        size="lg"
        ?border=${!0}
        borderColor="wui-color-bg-125"
      ></wui-icon-box>
      <wui-flex flexDirection="column" alignItems="center" gap="xs">
        <wui-text align="center" variant="paragraph-500" color="fg-100"
          >No Transactions yet</wui-text
        >
        <wui-text align="center" variant="small-500" color="fg-200"
          >Start trading on dApps <br />
          to grow your wallet!</wui-text
        >
      </wui-flex>
    </wui-flex>`}emptyStateAccount(){return s.dy`<wui-flex
      class="contentContainer"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="l"
      data-testid="empty-account-state"
    >
      <wui-icon-box
        icon="swapHorizontal"
        size="inherit"
        iconColor="fg-200"
        backgroundColor="fg-200"
        iconSize="lg"
      ></wui-icon-box>
      <wui-flex
        class="textContent"
        gap="xs"
        flexDirection="column"
        justifyContent="center"
        flexDirection="column"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100">No activity yet</wui-text>
        <wui-text variant="small-400" align="center" color="fg-200"
          >Your next transactions will appear here</wui-text
        >
      </wui-flex>
      <wui-link @click=${this.onReceiveClick.bind(this)}>Trade</wui-link>
    </wui-flex>`}templateEmpty(){return"account"===this.page?s.dy`${this.emptyStateAccount()}`:s.dy`${this.emptyStateActivity()}`}templateLoading(){return"activity"===this.page?Array(7).fill(s.dy` <wui-transaction-list-item-loader></wui-transaction-list-item-loader> `).map(t=>t):null}onReceiveClick(){B.RouterController.push("WalletReceive")}createPaginationObserver(){const t=y.R.state.activeChain,{projectId:e}=j.OptionsController.state;this.paginationObserver=new IntersectionObserver(([o])=>{o?.isIntersecting&&!this.loading&&(d.s.fetchTransactions($.j.getPlainAddress(this.caipAddress)),T.X.sendEvent({type:"track",event:"LOAD_MORE_TRANSACTIONS",properties:{address:$.j.getPlainAddress(this.caipAddress),projectId:e,cursor:this.next,isSmartAccount:L.AccountController.state.preferredAccountTypes?.[t]===E.y_.ACCOUNT_TYPES.SMART_ACCOUNT}}))},{}),this.setPaginationObserver()}setPaginationObserver(){this.paginationObserver?.disconnect();const t=this.shadowRoot?.querySelector(`#${b}`);t&&this.paginationObserver?.observe(t)}getTransactionListItemProps(t){const e=S.E.formatDate(t?.metadata?.minedAt),o=v.AI.getTransactionDescriptions(t),n=t?.transfers,i=t?.transfers?.[0],a=!!i&&t?.transfers?.every(f=>!!f.nft_info),u=v.AI.getTransactionImages(n);return{date:e,direction:i?.direction,descriptions:o,isAllNFT:a,images:u,status:t.metadata?.status,transfers:n,type:t.metadata?.operationType}}};m.styles=W,x([(0,c.Cb)()],m.prototype,"page",void 0),x([(0,c.SB)()],m.prototype,"caipAddress",void 0),x([(0,c.SB)()],m.prototype,"transactionsByYear",void 0),x([(0,c.SB)()],m.prototype,"loading",void 0),x([(0,c.SB)()],m.prototype,"empty",void 0),x([(0,c.SB)()],m.prototype,"next",void 0),m=x([(0,v.Mo)("w3m-activity-list")],m)}}]);