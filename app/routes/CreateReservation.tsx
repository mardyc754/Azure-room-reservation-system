import { PageWrapper } from '@/components/PageWrapper';

import type { Route } from './+types/CreateReservation';

import type { CreateReservationData } from '@/schemas/reservation';
// import { createReservation } from '@/server/reservation.server';
import { redirect, useNavigate } from 'react-router';
import type { Room, User } from '@/db/schema';
import { CreateReservationForm } from '@/components/forms/CreateReservationForm';

import {
  createReservation,
  getReservationsByRoomId
} from '@/server/reservation.server';
import { getRoomById } from '@/server/room.server';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Create a reservation' },
    { name: 'description', content: 'Create a reservation' }
  ];
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const data = (await request.json()) as CreateReservationData & {
      roomId: Room['id'];
      userId: User['id'];
    };

    await createReservation(data);
    return redirect('/reservations');
  } catch (error) {
    console.error(error);
    return new Response(`Error when creating reservation. Details: ${error}`, {
      status: 500
    });
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  // return await getAllRooms();
  const roomId = parseInt(params.roomId);

  const reservations = await getReservationsByRoomId(roomId);
  const room = await getRoomById(roomId);

  if (!reservations) {
    return new Response('Room not found', { status: 404 });
  }

  return { reservations, room };
}

export default function CreateReservation({
  loaderData,
  params
}: Route.ComponentProps) {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <CreateReservationForm
        selectedRoom={loaderData.room}
        reservations={loaderData.reservations}
        onReturn={() => navigate('/create-reservation')}
      />
    </PageWrapper>
  );
}
