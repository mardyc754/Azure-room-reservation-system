import { ReservationCard } from './ReservationCard';
import type { FullReservationData } from '@/schemas/reservation';

type ReservationListProps = {
  data: FullReservationData[];
};

export const ReservationList = ({ data }: ReservationListProps) => {
  return (
    <div className="flex flex-col space-y-4">
      {data?.map((reservation) => (
        <ReservationCard key={reservation.id} data={reservation} />
      ))}
    </div>
  );
};
