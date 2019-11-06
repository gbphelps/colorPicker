/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./javascripts/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./javascripts/colorMethods/hslFromRGB.js":
/*!************************************************!*\
  !*** ./javascripts/colorMethods/hslFromRGB.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return hslFromRGB; });\n/* harmony import */ var _utils_extrema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/extrema */ \"./javascripts/utils/extrema.js\");\n/* harmony import */ var _hueFromRGB__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hueFromRGB */ \"./javascripts/colorMethods/hueFromRGB.js\");\n\n\n\nfunction hslFromRGB(rgb){\n    const { max, min } = Object(_utils_extrema__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(rgb);\n    const lightness = (rgb[max] + rgb[min])/2 /255;\n    const hue = Object(_hueFromRGB__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(rgb);\n    let saturation;\n    if (lightness === 0 || lightness === 1){\n        saturation = 0\n    } else {\n        saturation = (rgb[max] - rgb[min])/255 /(1 - Math.abs(2*lightness - 1));\n    }\n    return { saturation: saturation*100, lightness: lightness*100, hue };\n}\n\n//# sourceURL=webpack:///./javascripts/colorMethods/hslFromRGB.js?");

/***/ }),

/***/ "./javascripts/colorMethods/hsluvFromRGB.js":
/*!**************************************************!*\
  !*** ./javascripts/colorMethods/hsluvFromRGB.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return hsluvFromRGB; });\n/* harmony import */ var hsluv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hsluv */ \"./node_modules/hsluv/hsluv.js\");\n/* harmony import */ var hsluv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hsluv__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction hsluvFromRGB(rgb){\n    const color = Object(hsluv__WEBPACK_IMPORTED_MODULE_0__[\"rgbToHsluv\"])([rgb.red/255, rgb.green/255, rgb.blue/255]);\n    console.log(color)\n    return {\n        hue: color[0],\n        saturation: color[1],\n        lightness: color[2]\n    }\n}\n\n//# sourceURL=webpack:///./javascripts/colorMethods/hsluvFromRGB.js?");

/***/ }),

/***/ "./javascripts/colorMethods/hsvFromRGB.js":
/*!************************************************!*\
  !*** ./javascripts/colorMethods/hsvFromRGB.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return hsvFromRGB; });\n/* harmony import */ var _hueFromRGB__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hueFromRGB */ \"./javascripts/colorMethods/hueFromRGB.js\");\n/* harmony import */ var _utils_extrema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/extrema */ \"./javascripts/utils/extrema.js\");\n\n\n\nfunction hsvFromRGB(rgb){\n    const {max, min} = Object(_utils_extrema__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(rgb);\n    const saturation = rgb[max] === 0 ? 0 : (1-rgb[min]/rgb[max]) * 100;\n    const value = rgb[max]/255 * 100;\n    const hue  = Object(_hueFromRGB__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(rgb);\n    return {hue, saturation, value}\n}\n\n//# sourceURL=webpack:///./javascripts/colorMethods/hsvFromRGB.js?");

/***/ }),

/***/ "./javascripts/colorMethods/hueFromRGB.js":
/*!************************************************!*\
  !*** ./javascripts/colorMethods/hueFromRGB.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return hueFromRGB; });\n/* harmony import */ var _utils_extrema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/extrema */ \"./javascripts/utils/extrema.js\");\n\nfunction hueFromRGB(rgb){\n\tconst { max, min } = Object(_utils_extrema__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(rgb);\n\tconst c = rgb[max] - rgb[min];\n\tif (c === 0) return 0;\n\t\n\tlet hue = null\n\tif (max === 'red'){\n\t\thue = ((rgb.green - rgb.blue)/c + 6)%6\n\t} else if (max === 'green') {\n\t\thue = (rgb.blue - rgb.red)/c + 2;\n\t} else if (max === 'blue'){\n\t\thue = (rgb.red - rgb.green)/c + 4;\n\t}\n\t\n\treturn hue/6 * 360;\n}\n\n//# sourceURL=webpack:///./javascripts/colorMethods/hueFromRGB.js?");

/***/ }),

/***/ "./javascripts/colorMethods/rgbFromHSL.js":
/*!************************************************!*\
  !*** ./javascripts/colorMethods/rgbFromHSL.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return rgbFromHSL; });\n\nfunction rgbFromHSL(hsl){\n    const C = (1 - Math.abs(2*hsl.lightness/100 - 1))*hsl.saturation/100;\n    const H = hsl.hue/60;\n    const X = C * (1 - Math.abs(H%2-1));\n    const m = hsl.lightness/100 - C/2;\n    switch (Math.floor(H)){\n        case 0:\n            return {\n                red: 255*(C + m),\n                green: 255*(X + m),\n                blue: 255*m\n            }\n        case 1:\n            return {\n                red: 255*(X + m),\n                green: 255*(C + m),\n                blue: 255*m\n            }\n        case 2:\n            return {\n                red: 255*m,\n                green: 255*(C + m),\n                blue: 255*(X + m)\n            }\n        case 3:\n            return {\n                red: 255*m,\n                green: 255*(X + m),\n                blue: 255*(C + m),\n            }\n        case 4:\n            return {\n                red: 255*(X + m),\n                green: 255*m,\n                blue: 255*(C + m),\n            }\n        case 5:\n            return {\n                red: 255*(C + m),\n                green: 255*m,\n                blue: 255*(X + m),\n            }\n    }\n}\n\n//# sourceURL=webpack:///./javascripts/colorMethods/rgbFromHSL.js?");

/***/ }),

/***/ "./javascripts/colorMethods/rgbFromHSLUV.js":
/*!**************************************************!*\
  !*** ./javascripts/colorMethods/rgbFromHSLUV.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return hsluvFromRGB; });\n/* harmony import */ var hsluv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hsluv */ \"./node_modules/hsluv/hsluv.js\");\n/* harmony import */ var hsluv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hsluv__WEBPACK_IMPORTED_MODULE_0__);\n\n\n\nwindow.h2r = hsluv__WEBPACK_IMPORTED_MODULE_0__[\"hsluvToRgb\"];\nwindow.r2h = hsluv__WEBPACK_IMPORTED_MODULE_0__[\"rgbToHsluv\"];\n\nfunction hsluvFromRGB(hsluv){\n    const color = Object(hsluv__WEBPACK_IMPORTED_MODULE_0__[\"hsluvToRgb\"])([hsluv.hue, hsluv.saturation, hsluv.lightness]);\n    return {\n        red: color[0]*255,\n        green: color[1]*255,\n        blue: color[2]*255\n    }\n}\n\n//# sourceURL=webpack:///./javascripts/colorMethods/rgbFromHSLUV.js?");

/***/ }),

/***/ "./javascripts/colorMethods/rgbFromHSV.js":
/*!************************************************!*\
  !*** ./javascripts/colorMethods/rgbFromHSV.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return rgbFromHSV; });\nfunction rgbFromHSV(hsv){\n\tlet max, min, mid;\n\tif ((hsv.hue + 60)%360 <= 120){\n\t\tmax = 'red';\n\t\t[min, mid] = hsv.hue <= 60 ? ['blue', 'green'] : ['green', 'blue'];\t\n\t} else if (hsv.hue <= 180) {\n\t\tmax = 'green';\n\t\t[min, mid] = hsv.hue <= 120 ? ['blue', 'red'] : ['red', 'blue'] \n\t} else {\n\t\tmax = 'blue';\n\t\t[min, mid] = hsv.hue <= 240 ? ['red', 'green'] : ['green', 'red']\n\t}\n\t\n\tlet progress = (hsv.hue%60) / 60;\n\tif (Math.floor(hsv.hue/60)%2 === 1){\n\t\tprogress = 1 - progress\n\t};\n\t\n\t\n\tconst maxval = 255/100 * hsv.value;\n\tconst minval = (100 - hsv.saturation) * maxval / 100;\n\tconst midval = minval + (maxval - minval)*progress;\n\t\n\treturn {\n\t\t[max]: maxval,\n\t\t[min]: minval,\n\t\t[mid]: midval,\n\t}\n}\n\n//# sourceURL=webpack:///./javascripts/colorMethods/rgbFromHSV.js?");

/***/ }),

/***/ "./javascripts/createSVG.js":
/*!**********************************!*\
  !*** ./javascripts/createSVG.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createSVG; });\nfunction createSVG(type,props){\n    const el = document.createElementNS('http://www.w3.org/2000/svg', type);\n    el.id = createSVG.id++;\n    Object.keys(props).forEach(key => {\n        el.setAttribute(key,props[key]);\n    })\n    return el;\n}\ncreateSVG.id = 0;\n\n//# sourceURL=webpack:///./javascripts/createSVG.js?");

/***/ }),

/***/ "./javascripts/index.js":
/*!******************************!*\
  !*** ./javascripts/index.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _colorMethods_rgbFromHSV__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colorMethods/rgbFromHSV */ \"./javascripts/colorMethods/rgbFromHSV.js\");\n/* harmony import */ var _colorMethods_hslFromRGB__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colorMethods/hslFromRGB */ \"./javascripts/colorMethods/hslFromRGB.js\");\n/* harmony import */ var _colorMethods_rgbFromHSL__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./colorMethods/rgbFromHSL */ \"./javascripts/colorMethods/rgbFromHSL.js\");\n/* harmony import */ var _colorMethods_hsvFromRGB__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./colorMethods/hsvFromRGB */ \"./javascripts/colorMethods/hsvFromRGB.js\");\n/* harmony import */ var _colorMethods_hsluvFromRGB__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./colorMethods/hsluvFromRGB */ \"./javascripts/colorMethods/hsluvFromRGB.js\");\n/* harmony import */ var _colorMethods_rgbFromHSLUV__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./colorMethods/rgbFromHSLUV */ \"./javascripts/colorMethods/rgbFromHSLUV.js\");\n/* harmony import */ var _nonlinearGradient__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./nonlinearGradient */ \"./javascripts/nonlinearGradient.js\");\n/* harmony import */ var _createSVG__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./createSVG */ \"./javascripts/createSVG.js\");\n/* harmony import */ var _makePattern__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./makePattern */ \"./javascripts/makePattern.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\ndocument.addEventListener('DOMContentLoaded',()=>{\n    setup();\n})\n\n\nclass Color{\n    constructor(){\n        this.color = {\n            rgb: {\n                red: 0,\n                green: 0,\n                blue: 0,\n            },\n\n            hsv: {\n                hue: 0,\n                saturation: 100,\n                value: 0,\n            },\n\n            hsl:{\n                hue: 0,\n                saturation: 0,\n                lightness: 0,\n            },\n\n            hsluv:{\n                hue: 0,\n                saturation: 0,\n                lightness: 0\n            }\n\n        }\n        this.subscriptions = [];\n    }\n\t\n\tsubscribe(callback){\n\t\tthis.subscriptions.push(callback);\n\t}\n\t\n\tsetRGB(rgb){\n        Object.assign(this.color.rgb, rgb);\n\n        this.color.hsv = Object(_colorMethods_hsvFromRGB__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(this.color.rgb);\n        this.color.hsl = Object(_colorMethods_hslFromRGB__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.color.rgb);\n        this.color.hsluv = Object(_colorMethods_hsluvFromRGB__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(this.color.rgb);\n\n\t\tthis.subscriptions.forEach(subscription => subscription(this.color));\n\t}\n\t\n\tsetHSV(hsvPartial){\n        Object.assign(this.color.hsv, hsvPartial);\n\n        this.color.rgb = Object(_colorMethods_rgbFromHSV__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.color.hsv);\n        this.color.hsl = Object(_colorMethods_hslFromRGB__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.color.rgb);\n        this.color.hsluv = Object(_colorMethods_hsluvFromRGB__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(this.color.rgb);\n\n\t\tthis.subscriptions.forEach(subscription => subscription(this.color));\n    }\n    \n    setHSL(hslPartial){\n        Object.assign(this.color.hsl, hslPartial);\n\n        this.color.rgb = Object(_colorMethods_rgbFromHSL__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this.color.hsl);\n        this.color.hsv = Object(_colorMethods_hsvFromRGB__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(this.color.rgb);\n        this.color.hsluv = Object(_colorMethods_hsluvFromRGB__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(this.color.rgb);\n\n        this.subscriptions.forEach(subscription => subscription(this.color));\n    }\n\n    setHSLUV(hsluvPartial){\n        Object.assign(this.color.hsluv, hsluvPartial);\n\n        this.color.rgb = Object(_colorMethods_rgbFromHSLUV__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(this.color.hsluv);\n        this.color.hsv = Object(_colorMethods_hsvFromRGB__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(this.color.rgb);\n        this.color.hsl = Object(_colorMethods_hslFromRGB__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.color.rgb);\n\n        this.subscriptions.forEach(subscription => subscription(this.color));\n    }\n}\n\n\n\n\nconst mainColor = new Color();\n\n\n\n\n\n\n\nconst width = 300;\nconst height = 100;\n\n\n\n\nfunction setup(){\n    hueSlider();\n    buildChannels([\n        {type: 'rgb', channel: 'red'},\n        {type: 'rgb', channel: 'green'},\n        {type: 'rgb', channel: 'blue'},\n    ]);\n    buildChannels([\n        {type: 'hsv', channel: 'saturation'},\n        {type: 'hsv', channel: 'value' },\n    ],{\n        trackLength: 100, \n        trackThickness: 24, \n        orientation: 'vertical',\n        margin: 8,\n        pipWidth: 8\n    });\n    \n    buildChannels([\n        {type: 'hsl', channel: 'saturation'},\n        {type: 'hsl', channel: 'lightness' },\n    ],{\n        trackLength: 100, \n        trackThickness: 24, \n        orientation: 'vertical',\n        margin: 8,\n        pipWidth: 8\n    });\n\n    buildNonlinearChannels([\n        {type: 'hsluv', channel: 'saturation'},\n        {type: 'hsluv', channel: 'lightness'},\n    ],{\n        trackLength: 100, \n        trackThickness: 24, \n        orientation: 'vertical',\n        margin: 8,\n        pipWidth: 8\n    })\n    mainColor.setRGB({red: 50, green: 100, blue: 200 });\n}\n\n\n\n\n\n\n\n\n\n\nfunction buildChannels(channels, {\n    trackLength = 300,\n    trackThickness = 8,\n    pipWidth = 12,\n    orientation = 'horizontal',\n    margin = 24,\n    outerMargin=24,\n}={}){\n    const container = Object(_createSVG__WEBPACK_IMPORTED_MODULE_7__[\"default\"])('svg',{\n        [orientation === 'horizontal' ? 'width' : 'height']: trackLength + 2*outerMargin,\n        [orientation === 'horizontal' ? 'height' : 'width']: channels.length * trackThickness + (channels.length - 1)*margin + 2*outerMargin\n    })\n    container.style.margin=4;\n    container.style.border=\"1px solid #555\";\n    container.style['border-radius']=\"2px\"\n\n\n    document.body.appendChild(container);\n    channels.forEach((param,i) => {    \n        let maxValue;\n        switch (param.type){\n            case 'rgb':\n                maxValue = 255;\n                break;\n            default:\n                maxValue = 100;\n        }\n\n        const gradient = Object(_createSVG__WEBPACK_IMPORTED_MODULE_7__[\"default\"])('linearGradient',{\n            [orientation === 'horizontal' ? 'x1' : 'y1' ]: pipWidth/2 + outerMargin,\n            [orientation === 'horizontal' ? 'x2' : 'y2' ]: trackLength-pipWidth/2 + outerMargin,\n            [orientation === 'horizontal' ? 'y1' : 'x1' ]: 0,\n            [orientation === 'horizontal' ? 'y2' : 'x2' ]: 0,\n            gradientUnits: 'userSpaceOnUse',\n        })\n\n        const stop1 = Object(_createSVG__WEBPACK_IMPORTED_MODULE_7__[\"default\"])('stop',{\n            offset: 0,\n            'stop-color': 'black', //TODO: initialize\n        })\n\n        const stop2 = Object(_createSVG__WEBPACK_IMPORTED_MODULE_7__[\"default\"])('stop',{\n            offset: .5,\n            'stop-color': 'red', //TODO: initialize\n        })\n\n        const stop3 = Object(_createSVG__WEBPACK_IMPORTED_MODULE_7__[\"default\"])('stop',{\n            offset: 1,\n            'stop-color': 'red', //TODO: initialize\n        })\n\n        const track_ = Object(_createSVG__WEBPACK_IMPORTED_MODULE_7__[\"default\"])('rect',{\n            [ orientation === 'horizontal' ? 'width' : 'height']: trackLength,\n            [ orientation === 'horizontal' ? 'height' : 'width']: trackThickness,\n            [ orientation === 'horizontal' ? 'y' : 'x']: (trackThickness + margin)*i + outerMargin,\n            [ orientation === 'horizontal' ? 'x' : 'y']: outerMargin,\n            rx: 2,\n            fill: `url(#${gradient.id})`\n        })\n\n        const pip_ = Object(_createSVG__WEBPACK_IMPORTED_MODULE_7__[\"default\"])('rect',{\n            [ orientation === 'horizontal' ? 'height' : 'width']: trackThickness + 2,\n            [ orientation === 'horizontal' ? 'width' : 'height']: pipWidth,\n            fill: 'transparent',\n            [ orientation === 'horizontal' ? 'y' : 'x']: (trackThickness + margin)*i - 1 + outerMargin,\n            stroke: 'white',\n            'stroke-width': 2,\n            'vector-effect': 'non-scaling-stroke',\n            filter: 'url(#shadow)',\n            rx: 0\n        })\n\n        gradient.appendChild(stop1);\n        gradient.appendChild(stop2);\n        gradient.appendChild(stop3);\n\n        container.appendChild(gradient);\n        container.appendChild(track_);\n        container.appendChild(pip_);\n\n        mainColor.subscribe(COLOR=>{  \n            let left;\n            let middle;\n            let right;\n\n            if (param.type !== 'rgb'){\n                const base = COLOR[param.type];\n\n                left = new Color();\n                const setter = `set${param.type.toUpperCase()}`;\n                left[setter]({ ...base, [param.channel]: 0 });\n                left = left.color.rgb;\n\n                right = new Color();\n                right[setter]({ ...base, [param.channel]: maxValue });\n                right = right.color.rgb;\n\n                middle = new Color();\n                middle[setter]({...base, [param.channel]: maxValue/2 });\n                middle = middle.color.rgb;\n\n            } else {\n                const base = COLOR.rgb;\n                left = { ...base , [param.channel]: 0  }\n                right = { ...base , [param.channel]: maxValue }\n                middle = { ...base , [param.channel]: maxValue/2 }\n            }\n\n        const l = `rgb(${left.red},${left.green},${left.blue})`;\n        const m = `rgb(${middle.red},${middle.green},${middle.blue})`;\n        const r = `rgb(${right.red},${right.green},${right.blue})`;\n        \n        \n        stop1.setAttribute('stop-color', orientation === \"horizontal\" ? l : r);\n        stop2.setAttribute('stop-color', m);\n        stop3.setAttribute('stop-color', orientation === \"horizontal\" ? r : l);\n       \n        pip_.setAttribute(\n            orientation === 'horizontal' ? 'x' : 'y',\n            orientation === 'horizontal' ?\n                COLOR[param.type][param.channel]/maxValue*(trackLength-pipWidth) + outerMargin :\n                (1-COLOR[param.type][param.channel]/maxValue)*(trackLength-pipWidth) + outerMargin\n        );\t\t\n    })\n    \n    \n    pip_.addEventListener('mousedown',e=>{\n        let x = orientation === 'horizontal' ? e.clientX : e.clientY;\n        let rawProgress = mainColor.color[param.type][param.channel];\n        \n        function move(e){\n            const newX = orientation === 'horizontal' ? e.clientX : e.clientY;\n            const delx = orientation === 'horizontal' ? newX - x : x - newX; //note need to scale if svg space is diff from user space;\n            rawProgress += delx/(trackLength-pipWidth)*maxValue;\n            \n            let newVal = Math.min(rawProgress, maxValue);\n            newVal = Math.max(newVal, 0);\n        \n            const setter = `set${param.type.toUpperCase()}`;\n            mainColor[setter]({[param.channel]: newVal});\n            x = orientation === 'horizontal' ? e.clientX : e.clientY;\n        }\n        \n        document.addEventListener('mousemove',move);\n        document.addEventListener('mouseup',()=>{\n            document.removeEventListener('mousemove',move);\n        },{once:true})\t\n    })\t\n})\n}\n\n\n\n\nfunction buildNonlinearChannels(channels, {\n    trackLength = 300,\n    trackThickness = 8,\n    pipWidth = 12,\n    orientation = 'horizontal',\n    margin = 24,\n    outerMargin = 10\n}={}){\n    const container = Object(_createSVG__WEBPACK_IMPORTED_MODULE_7__[\"default\"])('svg',{\n        [orientation === 'horizontal' ? 'width' : 'height']: trackLength + 2*outerMargin,\n        [orientation === 'horizontal' ? 'height' : 'width']: channels.length * trackThickness + (channels.length - 1)*margin + 2*outerMargin\n    })\n    container.style.margin=4;\n\n    channels.forEach((param,i) => {    \n        let maxValue;\n        switch (param.type){\n            case 'rgb':\n                maxValue = 255;\n                break;\n            default:\n                maxValue = 100;\n        }\n\n       const pattern = Object(_makePattern__WEBPACK_IMPORTED_MODULE_8__[\"default\"])();\n\n        const track_ = Object(_createSVG__WEBPACK_IMPORTED_MODULE_7__[\"default\"])('rect',{\n            [ orientation === 'horizontal' ? 'width' : 'height']: trackLength,\n            [ orientation === 'horizontal' ? 'height' : 'width']: trackThickness,\n            [ orientation === 'horizontal' ? 'y' : 'x']: (trackThickness + margin)*i + outerMargin,\n            [ orientation === 'horizontal' ? 'x' : 'y']: outerMargin,\n            rx: 2,\n            fill: `url(#${pattern.id})`\n        })\n\n        const pip_ = Object(_createSVG__WEBPACK_IMPORTED_MODULE_7__[\"default\"])('rect',{\n            [ orientation === 'horizontal' ? 'height' : 'width']: trackThickness + 2,\n            [ orientation === 'horizontal' ? 'width' : 'height']: pipWidth,\n            fill: 'transparent',\n            [ orientation === 'horizontal' ? 'y' : 'x']: (trackThickness + margin)*i - 1 + outerMargin,\n            stroke: 'white',\n            'stroke-width': 2,\n            'vector-effect': 'non-scaling-stroke',\n            filter: 'url(#shadow)',\n            rx: 0\n        })\n\n        document.body.appendChild(container);\n        container.appendChild(pattern);\n        container.appendChild(track_);\n        container.appendChild(pip_);\n\n        mainColor.subscribe(COLOR=>{  \n        \n        const grad = Object(_nonlinearGradient__WEBPACK_IMPORTED_MODULE_6__[\"default\"])({\n            rgbFunc: _colorMethods_rgbFromHSLUV__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n            color: COLOR[param.type],\n            channel: {\n                name: param.channel,\n                max: maxValue\n            },\n            direction: orientation,\n            width: 100,\n            height: 10\n        })\n\n        pattern.firstElementChild.setAttribute('href',grad);\n       \n        pip_.setAttribute(\n            orientation === 'horizontal' ? 'x' : 'y',\n            orientation === 'horizontal' ?\n                COLOR[param.type][param.channel]/maxValue*(trackLength-pipWidth) + outerMargin :\n                (1-COLOR[param.type][param.channel]/maxValue)*(trackLength-pipWidth) + outerMargin\n        );\t\t\n    })\n    \n    \n    pip_.addEventListener('mousedown',e=>{\n        let x = orientation === 'horizontal' ? e.clientX : e.clientY;\n        let rawProgress = mainColor.color[param.type][param.channel];\n        \n        function move(e){\n            const newX = orientation === 'horizontal' ? e.clientX : e.clientY;\n            const delx = orientation === 'horizontal' ? newX - x : x - newX; //note need to scale if svg space is diff from user space;\n            rawProgress += delx/(trackLength-pipWidth)*maxValue;\n            \n            let newVal = Math.min(rawProgress, maxValue);\n            newVal = Math.max(newVal, 0);\n        \n            const setter = `set${param.type.toUpperCase()}`;\n            mainColor[setter]({[param.channel]: newVal});\n            x = orientation === 'horizontal' ? e.clientX : e.clientY;\n        }\n        \n        document.addEventListener('mousemove',move);\n        document.addEventListener('mouseup',()=>{\n            document.removeEventListener('mousemove',move);\n        },{once:true})\t\n    })\t\n})\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//Build Conic Gradient \n\nfunction conicGradient(){\n\tconst c = document.getElementById('c');\n\n\tc.width = 400;\n\tc.height = 400;\n\n\n\tconst ctx = c.getContext('2d');\n\n\tconst img = ctx.createImageData(c.width, c.height);\n\n\n\tfor (let i=0; i<img.data.length/4; i++){\n\t\tlet y = i%c.width;\n\t\tlet x = Math.floor(i/c.width);\n\n\t\tx = c.width/2 - x;\n\t\ty = y - c.height/2;\n\n\t\tlet angle = Math.atan(y/x);\n\t\tif (x < 0) angle = Math.PI + angle;\n\t\tif (y < 0 && x >= 0) angle = 2*Math.PI + angle;\n\n\t\tconst sixth = angle/(Math.PI*2)*6;\n\t\tconst rgba = color(sixth);\n\n\t\tfor (let j=0;j<4;j++) img.data[i*4+j] = rgba[j];\n\t}\n\n\tctx.putImageData(img,0,0);\n\treturn c.toDataURL();\n}\n\n\n\n\nfunction color(sixth){\n\t\tswitch (Math.floor(sixth)){\n\t\t\tcase 0:\n\t\t\t\treturn [255, 255*(sixth%1), 0, 255];\n\t\t\tcase 1:\n\t\t\t\treturn [255 * (1-sixth%1), 255, 0, 255];\n\t\t\tcase 2:\n\t\t\t\treturn [0, 255, 255 * (sixth%1), 255];\n\t\t\tcase 3:\n\t\t\t\treturn [0, 255 * (1-sixth%1), 255, 255];\n\t\t\tcase 4:\n\t\t\t\treturn [255 * (sixth%1), 0, 255, 255];\n\t\t\tcase 5:\n\t\t\t\treturn [255, 0, 255 * (1-sixth%1), 255];\n\t\t}\n\treturn [0,0,0,0]\n}\n\n\n///////////////////////////////////////////////////\n\n//Set Up Hue Slider\n\nfunction hueSlider(){\n    document\n\t    .getElementById('conic-gradient')\n        .setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',conicGradient());\n\n    const RADIUS = 100;\n    const thickness = 8;\n\nfunction set(id,props){\n\tconst el = document.getElementById(id);\n\tObject.keys(props).forEach(key => {\n\t\tel.setAttribute(key, props[key])\n\t})\n}\n\nset('hue-svg',{ \n    viewBox: `0 0 ${RADIUS*2 + 20} ${RADIUS*2 + 20}`, \n    height: RADIUS*2 + 20 \n});\n\nset('conic-gradient',{ height: 2*RADIUS });\nset('inner-circle',{r: RADIUS- thickness, cx: RADIUS, cy: RADIUS});\nset('conic-gradient-pattern',{viewBox: `0 0 ${RADIUS*2} ${RADIUS*2}`});\nset('mask-background',{height: RADIUS*2, width: RADIUS*2});\nset('hue-track',{r: RADIUS, cx: RADIUS, cy: RADIUS})\n\nconst huePip = document.getElementById('hue-pip');\nconst huePipH = huePip.height.baseVal.value;\nconst huePipW = huePip.width.baseVal.value;\n\nconst pc = document.getElementById('pc');\npc.setAttribute('transform',`translate(${RADIUS} ${RADIUS})`);\nhuePip.setAttribute('transform',`rotate(-90)translate(${-huePipW/2 + RADIUS -thickness/2} ${ -huePipH/2})`)\n\n\n\n\n\n\n\nmainColor.subscribe(COLOR => {\n\thuePip.setAttribute('transform', `rotate(${COLOR.hsv.hue - 90})translate(${-huePipW/2 + RADIUS -thickness/2} ${ -huePipH/2})`)\n})\n\nhuePip.addEventListener('mousedown',e=>{\n\t\n\tlet [x,y] = [e.clientX, e.clientY];\n\tfunction move(e){\n\t\t\t\t\t\n\t\tconst delx = e.clientX - x; //note that this needs scaling if svg space is diff from user space\n\t\tconst dely = e.clientY - y;\n\t\t\n\t\tconst xnew = Math.cos((mainColor.color.hsv.hue - 90)/180*Math.PI)*(RADIUS-thickness/2) + delx;\n\t\tconst ynew = Math.sin((mainColor.color.hsv.hue - 90)/180*Math.PI)*(RADIUS-thickness/2) + dely;\n\t\t\n\t\t\n\t\t\n\t\tlet angle = Math.atan(ynew/xnew);\n\t\tif (xnew < 0) angle = Math.PI + angle;\n\n\t\t\n\n\t\t\n\t\tmainColor.setHSV({hue: angle/Math.PI*180 + 90});\n\t\t\n\t\t\n\t\tx = e.clientX;\n\t\ty = e.clientY;\n\t\t\n\t}\n\t\n\tdocument.addEventListener('mousemove', move);\n\tdocument.addEventListener('mouseup',()=>{\n\t\tdocument.removeEventListener('mousemove', move)\n\t},{once:true})\n})\n\n}\n\n\n\n/////////////////////////////////////////////\n\n//# sourceURL=webpack:///./javascripts/index.js?");

/***/ }),

/***/ "./javascripts/makePattern.js":
/*!************************************!*\
  !*** ./javascripts/makePattern.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return makePattern; });\n/* harmony import */ var _createSVG__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createSVG */ \"./javascripts/createSVG.js\");\n\n\nfunction makePattern(){\n    const p = Object(_createSVG__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('pattern',{\n        height: 1,\n        width: 1,\n        patternUnits: 'objectBoundingBox',\n        patternContentUnits: 'objectBoundingBox',\n    })\n    const i = Object(_createSVG__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('image',{\n       height: 1,\n       width: 1,\n       x:0,\n       y:0,\n       preserveAspectRatio: 'none'\n    })\n    p.appendChild(i);\n    return p;\n}\n\n//# sourceURL=webpack:///./javascripts/makePattern.js?");

/***/ }),

/***/ "./javascripts/nonlinearGradient.js":
/*!******************************************!*\
  !*** ./javascripts/nonlinearGradient.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return makeGradient; });\nfunction makeGradient({\n    rgbFunc, \n    color, \n    channel, \n    direction = 'horizontal',\n    width = 300,\n    height = 100\n}){\n    const canvas = document.createElement('canvas');\n    canvas.width = direction === \"horizontal\" ? width : height;\n    canvas.height = direction === \"horizontal\" ? height : width;\n    const ctx = canvas.getContext('2d');\n    const img = ctx.createImageData(\n        direction === \"horizontal\" ? width : height,\n        direction === \"horizontal\" ? height : width,\n    );\n    for (let x=0; x<width; x++){\n        const xFrac = direction === \"horizontal\" ? x/width : 1 - x/width;\n        const rgb = rgbFunc({...color, [channel.name]: channel.max * xFrac});\n        for (let y=0; y<height; y++){\n            const i = direction === \"horizontal\" ? x + y*width : x*height + y;\n            img.data[i*4] = rgb.red;\n            img.data[i*4+1] = rgb.green;\n            img.data[i*4+2] = rgb.blue;\n            img.data[i*4+3] = 255;\n        }\n    }\n    document.body.appendChild(canvas);\n    ctx.putImageData(img,0,0);\n    const result = canvas.toDataURL();\n    document.body.removeChild(canvas);\n    return result;\n}\n\n//# sourceURL=webpack:///./javascripts/nonlinearGradient.js?");

/***/ }),

/***/ "./javascripts/utils/extrema.js":
/*!**************************************!*\
  !*** ./javascripts/utils/extrema.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return extrema; });\nfunction extrema(obj){\n\tlet max = null;\n\tlet min = null;\n\tObject.keys(obj).forEach(channel => {\n\t\tif (!min) min = channel;\n\t\tif (!max) max = channel;\n\t\tif (obj[channel] < obj[min]) min = channel;\n\t\tif (obj[channel] > obj[max]) max = channel;\n\t});\n\treturn {max, min};\n}\n\n//# sourceURL=webpack:///./javascripts/utils/extrema.js?");

/***/ }),

/***/ "./node_modules/hsluv/hsluv.js":
/*!*************************************!*\
  !*** ./node_modules/hsluv/hsluv.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Generated by Haxe 3.4.4\nvar hsluv = hsluv || {};\nhsluv.Geometry = function() { };\nhsluv.Geometry.intersectLineLine = function(a,b) {\n\tvar x = (a.intercept - b.intercept) / (b.slope - a.slope);\n\tvar y = a.slope * x + a.intercept;\n\treturn { x : x, y : y};\n};\nhsluv.Geometry.distanceFromOrigin = function(point) {\n\treturn Math.sqrt(Math.pow(point.x,2) + Math.pow(point.y,2));\n};\nhsluv.Geometry.distanceLineFromOrigin = function(line) {\n\treturn Math.abs(line.intercept) / Math.sqrt(Math.pow(line.slope,2) + 1);\n};\nhsluv.Geometry.perpendicularThroughPoint = function(line,point) {\n\tvar slope = -1 / line.slope;\n\tvar intercept = point.y - slope * point.x;\n\treturn { slope : slope, intercept : intercept};\n};\nhsluv.Geometry.angleFromOrigin = function(point) {\n\treturn Math.atan2(point.y,point.x);\n};\nhsluv.Geometry.normalizeAngle = function(angle) {\n\tvar m = 2 * Math.PI;\n\treturn (angle % m + m) % m;\n};\nhsluv.Geometry.lengthOfRayUntilIntersect = function(theta,line) {\n\treturn line.intercept / (Math.sin(theta) - line.slope * Math.cos(theta));\n};\nhsluv.Hsluv = function() { };\nhsluv.Hsluv.getBounds = function(L) {\n\tvar result = [];\n\tvar sub1 = Math.pow(L + 16,3) / 1560896;\n\tvar sub2 = sub1 > hsluv.Hsluv.epsilon ? sub1 : L / hsluv.Hsluv.kappa;\n\tvar _g = 0;\n\twhile(_g < 3) {\n\t\tvar c = _g++;\n\t\tvar m1 = hsluv.Hsluv.m[c][0];\n\t\tvar m2 = hsluv.Hsluv.m[c][1];\n\t\tvar m3 = hsluv.Hsluv.m[c][2];\n\t\tvar _g1 = 0;\n\t\twhile(_g1 < 2) {\n\t\t\tvar t = _g1++;\n\t\t\tvar top1 = (284517 * m1 - 94839 * m3) * sub2;\n\t\t\tvar top2 = (838422 * m3 + 769860 * m2 + 731718 * m1) * L * sub2 - 769860 * t * L;\n\t\t\tvar bottom = (632260 * m3 - 126452 * m2) * sub2 + 126452 * t;\n\t\t\tresult.push({ slope : top1 / bottom, intercept : top2 / bottom});\n\t\t}\n\t}\n\treturn result;\n};\nhsluv.Hsluv.maxSafeChromaForL = function(L) {\n\tvar bounds = hsluv.Hsluv.getBounds(L);\n\tvar min = Infinity;\n\tvar _g = 0;\n\twhile(_g < bounds.length) {\n\t\tvar bound = bounds[_g];\n\t\t++_g;\n\t\tvar length = hsluv.Geometry.distanceLineFromOrigin(bound);\n\t\tmin = Math.min(min,length);\n\t}\n\treturn min;\n};\nhsluv.Hsluv.maxChromaForLH = function(L,H) {\n\tvar hrad = H / 360 * Math.PI * 2;\n\tvar bounds = hsluv.Hsluv.getBounds(L);\n\tvar min = Infinity;\n\tvar _g = 0;\n\twhile(_g < bounds.length) {\n\t\tvar bound = bounds[_g];\n\t\t++_g;\n\t\tvar length = hsluv.Geometry.lengthOfRayUntilIntersect(hrad,bound);\n\t\tif(length >= 0) {\n\t\t\tmin = Math.min(min,length);\n\t\t}\n\t}\n\treturn min;\n};\nhsluv.Hsluv.dotProduct = function(a,b) {\n\tvar sum = 0;\n\tvar _g1 = 0;\n\tvar _g = a.length;\n\twhile(_g1 < _g) {\n\t\tvar i = _g1++;\n\t\tsum += a[i] * b[i];\n\t}\n\treturn sum;\n};\nhsluv.Hsluv.fromLinear = function(c) {\n\tif(c <= 0.0031308) {\n\t\treturn 12.92 * c;\n\t} else {\n\t\treturn 1.055 * Math.pow(c,0.416666666666666685) - 0.055;\n\t}\n};\nhsluv.Hsluv.toLinear = function(c) {\n\tif(c > 0.04045) {\n\t\treturn Math.pow((c + 0.055) / 1.055,2.4);\n\t} else {\n\t\treturn c / 12.92;\n\t}\n};\nhsluv.Hsluv.xyzToRgb = function(tuple) {\n\treturn [hsluv.Hsluv.fromLinear(hsluv.Hsluv.dotProduct(hsluv.Hsluv.m[0],tuple)),hsluv.Hsluv.fromLinear(hsluv.Hsluv.dotProduct(hsluv.Hsluv.m[1],tuple)),hsluv.Hsluv.fromLinear(hsluv.Hsluv.dotProduct(hsluv.Hsluv.m[2],tuple))];\n};\nhsluv.Hsluv.rgbToXyz = function(tuple) {\n\tvar rgbl = [hsluv.Hsluv.toLinear(tuple[0]),hsluv.Hsluv.toLinear(tuple[1]),hsluv.Hsluv.toLinear(tuple[2])];\n\treturn [hsluv.Hsluv.dotProduct(hsluv.Hsluv.minv[0],rgbl),hsluv.Hsluv.dotProduct(hsluv.Hsluv.minv[1],rgbl),hsluv.Hsluv.dotProduct(hsluv.Hsluv.minv[2],rgbl)];\n};\nhsluv.Hsluv.yToL = function(Y) {\n\tif(Y <= hsluv.Hsluv.epsilon) {\n\t\treturn Y / hsluv.Hsluv.refY * hsluv.Hsluv.kappa;\n\t} else {\n\t\treturn 116 * Math.pow(Y / hsluv.Hsluv.refY,0.333333333333333315) - 16;\n\t}\n};\nhsluv.Hsluv.lToY = function(L) {\n\tif(L <= 8) {\n\t\treturn hsluv.Hsluv.refY * L / hsluv.Hsluv.kappa;\n\t} else {\n\t\treturn hsluv.Hsluv.refY * Math.pow((L + 16) / 116,3);\n\t}\n};\nhsluv.Hsluv.xyzToLuv = function(tuple) {\n\tvar X = tuple[0];\n\tvar Y = tuple[1];\n\tvar Z = tuple[2];\n\tvar divider = X + 15 * Y + 3 * Z;\n\tvar varU = 4 * X;\n\tvar varV = 9 * Y;\n\tif(divider != 0) {\n\t\tvarU /= divider;\n\t\tvarV /= divider;\n\t} else {\n\t\tvarU = NaN;\n\t\tvarV = NaN;\n\t}\n\tvar L = hsluv.Hsluv.yToL(Y);\n\tif(L == 0) {\n\t\treturn [0,0,0];\n\t}\n\tvar U = 13 * L * (varU - hsluv.Hsluv.refU);\n\tvar V = 13 * L * (varV - hsluv.Hsluv.refV);\n\treturn [L,U,V];\n};\nhsluv.Hsluv.luvToXyz = function(tuple) {\n\tvar L = tuple[0];\n\tvar U = tuple[1];\n\tvar V = tuple[2];\n\tif(L == 0) {\n\t\treturn [0,0,0];\n\t}\n\tvar varU = U / (13 * L) + hsluv.Hsluv.refU;\n\tvar varV = V / (13 * L) + hsluv.Hsluv.refV;\n\tvar Y = hsluv.Hsluv.lToY(L);\n\tvar X = 0 - 9 * Y * varU / ((varU - 4) * varV - varU * varV);\n\tvar Z = (9 * Y - 15 * varV * Y - varV * X) / (3 * varV);\n\treturn [X,Y,Z];\n};\nhsluv.Hsluv.luvToLch = function(tuple) {\n\tvar L = tuple[0];\n\tvar U = tuple[1];\n\tvar V = tuple[2];\n\tvar C = Math.sqrt(U * U + V * V);\n\tvar H;\n\tif(C < 0.00000001) {\n\t\tH = 0;\n\t} else {\n\t\tvar Hrad = Math.atan2(V,U);\n\t\tH = Hrad * 180.0 / Math.PI;\n\t\tif(H < 0) {\n\t\t\tH = 360 + H;\n\t\t}\n\t}\n\treturn [L,C,H];\n};\nhsluv.Hsluv.lchToLuv = function(tuple) {\n\tvar L = tuple[0];\n\tvar C = tuple[1];\n\tvar H = tuple[2];\n\tvar Hrad = H / 360.0 * 2 * Math.PI;\n\tvar U = Math.cos(Hrad) * C;\n\tvar V = Math.sin(Hrad) * C;\n\treturn [L,U,V];\n};\nhsluv.Hsluv.hsluvToLch = function(tuple) {\n\tvar H = tuple[0];\n\tvar S = tuple[1];\n\tvar L = tuple[2];\n\tif(L > 99.9999999) {\n\t\treturn [100,0,H];\n\t}\n\tif(L < 0.00000001) {\n\t\treturn [0,0,H];\n\t}\n\tvar max = hsluv.Hsluv.maxChromaForLH(L,H);\n\tvar C = max / 100 * S;\n\treturn [L,C,H];\n};\nhsluv.Hsluv.lchToHsluv = function(tuple) {\n\tvar L = tuple[0];\n\tvar C = tuple[1];\n\tvar H = tuple[2];\n\tif(L > 99.9999999) {\n\t\treturn [H,0,100];\n\t}\n\tif(L < 0.00000001) {\n\t\treturn [H,0,0];\n\t}\n\tvar max = hsluv.Hsluv.maxChromaForLH(L,H);\n\tvar S = C / max * 100;\n\treturn [H,S,L];\n};\nhsluv.Hsluv.hpluvToLch = function(tuple) {\n\tvar H = tuple[0];\n\tvar S = tuple[1];\n\tvar L = tuple[2];\n\tif(L > 99.9999999) {\n\t\treturn [100,0,H];\n\t}\n\tif(L < 0.00000001) {\n\t\treturn [0,0,H];\n\t}\n\tvar max = hsluv.Hsluv.maxSafeChromaForL(L);\n\tvar C = max / 100 * S;\n\treturn [L,C,H];\n};\nhsluv.Hsluv.lchToHpluv = function(tuple) {\n\tvar L = tuple[0];\n\tvar C = tuple[1];\n\tvar H = tuple[2];\n\tif(L > 99.9999999) {\n\t\treturn [H,0,100];\n\t}\n\tif(L < 0.00000001) {\n\t\treturn [H,0,0];\n\t}\n\tvar max = hsluv.Hsluv.maxSafeChromaForL(L);\n\tvar S = C / max * 100;\n\treturn [H,S,L];\n};\nhsluv.Hsluv.rgbToHex = function(tuple) {\n\tvar h = \"#\";\n\tvar _g = 0;\n\twhile(_g < 3) {\n\t\tvar i = _g++;\n\t\tvar chan = tuple[i];\n\t\tvar c = Math.round(chan * 255);\n\t\tvar digit2 = c % 16;\n\t\tvar digit1 = (c - digit2) / 16 | 0;\n\t\th += hsluv.Hsluv.hexChars.charAt(digit1) + hsluv.Hsluv.hexChars.charAt(digit2);\n\t}\n\treturn h;\n};\nhsluv.Hsluv.hexToRgb = function(hex) {\n\thex = hex.toLowerCase();\n\tvar ret = [];\n\tvar _g = 0;\n\twhile(_g < 3) {\n\t\tvar i = _g++;\n\t\tvar digit1 = hsluv.Hsluv.hexChars.indexOf(hex.charAt(i * 2 + 1));\n\t\tvar digit2 = hsluv.Hsluv.hexChars.indexOf(hex.charAt(i * 2 + 2));\n\t\tvar n = digit1 * 16 + digit2;\n\t\tret.push(n / 255.0);\n\t}\n\treturn ret;\n};\nhsluv.Hsluv.lchToRgb = function(tuple) {\n\treturn hsluv.Hsluv.xyzToRgb(hsluv.Hsluv.luvToXyz(hsluv.Hsluv.lchToLuv(tuple)));\n};\nhsluv.Hsluv.rgbToLch = function(tuple) {\n\treturn hsluv.Hsluv.luvToLch(hsluv.Hsluv.xyzToLuv(hsluv.Hsluv.rgbToXyz(tuple)));\n};\nhsluv.Hsluv.hsluvToRgb = function(tuple) {\n\treturn hsluv.Hsluv.lchToRgb(hsluv.Hsluv.hsluvToLch(tuple));\n};\nhsluv.Hsluv.rgbToHsluv = function(tuple) {\n\treturn hsluv.Hsluv.lchToHsluv(hsluv.Hsluv.rgbToLch(tuple));\n};\nhsluv.Hsluv.hpluvToRgb = function(tuple) {\n\treturn hsluv.Hsluv.lchToRgb(hsluv.Hsluv.hpluvToLch(tuple));\n};\nhsluv.Hsluv.rgbToHpluv = function(tuple) {\n\treturn hsluv.Hsluv.lchToHpluv(hsluv.Hsluv.rgbToLch(tuple));\n};\nhsluv.Hsluv.hsluvToHex = function(tuple) {\n\treturn hsluv.Hsluv.rgbToHex(hsluv.Hsluv.hsluvToRgb(tuple));\n};\nhsluv.Hsluv.hpluvToHex = function(tuple) {\n\treturn hsluv.Hsluv.rgbToHex(hsluv.Hsluv.hpluvToRgb(tuple));\n};\nhsluv.Hsluv.hexToHsluv = function(s) {\n\treturn hsluv.Hsluv.rgbToHsluv(hsluv.Hsluv.hexToRgb(s));\n};\nhsluv.Hsluv.hexToHpluv = function(s) {\n\treturn hsluv.Hsluv.rgbToHpluv(hsluv.Hsluv.hexToRgb(s));\n};\nhsluv.Hsluv.m = [[3.240969941904521,-1.537383177570093,-0.498610760293],[-0.96924363628087,1.87596750150772,0.041555057407175],[0.055630079696993,-0.20397695888897,1.056971514242878]];\nhsluv.Hsluv.minv = [[0.41239079926595,0.35758433938387,0.18048078840183],[0.21263900587151,0.71516867876775,0.072192315360733],[0.019330818715591,0.11919477979462,0.95053215224966]];\nhsluv.Hsluv.refY = 1.0;\nhsluv.Hsluv.refU = 0.19783000664283;\nhsluv.Hsluv.refV = 0.46831999493879;\nhsluv.Hsluv.kappa = 903.2962962;\nhsluv.Hsluv.epsilon = 0.0088564516;\nhsluv.Hsluv.hexChars = \"0123456789abcdef\";\nvar root = {\n    \"hsluvToRgb\": hsluv.Hsluv.hsluvToRgb,\n    \"rgbToHsluv\": hsluv.Hsluv.rgbToHsluv,\n    \"hpluvToRgb\": hsluv.Hsluv.hpluvToRgb,\n    \"rgbToHpluv\": hsluv.Hsluv.rgbToHpluv,\n    \"hsluvToHex\": hsluv.Hsluv.hsluvToHex,\n    \"hexToHsluv\": hsluv.Hsluv.hexToHsluv,\n    \"hpluvToHex\": hsluv.Hsluv.hpluvToHex,\n    \"hexToHpluv\": hsluv.Hsluv.hexToHpluv,\n    \"lchToHpluv\": hsluv.Hsluv.lchToHpluv,\n    \"hpluvToLch\": hsluv.Hsluv.hpluvToLch,\n    \"lchToHsluv\": hsluv.Hsluv.lchToHsluv,\n    \"hsluvToLch\": hsluv.Hsluv.hsluvToLch,\n    \"lchToLuv\": hsluv.Hsluv.lchToLuv,\n    \"luvToLch\": hsluv.Hsluv.luvToLch,\n    \"xyzToLuv\": hsluv.Hsluv.xyzToLuv,\n    \"luvToXyz\": hsluv.Hsluv.luvToXyz,\n    \"xyzToRgb\": hsluv.Hsluv.xyzToRgb,\n    \"rgbToXyz\": hsluv.Hsluv.rgbToXyz,\n    \"lchToRgb\": hsluv.Hsluv.lchToRgb,\n    \"rgbToLch\": hsluv.Hsluv.rgbToLch\n};\n\nmodule.exports = root;\n\n\n//# sourceURL=webpack:///./node_modules/hsluv/hsluv.js?");

/***/ })

/******/ });