import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

import {
  type SignInData,
  type SignupData,
  signOutSchema,
  userSchema
} from '@/schemas/auth';

import * as schema from '@/db/schema';

import { database } from '@/db/context';
import {
  createUserSession,
  getUserCredentials,
  logout
} from '@/services/session.server';

export const signUp = async (data: SignupData) => {
  const { username, email, password } = data;
  const db = database();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const users = await db
      .insert(schema.users)
      .values({
        email,
        password: hashedPassword,
        username
      })
      .returning();

    return {
      id: users[0].id,
      email: users[0].email,
      username: users[0].username
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log(error);
    return { error: 'User with this email or username already exists' };
  }
};

export const signIn = async (data: SignInData, request: Request) => {
  const db = database();
  const { email, password } = data;

  const user = (
    await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .execute()
  )[0];

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Incorrect username or password');
  }

  return await createUserSession({
    request,
    userId: user.id,
    email: user.email,
    username: user.username,
    remember: true
  });
};

export const getCurrentUser = async (request: Request) => {
  return await getUserCredentials(request);
};
