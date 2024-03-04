export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prismaDB";

type IParams = {
  listingId?: string;
};

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
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

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    return Response.json(
      {
        status: false,
        message: "Invalid params",
      },
      { status: 400 }
    );
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return Response.json(listing, { status: 200 });
}
