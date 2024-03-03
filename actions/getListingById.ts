import prismaClient from "@/lib/prismaDB";
import toast from "react-hot-toast";

const getListingById = ({ listingId }: { listingId: string }) => {
  return new Promise(async (resolve: any, reject: any) => {
    try {
      const listing = await prismaClient.listing.findUnique({
        where: {
          id: listingId,
        },
        include: {
          user: true,
        },
      });
      resolve(listing);
    } catch (e: any) {
      console.log(e);
      resolve(null);
    }
  });
};

export default getListingById;
