import { expectJsonResponse } from '../../support/validators/response.validator';

describe('Auth API', () => {
  it('returns a token for valid credentials', () => {
    cy.env(['API_USERNAME', 'API_PASSWORD'], { log: false })
      .then(({ API_USERNAME, API_PASSWORD }) =>
        cy.requestAuthToken({ username: API_USERNAME, password: API_PASSWORD }),
      )
      .then((response) => {
        expectJsonResponse(response, 200);
        expect(response.body.token).to.be.a('string').and.not.be.empty;
        expect(response.body).not.to.have.property('reason');
      });
  });

  it('rejects invalid credentials without issuing a token', () => {
    cy.requestAuthToken({ username: 'invalid', password: 'invalid' }).then(
      (response) => {
        // The API signals bad credentials in the body, not the status code.
        expectJsonResponse(response, 200);
        expect(response.body.reason).to.eq('Bad credentials');
        expect(response.body).not.to.have.property('token');
      },
    );
  });
});
