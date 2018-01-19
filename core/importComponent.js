// @flow
import path from 'path';

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
async function importComponent(name: string) {
  const fileName: string = name.split('/').pop();
  const filePath: string = name.substring(0, name.lastIndexOf('/'));
  const el: NodeList<HTMLElement> = document.querySelectorAll(`[data-component=${fileName}]`);

  if (el.length === 0) return;

  const fullFilePath: string = filePath !== '' ? path.join(filePath, fileName) : fileName;

  return await import(`components/${fullFilePath}`)
    .then(component => {
      return {
        component: component.default,
        el
      };
    })
    .catch(err => {
      Promise.reject(new Error(`There was an error loading your component - ${err}`));
    });
}

export default importComponent;
