import type { CustomerInfo } from '../types';

export const buildCustomer = (
  overrides: Partial<CustomerInfo> = {},
): CustomerInfo => ({
  firstName: 'Jim',
  lastName: `Brown${Cypress._.random(1000, 9999)}`,
  postalCode: '10001',
  ...overrides,
});
