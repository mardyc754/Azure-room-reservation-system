import { data, redirect } from 'react-router';

import { getCurrentUser, signUp } from '@/server/auth.server';

import { PageWrapper } from '@/components/PageWrapper';
import { SignupForm } from '@/components/forms/SignupForm';

import type { SignupData } from '@/schemas/auth';

import type { Route } from './+types/Signup';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Sign up' }, { name: 'description', content: 'Signup' }];
}

export async function action({ request }: Route.LoaderArgs) {
  try {
    const user = await getCurrentUser(request);

    if (user) {
      return redirect('/');
    }

    const data = (await request.json()) as SignupData;
    await signUp(data);
    return redirect('/sign-in');
  } catch (error) {
    console.error(error);
    // return new Response(`Error when signing up: ${error}`, { status: 500 });
    return data(`Error when signing up. Details: ${error}`, {
      status: 500
    });
  }
}

export default function Signup() {
  return (
    <PageWrapper>
      <div className="flex items-center justify-center">
        <SignupForm />
      </div>
    </PageWrapper>
  );
}
