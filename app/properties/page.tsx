export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import PropertiesClient from "@/components/properties/PropertiesClient";
import EmptyState from "@/components/shared/EmptyState";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please login" />;
  }

  const listings: any = await getListings({ userId: currentUser.id });

  if (!listings || listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subTitle="Looks like you have no properties."
      />
    );
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};
export default PropertiesPage;
