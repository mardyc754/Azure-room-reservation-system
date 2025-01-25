import { data, redirect } from 'react-router';
import {
  createReservation,
  getReservationsByRoomId
} from '@/server/reservation.server';
import { getRoomById } from '@/server/room.server';
import type { Room, User } from '@/db/schema';

import type { CreateReservationData } from '@/schemas/reservation';
import { PageWrapper } from '@/components/PageWrapper';
import { CreateReservationForm } from '@/components/forms/CreateReservationForm';

import type { Route } from './+types/CreateReservation';
import { getCurrentUser } from '@/server/auth.server';

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

export async function loader({ request, params }: Route.LoaderArgs) {
  const user = await getCurrentUser(request);

  if (!user) {
    return redirect('/sign-in');
  }

  const roomId = parseInt(params.roomId);

  const reservations = await getReservationsByRoomId(roomId);
  const room = await getRoomById(roomId);

  if (!reservations) {
    return data('Room not found', { status: 404 });
  }

  return { reservations, room };
}

export default function CreateReservation() {
  return (
    <PageWrapper>
      <CreateReservationForm />
    </PageWrapper>
  );
}
