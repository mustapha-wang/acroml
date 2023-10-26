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

/***/ "../acroML.Engine.mjs":
/*!********************************!*\
  !*** external "AcroML.Engine" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = AcroML.Engine;

/***/ }),

/***/ "../acroML.Culture.mjs":
/*!*********************************!*\
  !*** external "AcroML.culture" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = AcroML.culture;

/***/ }),

/***/ "../acroML.Utils.mjs":
/*!*******************************!*\
  !*** external "AcroML.utils" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = AcroML.utils;

/***/ }),

/***/ "../src/engine/acroML.Engine.Browser.mjs":
/*!***********************************************!*\
  !*** ../src/engine/acroML.Engine.Browser.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BrowserEngine: () => (/* binding */ AcroMLBrowserEngine),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _acroML_Utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../acroML.Utils.mjs */ \"../acroML.Utils.mjs\");\n/* harmony import */ var _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../acroML.Engine.mjs */ \"../acroML.Engine.mjs\");\n/* harmony import */ var _acroML_Culture_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../acroML.Culture.mjs */ \"../acroML.Culture.mjs\");\n/**\r\n * babel bug?:webpack打包后，AcroMLBrowserEngine实例访问不到祖先AcroMLEngine的静态函数buildDD\r\n */\r\n\r\n \r\n\r\nclass AcroMLBrowserEngine extends _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_1__{\r\n  constructor(){\r\n    super();\r\n  }\r\n  readDD(ddFile){\r\n    super.readDD(ddFile);\r\n    const async=true;\r\n    return new Promise(function(resolve, reject){\r\n      if (async){\r\n        fetch(ddFile).then(function(res){\r\n          //console.log(res);\r\n          if (res.status!=200){\r\n            let e=new Error(ddFile+\",fetch error:\" + res.statusText);\r\n            reject(e);\r\n          }\r\n          else{\r\n            //fetch的res.text()不能自动转换ucs2编码\r\n            //let s=res.text();blob();arrayBuffer()\r\n            /*\r\n            res.text().then(function(str){\r\n            resolve({str,buf:{}});\r\n            },reject);\r\n            */\r\n            res.arrayBuffer().then(function(buf){\r\n            //console.log(buf);\r\n            let str;\r\n            let uint8Array=new Uint8Array(buf);\r\n            //console.log(uint8Array);\r\n            if (uint8Array.length>1 && uint8Array[0]==0xFF && uint8Array[1]==0xFE){\r\n              //ucs-16LE编码，去掉BOM:FEFF\r\n              uint8Array=uint8Array.slice(2);\r\n              str=_acroML_Utils_mjs__WEBPACK_IMPORTED_MODULE_0__.ucs2_str_8(uint8Array);\r\n              //console.log(str);\r\n            }\r\n            else{\r\n              str=_acroML_Utils_mjs__WEBPACK_IMPORTED_MODULE_0__.utf8_str_2(uint8Array);\r\n            }\r\n            //console.log(str);\r\n            resolve({str,buf});\r\n          },reject);\r\n        }\r\n      },reject);\r\n    }\r\n    else{\r\n      //XMLHttpRequest能自动转换ucs2编码\r\n      //同步不能获取到原始文件大小\r\n      let xhr = new XMLHttpRequest();\r\n      xhr.open(\"GET\", ddFile, false);\r\n      //同步不能设置responseType\r\n      //xhr.responseType = 'arraybuffer';\r\n      xhr.send();\r\n      //console.log(xhr);\r\n      if(xhr.status != 200) {\r\n        let e=new Error(ddFile+\",request error:\" + xhr.statusText);\r\n        reject(e);\r\n      }\r\n      else{\r\n        let str=xhr.responseText;\r\n        //console.log(content);\r\n        resolve({buf:{},str});\r\n      }\r\n    }\r\n  });\r\n}\r\nstart(ops){\r\n  if (!this.LCID){\r\n    this.LCID=_acroML_Culture_mjs__WEBPACK_IMPORTED_MODULE_2__.tag2LCID(window.navigator.language);\r\n  }\r\nreturn super.start(ops);\r\n}\r\ngetDisplayValue(DDKey,LCID){\r\n  if (LCID==undefined) LCID=this.LCID;\r\n    return super.getDisplayValue(DDKey,LCID);\r\n  }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AcroMLBrowserEngine);\r\n\n\n//# sourceURL=webpack://AcroML/../src/engine/acroML.Engine.Browser.mjs?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("../src/engine/acroML.Engine.Browser.mjs");
/******/ 	var __webpack_export_target__ = (AcroML = typeof AcroML === "undefined" ? {} : AcroML);
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;