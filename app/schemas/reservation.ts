import { nullable, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { isAfterOrSame } from '@/utils/dateUtils';

export const fullReservationSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  userId: z.number().int().nullable(),
  roomId: z.number().int(),
  startDate: z.date(),
  endDate: z.date(),
  username: z.string().nullable(),
  roomName: z.string().nullable()
});

export type FullReservationData = z.infer<typeof fullReservationSchema>;

export const createReservationSchema = z
  .object({
    name: z.string().nonempty(),
    startDate: z.string().transform((date) => new Date(date).toISOString()),
    endDate: z.string().transform((date) => new Date(date).toISOString())
  })
  .refine(
    (data) => {
      return isAfterOrSame(new Date(data.endDate), new Date(data.startDate));
    },
    { message: 'End date should occur after start date' }
  );

export type CreateReservationData = z.infer<typeof createReservationSchema>;

export const createReservationResolver = zodResolver(createReservationSchema);

export const changeReservationDataSchema = z
  .object({
    name: z.string().nonempty(),
    startDate: z.string().transform((date) => new Date(date).toISOString()),
    endDate: z.string().transform((date) => new Date(date).toISOString()),
    roomId: z.number().int()
  })
  .refine(
    (data) => {
      return isAfterOrSame(new Date(data.endDate), new Date(data.startDate));
    },
    { message: 'End date should occur after start date' }
  );

export type ChangeReservationData = z.infer<typeof changeReservationDataSchema>;

export const changeReservationDataResolver = zodResolver(
  changeReservationDataSchema
);
