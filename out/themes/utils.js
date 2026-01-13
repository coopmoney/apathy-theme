"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lighten = lighten;
exports.darken = darken;
exports.transparentize = transparentize;
exports.mix = mix;
exports.accent = accent;
exports.lighter = lighter;
exports.darker = darker;
exports.l10 = l10;
exports.l20 = l20;
exports.d10 = d10;
exports.d20 = d20;
exports.alpha10 = alpha10;
exports.alpha20 = alpha20;
exports.alpha50 = alpha50;
const color_1 = __importDefault(require("color"));
function lighten(color, amount) {
    return (0, color_1.default)(color).lighten(amount).hex();
}
function darken(color, amount) {
    return (0, color_1.default)(color).darken(amount).hex();
}
function transparentize(color, amount) {
    return (0, color_1.default)(color).alpha(1 - amount).hex();
}
function mix(color1, color2, amount = 0.5) {
    return (0, color_1.default)(color1).mix((0, color_1.default)(color2), amount).hex();
}
function accent(color, color2, _lighten = 0.1, _mix = 0.1) {
    return lighten(mix(color, color2, _mix), _lighten);
}
function lighter(color) {
    return lighten(color, 0.2);
}
function darker(color) {
    return darken(color, 0.2);
}
function l10(color) {
    return lighten(color, 0.1);
}
function l20(color) {
    return lighten(color, 0.2);
}
function d10(color) {
    return darken(color, 0.1);
}
function d20(color) {
    return darken(color, 0.2);
}
function alpha10(color) {
    return transparentize(color, 0.1);
}
function alpha20(color) {
    return transparentize(color, 0.2);
}
function alpha50(color) {
    return transparentize(color, 0.5);
}
//# sourceMappingURL=utils.js.map