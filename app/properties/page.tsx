import { getCurrentUser } from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import PropertiesClient from "@/components/properties/PropertiesClient";
import EmptyState from "@/components/shared/EmptyState";
import { Suspense } from "react";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please login" />;
  }

  const listings: any = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <Suspense>
        <EmptyState
          title="No properties found"
          subTitle="Looks like you have no properties."
        />
      </Suspense>
    );
  }

  return (
    <Suspense>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </Suspense>
  );
};
export default PropertiesPage;
