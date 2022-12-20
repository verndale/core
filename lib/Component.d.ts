declare type DomElements = {
    [key: string]: HTMLElement | NodeListOf<HTMLElement> | null;
};
declare type Props = {
    dom?: DomElements;
    [key: string]: unknown;
};
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
 *   constructor(el: HTMLElement){
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
declare abstract class Component {
    protected el: HTMLElement;
    constructor(el: HTMLElement, props?: Props);
    /**
     * Get component configuration.
     *
     * @example
     * class Foo extends Component {
     *   construction(el: HTMLElement, props: { name: string }){
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
    get props(): Props | undefined;
    /**
     * Set DOM object.
     *
     * @example
     * class Foo extends Component {
     *   construction(el: HTMLElement){
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
    set dom(elements: DomElements);
    /**
     * Get DOM object.
     *
     * @example
     * this.dom
     *
     * @type {Object}
     */
    get dom(): DomElements;
}
export default Component;
