// @flow
import path from 'path';

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
async function importModule(name: string, src: string) {
  const fileName: string = name.split('/').pop();
  const filePath: string = name.substring(0, name.lastIndexOf('/'));
  const el: NodeList<HTMLElement> = document.querySelectorAll(`[data-module=${fileName}]`);

  if (el.length === 0) return;

  const fullFilePath: string = filePath !== '' ? path.join(src, filePath, fileName) : path.join(src, fileName);

  return await import(`../../../../src/${fullFilePath}.js`)
    .then(module => {
      return {
        module: module.default,
        el
      };
    })
    .catch(err => {
      Promise.reject(new Error(`There was an error loading your module - ${err}`));
    });
}

export default importModule;
