import { Endpoints } from '../api/endpoints';
import { authHeaders, JSON_HEADERS } from '../api/headers';
import type {
  Booking,
  BookingFilters,
  BookingId,
  CreateBookingResponse,
  RequestOverrides,
} from '../types/api.types';

declare global {
  namespace Cypress {
    interface Chainable {
      createBooking(
        booking: Booking,
        options?: RequestOverrides,
      ): Chainable<Response<CreateBookingResponse>>;
      getBooking(
        id: number,
        options?: RequestOverrides,
      ): Chainable<Response<Booking>>;
      getBookingIds(
        filters?: BookingFilters,
        options?: RequestOverrides,
      ): Chainable<Response<BookingId[]>>;
      updateBooking(
        id: number,
        booking: Booking,
        token?: string,
        options?: RequestOverrides,
      ): Chainable<Response<Booking>>;
      partialUpdateBooking(
        id: number,
        changes: Partial<Booking>,
        token?: string,
        options?: RequestOverrides,
      ): Chainable<Response<Booking>>;
      deleteBooking(
        id: number,
        token?: string,
        options?: RequestOverrides,
      ): Chainable<Response<string>>;
    }
  }
}

Cypress.Commands.add(
  'createBooking',
  (booking: Booking, options: RequestOverrides = {}) =>
    cy.request<CreateBookingResponse>({
      method: 'POST',
      url: Endpoints.booking,
      headers: JSON_HEADERS,
      body: booking,
      ...options,
    }),
);

Cypress.Commands.add(
  'getBooking',
  (id: number, options: RequestOverrides = {}) =>
    cy.request<Booking>({
      method: 'GET',
      url: Endpoints.bookingById(id),
      headers: JSON_HEADERS,
      ...options,
    }),
);

Cypress.Commands.add(
  'getBookingIds',
  (filters: BookingFilters = {}, options: RequestOverrides = {}) =>
    cy.request<BookingId[]>({
      method: 'GET',
      url: Endpoints.booking,
      headers: JSON_HEADERS,
      qs: filters,
      ...options,
    }),
);

Cypress.Commands.add(
  'updateBooking',
  (
    id: number,
    booking: Booking,
    token?: string,
    options: RequestOverrides = {},
  ) =>
    cy.request<Booking>({
      method: 'PUT',
      url: Endpoints.bookingById(id),
      headers: authHeaders(token),
      body: booking,
      ...options,
    }),
);

Cypress.Commands.add(
  'partialUpdateBooking',
  (
    id: number,
    changes: Partial<Booking>,
    token?: string,
    options: RequestOverrides = {},
  ) =>
    cy.request<Booking>({
      method: 'PATCH',
      url: Endpoints.bookingById(id),
      headers: authHeaders(token),
      body: changes,
      ...options,
    }),
);

Cypress.Commands.add(
  'deleteBooking',
  (id: number, token?: string, options: RequestOverrides = {}) =>
    cy.request<string>({
      method: 'DELETE',
      url: Endpoints.bookingById(id),
      headers: authHeaders(token),
      ...options,
    }),
);
