import type { Reservation } from '@/db/schema';
import { isAfter, isBefore } from './dateUtils';

export const findConflictingReservation = (
  startDate: string,
  endDate: string,
  reservations: Reservation[]
) => {
  for (const reservation of reservations) {
    const { startDate: existingStart, endDate: existingEnd } = reservation;

    if (isAfter(existingEnd, startDate) && isBefore(existingStart, endDate)) {
      return reservation;
    }
  }
  return null;
};
