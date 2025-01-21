import { LoginForm } from '@/components/forms/LoginForm';
import { PageWrapper } from '@/components/PageWrapper';

import type { Route } from './+types/Login';
import { getCurrentUser, signIn } from '@/api/auth.server';
import { redirect } from 'react-router';
import type { SignInData } from '@/schemas/auth';

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
    return new Response('Error when logging in', { status: 500 });
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
