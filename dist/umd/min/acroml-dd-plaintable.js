!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.AcroML=t():e.AcroML=t()}(this,(()=>(()=>{"use strict";var e={d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{PlainTableDD:()=>r,default:()=>n});const o=acroml_require("acroml-core").DD;class r extends o{constructor(){super(),this.content=""}buildingDD(){let e,t=JSON.parse(this.content),o=[];for(let r=0;r<t.meta.length;r++){let n=t.meta[r];if("CatalogID"!=n&&"SortNumber"!=n)if("DDKey"==n)e=r;else{let e=n.split("-");if(2!=e.length)continue;let t=e[0];if(isNaN(parseFloat(t))||Number.isFinite(t))continue;t=parseInt(t);let l=e[1];o.push({index:r,LCID:t,SeqNo:l})}}for(let r=0;r<t.rows.length;r++){let n=t.rows[r];for(let t=0;t<o.length;t++){let r=n[o[t].index];if(!r)continue;let l=n[e];this.addDisplayValue(l,o[t].LCID,o[t].SeqNo,r)}}super.buildingDD()}}const n=r;return o.registerDD(".plaintable.json","utf8",[],r),t})()));