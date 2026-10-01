import { expectStatus } from '../../support/validators/response.validator';

describe('Health check API', () => {
  it('reports the API is up', () => {
    cy.healthCheck().then((response) => {
      expectStatus(response, 201);
    });
  });
});
