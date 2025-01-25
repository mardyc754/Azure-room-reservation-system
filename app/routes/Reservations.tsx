import { data, redirect } from 'react-router';

import { PageWrapper } from '@/components/PageWrapper';
import { ReservationList } from '@/components/ReservationList';

import { getReservationsByUserId } from '@/server/reservation.server';
import { getCurrentUser } from '@/server/auth.server';

import type { Route } from './+types/Reservations';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Your Reservations' },
    { name: 'description', content: 'Your Reservations' }
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return redirect('/sign-in');
    }

    return await getReservationsByUserId(user.id);
  } catch (error) {
    console.error(error);
    return data(`Error when loading reservations`, {
      status: 500
    });
  }
}

export default function Reservations() {
  return (
    <PageWrapper title="Your reservations">
      <ReservationList />
    </PageWrapper>
  );
}
