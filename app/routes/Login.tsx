import { data, redirect } from 'react-router';

import { getCurrentUser, signIn } from '@/server/auth.server';
import type { SignInData } from '@/schemas/auth';

import { LoginForm } from '@/components/forms/LoginForm';
import { PageWrapper } from '@/components/PageWrapper';

import type { Route } from './+types/Login';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Login' }, { name: 'description', content: 'Login' }];
}

export async function loader({ request }: Route.LoaderArgs) {
  // Check if the user is already logged in
  const userId = await getCurrentUser(request);
  if (userId) {
    return redirect('/');
  }
}

export async function action({ request }: Route.LoaderArgs) {
  try {
    const { email, password } = (await request.json()) as SignInData;

    return await signIn({ email, password }, request);
  } catch (error) {
    console.error(error);
    return data('Error when logging in', { status: 500 });
  }
}

export default function Login() {
  return (
    <PageWrapper>
      <div className="flex items-center justify-center w-full">
        <LoginForm />
      </div>
    </PageWrapper>
  );
}
