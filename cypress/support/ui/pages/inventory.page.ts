import { byTestId, byTestIdPrefix, parsePrice } from '../selectors';
import type { Product } from '../types';
import { BasePage } from './base.page';

const selectors = {
  item: byTestId('inventory-item'),
  itemName: byTestId('inventory-item-name'),
  itemPrice: byTestId('inventory-item-price'),
  addToCart: byTestIdPrefix('add-to-cart'),
  remove: byTestIdPrefix('remove'),
};

class InventoryPage extends BasePage {
  protected readonly path = '/inventory.html';
  protected readonly title = 'Products';

  addRandomProductsToCart(count: number): Cypress.Chainable<Product[]> {
    return cy
      .get(selectors.item)
      .should('have.length.at.least', count)
      .then(($items) => {
        const products: Product[] = Cypress._.sampleSize(
          $items.toArray(),
          count,
        ).map((item) => ({
          name: Cypress.$(item).find(selectors.itemName).text().trim(),
          price: parsePrice(Cypress.$(item).find(selectors.itemPrice).text()),
        }));

        products.forEach(({ name }) => this.addProductToCart(name));
        return cy.wrap(products);
      });
  }

  addProductToCart(name: string): this {
    this.getItemByName(name).within(() => {
      cy.get(selectors.addToCart).click();
      cy.get(selectors.remove).should('be.visible');
    });
    return this;
  }

  private getItemByName(name: string) {
    return cy
      .get(selectors.item)
      .filter(
        (_, item) =>
          Cypress.$(item).find(selectors.itemName).text().trim() === name,
      )
      .should('have.length', 1);
  }
}

export const inventoryPage = new InventoryPage();
