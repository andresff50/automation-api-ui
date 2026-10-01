import type { Booking } from '../types/api.types';

const uniqueSuffix = () => `${Date.now()}${Cypress._.random(100, 999)}`;

export const buildBooking = (overrides: Partial<Booking> = {}): Booking => ({
  firstname: 'Jim',
  lastname: `Brown${uniqueSuffix()}`,
  totalprice: 111,
  depositpaid: true,
  bookingdates: {
    checkin: '2018-01-01',
    checkout: '2019-01-01',
  },
  additionalneeds: 'Breakfast',
  ...overrides,
});
