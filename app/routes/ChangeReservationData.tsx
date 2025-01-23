import { ChangeReservationDataForm } from '@/components/forms/ChangeReservationDataForm';
import { PageWrapper } from '@/components/PageWrapper';

import type { Route } from './+types/ChangeReservationData';
import {
  changeReservationData,
  getReservationById,
  getReservationsByRoomId
} from '@/server/reservation.server';
import type { ChangeReservationData, Reservation } from '@/schemas/reservation';
import type { User } from '@/db/schema';
import { redirect } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Change reservation data' },
    { name: 'description', content: 'Change reservation data' }
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const reservationId = parseInt(params.reservationId);

  const reservation = await getReservationById(reservationId);
  const existingReservations = await getReservationsByRoomId(reservationId);

  const reservations = await getReservationsByRoomId(reservationId);

  if (!reservations) {
    return new Response('Room not found', { status: 404 });
  }

  return { reservation, existingReservations };
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const { data, reservationId, userId } = (await request.json()) as {
      data: ChangeReservationData;
      reservationId: Reservation['id'];
      userId: User['id'];
    };

    await changeReservationData(reservationId, userId, data);
    return redirect('/reservations');
  } catch (error) {
    console.error(error);
    return new Response(
      `Error when changing reservation data Details: ${error}`,
      {
        status: 500
      }
    );
  }
}

export default function ChangeReservationData({
  params,
  loaderData
}: Route.ComponentProps) {
  return (
    <PageWrapper>
      {params.reservationId && (
        <div className="flex flex-col space-y-4 items-center justify-center">
          <ChangeReservationDataForm
            reservation={loaderData.reservation}
            existingReservations={loaderData.existingReservations}
          />
        </div>
      )}
    </PageWrapper>
  );
}
