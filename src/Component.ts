type DomElements = {
  [key: string]: Element | NodeListOf<Element> | null;
};

type Props = {
  dom?: DomElements;
  [key: string]: unknown;
};

const domTree = new WeakMap<object, DomElements>();
const configuration = new WeakMap<object, Props>();

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
 * new Foo(document.querySelector('.foo'));
 *
 * @param {Object} el - Main DOM element, you can pass a DOM object
 * @param {Object} [props={}] - Additional component configuration; reachable with `this.props`
 */

interface Component {
  /**
   * This method is used for override;
   * It's called directly after the element and configuration have been set up
   * @abstract
   */
  setupDefaults?(): void;
  /**
   * This method is used for override;
   * It's called directly after `setupDefaults()`, so everything is ready and setup at this point.
   * @abstract
   */
  addListeners?(): void;
}

abstract class Component {
  constructor(protected el: Element, props: Props = {}) {
    // if (typeof el === 'undefined') {
    //   throw new Error(
    //     'You must provide an element as an ELement type'
    //   );
    // }

    /**
     * Main class element, this will be a native Node instance
     * This can be reachable at any time in your subclass with `this.el` after `super()` is called
     *
     * @type {Object}
     */
    this.el = el;

    if (!this.el || !(this.el instanceof Element)) {
      return;
    }

    domTree.set(this, {});
    configuration.set(this, props);

    if (this.props?.dom) {
      this.dom = this.props.dom;
    }

    this.setupDefaults && this.setupDefaults();
    this.addListeners && this.addListeners();
  }

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
   * new Foo(document.querySelector('.foo'), {
   *   name: 'Foo'
   * });
   *
   * @type {Object}
   */
  get props() {
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
   * new Foo(document.querySelector('.foo'));
   *
   * @type {Object}
   */
  set dom(elements: DomElements) {
    elements = {
      ...this.dom,
      ...elements,
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
  get dom() {
    return domTree.get(this) || {};
  }
}

export default Component;
