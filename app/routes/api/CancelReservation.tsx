import { redirect } from 'react-router';
import type { Route } from './+types/Logout';

import { cancelReservation } from '@/server/reservation.server';
import { getCurrentUser } from '@/server/auth.server';

export async function action({ request, params }: Route.ActionArgs) {
  const currentUser = await getCurrentUser(request);

  if (!currentUser) {
    return new Response('Unauthorized', { status: 401 });
  }

  const reservationId = params.reservationId as string;

  await cancelReservation(parseInt(reservationId), currentUser?.id);

  return redirect('/reservations');
}

export async function loader() {
  return redirect('/reservations');
}
