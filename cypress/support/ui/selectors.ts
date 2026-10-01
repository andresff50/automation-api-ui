export const byTestId = (id: string) => `[data-test="${id}"]`;

export const byTestIdPrefix = (prefix: string) => `[data-test^="${prefix}"]`;

export const parsePrice = (text: string) =>
  Number(text.replace(/[^0-9.]/g, ''));
