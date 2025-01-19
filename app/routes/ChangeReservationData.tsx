import { useParams } from "react-router";

import { ChangeReservationDataForm } from "@/components/forms/ChangeReservationDataForm";
import { PageWrapper } from "@/components/PageWrapper";

import type { Route } from "./+types/ChangeReservationData";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Change reservation data" },
    { name: "description", content: "Change reservation data" },
  ];
}

export default function ChangeReservationData() {
  const { reservationId } = useParams<{ reservationId: string }>();

  return (
    <PageWrapper>
      {reservationId && (
        <div className="flex flex-col space-y-4 items-center justify-center">
          <ChangeReservationDataForm reservationId={parseInt(reservationId)} />
        </div>
      )}
    </PageWrapper>
  );
}
