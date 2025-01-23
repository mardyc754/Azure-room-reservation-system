import { database } from '@/db/context';
import { rooms, type Room } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getAllRooms = async () => {
  const db = database();
  return await db.select().from(rooms);
};

export const getRoomById = async (roomId: Room['id']) => {
  const db = database();

  return (await db.select().from(rooms).where(eq(rooms.id, roomId)))[0];
};
