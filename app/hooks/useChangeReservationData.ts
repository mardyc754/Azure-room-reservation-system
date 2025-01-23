import { useFetcher, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// import { changeReservationData } from '@/server/reservation.server';
import {
  type ChangeReservationData,
  type FullReservationData,
  changeReservationDataResolver
} from '@/schemas/reservation';

import { useCurrentUser } from './auth';
import { formatDateTime } from '@/utils/dateUtils';
import { useAuthProvider } from '@/providers/AuthProvider';

type UseChangeReservationDataOptions = {
  reservationData: FullReservationData;
};

export const useChangeReservationData = ({
  reservationData
}: UseChangeReservationDataOptions) => {
  const { currentUser } = useAuthProvider();

  if (!currentUser) {
    throw new Error('currentUser is not defined');
  }

  const fetcher = useFetcher();
  const {
    id: reservationId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    username,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    roomName,
    ...initialFormData
  } = reservationData;

  const methods = useForm<ChangeReservationData>({
    resolver: changeReservationDataResolver,
    defaultValues: {
      ...initialFormData,
      startDate: formatDateTime(new Date(initialFormData.startDate)),
      endDate: formatDateTime(new Date(initialFormData.endDate))
    }
  });
  const { handleSubmit, getValues } = methods;
  // const mutation = useMutation({
  //   mutationFn: () =>
  //     changeReservationData(reservationId, {
  //       ...getValues(),
  //     }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: reservation.user(currentUserData!.id!),
  //     });
  //     navigate("/reservations");
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //   },
  // });
  const onSubmit = handleSubmit(() => {
    fetcher.submit(
      {
        data: getValues(),
        reservationId,
        userId: currentUser.id
      },
      {
        method: 'put',
        encType: 'application/json'
      }
    );
  });
  return {
    ...methods,
    onSubmit
  };
};
