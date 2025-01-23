import { Form } from 'react-router';
import type { Reservation, Room } from '@/db/schema';

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

type SelectDateFormProps = {
  selectedRoom: Room;
  reservations: Reservation[];
  onReturn: () => void;
};

export const CreateReservationForm = ({
  selectedRoom,
  reservations,
  onReturn
}: SelectDateFormProps) => {
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
                ...register('name', { required: true })
              }}
              errorLabel={errors.name?.message}
            />
            <LabelWithInput
              label="Start date"
              inputProps={{
                ...register('startDate', { required: true }),
                type: 'datetime-local'
              }}
              errorLabel={errors.startDate?.message}
            />
            <LabelWithInput
              label="End date"
              inputProps={{
                ...register('endDate', { required: true }),
                type: 'datetime-local'
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
            <Button className="w-full bg-black" onClick={onReturn}>
              Return
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
};
