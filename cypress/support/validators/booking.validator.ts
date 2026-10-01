import type { Booking } from '../types/api.types';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Checks the booking has the documented fields with the documented types. */
export const expectValidBookingSchema = (booking: Booking) => {
  expect(booking, 'booking').to.include.all.keys(
    'firstname',
    'lastname',
    'totalprice',
    'depositpaid',
    'bookingdates',
  );
  expect(booking.firstname, 'firstname').to.be.a('string');
  expect(booking.lastname, 'lastname').to.be.a('string');
  expect(booking.totalprice, 'totalprice').to.be.a('number');
  expect(booking.depositpaid, 'depositpaid').to.be.a('boolean');
  expect(booking.bookingdates.checkin, 'checkin').to.match(ISO_DATE);
  expect(booking.bookingdates.checkout, 'checkout').to.match(ISO_DATE);
};

export const expectBookingToEqual = (actual: Booking, expected: Booking) => {
  expectValidBookingSchema(actual);
  expect(actual, 'booking').to.deep.equal(expected);
};
