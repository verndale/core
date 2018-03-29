'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var domTree = new WeakMap();
var configuration = new WeakMap();

/**
 * `Component` is a class that should be extended for every component that's being made. It
 * is a helper class to keep the code uniform.
 *
 * **This is not to be used directly, only extended**
 *
 * see {@link #componentprops|props} on how to pass in additional configuration to the constructor.
 *
 * @example
 * import { Component } from '@verndale/core';
 *
 * class Foo extends Component {
 *   construction(el){
 *     super(el);
 *   }
 *
 *   setupDefaults(){
 *     // ...defaults go here
 *   }
 *
 *   addListeners(){
 *     // ...listeners go here
 *   }
 * }
 *
 * // Create a new Foo component
 * new Foo('.foo');
 *
 * @param {string|Object} el - Main DOM element, you can pass a string such as `'.foo'` __or__ a dom object such as `$('.foo')`
 * @param {Object} [props={}] - Additional component configuration; reachable with `this.props`
 */

var Component = function () {
  function Component(el) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Component);

    if (typeof el === 'undefined') {
      throw new Error('You must provide an element as a String type or a jQuery object type');
    }

    /**
     * Main class element, this will be a jQuery instance
     * This can be reachable at any time in your subclass with `this.$el`
     *
     * @type {Object}
     */
    this.$el = el instanceof jQuery ? el : $(el);

    if (this.$el.length === 0) return;

    domTree.set(this, {});
    configuration.set(this, props);

    if (this.props.hasOwnProperty('dom')) {
      this.dom = this.props.dom;
    }

    this.setupDefaults();
    this.addListeners();
  }

  /**
   * This method is used for override;
   * It's called directly after the element and configuration have been set up
   * @abstract
   */


  _createClass(Component, [{
    key: 'setupDefaults',
    value: function setupDefaults() {}

    /**
     * This method is used for override;
     * It's called directly after `setupDefaults()`, so everything is ready and setup at this point.
     * @abstract
     */

  }, {
    key: 'addListeners',
    value: function addListeners() {}

    /**
     * Get component configuration.
     *
     * @example
     * class Foo extends Component {
     *   construction(el, props){
     *     super(el, props);
     *   }
     *
     *   setupDefaults(){
     *     console.log(this.props.name); // Outputs "Foo"
     *   }
     * }
     *
     * // Create a new Foo component with some configuration
     * new Foo('.foo', {
     *   name: 'Foo'
     * });
     *
     * @type {Object}
     */

  }, {
    key: 'props',
    get: function get() {
      return configuration.get(this);
    }

    /**
     * Set DOM object.
     *
     * @example
     * class Foo extends Component {
     *   construction(el){
     *     super(el);
     *   }
     *
     *   setupDefaults(){
     *     this.dom = {
     *       $container: document.querySelector('.container')
     *     }
     *   }
     *
     *   addListeners(){
     *     //DOM object is available
     *     console.log(this.dom.$container);
     *   }
     * }
     *
     * // Create a new Foo component
     * new Foo('.foo');
     *
     * @type {Object}
     */

  }, {
    key: 'dom',
    set: function set(elements) {
      elements = _extends({}, this.dom, elements);

      domTree.set(this, elements);
    }

    /**
     * Get DOM object.
     *
     * @example
     * this.dom
     *
     * @type {Object}
     */
    ,
    get: function get() {
      return domTree.get(this);
    }
  }]);

  return Component;
}();

exports.default = Component;