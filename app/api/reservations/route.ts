import prisma from "@/lib/prismaDB";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {
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

  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return Response.json(
      {
        status: false,
        message: "Invalid params",
      },
      { status: 400 }
    );
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return Response.json(listingAndReservation, { status: 200 });
}
