(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9324],{812:function(t,e,i){let o=i(15264),r=i(25506),n=i(22741),a=i(92248);function s(t,e,i,n,a){let s=[].slice.call(arguments,1),l=s.length,c="function"==typeof s[l-1];if(!c&&!o())throw Error("Callback required as last argument");if(c){if(l<2)throw Error("Too few arguments provided");2===l?(a=i,i=e,e=n=void 0):3===l&&(e.getContext&&void 0===a?(a=n,n=void 0):(a=n,n=i,i=e,e=void 0))}else{if(l<1)throw Error("Too few arguments provided");return 1===l?(i=e,e=n=void 0):2!==l||e.getContext||(n=i,i=e,e=void 0),new Promise(function(o,a){try{let a=r.create(i,n);o(t(a,e,n))}catch(t){a(t)}})}try{let o=r.create(i,n);a(null,t(o,e,n))}catch(t){a(t)}}e.create=r.create,e.toCanvas=s.bind(null,n.render),e.toDataURL=s.bind(null,n.renderToDataURL),e.toString=s.bind(null,function(t,e,i){return a.render(t,i)})},15264:function(t){t.exports=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then}},14495:function(t,e,i){let o=i(60452).getSymbolSize;e.getRowColCoords=function(t){if(1===t)return[];let e=Math.floor(t/7)+2,i=o(t),r=145===i?26:2*Math.ceil((i-13)/(2*e-2)),n=[i-7];for(let t=1;t<e-1;t++)n[t]=n[t-1]-r;return n.push(6),n.reverse()},e.getPositions=function(t){let i=[],o=e.getRowColCoords(t),r=o.length;for(let t=0;t<r;t++)for(let e=0;e<r;e++)(0!==t||0!==e)&&(0!==t||e!==r-1)&&(t!==r-1||0!==e)&&i.push([o[t],o[e]]);return i}},43094:function(t,e,i){let o=i(33805),r=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function n(t){this.mode=o.ALPHANUMERIC,this.data=t}n.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(t){let e;for(e=0;e+2<=this.data.length;e+=2){let i=45*r.indexOf(this.data[e]);i+=r.indexOf(this.data[e+1]),t.put(i,11)}this.data.length%2&&t.put(r.indexOf(this.data[e]),6)},t.exports=n},54947:function(t){function e(){this.buffer=[],this.length=0}e.prototype={get:function(t){return(this.buffer[Math.floor(t/8)]>>>7-t%8&1)==1},put:function(t,e){for(let i=0;i<e;i++)this.putBit((t>>>e-i-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(t){let e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},t.exports=e},76696:function(t){function e(t){if(!t||t<1)throw Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}e.prototype.set=function(t,e,i,o){let r=t*this.size+e;this.data[r]=i,o&&(this.reservedBit[r]=!0)},e.prototype.get=function(t,e){return this.data[t*this.size+e]},e.prototype.xor=function(t,e,i){this.data[t*this.size+e]^=i},e.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]},t.exports=e},51433:function(t,e,i){let o=i(35599),r=i(33805);function n(t){this.mode=r.BYTE,"string"==typeof t&&(t=o(t)),this.data=new Uint8Array(t)}n.getBitsLength=function(t){return 8*t},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(t){for(let e=0,i=this.data.length;e<i;e++)t.put(this.data[e],8)},t.exports=n},13691:function(t,e,i){let o=i(49383),r=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],n=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];e.getBlocksCount=function(t,e){switch(e){case o.L:return r[(t-1)*4+0];case o.M:return r[(t-1)*4+1];case o.Q:return r[(t-1)*4+2];case o.H:return r[(t-1)*4+3];default:return}},e.getTotalCodewordsCount=function(t,e){switch(e){case o.L:return n[(t-1)*4+0];case o.M:return n[(t-1)*4+1];case o.Q:return n[(t-1)*4+2];case o.H:return n[(t-1)*4+3];default:return}}},49383:function(t,e){e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2},e.isValid=function(t){return t&&void 0!==t.bit&&t.bit>=0&&t.bit<4},e.from=function(t,i){if(e.isValid(t))return t;try{return function(t){if("string"!=typeof t)throw Error("Param is not a string");let i=t.toLowerCase();switch(i){case"l":case"low":return e.L;case"m":case"medium":return e.M;case"q":case"quartile":return e.Q;case"h":case"high":return e.H;default:throw Error("Unknown EC Level: "+t)}}(t)}catch(t){return i}}},13627:function(t,e,i){let o=i(60452).getSymbolSize;e.getPositions=function(t){let e=o(t);return[[0,0],[e-7,0],[0,e-7]]}},714:function(t,e,i){let o=i(60452),r=o.getBCHDigit(1335);e.getEncodedBits=function(t,e){let i=t.bit<<3|e,n=i<<10;for(;o.getBCHDigit(n)-r>=0;)n^=1335<<o.getBCHDigit(n)-r;return(i<<10|n)^21522}},84444:function(t,e){let i=new Uint8Array(512),o=new Uint8Array(256);!function(){let t=1;for(let e=0;e<255;e++)i[e]=t,o[t]=e,256&(t<<=1)&&(t^=285);for(let t=255;t<512;t++)i[t]=i[t-255]}(),e.log=function(t){if(t<1)throw Error("log("+t+")");return o[t]},e.exp=function(t){return i[t]},e.mul=function(t,e){return 0===t||0===e?0:i[o[t]+o[e]]}},42995:function(t,e,i){let o=i(33805),r=i(60452);function n(t){this.mode=o.KANJI,this.data=t}n.getBitsLength=function(t){return 13*t},n.prototype.getLength=function(){return this.data.length},n.prototype.getBitsLength=function(){return n.getBitsLength(this.data.length)},n.prototype.write=function(t){let e;for(e=0;e<this.data.length;e++){let i=r.toSJIS(this.data[e]);if(i>=33088&&i<=40956)i-=33088;else if(i>=57408&&i<=60351)i-=49472;else throw Error("Invalid SJIS character: "+this.data[e]+"\nMake sure your charset is UTF-8");i=(i>>>8&255)*192+(255&i),t.put(i,13)}},t.exports=n},17418:function(t,e){e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};let i={N1:3,N2:3,N3:40,N4:10};e.isValid=function(t){return null!=t&&""!==t&&!isNaN(t)&&t>=0&&t<=7},e.from=function(t){return e.isValid(t)?parseInt(t,10):void 0},e.getPenaltyN1=function(t){let e=t.size,o=0,r=0,n=0,a=null,s=null;for(let l=0;l<e;l++){r=n=0,a=s=null;for(let c=0;c<e;c++){let e=t.get(l,c);e===a?r++:(r>=5&&(o+=i.N1+(r-5)),a=e,r=1),(e=t.get(c,l))===s?n++:(n>=5&&(o+=i.N1+(n-5)),s=e,n=1)}r>=5&&(o+=i.N1+(r-5)),n>=5&&(o+=i.N1+(n-5))}return o},e.getPenaltyN2=function(t){let e=t.size,o=0;for(let i=0;i<e-1;i++)for(let r=0;r<e-1;r++){let e=t.get(i,r)+t.get(i,r+1)+t.get(i+1,r)+t.get(i+1,r+1);(4===e||0===e)&&o++}return o*i.N2},e.getPenaltyN3=function(t){let e=t.size,o=0,r=0,n=0;for(let i=0;i<e;i++){r=n=0;for(let a=0;a<e;a++)r=r<<1&2047|t.get(i,a),a>=10&&(1488===r||93===r)&&o++,n=n<<1&2047|t.get(a,i),a>=10&&(1488===n||93===n)&&o++}return o*i.N3},e.getPenaltyN4=function(t){let e=0,o=t.data.length;for(let i=0;i<o;i++)e+=t.data[i];let r=Math.abs(Math.ceil(100*e/o/5)-10);return r*i.N4},e.applyMask=function(t,i){let o=i.size;for(let r=0;r<o;r++)for(let n=0;n<o;n++)i.isReserved(n,r)||i.xor(n,r,function(t,i,o){switch(t){case e.Patterns.PATTERN000:return(i+o)%2==0;case e.Patterns.PATTERN001:return i%2==0;case e.Patterns.PATTERN010:return o%3==0;case e.Patterns.PATTERN011:return(i+o)%3==0;case e.Patterns.PATTERN100:return(Math.floor(i/2)+Math.floor(o/3))%2==0;case e.Patterns.PATTERN101:return i*o%2+i*o%3==0;case e.Patterns.PATTERN110:return(i*o%2+i*o%3)%2==0;case e.Patterns.PATTERN111:return(i*o%3+(i+o)%2)%2==0;default:throw Error("bad maskPattern:"+t)}}(t,n,r))},e.getBestMask=function(t,i){let o=Object.keys(e.Patterns).length,r=0,n=1/0;for(let a=0;a<o;a++){i(a),e.applyMask(a,t);let o=e.getPenaltyN1(t)+e.getPenaltyN2(t)+e.getPenaltyN3(t)+e.getPenaltyN4(t);e.applyMask(a,t),o<n&&(n=o,r=a)}return r}},33805:function(t,e,i){let o=i(38333),r=i(46158);e.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},e.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},e.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(t,e){if(!t.ccBits)throw Error("Invalid mode: "+t);if(!o.isValid(e))throw Error("Invalid version: "+e);return e>=1&&e<10?t.ccBits[0]:e<27?t.ccBits[1]:t.ccBits[2]},e.getBestModeForData=function(t){return r.testNumeric(t)?e.NUMERIC:r.testAlphanumeric(t)?e.ALPHANUMERIC:r.testKanji(t)?e.KANJI:e.BYTE},e.toString=function(t){if(t&&t.id)return t.id;throw Error("Invalid mode")},e.isValid=function(t){return t&&t.bit&&t.ccBits},e.from=function(t,i){if(e.isValid(t))return t;try{return function(t){if("string"!=typeof t)throw Error("Param is not a string");let i=t.toLowerCase();switch(i){case"numeric":return e.NUMERIC;case"alphanumeric":return e.ALPHANUMERIC;case"kanji":return e.KANJI;case"byte":return e.BYTE;default:throw Error("Unknown mode: "+t)}}(t)}catch(t){return i}}},7537:function(t,e,i){let o=i(33805);function r(t){this.mode=o.NUMERIC,this.data=t.toString()}r.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(t){let e,i;for(e=0;e+3<=this.data.length;e+=3)i=parseInt(this.data.substr(e,3),10),t.put(i,10);let o=this.data.length-e;o>0&&(i=parseInt(this.data.substr(e),10),t.put(i,3*o+1))},t.exports=r},82969:function(t,e,i){let o=i(84444);e.mul=function(t,e){let i=new Uint8Array(t.length+e.length-1);for(let r=0;r<t.length;r++)for(let n=0;n<e.length;n++)i[r+n]^=o.mul(t[r],e[n]);return i},e.mod=function(t,e){let i=new Uint8Array(t);for(;i.length-e.length>=0;){let t=i[0];for(let r=0;r<e.length;r++)i[r]^=o.mul(e[r],t);let r=0;for(;r<i.length&&0===i[r];)r++;i=i.slice(r)}return i},e.generateECPolynomial=function(t){let i=new Uint8Array([1]);for(let r=0;r<t;r++)i=e.mul(i,new Uint8Array([1,o.exp(r)]));return i}},25506:function(t,e,i){let o=i(60452),r=i(49383),n=i(54947),a=i(76696),s=i(14495),l=i(13627),c=i(17418),d=i(13691),u=i(5555),h=i(26840),p=i(714),g=i(33805),w=i(47133);function f(t,e,i){let o,r;let n=t.size,a=p.getEncodedBits(e,i);for(o=0;o<15;o++)r=(a>>o&1)==1,o<6?t.set(o,8,r,!0):o<8?t.set(o+1,8,r,!0):t.set(n-15+o,8,r,!0),o<8?t.set(8,n-o-1,r,!0):o<9?t.set(8,15-o-1+1,r,!0):t.set(8,15-o-1,r,!0);t.set(n-8,8,1,!0)}e.create=function(t,e){let i,p;if(void 0===t||""===t)throw Error("No input text");let b=r.M;return void 0!==e&&(b=r.from(e.errorCorrectionLevel,r.M),i=h.from(e.version),p=c.from(e.maskPattern),e.toSJISFunc&&o.setToSJISFunction(e.toSJISFunc)),function(t,e,i,r){let p;if(Array.isArray(t))p=w.fromArray(t);else if("string"==typeof t){let o=e;if(!o){let e=w.rawSplit(t);o=h.getBestVersionForData(e,i)}p=w.fromString(t,o||40)}else throw Error("Invalid data");let b=h.getBestVersionForData(p,i);if(!b)throw Error("The amount of data is too big to be stored in a QR Code");if(e){if(e<b)throw Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+b+".\n")}else e=b;let v=function(t,e,i){let r=new n;i.forEach(function(e){r.put(e.mode.bit,4),r.put(e.getLength(),g.getCharCountIndicator(e.mode,t)),e.write(r)});let a=o.getSymbolTotalCodewords(t),s=d.getTotalCodewordsCount(t,e),l=(a-s)*8;for(r.getLengthInBits()+4<=l&&r.put(0,4);r.getLengthInBits()%8!=0;)r.putBit(0);let c=(l-r.getLengthInBits())/8;for(let t=0;t<c;t++)r.put(t%2?17:236,8);return function(t,e,i){let r,n;let a=o.getSymbolTotalCodewords(e),s=d.getTotalCodewordsCount(e,i),l=d.getBlocksCount(e,i),c=l-a%l,h=Math.floor((a-s)/l),p=h+1,g=Math.floor(a/l)-h,w=new u(g),f=0,b=Array(l),v=Array(l),m=0,y=new Uint8Array(t.buffer);for(let t=0;t<l;t++){let e=t<c?h:p;b[t]=y.slice(f,f+e),v[t]=w.encode(b[t]),f+=e,m=Math.max(m,e)}let x=new Uint8Array(a),C=0;for(r=0;r<m;r++)for(n=0;n<l;n++)r<b[n].length&&(x[C++]=b[n][r]);for(r=0;r<g;r++)for(n=0;n<l;n++)x[C++]=v[n][r];return x}(r,t,e)}(e,i,p),m=o.getSymbolSize(e),y=new a(m);return function(t,e){let i=t.size,o=l.getPositions(e);for(let e=0;e<o.length;e++){let r=o[e][0],n=o[e][1];for(let e=-1;e<=7;e++)if(!(r+e<=-1)&&!(i<=r+e))for(let o=-1;o<=7;o++)n+o<=-1||i<=n+o||(e>=0&&e<=6&&(0===o||6===o)||o>=0&&o<=6&&(0===e||6===e)||e>=2&&e<=4&&o>=2&&o<=4?t.set(r+e,n+o,!0,!0):t.set(r+e,n+o,!1,!0))}}(y,e),function(t){let e=t.size;for(let i=8;i<e-8;i++){let e=i%2==0;t.set(i,6,e,!0),t.set(6,i,e,!0)}}(y),function(t,e){let i=s.getPositions(e);for(let e=0;e<i.length;e++){let o=i[e][0],r=i[e][1];for(let e=-2;e<=2;e++)for(let i=-2;i<=2;i++)-2===e||2===e||-2===i||2===i||0===e&&0===i?t.set(o+e,r+i,!0,!0):t.set(o+e,r+i,!1,!0)}}(y,e),f(y,i,0),e>=7&&function(t,e){let i,o,r;let n=t.size,a=h.getEncodedBits(e);for(let e=0;e<18;e++)i=Math.floor(e/3),o=e%3+n-8-3,r=(a>>e&1)==1,t.set(i,o,r,!0),t.set(o,i,r,!0)}(y,e),function(t,e){let i=t.size,o=-1,r=i-1,n=7,a=0;for(let s=i-1;s>0;s-=2)for(6===s&&s--;;){for(let i=0;i<2;i++)if(!t.isReserved(r,s-i)){let o=!1;a<e.length&&(o=(e[a]>>>n&1)==1),t.set(r,s-i,o),-1==--n&&(a++,n=7)}if((r+=o)<0||i<=r){r-=o,o=-o;break}}}(y,v),isNaN(r)&&(r=c.getBestMask(y,f.bind(null,y,i))),c.applyMask(r,y),f(y,i,r),{modules:y,version:e,errorCorrectionLevel:i,maskPattern:r,segments:p}}(t,i,b,p)}},5555:function(t,e,i){let o=i(82969);function r(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}r.prototype.initialize=function(t){this.degree=t,this.genPoly=o.generateECPolynomial(this.degree)},r.prototype.encode=function(t){if(!this.genPoly)throw Error("Encoder not initialized");let e=new Uint8Array(t.length+this.degree);e.set(t);let i=o.mod(e,this.genPoly),r=this.degree-i.length;if(r>0){let t=new Uint8Array(this.degree);return t.set(i,r),t}return i},t.exports=r},46158:function(t,e){let i="[0-9]+",o="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";o=o.replace(/u/g,"\\u");let r="(?:(?![A-Z0-9 $%*+\\-./:]|"+o+")(?:.|[\r\n]))+";e.KANJI=RegExp(o,"g"),e.BYTE_KANJI=RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),e.BYTE=RegExp(r,"g"),e.NUMERIC=RegExp(i,"g"),e.ALPHANUMERIC=RegExp("[A-Z $%*+\\-./:]+","g");let n=RegExp("^"+o+"$"),a=RegExp("^"+i+"$"),s=RegExp("^[A-Z0-9 $%*+\\-./:]+$");e.testKanji=function(t){return n.test(t)},e.testNumeric=function(t){return a.test(t)},e.testAlphanumeric=function(t){return s.test(t)}},47133:function(t,e,i){let o=i(33805),r=i(7537),n=i(43094),a=i(51433),s=i(42995),l=i(46158),c=i(60452),d=i(44271);function u(t){return unescape(encodeURIComponent(t)).length}function h(t,e,i){let o;let r=[];for(;null!==(o=t.exec(i));)r.push({data:o[0],index:o.index,mode:e,length:o[0].length});return r}function p(t){let e,i;let r=h(l.NUMERIC,o.NUMERIC,t),n=h(l.ALPHANUMERIC,o.ALPHANUMERIC,t);c.isKanjiModeEnabled()?(e=h(l.BYTE,o.BYTE,t),i=h(l.KANJI,o.KANJI,t)):(e=h(l.BYTE_KANJI,o.BYTE,t),i=[]);let a=r.concat(n,e,i);return a.sort(function(t,e){return t.index-e.index}).map(function(t){return{data:t.data,mode:t.mode,length:t.length}})}function g(t,e){switch(e){case o.NUMERIC:return r.getBitsLength(t);case o.ALPHANUMERIC:return n.getBitsLength(t);case o.KANJI:return s.getBitsLength(t);case o.BYTE:return a.getBitsLength(t)}}function w(t,e){let i;let l=o.getBestModeForData(t);if((i=o.from(e,l))!==o.BYTE&&i.bit<l.bit)throw Error('"'+t+'" cannot be encoded with mode '+o.toString(i)+".\n Suggested mode is: "+o.toString(l));switch(i!==o.KANJI||c.isKanjiModeEnabled()||(i=o.BYTE),i){case o.NUMERIC:return new r(t);case o.ALPHANUMERIC:return new n(t);case o.KANJI:return new s(t);case o.BYTE:return new a(t)}}e.fromArray=function(t){return t.reduce(function(t,e){return"string"==typeof e?t.push(w(e,null)):e.data&&t.push(w(e.data,e.mode)),t},[])},e.fromString=function(t,i){let r=p(t,c.isKanjiModeEnabled()),n=function(t){let e=[];for(let i=0;i<t.length;i++){let r=t[i];switch(r.mode){case o.NUMERIC:e.push([r,{data:r.data,mode:o.ALPHANUMERIC,length:r.length},{data:r.data,mode:o.BYTE,length:r.length}]);break;case o.ALPHANUMERIC:e.push([r,{data:r.data,mode:o.BYTE,length:r.length}]);break;case o.KANJI:e.push([r,{data:r.data,mode:o.BYTE,length:u(r.data)}]);break;case o.BYTE:e.push([{data:r.data,mode:o.BYTE,length:u(r.data)}])}}return e}(r),a=function(t,e){let i={},r={start:{}},n=["start"];for(let a=0;a<t.length;a++){let s=t[a],l=[];for(let t=0;t<s.length;t++){let c=s[t],d=""+a+t;l.push(d),i[d]={node:c,lastCount:0},r[d]={};for(let t=0;t<n.length;t++){let a=n[t];i[a]&&i[a].node.mode===c.mode?(r[a][d]=g(i[a].lastCount+c.length,c.mode)-g(i[a].lastCount,c.mode),i[a].lastCount+=c.length):(i[a]&&(i[a].lastCount=c.length),r[a][d]=g(c.length,c.mode)+4+o.getCharCountIndicator(c.mode,e))}}n=l}for(let t=0;t<n.length;t++)r[n[t]].end=0;return{map:r,table:i}}(n,i),s=d.find_path(a.map,"start","end"),l=[];for(let t=1;t<s.length-1;t++)l.push(a.table[s[t]].node);return e.fromArray(l.reduce(function(t,e){let i=t.length-1>=0?t[t.length-1]:null;return i&&i.mode===e.mode?(t[t.length-1].data+=e.data,t):(t.push(e),t)},[]))},e.rawSplit=function(t){return e.fromArray(p(t,c.isKanjiModeEnabled()))}},60452:function(t,e){let i;let o=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];e.getSymbolSize=function(t){if(!t)throw Error('"version" cannot be null or undefined');if(t<1||t>40)throw Error('"version" should be in range from 1 to 40');return 4*t+17},e.getSymbolTotalCodewords=function(t){return o[t]},e.getBCHDigit=function(t){let e=0;for(;0!==t;)e++,t>>>=1;return e},e.setToSJISFunction=function(t){if("function"!=typeof t)throw Error('"toSJISFunc" is not a valid function.');i=t},e.isKanjiModeEnabled=function(){return void 0!==i},e.toSJIS=function(t){return i(t)}},38333:function(t,e){e.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}},26840:function(t,e,i){let o=i(60452),r=i(13691),n=i(49383),a=i(33805),s=i(38333),l=o.getBCHDigit(7973);function c(t,e){return a.getCharCountIndicator(t,e)+4}e.from=function(t,e){return s.isValid(t)?parseInt(t,10):e},e.getCapacity=function(t,e,i){if(!s.isValid(t))throw Error("Invalid QR Code version");void 0===i&&(i=a.BYTE);let n=o.getSymbolTotalCodewords(t),l=r.getTotalCodewordsCount(t,e),d=(n-l)*8;if(i===a.MIXED)return d;let u=d-c(i,t);switch(i){case a.NUMERIC:return Math.floor(u/10*3);case a.ALPHANUMERIC:return Math.floor(u/11*2);case a.KANJI:return Math.floor(u/13);case a.BYTE:default:return Math.floor(u/8)}},e.getBestVersionForData=function(t,i){let o;let r=n.from(i,n.M);if(Array.isArray(t)){if(t.length>1)return function(t,i){for(let o=1;o<=40;o++){let r=function(t,e){let i=0;return t.forEach(function(t){let o=c(t.mode,e);i+=o+t.getBitsLength()}),i}(t,o);if(r<=e.getCapacity(o,i,a.MIXED))return o}}(t,r);if(0===t.length)return 1;o=t[0]}else o=t;return function(t,i,o){for(let r=1;r<=40;r++)if(i<=e.getCapacity(r,o,t))return r}(o.mode,o.getLength(),r)},e.getEncodedBits=function(t){if(!s.isValid(t)||t<7)throw Error("Invalid QR Code version");let e=t<<12;for(;o.getBCHDigit(e)-l>=0;)e^=7973<<o.getBCHDigit(e)-l;return t<<12|e}},22741:function(t,e,i){let o=i(51404);e.render=function(t,e,i){var r;let n=i,a=e;void 0!==n||e&&e.getContext||(n=e,e=void 0),e||(a=function(){try{return document.createElement("canvas")}catch(t){throw Error("You need to specify a canvas element")}}()),n=o.getOptions(n);let s=o.getImageWidth(t.modules.size,n),l=a.getContext("2d"),c=l.createImageData(s,s);return o.qrToImageData(c.data,t,n),r=a,l.clearRect(0,0,r.width,r.height),r.style||(r.style={}),r.height=s,r.width=s,r.style.height=s+"px",r.style.width=s+"px",l.putImageData(c,0,0),a},e.renderToDataURL=function(t,i,o){let r=o;void 0!==r||i&&i.getContext||(r=i,i=void 0),r||(r={});let n=e.render(t,i,r),a=r.type||"image/png",s=r.rendererOpts||{};return n.toDataURL(a,s.quality)}},92248:function(t,e,i){let o=i(51404);function r(t,e){let i=t.a/255,o=e+'="'+t.hex+'"';return i<1?o+" "+e+'-opacity="'+i.toFixed(2).slice(1)+'"':o}function n(t,e,i){let o=t+e;return void 0!==i&&(o+=" "+i),o}e.render=function(t,e,i){let a=o.getOptions(e),s=t.modules.size,l=t.modules.data,c=s+2*a.margin,d=a.color.light.a?"<path "+r(a.color.light,"fill")+' d="M0 0h'+c+"v"+c+'H0z"/>':"",u="<path "+r(a.color.dark,"stroke")+' d="'+function(t,e,i){let o="",r=0,a=!1,s=0;for(let l=0;l<t.length;l++){let c=Math.floor(l%e),d=Math.floor(l/e);c||a||(a=!0),t[l]?(s++,l>0&&c>0&&t[l-1]||(o+=a?n("M",c+i,.5+d+i):n("m",r,0),r=0,a=!1),c+1<e&&t[l+1]||(o+=n("h",s),s=0)):r++}return o}(l,s,a.margin)+'"/>',h=a.width?'width="'+a.width+'" height="'+a.width+'" ':"",p='<svg xmlns="http://www.w3.org/2000/svg" '+h+('viewBox="0 0 '+c)+" "+c+'" shape-rendering="crispEdges">'+d+u+"</svg>\n";return"function"==typeof i&&i(null,p),p}},51404:function(t,e){function i(t){if("number"==typeof t&&(t=t.toString()),"string"!=typeof t)throw Error("Color should be defined as hex string");let e=t.slice().replace("#","").split("");if(e.length<3||5===e.length||e.length>8)throw Error("Invalid hex color: "+t);(3===e.length||4===e.length)&&(e=Array.prototype.concat.apply([],e.map(function(t){return[t,t]}))),6===e.length&&e.push("F","F");let i=parseInt(e.join(""),16);return{r:i>>24&255,g:i>>16&255,b:i>>8&255,a:255&i,hex:"#"+e.slice(0,6).join("")}}e.getOptions=function(t){t||(t={}),t.color||(t.color={});let e=void 0===t.margin||null===t.margin||t.margin<0?4:t.margin,o=t.width&&t.width>=21?t.width:void 0,r=t.scale||4;return{width:o,scale:o?4:r,margin:e,color:{dark:i(t.color.dark||"#000000ff"),light:i(t.color.light||"#ffffffff")},type:t.type,rendererOpts:t.rendererOpts||{}}},e.getScale=function(t,e){return e.width&&e.width>=t+2*e.margin?e.width/(t+2*e.margin):e.scale},e.getImageWidth=function(t,i){let o=e.getScale(t,i);return Math.floor((t+2*i.margin)*o)},e.qrToImageData=function(t,i,o){let r=i.modules.size,n=i.modules.data,a=e.getScale(r,o),s=Math.floor((r+2*o.margin)*a),l=o.margin*a,c=[o.color.light,o.color.dark];for(let e=0;e<s;e++)for(let i=0;i<s;i++){let d=(e*s+i)*4,u=o.color.light;if(e>=l&&i>=l&&e<s-l&&i<s-l){let t=Math.floor((e-l)/a),o=Math.floor((i-l)/a);u=c[n[t*r+o]?1:0]}t[d++]=u.r,t[d++]=u.g,t[d++]=u.b,t[d]=u.a}}},35599:function(t){"use strict";t.exports=function(t){for(var e=[],i=t.length,o=0;o<i;o++){var r=t.charCodeAt(o);if(r>=55296&&r<=56319&&i>o+1){var n=t.charCodeAt(o+1);n>=56320&&n<=57343&&(r=(r-55296)*1024+n-56320+65536,o+=1)}if(r<128){e.push(r);continue}if(r<2048){e.push(r>>6|192),e.push(63&r|128);continue}if(r<55296||r>=57344&&r<65536){e.push(r>>12|224),e.push(r>>6&63|128),e.push(63&r|128);continue}if(r>=65536&&r<=1114111){e.push(r>>18|240),e.push(r>>12&63|128),e.push(r>>6&63|128),e.push(63&r|128);continue}e.push(239,191,189)}return new Uint8Array(e).buffer}},39324:function(t,e,i){"use strict";i.r(e),i.d(e,{W3mAllWalletsView:function(){return eT},W3mConnectingWcBasicView:function(){return t2},W3mDownloadsView:function(){return eO}});var o=i(44920),r=i(30077),n=i(67007),a=i(88049),s=i(79187),l=i(70580),c=i(6089);i(96456);var d=i(52608),u=i(32410),h=i(37517),p=i(64695);i(59652),i(24782),i(30101);var g=i(21340),w=i(2180);i(70977),i(60936);var f=o.iv`
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
`,b=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let v=class extends o.oi{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let t="xxs";return t="lg"===this.size?"m":"md"===this.size?"xs":"xxs",this.style.cssText=`
       --local-border-radius: var(--wui-border-radius-${t});
       --local-size: var(--wui-wallet-image-size-${this.size});
   `,this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),o.dy`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?o.dy`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?o.dy`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`:o.dy`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};v.styles=[g.ZM,g.ET,f],b([(0,r.Cb)()],v.prototype,"size",void 0),b([(0,r.Cb)()],v.prototype,"name",void 0),b([(0,r.Cb)()],v.prototype,"imageSrc",void 0),b([(0,r.Cb)()],v.prototype,"walletIcon",void 0),b([(0,r.Cb)({type:Boolean})],v.prototype,"installed",void 0),b([(0,r.Cb)()],v.prototype,"badgeSize",void 0),v=b([(0,w.M)("wui-wallet-image")],v);var m=o.iv`
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
`,y=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let x=class extends o.oi{constructor(){super(...arguments),this.walletImages=[]}render(){let t=this.walletImages.length<4;return o.dy`${this.walletImages.slice(0,4).map(({src:t,walletName:e})=>o.dy`
            <wui-wallet-image
              size="inherit"
              imageSrc=${t}
              name=${(0,d.o)(e)}
            ></wui-wallet-image>
          `)}
      ${t?[...Array(4-this.walletImages.length)].map(()=>o.dy` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};x.styles=[g.ET,m],y([(0,r.Cb)({type:Array})],x.prototype,"walletImages",void 0),x=y([(0,w.M)("wui-all-wallets-image")],x),i(86762);var C=o.iv`
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
`,$=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let k=class extends o.oi{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.tabIdx=void 0,this.installed=!1,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100"}render(){return o.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,d.o)(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?o.dy` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?o.dy` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?o.dy`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:this.showAllWallets||this.imageSrc?null:o.dy`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`}templateStatus(){return this.loading?o.dy`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?o.dy`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?o.dy`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};k.styles=[g.ET,g.ZM,C],$([(0,r.Cb)({type:Array})],k.prototype,"walletImages",void 0),$([(0,r.Cb)()],k.prototype,"imageSrc",void 0),$([(0,r.Cb)()],k.prototype,"name",void 0),$([(0,r.Cb)()],k.prototype,"tagLabel",void 0),$([(0,r.Cb)()],k.prototype,"tagVariant",void 0),$([(0,r.Cb)()],k.prototype,"icon",void 0),$([(0,r.Cb)()],k.prototype,"walletIcon",void 0),$([(0,r.Cb)()],k.prototype,"tabIdx",void 0),$([(0,r.Cb)({type:Boolean})],k.prototype,"installed",void 0),$([(0,r.Cb)({type:Boolean})],k.prototype,"disabled",void 0),$([(0,r.Cb)({type:Boolean})],k.prototype,"showAllWallets",void 0),$([(0,r.Cb)({type:Boolean})],k.prototype,"loading",void 0),$([(0,r.Cb)({type:String})],k.prototype,"loadingSpinnerColor",void 0),k=$([(0,w.M)("wui-list-wallet")],k);var R=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let E=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=u.A.state.connectors,this.count=a.Q.state.count,this.filteredCount=a.Q.state.filteredWallets.length,this.isFetchingRecommendedWallets=a.Q.state.isFetchingRecommendedWallets,this.unsubscribe.push(u.A.subscribeKey("connectors",t=>this.connectors=t),a.Q.subscribeKey("count",t=>this.count=t),a.Q.subscribeKey("filteredWallets",t=>this.filteredCount=t.length),a.Q.subscribeKey("isFetchingRecommendedWallets",t=>this.isFetchingRecommendedWallets=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){let t=this.connectors.find(t=>"walletConnect"===t.id),{allWallets:e}=s.h.state;if(!t||"HIDE"===e||"ONLY_MOBILE"===e&&!n.j.isMobile())return null;let i=a.Q.state.featured.length,r=this.count+i,l=this.filteredCount>0?this.filteredCount:r<10?r:10*Math.floor(r/10),c=`${l}`;return this.filteredCount>0?c=`${this.filteredCount}`:l<r&&(c=`${l}+`),o.dy`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${c}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${(0,d.o)(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets?"fg-300":"accent-100"}
      ></wui-list-wallet>
    `}onAllWallets(){h.X.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),p.P.push("AllWallets")}};R([(0,r.Cb)()],E.prototype,"tabIdx",void 0),R([(0,r.SB)()],E.prototype,"connectors",void 0),R([(0,r.SB)()],E.prototype,"count",void 0),R([(0,r.SB)()],E.prototype,"filteredCount",void 0),R([(0,r.SB)()],E.prototype,"isFetchingRecommendedWallets",void 0),E=R([(0,c.Mo)("w3m-all-wallets-widget")],E);var I=i(62661),S=i(10171),T=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let j=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=u.A.state.connectors,this.unsubscribe.push(u.A.subscribeKey("connectors",t=>this.connectors=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){let t=this.connectors.filter(t=>"ANNOUNCED"===t.type);return t?.length?o.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${t.filter(S.C.showConnector).map(t=>o.dy`
              <wui-list-wallet
                imageSrc=${(0,d.o)(I.f.getConnectorImage(t))}
                name=${t.name??"Unknown"}
                @click=${()=>this.onConnector(t)}
                tagVariant="success"
                tagLabel="installed"
                data-testid=${`wallet-selector-${t.id}`}
                .installed=${!0}
                tabIdx=${(0,d.o)(this.tabIdx)}
              >
              </wui-list-wallet>
            `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(t){"walletConnect"===t.id?n.j.isMobile()?p.P.push("AllWallets"):p.P.push("ConnectingWalletConnect"):p.P.push("ConnectingExternal",{connector:t})}};T([(0,r.Cb)()],j.prototype,"tabIdx",void 0),T([(0,r.SB)()],j.prototype,"connectors",void 0),j=T([(0,c.Mo)("w3m-connect-announced-widget")],j);var P=i(98905),B=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let O=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=u.A.state.connectors,this.loading=!1,this.unsubscribe.push(u.A.subscribeKey("connectors",t=>this.connectors=t)),n.j.isTelegram()&&n.j.isIos()&&(this.loading=!P.l.state.wcUri,this.unsubscribe.push(P.l.subscribeKey("wcUri",t=>this.loading=!t)))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){let{customWallets:t}=s.h.state;if(!t?.length)return this.style.cssText="display: none",null;let e=this.filterOutDuplicateWallets(t);return o.dy`<wui-flex flexDirection="column" gap="xs">
      ${e.map(t=>o.dy`
          <wui-list-wallet
            imageSrc=${(0,d.o)(I.f.getWalletImage(t))}
            name=${t.name??"Unknown"}
            @click=${()=>this.onConnectWallet(t)}
            data-testid=${`wallet-selector-${t.id}`}
            tabIdx=${(0,d.o)(this.tabIdx)}
            ?loading=${this.loading}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`}filterOutDuplicateWallets(t){let e=l.M.getRecentWallets(),i=this.connectors.map(t=>t.info?.rdns).filter(Boolean),o=e.map(t=>t.rdns).filter(Boolean),r=i.concat(o);if(r.includes("io.metamask.mobile")&&n.j.isMobile()){let t=r.indexOf("io.metamask.mobile");r[t]="io.metamask"}let a=t.filter(t=>!r.includes(String(t?.rdns)));return a}onConnectWallet(t){this.loading||p.P.push("ConnectingWalletConnect",{wallet:t})}};B([(0,r.Cb)()],O.prototype,"tabIdx",void 0),B([(0,r.SB)()],O.prototype,"connectors",void 0),B([(0,r.SB)()],O.prototype,"loading",void 0),O=B([(0,c.Mo)("w3m-connect-custom-widget")],O);var A=i(53807),L=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let M=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=u.A.state.connectors,this.unsubscribe.push(u.A.subscribeKey("connectors",t=>this.connectors=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){let t=this.connectors.filter(t=>"EXTERNAL"===t.type),e=t.filter(S.C.showConnector),i=e.filter(t=>t.id!==A.b.CONNECTOR_ID.COINBASE_SDK);return i?.length?o.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${i.map(t=>o.dy`
            <wui-list-wallet
              imageSrc=${(0,d.o)(I.f.getConnectorImage(t))}
              .installed=${!0}
              name=${t.name??"Unknown"}
              data-testid=${`wallet-selector-external-${t.id}`}
              @click=${()=>this.onConnector(t)}
              tabIdx=${(0,d.o)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(t){p.P.push("ConnectingExternal",{connector:t})}};L([(0,r.Cb)()],M.prototype,"tabIdx",void 0),L([(0,r.SB)()],M.prototype,"connectors",void 0),M=L([(0,c.Mo)("w3m-connect-external-widget")],M);var z=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let W=class extends o.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.wallets=[]}render(){return this.wallets.length?o.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(t=>o.dy`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${t.id}`}
              imageSrc=${(0,d.o)(I.f.getWalletImage(t))}
              name=${t.name??"Unknown"}
              @click=${()=>this.onConnectWallet(t)}
              tabIdx=${(0,d.o)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(t){u.A.selectWalletConnector(t)}};z([(0,r.Cb)()],W.prototype,"tabIdx",void 0),z([(0,r.Cb)()],W.prototype,"wallets",void 0),W=z([(0,c.Mo)("w3m-connect-featured-widget")],W);var N=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let D=class extends o.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.connectors=[]}render(){let t=this.connectors.filter(S.C.showConnector);return 0===t.length?(this.style.cssText="display: none",null):o.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map(t=>o.dy`
            <wui-list-wallet
              imageSrc=${(0,d.o)(I.f.getConnectorImage(t))}
              .installed=${!0}
              name=${t.name??"Unknown"}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${t.id}`}
              @click=${()=>this.onConnector(t)}
              tabIdx=${(0,d.o)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnector(t){u.A.setActiveConnector(t),p.P.push("ConnectingExternal",{connector:t})}};N([(0,r.Cb)()],D.prototype,"tabIdx",void 0),N([(0,r.Cb)()],D.prototype,"connectors",void 0),D=N([(0,c.Mo)("w3m-connect-injected-widget")],D);var U=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let q=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=u.A.state.connectors,this.unsubscribe.push(u.A.subscribeKey("connectors",t=>this.connectors=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){let t=this.connectors.filter(t=>"MULTI_CHAIN"===t.type&&"WalletConnect"!==t.name);return t?.length?o.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map(t=>o.dy`
            <wui-list-wallet
              imageSrc=${(0,d.o)(I.f.getConnectorImage(t))}
              .installed=${!0}
              name=${t.name??"Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${t.id}`}
              @click=${()=>this.onConnector(t)}
              tabIdx=${(0,d.o)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(t){u.A.setActiveConnector(t),p.P.push("ConnectingMultiChain")}};U([(0,r.Cb)()],q.prototype,"tabIdx",void 0),U([(0,r.SB)()],q.prototype,"connectors",void 0),q=U([(0,c.Mo)("w3m-connect-multi-chain-widget")],q);var _=i(12309),H=i(45435),K=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let V=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=u.A.state.connectors,this.loading=!1,this.unsubscribe.push(u.A.subscribeKey("connectors",t=>this.connectors=t)),n.j.isTelegram()&&n.j.isIos()&&(this.loading=!P.l.state.wcUri,this.unsubscribe.push(P.l.subscribeKey("wcUri",t=>this.loading=!t)))}render(){let t=l.M.getRecentWallets(),e=t.filter(t=>!H.J.isExcluded(t)).filter(t=>!this.hasWalletConnector(t)).filter(t=>this.isWalletCompatibleWithCurrentChain(t));return e.length?o.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(t=>o.dy`
            <wui-list-wallet
              imageSrc=${(0,d.o)(I.f.getWalletImage(t))}
              name=${t.name??"Unknown"}
              @click=${()=>this.onConnectWallet(t)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${(0,d.o)(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(t){this.loading||u.A.selectWalletConnector(t)}hasWalletConnector(t){return this.connectors.some(e=>e.id===t.id||e.name===t.name)}isWalletCompatibleWithCurrentChain(t){let e=_.R.state.activeChain;return!e||!t.chains||t.chains.some(t=>{let i=t.split(":")[0];return e===i})}};K([(0,r.Cb)()],V.prototype,"tabIdx",void 0),K([(0,r.SB)()],V.prototype,"connectors",void 0),K([(0,r.SB)()],V.prototype,"loading",void 0),V=K([(0,c.Mo)("w3m-connect-recent-widget")],V);var F=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let Q=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.wallets=[],this.loading=!1,n.j.isTelegram()&&n.j.isIos()&&(this.loading=!P.l.state.wcUri,this.unsubscribe.push(P.l.subscribeKey("wcUri",t=>this.loading=!t)))}render(){let{connectors:t}=u.A.state,{customWallets:e,featuredWalletIds:i}=s.h.state,r=l.M.getRecentWallets(),n=t.find(t=>"walletConnect"===t.id),a=t.filter(t=>"INJECTED"===t.type||"ANNOUNCED"===t.type||"MULTI_CHAIN"===t.type),c=a.filter(t=>"Browser Wallet"!==t.name);if(!n)return null;if(i||e||!this.wallets.length)return this.style.cssText="display: none",null;let h=c.length+r.length,p=H.J.filterOutDuplicateWallets(this.wallets).slice(0,Math.max(0,2-h));return p.length?o.dy`
      <wui-flex flexDirection="column" gap="xs">
        ${p.map(t=>o.dy`
            <wui-list-wallet
              imageSrc=${(0,d.o)(I.f.getWalletImage(t))}
              name=${t?.name??"Unknown"}
              @click=${()=>this.onConnectWallet(t)}
              tabIdx=${(0,d.o)(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(t){if(this.loading)return;let e=u.A.getConnector(t.id,t.rdns);e?p.P.push("ConnectingExternal",{connector:e}):p.P.push("ConnectingWalletConnect",{wallet:t})}};F([(0,r.Cb)()],Q.prototype,"tabIdx",void 0),F([(0,r.Cb)()],Q.prototype,"wallets",void 0),F([(0,r.SB)()],Q.prototype,"loading",void 0),Q=F([(0,c.Mo)("w3m-connect-recommended-widget")],Q);var Y=i(2013),J=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let X=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=u.A.state.connectors,this.connectorImages=Y.W.state.connectorImages,this.unsubscribe.push(u.A.subscribeKey("connectors",t=>this.connectors=t),Y.W.subscribeKey("connectorImages",t=>this.connectorImages=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){if(n.j.isMobile())return this.style.cssText="display: none",null;let t=this.connectors.find(t=>"walletConnect"===t.id);if(!t)return this.style.cssText="display: none",null;let e=t.imageUrl||this.connectorImages[t?.imageId??""];return o.dy`
      <wui-list-wallet
        imageSrc=${(0,d.o)(e)}
        name=${t.name??"Unknown"}
        @click=${()=>this.onConnector(t)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${(0,d.o)(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `}onConnector(t){u.A.setActiveConnector(t),p.P.push("ConnectingWalletConnect")}};J([(0,r.Cb)()],X.prototype,"tabIdx",void 0),J([(0,r.SB)()],X.prototype,"connectors",void 0),J([(0,r.SB)()],X.prototype,"connectorImages",void 0),X=J([(0,c.Mo)("w3m-connect-walletconnect-widget")],X);var G=o.iv`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`,Z=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tt=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=u.A.state.connectors,this.recommended=a.Q.state.recommended,this.featured=a.Q.state.featured,this.unsubscribe.push(u.A.subscribeKey("connectors",t=>this.connectors=t),a.Q.subscribeKey("recommended",t=>this.recommended=t),a.Q.subscribeKey("featured",t=>this.featured=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){return o.dy`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){let{custom:t,recent:e,announced:i,injected:r,multiChain:n,recommended:a,featured:s,external:l}=S.C.getConnectorsByType(this.connectors,this.recommended,this.featured),c=S.C.getConnectorTypeOrder({custom:t,recent:e,announced:i,injected:r,multiChain:n,recommended:a,featured:s,external:l});return c.map(t=>{switch(t){case"injected":return o.dy`
            ${n.length?o.dy`<w3m-connect-multi-chain-widget
                  tabIdx=${(0,d.o)(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`:null}
            ${i.length?o.dy`<w3m-connect-announced-widget
                  tabIdx=${(0,d.o)(this.tabIdx)}
                ></w3m-connect-announced-widget>`:null}
            ${r.length?o.dy`<w3m-connect-injected-widget
                  .connectors=${r}
                  tabIdx=${(0,d.o)(this.tabIdx)}
                ></w3m-connect-injected-widget>`:null}
          `;case"walletConnect":return o.dy`<w3m-connect-walletconnect-widget
            tabIdx=${(0,d.o)(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;case"recent":return o.dy`<w3m-connect-recent-widget
            tabIdx=${(0,d.o)(this.tabIdx)}
          ></w3m-connect-recent-widget>`;case"featured":return o.dy`<w3m-connect-featured-widget
            .wallets=${s}
            tabIdx=${(0,d.o)(this.tabIdx)}
          ></w3m-connect-featured-widget>`;case"custom":return o.dy`<w3m-connect-custom-widget
            tabIdx=${(0,d.o)(this.tabIdx)}
          ></w3m-connect-custom-widget>`;case"external":return o.dy`<w3m-connect-external-widget
            tabIdx=${(0,d.o)(this.tabIdx)}
          ></w3m-connect-external-widget>`;case"recommended":return o.dy`<w3m-connect-recommended-widget
            .wallets=${a}
            tabIdx=${(0,d.o)(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;default:return console.warn(`Unknown connector type: ${t}`),null}})}};tt.styles=G,Z([(0,r.Cb)()],tt.prototype,"tabIdx",void 0),Z([(0,r.SB)()],tt.prototype,"connectors",void 0),Z([(0,r.SB)()],tt.prototype,"recommended",void 0),Z([(0,r.SB)()],tt.prototype,"featured",void 0),tt=Z([(0,c.Mo)("w3m-connector-list")],tt);var te=i(46560),ti=i(14406),to=o.iv`
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
`,tr=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tn=class extends o.oi{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.localTabWidth="100px",this.activeTab=0,this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `,this.dataset.type=this.isDense?"flex":"block",this.tabs.map((t,e)=>{let i=e===this.activeTab;return o.dy`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(e)}
          data-active=${i}
          data-testid="tab-${t.label?.toLowerCase()}"
        >
          ${this.iconTemplate(t)}
          <wui-text variant="small-600" color="inherit"> ${t.label} </wui-text>
        </button>
      `})}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll("button")],setTimeout(()=>{this.animateTabs(0,!0)},0))}iconTemplate(t){return t.icon?o.dy`<wui-icon size="xs" color="inherit" name=${t.icon}></wui-icon>`:null}onTabClick(t){this.buttons&&this.animateTabs(t,!1),this.activeTab=t,this.onTabChange(t)}animateTabs(t,e){let i=this.buttons[this.activeTab],o=this.buttons[t],r=i?.querySelector("wui-text"),n=o?.querySelector("wui-text"),a=o?.getBoundingClientRect(),s=n?.getBoundingClientRect();i&&r&&!e&&t!==this.activeTab&&(r.animate([{opacity:0}],{duration:50,easing:"ease",fill:"forwards"}),i.animate([{width:"34px"}],{duration:500,easing:"ease",fill:"forwards"})),o&&a&&s&&n&&(t!==this.activeTab||e)&&(this.localTabWidth=`${Math.round(a.width+s.width)+6}px`,o.animate([{width:`${a.width+s.width}px`}],{duration:e?0:500,fill:"forwards",easing:"ease"}),n.animate([{opacity:1}],{duration:e?0:125,delay:e?0:200,fill:"forwards",easing:"ease"}))}};tn.styles=[g.ET,g.ZM,to],tr([(0,r.Cb)({type:Array})],tn.prototype,"tabs",void 0),tr([(0,r.Cb)()],tn.prototype,"onTabChange",void 0),tr([(0,r.Cb)({type:Array})],tn.prototype,"buttons",void 0),tr([(0,r.Cb)({type:Boolean})],tn.prototype,"disabled",void 0),tr([(0,r.Cb)()],tn.prototype,"localTabWidth",void 0),tr([(0,r.SB)()],tn.prototype,"activeTab",void 0),tr([(0,r.SB)()],tn.prototype,"isDense",void 0),tn=tr([(0,w.M)("wui-tabs")],tn);var ta=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let ts=class extends o.oi{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(t=>t())}render(){let t=this.generateTabs();return o.dy`
      <wui-flex justifyContent="center" .padding=${["0","0","l","0"]}>
        <wui-tabs .tabs=${t} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){let t=this.platforms.map(t=>"browser"===t?{label:"Browser",icon:"extension",platform:"browser"}:"mobile"===t?{label:"Mobile",icon:"mobile",platform:"mobile"}:"qrcode"===t?{label:"Mobile",icon:"mobile",platform:"qrcode"}:"web"===t?{label:"Webapp",icon:"browser",platform:"web"}:"desktop"===t?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=t.map(({platform:t})=>t),t}onTabChange(t){let e=this.platformTabs[t];e&&this.onSelectPlatfrom?.(e)}};ta([(0,r.Cb)({type:Array})],ts.prototype,"platforms",void 0),ta([(0,r.Cb)()],ts.prototype,"onSelectPlatfrom",void 0),ts=ta([(0,c.Mo)("w3m-connecting-header")],ts);var tl=i(10375);i(82870);var tc=o.iv`
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
`,td=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tu={main:"inverse-100",inverse:"inverse-000",accent:"accent-100","accent-error":"error-100","accent-success":"success-100",neutral:"fg-100",disabled:"gray-glass-020"},th={lg:"paragraph-600",md:"small-600"},tp={lg:"md",md:"md"},tg=class extends o.oi{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="main",this.hasIconLeft=!1,this.hasIconRight=!1,this.borderRadius="m"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
    --local-opacity-100: ${this.loading?0:1};
    --local-opacity-000: ${this.loading?1:0};
    --local-border-radius: var(--wui-border-radius-${this.borderRadius});
    `;let t=this.textVariant??th[this.size];return o.dy`
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${()=>this.handleSlotLeftChange()}></slot>
        <wui-text variant=${t} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${()=>this.handleSlotRightChange()}></slot>
      </button>
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){if(this.loading){let t=tp[this.size],e=this.disabled?tu.disabled:tu[this.variant];return o.dy`<wui-loading-spinner color=${e} size=${t}></wui-loading-spinner>`}return o.dy``}};tg.styles=[g.ET,g.ZM,tc],td([(0,r.Cb)()],tg.prototype,"size",void 0),td([(0,r.Cb)({type:Boolean})],tg.prototype,"disabled",void 0),td([(0,r.Cb)({type:Boolean})],tg.prototype,"fullWidth",void 0),td([(0,r.Cb)({type:Boolean})],tg.prototype,"loading",void 0),td([(0,r.Cb)()],tg.prototype,"variant",void 0),td([(0,r.Cb)({type:Boolean})],tg.prototype,"hasIconLeft",void 0),td([(0,r.Cb)({type:Boolean})],tg.prototype,"hasIconRight",void 0),td([(0,r.Cb)()],tg.prototype,"borderRadius",void 0),td([(0,r.Cb)()],tg.prototype,"textVariant",void 0),tg=td([(0,w.M)("wui-button")],tg),i(58267);var tw=o.iv`
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
`,tf=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tb=class extends o.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return o.dy`
      <button ?disabled=${this.disabled} tabindex=${(0,d.o)(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};tb.styles=[g.ET,g.ZM,tw],tf([(0,r.Cb)()],tb.prototype,"tabIdx",void 0),tf([(0,r.Cb)({type:Boolean})],tb.prototype,"disabled",void 0),tf([(0,r.Cb)()],tb.prototype,"color",void 0),tb=tf([(0,w.M)("wui-link")],tb);var tv=o.iv`
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
`,tm=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let ty=class extends o.oi{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){let t=this.radius>50?50:this.radius,e=36-t;return o.dy`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${t}
          stroke-dasharray="${116+e} ${245+e}"
          stroke-dashoffset=${360+1.75*e}
        />
      </svg>
    `}};ty.styles=[g.ET,tv],tm([(0,r.Cb)({type:Number})],ty.prototype,"radius",void 0),ty=tm([(0,w.M)("wui-loading-thumbnail")],ty),i(69497);var tx=o.iv`
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
`,tC=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let t$=class extends o.oi{constructor(){super(...arguments),this.variant="accent",this.imageSrc="",this.disabled=!1,this.icon="externalLink",this.size="md",this.text=""}render(){let t="sm"===this.size?"small-600":"paragraph-600";return o.dy`
      <button
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc?o.dy`<wui-image src=${this.imageSrc}></wui-image>`:null}
        <wui-text variant=${t} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `}};t$.styles=[g.ET,g.ZM,tx],tC([(0,r.Cb)()],t$.prototype,"variant",void 0),tC([(0,r.Cb)()],t$.prototype,"imageSrc",void 0),tC([(0,r.Cb)({type:Boolean})],t$.prototype,"disabled",void 0),tC([(0,r.Cb)()],t$.prototype,"icon",void 0),tC([(0,r.Cb)()],t$.prototype,"size",void 0),tC([(0,r.Cb)()],t$.prototype,"text",void 0),t$=tC([(0,w.M)("wui-chip-button")],t$);var tk=o.iv`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`,tR=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tE=class extends o.oi{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return o.dy`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs","2l","1xs","2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `}};tE.styles=[g.ET,g.ZM,tk],tR([(0,r.Cb)({type:Boolean})],tE.prototype,"disabled",void 0),tR([(0,r.Cb)()],tE.prototype,"label",void 0),tR([(0,r.Cb)()],tE.prototype,"buttonLabel",void 0),tE=tR([(0,w.M)("wui-cta-button")],tE);var tI=o.iv`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`,tS=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tT=class extends o.oi{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;let{name:t,app_store:e,play_store:i,chrome_store:r,homepage:a}=this.wallet,s=n.j.isMobile(),l=n.j.isIos(),d=n.j.isAndroid(),u=[e,i,a,r].filter(Boolean).length>1,h=c.Hg.getTruncateString({string:t,charsStart:12,charsEnd:0,truncate:"end"});return u&&!s?o.dy`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${()=>p.P.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!u&&a?o.dy`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:e&&l?o.dy`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:i&&d?o.dy`
        <wui-cta-button
          label=${`Don't have ${h}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){this.wallet?.app_store&&n.j.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&n.j.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&n.j.openHref(this.wallet.homepage,"_blank")}};tT.styles=[tI],tS([(0,r.Cb)({type:Object})],tT.prototype,"wallet",void 0),tT=tS([(0,c.Mo)("w3m-mobile-download-links")],tT);var tj=o.iv`
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
`,tP=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};class tB extends o.oi{constructor(){super(),this.wallet=p.P.state.data?.wallet,this.connector=p.P.state.data?.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=I.f.getWalletImage(this.wallet)??I.f.getConnectorImage(this.connector),this.name=this.wallet?.name??this.connector?.name??"Wallet",this.isRetrying=!1,this.uri=P.l.state.wcUri,this.error=P.l.state.wcError,this.ready=!1,this.showRetry=!1,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(...[P.l.subscribeKey("wcUri",t=>{this.uri=t,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())}),P.l.subscribeKey("wcError",t=>this.error=t)]),(n.j.isTelegram()||n.j.isSafari())&&n.j.isIos()&&P.l.state.wcUri&&this.onConnect?.()}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),P.l.setWcError(!1),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();let t=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel,e=`Continue in ${this.name}`;return this.error&&(e="Connection declined"),o.dy`
      <wui-flex
        data-error=${(0,d.o)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${(0,d.o)(this.imageSrc)}></wui-wallet-image>

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
            ${e}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${t}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?o.dy`
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

      ${this.isWalletConnect?o.dy`
            <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){if(this.error&&!this.showRetry){this.showRetry=!0;let t=this.shadowRoot?.querySelector("wui-button");t?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onTryAgain(){P.l.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.()}loaderTemplate(){let t=tl.u.state.themeVariables["--w3m-border-radius-master"],e=t?parseInt(t.replace("px",""),10):4;return o.dy`<wui-loading-thumbnail radius=${9*e}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(n.j.copyToClopboard(this.uri),ti.K.showSuccess("Link copied"))}catch{ti.K.showError("Failed to copy")}}}tB.styles=tj,tP([(0,r.SB)()],tB.prototype,"isRetrying",void 0),tP([(0,r.SB)()],tB.prototype,"uri",void 0),tP([(0,r.SB)()],tB.prototype,"error",void 0),tP([(0,r.SB)()],tB.prototype,"ready",void 0),tP([(0,r.SB)()],tB.prototype,"showRetry",void 0),tP([(0,r.SB)()],tB.prototype,"secondaryBtnLabel",void 0),tP([(0,r.SB)()],tB.prototype,"secondaryLabel",void 0),tP([(0,r.SB)()],tB.prototype,"isLoading",void 0),tP([(0,r.Cb)({type:Boolean})],tB.prototype,"isMobile",void 0),tP([(0,r.Cb)()],tB.prototype,"onRetry",void 0);let tO=class extends tB{constructor(){if(super(),!this.wallet)throw Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),h.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}async onConnectProxy(){try{this.error=!1;let{connectors:t}=u.A.state,e=t.find(t=>"ANNOUNCED"===t.type&&t.info?.rdns===this.wallet?.rdns||"INJECTED"===t.type||t.name===this.wallet?.name);if(e)await P.l.connectExternal(e,e.chain);else throw Error("w3m-connecting-wc-browser: No connector found");te.I.close(),h.X.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.wallet?.name||"Unknown"}})}catch(t){h.X.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:t?.message??"Unknown"}}),this.error=!0}}};tO=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}([(0,c.Mo)("w3m-connecting-wc-browser")],tO);let tA=class extends tB{constructor(){if(super(),!this.wallet)throw Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),h.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop"}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;let{desktop_link:t,name:e}=this.wallet,{redirect:i,href:o}=n.j.formatNativeUrl(t,this.uri);P.l.setWcLinking({name:e,href:o}),P.l.setRecentWallet(this.wallet),n.j.openHref(i,"_blank")}catch{this.error=!0}}};tA=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}([(0,c.Mo)("w3m-connecting-wc-desktop")],tA);var tL=i(24997),tM=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tz=class extends tB{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=s.h.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{if(this.wallet?.mobile_link&&this.uri)try{this.error=!1;let{mobile_link:t,link_mode:e,name:i}=this.wallet,{redirect:o,redirectUniversalLink:r,href:a}=n.j.formatNativeUrl(t,this.uri,e);this.redirectDeeplink=o,this.redirectUniversalLink=r,this.target=n.j.isIframe()?"_top":"_self",P.l.setWcLinking({name:i,href:a}),P.l.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?n.j.openHref(this.redirectUniversalLink,this.target):n.j.openHref(this.redirectDeeplink,this.target)}catch(t){h.X.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:t instanceof Error?t.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=tL.bq.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(P.l.subscribeKey("wcUri",()=>{this.onHandleURI()})),h.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile"}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onTryAgain(){P.l.setWcError(!1),this.onConnect?.()}};tM([(0,r.SB)()],tz.prototype,"redirectDeeplink",void 0),tM([(0,r.SB)()],tz.prototype,"redirectUniversalLink",void 0),tM([(0,r.SB)()],tz.prototype,"target",void 0),tM([(0,r.SB)()],tz.prototype,"preferUniversalLinks",void 0),tM([(0,r.SB)()],tz.prototype,"isLoading",void 0),tz=tM([(0,c.Mo)("w3m-connecting-wc-mobile")],tz);var tW=i(812);function tN(t,e,i){return t!==e&&(t-e<0?e-t:t-e)<=i+.1}let tD={generate({uri:t,size:e,logoSize:i,dotColor:r="#141414"}){let n=[],a=function(t,e){let i=Array.prototype.slice.call(tW.create(t,{errorCorrectionLevel:"Q"}).modules.data,0),o=Math.sqrt(i.length);return i.reduce((t,e,i)=>(i%o==0?t.push([e]):t[t.length-1].push(e))&&t,[])}(t,0),s=e/a.length,l=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];l.forEach(({x:t,y:e})=>{let i=(a.length-7)*s*t,c=(a.length-7)*s*e;for(let t=0;t<l.length;t+=1){let e=s*(7-2*t);n.push(o.YP`
            <rect
              fill=${2===t?r:"transparent"}
              width=${0===t?e-5:e}
              rx= ${0===t?(e-5)*.45:.45*e}
              ry= ${0===t?(e-5)*.45:.45*e}
              stroke=${r}
              stroke-width=${0===t?5:0}
              height=${0===t?e-5:e}
              x= ${0===t?c+s*t+2.5:c+s*t}
              y= ${0===t?i+s*t+2.5:i+s*t}
            />
          `)}});let c=Math.floor((i+25)/s),d=a.length/2-c/2,u=a.length/2+c/2-1,h=[];a.forEach((t,e)=>{t.forEach((t,i)=>{!a[e][i]||e<7&&i<7||e>a.length-8&&i<7||e<7&&i>a.length-8||e>d&&e<u&&i>d&&i<u||h.push([e*s+s/2,i*s+s/2])})});let p={};return h.forEach(([t,e])=>{p[t]?p[t]?.push(e):p[t]=[e]}),Object.entries(p).map(([t,e])=>{let i=e.filter(t=>e.every(e=>!tN(t,e,s)));return[Number(t),i]}).forEach(([t,e])=>{e.forEach(e=>{n.push(o.YP`<circle cx=${t} cy=${e} fill=${r} r=${s/2.5} />`)})}),Object.entries(p).filter(([t,e])=>e.length>1).map(([t,e])=>{let i=e.filter(t=>e.some(e=>tN(t,e,s)));return[Number(t),i]}).map(([t,e])=>{e.sort((t,e)=>t<e?-1:1);let i=[];for(let t of e){let e=i.find(e=>e.some(e=>tN(t,e,s)));e?e.push(t):i.push([t])}return[t,i.map(t=>[t[0],t[t.length-1]])]}).forEach(([t,e])=>{e.forEach(([e,i])=>{n.push(o.YP`
              <line
                x1=${t}
                x2=${t}
                y1=${e}
                y2=${i}
                stroke=${r}
                stroke-width=${s/1.25}
                stroke-linecap="round"
              />
            `)})}),n}};var tU=o.iv`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: var(--local-size);
  }

  :host([data-theme='dark']) {
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px);
    background-color: var(--wui-color-inverse-100);
    padding: var(--wui-spacing-l);
  }

  :host([data-theme='light']) {
    box-shadow: 0 0 0 1px var(--wui-color-bg-125);
    background-color: var(--wui-color-bg-125);
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: var(--local-icon-color) !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }
`,tq=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let t_=class extends o.oi{constructor(){super(...arguments),this.uri="",this.size=0,this.theme="dark",this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0,this.farcaster=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),this.style.cssText=`
     --local-size: ${this.size}px;
     --local-icon-color: ${this.color??"#3396ff"}
    `,o.dy`${this.templateVisual()} ${this.templateSvg()}`}templateSvg(){let t="light"===this.theme?this.size:this.size-32;return o.YP`
      <svg height=${t} width=${t}>
        ${tD.generate({uri:this.uri,size:t,logoSize:this.arenaClear?0:t/4,dotColor:this.color})}
      </svg>
    `}templateVisual(){return this.imageSrc?o.dy`<wui-image src=${this.imageSrc} alt=${this.alt??"logo"}></wui-image>`:this.farcaster?o.dy`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`:o.dy`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};t_.styles=[g.ET,tU],tq([(0,r.Cb)()],t_.prototype,"uri",void 0),tq([(0,r.Cb)({type:Number})],t_.prototype,"size",void 0),tq([(0,r.Cb)()],t_.prototype,"theme",void 0),tq([(0,r.Cb)()],t_.prototype,"imageSrc",void 0),tq([(0,r.Cb)()],t_.prototype,"alt",void 0),tq([(0,r.Cb)()],t_.prototype,"color",void 0),tq([(0,r.Cb)({type:Boolean})],t_.prototype,"arenaClear",void 0),tq([(0,r.Cb)({type:Boolean})],t_.prototype,"farcaster",void 0),t_=tq([(0,w.M)("wui-qr-code")],t_);var tH=o.iv`
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
`,tK=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tV=class extends o.oi{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m",this.variant="default"}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
      border-radius: clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px);
    `,o.dy`<slot></slot>`}};tV.styles=[tH],tK([(0,r.Cb)()],tV.prototype,"width",void 0),tK([(0,r.Cb)()],tV.prototype,"height",void 0),tK([(0,r.Cb)()],tV.prototype,"borderRadius",void 0),tK([(0,r.Cb)()],tV.prototype,"variant",void 0),tV=tK([(0,w.M)("wui-shimmer")],tV);var tF=o.iv`
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
`;let tQ=class extends o.oi{render(){return o.dy`
      <a
        data-testid="ux-branding-reown"
        href=${"https://reown.com"}
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
    `}};tQ.styles=[g.ET,g.ZM,tF],tQ=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}([(0,w.M)("wui-ux-by-reown")],tQ);var tY=o.iv`
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
`;let tJ=class extends tB{constructor(){super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),h.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet?.name??"WalletConnect",platform:"qrcode"}})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.forEach(t=>t()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),o.dy`
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
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;let t=this.getBoundingClientRect().width-40,e=this.wallet?this.wallet.name:void 0;return P.l.setWcLinking(void 0),P.l.setRecentWallet(this.wallet),o.dy` <wui-qr-code
      size=${t}
      theme=${tl.u.state.themeMode}
      uri=${this.uri}
      imageSrc=${(0,d.o)(I.f.getWalletImage(this.wallet))}
      color=${(0,d.o)(tl.u.state.themeVariables["--w3m-qr-color"])}
      alt=${(0,d.o)(e)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){let t=!this.uri||!this.ready;return o.dy`<wui-link
      .disabled=${t}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};tJ.styles=tY,tJ=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}([(0,c.Mo)("w3m-connecting-wc-qrcode")],tJ);let tX=class extends o.oi{constructor(){if(super(),this.wallet=p.P.state.data?.wallet,!this.wallet)throw Error("w3m-connecting-wc-unsupported: No wallet provided");h.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}render(){return o.dy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${(0,d.o)(I.f.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};tX=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}([(0,c.Mo)("w3m-connecting-wc-unsupported")],tX);var tG=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let tZ=class extends tB{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=tL.bq.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(P.l.subscribeKey("wcUri",()=>{this.updateLoadingState()})),h.X.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web"}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;let{webapp_link:t,name:e}=this.wallet,{redirect:i,href:o}=n.j.formatUniversalUrl(t,this.uri);P.l.setWcLinking({name:e,href:o}),P.l.setRecentWallet(this.wallet),n.j.openHref(i,"_blank")}catch{this.error=!0}}};tG([(0,r.SB)()],tZ.prototype,"isLoading",void 0),tZ=tG([(0,c.Mo)("w3m-connecting-wc-web")],tZ);var t0=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let t1=class extends o.oi{constructor(){super(),this.wallet=p.P.state.data?.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!s.h.state.siwx,this.remoteFeatures=s.h.state.remoteFeatures,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(s.h.subscribeKey("remoteFeatures",t=>this.remoteFeatures=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){return o.dy`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding?o.dy`<wui-ux-by-reown></wui-ux-by-reown>`:null}async initializeConnection(t=!1){if("browser"!==this.platform&&(!s.h.state.manualWCControl||t))try{let{wcPairingExpiry:e,status:i}=P.l.state;(t||s.h.state.enableEmbedded||n.j.isPairingExpired(e)||"connecting"===i)&&(await P.l.connectWalletConnect(),this.isSiwxEnabled||te.I.close())}catch(t){h.X.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:t?.message??"Unknown"}}),P.l.setWcError(!0),ti.K.showError(t.message??"Connection error"),P.l.resetWcConnection(),p.P.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;let{mobile_link:t,desktop_link:e,webapp_link:i,injected:o,rdns:r}=this.wallet,a=o?.map(({injected_id:t})=>t).filter(Boolean),l=[...r?[r]:a??[]],c=!s.h.state.isUniversalProvider&&l.length,d=P.l.checkInstalled(l),u=c&&d,h=e&&!n.j.isMobile();u&&!_.R.state.noAdapters&&this.platforms.push("browser"),t&&this.platforms.push(n.j.isMobile()?"mobile":"qrcode"),i&&this.platforms.push("web"),h&&this.platforms.push("desktop"),u||!c||_.R.state.noAdapters||this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return o.dy`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return o.dy`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return o.dy`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return o.dy`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return o.dy`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return o.dy`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){let t=this.platforms.length>1;return t?o.dy`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(t){let e=this.shadowRoot?.querySelector("div");e&&(await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=t,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};t0([(0,r.SB)()],t1.prototype,"platform",void 0),t0([(0,r.SB)()],t1.prototype,"platforms",void 0),t0([(0,r.SB)()],t1.prototype,"isSiwxEnabled",void 0),t0([(0,r.SB)()],t1.prototype,"remoteFeatures",void 0),t1=t0([(0,c.Mo)("w3m-connecting-wc-view")],t1);var t3=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let t2=class extends o.oi{constructor(){super(...arguments),this.isMobile=n.j.isMobile()}render(){if(this.isMobile){let{featured:t,recommended:e}=a.Q.state,{customWallets:i}=s.h.state,r=l.M.getRecentWallets(),n=t.length||e.length||i?.length||r.length;return o.dy`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${["3xs","s","s","s"]}
      >
        ${n?o.dy`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return o.dy`<wui-flex flexDirection="column" .padding=${["0","0","l","0"]}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${["0","m","0","m"]}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`}};t3([(0,r.SB)()],t2.prototype,"isMobile",void 0),t2=t3([(0,c.Mo)("w3m-connecting-wc-basic-view")],t2);var t5=i(91308),t4=o.iv`
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
`,t6=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let t8=class extends o.oi{constructor(){super(...arguments),this.inputElementRef=(0,t5.V)(),this.checked=void 0}render(){return o.dy`
      <label>
        <input
          ${(0,t5.i)(this.inputElementRef)}
          type="checkbox"
          ?checked=${(0,d.o)(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("switchChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};t8.styles=[g.ET,g.ZM,g.Bp,t4],t6([(0,r.Cb)({type:Boolean})],t8.prototype,"checked",void 0),t8=t6([(0,w.M)("wui-switch")],t8);var t7=o.iv`
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
`,t9=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let et=class extends o.oi{constructor(){super(...arguments),this.checked=void 0}render(){return o.dy`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${(0,d.o)(this.checked)}></wui-switch>
      </button>
    `}};et.styles=[g.ET,g.ZM,t7],t9([(0,r.Cb)({type:Boolean})],et.prototype,"checked",void 0),et=t9([(0,w.M)("wui-certified-switch")],et);var ee=o.iv`
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
`,ei=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let eo=class extends o.oi{constructor(){super(...arguments),this.icon="copy"}render(){return o.dy`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};eo.styles=[g.ET,g.ZM,ee],ei([(0,r.Cb)()],eo.prototype,"icon",void 0),eo=ei([(0,w.M)("wui-input-element")],eo);var er=i(16025),en=o.iv`
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
`,ea=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let es=class extends o.oi{constructor(){super(...arguments),this.inputElementRef=(0,t5.V)(),this.size="md",this.disabled=!1,this.placeholder="",this.type="text",this.value=""}render(){let t=`wui-padding-right-${this.inputRightPadding}`,e=`wui-size-${this.size}`,i={[e]:!0,[t]:!!this.inputRightPadding};return o.dy`${this.templateIcon()}
      <input
        data-testid="wui-input-text"
        ${(0,t5.i)(this.inputElementRef)}
        class=${(0,er.$)(i)}
        type=${this.type}
        enterkeyhint=${(0,d.o)(this.enterKeyHint)}
        ?disabled=${this.disabled}
        placeholder=${this.placeholder}
        @input=${this.dispatchInputChangeEvent.bind(this)}
        .value=${this.value||""}
        tabindex=${(0,d.o)(this.tabIdx)}
      />
      <slot></slot>`}templateIcon(){return this.icon?o.dy`<wui-icon
        data-input=${this.size}
        size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};es.styles=[g.ET,g.ZM,en],ea([(0,r.Cb)()],es.prototype,"size",void 0),ea([(0,r.Cb)()],es.prototype,"icon",void 0),ea([(0,r.Cb)({type:Boolean})],es.prototype,"disabled",void 0),ea([(0,r.Cb)()],es.prototype,"placeholder",void 0),ea([(0,r.Cb)()],es.prototype,"type",void 0),ea([(0,r.Cb)()],es.prototype,"keyHint",void 0),ea([(0,r.Cb)()],es.prototype,"value",void 0),ea([(0,r.Cb)()],es.prototype,"inputRightPadding",void 0),ea([(0,r.Cb)()],es.prototype,"tabIdx",void 0),es=ea([(0,w.M)("wui-input-text")],es);var el=o.iv`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;let ec=class extends o.oi{constructor(){super(...arguments),this.inputComponentRef=(0,t5.V)()}render(){return o.dy`
      <wui-input-text
        ${(0,t5.i)(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){let t=this.inputComponentRef.value,e=t?.inputElementRef.value;e&&(e.value="",e.focus(),e.dispatchEvent(new Event("input")))}};ec.styles=[g.ET,el],ec=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}([(0,w.M)("wui-search-bar")],ec);let ed=o.YP`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`;var eu=o.iv`
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
`,eh=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let ep=class extends o.oi{constructor(){super(...arguments),this.type="wallet"}render(){return o.dy`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return"network"===this.type?o.dy` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${ed}`:o.dy`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};ep.styles=[g.ET,g.ZM,eu],eh([(0,r.Cb)()],ep.prototype,"type",void 0),ep=eh([(0,w.M)("wui-card-select-loader")],ep);var eg=i(72645),ew=o.iv`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`,ef=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let eb=class extends o.oi{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&eg.H.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&eg.H.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&eg.H.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&eg.H.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&eg.H.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&eg.H.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&eg.H.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&eg.H.getSpacingStyles(this.margin,3)};
    `,o.dy`<slot></slot>`}};eb.styles=[g.ET,ew],ef([(0,r.Cb)()],eb.prototype,"gridTemplateRows",void 0),ef([(0,r.Cb)()],eb.prototype,"gridTemplateColumns",void 0),ef([(0,r.Cb)()],eb.prototype,"justifyItems",void 0),ef([(0,r.Cb)()],eb.prototype,"alignItems",void 0),ef([(0,r.Cb)()],eb.prototype,"justifyContent",void 0),ef([(0,r.Cb)()],eb.prototype,"alignContent",void 0),ef([(0,r.Cb)()],eb.prototype,"columnGap",void 0),ef([(0,r.Cb)()],eb.prototype,"rowGap",void 0),ef([(0,r.Cb)()],eb.prototype,"gap",void 0),ef([(0,r.Cb)()],eb.prototype,"padding",void 0),ef([(0,r.Cb)()],eb.prototype,"margin",void 0),eb=ef([(0,w.M)("wui-grid")],eb);var ev=o.iv`
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
`,em=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let ey=class extends o.oi{constructor(){super(),this.observer=new IntersectionObserver(()=>void 0),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.wallet=void 0,this.observer=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting?(this.visible=!0,this.fetchImageSrc()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){let t=this.wallet?.badge_type==="certified";return o.dy`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${(0,d.o)(t?"certified":void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${t?o.dy`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){return(this.visible||this.imageSrc)&&!this.imageLoading?o.dy`
      <wui-wallet-image
        size="md"
        imageSrc=${(0,d.o)(this.imageSrc)}
        name=${this.wallet?.name}
        .installed=${this.wallet?.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `:this.shimmerTemplate()}shimmerTemplate(){return o.dy`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=I.f.getWalletImage(this.wallet),this.imageSrc||(this.imageLoading=!0,this.imageSrc=await I.f.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}};ey.styles=ev,em([(0,r.SB)()],ey.prototype,"visible",void 0),em([(0,r.SB)()],ey.prototype,"imageSrc",void 0),em([(0,r.SB)()],ey.prototype,"imageLoading",void 0),em([(0,r.Cb)()],ey.prototype,"wallet",void 0),ey=em([(0,c.Mo)("w3m-all-wallets-list-item")],ey);var ex=o.iv`
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
`,eC=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let e$="local-paginator",ek=class extends o.oi{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!a.Q.state.wallets.length,this.wallets=a.Q.state.wallets,this.recommended=a.Q.state.recommended,this.featured=a.Q.state.featured,this.filteredWallets=a.Q.state.filteredWallets,this.unsubscribe.push(...[a.Q.subscribeKey("wallets",t=>this.wallets=t),a.Q.subscribeKey("recommended",t=>this.recommended=t),a.Q.subscribeKey("featured",t=>this.featured=t),a.Q.subscribeKey("filteredWallets",t=>this.filteredWallets=t)])}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),this.paginationObserver?.disconnect()}render(){return o.dy`
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
    `}async initialFetch(){this.loading=!0;let t=this.shadowRoot?.querySelector("wui-grid");t&&(await a.Q.fetchWalletsByPage({page:1}),await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(t,e){return[...Array(t)].map(()=>o.dy`
        <wui-card-select-loader type="wallet" id=${(0,d.o)(e)}></wui-card-select-loader>
      `)}walletsTemplate(){let t=this.filteredWallets?.length>0?n.j.uniqueBy([...this.featured,...this.recommended,...this.filteredWallets],"id"):n.j.uniqueBy([...this.featured,...this.recommended,...this.wallets],"id"),e=H.J.markWalletsAsInstalled(t);return e.map(t=>o.dy`
        <w3m-all-wallets-list-item
          @click=${()=>this.onConnectWallet(t)}
          .wallet=${t}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){let{wallets:t,recommended:e,featured:i,count:o}=a.Q.state,r=window.innerWidth<352?3:4,n=t.length+e.length,s=Math.ceil(n/r)*r-n+r;return(s-=t.length?i.length%r:0,0===o&&i.length>0)?null:0===o||[...i,...t,...e].length<o?this.shimmerTemplate(s,e$):null}createPaginationObserver(){let t=this.shadowRoot?.querySelector(`#${e$}`);t&&(this.paginationObserver=new IntersectionObserver(([t])=>{if(t?.isIntersecting&&!this.loading){let{page:t,count:e,wallets:i}=a.Q.state;i.length<e&&a.Q.fetchWalletsByPage({page:t+1})}}),this.paginationObserver.observe(t))}onConnectWallet(t){u.A.selectWalletConnector(t)}};ek.styles=ex,eC([(0,r.SB)()],ek.prototype,"loading",void 0),eC([(0,r.SB)()],ek.prototype,"wallets",void 0),eC([(0,r.SB)()],ek.prototype,"recommended",void 0),eC([(0,r.SB)()],ek.prototype,"featured",void 0),eC([(0,r.SB)()],ek.prototype,"filteredWallets",void 0),ek=eC([(0,c.Mo)("w3m-all-wallets-list")],ek);var eR=o.iv`
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
`,eE=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let eI=class extends o.oi{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?o.dy`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await a.Q.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){let{search:t}=a.Q.state,e=H.J.markWalletsAsInstalled(t);return t.length?o.dy`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","s","s","s"]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${e.map(t=>o.dy`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(t)}
              .wallet=${t}
              data-testid="wallet-search-item-${t.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:o.dy`
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
      `}onConnectWallet(t){u.A.selectWalletConnector(t)}};eI.styles=eR,eE([(0,r.SB)()],eI.prototype,"loading",void 0),eE([(0,r.Cb)()],eI.prototype,"query",void 0),eE([(0,r.Cb)()],eI.prototype,"badge",void 0),eI=eE([(0,c.Mo)("w3m-all-wallets-search")],eI);var eS=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let eT=class extends o.oi{constructor(){super(...arguments),this.search="",this.onDebouncedSearch=n.j.debounce(t=>{this.search=t})}render(){let t=this.search.length>=2;return o.dy`
      <wui-flex .padding=${["0","s","s","s"]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${t||this.badge?o.dy`<w3m-all-wallets-search
            query=${this.search}
            badge=${(0,d.o)(this.badge)}
          ></w3m-all-wallets-search>`:o.dy`<w3m-all-wallets-list badge=${(0,d.o)(this.badge)}></w3m-all-wallets-list>`}
    `}onInputChange(t){this.onDebouncedSearch(t.detail)}onClick(){if("certified"===this.badge){this.badge=void 0;return}this.badge="certified",ti.K.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})}qrButtonTemplate(){return n.j.isMobile()?o.dy`
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
      `:null}onWalletConnectQr(){p.P.push("ConnectingWalletConnect")}};eS([(0,r.SB)()],eT.prototype,"search",void 0),eS([(0,r.SB)()],eT.prototype,"badge",void 0),eT=eS([(0,c.Mo)("w3m-all-wallets-view")],eT);var ej=o.iv`
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
`,eP=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a};let eB=class extends o.oi{constructor(){super(...arguments),this.tabIdx=void 0,this.variant="icon",this.disabled=!1,this.imageSrc=void 0,this.alt=void 0,this.chevron=!1,this.loading=!1}render(){return o.dy`
      <button
        ?disabled=${!!this.loading||!!this.disabled}
        data-loading=${this.loading}
        data-iconvariant=${(0,d.o)(this.iconVariant)}
        tabindex=${(0,d.o)(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `}visualTemplate(){if("image"===this.variant&&this.imageSrc)return o.dy`<wui-image src=${this.imageSrc} alt=${this.alt??"list item"}></wui-image>`;if("square"===this.iconVariant&&this.icon&&"icon"===this.variant)return o.dy`<wui-icon name=${this.icon}></wui-icon>`;if("icon"===this.variant&&this.icon&&this.iconVariant){let t=["blue","square-blue"].includes(this.iconVariant)?"accent-100":"fg-200",e="square-blue"===this.iconVariant?"mdl":"md",i=this.iconSize?this.iconSize:e;return o.dy`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${i}
          background="transparent"
          iconColor=${t}
          backgroundColor=${t}
          size=${e}
        ></wui-icon-box>
      `}return null}loadingTemplate(){return this.loading?o.dy`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`:o.dy``}chevronTemplate(){return this.chevron?o.dy`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`:null}};eB.styles=[g.ET,g.ZM,ej],eP([(0,r.Cb)()],eB.prototype,"icon",void 0),eP([(0,r.Cb)()],eB.prototype,"iconSize",void 0),eP([(0,r.Cb)()],eB.prototype,"tabIdx",void 0),eP([(0,r.Cb)()],eB.prototype,"variant",void 0),eP([(0,r.Cb)()],eB.prototype,"iconVariant",void 0),eP([(0,r.Cb)({type:Boolean})],eB.prototype,"disabled",void 0),eP([(0,r.Cb)()],eB.prototype,"imageSrc",void 0),eP([(0,r.Cb)()],eB.prototype,"alt",void 0),eP([(0,r.Cb)({type:Boolean})],eB.prototype,"chevron",void 0),eP([(0,r.Cb)({type:Boolean})],eB.prototype,"loading",void 0),eB=eP([(0,w.M)("wui-list-item")],eB);let eO=class extends o.oi{constructor(){super(...arguments),this.wallet=p.P.state.data?.wallet}render(){if(!this.wallet)throw Error("w3m-downloads-view");return o.dy`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s","s","l","s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){return this.wallet?.chrome_store?o.dy`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?o.dy`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?o.dy`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?o.dy`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){this.wallet?.chrome_store&&n.j.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){this.wallet?.app_store&&n.j.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&n.j.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&n.j.openHref(this.wallet.homepage,"_blank")}};eO=function(t,e,i,o){var r,n=arguments.length,a=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(n<3?r(a):n>3?r(e,i,a):r(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}([(0,c.Mo)("w3m-downloads-view")],eO)},91308:function(t,e,i){"use strict";i.d(e,{V:function(){return a},i:function(){return c}});var o=i(93311),r=i(77177),n=i(47514);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let a=()=>new s;class s{}let l=new WeakMap,c=(0,n.XM)(class extends r.sR{render(t){return o.Ld}update(t,[e]){let i=e!==this.G;return i&&void 0!==this.G&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),o.Ld}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.G){let e=this.ht??globalThis,i=l.get(e);void 0===i&&(i=new WeakMap,l.set(e,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?l.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}})}}]);