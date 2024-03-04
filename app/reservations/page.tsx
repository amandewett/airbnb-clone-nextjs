import { getCurrentUser } from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import ReservationsClient from "@/components/reservations/ReservationsClient";
import EmptyState from "@/components/shared/EmptyState";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please login" />;
  }

  const reservations: any = await getReservations({ authorId: currentUser.id });

  if (!reservations && reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subTitle="Looks like you have no reservations on your properties."
      />
    );
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
};
export default ReservationsPage;
