"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var domTree = new WeakMap();
var configuration = new WeakMap();
var Component = /** @class */ (function () {
    function Component(el, props) {
        // if (typeof el === 'undefined') {
        //   throw new Error(
        //     'You must provide an element as a ELement or NodeList type'
        //   );
        // }
        if (props === void 0) { props = {}; }
        this.el = el;
        /**
         * Main class element, this will be a native Node instance
         * This can be reachable at any time in your subclass with `this.el` after `super()` is called
         *
         * @type {Object}
         */
        this.el = el;
        if (!this.el ||
            !(this.el instanceof HTMLElement || this.el instanceof NodeList)) {
            return;
        }
        domTree.set(this, {});
        configuration.set(this, props);
        if (Object.prototype.hasOwnProperty.call(this.props, "dom")) {
            this.dom = this.props.dom;
        }
        this.setupDefaults && this.setupDefaults();
        this.addListeners && this.addListeners();
    }
    Object.defineProperty(Component.prototype, "props", {
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
        get: function () {
            return configuration.get(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "dom", {
        /**
         * Get DOM object.
         *
         * @example
         * this.dom
         *
         * @type {Object}
         */
        get: function () {
            return domTree.get(this);
        },
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
        set: function (elements) {
            elements = __assign(__assign({}, this.dom), elements);
            domTree.set(this, elements);
        },
        enumerable: false,
        configurable: true
    });
    return Component;
}());
exports.default = Component;
