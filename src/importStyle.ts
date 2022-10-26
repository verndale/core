/**
 * @ignore
 *
 * Imports a module's styles dynamically.
 *
 * *You should never use this method directly* as this method is used in
 * conjunction {@link create} to provide a wrapper and simple interface for the engineer.
 *
 * @example
 * //'Foo' is the name of the Style reference
 * <div data-style="Foo"></div>
 *
 * @see {@link create}
 * @param {String} name - Name of the module.
 * @param {String} loader - Dynamic import function `() => import('module-path')`
 * @returns {Promise.<Object>} - Returns a `data` object that holds the default module and the element `(data.module, data.el)`
 *
 */
function importStyle(name: string, loader: () => Promise<any>) {
  const el = document.querySelectorAll<HTMLElement>(`[data-style="${name}"]`);

  if (el.length === 0) {
    return Promise.resolve();
  }

  return loader()
    .then((module) => {
      console.log(module);
    })
    .catch((err) => {
      Promise.reject(
        new Error(`There was an error loading your style - ${err}`)
      );
    });
}

export default importStyle;
