import { Form, useLoaderData } from 'react-router';

import { useConflictingReservations } from '@/hooks/useConflictingReservations';
import { useCreateReservation } from '@/hooks/useCreateReservation';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card';
import { Button } from '../Button';
import { LabelWithInput } from '../LabelWithInput';
import { ConflictingReservationInfo } from '../ConflictingReservationInfo';
import type { Reservation, Room } from '@/db/schema';
import { placeholder } from 'drizzle-orm';

export const CreateReservationForm = () => {
  const { room: selectedRoom, reservations } = useLoaderData<{
    room: Room;
    reservations: Reservation[];
  }>();
  const {
    register,
    onSubmit,
    watch,
    formState: { errors }
  } = useCreateReservation({ selectedRoom });

  const { conflictingReservation, disableSubmitButton } =
    useConflictingReservations({
      startDate: watch('startDate'),
      existingReservations: reservations,
      endDate: watch('endDate'),
      errors
    });

  return (
    <div className="flex flex-col space-y-4 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl">{`Create a reservation for the ${selectedRoom.name}`}</h1>
          </CardTitle>
        </CardHeader>
        <Form onSubmit={onSubmit}>
          <CardContent>
            <LabelWithInput
              label="Name"
              inputProps={{
                ...register('name', { required: true }),
                placeholder: 'Reservation name'
              }}
              errorLabel={errors.name?.message}
            />
            <LabelWithInput
              label="Start date"
              inputProps={{
                ...register('startDate', { required: true }),
                type: 'datetime-local',
                placeholder: 'Start date'
              }}
              errorLabel={errors.startDate?.message}
            />
            <LabelWithInput
              label="End date"
              inputProps={{
                ...register('endDate', { required: true }),
                type: 'datetime-local',
                placeholder: 'End date'
              }}
              errorLabel={errors.endDate?.message}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              className="w-full"
              type="submit"
              disabled={disableSubmitButton}
            >
              Submit
            </Button>
            {conflictingReservation && (
              <ConflictingReservationInfo data={conflictingReservation} />
            )}
            <Button className="w-full bg-black">
              <a href="/create-reservation">Return</a>
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
};
