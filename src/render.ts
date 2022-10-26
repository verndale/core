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
function render(
  el: NodeListOf<HTMLElement>,
  cb: (el: HTMLElement) => void
): void {
  // if (!el) {
  //   throw new Error('You must define a dom object.');
  // }

  // if (typeof el !== 'object' || Array.isArray(el)) {
  //   throw new TypeError('This method requires a dom object to be passed in.');
  // }

  // if (!cb) {
  //   throw new Error('You must define a callback method.');
  // }

  // if (typeof cb !== 'function') {
  //   throw new TypeError('You must provide a Function.');
  // }

  for (let i = 0; i < el.length; i++) {
    cb(el[i]);
  }
}

export default render;
