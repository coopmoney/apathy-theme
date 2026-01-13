"use strict";
/**
 * Color palettes for all Apathy themes
 * Auto-generated color maps with descriptive names
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApathyExperimentalColors = exports.ApathyColors = exports.ApatheticOceanColors = void 0;
var ApatheticOcean_1 = require("./ApatheticOcean");
Object.defineProperty(exports, "ApatheticOceanColors", { enumerable: true, get: function () { return ApatheticOcean_1.ApatheticOceanColors; } });
var Apathy_1 = require("./Apathy");
Object.defineProperty(exports, "ApathyColors", { enumerable: true, get: function () { return Apathy_1.ApathyColors; } });
var ApathyExperimental_1 = require("./ApathyExperimental");
Object.defineProperty(exports, "ApathyExperimentalColors", { enumerable: true, get: function () { return ApathyExperimental_1.ApathyExperimentalColors; } });
// Re-export all colors for convenience
__exportStar(require("./ApatheticOcean"), exports);
__exportStar(require("./Apathy"), exports);
__exportStar(require("./ApathyExperimental"), exports);
//# sourceMappingURL=index.js.map