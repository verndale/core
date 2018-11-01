'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @ignore
 *
 * Imports a module dynamically.
 *
 * *You should never use this method directly* as this method is used in
 * conjunction with {@link Component}, {@link create} and {@link render} to provide a wrapper and simple interface for the engineer.
 *
 * @example
 * //'Foo' is the name of the JavaScript class
 * <div data-module="Foo"></div>
 *
 * @example
 * //-- src/js/modules/Foo.js
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
 * import { importModule, render } from '@verndale/core';
 *
 * //import a single module/class called Foo.js located in src/js/modules
 * importModule('Foo').then(data => {
 *     if(!data) return;
 *     const { module, el } = data;
 *
 *     render(el, $target => {
 *       new module($target);
 *     })
 *   });
 *
 * @example
 * //'Bar' is the name of the JavaScript class
 * <div data-module="Bar"></div>
 *
 * @example
 * //-- src/js/modules/global/Bar.js
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
 * //import a single module and add some additional properties
 * importModule('global/Bar').then(data => {
 *     if(!data) return;
 *     const { module, el } = data;
 *
 *     render(el, $target => {
 *       new module($target, {
 *         firstName: 'foo',
 *         lastName: 'bar'
 *       });
 *     })
 *   });
 *
 * @see {@link create}
 * @param {String} name - Path/name of the file you want to import relative to `./src/`.
 * @param {String} src - Path to the JavaScript files you wish to dynamically bundle.
 * @returns {Promise.<Object>} - Returns a `data` object that holds the default module and the element `(data.module, data.el)`
 *
 */
var importModule = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name, src) {
    var fileName, filePath, el, fullFilePath;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fileName = name.split('/').pop();
            filePath = name.substring(0, name.lastIndexOf('/'));
            el = document.querySelectorAll('[data-module=' + fileName + ']');

            if (!(el.length === 0)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return');

          case 5:
            fullFilePath = filePath !== '' ? _path2.default.join(src, filePath, fileName) : _path2.default.join(src, fileName);
            _context.next = 8;
            return import('../../../../src/' + fullFilePath + '.js').then(function (module) {
              return {
                module: module.default,
                el: el
              };
            }).catch(function (err) {
              Promise.reject(new Error('There was an error loading your module - ' + err));
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

  return function importModule(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = importModule;