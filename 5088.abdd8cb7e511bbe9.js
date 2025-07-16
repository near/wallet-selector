"use strict";(self.webpackChunkangular=self.webpackChunkangular||[]).push([[5088],{82335:(U,T,n)=>{n.r(T),n.d(T,{W3mPayLoadingView:()=>z,W3mPayView:()=>L,baseETH:()=>ke,baseSepoliaETH:()=>Ue,baseUSDC:()=>Oe,getExchanges:()=>_e,getIsPaymentInProgress:()=>Re,getPayError:()=>Se,getPayResult:()=>Te,openPay:()=>Ne});var i=n(49671),o=n(59799),N=n(86523),S=n(23107),_=n(22917),x=n(20597),v=n(57745),h=n(18445),w=n(76169),u=n(10053),g=n(50860),re=(n(99409),n(937),n(51078),n(73527),n(11539),n(15465),n(72111),n(30189),n(32714),n(3715),n(54575),n(88078),n(24688)),le=n(99071),V=n(23116),G=n(86450),W=n(79282),oe=n(24380),Y=n(23592);const f={INVALID_PAYMENT_CONFIG:"INVALID_PAYMENT_CONFIG",INVALID_RECIPIENT:"INVALID_RECIPIENT",INVALID_ASSET:"INVALID_ASSET",INVALID_AMOUNT:"INVALID_AMOUNT",UNKNOWN_ERROR:"UNKNOWN_ERROR",UNABLE_TO_INITIATE_PAYMENT:"UNABLE_TO_INITIATE_PAYMENT",INVALID_CHAIN_NAMESPACE:"INVALID_CHAIN_NAMESPACE",GENERIC_PAYMENT_ERROR:"GENERIC_PAYMENT_ERROR",UNABLE_TO_GET_EXCHANGES:"UNABLE_TO_GET_EXCHANGES",ASSET_NOT_SUPPORTED:"ASSET_NOT_SUPPORTED",UNABLE_TO_GET_PAY_URL:"UNABLE_TO_GET_PAY_URL",UNABLE_TO_GET_BUY_STATUS:"UNABLE_TO_GET_BUY_STATUS"},M={[f.INVALID_PAYMENT_CONFIG]:"Invalid payment configuration",[f.INVALID_RECIPIENT]:"Invalid recipient address",[f.INVALID_ASSET]:"Invalid asset specified",[f.INVALID_AMOUNT]:"Invalid payment amount",[f.UNKNOWN_ERROR]:"Unknown payment error occurred",[f.UNABLE_TO_INITIATE_PAYMENT]:"Unable to initiate payment",[f.INVALID_CHAIN_NAMESPACE]:"Invalid chain namespace",[f.GENERIC_PAYMENT_ERROR]:"Unable to process payment",[f.UNABLE_TO_GET_EXCHANGES]:"Unable to get exchanges",[f.ASSET_NOT_SUPPORTED]:"Asset not supported by the selected exchange",[f.UNABLE_TO_GET_PAY_URL]:"Unable to get payment URL",[f.UNABLE_TO_GET_BUY_STATUS]:"Unable to get buy status"};class b extends Error{get message(){return M[this.code]}constructor(e,r){super(M[e]),this.name="AppKitPayError",this.code=e,this.details=r,Error.captureStackTrace&&Error.captureStackTrace(this,b)}}var ue=n(66301);const de="https://rpc.walletconnect.org/v1/json-rpc";class pe extends Error{}function H(t,e){return Z.apply(this,arguments)}function Z(){return(Z=(0,i.Z)(function*(t,e){const r=function he(){const t=ue.OptionsController.getSnapshot().projectId;return`${de}?projectId=${t}`}(),m=yield(yield fetch(r,{method:"POST",body:JSON.stringify({jsonrpc:"2.0",id:1,method:t,params:e}),headers:{"Content-Type":"application/json"}})).json();if(m.error)throw new pe(m.error.message);return m})).apply(this,arguments)}function ie(t){return F.apply(this,arguments)}function F(){return(F=(0,i.Z)(function*(t){return(yield H("reown_getExchanges",t)).result})).apply(this,arguments)}function K(){return(K=(0,i.Z)(function*(t){return(yield H("reown_getExchangePayUrl",t)).result})).apply(this,arguments)}function X(){return(X=(0,i.Z)(function*(t){return(yield H("reown_getExchangeBuyStatus",t)).result})).apply(this,arguments)}const me=["eip155"],ve={eip155:{native:{assetNamespace:"slip44",assetReference:"60"},defaultTokenNamespace:"erc20"},solana:{native:{assetNamespace:"slip44",assetReference:"501"},defaultTokenNamespace:"token"}};function J(t,e){const{chainNamespace:r,chainId:l}=V.u.parseCaipNetworkId(t),d=ve[r];if(!d)throw new Error(`Unsupported chain namespace for CAIP-19 formatting: ${r}`);let m=d.native.assetNamespace,A=d.native.assetReference;return"native"!==e&&(m=d.defaultTokenNamespace,A=e),`${r}:${l}/${m}:${A}`}var fe=n(56051);function Q(){return(Q=(0,i.Z)(function*(t){const{paymentAssetNetwork:e,activeCaipNetwork:r,approvedCaipNetworkIds:l,requestedCaipNetworks:d}=t,A=h.j.sortRequestedNetworks(l,d).find(ae=>ae.caipNetworkId===e);if(!A)throw new b(f.INVALID_PAYMENT_CONFIG);if(A.caipNetworkId===r.caipNetworkId)return;const R=x.R.getNetworkProp("supportsAllNetworks",A.chainNamespace);if(!l?.includes(A.caipNetworkId)&&!R)throw new b(f.INVALID_PAYMENT_CONFIG);try{yield x.R.switchActiveNetwork(A)}catch(ae){throw new b(f.GENERIC_PAYMENT_ERROR,ae)}})).apply(this,arguments)}function q(){return(q=(0,i.Z)(function*(t,e,r){if(e!==G.b.CHAIN.EVM)throw new b(f.INVALID_CHAIN_NAMESPACE);if(!r.fromAddress)throw new b(f.INVALID_PAYMENT_CONFIG,"fromAddress is required for native EVM payments.");const l="string"==typeof r.amount?parseFloat(r.amount):r.amount;if(isNaN(l))throw new b(f.INVALID_PAYMENT_CONFIG);const d=t.metadata?.decimals??18,m=u.ConnectionController.parseUnits(l.toString(),d);if("bigint"!=typeof m)throw new b(f.GENERIC_PAYMENT_ERROR);return(yield u.ConnectionController.sendTransaction({chainNamespace:e,to:r.recipient,address:r.fromAddress,value:m,data:"0x"}))??void 0})).apply(this,arguments)}function ee(){return(ee=(0,i.Z)(function*(t,e){if(!e.fromAddress)throw new b(f.INVALID_PAYMENT_CONFIG,"fromAddress is required for ERC20 EVM payments.");const r=t.asset,l=e.recipient,d=Number(t.metadata.decimals),m=u.ConnectionController.parseUnits(e.amount.toString(),d);if(void 0===m)throw new b(f.GENERIC_PAYMENT_ERROR);return(yield u.ConnectionController.writeContract({fromAddress:e.fromAddress,tokenAddress:r,args:[l,m],method:"transfer",abi:fe.g.getERC20Abi(r),chainNamespace:G.b.CHAIN.EVM}))??void 0})).apply(this,arguments)}const te="unknown",a=(0,re.sj)({paymentAsset:{network:"eip155:1",asset:"0x0",metadata:{name:"0x0",symbol:"0x0",decimals:0}},recipient:"0x0",amount:0,isConfigured:!1,error:null,isPaymentInProgress:!1,exchanges:[],isLoading:!1,openInNewTab:!0,redirectUrl:void 0,payWithExchange:void 0,currentPayment:void 0,analyticsSet:!1,paymentId:void 0}),P={state:a,subscribe:t=>(0,re.Ld)(a,()=>t(a)),subscribeKey:(t,e)=>(0,le.VW)(a,t,e),handleOpenPay(t){var e=this;return(0,i.Z)(function*(){e.resetState(),e.setPaymentConfig(t),e.subscribeEvents(),e.initializeAnalytics(),a.isConfigured=!0,W.X.sendEvent({type:"track",event:"PAY_MODAL_OPEN",properties:{exchanges:a.exchanges,configuration:{network:a.paymentAsset.network,asset:a.paymentAsset.asset,recipient:a.recipient,amount:a.amount}}}),yield v.I.open({view:"Pay"})})()},resetState(){a.paymentAsset={network:"eip155:1",asset:"0x0",metadata:{name:"0x0",symbol:"0x0",decimals:0}},a.recipient="0x0",a.amount=0,a.isConfigured=!1,a.error=null,a.isPaymentInProgress=!1,a.isLoading=!1,a.currentPayment=void 0},setPaymentConfig(t){if(!t.paymentAsset)throw new b(f.INVALID_PAYMENT_CONFIG);try{a.paymentAsset=t.paymentAsset,a.recipient=t.recipient,a.amount=t.amount,a.openInNewTab=t.openInNewTab??!0,a.redirectUrl=t.redirectUrl,a.payWithExchange=t.payWithExchange,a.error=null}catch(e){throw new b(f.INVALID_PAYMENT_CONFIG,e.message)}},getPaymentAsset:()=>a.paymentAsset,getExchanges:()=>a.exchanges,fetchExchanges:()=>(0,i.Z)(function*(){try{a.isLoading=!0;const t=yield ie({page:0,asset:J(a.paymentAsset.network,a.paymentAsset.asset),amount:a.amount.toString()});a.exchanges=t.exchanges.slice(0,2)}catch{throw w.SnackController.showError(M.UNABLE_TO_GET_EXCHANGES),new b(f.UNABLE_TO_GET_EXCHANGES)}finally{a.isLoading=!1}})(),getAvailableExchanges:t=>(0,i.Z)(function*(){try{const e=t?.asset&&t?.network?J(t.network,t.asset):void 0;return yield ie({page:t?.page??0,asset:e,amount:t?.amount?.toString()})}catch{throw new b(f.UNABLE_TO_GET_EXCHANGES)}})(),getPayUrl(t,e,r=!1){var l=this;return(0,i.Z)(function*(){try{const d=Number(e.amount),m=yield function ge(t){return K.apply(this,arguments)}({exchangeId:t,asset:J(e.network,e.asset),amount:d.toString(),recipient:`${e.network}:${e.recipient}`});return W.X.sendEvent({type:"track",event:"PAY_EXCHANGE_SELECTED",properties:{exchange:{id:t},configuration:{network:e.network,asset:e.asset,recipient:e.recipient,amount:d},currentPayment:{type:"exchange",exchangeId:t},headless:r}}),r&&(l.initiatePayment(),W.X.sendEvent({type:"track",event:"PAY_INITIATED",properties:{paymentId:a.paymentId||te,configuration:{network:e.network,asset:e.asset,recipient:e.recipient,amount:d},currentPayment:{type:"exchange",exchangeId:t}}})),m}catch(d){throw d instanceof Error&&d.message.includes("is not supported")?new b(f.ASSET_NOT_SUPPORTED):new Error(d.message)}})()},openPayUrl(t,e,r=!1){var l=this;return(0,i.Z)(function*(){try{const d=yield l.getPayUrl(t.exchangeId,e,r);if(!d)throw new b(f.UNABLE_TO_GET_PAY_URL);const A=t.openInNewTab??1?"_blank":"_self";return h.j.openHref(d.url,A),d}catch(d){throw a.error=d instanceof b?d.message:M.GENERIC_PAYMENT_ERROR,new b(f.UNABLE_TO_GET_PAY_URL)}})()},subscribeEvents(){var t=this;a.isConfigured||(Y.h.subscribeProviders(function(){var e=(0,i.Z)(function*(r){const l=x.R.state.activeChain;Y.h.getProvider(l)&&(yield t.handlePayment())});return function(r){return e.apply(this,arguments)}}()),_.AccountController.subscribeKey("caipAddress",function(){var e=(0,i.Z)(function*(r){r&&(yield t.handlePayment())});return function(r){return e.apply(this,arguments)}}()))},handlePayment(){var t=this;return(0,i.Z)(function*(){a.currentPayment={type:"wallet",status:"IN_PROGRESS"};const e=_.AccountController.state.caipAddress;if(!e)return;const{chainId:r,address:l}=V.u.parseCaipAddress(e),d=x.R.state.activeChain;if(!(l&&r&&d&&Y.h.getProvider(d)))return;const A=x.R.state.activeCaipNetwork;if(A&&!a.isPaymentInProgress)try{t.initiatePayment();const R=x.R.getAllRequestedCaipNetworks(),ce=x.R.getAllApprovedCaipNetworkIds();if(yield function be(t){return Q.apply(this,arguments)}({paymentAssetNetwork:a.paymentAsset.network,activeCaipNetwork:A,approvedCaipNetworkIds:ce,requestedCaipNetworks:R}),yield v.I.open({view:"PayLoading"}),d!==G.b.CHAIN.EVM)throw new b(f.INVALID_CHAIN_NAMESPACE);"native"===a.paymentAsset.asset&&(a.currentPayment.result=yield function xe(t,e,r){return q.apply(this,arguments)}(a.paymentAsset,d,{recipient:a.recipient,amount:a.amount,fromAddress:l})),a.paymentAsset.asset.startsWith("0x")&&(a.currentPayment.result=yield function Ee(t,e){return ee.apply(this,arguments)}(a.paymentAsset,{recipient:a.recipient,amount:a.amount,fromAddress:l})),a.currentPayment.status="SUCCESS"}catch(R){a.error=R instanceof b?R.message:M.GENERIC_PAYMENT_ERROR,a.currentPayment.status="FAILED",w.SnackController.showError(a.error)}finally{a.isPaymentInProgress=!1}})()},getExchangeById:t=>a.exchanges.find(e=>e.id===t),validatePayConfig(t){const{paymentAsset:e,recipient:r,amount:l}=t;if(!e)throw new b(f.INVALID_PAYMENT_CONFIG);if(!r)throw new b(f.INVALID_RECIPIENT);if(!e.asset)throw new b(f.INVALID_ASSET);if(null==l||l<=0)throw new b(f.INVALID_AMOUNT)},handlePayWithWallet(){const t=_.AccountController.state.caipAddress;if(!t)return void oe.RouterController.push("Connect");const{chainId:e,address:r}=V.u.parseCaipAddress(t),l=x.R.state.activeChain;r&&e&&l?this.handlePayment():oe.RouterController.push("Connect")},handlePayWithExchange(t){var e=this;return(0,i.Z)(function*(){try{a.currentPayment={type:"exchange",exchangeId:t};const{network:r,asset:l}=a.paymentAsset,d={network:r,asset:l,amount:a.amount,recipient:a.recipient},m=yield e.getPayUrl(t,d);if(!m)throw new b(f.UNABLE_TO_INITIATE_PAYMENT);return a.currentPayment.sessionId=m.sessionId,a.currentPayment.status="IN_PROGRESS",a.currentPayment.exchangeId=t,e.initiatePayment(),{url:m.url,openInNewTab:a.openInNewTab}}catch(r){return a.error=r instanceof b?r.message:M.GENERIC_PAYMENT_ERROR,a.isPaymentInProgress=!1,w.SnackController.showError(a.error),null}})()},getBuyStatus:(t,e)=>(0,i.Z)(function*(){try{const r=yield function we(t){return X.apply(this,arguments)}({sessionId:e,exchangeId:t});return("SUCCESS"===r.status||"FAILED"===r.status)&&W.X.sendEvent({type:"track",event:"SUCCESS"===r.status?"PAY_SUCCESS":"PAY_ERROR",properties:{paymentId:a.paymentId||te,configuration:{network:a.paymentAsset.network,asset:a.paymentAsset.asset,recipient:a.recipient,amount:a.amount},currentPayment:{type:"exchange",exchangeId:a.currentPayment?.exchangeId,sessionId:a.currentPayment?.sessionId,result:r.txHash}}}),r}catch{throw new b(f.UNABLE_TO_GET_BUY_STATUS)}})(),updateBuyStatus(t,e){var r=this;return(0,i.Z)(function*(){try{const l=yield r.getBuyStatus(t,e);a.currentPayment&&(a.currentPayment.status=l.status,a.currentPayment.result=l.txHash),("SUCCESS"===l.status||"FAILED"===l.status)&&(a.isPaymentInProgress=!1)}catch{throw new b(f.UNABLE_TO_GET_BUY_STATUS)}})()},initiatePayment(){a.isPaymentInProgress=!0,a.paymentId=crypto.randomUUID()},initializeAnalytics(){a.analyticsSet||(a.analyticsSet=!0,this.subscribeKey("isPaymentInProgress",t=>{if(a.currentPayment?.status&&"UNKNOWN"!==a.currentPayment.status){const e={IN_PROGRESS:"PAY_INITIATED",SUCCESS:"PAY_SUCCESS",FAILED:"PAY_ERROR"}[a.currentPayment.status];W.X.sendEvent({type:"track",event:e,properties:{paymentId:a.paymentId||te,configuration:{network:a.paymentAsset.network,asset:a.paymentAsset.asset,recipient:a.recipient,amount:a.amount},currentPayment:{type:a.currentPayment.type,exchangeId:a.currentPayment.exchangeId,sessionId:a.currentPayment.sessionId,result:a.currentPayment.result}}})}}))}},Ie=o.iv`
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }

  .token-display {
    padding: var(--wui-spacing-s) var(--wui-spacing-m);
    border-radius: var(--wui-border-radius-s);
    background-color: var(--wui-color-bg-125);
    margin-top: var(--wui-spacing-s);
    margin-bottom: var(--wui-spacing-s);
  }

  .token-display wui-text {
    text-transform: none;
  }

  wui-loading-spinner {
    padding: var(--wui-spacing-xs);
  }
`;var $=function(t,e,r,l){var A,d=arguments.length,m=d<3?e:null===l?l=Object.getOwnPropertyDescriptor(e,r):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)m=Reflect.decorate(t,e,r,l);else for(var R=t.length-1;R>=0;R--)(A=t[R])&&(m=(d<3?A(m):d>3?A(e,r,m):A(e,r))||m);return d>3&&m&&Object.defineProperty(e,r,m),m};let L=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.amount="",this.tokenSymbol="",this.networkName="",this.exchanges=P.state.exchanges,this.isLoading=P.state.isLoading,this.loadingExchangeId=null,this.connectedWalletInfo=_.AccountController.state.connectedWalletInfo,this.initializePaymentDetails(),this.unsubscribe.push(P.subscribeKey("exchanges",e=>this.exchanges=e)),this.unsubscribe.push(P.subscribeKey("isLoading",e=>this.isLoading=e)),this.unsubscribe.push(_.AccountController.subscribe(e=>this.connectedWalletInfo=e.connectedWalletInfo)),P.fetchExchanges()}get isWalletConnected(){return"connected"===_.AccountController.state.status}render(){return o.dy`
      <wui-flex flexDirection="column">
        <wui-flex flexDirection="column" .padding=${["0","l","l","l"]} gap="s">
          ${this.renderPaymentHeader()}

          <wui-flex flexDirection="column" gap="s">
            ${this.renderPayWithWallet()} ${this.renderExchangeOptions()}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}initializePaymentDetails(){const e=P.getPaymentAsset();this.networkName=e.network,this.tokenSymbol=e.metadata.symbol,this.amount=P.state.amount.toString()}renderPayWithWallet(){return function ye(t){const{chainNamespace:e}=V.u.parseCaipNetworkId(t);return me.includes(e)}(this.networkName)?o.dy`<wui-flex flexDirection="column" gap="s">
        ${this.isWalletConnected?this.renderConnectedView():this.renderDisconnectedView()}
      </wui-flex>
      <wui-separator text="or"></wui-separator>`:o.dy``}renderPaymentHeader(){let e=this.networkName;if(this.networkName){const l=x.R.getAllRequestedCaipNetworks().find(d=>d.caipNetworkId===this.networkName);l&&(e=l.name)}return o.dy`
      <wui-flex flexDirection="column" alignItems="center">
        <wui-flex alignItems="center" gap="xs">
          <wui-text variant="large-700" color="fg-100">${this.amount||"0.0000"}</wui-text>
          <wui-flex class="token-display" alignItems="center" gap="xxs">
            <wui-text variant="paragraph-600" color="fg-100">
              ${this.tokenSymbol||"Unknown Asset"}
            </wui-text>
            ${e?o.dy`
                  <wui-text variant="small-500" color="fg-200"> on ${e} </wui-text>
                `:""}
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}renderConnectedView(){const e=this.connectedWalletInfo?.name||"connected wallet";return o.dy`
      <wui-list-item
        @click=${this.onWalletPayment}
        ?chevron=${!0}
        data-testid="wallet-payment-option"
      >
        <wui-flex alignItems="center" gap="s">
          <wui-wallet-image
            size="sm"
            imageSrc=${(0,S.o)(this.connectedWalletInfo?.icon)}
            name=${(0,S.o)(this.connectedWalletInfo?.name)}
          ></wui-wallet-image>
          <wui-text variant="paragraph-500" color="inherit">Pay with ${e}</wui-text>
        </wui-flex>
      </wui-list-item>

      <wui-list-item
        variant="icon"
        iconVariant="overlay"
        icon="disconnect"
        @click=${this.onDisconnect}
        data-testid="disconnect-button"
        ?chevron=${!1}
      >
        <wui-text variant="paragraph-500" color="fg-200">Disconnect</wui-text>
      </wui-list-item>
    `}renderDisconnectedView(){return o.dy`<wui-list-item
      variant="icon"
      iconVariant="overlay"
      icon="walletPlaceholder"
      @click=${this.onWalletPayment}
      ?chevron=${!0}
      data-testid="wallet-payment-option"
    >
      <wui-text variant="paragraph-500" color="inherit">Pay from wallet</wui-text>
    </wui-list-item>`}renderExchangeOptions(){return this.isLoading?o.dy`<wui-flex justifyContent="center" alignItems="center">
        <wui-spinner size="md"></wui-spinner>
      </wui-flex>`:0===this.exchanges.length?o.dy`<wui-flex justifyContent="center" alignItems="center">
        <wui-text variant="paragraph-500" color="fg-100">No exchanges available</wui-text>
      </wui-flex>`:this.exchanges.map(e=>o.dy`
        <wui-list-item
          @click=${()=>this.onExchangePayment(e.id)}
          data-testid="exchange-option-${e.id}"
          ?chevron=${!0}
          ?disabled=${null!==this.loadingExchangeId}
        >
          <wui-flex alignItems="center" gap="s">
            ${this.loadingExchangeId===e.id?o.dy`<wui-loading-spinner color="accent-100" size="md"></wui-loading-spinner>`:o.dy`<wui-wallet-image
                  size="sm"
                  imageSrc=${(0,S.o)(e.imageUrl)}
                  name=${e.name}
                ></wui-wallet-image>`}
            <wui-text flexGrow="1" variant="paragraph-500" color="inherit"
              >Pay with ${e.name} <wui-spinner size="sm" color="fg-200"></wui-spinner
            ></wui-text>
          </wui-flex>
        </wui-list-item>
      `)}onWalletPayment(){P.handlePayWithWallet()}onExchangePayment(e){var r=this;return(0,i.Z)(function*(){try{r.loadingExchangeId=e;const l=yield P.handlePayWithExchange(e);l&&(yield v.I.open({view:"PayLoading"}),h.j.openHref(l.url,l.openInNewTab?"_blank":"_self"))}catch(l){console.error("Failed to pay with exchange",l),w.SnackController.showError("Failed to pay with exchange")}finally{r.loadingExchangeId=null}})()}onDisconnect(e){return(0,i.Z)(function*(){e.stopPropagation();try{yield u.ConnectionController.disconnect(),v.I.close()}catch{console.error("Failed to disconnect"),w.SnackController.showError("Failed to disconnect")}})()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}};L.styles=Ie,$([(0,N.SB)()],L.prototype,"amount",void 0),$([(0,N.SB)()],L.prototype,"tokenSymbol",void 0),$([(0,N.SB)()],L.prototype,"networkName",void 0),$([(0,N.SB)()],L.prototype,"exchanges",void 0),$([(0,N.SB)()],L.prototype,"isLoading",void 0),$([(0,N.SB)()],L.prototype,"loadingExchangeId",void 0),$([(0,N.SB)()],L.prototype,"connectedWalletInfo",void 0),L=$([(0,g.Mo)("w3m-pay-view")],L);var Ce=n(56364);n(44411);const Pe=o.iv`
  :host {
    display: block;
    height: 100%;
    width: 100%;
  }
`;var j=function(t,e,r,l){var A,d=arguments.length,m=d<3?e:null===l?l=Object.getOwnPropertyDescriptor(e,r):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)m=Reflect.decorate(t,e,r,l);else for(var R=t.length-1;R>=0;R--)(A=t[R])&&(m=(d<3?A(m):d>3?A(e,r,m):A(e,r))||m);return d>3&&m&&Object.defineProperty(e,r,m),m};let z=class extends o.oi{constructor(){super(),this.loadingMessage="",this.subMessage="",this.paymentState="in-progress",this.paymentState=P.state.isPaymentInProgress?"in-progress":"completed",this.updateMessages(),this.setupSubscription(),this.setupExchangeSubscription()}disconnectedCallback(){clearInterval(this.exchangeSubscription)}render(){return o.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center"> ${this.getStateIcon()} </wui-flex>
        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text align="center" variant="paragraph-500" color="fg-100">
            ${this.loadingMessage}
          </wui-text>
          <wui-text align="center" variant="small-400" color="fg-200">
            ${this.subMessage}
          </wui-text>
        </wui-flex>
      </wui-flex>
    `}updateMessages(){switch(this.paymentState){case"completed":this.loadingMessage="Payment completed",this.subMessage="Your transaction has been successfully processed";break;case"error":this.loadingMessage="Payment failed",this.subMessage="There was an error processing your transaction";break;default:"exchange"===P.state.currentPayment?.type?(this.loadingMessage="Payment initiated",this.subMessage="Please complete the payment on the exchange"):(this.loadingMessage="Awaiting payment confirmation",this.subMessage="Please confirm the payment transaction in your wallet")}}getStateIcon(){switch(this.paymentState){case"completed":return this.successTemplate();case"error":return this.errorTemplate();default:return this.loaderTemplate()}}setupExchangeSubscription(){var e=this;"exchange"===P.state.currentPayment?.type&&(this.exchangeSubscription=setInterval((0,i.Z)(function*(){const r=P.state.currentPayment?.exchangeId,l=P.state.currentPayment?.sessionId;r&&l&&(yield P.updateBuyStatus(r,l),"SUCCESS"===P.state.currentPayment?.status&&clearInterval(e.exchangeSubscription))}),4e3))}setupSubscription(){P.subscribeKey("isPaymentInProgress",e=>{!e&&"in-progress"===this.paymentState&&(P.state.error||!P.state.currentPayment?.result?this.paymentState="error":this.paymentState="completed",this.updateMessages(),setTimeout(()=>{"disconnected"!==u.ConnectionController.state.status&&v.I.close()},3e3))}),P.subscribeKey("error",e=>{e&&"in-progress"===this.paymentState&&(this.paymentState="error",this.updateMessages())})}loaderTemplate(){const e=Ce.ThemeController.state.themeVariables["--w3m-border-radius-master"],r=e?parseInt(e.replace("px",""),10):4;return o.dy`<wui-loading-thumbnail radius=${9*r}></wui-loading-thumbnail>`}successTemplate(){return o.dy`<wui-icon size="xl" color="success-100" name="checkmark"></wui-icon>`}errorTemplate(){return o.dy`<wui-icon size="xl" color="error-100" name="close"></wui-icon>`}};function Ne(t){return ne.apply(this,arguments)}function ne(){return(ne=(0,i.Z)(function*(t){return P.handleOpenPay(t)})).apply(this,arguments)}function _e(){return P.getExchanges()}function Te(){return P.state.currentPayment?.result}function Se(){return P.state.error}function Re(){return P.state.isPaymentInProgress}z.styles=Pe,j([(0,N.SB)()],z.prototype,"loadingMessage",void 0),j([(0,N.SB)()],z.prototype,"subMessage",void 0),j([(0,N.SB)()],z.prototype,"paymentState",void 0),z=j([(0,g.Mo)("w3m-pay-loading-view")],z);const ke={network:"eip155:8453",asset:"native",metadata:{name:"Ethereum",symbol:"ETH",decimals:18}},Oe={network:"eip155:8453",asset:"0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},Ue={network:"eip155:84532",asset:"native",metadata:{name:"Ethereum",symbol:"ETH",decimals:18}}},99409:(U,T,n)=>{n(45841)},51078:(U,T,n)=>{n(72686)},72111:(U,T,n)=>{var i=n(59799),o=n(86523),N=n(23107),w=(n(72686),n(11252),n(78549),n(10831),n(79348),n(25518)),u=n(70075);n(87538);const p=i.iv`
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
`;var s=function(y,E,I,C){var D,k=arguments.length,O=k<3?E:null===C?C=Object.getOwnPropertyDescriptor(E,I):C;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)O=Reflect.decorate(y,E,I,C);else for(var B=y.length-1;B>=0;B--)(D=y[B])&&(O=(k<3?D(O):k>3?D(E,I,O):D(E,I))||O);return k>3&&O&&Object.defineProperty(E,I,O),O};let c=class extends i.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.variant="icon",this.disabled=!1,this.imageSrc=void 0,this.alt=void 0,this.chevron=!1,this.loading=!1}render(){return i.dy`
      <button
        ?disabled=${!!this.loading||!!this.disabled}
        data-loading=${this.loading}
        data-iconvariant=${(0,N.o)(this.iconVariant)}
        tabindex=${(0,N.o)(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `}visualTemplate(){if("image"===this.variant&&this.imageSrc)return i.dy`<wui-image src=${this.imageSrc} alt=${this.alt??"list item"}></wui-image>`;if("square"===this.iconVariant&&this.icon&&"icon"===this.variant)return i.dy`<wui-icon name=${this.icon}></wui-icon>`;if("icon"===this.variant&&this.icon&&this.iconVariant){const E=["blue","square-blue"].includes(this.iconVariant)?"accent-100":"fg-200",I="square-blue"===this.iconVariant?"mdl":"md",C=this.iconSize?this.iconSize:I;return i.dy`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${C}
          background="transparent"
          iconColor=${E}
          backgroundColor=${E}
          size=${I}
        ></wui-icon-box>
      `}return null}loadingTemplate(){return this.loading?i.dy`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`:i.dy``}chevronTemplate(){return this.chevron?i.dy`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`:null}};c.styles=[w.ET,w.ZM,p],s([(0,o.Cb)()],c.prototype,"icon",void 0),s([(0,o.Cb)()],c.prototype,"iconSize",void 0),s([(0,o.Cb)()],c.prototype,"tabIdx",void 0),s([(0,o.Cb)()],c.prototype,"variant",void 0),s([(0,o.Cb)()],c.prototype,"iconVariant",void 0),s([(0,o.Cb)({type:Boolean})],c.prototype,"disabled",void 0),s([(0,o.Cb)()],c.prototype,"imageSrc",void 0),s([(0,o.Cb)()],c.prototype,"alt",void 0),s([(0,o.Cb)({type:Boolean})],c.prototype,"chevron",void 0),s([(0,o.Cb)({type:Boolean})],c.prototype,"loading",void 0),c=s([(0,u.M)("wui-list-item")],c)},30189:(U,T,n)=>{n(78549)},44411:(U,T,n)=>{var i=n(59799),o=n(86523),N=n(25518),S=n(70075);const _=i.iv`
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
`;var x=function(h,w,u,g){var c,p=arguments.length,s=p<3?w:null===g?g=Object.getOwnPropertyDescriptor(w,u):g;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(h,w,u,g);else for(var y=h.length-1;y>=0;y--)(c=h[y])&&(s=(p<3?c(s):p>3?c(w,u,s):c(w,u))||s);return p>3&&s&&Object.defineProperty(w,u,s),s};let v=class extends i.oi{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){const w=this.radius>50?50:this.radius,g=36-w,p=116+g,s=245+g,c=360+1.75*g;return i.dy`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${w}
          stroke-dasharray="${p} ${s}"
          stroke-dashoffset=${c}
        />
      </svg>
    `}};v.styles=[N.ET,_],x([(0,o.Cb)({type:Number})],v.prototype,"radius",void 0),v=x([(0,S.M)("wui-loading-thumbnail")],v)},88078:(U,T,n)=>{n(9958)},85359:(U,T,n)=>{n.d(T,{W:()=>o});const o=n(59799).YP`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`},11252:(U,T,n)=>{var i=n(59799),o=n(86523),N=n(25518),S=n(70075);const _=i.iv`
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
`;var x=function(h,w,u,g){var c,p=arguments.length,s=p<3?w:null===g?g=Object.getOwnPropertyDescriptor(w,u):g;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(h,w,u,g);else for(var y=h.length-1;y>=0;y--)(c=h[y])&&(s=(p<3?c(s):p>3?c(w,u,s):c(w,u))||s);return p>3&&s&&Object.defineProperty(w,u,s),s};let v=class extends i.oi{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`\n      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};\n      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};\n      `,i.dy`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};v.styles=[N.ET,N.Bp,_],x([(0,o.Cb)()],v.prototype,"src",void 0),x([(0,o.Cb)()],v.prototype,"alt",void 0),x([(0,o.Cb)()],v.prototype,"size",void 0),v=x([(0,S.M)("wui-image")],v)},78549:(U,T,n)=>{var i=n(59799),o=n(86523),N=n(25518),S=n(70075);const _=i.iv`
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
`;var x=function(h,w,u,g){var c,p=arguments.length,s=p<3?w:null===g?g=Object.getOwnPropertyDescriptor(w,u):g;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(h,w,u,g);else for(var y=h.length-1;y>=0;y--)(c=h[y])&&(s=(p<3?c(s):p>3?c(w,u,s):c(w,u))||s);return p>3&&s&&Object.defineProperty(w,u,s),s};let v=class extends i.oi{constructor(){super(...arguments),this.color="accent-100",this.size="lg"}render(){return this.style.cssText="--local-color: "+("inherit"===this.color?"inherit":`var(--wui-color-${this.color})`),this.dataset.size=this.size,i.dy`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`}};v.styles=[N.ET,_],x([(0,o.Cb)()],v.prototype,"color",void 0),x([(0,o.Cb)()],v.prototype,"size",void 0),v=x([(0,S.M)("wui-loading-spinner")],v)},45841:(U,T,n)=>{var i=n(59799),o=n(86523),_=(n(78549),n(10831),n(25518)),x=n(70075);const v=i.iv`
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
`;var h=function(s,c,y,E){var k,I=arguments.length,C=I<3?c:null===E?E=Object.getOwnPropertyDescriptor(c,y):E;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)C=Reflect.decorate(s,c,y,E);else for(var O=s.length-1;O>=0;O--)(k=s[O])&&(C=(I<3?k(C):I>3?k(c,y,C):k(c,y))||C);return I>3&&C&&Object.defineProperty(c,y,C),C};const w={main:"inverse-100",inverse:"inverse-000",accent:"accent-100","accent-error":"error-100","accent-success":"success-100",neutral:"fg-100",disabled:"gray-glass-020"},u={lg:"paragraph-600",md:"small-600"},g={lg:"md",md:"md"};let p=class extends i.oi{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="main",this.hasIconLeft=!1,this.hasIconRight=!1,this.borderRadius="m"}render(){this.style.cssText=`\n    --local-width: ${this.fullWidth?"100%":"auto"};\n    --local-opacity-100: ${this.loading?0:1};\n    --local-opacity-000: ${this.loading?1:0};\n    --local-border-radius: var(--wui-border-radius-${this.borderRadius});\n    `;const c=this.textVariant??u[this.size];return i.dy`
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${()=>this.handleSlotLeftChange()}></slot>
        <wui-text variant=${c} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${()=>this.handleSlotRightChange()}></slot>
      </button>
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){if(this.loading){const c=g[this.size],y=this.disabled?w.disabled:w[this.variant];return i.dy`<wui-loading-spinner color=${y} size=${c}></wui-loading-spinner>`}return i.dy``}};p.styles=[_.ET,_.ZM,v],h([(0,o.Cb)()],p.prototype,"size",void 0),h([(0,o.Cb)({type:Boolean})],p.prototype,"disabled",void 0),h([(0,o.Cb)({type:Boolean})],p.prototype,"fullWidth",void 0),h([(0,o.Cb)({type:Boolean})],p.prototype,"loading",void 0),h([(0,o.Cb)()],p.prototype,"variant",void 0),h([(0,o.Cb)({type:Boolean})],p.prototype,"hasIconLeft",void 0),h([(0,o.Cb)({type:Boolean})],p.prototype,"hasIconRight",void 0),h([(0,o.Cb)()],p.prototype,"borderRadius",void 0),h([(0,o.Cb)()],p.prototype,"textVariant",void 0),p=h([(0,x.M)("wui-button")],p)},87538:(U,T,n)=>{var i=n(59799),o=n(86523),S=(n(72686),n(25518)),_=n(70075);const x=i.iv`
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
`;var v=function(w,u,g,p){var y,s=arguments.length,c=s<3?u:null===p?p=Object.getOwnPropertyDescriptor(u,g):p;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(w,u,g,p);else for(var E=w.length-1;E>=0;E--)(y=w[E])&&(c=(s<3?y(c):s>3?y(u,g,c):y(u,g))||c);return s>3&&c&&Object.defineProperty(u,g,c),c};let h=class extends i.oi{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){const u=this.iconSize||this.size,g="lg"===this.size,p="xl"===this.size,s=g?"12%":"16%",c=g?"xxs":p?"s":"3xl",y="gray"===this.background,E="opaque"===this.background,I="accent-100"===this.backgroundColor&&E||"success-100"===this.backgroundColor&&E||"error-100"===this.backgroundColor&&E||"inverse-100"===this.backgroundColor&&E;let C=`var(--wui-color-${this.backgroundColor})`;return I?C=`var(--wui-icon-box-bg-${this.backgroundColor})`:y&&(C=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`\n       --local-bg-value: ${C};\n       --local-bg-mix: ${I||y?"100%":s};\n       --local-border-radius: var(--wui-border-radius-${c});\n       --local-size: var(--wui-icon-box-size-${this.size});\n       --local-border: ${"wui-color-bg-125"===this.borderColor?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}\n   `,i.dy` <wui-icon color=${this.iconColor} size=${u} name=${this.icon}></wui-icon> `}};h.styles=[S.ET,S.ZM,x],v([(0,o.Cb)()],h.prototype,"size",void 0),v([(0,o.Cb)()],h.prototype,"backgroundColor",void 0),v([(0,o.Cb)()],h.prototype,"iconColor",void 0),v([(0,o.Cb)()],h.prototype,"iconSize",void 0),v([(0,o.Cb)()],h.prototype,"background",void 0),v([(0,o.Cb)({type:Boolean})],h.prototype,"border",void 0),v([(0,o.Cb)()],h.prototype,"borderColor",void 0),v([(0,o.Cb)()],h.prototype,"icon",void 0),h=v([(0,_.M)("wui-icon-box")],h)},9958:(U,T,n)=>{var i=n(59799),o=n(86523),x=(n(72686),n(11252),n(79348),n(25518)),v=n(70075);n(87538);const w=i.iv`
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
`;var u=function(p,s,c,y){var C,E=arguments.length,I=E<3?s:null===y?y=Object.getOwnPropertyDescriptor(s,c):y;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)I=Reflect.decorate(p,s,c,y);else for(var k=p.length-1;k>=0;k--)(C=p[k])&&(I=(E<3?C(I):E>3?C(s,c,I):C(s,c))||I);return E>3&&I&&Object.defineProperty(s,c,I),I};let g=class extends i.oi{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let s="xxs";return s="lg"===this.size?"m":"md"===this.size?"xs":"xxs",this.style.cssText=`\n       --local-border-radius: var(--wui-border-radius-${s});\n       --local-size: var(--wui-wallet-image-size-${this.size});\n   `,this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),i.dy`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?i.dy`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?i.dy`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`:i.dy`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};g.styles=[x.ZM,x.ET,w],u([(0,o.Cb)()],g.prototype,"size",void 0),u([(0,o.Cb)()],g.prototype,"name",void 0),u([(0,o.Cb)()],g.prototype,"imageSrc",void 0),u([(0,o.Cb)()],g.prototype,"walletIcon",void 0),u([(0,o.Cb)({type:Boolean})],g.prototype,"installed",void 0),u([(0,o.Cb)()],g.prototype,"badgeSize",void 0),g=u([(0,v.M)("wui-wallet-image")],g)}}]);