/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./example/javascript/index.js":
/*!*************************************!*\
  !*** ./example/javascript/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _random_noise_worklet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./random-noise.worklet */ \"./example/javascript/random-noise.worklet.js\");\n/* harmony import */ var _random_noise_worklet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_random_noise_worklet__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst playBtn = document.getElementById(\"play-btn\");\r\nconst stopBtn = document.getElementById(\"stop-btn\");\r\n\r\nconst audioCtx = new AudioContext();\r\n\r\nconsole.log((_random_noise_worklet__WEBPACK_IMPORTED_MODULE_0___default()));\r\n\r\nplayBtn.addEventListener(\"click\", async () => {\r\n    await audioCtx.audioWorklet.addModule((_random_noise_worklet__WEBPACK_IMPORTED_MODULE_0___default()));\r\n    const audioBufferSource = audioCtx.createBufferSource();\r\n    const audioWorkletNode = new AudioWorkletNode(audioCtx, \"audio-decoder\");\r\n\r\n    audioWorkletNode.port.postMessage({\r\n        message: \"INIT\"\r\n    })\r\n\r\n    audioWorkletNode.port.onmessage = (e) => {\r\n        const {message} = e.data;\r\n\r\n        switch (message) {\r\n            case \"INIT\":\r\n                console.log(\"Init audio worklet node success.\");\r\n                break;\r\n\r\n            default:\r\n                console.log(\"Unhandled message from audio decoder.\");\r\n        }\r\n    }\r\n\r\n    audioBufferSource.connect(audioWorkletNode);\r\n    audioWorkletNode.connect(audioCtx.destination);\r\n    audioBufferSource.start();\r\n})\r\n\r\nstopBtn.addEventListener(\"click\", async () => {\r\n    const startTime = performance.now();\r\n    await audioCtx.suspend();\r\n    console.log(performance.now() - startTime);\r\n})\n\n//# sourceURL=webpack://audio-worklet-loader/./example/javascript/index.js?");

/***/ }),

/***/ "./example/javascript/random-noise.worklet.js":
/*!****************************************************!*\
  !*** ./example/javascript/random-noise.worklet.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./loader/workletToBlob.js */ \"./loader/workletToBlob.js\")(\"/*\\n * ATTENTION: The \\\"eval\\\" devtool has been used (maybe by default in mode: \\\"development\\\").\\n * This devtool is neither made for production nor for readable output files.\\n * It uses \\\"eval()\\\" calls to create a separate source file in the browser devtools.\\n * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)\\n * or disable the default devtool with \\\"devtool: false\\\".\\n * If you are looking for production-ready output files, see mode: \\\"production\\\" (https://webpack.js.org/configuration/mode/).\\n */\\n/******/ (() => { // webpackBootstrap\\n/******/ \\t\\\"use strict\\\";\\n/******/ \\tvar __webpack_modules__ = ({\\n\\n/***/ \\\"./example/javascript/random-noise.worklet.js\\\":\\n/*!****************************************************!*\\\\\\n  !*** ./example/javascript/random-noise.worklet.js ***!\\n  \\\\****************************************************/\\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\\n\\neval(\\\"__webpack_require__.r(__webpack_exports__);\\\\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \\\\\\\"./example/javascript/utils.js\\\\\\\");\\\\n\\\\r\\\\n\\\\r\\\\nclass AudioDecoder extends AudioWorkletProcessor {\\\\r\\\\n    initWorklet = false;\\\\r\\\\n    constructor() {\\\\r\\\\n        super();\\\\r\\\\n\\\\r\\\\n        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.log)(\\\\\\\"[AUDIO-WORKLET-PROCESSOR]: Init.\\\\\\\");\\\\r\\\\n\\\\r\\\\n        this.port.onmessage = (e) => {\\\\r\\\\n            const {message} = e.data;\\\\r\\\\n\\\\r\\\\n            switch (message) {\\\\r\\\\n                case \\\\\\\"INIT\\\\\\\":\\\\r\\\\n                    console.log(\\\\\\\"[AUDIO-DECODER]: Init audio worklet node processor.\\\\\\\");\\\\r\\\\n                    break;\\\\r\\\\n\\\\r\\\\n                default:\\\\r\\\\n                    console.log(\\\\\\\"[AUDIO-DECODER]: Unhandled message.\\\\\\\");\\\\r\\\\n                    break;\\\\r\\\\n            }\\\\r\\\\n        }\\\\r\\\\n    }\\\\r\\\\n\\\\r\\\\n    process(inputs, outputs) {\\\\r\\\\n        const output = outputs[0];\\\\r\\\\n\\\\r\\\\n        for (let channel = 0; channel < output.length; ++channel) {\\\\r\\\\n            const outputChannel = output[channel];\\\\r\\\\n\\\\r\\\\n            for (let i = 0; i < outputChannel.length; ++i) {\\\\r\\\\n                // Generate a random number between -1 and 1\\\\r\\\\n                // Assign the random value to the output channel\\\\r\\\\n                outputChannel[i] = Math.random() * 2 - 1;\\\\r\\\\n            }\\\\r\\\\n        }\\\\r\\\\n\\\\r\\\\n        if (!this.initWorklet) {\\\\r\\\\n            // @ts-ignore\\\\r\\\\n            this.port.postMessage({message: \\\\\\\"INIT\\\\\\\"});\\\\r\\\\n            this.initWorklet = true;\\\\r\\\\n        }\\\\r\\\\n\\\\r\\\\n        return true;\\\\r\\\\n    }\\\\r\\\\n}\\\\r\\\\n\\\\r\\\\n// Register the AudioWorklet processor\\\\r\\\\nregisterProcessor(\\\\\\\"audio-decoder\\\\\\\", AudioDecoder);\\\\n\\\\n//# sourceURL=webpack://audio-worklet-loader/./example/javascript/random-noise.worklet.js?\\\");\\n\\n/***/ }),\\n\\n/***/ \\\"./example/javascript/utils.js\\\":\\n/*!*************************************!*\\\\\\n  !*** ./example/javascript/utils.js ***!\\n  \\\\*************************************/\\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\\n\\neval(\\\"__webpack_require__.r(__webpack_exports__);\\\\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\\\\n/* harmony export */   log: () => (/* binding */ log)\\\\n/* harmony export */ });\\\\nfunction log(message) {\\\\r\\\\n    console.log(message);\\\\r\\\\n}\\\\r\\\\n\\\\r\\\\n\\\\r\\\\n\\\\n\\\\n//# sourceURL=webpack://audio-worklet-loader/./example/javascript/utils.js?\\\");\\n\\n/***/ })\\n\\n/******/ \\t});\\n/************************************************************************/\\n/******/ \\t// The module cache\\n/******/ \\tvar __webpack_module_cache__ = {};\\n/******/ \\t\\n/******/ \\t// The require function\\n/******/ \\tfunction __webpack_require__(moduleId) {\\n/******/ \\t\\t// Check if module is in cache\\n/******/ \\t\\tvar cachedModule = __webpack_module_cache__[moduleId];\\n/******/ \\t\\tif (cachedModule !== undefined) {\\n/******/ \\t\\t\\treturn cachedModule.exports;\\n/******/ \\t\\t}\\n/******/ \\t\\t// Create a new module (and put it into the cache)\\n/******/ \\t\\tvar module = __webpack_module_cache__[moduleId] = {\\n/******/ \\t\\t\\t// no module.id needed\\n/******/ \\t\\t\\t// no module.loaded needed\\n/******/ \\t\\t\\texports: {}\\n/******/ \\t\\t};\\n/******/ \\t\\n/******/ \\t\\t// Execute the module function\\n/******/ \\t\\t__webpack_modules__[moduleId](module, module.exports, __webpack_require__);\\n/******/ \\t\\n/******/ \\t\\t// Return the exports of the module\\n/******/ \\t\\treturn module.exports;\\n/******/ \\t}\\n/******/ \\t\\n/************************************************************************/\\n/******/ \\t/* webpack/runtime/define property getters */\\n/******/ \\t(() => {\\n/******/ \\t\\t// define getter functions for harmony exports\\n/******/ \\t\\t__webpack_require__.d = (exports, definition) => {\\n/******/ \\t\\t\\tfor(var key in definition) {\\n/******/ \\t\\t\\t\\tif(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {\\n/******/ \\t\\t\\t\\t\\tObject.defineProperty(exports, key, { enumerable: true, get: definition[key] });\\n/******/ \\t\\t\\t\\t}\\n/******/ \\t\\t\\t}\\n/******/ \\t\\t};\\n/******/ \\t})();\\n/******/ \\t\\n/******/ \\t/* webpack/runtime/hasOwnProperty shorthand */\\n/******/ \\t(() => {\\n/******/ \\t\\t__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))\\n/******/ \\t})();\\n/******/ \\t\\n/******/ \\t/* webpack/runtime/make namespace object */\\n/******/ \\t(() => {\\n/******/ \\t\\t// define __esModule on exports\\n/******/ \\t\\t__webpack_require__.r = (exports) => {\\n/******/ \\t\\t\\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\\n/******/ \\t\\t\\t\\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\\n/******/ \\t\\t\\t}\\n/******/ \\t\\t\\tObject.defineProperty(exports, '__esModule', { value: true });\\n/******/ \\t\\t};\\n/******/ \\t})();\\n/******/ \\t\\n/************************************************************************/\\n/******/ \\t\\n/******/ \\t// startup\\n/******/ \\t// Load entry module and return exports\\n/******/ \\t// This entry module can't be inlined because the eval devtool is used.\\n/******/ \\tvar __webpack_exports__ = __webpack_require__(\\\"./example/javascript/random-noise.worklet.js\\\");\\n/******/ \\t\\n/******/ })()\\n;\")\n\n//# sourceURL=webpack://audio-worklet-loader/./example/javascript/random-noise.worklet.js?");

/***/ }),

/***/ "./loader/workletToBlob.js":
/*!*********************************!*\
  !*** ./loader/workletToBlob.js ***!
  \*********************************/
/***/ ((module) => {

eval("module.exports = function workletToBlob(source) {\r\n    try {\r\n        var blob;\r\n\r\n        try {\r\n            // BlobBuilder = Deprecated, but widely implemented\r\n            var BlobBuilder = window.BlobBuilder ||\r\n                window.WebKitBlobBuilder ||\r\n                window.MozBlobBuilder ||\r\n                window.MSBlobBuilder;\r\n\r\n            blob = new BlobBuilder();\r\n\r\n            blob.append(source);\r\n\r\n            blob = blob.getBlob(\"application/javascript; charset=utf-8\");\r\n        } catch (e) {\r\n            // The proposed API\r\n            blob = new Blob([source], { type: \"application/javascript; charset=utf-8\" });\r\n        }\r\n\r\n        return URL.createObjectURL(blob);\r\n    } catch (e) {\r\n        return 'data:application/javascript,' + encodeURIComponent(source);\r\n    }\r\n};\n\n//# sourceURL=webpack://audio-worklet-loader/./loader/workletToBlob.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./example/javascript/index.js");
/******/ 	
/******/ })()
;