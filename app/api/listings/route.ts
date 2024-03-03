import prismaClient from "@/lib/prismaDB";
import { getCurrentUser } from "@/actions/getCurrentUser";

export const POST = async (req: Request) => {
  const body = await req.json();
  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = body;

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  //validation
  Object.keys(body).forEach((value) => {
    if (!body[value]) {
      throw new Error("Invalid request");
    }
  });

  const listing = await prismaClient.listing.create({
    data: {
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price: parseInt(price, 10),
      title,
      description,
      userId: currentUser.id,
    },
  });

  return Response.json(
    {
      status: true,
      message: `Listing created successfully`,
    },
    { status: 200 }
  );
};
