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

/***/ "../src/selector/acroML.Selector.Vue.mjs":
/*!***********************************************!*\
  !*** ../src/selector/acroML.Selector.Vue.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   VueSelector: () => (/* binding */ VueSelector),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../acroML.Engine.mjs */ \"../acroML.Engine.mjs\");\n/* harmony import */ var _acroML_Culture_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../acroML.Culture.mjs */ \"../acroML.Culture.mjs\");\n\r\n\r\nlet AcroMLVueSelector={\r\n  data(){\r\n    let LCIDs=[];\r\n    let isFoundEnglish=false;\r\n    for(let LCID in _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__.instance.dd.LCIDList){\r\n      if (LCID==1033) isFoundEnglish=true;\r\n      LCIDs.push(LCID);\r\n    }\r\n    if (!isFoundEnglish){\r\n      LCIDs.unshift(1033);\r\n    }\r\n    let langs=LCIDs.map(function(LCID){\r\n      let lang=_acroML_Culture_mjs__WEBPACK_IMPORTED_MODULE_1__.findCultureByLCID(LCID);\r\n      return lang;\r\n    });\r\n    return {\r\n      langs,\r\n      AcroMLEngine: _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__,\r\n      onChange(e){\r\n        let LCID=e.target.value;\r\n        _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__.instance.LCID=LCID;\r\n        _acroML_Engine_mjs__WEBPACK_IMPORTED_MODULE_0__.onSwitchLanguage();\r\n      }\r\n    }\r\n  },\r\n  template:`\r\n    <div>\r\n      <span>{{t('Language:')}}</span>\r\n      <select :value='AcroMLEngine.instance.LCID' :onChange='onChange'>\r\n        <option v-for=\"item in langs\" :key=item.LCID :value=item.LCID>\r\n          {{item.LCID+','+t(item.LanguageName_English)+','+t(item.RegionName_English)}}\r\n        </option>\r\n      </select>\r\n    </div>\r\n  `\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AcroMLVueSelector);\r\nlet VueSelector=AcroMLVueSelector;\r\n\n\n//# sourceURL=webpack://AcroML/../src/selector/acroML.Selector.Vue.mjs?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("../src/selector/acroML.Selector.Vue.mjs");
/******/ 	var __webpack_export_target__ = (AcroML = typeof AcroML === "undefined" ? {} : AcroML);
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;