/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AcroML"] = factory();
	else
		root["AcroML"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../acroML.Engine.mjs":
/*!***********************************************************!*\
  !*** external ["acroml_require('acroml-core')","Engine"] ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = acroml_require('acroml-core').Engine;

/***/ }),

/***/ "../acroML.Culture.mjs":
/*!************************************************************!*\
  !*** external ["acroml_require('acroml-core')","culture"] ***!
  \************************************************************/
/***/ ((module) => {

module.exports = acroml_require('acroml-core').culture;

/***/ }),

/***/ "../src/selector/acroML.Selector.HTML.mjs":
/*!************************************************!*\
  !*** ../src/selector/acroML.Selector.HTML.mjs ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   buildHTMLSelector: () => (/* binding */ buildHTMLSelector),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../acroML.Engine.mjs */ \"../acroML.Engine.mjs\");\n/* harmony import */ var _acroML_Culture_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../acroML.Culture.mjs */ \"../acroML.Culture.mjs\");\n\r\n\r\nfunction acroBuildHTMLSelector(container){\r\n  function getLanguageText(lng){\r\n    return lng.LCID+','+\r\n      _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__.instance.getDisplayValue(lng.LanguageName_English)+','+\r\n      _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__.instance.getDisplayValue(lng.RegionName_English);\r\n  }\r\n  let select=$('<select/>');\r\n  select.change(function(e){\r\n      //console.log(e);\r\n      let LCID=$(e.target).val();\r\n      //console.log(LCID);\r\n      document.cookie='LCID='+LCID;\r\n      _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__.instance.LCID=LCID; \r\n      let options=select.children();\r\n      //console.log(options);\r\n      for(let i=0;i<options.length;i++){\r\n          let option=options[i];\r\n          //console.log(option);\r\n          let LCID2=$(option).val();\r\n          let lng=_acroML_Culture_mjs__WEBPACK_IMPORTED_MODULE_1__.findCultureByLCID(LCID2);\r\n          let text=getLanguageText(lng);\r\n          $(option).text(text);\r\n      }\r\n      _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__.onSwitchLanguage();\r\n  })\r\n  let lngs=[];\r\n  let isFoundEnglish=false;\r\n  for(let LCID2 in _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__.instance.dd.LCIDList){\r\n      if (LCID2==1033) isFoundEnglish=true;\r\n      let lng=_acroML_Culture_mjs__WEBPACK_IMPORTED_MODULE_1__.findCultureByLCID(LCID2);\r\n      lngs.push(lng);\r\n  }\r\n  if (!isFoundEnglish){\r\n      let lng=_acroML_Culture_mjs__WEBPACK_IMPORTED_MODULE_1__.findCultureByLCID(1033);\r\n      lngs.unshift(lng);\r\n  }\r\n  for(let i=0;i<lngs.length;i++){\r\n      let lng=lngs[i];\r\n      \r\n      let option='<option value=\"'+lng.LCID+'\"';\r\n      if (lng.LCID==_acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__.instance.LCID){\r\n          option=option+' selected';\r\n      }\r\n      option=option+'>'+getLanguageText(lng)+'</option>';\r\n      select.append(option);\r\n  }\r\n  select.val(_acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__.instance.LCID);\r\n  if (container) $(container).append(select);\r\n  return select;\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (acroBuildHTMLSelector);\r\nlet buildHTMLSelector=acroBuildHTMLSelector;\r\n\n\n//# sourceURL=webpack://AcroML/../src/selector/acroML.Selector.HTML.mjs?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("../src/selector/acroML.Selector.HTML.mjs");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});