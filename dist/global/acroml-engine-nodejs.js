/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "../acroML.DD.mjs":
/*!****************************!*\
  !*** external "AcroML.DD" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = AcroML.DD;

/***/ }),

/***/ "../acroML.Engine.mjs":
/*!********************************!*\
  !*** external "AcroML.Engine" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = AcroML.Engine;

/***/ }),

/***/ "../src/engine/acroML.Engine.NodeJs.mjs":
/*!**********************************************!*\
  !*** ../src/engine/acroML.Engine.NodeJs.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   NodeJsEngine: () => (/* binding */ AcroMLNodeJsEngine),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _acroML_DD_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../acroML.DD.mjs */ \"../acroML.DD.mjs\");\n/* harmony import */ var _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../acroML.Engine.mjs */ \"../acroML.Engine.mjs\");\n/**\r\n * AcroMLNodeJsEngine在nodejs后台工作，多用户并发，自身没有固定的LCID\r\n */\r\n\r\n \r\n\r\nclass AcroMLNodeJsEngine extends _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_1__{\r\n    readDD(ddFile){\r\n        super.readDD(ddFile);\r\n        return new Promise(function(resolve, reject){\r\n            let fs = require(\"fs\");\r\n            //注意：readFileSync0.10.x之前版本，第二个参数是字串类型\"utf16le\"；之后版本，是object类型{encoding:\"utf16le\"}\r\n            let buf = fs.readFileSync(ddFile);\r\n            //console.log(buf[0],buf[1]);\r\n            let encoding='utf8';\r\n            let bomLen=0;\r\n            let ddInfo=_acroML_DD_mjs__WEBPACK_IMPORTED_MODULE_0__.getDDByFileExt(ddFile);\r\n            if (ddInfo){\r\n                encoding=ddInfo.encoding;\r\n                bomLen=ddInfo.bom.length;\r\n            }\r\n            else{\r\n                if (buf.length>1 && buf[0]==0xFF && buf[1]==0xFE){\r\n                    //utf16le格式\r\n                    encoding='utf16le';\r\n                    bomLen=2;\r\n                }\r\n                else if (buf.length>1 && buf[0]==0xFE && buf[1]==0xFF){\r\n                    //utf16be格式\r\n                    encoding='utf16be';\r\n                    bomLen=2;\r\n                }\r\n                else if (buf.length>2 && buf[0]==0xEF && buf[1]==0xBB && buf[2]==0xBF){\r\n                    encoding='utf8';\r\n                    bomLen=3;\r\n                }\r\n            }\r\n            let str=buf.toString(encoding,bomLen);\r\n            //console.log(content);\r\n            resolve({str,buf});\r\n        });\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AcroMLNodeJsEngine);\r\n\n\n//# sourceURL=webpack://AcroML/../src/engine/acroML.Engine.NodeJs.mjs?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("../src/engine/acroML.Engine.NodeJs.mjs");
/******/ 	var __webpack_export_target__ = (AcroML = typeof AcroML === "undefined" ? {} : AcroML);
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;