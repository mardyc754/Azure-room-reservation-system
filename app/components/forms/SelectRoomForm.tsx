import type { Room } from '@/db/schema';

import { Button } from '../Button';

type ReservationFormProps = {
  data: Room[];
};

export const SelectRoomForm = ({ data }: ReservationFormProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl">Select a room:</h1>
      <div className="grid grid-cols-3 gap-4">
        {/* {isLoading && <p>Loading...</p>} */}
        {data?.map((room) => (
          <Button key={room.id}>
            <a href={`/create-reservation/${room.id}`}>{room.name}</a>
          </Button>
        ))}
      </div>
    </div>
  );
};
