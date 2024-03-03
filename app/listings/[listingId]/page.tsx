import { getCurrentUser } from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import getReservations from "@/actions/getReservations";
import ListingClient from "@/components/listing/ListingClient";
import EmptyState from "@/components/shared/EmptyState";
import { ListingDetailsPageProps } from "@/lib/appTypes";

const ListingDetailsPage = async ({ params }: ListingDetailsPageProps) => {
  const listing: any = await getListingById({ listingId: params.listingId });
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <>
      <ListingClient
        listingData={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </>
  );
};
export default ListingDetailsPage;
