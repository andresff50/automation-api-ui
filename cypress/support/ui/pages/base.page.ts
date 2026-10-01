import { byTestId } from '../selectors';

export abstract class BasePage {
  protected abstract readonly path: string;
  protected abstract readonly title: string;

  assertIsOpen(): this {
    cy.location('pathname').should('eq', this.path);
    cy.get(byTestId('title')).should('have.text', this.title);
    return this;
  }
}
