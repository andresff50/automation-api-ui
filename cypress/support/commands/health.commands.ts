import { Endpoints } from '../api/endpoints';

declare global {
  namespace Cypress {
    interface Chainable {
      healthCheck(): Chainable<Response<string>>;
    }
  }
}

Cypress.Commands.add('healthCheck', () =>
  cy.request<string>({ method: 'GET', url: Endpoints.ping }),
);
