import { database } from '@/db/context';
import { rooms } from '@/db/schema';

export const getAllRooms = async () => {
  const db = database();
  return await db.select().from(rooms);
};
