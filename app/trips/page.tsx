import { getCurrentUser } from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import EmptyState from "@/components/shared/EmptyState";
import TripsClient from "@/components/trips/TripsClient";
import { Suspense } from "react";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <Suspense>
        <EmptyState
          title="No trips found"
          subTitle="Looks like you haven't reserved any trips."
        />
      </Suspense>
    );
  }

  return (
    <Suspense>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </Suspense>
  );
};
export default TripsPage;
