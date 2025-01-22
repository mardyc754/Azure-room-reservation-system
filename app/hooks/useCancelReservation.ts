import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cancelReservation } from '@/server/reservation.server';
import { reservation } from '@/constants/queryKeys';
import type { Reservation } from '@/schemas/reservation';

import { useCurrentUser } from './auth';

type UseChangeReservationDataOptions = {
  reservationId: Reservation['id'];
};

export const useCancelReservationData = ({
  reservationId
}: UseChangeReservationDataOptions) => {
  // const queryClient = useQueryClient();
  // const { data: currentUserData } = useCurrentUser();
  // const mutation = useMutation({
  //   mutationFn: () => cancelReservation(reservationId),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: reservation.user(currentUserData!.id!),
  //     });
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //   },
  // });
  // return mutation;
};
