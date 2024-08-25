export const subtle = globalThis.crypto?.subtle;
export const randomUUID = () => {
  return globalThis.crypto?.randomUUID();
};
export const getRandomValues = (array) => {
  return globalThis.crypto?.getRandomValues(array);
};
