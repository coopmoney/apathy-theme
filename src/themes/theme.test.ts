import { minted, palette as mintedPalette } from "./minted";
import { getThemeValue } from "./types";
import { test, expect } from "bun:test";

test("path value retrieval with defaults", () => {
	const c = getThemeValue(minted, "tokens.types");
	expect(c).toBe(mintedPalette.ice);
});
