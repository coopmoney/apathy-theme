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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const semanticTokenProvider_1 = require("./semanticTokenProvider");
/**
 * Extension activation
 * This function is called when the extension is activated.
 */
function activate(context) {
    console.log('Apathy Theme extension is now active!');
    // Register Semantic Token Provider
    // You can add language selectors for specific languages
    const semanticTokenProvider = vscode.languages.registerDocumentSemanticTokensProvider([
        { language: 'typescript' },
        { language: 'javascript' },
        { language: 'python' },
        { language: 'java' },
        { language: 'cpp' },
        { language: 'rust' },
        // Add more languages as needed
    ], new semanticTokenProvider_1.ApathySemanticTokensProvider(), (0, semanticTokenProvider_1.getSemanticTokensLegend)());
    context.subscriptions.push(semanticTokenProvider);
    // File Icon Theme and Product Icon Theme are registered via package.json contributions
    // No additional code needed here for those providers
    console.log('Apathy Theme: All providers registered successfully');
}
/**
 * Extension deactivation
 * This function is called when the extension is deactivated.
 */
function deactivate() {
    console.log('Apathy Theme extension deactivated');
}
//# sourceMappingURL=extension.js.map