import { byTestId } from '../selectors';

const selectors = {
  username: byTestId('username'),
  password: byTestId('password'),
  submit: byTestId('login-button'),
};

class LoginPage {
  visit(): this {
    cy.visit('/');
    cy.get(selectors.username).should('be.visible');
    return this;
  }

  login(username: string, password: string): this {
    cy.get(selectors.username).type(username);
    cy.get(selectors.password).type(password, { log: false });
    cy.get(selectors.submit).click();
    return this;
  }

  /** Credentials come from cypress.config.ts (override via CYPRESS_UI_USERNAME / CYPRESS_UI_PASSWORD). */
  loginAsStandardUser(): this {
    cy.env(['UI_USERNAME', 'UI_PASSWORD'], { log: false }).then(
      ({ UI_USERNAME, UI_PASSWORD }) => {
        this.login(UI_USERNAME, UI_PASSWORD);
      },
    );
    return this;
  }
}

export const loginPage = new LoginPage();
