'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = exports.importComponent = exports.render = undefined;

var _importComponent = require('./importComponent');

var _importComponent2 = _interopRequireDefault(_importComponent);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates bundles from components that are defined in this method.
 * This is to be used for the main entry points for your component initialization.
 *
 * `create()` allows you to import any component(s) at runtime as long as the DOM element is on the page.
 * This method should be used to load JavaScript chunks at runtime that you don not want in the main or common budle
 * and is used with the {@link Component} and {@link render} method to loop through each matched element on the page.
 *
 * You must have a `data-component` attribute that is the same name as the JavaScript class in the HTML
 * in order for `create()` to detect the component.
 *
 * **This method will automatically look in the `src/js/components` folder** - *this cannot be changed*
 *
 * @example
 * //'Foo' is the name of the JavaScript class
 * <div data-component="Foo"></div>
 * //'Bar' is the name of the JavaScript class
 * <div data-component="Bar"></div>
 *
 * @example
 * //create simple components
 *
 * //-- src/js/main.js
 * import create from '@verndale/core';
 *
 * const organisms = [
 *   { name: 'Foo' },
 *   { name: 'global/Bar' }
 * ];
 *
 * create(organisms);
 *
 * @example
 * //define some properties to the component
 *
 * //-- src/js/main.js
 * import create from '@verndale/core';
 *
 * const organisms = [
 *   { name: 'Foo' },
 *   { name: 'global/Bar',
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
 *     render(component, el){
 *       const React = require('react');
 *       const ReactDom = require('react-dom');
 *
 *       ReactDom.render(
 *         React.createElement(component, el[0].dataset), el[0]
 *       );
 *     }
 *   }
 * ];
 *
 * create(organisms);
 *
 * @param {Array<Object>} organisms - An array of components to be imported.
 * @param {String} organisms[].name - The path/name of the JavaScript file.
 * @param {Function} organisms[].render - Function used to intercept the rendering of the component.
 */
function create(organisms) {
  organisms.forEach(function (organism) {
    (0, _importComponent2.default)(organism.name).then(function (data) {
      if (!data) return;

      var component = data.component,
          el = data.el;


      if (organism.render && typeof organism.render === 'function') {
        organism.render(component, el);

        return;
      }

      (0, _render2.default)(el, function ($target) {
        new component($target, organism.props);
      });
    }).catch(function (err) {
      throw new Error('There was an error importing the component - ' + err);
    });
  });
}
exports.default = create;
exports.render = _render2.default;
exports.importComponent = _importComponent2.default;
exports.Component = _Component2.default;