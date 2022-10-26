"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = exports.importModule = exports.render = void 0;
// @flow
var importModule_1 = __importDefault(require("./importModule"));
exports.importModule = importModule_1.default;
var render_1 = __importDefault(require("./render"));
exports.render = render_1.default;
var Component_1 = __importDefault(require("./Component"));
exports.Component = Component_1.default;
function create(organisms) {
    organisms.forEach(function (organism) {
        // Load js modules
        if (organism.loader) {
            (0, importModule_1.default)(organism.name, organism.loader).then(function (data) {
                if (!data)
                    return;
                var module = data.module, el = data.el;
                if (organism.render && typeof organism.render === "function") {
                    return organism.render(module, el);
                }
                (0, render_1.default)(el, function ($target) {
                    new module($target, organism.props);
                });
            });
        }
        // Load scss modules
        if (organism.styles) {
            (0, importModule_1.default)(organism.name, organism.styles);
        }
    });
}
exports.default = create;
