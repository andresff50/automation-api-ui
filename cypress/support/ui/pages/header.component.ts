import { byTestId } from '../selectors';

const selectors = {
  cartLink: byTestId('shopping-cart-link'),
  cartBadge: byTestId('shopping-cart-badge'),
};

class HeaderComponent {
  openCart(): this {
    cy.get(selectors.cartLink).click();
    return this;
  }

  assertCartCount(count: number): this {
    if (count === 0) {
      cy.get(selectors.cartBadge).should('not.exist');
    } else {
      cy.get(selectors.cartBadge).should('have.text', String(count));
    }
    return this;
  }
}

export const header = new HeaderComponent();
