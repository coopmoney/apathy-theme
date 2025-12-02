import { Theme, TokenType } from "../types";

export const colors = {
  "#8e93b0c2": "#8e93b0c2",
  "#4d4e6e": "#4d4e6e",
  "#887a77d9": "#887a77d9",
  "#c3dc8f": "#c3dc8f",
  "#998fe1cf": "#998fe1cf",
  "#cdf6ff": "#cdf6ff",
  "#9aa1c7": "#9aa1c7",
  "#baf8e5": "#baf8e5",
  "#fab16c": "#fab16c",
  "#6cfaa0": "#6cfaa0",
  "#e60063": "#e60063",
  "#0e0e15": "#0e0e15",
  "#8a8276": "#8a8276",
  "#e0a2b1": "#e0a2b1",
}

export const theme: Theme = {
  [TokenType.Background]: colors["#0e0e15"],
  [TokenType.Source]: colors["#8e93b0c2"],
  [TokenType.Strings]: colors["#c3dc8f"],
  [TokenType.Keyword]: colors["#998fe1cf"],
  [TokenType.Struct]: colors["#cdf6ff"],
  [TokenType.Variable]: colors["#9aa1c7"],
  [TokenType.Method]: colors["#baf8e5"],
  [TokenType.Constant]: colors["#8e93b0c2"],
  [TokenType.Property]: colors["#8a8276"],
  [TokenType.Macro]: colors["#fab16c"],
  [TokenType.Operator]: colors["#e60063"],
}