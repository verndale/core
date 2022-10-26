/**
 * Iterates through any matched element and provides a callback to return the DOM object.
 *
 * @example
 * import { render } from '@verndale/core';
 *
 * render(document.querySelectorAll('.foo'), $target => {
 *  new Foo($target);
 * });
 *
 * @param {Object} el - The DOM object to be used to iterate through.
 * @param {Function} cb - Callback which returns the raw element.
 */
declare function render(el: NodeListOf<HTMLElement>, cb: (el: HTMLElement) => void): void;
export default render;
