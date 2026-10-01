import { byTestId, parsePrice } from '../selectors';
import type { Product } from '../types';
import { BasePage } from './base.page';

const selectors = {
  itemName: byTestId('inventory-item-name'),
  subtotal: byTestId('subtotal-label'),
  finish: byTestId('finish'),
};

class CheckoutOverviewPage extends BasePage {
  protected readonly path = '/checkout-step-two.html';
  protected readonly title = 'Checkout: Overview';

  assertSummary(products: Product[]): this {
    cy.get(selectors.itemName).then(($names) => {
      const names = $names.toArray().map((el) => el.innerText.trim());
      expect(names, 'overview items').to.have.members(
        products.map(({ name }) => name),
      );
    });

    cy.get(selectors.subtotal)
      .invoke('text')
      .then((text) => {
        expect(parsePrice(text), 'item total').to.be.closeTo(
          Cypress._.sumBy(products, 'price'),
          0.001,
        );
      });
    return this;
  }

  finish(): this {
    cy.get(selectors.finish).click();
    return this;
  }
}

export const checkoutOverviewPage = new CheckoutOverviewPage();
