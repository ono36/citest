/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Task; }\n/* harmony export */ });\nclass Task {\n  constructor(watches, callback) {\n    this.watches = watches;\n    this.callback = callback;\n  }\n  exec() {\n    var flg = false;\n    for (var i = 0; i < this.watches.length; i++) {\n      flg = flg || this.watches[i].change_flg;\n    }\n    if (flg) {\n      var values = this.watches.map(w => w.getValue(0));\n      this.callback(values);\n    }\n  }\n}\n\n//# sourceURL=webpack://hdrpaint/./src/task.js?");

/***/ }),

/***/ "./src/watch.js":
/*!**********************!*\
  !*** ./src/watch.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Watch; }\n/* harmony export */ });\nclass Watch {\n  constructor(variable_root, variable_name, callback) {\n    this.variable_root = variable_root;\n    this.vairable_name = variable_name;\n    this.variable_direction = variable_name.split(\".\");\n    this.callback = callback;\n    this.old_value = this.getValue();\n  }\n  getValue(n) {\n    //監視対象の変数の値を取得\n    // n=1なら親を取得\n    if (!n) {\n      n = 0;\n    }\n    var value = this.variable_root;\n    var v = this.variable_direction;\n    for (var j = 0; j < v.length - n; j++) {\n      if (value == undefined) {\n        value = null;\n        break;\n      }\n      if (!value) {\n        break;\n      }\n      value = value[v[j]];\n    }\n    return value;\n  }\n  setValue(value) {\n    //監視変数に値をセットする\n    var val = this.getValue(1); //対象の変数の親を取得\n    val[this.variable_direction[this.variable_direction.length - 1]] = value;\n  }\n  refresh() {\n    //バインドされた変数の値をノード属性にセット\n    var value = this.getValue(0);\n    if (value && (value instanceof HTMLElement || value.nodeName)) {} else {\n      if (typeof value === 'object') {\n        value = JSON.stringify(value);\n      }\n    }\n    this.change_flg = this.old_value !== value;\n    this.old_value = value;\n  }\n}\n\n//# sourceURL=webpack://hdrpaint/./src/watch.js?");

/***/ }),

/***/ "./src/watcher.js":
/*!************************!*\
  !*** ./src/watcher.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Watcher; }\n/* harmony export */ });\n/* harmony import */ var _task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task.js */ \"./src/task.js\");\n/* harmony import */ var _watch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./watch.js */ \"./src/watch.js\");\n// 変数監視ライブラリ\n\n\nclass Watcher {\n  constructor() {\n    this.watches = [];\n    this.tasks = [];\n  }\n  init() {\n    //初期化&バインド\n    //\t\tvar func =()=>{\n    //\t\t\tthis.refresh();\n    //\t\t\twindow.requestAnimationFrame(func);\n    //\t\t}\n    //\t\tfunc();\n    var func = () => {\n      this.refresh();\n      window.requestAnimationFrame(func);\n    };\n    func();\n  }\n  watch(variable_roots, variable_names, func) {\n    var ws = [];\n    if (!Array.isArray(variable_names)) {\n      variable_names = [variable_names];\n    }\n    if (!Array.isArray(variable_roots)) {\n      var root = variable_roots;\n      variable_roots = [];\n      for (var i = 0; i < variable_names.length; i++) {\n        variable_roots.push(root);\n      }\n    }\n    for (var i = 0; i < variable_names.length; i++) {\n      var variable_root = variable_roots[i];\n      var variable_name = variable_names[i];\n      var w = this.watches.find(f => {\n        return variable_root == f.variable_root && f.variable_name == variable_name;\n      });\n      if (!w) {\n        //変数監視が無い場合は追加\n        w = new _watch_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](variable_root, variable_name, func);\n        this.watches.push(w);\n      }\n      ws.push(w);\n    }\n    var task = new _task_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ws, func);\n    this.tasks.push(task);\n    return task;\n  }\n  refresh() {\n    //監視対象をチェック\n    this.watches.forEach(w => {\n      w.refresh();\n    });\n\n    //タスク実行\n    this.tasks.forEach(w => {\n      w.exec();\n    });\n  }\n  static getValue(root, name, flg = 0) {\n    var v = name.split(\".\");\n    var value = root;\n    for (var j = 0; j < v.length - flg; j++) {\n      if (value == undefined) {\n        value = null;\n        break;\n      }\n      if (!value) {\n        break;\n      }\n      value = value[v[j]];\n    }\n    return value;\n  }\n  static setValue(root, name, value) {\n    var v = name.split(\".\");\n    var val = this.getValue(root, name, 1); //対象の変数の親を取得\n    val[v[v.length - 1]] = value;\n  }\n}\n\n//# sourceURL=webpack://hdrpaint/./src/watcher.js?");

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
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/watcher.js");
/******/ 	
/******/ })()
;