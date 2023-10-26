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

/***/ "../acroML.DD.mjs":
/*!*******************************************************!*\
  !*** external ["acroml_require('acroml-core')","DD"] ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = acroml_require('acroml-core').DD;

/***/ }),

/***/ "../src/dd/acroML.DD.PlainTable.mjs":
/*!******************************************!*\
  !*** ../src/dd/acroML.DD.PlainTable.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PlainTableDD: () => (/* binding */ AcroMLPlainTableDD),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _acroML_DD_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../acroML.DD.mjs */ \"../acroML.DD.mjs\");\n﻿/**\r\n * Parse Plain Table format strings as Dictionary\r\n */\r\n\r\nclass AcroMLPlainTableDD extends _acroML_DD_mjs__WEBPACK_IMPORTED_MODULE_0__ {\r\n\tconstructor(){\r\n\t\tsuper();\r\n\t\tthis.content = \"\";\r\n\t}\r\n\t// / <summary>\r\n\t// / 解析plaintable格式json文件，放到Hash表中\r\n\t// / </summary>\r\n\tbuildingDD() {\r\n\t\tlet data=JSON.parse(this.content);\r\n\t\tlet DDKeyFieldIndex;\r\n\t\tlet fields=[];\r\n\t\tfor(let i=0;i<data.meta.length;i++){\r\n\t\t\tlet field=data.meta[i];\r\n\t\t\tif (field=='CatalogID' || field=='SortNumber') continue;\r\n\t\t\tif (field=='DDKey') DDKeyFieldIndex=i;\r\n\t\t\telse{\r\n\t\t\t\tlet parts=field.split('-');\r\n\t\t\t\tif (parts.length!=2) continue;\r\n\t\t\t\tlet LCID=parts[0];\r\n\t\t\t\tif (isNaN(parseFloat(LCID))|| Number.isFinite(LCID)) continue;\r\n\t\t\t\tLCID=parseInt(LCID);\r\n\t\t\t\tlet SeqNo=parts[1];\r\n\t\t\t\tfields.push({index:i,LCID,SeqNo});\r\n\t\t\t}\r\n\t\t}\r\n\t\t//console.log(fields);\r\n\t\tfor(let i=0;i<data.rows.length;i++){\r\n\t\t\tlet row=data.rows[i];\r\n\t\t\tfor(let j=0;j<fields.length;j++){\r\n\t\t\t\tlet DisplayValue=row[fields[j].index];\r\n\t\t\t\tif (!DisplayValue) continue;\r\n\t\t\t\tlet DDKey=row[DDKeyFieldIndex];\r\n\t\t\t\tthis.addDisplayValue(DDKey,fields[j].LCID,fields[j].SeqNo,DisplayValue);\r\n\t\t\t}\r\n\t\t}\r\n\t\tsuper.buildingDD();\t\t\r\n\t}\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AcroMLPlainTableDD);\r\n_acroML_DD_mjs__WEBPACK_IMPORTED_MODULE_0__.registerDD('.plaintable.json','utf8',[],AcroMLPlainTableDD);\r\n\n\n//# sourceURL=webpack://AcroML/../src/dd/acroML.DD.PlainTable.mjs?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("../src/dd/acroML.DD.PlainTable.mjs");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});