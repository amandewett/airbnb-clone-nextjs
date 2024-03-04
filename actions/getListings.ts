import { GetListingsActionProps } from "@/lib/appTypes";
import prismaClient from "@/lib/prismaDB";
import toast from "react-hot-toast";

const getListings = ({
  bathroomCount,
  category,
  endDate,
  guestCount,
  locationValue,
  roomCount,
  startDate,
  userId,
}: GetListingsActionProps) => {
  return new Promise(async (resolve: any, reject: any) => {
    try {
      let query: any = {};

      if (userId) {
        query.userId = userId;
      }

      if (category) {
        query.category = category;
      }

      if (roomCount) {
        query.roomCount = {
          gte: +roomCount,
        };
      }

      if (guestCount) {
        query.guestCount = {
          gte: +guestCount,
        };
      }

      if (bathroomCount) {
        query.bathroomCount = {
          gte: +bathroomCount,
        };
      }

      if (locationValue) {
        query.locationValue = locationValue;
      }

      if (startDate && endDate) {
        query.NOT = {
          reservations: {
            some: {
              OR: [
                {
                  endDate: { gte: startDate },
                  startDate: { lte: startDate },
                },
                {
                  startDate: { lte: endDate },
                  endDate: { gte: endDate },
                },
              ],
            },
          },
        };
      }

      const listings = await prismaClient.listing.findMany({
        where: query,
        orderBy: {
          createdAt: "desc",
        },
      });
      resolve(listings);
    } catch (e: any) {
      console.log(e);
      resolve(null);
    }
  });
};

export default getListings;
