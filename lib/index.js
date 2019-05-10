'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = exports.importModule = exports.render = undefined;

var _importModule = require('./importModule');

var _importModule2 = _interopRequireDefault(_importModule);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

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
 * **This method will automatically look in the `src` folder** - *this cannot be changed* because we are
 * using dynamic imports and it needs a reliable, hardcoded folder to look in order to chunk files properly.
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
 *   { name: 'Foo' },
 *   { name: 'global/Bar' }
 * ];
 *
 * create(organisms, 'js/modules');
 *
 * //This will fetch the modules: `./js/modules/Foo.js` and `./js/modules/global/Bar.js`
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
 * @example
 * //intercept the render method in case we want to bring
 * //in other libraries or do anything else prior to render/instantiation.
 *
 * //-- src/js/main.js
 * import create from '@verndale/core';
 *
 * //in this case, `Foo.js` is a react component
 * const organisms = [
 *   { name: 'Foo',
 *     loader: () => import('./modules/Foo'),
 *     render(Component, el){
 *       const React = require('react');
 *       const { render } = require('react-dom');
 *
 *       render(<Component {...el[0].dataset} />, el[0]);
 *     }
 *   }
 * ];
 *
 * create(organisms, 'js/modules');
 *
 * @param {Array<Object>} organisms - An array of modules to be imported.
 * @param {String} organisms[].name - The path/name of the JavaScript file.
 * @param {String} organisms[].loader - Dynamic Import Function `() => import('module-path')`
 * @param {Function} organisms[].render - Function used to intercept the rendering of the module.
 * @param {Function} organisms[].props - Object used to send properties to the module.
 */
function create(organisms) {
  organisms.forEach(function (organism) {
    (0, _importModule2.default)(organism.name, organism.loader).then(function (data) {
      if (!data) return;

      var module = data.module,
          el = data.el;


      if (organism.render && typeof organism.render === 'function') {
        organism.render(module, el);

        return;
      }

      (0, _render2.default)(el, function ($target) {
        new module($target, organism.props);
      });
    });
  });
}
exports.default = create;
exports.render = _render2.default;
exports.importModule = _importModule2.default;
exports.Component = _Component2.default;