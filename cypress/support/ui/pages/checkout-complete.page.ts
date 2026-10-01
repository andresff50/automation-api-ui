import { byTestId } from '../selectors';
import { BasePage } from './base.page';

const selectors = {
  header: byTestId('complete-header'),
};

class CheckoutCompletePage extends BasePage {
  protected readonly path = '/checkout-complete.html';
  protected readonly title = 'Checkout: Complete!';

  assertSuccessMessage(): this {
    cy.get(selectors.header)
      .should('be.visible')
      .and('have.text', 'Thank you for your order!');
    return this;
  }
}

export const checkoutCompletePage = new CheckoutCompletePage();
