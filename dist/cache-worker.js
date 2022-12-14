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

/***/ "./src/worker/index.ts":
/*!*****************************!*\
  !*** ./src/worker/index.ts ***!
  \*****************************/
/***/ (function() {

eval("var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (g && (g = 0, op[0] && (_ = 0)), _) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar _this = this;\r\nvar outPort;\r\nself.addEventListener(\"install\", function (event) {\r\n    console.log(event);\r\n});\r\nself.addEventListener(\"activate\", function (event) {\r\n    console.log(event);\r\n});\r\nself.addEventListener(\"message\", function (event) {\r\n    outPort = event.ports[0];\r\n    outPort.onmessage = function (e) {\r\n        console.log(e);\r\n    };\r\n});\r\nfunction isJs(request) {\r\n    return new RegExp('\\.js$').test(request.url);\r\n}\r\nself.addEventListener(\"fetch\", function (event) {\r\n    console.log('oooo API!');\r\n    outPort.postMessage(event.clientId);\r\n    var cacheName = \"v2\";\r\n    if (event.request.url == \"/sw-cached\" || event.request.url == \"/sw-cached/\") {\r\n        event.respondWith(fetch(event.request));\r\n        return;\r\n    }\r\n    event.respondWith((function () { return __awaiter(_this, void 0, void 0, function () {\r\n        var cache, cachedResponse, response;\r\n        return __generator(this, function (_a) {\r\n            switch (_a.label) {\r\n                case 0: return [4 /*yield*/, caches.open(cacheName)];\r\n                case 1:\r\n                    cache = _a.sent();\r\n                    return [4 /*yield*/, cache.match(event.request)];\r\n                case 2:\r\n                    cachedResponse = _a.sent();\r\n                    console.log('cached response');\r\n                    console.dir(cachedResponse);\r\n                    if (!(cachedResponse && cachedResponse.ok)) return [3 /*break*/, 3];\r\n                    event.waitUntil(cache.add(event.request));\r\n                    console.log('got from cached');\r\n                    return [2 /*return*/, cachedResponse.clone()];\r\n                case 3: return [4 /*yield*/, fetch(event.request)];\r\n                case 4:\r\n                    response = _a.sent();\r\n                    console.log('got from server');\r\n                    if (!isJs(event.request))\r\n                        cache.put(event.request, response.clone());\r\n                    return [2 /*return*/, response.clone()];\r\n            }\r\n        });\r\n    }); })());\r\n});\r\n\n\n//# sourceURL=webpack://worker-works/./src/worker/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/worker/index.ts"]();
/******/ 	
/******/ })()
;