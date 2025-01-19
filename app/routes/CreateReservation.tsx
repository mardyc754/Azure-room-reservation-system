import { PageWrapper } from "@/components/PageWrapper";
import { ReservationForm } from "@/components/forms/ReservationForm";

import type { Route } from "./+types/CreateReservation";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create a reservation" },
    { name: "description", content: "Create a reservation" },
  ];
}

export default function CreateReservation() {
  return (
    <PageWrapper>
      <ReservationForm />
    </PageWrapper>
  );
}
