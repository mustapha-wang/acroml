(()=>{var e={d:(t,n)=>{for(var a in n)e.o(n,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:n[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},n={};(()=>{"use strict";e.r(n),e.d(n,{ReactSelector:()=>l,default:()=>c});const a=AcroML.Engine,r=AcroML.culture;function o(e){let n=[],o=!1;if(a.instance.dd)for(let e in a.instance.dd.LCIDList)1033==e&&(o=!0),n.push(e);o||n.unshift(1033);let c=n.map((function(e){let t=r.findCultureByLCID(e);return React.createElement("option",{key:e,value:e},e+","+t.LanguageName_Native+","+t.RegionName_Native)}));return React.createElement("div",{},React.createElement("span",{},t("Language")),React.createElement("select",{value:a.instance.LCID,onChange:function(e){let t=e.target.value;a.instance.LCID=t,a.onSwitchLanguage()}},c))}const c=o;let l=o})();var a=AcroML="undefined"==typeof AcroML?{}:AcroML;for(var r in n)a[r]=n[r];n.__esModule&&Object.defineProperty(a,"__esModule",{value:!0})})();