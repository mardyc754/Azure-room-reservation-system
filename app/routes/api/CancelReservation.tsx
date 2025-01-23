import { redirect } from 'react-router';
import type { Route } from './+types/Logout';

import { cancelReservation } from '@/server/reservation.server';

export async function action({ request }: Route.ActionArgs) {
  const { reservationId, userId } = await request.json();
  await cancelReservation(reservationId, userId);

  return redirect('/reservations');
}

export async function loader() {
  return redirect('/reservations');
}
