import { Theme, TokenType } from "../types";

export const colors = {
  "#0e0b13": "#0e0b13",
  "#e3e1e8c8": "#e3e1e8c8",
  "#b1d36d": "#b1d36d",
  "#afd1e9cf": "#afd1e9cf",
  "#e3e1e8e4": "#e3e1e8e4",
  "#8e8db3": "#8e8db3",
  "#ffb547": "#ffb547",
  "#33b3cc": "#33b3cc",
  "#e60063": "#e60063",
}

export const theme: Theme = {
  [TokenType.Background]: colors["#0e0b13"],
  [TokenType.Source]: colors["#e3e1e8c8"],
  [TokenType.Strings]: colors["#b1d36d"],
  [TokenType.Keyword]: colors["#afd1e9cf"],
  [TokenType.Struct]: colors["#ffb547"],
  [TokenType.Variable]: colors["#e3e1e8e4"],
  [TokenType.Method]: colors["#ffb547"],
  [TokenType.Constant]: colors["#33b3cc"],
  [TokenType.Property]: colors["#e3e1e8e4"],
  [TokenType.Macro]: colors["#e3e1e8e4"],
  [TokenType.Operator]: colors["#e60063"],
}