import { byTestId } from '../selectors';
import type { CustomerInfo } from '../types';
import { BasePage } from './base.page';

const selectors = {
  firstName: byTestId('firstName'),
  lastName: byTestId('lastName'),
  postalCode: byTestId('postalCode'),
  continue: byTestId('continue'),
};

class CheckoutInformationPage extends BasePage {
  protected readonly path = '/checkout-step-one.html';
  protected readonly title = 'Checkout: Your Information';

  fillForm(customer: CustomerInfo): this {
    (Object.keys(customer) as (keyof CustomerInfo)[]).forEach((field) => {
      cy.get(selectors[field]).type(customer[field]);
      cy.get(selectors[field]).should('have.value', customer[field]);
    });
    return this;
  }

  continue(): this {
    cy.get(selectors.continue).click();
    return this;
  }
}

export const checkoutInformationPage = new CheckoutInformationPage();
