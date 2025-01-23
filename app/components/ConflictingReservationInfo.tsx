import type { Reservation } from '@/db/schema';
import { displayDatesAsFullTimeslot } from '@/utils/dateUtils';

type ConflictingReservationInfoProps = {
  data: Reservation;
};

export const ConflictingReservationInfo = ({
  data
}: ConflictingReservationInfoProps) => {
  return (
    <p className="text-red-500">
      There is a conflicting reservation from{' '}
      {displayDatesAsFullTimeslot(data.startDate, data.endDate)}
    </p>
  );
};
