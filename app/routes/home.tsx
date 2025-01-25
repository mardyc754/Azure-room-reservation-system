import { Button } from '../components/Button';
import { PageWrapper } from '@/components/PageWrapper';

import type { Route } from './+types/Home';

import { useAuthProvider } from '@/providers/AuthProvider';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Azure Room Reservation System' },
    { name: 'description', content: 'Welcome to Room reservation system!' }
  ];
}

export default function Home() {
  const { currentUser } = useAuthProvider();

  return (
    <PageWrapper title="Welcome to Room reservation system!">
      <div className="flex space-x-4 items-center">
        {currentUser && (
          <>
            <Button>
              <a href="/create-reservation">Book a room</a>
            </Button>
            <Button>
              <a href="/reservations">Your reservations</a>
            </Button>
          </>
        )}
        {!currentUser && (
          <>
            <Button>
              <a href="/sign-in">Sign in</a>
            </Button>
            <Button>
              <a href="/sign-up">Sign up</a>
            </Button>
          </>
        )}
      </div>
    </PageWrapper>
  );
}
