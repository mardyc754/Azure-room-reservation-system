import { Form, useLoaderData } from 'react-router';
import type { Reservation } from '@/db/schema';
import { advanceByMinutes, endOfDay, formatDateTime } from '@/utils/dateUtils';
import type { FullReservationData } from '@/schemas/reservation';
import { useConflictingReservations } from '@/hooks/useConflictingReservations';
import { useChangeReservationData } from '@/hooks/useChangeReservationData';

import { Button } from '../Button';
import { LabelWithInput } from '../LabelWithInput';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card';

import { ConflictingReservationInfo } from '../ConflictingReservationInfo';

type ChangeReservationDataFormProps = {
  reservation: FullReservationData;
  existingReservations: Reservation[];
};

type ChangeReservationDataFormContentProps = {
  data: FullReservationData;
  existingReservations: Reservation[];
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
      existingReservations,
      errors
    });

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
              defaultValue: data.name,
              placeholder: 'Reservation name'
            }}
            errorLabel={errors.name?.message}
          />
          <LabelWithInput
            label="Start date"
            inputProps={{
              ...register('startDate', { required: true }),
              type: 'datetime-local',
              min: formatDateTime(data.startDate),
              placeholder: 'Start date'
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
              max: formatDateTime(endOfDay(new Date(watch('startDate')))),
              placeholder: 'End date'
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
        </CardFooter>
      </Form>
    </Card>
  );
};

export const ChangeReservationDataForm = () => {
  const { reservation, existingReservations } =
    useLoaderData<ChangeReservationDataFormProps>();

  return (
    reservation && (
      <ChangeReservationDataFormContent
        existingReservations={existingReservations}
        data={reservation}
      />
    )
  );
};
