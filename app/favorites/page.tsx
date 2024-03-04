export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getFavoriteListings from "@/actions/getFavoriteListings";
import FavoritesClient from "@/components/favorites/FavoritesClient";
import EmptyState from "@/components/shared/EmptyState";

const FavoritesPage = async () => {
  const listings: any = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (!listings || listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subTitle="Looks like you have no favorite listings."
      />
    );
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
};
export default FavoritesPage;
