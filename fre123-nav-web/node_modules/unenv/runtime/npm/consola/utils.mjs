const _colorize = String;
export const colorize = (color, str) => _colorize(str);
export const getColor = (color, fallback) => () => _colorize(color);
export const stripAnsi = (str) => str;
export const box = (str, opts) => str;
export const align = (alignment, str, len, space) => str;
export const leftAlign = (str, len, space) => str;
export const rightAlign = (str, len, space) => str;
export const centerAlign = (str, len, space) => str;
export const colors = new Proxy({}, {
  get(_, colorName) {
    return _colorize;
  }
});
export default {
  colorize,
  getColor,
  stripAnsi,
  align,
  leftAlign,
  rightAlign,
  centerAlign,
  box,
  colors
};
