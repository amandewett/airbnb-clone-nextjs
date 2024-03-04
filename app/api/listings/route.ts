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
    return Response.json(
      {
        status: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  //validation
  Object.keys(body).forEach((value) => {
    if (!body[value]) {
      return Response.json(
        {
          status: false,
          message: "Invalid params",
        },
        { status: 400 }
      );
    }
  });

  await prismaClient.listing.create({
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
