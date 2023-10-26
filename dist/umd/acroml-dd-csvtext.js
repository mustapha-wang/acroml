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

/***/ "./acroML.CSVText.mjs":
/*!***************************************************!*\
  !*** external "acroml_require('acroml-csvtext')" ***!
  \***************************************************/
/***/ ((module) => {

module.exports = acroml_require('acroml-csvtext');

/***/ }),

/***/ "../acroML.DD.mjs":
/*!*******************************************************!*\
  !*** external ["acroml_require('acroml-core')","DD"] ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = acroml_require('acroml-core').DD;

/***/ }),

/***/ "../acroML.Resources.mjs":
/*!**************************************************************!*\
  !*** external ["acroml_require('acroml-core')","resources"] ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = acroml_require('acroml-core').resources;

/***/ }),

/***/ "../acroML.Utils.mjs":
/*!**********************************************************!*\
  !*** external ["acroml_require('acroml-core')","utils"] ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = acroml_require('acroml-core').utils;

/***/ }),

/***/ "../src/dd/acroML.DD.CSVText.mjs":
/*!***************************************!*\
  !*** ../src/dd/acroML.DD.CSVText.mjs ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CSVTextDD: () => (/* binding */ AcroMLCSVTextDD),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _acroML_DD_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../acroML.DD.mjs */ \"../acroML.DD.mjs\");\n/* harmony import */ var _acroML_Resources_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../acroML.Resources.mjs */ \"../acroML.Resources.mjs\");\n/* harmony import */ var _acroML_CSVText_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./acroML.CSVText.mjs */ \"./acroML.CSVText.mjs\");\n/* harmony import */ var _acroML_Utils_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../acroML.Utils.mjs */ \"../acroML.Utils.mjs\");\n﻿/**\r\n * Parse CSV(Comma-Separated Values) as Dictionary\r\n */\r\n\r\n\r\n\r\n\r\nclass AcroMLCSVTextDD extends _acroML_DD_mjs__WEBPACK_IMPORTED_MODULE_0__{\r\n\tconstructor(){\r\n\t\tsuper();\r\n\t\tthis.content = \"\";\r\n\t}\r\n\t// / <summary>\r\n\t// / 解析lng文件，放到Hash表中\r\n\t// / </summary>\r\n\tbuildingDD() {\r\n\t\t//console.log('call acroMLCSVTextDD.buildingDD');\r\n\t\tlet cvs=new _acroML_CSVText_mjs__WEBPACK_IMPORTED_MODULE_2__();\r\n\t\tcvs.content=this.content;\r\n\r\n\t\tlet vDDKeyIndex = null;\r\n\t\tlet vLCIDIndex = null;\r\n\t\tlet vSeqNoIndex = null;\r\n\t\tlet vDisplayValueIndex = null;\r\n\r\n\t\tthis.DD = {};\r\n\t\tlet self=this;\r\n\t\tlet fieldIndexes={};\r\n\t\tcvs.parse(function(SL){\r\n\t\t\tfor (let i = 0; i < SL.length; i++) {\r\n\t\t\t\tfieldIndexes[SL[i]]=i;\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\tconst needFields=['DDKey','LCID','DisplayValue'];\r\n\t\t\tfor(let i=0;i<needFields.length;i++){\r\n\t\t\t\tlet index=fieldIndexes[needFields[i]];\r\n\t\t\t\tif (index==null){\r\n\t\t\t\t\tthrow new Error(_acroML_Utils_mjs__WEBPACK_IMPORTED_MODULE_3__.printf(_acroML_Resources_mjs__WEBPACK_IMPORTED_MODULE_1__.S_NotFoundField,needFields[i]));\r\n\t\t\t\t}\r\n\t\t\t}\r\n\r\n\t\t\tvDDKeyIndex=fieldIndexes['DDKey'];\r\n\t\t\tvLCIDIndex=fieldIndexes['LCID'];\r\n\t\t\tvSeqNoIndex=fieldIndexes['SeqNo'];\r\n\t\t\tvDisplayValueIndex=fieldIndexes['DisplayValue'];\r\n\t\t},function(SL){\r\n\t\t\tlet DisplayValue=SL[vDisplayValueIndex];\r\n\t\t\tif (DisplayValue){\r\n\t\t\t\tself.addDisplayValue(SL[vDDKeyIndex], SL[vLCIDIndex],\r\n\t\t\t\t\t(vSeqNoIndex == null) ? \"0\" : SL[vSeqNoIndex],\r\n\t\t\t\t\tDisplayValue);\r\n\t\t\t}\r\n\t\t});\r\n\t\tsuper.buildingDD();\r\n\t}\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AcroMLCSVTextDD);\r\n_acroML_DD_mjs__WEBPACK_IMPORTED_MODULE_0__.registerDD('.lng','utf16le',[0xFF,0xFE],AcroMLCSVTextDD);\r\n_acroML_DD_mjs__WEBPACK_IMPORTED_MODULE_0__.registerDD('.csv.txt','utf8',[],AcroMLCSVTextDD);\r\n\n\n//# sourceURL=webpack://AcroML/../src/dd/acroML.DD.CSVText.mjs?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("../src/dd/acroML.DD.CSVText.mjs");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});