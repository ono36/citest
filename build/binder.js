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

/***/ "./src/bind.js":
/*!*********************!*\
  !*** ./src/bind.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Bind; }\n/* harmony export */ });\nclass Bind {\n  constructor(node, variable) {\n    this.node = node;\n    this.attribute_name = \"\";\n    this.variables = [];\n    this.watches = [];\n  }\n  feedBack(value) {\n    if (value === undefined) {\n      var node = this.node;\n      if (node.getAttribute(\"type\") === \"checkbox\") {\n        value = node.checked;\n      } else if (node.getAttribute(\"type\") === \"radio\") {\n        value = node.value;\n      } else {\n        value = node.value;\n        if (node.hasAttribute(\"number\")) {\n          value = Number(value);\n        }\n      }\n    }\n    //バインド変数にコントロールの値をセットする\n    var val = this.task.watches[0].setValue(value);\n  }\n  refresh(values) {\n    //バインドされた変数の値をノード属性にセット\n    var bind = this;\n    var check = false;\n    var node = bind.node;\n    var value = values[0];\n    if (bind.func) {\n      value = bind.func(values);\n    }\n    if (bind.attribute_name !== \"\") {\n      if (bind.attribute_name == \"disabled\") {\n        if (!value) {\n          node.removeAttribute(bind.attribute_name);\n          return;\n        }\n      }\n      if (node.tagName === \"SELECT\" && bind.attribute_name === \"options\") {\n        while (node.firstChild) {\n          node.removeChild(node.firstChild);\n        }\n        var options = value;\n        if (!Array.isArray(options)) {\n          options = [];\n        }\n        for (var i = 0; i < options.length; i++) {\n          var op = options[i];\n          var option = document.createElement(\"option\");\n          option.value = op.value;\n          option.innerText = op.name;\n          node.appendChild(option);\n        }\n      } else {\n        node.setAttribute(bind.attribute_name, value);\n      }\n      return;\n    }\n    node.setAttribute(\"content\", value);\n    switch (node.tagName) {\n      case \"INPUT\":\n      case \"SELECT\":\n      case \"TEXTAREA\":\n        if (node.getAttribute(\"type\") === \"checkbox\") {\n          node.checked = value;\n        }\n        if (node.getAttribute(\"type\") === \"radio\") {\n          node.checked = Boolean(value === node.value);\n        } else {\n          node.value = value;\n        }\n        Bind.fireEvent(node, \"input\");\n        break;\n      default:\n        if (value && (value instanceof HTMLElement || value.nodeName)) {\n          node.innerHTML = \"\";\n          node.appendChild(value);\n        } else {\n          node.textContent = value;\n        }\n    }\n  }\n  static fireEvent(elem, eventname, evt) {\n    if (document.all) {\n      elem.fireEvent(\"on\" + eventname);\n    } else {\n      if (!evt) {\n        evt = document.createEvent(\"Event\");\n      }\n      evt.initEvent(eventname, true, true);\n      elem.dispatchEvent(evt);\n    }\n  }\n}\n\n//# sourceURL=webpack://hdrpaint/./src/bind.js?");

/***/ }),

/***/ "./src/binder.js":
/*!***********************!*\
  !*** ./src/binder.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

<<<<<<< HEAD
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Watch: function() { return /* reexport safe */ _watch_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _watcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./watcher.js */ \"./src/watcher.js\");\n/* harmony import */ var _bind_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bind.js */ \"./src/bind.js\");\n/* harmony import */ var _watch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./watch.js */ \"./src/watch.js\");\n//バインド\n\n\n\n\nclass Binder {\n  /**\n   * コンストラクタ\n   */\n  constructor() {\n    this.binds = [];\n    this.variable_root = window;\n    this.watcher = new _watcher_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n\n  /**\n  *  初期化\n  *  @param {HTML_Element} element バインドを行うコントロールの親\n  *  @param {Object} variable_root バインドする変数の親\n  **/\n  init(element, variable_root) {\n    //初期化&バインド\n    if (variable_root) {\n      this.variable_root = variable_root;\n    }\n    this.bindNodes(dom, this.variable_root);\n    this.watcher.init();\n  }\n\n  /**\n  *  バインド\n  *  @param {HTML_Element} node バインドを行うコントロール\n  *  @param {Object} variable_root バインドする変数の親\n  *  @param {Object} variable_names バインドする変数のメンバ名\n  *  @param {Function} func 変数の値が変更された際に呼ばれる関数\n  **/\n  bind(node, attribute_name, variable_root, variable_names, func) {\n    var bind = this.binds.find(e => {\n      return e.node == node && e.attribute_name == attribute_name;\n    });\n    if (bind) {\n      return bind;\n    }\n    //ノードとバインド変数を渡してバインド情報を登録する\n    bind = new _bind_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n    bind.node = node;\n    bind.attribute_name = attribute_name;\n    if (!variable_root) {\n      variable_root = this.variable_root;\n    }\n    if (!Array.isArray(variable_names)) {\n      variable_names = [variable_names];\n    }\n    var variable_roots = [];\n    for (var i = 0; i < variable_names.length; i++) {\n      variable_roots.push(variable_root);\n    }\n    bind.func = func;\n    bind.binder = this;\n    this.binds.push(bind);\n    if (node.hasAttribute(\"feedback\") && bind.attribute_name == \"\") {\n      var f = node.getAttribute(\"feedback\");\n      if (f != null && f != \"\") {\n        bind.feedBack2 = Function(f);\n      }\n      node.addEventListener(\"change\", () => {\n        bind.feedBack();\n        if (bind.feedBack2) {\n          bind.feedBack2();\n        }\n      });\n    }\n\n    //\tvariable_names.forEach((name)=>{\n    //\t\tbind.watches.push(watcher.watch(variable_root,name));\n    //\t});\n    bind.task = this.watcher.watch(variable_roots, variable_names, watches => {\n      bind.refresh(watches);\n    });\n    return bind;\n  }\n  bindNodes(node, variable_root) {\n    var bindedNodes = node.querySelectorAll(\"*\");\n    bindedNodes.forEach(node => {\n      for (var i = 0; i < node.attributes.length; i++) {\n        var attribute_name = node.attributes[i].name;\n        if (attribute_name.indexOf(\":\") == -1) continue;\n        //if(attribute_name.indexOf(\"bind:\")!==0)continue;\n\n        var variable_names = node.getAttribute(attribute_name);\n        variable_names = variable_names.split(\",\");\n        attribute_name = attribute_name.replace(\":\", \"\");\n        attribute_name = attribute_name.replace(\"bind\", \"\");\n        var func = null;\n        if (node.hasAttribute(\"bindfunc\") && attribute_name == \"\") {\n          func = node.getAttribute(\"bindfunc\");\n          func = new Function('arg', func);\n        }\n        this.bind(node, attribute_name, null, variable_names, func);\n      }\n      ;\n    });\n  }\n}\nwindow.Binder = Binder;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Binder);\n\n//# sourceURL=webpack://hdrpaint/./src/binder.js?");
=======
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Watch: function() { return /* reexport safe */ _watch_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _watcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./watcher.js */ \"./src/watcher.js\");\n/* harmony import */ var _bind_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bind.js */ \"./src/bind.js\");\n/* harmony import */ var _watch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./watch.js */ \"./src/watch.js\");\n//バインド\n\n\n\n\nclass Binder {\n  /**\n   * コンストラクタ\n   */\n  constructor() {\n    this.binds = [];\n    this.variable_root = window;\n    this.watcher = new _watcher_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n\n  /**\n  *  初期化\n  *  @param {HTML_Element} element バインドを行うコントロールの親\n  *  @param {Object} variable_root バインドする変数の親\n  **/\n  init(element, variable_root) {\n    //初期化&バインド\n    if (variable_root) {\n      this.variable_root = variable_root;\n    }\n    this.bindNodes(element, this.variable_root);\n    this.watcher.init();\n  }\n\n  /**\n  *  バインド\n  *  @param {HTML_Element} node バインドを行うコントロール\n  *  @param {Object} variable_root バインドする変数の親\n  *  @param {Object} variable_names バインドする変数のメンバ名\n  *  @param {Function} func 変数の値が変更された際に呼ばれる関数\n  **/\n  bind(node, attribute_name, variable_root, variable_names, func) {\n    var bind = this.binds.find(e => {\n      return e.node == node && e.attribute_name == attribute_name;\n    });\n    if (bind) {\n      return bind;\n    }\n    //ノードとバインド変数を渡してバインド情報を登録する\n    bind = new _bind_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n    bind.node = node;\n    bind.attribute_name = attribute_name;\n    if (!variable_root) {\n      variable_root = this.variable_root;\n    }\n    if (!Array.isArray(variable_names)) {\n      variable_names = [variable_names];\n    }\n    var variable_roots = [];\n    for (var i = 0; i < variable_names.length; i++) {\n      variable_roots.push(variable_root);\n    }\n    bind.func = func;\n    bind.binder = this;\n    this.binds.push(bind);\n    if (node.hasAttribute(\"feedback\") && bind.attribute_name == \"\") {\n      var f = node.getAttribute(\"feedback\");\n      if (f != null && f != \"\") {\n        bind.feedBack2 = Function(f);\n      }\n      node.addEventListener(\"change\", () => {\n        bind.feedBack();\n        if (bind.feedBack2) {\n          bind.feedBack2();\n        }\n      });\n    }\n\n    //\tvariable_names.forEach((name)=>{\n    //\t\tbind.watches.push(watcher.watch(variable_root,name));\n    //\t});\n    bind.task = this.watcher.watch(variable_roots, variable_names, watches => {\n      bind.refresh(watches);\n    });\n    return bind;\n  }\n  bindNodes(node, variable_root) {\n    var bindedNodes = node.querySelectorAll(\"*\");\n    bindedNodes.forEach(node => {\n      for (var i = 0; i < node.attributes.length; i++) {\n        var attribute_name = node.attributes[i].name;\n        if (attribute_name.indexOf(\":\") == -1) continue;\n        //if(attribute_name.indexOf(\"bind:\")!==0)continue;\n\n        var variable_names = node.getAttribute(attribute_name);\n        variable_names = variable_names.split(\",\");\n        attribute_name = attribute_name.replace(\":\", \"\");\n        attribute_name = attribute_name.replace(\"bind\", \"\");\n        var func = null;\n        if (node.hasAttribute(\"bindfunc\") && attribute_name == \"\") {\n          func = node.getAttribute(\"bindfunc\");\n          func = new Function('arg', func);\n        }\n        this.bind(node, attribute_name, null, variable_names, func);\n      }\n      ;\n    });\n  }\n}\nwindow.Binder = Binder;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Binder);\n\n//# sourceURL=webpack://hdrpaint/./src/binder.js?");
>>>>>>> 42dca65 (fix)

/***/ }),

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/binder.js");
/******/ 	
/******/ })()
;