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

/***/ "../acroML.Resources.mjs":
/*!**************************************************************!*\
  !*** external ["acroml_require('acroml-core')","resources"] ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = acroml_require('acroml-core').resources;

/***/ }),

/***/ "../src/dd/acroML.CSVText.mjs":
/*!************************************!*\
  !*** ../src/dd/acroML.CSVText.mjs ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CSVText: () => (/* binding */ AcroMLCSVText),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _acroML_Resources_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../acroML.Resources.mjs */ \"../acroML.Resources.mjs\");\n﻿/**\r\n * Comma-Separated Values\r\n */\r\n\r\nclass AcroMLCSVText {\r\n\tconstructor(){\r\n\t\tthis.content = \"\";\r\n\t\tthis.QuoteChar = '\"';\r\n\t\tthis.recordIndex = 0;\r\n\t}\r\n\tDecodeStr(Source, AQuoteChar) {\r\n\t\tlet i, j;\r\n\t\tlet P;\r\n\t\tlet PResult;\r\n\t\tlet ALen;\r\n\t\tlet Result;\r\n\t\tlet c;\r\n\r\n\t\tALen = Source.length;\r\n\t\tif (ALen <= 0)\r\n\t\t\treturn \"\";\r\n\r\n\t\tP = 0;\r\n\t\tif ((ALen == 2) && (Source[P] == AQuoteChar)\r\n\t\t\t&& (Source[P + 1] == AQuoteChar))\r\n\t\t\treturn \"\";\r\n\r\n\t\tResult = new Array(ALen);\r\n\r\n\t\tPResult = 0;\r\n\t\ti = 0;\r\n\t\tj = 0;\r\n\t\twhile (i < ALen) {\r\n\t\t\tc = Source[P];\r\n\t\t\tif (c==AQuoteChar) {\r\n\t\t\t\ti++;\r\n\t\t\t\tif (i >= ALen)\r\n\t\t\t\t\tbreak;\r\n\t\t\t\tP++;\r\n\t\t\t\tc = Source[P];\r\n\t\t\t\tif (c==AQuoteChar) {\r\n\t\t\t\t\tResult[PResult] = AQuoteChar;\r\n\t\t\t\t\tj++;\r\n\t\t\t\t\tPResult++;\r\n\t\t\t\t} else {\r\n\t\t\t\t\tcontinue;\r\n\t\t\t\t}\r\n\t\t\t} else if (c=='%') {\r\n\t\t\t\ti++;\r\n\t\t\t\tif (i >= ALen) break;\r\n\t\t\t\tP++;\r\n\t\t\t\tc = Source[P];\r\n\t\t\t\tif (c=='c')\tResult[PResult] = '\\n';\r\n\t\t\t\telse if (c=='n') Result[PResult] = '\\r';\r\n\t\t\t\telse if (c=='%') Result[PResult] = '%';\r\n\t\t\t\telse if (c=='0') Result[PResult] = '\\u0000';\r\n\t\t\t\telse throw new Error(_acroML_Resources_mjs__WEBPACK_IMPORTED_MODULE_0__.S_CSVFormatError);\r\n\t\t\t\tj++;\r\n\t\t\t\tPResult++;\r\n\t\t\t} else {\r\n\t\t\t\tResult[PResult] = c;\r\n\t\t\t\tj++;\r\n\t\t\t\tPResult++;\r\n\t\t\t}\r\n\t\t\ti++;\r\n\t\t\tif (i >= ALen)\r\n\t\t\t\tbreak;\r\n\t\t\tP++;\r\n\t\t}\r\n\t\treturn Result.slice(0, j).join('');\r\n\t}\r\n\treadRecord(SR, SL) {\r\n\t\tif (this.recordIndex >= SR.length)\r\n\t\t\treturn false;\r\n\r\n\t\tlet S, vValue;\r\n\t\tlet i, vIndex1;\r\n\t\tlet vIsInString;\r\n\r\n\t\tS = SR[this.recordIndex];\r\n\t\tthis.recordIndex++;\r\n\t\tif (S == null | S.length <= 0)\r\n\t\t\treturn false;\r\n\r\n\t\tvIndex1 = 0;\r\n\t\tvIsInString = false;\r\n\t\tSL.length = 0;\r\n\r\n\t\tfor (i = 0; i < S.length; i++) {\r\n\t\t\tswitch (S.charAt(i)) {\r\n\t\t\tcase '\"':\r\n\t\t\t\tvIsInString = !vIsInString;\r\n\t\t\t\tbreak;\r\n\t\t\tcase ',':\r\n\t\t\t\tif (!vIsInString) {\r\n\t\t\t\t\tvValue = S.substring(vIndex1, i);\r\n\t\t\t\t\tvValue = this.DecodeStr(vValue, this.QuoteChar);\r\n\t\t\t\t\tSL.push(vValue);\r\n\t\t\t\t\tvIndex1 = i + 1;\r\n\t\t\t\t}\r\n\t\t\t\tbreak;\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn true;\r\n\t}\r\n\r\n\t// / <summary>\r\n\t// / 解析lng文件\r\n\t// / </summary>\r\n\tparse(onColumn,onRow) {\r\n\t\t//console.log('call acroMLTextDD.buildingDD');\r\n\t\tlet SR;\r\n\t\tlet SL;\r\n\r\n\t\tSR = this.content.split(\"\\r\\n\");\r\n\t\tSL = new Array();\r\n\t\tthis.recordIndex = 0;\r\n\t\tif (!this.readRecord(SR, SL))\r\n\t\t\treturn;\r\n\t\tonColumn(SL);\r\n\r\n\t\twhile (true) {\r\n\t\t\tif (!this.readRecord(SR, SL))\r\n\t\t\t\treturn;\r\n\t\t\tonRow(SL);\r\n\t\t}\t\r\n\t}\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AcroMLCSVText);\r\n\n\n//# sourceURL=webpack://AcroML/../src/dd/acroML.CSVText.mjs?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("../src/dd/acroML.CSVText.mjs");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});