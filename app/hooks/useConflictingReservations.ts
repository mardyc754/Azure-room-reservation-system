import { findConflictingReservation } from '@/utils/reservationUtils';

import type { FieldErrors, FieldValues } from 'react-hook-form';
import { useMemo } from 'react';
import type { Reservation } from '@/db/schema';

type UseConflictingReservationsOptions<T extends FieldValues> = {
  startDate: string;
  endDate: string;
  existingReservations: Reservation[];
  errors: FieldErrors<T>;
};

export const useConflictingReservations = <T extends FieldValues>({
  startDate,
  endDate,
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
