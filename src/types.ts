export enum TokenType {
  Background = "background",
  Source = "source",
  Property = "property",
  Strings = "strings",
  Keyword = "keyword",
  Struct = "struct",
  Variable = "variable",
  Constant = "constant",
  Method = "method",
  Macro = "macro",
  Operator = "operator",
}

export type Theme = {
  [key in TokenType]: string;
}