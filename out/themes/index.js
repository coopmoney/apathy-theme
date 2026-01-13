"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.themes = void 0;
const apathy_1 = __importDefault(require("./apathy"));
const apatheticOcean_1 = __importDefault(require("./apatheticOcean"));
const apathyExperimental_1 = __importDefault(require("./apathyExperimental"));
const minted_1 = __importDefault(require("./minted"));
const slate_1 = __importDefault(require("./slate"));
exports.themes = {
    "Apathy": apathy_1.default,
    "Apathetic Ocean": apatheticOcean_1.default,
    "Apathy Experimental": apathyExperimental_1.default,
    "Minted": minted_1.default,
    "Slate": slate_1.default,
};
//# sourceMappingURL=index.js.map