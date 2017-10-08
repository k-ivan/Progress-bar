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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _progress = __webpack_require__(1);

var _progress2 = _interopRequireDefault(_progress);

__webpack_require__(2);

var _helpers = __webpack_require__(3);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Progress = function () {

  var transform = _helpers2.default.supportCss('transform'),
      transition = _helpers2.default.supportCss('transition'),
      transitionEnd = _helpers2.default.transitionEventEnd(),
      isLoading = void 0,
      bar = void 0;

  var numRandom = function numRandom() {
    return Math.round(Math.random() * 100);
  };

  function set(num) {
    var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

    bar = document.getElementById('progress');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'progress';
      bar.className = 'loading ' + (position !== 'top' ? 'loading--bottom' : '');
      bar.innerHTML = '<div class="loading__inner">';
      document.body.appendChild(bar);
    }

    num = Number.isInteger(num) && num < 100 ? num : numRandom();

    setTimeout(function () {
      bar.style[transform] = 'translate3d(' + num + '%, 0, 0)';
    }, 10);

    isLoading = true;
  }

  function done() {
    if (!isLoading) return;

    bar.style[transform] = 'translate3d(100%, 0, 0)';

    bar.addEventListener(transitionEnd, function handler(evt) {
      if (evt.propertyName !== transform) return;
      bar.removeEventListener(evt.type, handler);
      bar.style.opacity = 0;
      bar.style.height = 0;
      setTimeout(function () {
        bar.parentNode.removeChild(bar);
        isLoading = false;
      }, 300);
    });
  }

  return {
    set: set,
    done: done
  };
}();

window.Progress = Progress;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Number.isInteger = Number.isInteger || function (num) {
  return typeof num === 'number' && Math.round(num) === num;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  supportCss: function supportCss(prop) {
    var prefix = ['-webkit-', '-moz', ''];
    var root = document.documentElement;
    var camelCase = function camelCase(str) {
      return str.replace(/\-([a-z])/gi, function (match, $1) {
        return $1.toUpperCase();
      });
    };
    for (var i = prefix.length - 1; i >= 0; i--) {
      var css3prop = camelCase(prefix[i] + prop);
      if (css3prop in root.style) {
        return css3prop;
      }
    }
    return false;
  },
  transitionEventEnd: function transitionEventEnd() {
    var transition = this.supportCss('transition');
    if (transition) {
      return transition === 'transition' ? 'transitionend' : transition + 'End';
    }
    return false;
  }
};

/***/ })
/******/ ]);