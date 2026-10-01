export const JSON_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
} as const;

export const authHeaders = (token?: string) =>
  token ? { ...JSON_HEADERS, Cookie: `token=${token}` } : { ...JSON_HEADERS };
