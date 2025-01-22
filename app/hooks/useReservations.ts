import { useQuery } from '@tanstack/react-query';

import type { Reservation } from '@/schemas/reservation';
import type { User } from '@/schemas/auth';
import type { Room } from '@/schemas/room';

import { reservation } from '@/constants/queryKeys';

import {
  getReservationById,
  getReservationsByRoomId,
  getReservationsByUserId
} from '@/server/reservation.server';

export const useReservations = (userId: User['id']) =>
  useQuery({
    queryKey: reservation.user(userId),
    queryFn: async () => await getReservationsByUserId(userId)
  });

export const useReservation = (reservationId: Reservation['id']) =>
  useQuery({
    queryKey: reservation.byId(reservationId),
    queryFn: async () => await getReservationById(reservationId)
  });

export const useReservationsByRoomId = (roomId: Room['id']) =>
  useQuery({
    queryKey: reservation.room(roomId),
    queryFn: async () => await getReservationsByRoomId(roomId)
  });
