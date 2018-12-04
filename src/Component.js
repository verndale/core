const domTree = new WeakMap();
const configuration = new WeakMap();

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
 * @param {string|Object} el - Main DOM element, you can pass a string such as `'.foo'` __or__ a DOM object
 * @param {Object} [props={}] - Additional component configuration; reachable with `this.props`
 */
class Component {
  constructor(el, props = {}){
    if (typeof el === 'undefined') {
      throw new Error('You must provide an element as a String type or a jQuery object type');
    }

    /**
     * Main class element, this will be a jQuery instance
     * This can be reachable at any time in your subclass with `this.$el` after `super()` is called
     *
     * @type {Object}
     */
    this.$el = el instanceof jQuery ? el : $(el);

    /**
     * Main class element, this will be a native Node instance
     * This can be reachable at any time in your subclass with `this.el` after `super()` is called
     *
     * @type {Object}
     */
    this.el = el;

    if (this.$el.length === 0 && this.el.length === 0) return;

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
  setupDefaults(){}

  /**
   * This method is used for override;
   * It's called directly after `setupDefaults()`, so everything is ready and setup at this point.
   * @abstract
   */
  addListeners(){}

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
  get props(){
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
  set dom(elements){
    elements = {
      ...this.dom,
      ...elements
    };

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
  get dom(){
    return domTree.get(this);
  }
}

export default Component;
