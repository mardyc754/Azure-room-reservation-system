import { useAuthProvider } from '@/providers/AuthProvider';
import { Form } from 'react-router';

export const Navbar = () => {
  const { currentUser } = useAuthProvider();

  return (
    <nav className="flex p-6 w-full border-b-2 bg-card justify-between items-center">
      <div>
        <p className="text-2xl font-semibold">
          <a href="/">Room reservation</a>
        </p>
      </div>
      <div className="flex items-center space-x-4">
        {currentUser ? (
          <>
            <a href="/create-reservation">Book a room</a>
            <a href="/reservations">Your reservations</a>
            <Form action="/logout" method="post">
              <button type="submit">Sign out</button>
            </Form>
          </>
        ) : (
          <>
            <a href="/sign-in">Sign in</a>
          </>
        )}
      </div>
    </nav>
  );
};
