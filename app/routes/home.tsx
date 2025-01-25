import { Button } from '../components/Button';
import { PageWrapper } from '@/components/PageWrapper';

import type { Route } from './+types/Home';

import { useAuthProvider } from '@/providers/AuthProvider';
import { HomePageButtons } from '@/components/HomePageButtons';

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
      <HomePageButtons />
    </PageWrapper>
  );
}
