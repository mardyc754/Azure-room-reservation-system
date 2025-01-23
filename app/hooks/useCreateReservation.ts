import { useFetcher } from 'react-router';
import { useForm } from 'react-hook-form';

import {
  createReservationResolver,
  type CreateReservationData
} from '@/schemas/reservation';
import type { Room } from '@/db/schema';

import { useAuthProvider } from '@/providers/AuthProvider';

type UseCreateReservationOptions = {
  selectedRoom: Room;
};

export const useCreateReservation = ({
  selectedRoom
}: UseCreateReservationOptions) => {
  const { currentUser } = useAuthProvider();

  if (!currentUser) {
    throw new Error('currentUser is not defined');
  }

  const fetcher = useFetcher();

  const methods = useForm<CreateReservationData>({
    resolver: createReservationResolver
  });

  const { handleSubmit, getValues } = methods;

  const onSubmit = handleSubmit(() => {
    fetcher.submit(
      { ...getValues(), roomId: selectedRoom.id, userId: currentUser.id },
      {
        method: 'post',
        encType: 'application/json'
      }
    );
  });

  return {
    ...methods,
    onSubmit
  };
};
