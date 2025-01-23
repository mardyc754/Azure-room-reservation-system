import type { Room } from '@/schemas/room';

import { useConflictingReservations } from '@/hooks/useConflictingReservations';
import { useCreateReservation } from '@/hooks/useCreateReservation';
import { endOfDay, formatDateTime } from '@/utils/dateUtils';

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
import { Form } from 'react-router';
import type { FullReservationData } from '@/schemas/reservation';

type SelectDateFormProps = {
  selectedRoom: Room;
  reservations: FullReservationData[];
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
      roomId: selectedRoom.id,
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
                type: 'datetime-local',
                max: formatDateTime(endOfDay(watch('startDate')))
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
