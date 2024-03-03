import { getCurrentUser } from "@/actions/getCurrentUser";
import getFavoriteListings from "@/actions/getFavoriteListings";
import FavoritesClient from "@/components/favorites/FavoritesClient";
import EmptyState from "@/components/shared/EmptyState";
import { Suspense } from "react";

const FavoritesPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subTitle="Looks like you have no favorite listings."
      />
    );
  }

  return (
    <Suspense>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </Suspense>
  );
};
export default FavoritesPage;
