import { eq } from 'drizzle-orm';

import { database } from '@/db/context';
import { reservations, rooms, users } from '@/db/schema';

import {
  type ChangeReservationData,
  type CreateReservationData,
  type Reservation
} from '@/schemas/reservation';
import type { Room } from '@/schemas/room';
import type { User } from '@/schemas/auth';

export const getReservationsByUserId = async (userId: number) => {
  // return await customFetch(
  //   `reservations/user/${userId}`,
  //   fullReservationSchema.array(),
  //   {
  //     credentials: "include",
  //   }
  // );
  const db = database();

  return await db
    .select({
      id: reservations.id,
      name: reservations.name,
      userId: reservations.userId,
      roomId: reservations.roomId,
      startDate: reservations.startDate,
      endDate: reservations.endDate,
      username: users.username,
      roomName: rooms.name
    })
    .from(reservations)
    .where(eq(reservations.userId, userId))
    // .leftJoin(users, eq(reservations.userId, users.id))
    // .leftJoin(rooms, eq(reservations.roomId, rooms.id));
    .leftJoin(users, eq(reservations.userId, users.id))
    .leftJoin(rooms, eq(reservations.roomId, rooms.id));
};

export const getReservationById = async (reservationId: Reservation['id']) => {
  const db = database();

  return (
    await db
      .select({
        id: reservations.id,
        name: reservations.name,
        roomId: reservations.roomId,
        startDate: reservations.startDate,
        endDate: reservations.endDate,
        roomName: rooms.name,
        username: users.username,
        userId: users.id
      })
      .from(reservations)
      .where(eq(reservations.id, reservationId))
      .leftJoin(users, eq(reservations.userId, users.id))
      .leftJoin(rooms, eq(reservations.roomId, rooms.id))
  )[0];
};

export const getReservationsByRoomId = async (roomId: Room['id']) => {
  const db = database();

  return await db
    .select({
      id: reservations.id,
      name: reservations.name,
      roomId: reservations.roomId,
      startDate: reservations.startDate,
      endDate: reservations.endDate
    })
    .from(reservations)
    .where(eq(reservations.roomId, roomId))
    .leftJoin(rooms, eq(reservations.roomId, rooms.id));
};

export const createReservation = async (
  data: CreateReservationData & { roomId: Room['id']; userId: User['id'] }
) => {
  const db = database();

  const result = await db
    .insert(reservations)
    .values({
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate)
    })
    .returning();

  const createdReservation = result[0];

  // const userData = await db
  //   .select({
  //     email: users.email
  //   })
  //   .from(users)
  //   .where(eq(users.id, createdReservation.userId));

  return createdReservation;
};

export const changeReservationData = async (
  reservationId: Reservation['id'],
  userId: User['id'],
  data: ChangeReservationData
) => {
  const db = database();
  const result = (
    await db
      .select()
      .from(reservations)
      .where(eq(reservations.id, reservationId))
  )[0];

  if (result.userId != userId) {
    return new Response('You are not authorized to update this reservation', {
      status: 401
    });
  }

  const updated = (
    await db
      .update(reservations)
      .set({
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate)
      })
      .where(eq(reservations.id, reservationId))
      .returning()
  )[0];

  // const userAndReservationData = await db
  //   .select({
  //     email: users.email,
  //     reservationName: reservations.name,
  //     startDate: reservations.startDate,
  //     endDate: reservations.endDate
  //   })
  //   .from(users)
  //   .where(eq(reservations.id, updated.id))
  //   .fullJoin(reservations, eq(reservations.userId, users.id));

  return updated;
};

export const cancelReservation = async (
  reservationId: Reservation['id'],
  userId: User['id']
) => {
  const db = database();
  const result = (
    await db
      .select()
      .from(reservations)
      .where(eq(reservations.id, reservationId))
  )[0];

  if (result.userId !== userId) {
    return new Response('You can only cancel your own reservations', {
      status: 401
    });
  }

  // const userAndReservationData = await db
  //   .select({
  //     email: users.email,
  //     reservationName: reservations.name
  //   })
  //   .from(users)
  //   .where(eq(reservations.id, reservationId))
  //   .fullJoin(reservations, eq(reservations.userId, users.id));

  const deleted = (
    await db
      .delete(reservations)
      .where(eq(reservations.id, reservationId))
      .returning()
  )[0];

  return deleted;
};
