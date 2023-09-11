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

/***/ "./loader/getWorklet.js":
/*!******************************!*\
  !*** ./loader/getWorklet.js ***!
  \******************************/
/***/ ((module) => {

eval("function getWorklet(source) {\r\n    const workletBlob = new Blob([source], {type: \"application/javascript\"});\r\n    return URL.createObjectURL(workletBlob);\r\n}\r\n\r\nmodule.exports = getWorklet;\n\n//# sourceURL=webpack://audio-worklet-loader/./loader/getWorklet.js?");

/***/ }),

/***/ "./src/typescript/random-noise.worklet.ts":
/*!************************************************!*\
  !*** ./src/typescript/random-noise.worklet.ts ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./loader/getWorklet.js */ \"./loader/getWorklet.js\")(\"// @ts-ignore\\nclass AudioDecoder extends AudioWorkletProcessor {\\n    constructor() {\\n        super();\\n        this.initWorklet = false;\\n        // @ts-ignore\\n        this.port.onmessage = (e) => {\\n            const { message } = e.data;\\n            switch (message) {\\n                case \\\"INIT\\\":\\n                    console.log(\\\"[AUDIO-DECODER]: Init audio worklet node processor.\\\");\\n                    break;\\n                default:\\n                    console.log(\\\"[AUDIO-DECODER]: Unhandled message.\\\");\\n                    break;\\n            }\\n        };\\n    }\\n    process(inputs, outputs) {\\n        const output = outputs[0];\\n        for (let channel = 0; channel < output.length; ++channel) {\\n            const outputChannel = output[channel];\\n            for (let i = 0; i < outputChannel.length; ++i) {\\n                // Generate a random number between -1 and 1\\n                // Assign the random value to the output channel\\n                outputChannel[i] = Math.random() * 2 - 1;\\n            }\\n        }\\n        if (!this.initWorklet) {\\n            // @ts-ignore\\n            this.port.postMessage({ message: \\\"INIT\\\" });\\n            this.initWorklet = true;\\n        }\\n        return true;\\n    }\\n}\\n// @ts-ignore Register the AudioWorklet processor\\nregisterProcessor(\\\"audio-decoder\\\", AudioDecoder);\\n\");\n\n\n//# sourceURL=webpack://audio-worklet-loader/./src/typescript/random-noise.worklet.ts?");

/***/ }),

/***/ "./src/typescript/index.ts":
/*!*********************************!*\
  !*** ./src/typescript/index.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n// @ts-ignore\nconst random_noise_worklet_1 = __importDefault(__webpack_require__(/*! ./random-noise.worklet */ \"./src/typescript/random-noise.worklet.ts\"));\nconst playBtn = document.getElementById(\"play-btn\");\nconst stopBtn = document.getElementById(\"stop-btn\");\nconst audioCtx = new AudioContext();\nplayBtn.addEventListener(\"click\", () => __awaiter(void 0, void 0, void 0, function* () {\n    yield audioCtx.audioWorklet.addModule(random_noise_worklet_1.default);\n    const audioBufferSource = audioCtx.createBufferSource();\n    const audioWorkletNode = new AudioWorkletNode(audioCtx, \"audio-decoder\");\n    audioWorkletNode.port.postMessage({\n        message: \"INIT\"\n    });\n    audioWorkletNode.port.onmessage = (e) => {\n        const { message } = e.data;\n        switch (message) {\n            case \"INIT\":\n                console.log(\"Init audio worklet node success.\");\n                break;\n            default:\n                console.log(\"Unhandled message from audio decoder.\");\n        }\n    };\n    audioBufferSource.connect(audioWorkletNode);\n    audioWorkletNode.connect(audioCtx.destination);\n    audioBufferSource.start();\n}));\nstopBtn.addEventListener(\"click\", () => __awaiter(void 0, void 0, void 0, function* () {\n    const startTime = performance.now();\n    yield audioCtx.suspend();\n    console.log(performance.now() - startTime);\n}));\n\n\n//# sourceURL=webpack://audio-worklet-loader/./src/typescript/index.ts?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/typescript/index.ts");
/******/ 	
/******/ })()
;