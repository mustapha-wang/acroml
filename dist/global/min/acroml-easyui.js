(()=>{var e={d:(r,t)=>{for(var o in t)e.o(t,o)&&!e.o(r,o)&&Object.defineProperty(r,o,{enumerable:!0,get:t[o]})},o:(e,r)=>Object.prototype.hasOwnProperty.call(e,r),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},r={};(()=>{"use strict";e.r(r),e.d(r,{default:()=>a,easyUI:()=>n});const t=AcroML.culture,o=AcroML.Engine;let n={loadLocaleDD(e,r){let o=t.LCID2Tag(r);return o||(o=window.navigator.language),o=o.replace("-","_"),"en_US"==o&&(o="en"),new Promise((function(r,t){let n=e+"easyui-lang-"+o+".js";try{r(acroml_require(n,{esVersion:6}))}catch(e){t(e)}}))},loadLocaleDD_acroprise:function(e){let r=e+"easyui-lang-en.js";return new Promise((function(e,t){try{let t=acroml_require(r,{esVersion:6});for(let e in t){let r=t[e];for(let e in r){let t=r[e];if(Array.isArray(t))for(let e=0;e<t.length;e++)t[e]=o.instance.getDisplayValue(t[e]);else r[e]=o.instance.getDisplayValue(t)}}e(t)}catch(e){t(e)}}))}};const a=n})();var t=AcroML="undefined"==typeof AcroML?{}:AcroML;for(var o in r)t[o]=r[o];r.__esModule&&Object.defineProperty(t,"__esModule",{value:!0})})();