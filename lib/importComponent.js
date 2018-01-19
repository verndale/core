'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @ignore
 *
 * Imports a component dynamically.
 *
 * *You should never use this method directly* as this method is used in
 * conjunction with {@link Component}, {@link create} and {@link render} to provide a wrapper and simple interface for the engineer.
 *
 * @example
 * //'Foo' is the name of the JavaScript class
 * <div data-component="Foo"></div>
 *
 * @example
 * //-- src/js/components/Foo.js
 * import { Component } from '@verndale/core';
 *
 * class Foo extends Component{
 *   constructor(el){
 *     super(el);
 *
 *     console.log(this.$el);
 *   }
 * }
 *
 * //-- src/js/main.js
 * import { importComponent, render } from '@verndale/core';
 *
 * //import a single component/class called Foo.js located in src/js/components
 * importComponent('Foo').then(data => {
 *     if(!data) return;
 *     const { component, el } = data;
 *
 *     render(el, $target => {
 *       new component($target);
 *     })
 *   });
 *
 * @example
 * //'Bar' is the name of the JavaScript class
 * <div data-component="Bar"></div>
 *
 * @example
 * //-- src/js/components/global/Bar.js
 * import { Component } from '@verndale/core';
 *
 * class Bar extends Component{
 *   constructor(el, props){
 *     super(el, props);
 *
 *     console.log(this.$el);
 *
 *     console.log(this.props.firstName);
 *     console.log(this.props.lastName);
 *   }
 * }
 *
 * //-- src/js/main.js
 * import { importComponent, render } from '@verndale/core';
 *
 * //import a single component and add some additional properties
 * importComponent('global/Bar').then(data => {
 *     if(!data) return;
 *     const { component, el } = data;
 *
 *     render(el, $target => {
 *       new component($target, {
 *         firstName: 'foo',
 *         lastName: 'bar'
 *       });
 *     })
 *   });
 *
 * @see {@link create}
 * @param {string} name - Path/name of the file you want to import relative to `src/js/components/`.
 * @returns {Promise.<Object>} - Returns a `data` object that holds the default component class and the element `(data.component, data.el)`
 *
 */
var importComponent = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name) {
    var fileName, filePath, el, fullFilePath;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fileName = name.split('/').pop();
            filePath = name.substring(0, name.lastIndexOf('/'));
            el = document.querySelectorAll('[data-component=' + fileName + ']');

            if (!(el.length === 0)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return');

          case 5:
            fullFilePath = filePath !== '' ? _path2.default.join(filePath, fileName) : fileName;
            _context.next = 8;
            return import('components/' + fullFilePath).then(function (component) {
              return {
                component: component.default,
                el: el
              };
            }).catch(function (err) {
              Promise.reject(new Error('There was an error loading your component - ' + err));
            });

          case 8:
            return _context.abrupt('return', _context.sent);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function importComponent(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = importComponent;