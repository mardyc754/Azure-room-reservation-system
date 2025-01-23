import { useFetcher } from 'react-router';
import { useForm } from 'react-hook-form';

import {
  type ChangeReservationData,
  type FullReservationData,
  changeReservationDataResolver
} from '@/schemas/reservation';

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
