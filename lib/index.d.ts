import importModule from "./importModule";
import render from "./render";
import Component from "./Component";
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
 * document.addEventListener('DOMContentLoaded', () => {
 *   create(organisms);
 * }
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
 * document.addEventListener('DOMContentLoaded', () => {
 *   create(organisms);
 * }
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
 * document.addEventListener('DOMContentLoaded', () => {
 *   create(organisms);
 * }
 *
 *
 * @param {Array<Object>} organisms - An array of modules to be imported.
 * @param {String} organisms[].name - The reference name of the module.
 * @param {String} organisms[].loader - Dynamic Import Function `() => import('module-path')`
 * @param {String} organisms[].styles - Dynamic Import Function `() => import('styles-path')`
 * @param {Function} organisms[].render - Function used to intercept the rendering of the module.
 * @param {Function} organisms[].props - Object used to send properties to the javascript module.
 */
declare type Organism = {
    name: string;
    loader?: () => Promise<any>;
    styles?: () => Promise<any>;
    render?: (module: unknown, el: NodeListOf<Element>) => void;
    props?: any;
};
export default function create(organisms: Array<Organism>): Promise<void[]>;
export { render, importModule, Component };
