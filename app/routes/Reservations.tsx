import { PageWrapper } from '@/components/PageWrapper';
import { ReservationList } from '@/components/ReservationList';

import { useAuthProvider } from '@/providers/AuthProvider';
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
      return new Response('Unauthorized', { status: 401 });
    }

    return await getReservationsByUserId(user.id);
  } catch (error) {
    console.error(error);
    return new Response(`Error when loading reservations`, {
      status: 500
    });
  }
}

export default function Reservations({ loaderData }: Route.ComponentProps) {
  const { currentUser } = useAuthProvider();
  // const { data: currentUserData } = useCurrentUser();

  return (
    <PageWrapper title="Your reservations">
      {!!currentUser && <ReservationList data={loaderData} />}
    </PageWrapper>
  );
}
