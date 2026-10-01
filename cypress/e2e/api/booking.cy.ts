import { buildBooking } from '../../support/factories/booking.factory';
import { expectBookingToEqual } from '../../support/validators/booking.validator';
import {
  expectJsonResponse,
  expectStatus,
} from '../../support/validators/response.validator';
import type { Booking } from '../../support/types/api.types';

describe('Booking API - lifecycle', () => {
  const booking: Booking = buildBooking();
  const NEW_CHECKOUT = '2019-02-04';

  let token: string;
  let bookingId: number;

  it('generates an auth token', () => {
    cy.getAuthToken().then((authToken) => {
      token = authToken;
    });
  });

  it('creates a booking and extracts its id', () => {
    cy.createBooking(booking).then((response) => {
      expectJsonResponse(response, 200);
      expect(response.body.bookingid, 'bookingid').to.be.a('number');
      expectBookingToEqual(response.body.booking, booking);

      bookingId = response.body.bookingid;
    });
  });

  it('reads the booking by id and the data matches', () => {
    cy.getBooking(bookingId).then((response) => {
      expectJsonResponse(response, 200);
      expectBookingToEqual(response.body, booking);
    });
  });

  it('updates the checkout date with the auth token', () => {
    const updated: Booking = {
      ...booking,
      bookingdates: { ...booking.bookingdates, checkout: NEW_CHECKOUT },
    };

    cy.updateBooking(bookingId, updated, token).then((response) => {
      expectJsonResponse(response, 200);
      expect(response.body.bookingdates.checkout).to.eq(NEW_CHECKOUT);
      expectBookingToEqual(response.body, updated);
    });
    cy.getBooking(bookingId).then(({ body }) => {
      expectBookingToEqual(body, updated);
    });
  });

  it('deletes the booking and it can no longer be found', () => {
    cy.deleteBooking(bookingId, token).then((response) => {
      expectStatus(response, 201);
    });
    cy.getBooking(bookingId, { failOnStatusCode: false }).then((response) => {
      expectStatus(response, 404);
    });
  });
});
