export const expectStatus = (
  response: Cypress.Response<unknown>,
  expected: number,
) => {
  expect(response.status, 'HTTP status').to.eq(expected);
};

export const expectJsonResponse = (
  response: Cypress.Response<unknown>,
  expectedStatus: number,
) => {
  expectStatus(response, expectedStatus);
  expect(response.headers['content-type'], 'content-type').to.include(
    'application/json',
  );
};
