import { useLoaderData } from 'react-router';
import { ReservationCard } from './ReservationCard';
import type { FullReservationData } from '@/schemas/reservation';

export const ReservationList = () => {
  const data = useLoaderData<FullReservationData[]>();
  return (
    <div className="flex flex-col space-y-4">
      {data.map((reservation) => (
        <ReservationCard key={reservation.id} data={reservation} />
      ))}
    </div>
  );
};
