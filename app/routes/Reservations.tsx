import { PageWrapper } from "@/components/PageWrapper";
import { ReservationList } from "@/components/ReservationList";
import { useCurrentUser } from "@/hooks/auth";

import type { Route } from "./+types/Reservations";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Your Reservations" },
    { name: "description", content: "Your Reservations" },
  ];
}

export default function Reservations() {
  const { data: currentUserData } = useCurrentUser();

  return (
    <PageWrapper title="Your reservations">
      {currentUserData && <ReservationList userId={currentUserData.id} />}
    </PageWrapper>
  );
}
