import { FavoritesClientProps } from "@/lib/appTypes";
import Container from "../shared/Container";
import Heading from "../shared/Heading";
import ListingCard from "../listing/ListingCard";

const FavoritesClient = ({ listings, currentUser }: FavoritesClientProps) => {
  return (
    <Container>
      <Heading title="Favorites" subTitle="List of places you favorited!" />
      <div
        className="
              mt-10
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-8
            "
      >
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            listingData={listing}
          />
        ))}
      </div>
    </Container>
  );
};
export default FavoritesClient;
