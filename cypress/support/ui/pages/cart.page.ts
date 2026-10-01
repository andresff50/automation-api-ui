import { byTestId, parsePrice } from '../selectors';
import type { Product } from '../types';
import { BasePage } from './base.page';

const selectors = {
  item: byTestId('inventory-item'),
  itemName: byTestId('inventory-item-name'),
  itemPrice: byTestId('inventory-item-price'),
  itemQuantity: byTestId('item-quantity'),
  checkout: byTestId('checkout'),
};

class CartPage extends BasePage {
  protected readonly path = '/cart.html';
  protected readonly title = 'Your Cart';

  assertContainsExactly(expected: Product[]): this {
    cy.get(selectors.item)
      .should('have.length', expected.length)
      .then(($items) => {
        const actual = $items.toArray().map((item) => ({
          name: Cypress.$(item).find(selectors.itemName).text().trim(),
          price: parsePrice(Cypress.$(item).find(selectors.itemPrice).text()),
          quantity: Number(Cypress.$(item).find(selectors.itemQuantity).text()),
        }));

        expect(Cypress._.sortBy(actual, 'name'), 'cart items').to.deep.equal(
          Cypress._.sortBy(
            expected.map((product) => ({ ...product, quantity: 1 })),
            'name',
          ),
        );
      });
    return this;
  }

  checkout(): this {
    cy.get(selectors.checkout).click();
    return this;
  }
}

export const cartPage = new CartPage();
