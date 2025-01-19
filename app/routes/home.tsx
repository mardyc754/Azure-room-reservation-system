import { useCurrentUser } from "@/hooks/auth";
import { Button } from "../components/Button";
import { PageWrapper } from "@/components/PageWrapper";

import type { Route } from "./+types/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Azure Room Reservation System" },
    { name: "description", content: "Welcome to Room reservation system!" },
  ];
}

export default function Home() {
  const { data: currentUserData, isLoading } = useCurrentUser();

  return (
    <PageWrapper title="Welcome to Room reservation system!">
      <div className="flex space-x-4 items-center">
        {isLoading && <p>Loading...</p>}
        {!isLoading && currentUserData && (
          <>
            <Button>
              <a href="/create-reservation">Book a room</a>
            </Button>
            <Button>
              <a href="/reservations">Your reservations</a>
            </Button>
          </>
        )}
        {!isLoading && !currentUserData && (
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
