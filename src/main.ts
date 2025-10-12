import * as bun from "bun";

const colors = {
	purple: "#8564d8c7",
};
const contents = {
	name: "Apathy (Experimental)",
	type: "dark",
	colors: {
		"editor.background": "#0A0A0A",
		"editor.foreground": "#E0E0E0",
		"editorLineNumber.foreground": "#5A5A5A",
		"editorLineNumber.activeForeground": "#FFFFFF",
		"editorCursor.foreground": "#FFFFFF",
		"editor.selectionBackground": "#333333",
		"editor.selectionHighlightBackground": "#222222",
		"editor.wordHighlightBackground": "#222222",
		"editor.wordHighlightStrongBackground": "#222222",
	},
	tokenColors: [
		{
			scope: ["comment", "punctuation.definition.comment", "string.comment"],
			settings: {
				foreground: "#5A5A5A",
				fontStyle: "italic",
			},
		},
	],
};
async function bumpversion(part: "patch" | "minor" | "major") {
	const bumpType = part;
	if (!["patch", "minor", "major"].includes(bumpType)) {
		throw new Error("Invalid bump type. Use patch, minor, or major.");
	}
	const pkgPath = "./package.json";
	const pkg = await bun.file(pkgPath).json();
	const [major, minor, patch] = pkg.version.split(".").map(Number);
	let newVersion = "";
	if (bumpType === "patch") {
		newVersion = `${major}.${minor}.${patch + 1}`;
	} else if (bumpType === "minor") {
		newVersion = `${major}.${minor + 1}.0`;
	} else if (bumpType === "major") {
		newVersion = `${major + 1}.0.0`;
	}
	pkg.version = newVersion;
	await bun.write(pkgPath, JSON.stringify(pkg, null, 2));
	console.log(`Bumped version to ${newVersion}`);
	return;
}

async function main() {
	const args = bun.argv.slice(2);
	if (args.includes("bump")) {
		const part = args[args.indexOf("bump") + 1] as "patch" | "minor" | "major";
		if (!part || !["patch", "minor", "major"].includes(part)) {
			throw new Error("Please specify bump type: patch, minor, or major.");
		}
		await bumpversion(part);
		return;
	}
	await bun.write("./themes/default.yaml", JSON.stringify(contents, null, 2));
}

main()
	.then(() => console.log("Wrote default theme"))
	.catch((err) => console.error(err));
