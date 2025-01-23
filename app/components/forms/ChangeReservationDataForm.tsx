import {
  advanceByMinutes,
  endOfDay,
  formatDateTime,
  nextDay
} from '@/utils/dateUtils';

import type { FullReservationData } from '@/schemas/reservation';

import { Button } from '../Button';
import { LabelWithInput } from '../LabelWithInput';
import { useChangeReservationData } from '@/hooks/useChangeReservationData';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card';
import { useConflictingReservations } from '@/hooks/useConflictingReservations';
import { ConflictingReservationInfo } from '../ConflictingReservationInfo';
import { Form, useFetcher } from 'react-router';
import { use } from 'react';

type ChangeReservationDataFormProps = {
  reservation: FullReservationData;
  existingReservations: FullReservationData[];
};

type ChangeReservationDataFormContentProps = {
  data: FullReservationData;
  existingReservations: FullReservationData[];
};

const ChangeReservationDataFormContent = ({
  data,
  existingReservations
}: ChangeReservationDataFormContentProps) => {
  const {
    register,
    onSubmit,
    watch,
    formState: { errors }
  } = useChangeReservationData({ reservationData: data });
  const { conflictingReservation, disableSubmitButton } =
    useConflictingReservations({
      startDate: watch('startDate'),
      endDate: watch('endDate'),
      roomId: data.roomId,
      existingReservations,
      errors
    });

  const fetcher = useFetcher();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="text-2xl">{`Change reservation with id=${data.id} for the ${data.roomName}`}</h1>
        </CardTitle>
      </CardHeader>
      <Form onSubmit={onSubmit}>
        <CardContent>
          <LabelWithInput
            label="Name"
            inputProps={{
              ...register('name', { required: true }),
              defaultValue: data.name
            }}
            errorLabel={errors.name?.message}
          />
          <LabelWithInput
            label="Start date"
            inputProps={{
              ...register('startDate', { required: true }),
              type: 'datetime-local',
              min: formatDateTime(nextDay(new Date()))
            }}
            errorLabel={errors.startDate?.message}
          />
          <LabelWithInput
            label="End date"
            inputProps={{
              ...register('endDate', { required: true }),
              type: 'datetime-local',
              min: formatDateTime(
                advanceByMinutes(new Date(watch('startDate')), 30)
              ),
              max: formatDateTime(endOfDay(new Date(watch('startDate'))))
            }}
            errorLabel={errors.endDate?.message}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            disabled={disableSubmitButton}
          >
            Submit
          </Button>
          {conflictingReservation && (
            <ConflictingReservationInfo data={conflictingReservation} />
          )}

          <Button type="submit" className="w-full bg-black">
            Cancel
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
};

export const ChangeReservationDataForm = ({
  reservation,
  existingReservations
}: ChangeReservationDataFormProps) => {
  return (
    reservation && (
      <ChangeReservationDataFormContent
        existingReservations={existingReservations}
        data={reservation}
      />
    )
  );
};
