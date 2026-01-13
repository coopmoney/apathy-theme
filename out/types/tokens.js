"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemanticTokenModifier = exports.SemanticTokenType = exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    /**
     * Background color of the editor.
     * Example: editor background behind all code and UI chrome.
     */
    TokenType["Background"] = "background";
    /**
     * Default foreground color for plain source text.
     * Example: identifiers, punctuation, and text not matched by a specific token.
     */
    TokenType["Source"] = "source";
    /**
     * Literals such as strings, numbers, booleans, null, and undefined.
     * Example: "hello", 42, true, null
     */
    TokenType["Literals"] = "literals";
    /**
     * Punctuation characters.
     * Example: ; , . ( ) { } [ ]
     */
    TokenType["Punctuation"] = "punctuation";
    /**
     * Properties of object-like things.
     * Example: user.name, config.path, obj.length
     */
    TokenType["Property"] = "property";
    /**
     * Default string color.
     * Example: "hello", 'world', `template ${value}`
     */
    TokenType["Strings"] = "strings";
    /**
     * Language keywords and reserved words.
     * Example: if, else, return, class, struct, fn, def
     */
    TokenType["Keyword"] = "keyword";
    /**
     * Struct, class, interface, and type names.
     * Example: struct Point, class Person, interface User, type Result
     */
    TokenType["Struct"] = "struct";
    /**
     * Local or global variables.
     * Example: let count = 0; const total = sum; x = y + 1;
     */
    TokenType["Variable"] = "variable";
    /**
     * Constants, enum members, and immutable values.
     * Example: PI, MAX_VALUE, Status.Ok, const PORT = 3000
     */
    TokenType["Constant"] = "constant";
    /**
     * Function and method names.
     * Example: array.map(), user.getName(), function computeTotal() {}
     */
    /**
     * Function and method names.
     * Example: user.getName(), function computeTotal() {}
     */
    TokenType["Method"] = "method";
    /**
     * Standalone function token.
     * Example: function myFunc() { ... }
     */
    TokenType["Function"] = "function";
    /**
     * Namespace or module-like name.
     * Example: namespace Utils, module.exports
     */
    TokenType["Namespace"] = "namespace";
    /**
     * Class name token.
     * Example: class User, class Point
     */
    TokenType["Class"] = "class";
    /**
     * Interface name or annotation.
     * Example: interface IUser, type Shape = ...
     */
    TokenType["Interface"] = "interface";
    /**
     * Enum type token.
     * Example: enum Status { ... }
     */
    TokenType["Enum"] = "enum";
    /**
     * Enum member or variant.
     * Example: Status.Active, Color.Red
     */
    TokenType["EnumMember"] = "enumMember";
    /**
     * Function or method parameter.
     * Example: function greet(name), fn foo(bar: i32)
     */
    TokenType["Parameter"] = "parameter";
    /**
     * Type parameter or generic argument.
     * Example: <T> in function foo<T>(), Array<T>
     */
    TokenType["TypeParameter"] = "typeParameter";
    /**
     * Decorator, annotation, or attribute.
     * Example: @Component, deprecated, #[derive(Debug)]
     */
    TokenType["Decorator"] = "decorator";
    /**
     * Macros and annotations.
     * Example: println! in Rust, #define in C, deprecated in Java
     */
    TokenType["Macro"] = "macro";
    /**
     * Operators and symbolic tokens.
     * Example: +, -, *, /, ===, &&, ||, =>, ::
     */
    TokenType["Operator"] = "operator";
    /**
     * Type names and type definitions.
     * Example: type Point = { x: number; y: number }, type Result<T> = Ok(T) | Err(Error)
    /**
     * Type names and type definitions.
     * Example: type Point = { x: number; y: number }, type Result<T> = Ok(T) | Err(Error)
     */
    TokenType["Type"] = "type";
    /**
     * Comments in the code.
     * Example: // A single-line comment, /* a block comment *
     */
    TokenType["Comment"] = "comment";
    /**
     * Numeric literals.
     * Example: 42, 3.14, 0xFF, 1_000_000
     */
    TokenType["Number"] = "number";
    /**
     * Regular expression literals.
     * Example: /abc/, /[A-Z]+\d?/
     */
    TokenType["Regexp"] = "regexp";
    /**
     * Labels for flow control.
     * Example: loop: while (true) { ... }
     */
    TokenType["Label"] = "label";
})(TokenType || (exports.TokenType = TokenType = {}));
var SemanticTokenType;
(function (SemanticTokenType) {
    SemanticTokenType["comment"] = "comment";
    SemanticTokenType["string"] = "string";
    SemanticTokenType["keyword"] = "keyword";
    SemanticTokenType["number"] = "number";
    SemanticTokenType["regexp"] = "regexp";
    SemanticTokenType["operator"] = "operator";
    SemanticTokenType["namespace"] = "namespace";
    SemanticTokenType["type"] = "type";
    SemanticTokenType["struct"] = "struct";
    SemanticTokenType["class"] = "class";
    SemanticTokenType["interface"] = "interface";
    SemanticTokenType["enum"] = "enum";
    SemanticTokenType["typeParameter"] = "typeParameter";
    SemanticTokenType["function"] = "function";
    SemanticTokenType["method"] = "method";
    SemanticTokenType["decorator"] = "decorator";
    SemanticTokenType["macro"] = "macro";
    SemanticTokenType["variable"] = "variable";
    SemanticTokenType["parameter"] = "parameter";
    SemanticTokenType["property"] = "property";
    SemanticTokenType["label"] = "label";
})(SemanticTokenType || (exports.SemanticTokenType = SemanticTokenType = {}));
var SemanticTokenModifier;
(function (SemanticTokenModifier) {
    SemanticTokenModifier["declaration"] = "declaration";
    SemanticTokenModifier["documentation"] = "documentation";
    SemanticTokenModifier["readonly"] = "readonly";
    SemanticTokenModifier["static"] = "static";
    SemanticTokenModifier["abstract"] = "abstract";
    SemanticTokenModifier["deprecated"] = "deprecated";
    SemanticTokenModifier["modification"] = "modification";
    SemanticTokenModifier["async"] = "async";
})(SemanticTokenModifier || (exports.SemanticTokenModifier = SemanticTokenModifier = {}));
//# sourceMappingURL=tokens.js.map