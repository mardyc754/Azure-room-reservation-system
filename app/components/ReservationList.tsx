import type { User } from '@/schemas/auth';
import { ReservationCard } from './ReservationCard';
import type { Reservation } from '@/db/schema';
import type { FullReservationData } from '@/schemas/reservation';

type ReservationListProps = {
  data: FullReservationData[];
};

export const ReservationList = ({ data }: ReservationListProps) => {
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="flex flex-col space-y-4">
      {data?.map((reservation) => (
        <ReservationCard key={reservation.id} data={reservation} />
      ))}
    </div>
  );
};
