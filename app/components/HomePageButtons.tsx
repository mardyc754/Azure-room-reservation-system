import { useAuthProvider } from '@/providers/AuthProvider';
import { Button } from './Button';

export const HomePageButtons = () => {
  const { currentUser } = useAuthProvider();

  return (
    <div className="flex space-x-4 items-center">
      {currentUser ? (
        <>
          <Button>
            <a href="/create-reservation">Book a room</a>
          </Button>
          <Button>
            <a href="/reservations">Your reservations</a>
          </Button>
        </>
      ) : (
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
  );
};
