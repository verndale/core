"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "importModule", {
  enumerable: true,
  get: function get() {
    return _importModule.default;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function get() {
    return _render.default;
  }
});
Object.defineProperty(exports, "Component", {
  enumerable: true,
  get: function get() {
    return _Component.default;
  }
});
exports.default = void 0;

var _importModule = _interopRequireDefault(require("./importModule"));

var _render = _interopRequireDefault(require("./render"));

var _Component = _interopRequireDefault(require("./Component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates bundles from modules that are defined in this method.
 * This is to be used for the main entry points for your module initialization.
 *
 * `create()` allows you to import any module(s) at runtime as long as the DOM element is on the page.
 * This method should be used to load JavaScript chunks at runtime that you don not want in the main or common bundle
 * and is used with the {@link Component} and {@link render} method to loop through each matched element on the page.
 *
 * You must have a `data-module` attribute that is the same name as the JavaScript file in the HTML
 * in order for `create()` to detect the component.
 *
 * The JavaScript file you are importing does **not** have to be a `class`; it could be anything - ie. a single function,
 * an object, or a collection of utility functions.
 *
 *
 * @example
 * //'Foo' is the name of the JavaScript file
 * <div data-module="Foo"></div>
 * //'Bar' is the name of the JavaScript file
 * <div data-module="Bar"></div>
 *
 * @example
 * //create simple modules
 *
 * //-- src/js/main.js
 * import create from '@verndale/core';
 *
 * const organisms = [
 *   { name: 'Foo', loader: () => import('./modules/Foo') },
 *   { name: 'Bar', loader: () => import('./modules/global/Bar') }
 * ];
 *
 * create(organisms);
 *
 * //This will fetch the modules: `./modules/Foo.js` and `./modules/global/Bar.js`
 *
 * @example
 * //define some properties to the module "Bar"
 *
 * //-- src/js/main.js
 * import create from '@verndale/core';
 *
 * const organisms = [
 *   { name: 'Foo', loader: () => import('./modules/Foo') },
 *   { name: 'Bar', loader: () => import('./modules/global/Foo')
 *      props: {
 *       firstName: 'foo',
 *       lastName: 'bar'
 *     }
 *   }
 * ];
 *
 * create(organisms);
 *
 *
 * @param {Array<Object>} organisms - An array of modules to be imported.
 * @param {String} organisms[].name - The path/name of the JavaScript file.
 * @param {String} organisms[].loader - Dynamic Import Function `() => import('module-path')`
 * @param {Function} organisms[].props - Object used to send properties to the module.
 */
function create(organisms) {
  organisms.forEach(function (organism) {
    (0, _importModule.default)(organism.name, organism.loader).then(function (data) {
      if (!data) return;
      var module = data.module,
          el = data.el;
      (0, _render.default)(el, function ($target) {
        new module($target, organism.props);
      });
    });
  });
}

var _default = create;
exports.default = _default;