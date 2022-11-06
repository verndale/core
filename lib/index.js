"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = exports.importModule = exports.render = void 0;
// @flow
const importModule_1 = __importDefault(require("./importModule"));
exports.importModule = importModule_1.default;
const render_1 = __importDefault(require("./render"));
exports.render = render_1.default;
const Component_1 = __importDefault(require("./Component"));
exports.Component = Component_1.default;
function create(organisms) {
    return Promise.all(organisms.map((organism) => __awaiter(this, void 0, void 0, function* () {
        // Load js modules
        if (organism.loader) {
            const data = yield (0, importModule_1.default)(organism.name, organism.loader);
            if (!data)
                return;
            const { module, el } = data;
            if (organism.render && typeof organism.render === "function") {
                organism.render(module, el);
            }
            (0, render_1.default)(el, ($target) => {
                new module($target, organism.props);
            });
        }
        // Load styles modules
        if (organism.styles) {
            yield (0, importModule_1.default)(organism.name, organism.styles);
        }
    })));
}
exports.default = create;
