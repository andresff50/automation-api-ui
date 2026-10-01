import { Endpoints } from '../api/endpoints';
import { JSON_HEADERS } from '../api/headers';
import type { AuthResponse, Credentials } from '../types/api.types';

declare global {
  namespace Cypress {
    interface Chainable {
      requestAuthToken(
        credentials: Credentials,
      ): Chainable<Response<AuthResponse>>;
      getAuthToken(): Chainable<string>;
    }
  }
}

Cypress.Commands.add('requestAuthToken', (credentials: Credentials) =>
  cy.request<AuthResponse>({
    method: 'POST',
    url: Endpoints.auth,
    headers: JSON_HEADERS,
    body: credentials,
  }),
);

Cypress.Commands.add('getAuthToken', () =>
  cy
    .env(['API_USERNAME', 'API_PASSWORD'], { log: false })
    .then(({ API_USERNAME, API_PASSWORD }) =>
      cy.requestAuthToken({ username: API_USERNAME, password: API_PASSWORD }),
    )
    .then(({ status, body }) => {
      expect(status, 'auth status').to.eq(200);
      expect(body.token, 'auth token').to.be.a('string').and.not.be.empty;
      return body.token as string;
    }),
);
