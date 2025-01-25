import { createCookieSessionStorage, redirect } from 'react-router';
import jwt from 'jsonwebtoken';
import type { User } from '@/schemas/auth';

const USER_SESSION_KEY = 'userId';
const JWT_SECRET = 'some-secret-key-for-jwt-signing';

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    secrets: ['s3cret'],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
});

export const { commitSession, destroySession } = sessionStorage;

const getUserSession = (request: Request) => {
  return sessionStorage.getSession(request.headers.get('Cookie'));
};

export async function logout(request: Request) {
  const session = getUserSession(request);
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(await session)
    }
  });
}

export async function getUserCredentials(request: Request) {
  const session = await getUserSession(request);
  const authToken = session.get(USER_SESSION_KEY);

  try {
    const decoded = jwt.verify(authToken, JWT_SECRET) as User;

    return decoded;
  } catch (error) {
    return undefined;
  }
}

export async function createUserSession({
  request,
  userId,
  email,
  username,
  remember = true,
  redirectUrl
}: {
  request: Request;
  userId: number;
  email: string;
  username: string;
  remember: boolean;
  redirectUrl?: string;
}) {
  const token = jwt.sign({ id: userId, email, username }, JWT_SECRET);

  const session = await getUserSession(request);

  session.set(USER_SESSION_KEY, token);

  return redirect(redirectUrl ?? '/', {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: remember
          ? 60 * 60 * 24 // 1 day
          : undefined
      })
    }
  });
}
