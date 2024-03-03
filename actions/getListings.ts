import prismaClient from "@/lib/prismaDB";
import toast from "react-hot-toast";

const getListing = () => {
  return new Promise(async (resolve: any, reject: any) => {
    try {
      const listings = await prismaClient.listing.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      resolve(listings);
    } catch (e: any) {
      console.log(e);
      toast.error(e.message || "Something went wrong");
      reject(e);
    }
  });
};

export default getListing;
