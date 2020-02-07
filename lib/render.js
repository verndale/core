"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Iterates through any matched element and provides a callback to return the DOM object.
 *
 * @example
 * import { render } from '@verndale/core';
 *
 * render(document.querySelectorAll('.foo'), $target => {
 *  new Foo($target);
 * });
 *
 * @param {Object} el - The DOM object to be used to iterate through.
 * @param {Function} cb - Callback which returns the raw element.
 */
function render(el, cb) {
  if (!el || el === '') {
    throw new Error('You must define a dom object.');
  }

  if (_typeof(el) !== 'object' || Array.isArray(el)) {
    throw new TypeError('This method requires a dom object to be passed in.');
  }

  if (!cb) {
    throw new Error('You must define a callback method.');
  }

  if (typeof cb !== 'function') {
    throw new TypeError('You must provide a Function.');
  }

  for (var i = 0; i < el.length; i++) {
    cb(el[i]);
  }
}

var _default = render;
exports.default = _default;