import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import type { FullReservationData } from '@/schemas/reservation';
import {
  displayDatesAsTimeslot,
  extractDateStringFromDate
} from '@/utils/dateUtils';

import { Separator } from './ui/separator';
import { Button } from './Button';
import { Form, useFetcher } from 'react-router';

type ReservationCardProps = {
  data: FullReservationData;
};

export const ReservationCard = ({ data }: ReservationCardProps) => {
  const { name, startDate, endDate, roomName, id } = data;

  const fetcher = useFetcher();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{roomName}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <Separator />
        <p className="font-semibold">{extractDateStringFromDate(startDate)}</p>
        <p>{displayDatesAsTimeslot(startDate, endDate)}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button>
          <a href={`/reservations/${id}`}>Change data</a>
        </Button>
        <Form
          method="delete"
          action={`/reservations/${id}/cancel`}
          onSubmit={() =>
            fetcher.submit({
              method: 'delete'
            })
          }
        >
          <Button type="submit" className="bg-black">
            Cancel
          </Button>
        </Form>
      </CardFooter>
    </Card>
  );
};
