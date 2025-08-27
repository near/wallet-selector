"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3265],{93265:function(t,e,i){var r,a,o=i(44920),s=i(30077),n=i(82493),c=i(2706),l=i(36715),u=i(23704),p=i(77405),d=i(556),h=i(86126),g=i(40458),w=i(93907);i(52042),i(2065),i(42255),i(93595);var y=i(52608);i(85724),i(99671),i(55802);var x=i(17770);(r=a||(a={})).approve="approved",r.bought="bought",r.borrow="borrowed",r.burn="burnt",r.cancel="canceled",r.claim="claimed",r.deploy="deployed",r.deposit="deposited",r.execute="executed",r.mint="minted",r.receive="received",r.repay="repaid",r.send="sent",r.sell="sold",r.stake="staked",r.trade="swapped",r.unstake="unstaked",r.withdraw="withdrawn";var m=i(66501);i(50992),i(42559);var f=o.iv`
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
`,b=function(t,e,i,r){var a,o=arguments.length,s=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,r);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(s=(o<3?a(s):o>3?a(e,i,s):a(e,i))||s);return o>3&&s&&Object.defineProperty(e,i,s),s};let v=class extends o.oi{constructor(){super(...arguments),this.images=[],this.secondImage={type:void 0,url:""}}render(){let[t,e]=this.images,i=t?.type==="NFT",r=e?.url?"NFT"===e.type:i;return this.style.cssText=`
    --local-left-border-radius: ${i?"var(--wui-border-radius-xxs)":"var(--wui-border-radius-s)"};
    --local-right-border-radius: ${r?"var(--wui-border-radius-xxs)":"var(--wui-border-radius-s)"};
    `,o.dy`<wui-flex> ${this.templateVisual()} ${this.templateIcon()} </wui-flex>`}templateVisual(){let[t,e]=this.images,i=t?.type,r=2===this.images.length;return r&&(t?.url||e?.url)?o.dy`<div class="swap-images-container">
        ${t?.url?o.dy`<wui-image src=${t.url} alt="Transaction image"></wui-image>`:null}
        ${e?.url?o.dy`<wui-image src=${e.url} alt="Transaction image"></wui-image>`:null}
      </div>`:t?.url?o.dy`<wui-image src=${t.url} alt="Transaction image"></wui-image>`:"NFT"===i?o.dy`<wui-icon size="inherit" color="fg-200" name="nftPlaceholder"></wui-icon>`:o.dy`<wui-icon size="inherit" color="fg-200" name="coinPlaceholder"></wui-icon>`}templateIcon(){let t,e="accent-100";return(t=this.getIcon(),this.status&&(e=this.getStatusColor()),t)?o.dy`
      <wui-icon-box
        size="xxs"
        iconColor=${e}
        backgroundColor=${e}
        background="opaque"
        icon=${t}
        ?border=${!0}
        borderColor="wui-color-bg-125"
      ></wui-icon-box>
    `:null}getDirectionIcon(){switch(this.direction){case"in":return"arrowBottom";case"out":return"arrowTop";default:return}}getIcon(){return this.onlyDirectionIcon?this.getDirectionIcon():"trade"===this.type?"swapHorizontalBold":"approve"===this.type?"checkmark":"cancel"===this.type?"close":this.getDirectionIcon()}getStatusColor(){switch(this.status){case"confirmed":return"success-100";case"failed":return"error-100";case"pending":return"inverse-100";default:return"accent-100"}}};v.styles=[f],b([(0,s.Cb)()],v.prototype,"type",void 0),b([(0,s.Cb)()],v.prototype,"status",void 0),b([(0,s.Cb)()],v.prototype,"direction",void 0),b([(0,s.Cb)({type:Boolean})],v.prototype,"onlyDirectionIcon",void 0),b([(0,s.Cb)({type:Array})],v.prototype,"images",void 0),b([(0,s.Cb)({type:Object})],v.prototype,"secondImage",void 0),v=b([(0,m.M)("wui-transaction-visual")],v);var $=o.iv`
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
`,C=function(t,e,i,r){var a,o=arguments.length,s=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,r);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(s=(o<3?a(s):o>3?a(e,i,s):a(e,i))||s);return o>3&&s&&Object.defineProperty(e,i,s),s};let T=class extends o.oi{constructor(){super(...arguments),this.type="approve",this.onlyDirectionIcon=!1,this.images=[],this.price=[],this.amount=[],this.symbol=[]}render(){return o.dy`
      <wui-flex>
        <wui-transaction-visual
          .status=${this.status}
          direction=${(0,y.o)(this.direction)}
          type=${this.type}
          onlyDirectionIcon=${(0,y.o)(this.onlyDirectionIcon)}
          .images=${this.images}
        ></wui-transaction-visual>
        <wui-flex flexDirection="column" gap="3xs">
          <wui-text variant="paragraph-600" color="fg-100">
            ${a[this.type]||this.type}
          </wui-text>
          <wui-flex class="description-container">
            ${this.templateDescription()} ${this.templateSecondDescription()}
          </wui-flex>
        </wui-flex>
        <wui-text variant="micro-700" color="fg-300"><span>${this.date}</span></wui-text>
      </wui-flex>
    `}templateDescription(){let t=this.descriptions?.[0];return t?o.dy`
          <wui-text variant="small-500" color="fg-200">
            <span>${t}</span>
          </wui-text>
        `:null}templateSecondDescription(){let t=this.descriptions?.[1];return t?o.dy`
          <wui-icon class="description-separator-icon" size="xxs" name="arrowRight"></wui-icon>
          <wui-text variant="small-400" color="fg-200">
            <span>${t}</span>
          </wui-text>
        `:null}};T.styles=[x.ET,$],C([(0,s.Cb)()],T.prototype,"type",void 0),C([(0,s.Cb)({type:Array})],T.prototype,"descriptions",void 0),C([(0,s.Cb)()],T.prototype,"date",void 0),C([(0,s.Cb)({type:Boolean})],T.prototype,"onlyDirectionIcon",void 0),C([(0,s.Cb)()],T.prototype,"status",void 0),C([(0,s.Cb)()],T.prototype,"direction",void 0),C([(0,s.Cb)({type:Array})],T.prototype,"images",void 0),C([(0,s.Cb)({type:Array})],T.prototype,"price",void 0),C([(0,s.Cb)({type:Array})],T.prototype,"amount",void 0),C([(0,s.Cb)({type:Array})],T.prototype,"symbol",void 0),T=C([(0,m.M)("wui-transaction-list-item")],T),i(94192);var k=o.iv`
  :host > wui-flex:first-child {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
  }

  wui-flex {
    display: flex;
    flex: 1;
  }
`;let A=class extends o.oi{render(){return o.dy`
      <wui-flex alignItems="center">
        <wui-shimmer width="40px" height="40px"></wui-shimmer>
        <wui-flex flexDirection="column" gap="2xs">
          <wui-shimmer width="72px" height="16px" borderRadius="4xs"></wui-shimmer>
          <wui-shimmer width="148px" height="14px" borderRadius="4xs"></wui-shimmer>
        </wui-flex>
        <wui-shimmer width="24px" height="12px" borderRadius="5xs"></wui-shimmer>
      </wui-flex>
    `}};A.styles=[x.ET,k],A=function(t,e,i,r){var a,o=arguments.length,s=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,r);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(s=(o<3?a(s):o>3?a(e,i,s):a(e,i))||s);return o>3&&s&&Object.defineProperty(e,i,s),s}([(0,m.M)("wui-transaction-list-item-loader")],A);var R=i(89499),D=o.iv`
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
`,I=function(t,e,i,r){var a,o=arguments.length,s=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,r);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(s=(o<3?a(s):o>3?a(e,i,s):a(e,i))||s);return o>3&&s&&Object.defineProperty(e,i,s),s};let O="last-transaction",j=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.page="activity",this.caipAddress=c.R.state.activeCaipAddress,this.transactionsByYear=l.s.state.transactionsByYear,this.loading=l.s.state.loading,this.empty=l.s.state.empty,this.next=l.s.state.next,l.s.clearCursor(),this.unsubscribe.push(...[c.R.subscribeKey("activeCaipAddress",t=>{t&&this.caipAddress!==t&&(l.s.resetTransactions(),l.s.fetchTransactions(t)),this.caipAddress=t}),c.R.subscribeKey("activeCaipNetwork",()=>{this.updateTransactionView()}),l.s.subscribe(t=>{this.transactionsByYear=t.transactionsByYear,this.loading=t.loading,this.empty=t.empty,this.next=t.next})])}firstUpdated(){this.updateTransactionView(),this.createPaginationObserver()}updated(){this.setPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){return o.dy` ${this.empty?null:this.templateTransactionsByYear()}
    ${this.loading?this.templateLoading():null}
    ${!this.loading&&this.empty?this.templateEmpty():null}`}updateTransactionView(){l.s.resetTransactions(),this.caipAddress&&l.s.fetchTransactions(u.j.getPlainAddress(this.caipAddress))}templateTransactionsByYear(){let t=Object.keys(this.transactionsByYear).sort().reverse();return t.map(t=>{let e=parseInt(t,10),i=Array(12).fill(null).map((t,i)=>{let r=w.AI.getTransactionGroupTitle(e,i),a=this.transactionsByYear[e]?.[i];return{groupTitle:r,transactions:a}}).filter(({transactions:t})=>t).reverse();return i.map(({groupTitle:t,transactions:e},r)=>{let a=r===i.length-1;return e?o.dy`
          <wui-flex
            flexDirection="column"
            class="group-container"
            last-group="${a?"true":"false"}"
            data-testid="month-indexes"
          >
            <wui-flex
              alignItems="center"
              flexDirection="row"
              .padding=${["xs","s","s","s"]}
            >
              <wui-text variant="paragraph-500" color="fg-200" data-testid="group-title"
                >${t}</wui-text
              >
            </wui-flex>
            <wui-flex flexDirection="column" gap="xs">
              ${this.templateTransactions(e,a)}
            </wui-flex>
          </wui-flex>
        `:null})})}templateRenderTransaction(t,e){let{date:i,descriptions:r,direction:a,isAllNFT:s,images:n,status:c,transfers:l,type:u}=this.getTransactionListItemProps(t),p=l?.length>1,d=l?.length===2;return d&&!s?o.dy`
        <wui-transaction-list-item
          date=${i}
          .direction=${a}
          id=${e&&this.next?O:""}
          status=${c}
          type=${u}
          .images=${n}
          .descriptions=${r}
        ></wui-transaction-list-item>
      `:p?l.map((t,r)=>{let a=w.AI.getTransferDescription(t),s=e&&r===l.length-1;return o.dy` <wui-transaction-list-item
          date=${i}
          direction=${t.direction}
          id=${s&&this.next?O:""}
          status=${c}
          type=${u}
          .onlyDirectionIcon=${!0}
          .images=${[n[r]]}
          .descriptions=${[a]}
        ></wui-transaction-list-item>`}):o.dy`
      <wui-transaction-list-item
        date=${i}
        .direction=${a}
        id=${e&&this.next?O:""}
        status=${c}
        type=${u}
        .images=${n}
        .descriptions=${r}
      ></wui-transaction-list-item>
    `}templateTransactions(t,e){return t.map((i,r)=>{let a=e&&r===t.length-1;return o.dy`${this.templateRenderTransaction(i,a)}`})}emptyStateActivity(){return o.dy`<wui-flex
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
    </wui-flex>`}emptyStateAccount(){return o.dy`<wui-flex
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
    </wui-flex>`}templateEmpty(){return"account"===this.page?o.dy`${this.emptyStateAccount()}`:o.dy`${this.emptyStateActivity()}`}templateLoading(){return"activity"===this.page?Array(7).fill(o.dy` <wui-transaction-list-item-loader></wui-transaction-list-item-loader> `).map(t=>t):null}onReceiveClick(){p.P.push("WalletReceive")}createPaginationObserver(){let{projectId:t}=d.h.state;this.paginationObserver=new IntersectionObserver(([e])=>{e?.isIntersecting&&!this.loading&&(l.s.fetchTransactions(u.j.getPlainAddress(this.caipAddress)),h.X.sendEvent({type:"track",event:"LOAD_MORE_TRANSACTIONS",properties:{address:u.j.getPlainAddress(this.caipAddress),projectId:t,cursor:this.next,isSmartAccount:(0,g.r9)(c.R.state.activeChain)===R.y_.ACCOUNT_TYPES.SMART_ACCOUNT}}))},{}),this.setPaginationObserver()}setPaginationObserver(){this.paginationObserver?.disconnect();let t=this.shadowRoot?.querySelector(`#${O}`);t&&this.paginationObserver?.observe(t)}getTransactionListItemProps(t){let e=n.E.formatDate(t?.metadata?.minedAt),i=w.AI.getTransactionDescriptions(t),r=t?.transfers,a=t?.transfers?.[0],o=!!a&&t?.transfers?.every(t=>!!t.nft_info),s=w.AI.getTransactionImages(r);return{date:e,direction:a?.direction,descriptions:i,isAllNFT:o,images:s,status:t.metadata?.status,transfers:r,type:t.metadata?.operationType}}};j.styles=D,I([(0,s.Cb)()],j.prototype,"page",void 0),I([(0,s.SB)()],j.prototype,"caipAddress",void 0),I([(0,s.SB)()],j.prototype,"transactionsByYear",void 0),I([(0,s.SB)()],j.prototype,"loading",void 0),I([(0,s.SB)()],j.prototype,"empty",void 0),I([(0,s.SB)()],j.prototype,"next",void 0),j=I([(0,w.Mo)("w3m-activity-list")],j)},94192:function(t,e,i){var r=i(44920),a=i(30077),o=i(66501),s=r.iv`
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
`,n=function(t,e,i,r){var a,o=arguments.length,s=o<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,r);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(s=(o<3?a(s):o>3?a(e,i,s):a(e,i))||s);return o>3&&s&&Object.defineProperty(e,i,s),s};let c=class extends r.oi{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m",this.variant="default"}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
      border-radius: clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px);
    `,r.dy`<slot></slot>`}};c.styles=[s],n([(0,a.Cb)()],c.prototype,"width",void 0),n([(0,a.Cb)()],c.prototype,"height",void 0),n([(0,a.Cb)()],c.prototype,"borderRadius",void 0),n([(0,a.Cb)()],c.prototype,"variant",void 0),c=n([(0,o.M)("wui-shimmer")],c)}}]);