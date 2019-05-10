"use strict";

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
 * importModule('Foo', () => './modules/Foo').then(data => {
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
 * importModule('Bar', () => import('./modules/global/Bar')).then(data => {
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
 * @param {String} name - Name of the module.
 * @param {String} loader - Dynamic import function `() => import('module-path')`
 * @returns {Promise.<Object>} - Returns a `data` object that holds the default module and the element `(data.module, data.el)`
 *
 */
function importModule(name, loader) {
  var el = document.querySelectorAll("[data-module=\"" + name + "\"]");

  if (el.length === 0) {
    return Promise.resolve();
  }

  return loader().then(function (module) {
    return {
      module: module.default,
      el: el
    };
  }).catch(function (err) {
    Promise.reject(new Error("There was an error loading your module - " + err));
  });
}

exports.default = importModule;