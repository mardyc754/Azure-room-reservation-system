import { findConflictingReservation } from '@/utils/reservationUtils';
import { useReservationsByRoomId } from './useReservations';
import type { Room } from '@/schemas/room';
import type { FieldErrors, FieldValues } from 'react-hook-form';
import { useMemo } from 'react';
import type { FullReservationData } from '@/schemas/reservation';

type UseConflictingReservationsOptions<T extends FieldValues> = {
  startDate: string;
  endDate: string;
  roomId: Room['id'];
  existingReservations: FullReservationData[];
  errors: FieldErrors<T>;
};

export const useConflictingReservations = <T extends FieldValues>({
  startDate,
  endDate,
  roomId,
  existingReservations,
  errors
}: UseConflictingReservationsOptions<T>) => {
  const conflictingReservation = findConflictingReservation(
    startDate,
    endDate,
    existingReservations ?? []
  );

  const disableSubmitButton = useMemo(() => {
    return !!conflictingReservation || Object.keys(errors).length > 0;
  }, [conflictingReservation, errors]);

  return {
    conflictingReservation,
    disableSubmitButton
  };
};
