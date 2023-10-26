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

/***/ "../src/easyui/acroML.EasyUI.mjs":
/*!***************************************!*\
  !*** ../src/easyui/acroML.EasyUI.mjs ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   easyUI: () => (/* binding */ acroMLEasyUI)\n/* harmony export */ });\n/* harmony import */ var _acroML_Culture_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../acroML.Culture.mjs */ \"../acroML.Culture.mjs\");\n/* harmony import */ var _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../acroML.Engine.mjs */ \"../acroML.Engine.mjs\");\n\r\n\r\nlet acroMLEasyUI={\r\n  loadLocaleDD(rootPath,LCID){\r\n    //使用easyui官方的翻译字典\r\n    //console.log('LCID:',AcroMLEngine.instance.LCID);\r\n    let tag=_acroML_Culture_mjs__WEBPACK_IMPORTED_MODULE_0__.LCID2Tag(LCID);\r\n    if (!tag) tag=window.navigator.language;\r\n    //console.log('tag:',tag);\r\n    //把zh-CN修改为zh_CN\r\n    tag=tag.replace('-','_');\r\n    if (tag=='en_US') tag='en';\r\n    return new Promise(function(resolve,reject){\r\n      let easyUIDDFile=rootPath+'easyui-lang-'+tag+'.js';\r\n      //console.log(easyUIDDFile);\r\n      //easyui的locale**.js是es6文件，有export语法\r\n      //要么用支持es6的import函数，要么转成es5\r\n      //但是用import()和require()都会被webpack打包时会翻译成require内部的模组，导致找不到此模组\r\n      /*\r\n      _import(easyUIDDFile).then(function(r){\r\n        //console.log(r);\r\n        let easyUIDD=r.default||r;\r\n        //console.log(easyUIDD);\r\n        //window.Locale.use(easyUIDD);//vue版本才有\r\n        resolve(easyUIDD);\r\n      },function(e){\r\n        //console.log(e);\r\n        reject(e);\r\n      });\r\n      */\r\n      try{\r\n        let easyUIDD=acroml_require(easyUIDDFile,{esVersion:6});\r\n        resolve(easyUIDD);\r\n      }\r\n      catch(e){\r\n        reject(e);\r\n      }\r\n    });\r\n  },\r\n  loadLocaleDD_acroprise:function(rootDir){\r\n    //使用aroprise的方案，用自己的翻译字典\r\n    let easyUIDDFile=rootDir+'easyui-lang-en.js';\r\n    //console.log(easyUIDDFile);\r\n    return new Promise(function(resolve,reject){\r\n      try{\r\n        let easyUIDD=acroml_require(easyUIDDFile,{esVersion:6});\r\n        for(let catalog in easyUIDD){\r\n          let dd=easyUIDD[catalog];\r\n          for(let key in dd){\r\n            let value=dd[key];\r\n            if (Array.isArray(value)){\r\n              for(let i=0;i<value.length;i++){\r\n                value[i]=_acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_1__.instance.getDisplayValue(value[i]);\r\n              }\r\n            }\r\n            else{\r\n              dd[key]=_acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_1__.instance.getDisplayValue(value);\r\n            }\r\n          }\r\n        }\r\n        //console.log(easyUIDD);\r\n        //window.Locale.use(easyUIDD);//vue版本才有\r\n        resolve(easyUIDD);\r\n      }\r\n      catch(e){\r\n        reject(e);\r\n      }\r\n    });\r\n  }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (acroMLEasyUI);\r\n\n\n//# sourceURL=webpack://AcroML/../src/easyui/acroML.EasyUI.mjs?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("../src/easyui/acroML.EasyUI.mjs");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});