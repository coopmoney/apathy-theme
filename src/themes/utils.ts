import Color from 'color';

export function lighten(color: string, amount: number): string {
  return Color(color).lighten(amount).hex();
}

export function darken(color: string, amount: number): string {
  return Color(color).darken(amount).hex();
}

export function transparentize(color: string, amount: number): string {
  return Color(color).alpha(1 - amount).hex();
}

export function mix(color1: string, color2: string, amount: number = 0.5): string {
  return Color(color1).mix(Color(color2), amount).hex();
}

export function lighter(color: string) {
  return lighten(color, 0.2);
}

export function darker(color: string) {
  return darken(color, 0.2);
}

export function l10(color: string) {
  return lighten(color, 0.1);
}

export function l20(color: string) {
  return lighten(color, 0.2);
}

export function d10(color: string) {
  return darken(color, 0.1);
}

export function d20(color: string) {
  return darken(color, 0.2);
}

export function alpha10(color: string) {
  return transparentize(color, 0.1);
}

export function alpha20(color: string) {
  return transparentize(color, 0.2);
}

export function alpha50(color: string) {
  return transparentize(color, 0.5);
}