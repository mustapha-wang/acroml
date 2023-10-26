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

/***/ "../src/selector/acroML.Selector.React.mjs":
/*!*************************************************!*\
  !*** ../src/selector/acroML.Selector.React.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ReactSelector: () => (/* binding */ ReactSelector),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../acroML.Engine.mjs */ \"../acroML.Engine.mjs\");\n/* harmony import */ var _acroML_Culture_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../acroML.Culture.mjs */ \"../acroML.Culture.mjs\");\n/**\r\n * 不用jsx格式，index.js使用时无法加载jsx文件，用React.createElement创建\r\n * 这个组件是react专用，vue下用不到，nodejs后台也用不到，是否要从index.js引入？\r\n * 如果不引入:\r\n * （1）页面单独引入比较繁琐\r\n * （2）develpment模式从src、roduction模式从dist，不要部分从src部分从dist\r\n */\r\n\r\n\r\nfunction AcroMLReactSelector(props){\r\n  function onChange(e){\r\n    let LCID=e.target.value;\r\n    //console.log(LCID);\r\n    _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__.instance.LCID=LCID;\r\n    _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__.onSwitchLanguage();\r\n  }\r\n\r\n  //console.log('Com_Language_ComboBox render');\r\n  let LCIDs=[];\r\n  let isFoundEnglish=false;\r\n  if (_acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__.instance.dd){\r\n    for(let LCID in _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__.instance.dd.LCIDList){\r\n      if (LCID==1033) isFoundEnglish=true;\r\n      LCIDs.push(LCID);\r\n    }\r\n  }\r\n  if (!isFoundEnglish){\r\n    LCIDs.unshift(1033);\r\n  }\r\n  \r\n  let langs=LCIDs.map(function(LCID){\r\n    let lang=_acroML_Culture_mjs__WEBPACK_IMPORTED_MODULE_1__.findCultureByLCID(LCID);\r\n    return React.createElement('option',{key:LCID,value:LCID},\r\n      LCID+','+lang.LanguageName_Native+','+lang.RegionName_Native);\r\n  });\r\n  \r\n  let el=React.createElement('div',{},\r\n    React.createElement('span',{},t('Language')),\r\n    React.createElement('select',{value:_acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__.instance.LCID,onChange:onChange},langs)\r\n  );\r\n  return el;\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AcroMLReactSelector);\r\nlet ReactSelector=AcroMLReactSelector;\r\n\n\n//# sourceURL=webpack://AcroML/../src/selector/acroML.Selector.React.mjs?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("../src/selector/acroML.Selector.React.mjs");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});