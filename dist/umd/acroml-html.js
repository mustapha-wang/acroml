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

/***/ "../src/html/acroML.HTML.TagMethod.Register.mjs":
/*!******************************************************!*\
  !*** ../src/html/acroML.HTML.TagMethod.Register.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./acroML.HTML.TagMethod.mjs */ \"../src/html/acroML.HTML.TagMethod.mjs\");\n\r\nfunction getDisplayValue(DD,el,propName,propValue,LCID){\r\n\t//保存原始的DDKey\r\n\tif (!el.acroDDKeys) el.acroDDKeys={};\r\n\tlet DDKey=el.acroDDKeys[propName];\r\n\tif (!DDKey){\r\n\t\tDDKey=propValue;\r\n\t\tel.acroDDKeys[propName]=propValue;\r\n\t}\r\n\treturn DD.getDisplayValue(DDKey, LCID);\r\n}\r\nfunction proc_a(DD, el, LCID) {\r\n\tlet elj=$(el);\r\n\tlet text = elj.text();\r\n\t//console.log(text);\r\n\tlet text2 = getDisplayValue(DD,el,'text',text,LCID);\r\n\telj.text(text2);\r\n}\r\nfunction proc_input(DD, el, LCID) {\r\n\tlet elj=$(el);\r\n\tlet type = elj.attr('type');\r\n\tif (type=='button'||type=='submit'){\r\n\t\tlet value=elj.attr('value');\r\n\t\tlet value2 = getDisplayValue(DD,el,'value',value, LCID);\r\n\t\telj.attr('value',value2);\r\n\t}\r\n\telse if (type=='text'){\r\n\t\tlet placeholder=elj.attr('placeholder');\r\n\t\tlet placeholder2 = getDisplayValue(DD,el,'placeholder',placeholder, LCID);\r\n\t\telj.attr('placeholder',placeholder2);\r\n\t}\r\n\t//input没有text属性\r\n\t// let text = elj.text();\r\n\t// let text2 = DD.getDisplayValue(text, LCID);\r\n\t// elj.text(text2);\r\n}\r\nfunction proc_textarea(DD, el, LCID) {\r\n\tlet elj=$(el);\r\n\tlet placeholder=elj.attr('placeholder');\r\n\tlet placeholder2 = getDisplayValue(DD,el,'placeholder',placeholder, LCID);\r\n\telj.attr('placeholder',placeholder2);\r\n}\r\nfunction proc_fieldset(DD,el,LCID){\r\n\tlet elj=$(el);\r\n\tlet legend=elj.children(\"legend\").text();\r\n\t//console.log(legend);\r\n\tlet legend2 = getDisplayValue(DD,el,'legend',legend, LCID);\r\n\telj.children(\"legend\").text(legend2);\r\n}\r\n\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"a\", proc_a);\r\n//div是容器\r\n//g_acroMLTagMethodStorage.registerTagMethod(\"div\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"header\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"title\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"h1\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"h2\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"h3\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"h4\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"h5\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"h6\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"span\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"label\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"button\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"i\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"b\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"strong\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"mark\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"s\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"del\", proc_a);\r\n//select下拉框的option\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"option\", proc_a);\r\n//table相关\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"caption\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"th\", proc_a);\r\n//文本输入元件，不注册\r\n//g_acroMLTagMethodStorage.registerTagMethod(\"textarea\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"p\", proc_a);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"input\", proc_input);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"textarea\", proc_textarea);\r\n\r\n//g_acroMLTagMethodStorage.registerTagMethod(\"fieldset\", proc_fieldset);\r\n_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].registerTagMethod(\"legend\", proc_a);\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (null);\r\n\n\n//# sourceURL=webpack://AcroML/../src/html/acroML.HTML.TagMethod.Register.mjs?");

/***/ }),

/***/ "../src/html/acroML.HTML.TagMethod.mjs":
/*!*********************************************!*\
  !*** ../src/html/acroML.HTML.TagMethod.mjs ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   htmlTagMethod: () => (/* binding */ htmlTagMethod)\n/* harmony export */ });\nlet tagMethods = {};\r\nlet acroMLHTMLTagMethod = {\r\n\tregisterTagMethod : function(tag, method) {\r\n\t\ttagMethods[tag.toUpperCase()] = method;\r\n\t},\r\n\tfindNearstTagMethod : function(tag) {\r\n\t\treturn tagMethods[tag.toUpperCase()];\r\n\t}\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (acroMLHTMLTagMethod);\r\nlet htmlTagMethod=acroMLHTMLTagMethod;\r\n\n\n//# sourceURL=webpack://AcroML/../src/html/acroML.HTML.TagMethod.mjs?");

/***/ }),

/***/ "../src/html/acroML.HTML.Translator.mjs":
/*!**********************************************!*\
  !*** ../src/html/acroML.HTML.Translator.mjs ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   htmlTranslator: () => (/* binding */ htmlTranslator)\n/* harmony export */ });\n/* harmony import */ var _acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./acroML.HTML.TagMethod.mjs */ \"../src/html/acroML.HTML.TagMethod.mjs\");\n\r\nlet acroMLHTMLTranslator={\r\n\ttranslateElement:function(DD,node,LCID,isTranslateChildren=true) {\r\n\t\t//console.log(node.constructor);\r\n\t\t//console.log(node.nodeType);\r\n\t\t//console.log(node.nodeName);//居然全是大写\r\n\t\tif ($(node).attr('translate')!='no'){\r\n\t\t\tlet tagMethod = _acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"].findNearstTagMethod(node.nodeName);\r\n\t\t\tif (tagMethod) {\r\n\t\t\t\ttagMethod(DD,node,LCID);\r\n\t\t\t}\r\n\t\t}\r\n\t\tif (isTranslateChildren==true){\r\n\t\t\tfor (let i = 0; i < node.childNodes.length; i++)\r\n\t\t\t\tacroMLHTMLTranslator.translateElement(DD,node.childNodes[i],LCID,isTranslateChildren);\r\n\t\t}\r\n\t},\r\n\ttranslatePage:function(DD,LCID,isTranslateChildren=true) {\r\n\t\tlet nodes=document.documentElement.childNodes;\r\n\t\tacroMLHTMLTranslator.translateElements(DD,nodes,LCID,isTranslateChildren);\r\n\t},\r\n\ttranslateElements:function(DD,elements,LCID,isTranslateChildren=true){\r\n\t\tfor(let i=0;i<elements.length;i++){\r\n\t\t\tlet el=elements[i];\r\n\t\t\t//console.log(el);\r\n\t\t\tacroMLHTMLTranslator.translateElement(DD,el,LCID,isTranslateChildren);\r\n\t\t}\r\n\t}\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (acroMLHTMLTranslator);\r\nlet htmlTranslator=acroMLHTMLTranslator;\r\n\n\n//# sourceURL=webpack://AcroML/../src/html/acroML.HTML.Translator.mjs?");

/***/ }),

/***/ "../src/html/html.mjs":
/*!****************************!*\
  !*** ../src/html/html.mjs ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   htmlTagMethod: () => (/* binding */ htmlTagMethod),\n/* harmony export */   htmlTranslator: () => (/* binding */ htmlTranslator)\n/* harmony export */ });\n/* harmony import */ var _acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./acroML.HTML.TagMethod.mjs */ \"../src/html/acroML.HTML.TagMethod.mjs\");\n/* harmony import */ var _acroML_HTML_TagMethod_Register_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./acroML.HTML.TagMethod.Register.mjs */ \"../src/html/acroML.HTML.TagMethod.Register.mjs\");\n/* harmony import */ var _acroML_HTML_Translator_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./acroML.HTML.Translator.mjs */ \"../src/html/acroML.HTML.Translator.mjs\");\n\r\n\r\n\r\nlet AcroML={\r\n  htmlTagMethod:_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\r\n  htmlTranslator:_acroML_HTML_Translator_mjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AcroML);\r\nlet htmlTagMethod=_acroML_HTML_TagMethod_mjs__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\r\nlet htmlTranslator=_acroML_HTML_Translator_mjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\r\n\n\n//# sourceURL=webpack://AcroML/../src/html/html.mjs?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("../src/html/html.mjs");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});