import { buildBooking } from '../../support/factories/booking.factory';
import {
  expectBookingToEqual,
  expectValidBookingSchema,
} from '../../support/validators/booking.validator';
import {
  expectJsonResponse,
  expectStatus,
} from '../../support/validators/response.validator';
import type { Booking } from '../../support/types/api.types';

const NO_FAIL = { failOnStatusCode: false };

describe('Booking API - edge cases', () => {
  let token: string;

  before(() => {
    cy.getAuthToken().then((authToken) => {
      token = authToken;
    });
  });

  it('rejects a booking with missing required fields', () => {
    cy.createBooking({ firstname: 'Jim' } as Booking, NO_FAIL).then(
      (response) => {
        // The API answers 500 rather than 400 here; only assert rejection.
        expect(response.status, 'HTTP status').to.be.at.least(400);
      },
    );
  });

  it('returns 404 for a booking that does not exist', () => {
    cy.getBooking(0, NO_FAIL).then((response) => {
      expectStatus(response, 404);
    });
  });

  describe('with an existing booking', () => {
    let booking: Booking;
    let bookingId: number;

    beforeEach(() => {
      booking = buildBooking();
      cy.createBooking(booking).then(({ body }) => {
        bookingId = body.bookingid;
      });
    });

    afterEach(() => {
      cy.deleteBooking(bookingId, token, NO_FAIL);
    });

    it('finds the booking id when filtering by name', () => {
      cy.getBookingIds({
        firstname: booking.firstname,
        lastname: booking.lastname,
      }).then((response) => {
        expectJsonResponse(response, 200);
        expect(response.body).to.be.an('array');
        const ids = response.body.map(({ bookingid }) => bookingid);
        expect(ids).to.include(bookingId);
      });
    });

    it('partially updates only the given fields', () => {
      const changes = { firstname: 'James', totalprice: 999 };

      cy.partialUpdateBooking(bookingId, changes, token).then((response) => {
        expectJsonResponse(response, 200);
        expectBookingToEqual(response.body, { ...booking, ...changes });
      });
    });

    it('forbids updating without a token', () => {
      cy.updateBooking(bookingId, buildBooking(), undefined, NO_FAIL).then(
        (response) => {
          expectStatus(response, 403);
        },
      );
      cy.getBooking(bookingId).then(({ body }) => {
        expectBookingToEqual(body, booking);
      });
    });

    it('forbids partially updating without a token', () => {
      cy.partialUpdateBooking(
        bookingId,
        { firstname: 'Hacker' },
        undefined,
        NO_FAIL,
      ).then((response) => {
        expectStatus(response, 403);
      });
    });

    it('forbids deleting without a token', () => {
      cy.deleteBooking(bookingId, undefined, NO_FAIL).then((response) => {
        expectStatus(response, 403);
      });
      cy.getBooking(bookingId).then((response) => {
        expectValidBookingSchema(response.body);
      });
    });
  });
});
