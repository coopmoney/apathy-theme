"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const minted_1 = require("./minted");
const types_1 = require("./types");
const bun_test_1 = require("bun:test");
(0, bun_test_1.test)("path value retrieval with defaults", () => {
    const c = (0, types_1.getThemeValue)(minted_1.minted, "tokens.types");
    (0, bun_test_1.expect)(c).toBe(minted_1.palette.ice);
});
//# sourceMappingURL=theme.test.js.map