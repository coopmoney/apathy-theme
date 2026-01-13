"use strict";
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApathySemanticTokensProvider = void 0;
exports.getSemanticTokensLegend = getSemanticTokensLegend;
const vscode = __importStar(require("vscode"));
/**
 * Semantic token legend defining token types and modifiers
 */
const tokenTypes = [
    'namespace',
    'class',
    'enum',
    'interface',
    'struct',
    'typeParameter',
    'type',
    'parameter',
    'variable',
    'property',
    'enumMember',
    'decorator',
    'event',
    'function',
    'method',
    'macro',
    'label',
    'comment',
    'string',
    'keyword',
    'number',
    'regexp',
    'operator'
];
const tokenModifiers = [
    'declaration',
    'definition',
    'readonly',
    'static',
    'deprecated',
    'abstract',
    'async',
    'modification',
    'documentation',
    'defaultLibrary'
];
const legend = new vscode.SemanticTokensLegend(tokenTypes, tokenModifiers);
/**
 * Semantic Token Provider
 * This provides semantic highlighting information for language features.
 * You'll need to implement the actual token parsing logic based on your language.
 */
class ApathySemanticTokensProvider {
    async provideDocumentSemanticTokens(document, token) {
        const tokensBuilder = new vscode.SemanticTokensBuilder(legend);
        // Example: Parse document and add tokens
        // This is a simplified example - you'll need to implement proper language parsing
        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i);
            const text = line.text;
            // Example: Highlight class names (simple regex-based approach)
            const classRegex = /\bclass\s+(\w+)/g;
            let match;
            while ((match = classRegex.exec(text)) !== null) {
                const startPos = match.index + 6; // After "class "
                tokensBuilder.push(new vscode.Range(i, startPos, i, startPos + match[1].length), 'class', ['declaration']);
            }
            // Example: Highlight function names
            const functionRegex = /\bfunction\s+(\w+)/g;
            while ((match = functionRegex.exec(text)) !== null) {
                const startPos = match.index + 9; // After "function "
                tokensBuilder.push(new vscode.Range(i, startPos, i, startPos + match[1].length), 'function', ['declaration']);
            }
        }
        return tokensBuilder.build();
    }
}
exports.ApathySemanticTokensProvider = ApathySemanticTokensProvider;
/**
 * Get the semantic tokens legend
 */
function getSemanticTokensLegend() {
    return legend;
}
//# sourceMappingURL=semanticTokenProvider.js.map