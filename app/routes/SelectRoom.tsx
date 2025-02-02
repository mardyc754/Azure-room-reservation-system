import { redirect } from 'react-router';
import { getAllRooms } from '@/server/room.server';
import { getCurrentUser } from '@/server/auth.server';

import { PageWrapper } from '@/components/PageWrapper';
import { SelectRoomForm } from '@/components/forms/SelectRoomForm';

import type { Route } from './+types/SelectRoom';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Create a reservation' },
    { name: 'description', content: 'Create a reservation' }
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = await getCurrentUser(request);

  if (!user) {
    return redirect('/sign-in');
  }

  return await getAllRooms();
}

export default function SelectRoom({ loaderData }: Route.ComponentProps) {
  return (
    <PageWrapper>
      <SelectRoomForm />
    </PageWrapper>
  );
}
