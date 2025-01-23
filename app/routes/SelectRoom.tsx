import { PageWrapper } from '@/components/PageWrapper';
import { SelectRoomForm } from '@/components/forms/SelectRoomForm';

import type { Route } from './+types/SelectRoom';
import { getAllRooms } from '@/server/room.server';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Create a reservation' },
    { name: 'description', content: 'Create a reservation' }
  ];
}

export async function loader({}: Route.LoaderArgs) {
  return await getAllRooms();
}

export default function SelectRoom({ loaderData }: Route.ComponentProps) {
  return (
    <PageWrapper>
      <SelectRoomForm data={loaderData} />
    </PageWrapper>
  );
}
