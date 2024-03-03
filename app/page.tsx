import { getCurrentUser } from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import ListingCard from "@/components/listing/ListingCard";
import Container from "@/components/shared/Container";
import EmptyState from "@/components/shared/EmptyState";
import { GetListingsActionProps, ListingItemProps } from "@/lib/appTypes";
import { Suspense } from "react";

type HomeProps = {
  searchParams: GetListingsActionProps;
};

const HomePage = async ({ searchParams }: HomeProps) => {
  const listings: any = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  const isEmpty = listings.length === 0;

  if (isEmpty) {
    return <EmptyState showReset />;
  }

  return (
    <>
      <Suspense>
        <Container>
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing: ListingItemProps) => {
              return (
                <ListingCard
                  key={listing.id}
                  listingData={listing}
                  currentUser={currentUser}
                />
              );
            })}
          </div>
        </Container>
      </Suspense>
    </>
  );
};

export default HomePage;
