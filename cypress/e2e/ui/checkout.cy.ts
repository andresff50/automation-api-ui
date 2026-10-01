import { SAUCE_DEMO_URL } from '../../support/ui/config';
import { buildCustomer } from '../../support/ui/factories/customer.factory';
import {
  cartPage,
  checkoutCompletePage,
  checkoutInformationPage,
  checkoutOverviewPage,
  header,
  inventoryPage,
  loginPage,
} from '../../support/ui/pages';

const ITEMS_TO_BUY = 2;

describe(
  'SauceDemo - checkout critical path',
  { baseUrl: SAUCE_DEMO_URL },
  () => {
    beforeEach(() => {
      loginPage.visit().loginAsStandardUser();
      inventoryPage.assertIsOpen();
      header.assertCartCount(0);
    });

    it('buys two distinct products and shows the order confirmation', () => {
      inventoryPage.addRandomProductsToCart(ITEMS_TO_BUY).then((products) => {
        expect(
          Cypress._.uniqBy(products, 'name'),
          'distinct products',
        ).to.have.length(ITEMS_TO_BUY);
        header.assertCartCount(ITEMS_TO_BUY).openCart();

        cartPage.assertIsOpen().assertContainsExactly(products).checkout();

        checkoutInformationPage
          .assertIsOpen()
          .fillForm(buildCustomer())
          .continue();

        checkoutOverviewPage.assertIsOpen().assertSummary(products).finish();

        checkoutCompletePage.assertIsOpen().assertSuccessMessage();
        header.assertCartCount(0);
      });
    });
  },
);
