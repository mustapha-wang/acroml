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

/***/ "../src/dd/acroML.DD.TreeGrid.mjs":
/*!****************************************!*\
  !*** ../src/dd/acroML.DD.TreeGrid.mjs ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TreeGridDD: () => (/* binding */ AcroMLTreeGridDD),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _acroML_DD_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../acroML.DD.mjs */ \"../acroML.DD.mjs\");\n﻿/**\r\n * Parse TreeGrid format strings as Dictionary\r\n */\r\n\r\n\r\nclass AcroMLTreeGridDD extends _acroML_DD_mjs__WEBPACK_IMPORTED_MODULE_0__ {\r\n\tconstructor(){\r\n\t\tsuper();\r\n\t\tthis.content = \"\";\r\n\t}\r\n\t// / <summary>\r\n\t// / 解析treegrid格式json文件，放到Hash表中\r\n\t// / </summary>\r\n\tbuildingDD(){\r\n\t\tlet data=JSON.parse(this.content);\r\n\t\tlet self=this;\r\n\t\tfunction scanRows(rows){\r\n\t\t\tfor(let i=0;i<rows.length;i++){\r\n\t\t\t\tlet row=rows[i];\r\n\t\t\t\tfor(let j=0;j<data.displayValueColumns.length;j++){\r\n\t\t\t\t\tlet column=data.displayValueColumns[j];\r\n\t\t\t\t\tlet LCID=column.lng.LCID;\r\n\t\t\t\t\tfor(let k=0;k<column.SeqNos.length;k++){\r\n\t\t\t\t\t\tlet SeqNo=column.SeqNos[k];\r\n\t\t\t\t\t\tlet DisplayValue=row[LCID+'-'+SeqNo];\r\n\t\t\t\t\t\tif (!DisplayValue) continue;\r\n\t\t\t\t\t\tlet DDKey=row.DDKey;\r\n\t\t\t\t\t\tself.addDisplayValue(DDKey,LCID,SeqNo,DisplayValue);\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t\tif (row.children) scanRows(row.children);\r\n\t\t\t}\r\n\t\t}\r\n\t\tscanRows(data.rows);\r\n\t\tsuper.buildingDD();\t\t\r\n\t}\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AcroMLTreeGridDD);\r\n_acroML_DD_mjs__WEBPACK_IMPORTED_MODULE_0__.registerDD('.treegrid.json','utf8',[],AcroMLTreeGridDD);\r\n\n\n//# sourceURL=webpack://AcroML/../src/dd/acroML.DD.TreeGrid.mjs?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("../src/dd/acroML.DD.TreeGrid.mjs");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});