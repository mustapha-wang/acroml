(()=>{var e={d:(t,r)=>{for(var a in r)e.o(r,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:r[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};(()=>{"use strict";e.r(t),e.d(t,{default:()=>n,htmlTagMethod:()=>d,htmlTranslator:()=>i});let r={};const a={registerTagMethod:function(e,t){r[e.toUpperCase()]=t},findNearstTagMethod:function(e){return r[e.toUpperCase()]}};function o(e,t,r,a,o){t.acroDDKeys||(t.acroDDKeys={});let l=t.acroDDKeys[r];return l||(l=a,t.acroDDKeys[r]=a),e.getDisplayValue(l,o)}function l(e,t,r){let a=$(t),l=o(e,t,"text",a.text(),r);a.text(l)}a.registerTagMethod("a",l),a.registerTagMethod("header",l),a.registerTagMethod("title",l),a.registerTagMethod("h1",l),a.registerTagMethod("h2",l),a.registerTagMethod("h3",l),a.registerTagMethod("h4",l),a.registerTagMethod("h5",l),a.registerTagMethod("h6",l),a.registerTagMethod("span",l),a.registerTagMethod("label",l),a.registerTagMethod("button",l),a.registerTagMethod("i",l),a.registerTagMethod("b",l),a.registerTagMethod("strong",l),a.registerTagMethod("mark",l),a.registerTagMethod("s",l),a.registerTagMethod("del",l),a.registerTagMethod("option",l),a.registerTagMethod("caption",l),a.registerTagMethod("th",l),a.registerTagMethod("p",l),a.registerTagMethod("input",(function(e,t,r){let a=$(t),l=a.attr("type");if("button"==l||"submit"==l){let l=o(e,t,"value",a.attr("value"),r);a.attr("value",l)}else if("text"==l){let l=o(e,t,"placeholder",a.attr("placeholder"),r);a.attr("placeholder",l)}})),a.registerTagMethod("textarea",(function(e,t,r){let a=$(t),l=o(e,t,"placeholder",a.attr("placeholder"),r);a.attr("placeholder",l)})),a.registerTagMethod("legend",l);let g={translateElement:function(e,t,r,o=!0){if("no"!=$(t).attr("translate")){let o=a.findNearstTagMethod(t.nodeName);o&&o(e,t,r)}if(1==o)for(let a=0;a<t.childNodes.length;a++)g.translateElement(e,t.childNodes[a],r,o)},translatePage:function(e,t,r=!0){let a=document.documentElement.childNodes;g.translateElements(e,a,t,r)},translateElements:function(e,t,r,a=!0){for(let o=0;o<t.length;o++){let l=t[o];g.translateElement(e,l,r,a)}}};const n={htmlTagMethod:a,htmlTranslator:g};let d=a,i=g})();var r=AcroML="undefined"==typeof AcroML?{}:AcroML;for(var a in t)r[a]=t[a];t.__esModule&&Object.defineProperty(r,"__esModule",{value:!0})})();