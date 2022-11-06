"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domTree = new WeakMap();
const configuration = new WeakMap();
class Component {
    constructor(el, props = {}) {
        // if (typeof el === 'undefined') {
        //   throw new Error(
        //     'You must provide an element as an ELement type'
        //   );
        // }
        var _a;
        this.el = el;
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
        if ((_a = this.props) === null || _a === void 0 ? void 0 : _a.dom) {
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
    set dom(elements) {
        elements = Object.assign(Object.assign({}, this.dom), elements);
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
exports.default = Component;
