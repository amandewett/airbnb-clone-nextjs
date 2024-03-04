export const dynamic = "force-dynamic";
import prismaClient from "@/lib/prismaDB";
import { getCurrentUser } from "@/actions/getCurrentUser";

type Params = {
  listingId?: string;
};

export const PUT = async (req: Request, { params }: { params: Params }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return Response.json(
      {
        status: false,
        message: `Unauthorized`,
      },
      {
        status: 401,
      }
    );
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    return Response.json(
      {
        status: false,
        message: "Invalid parameters",
      },
      { status: 400 }
    );
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(listingId);

  const user = await prismaClient.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favoriteIds,
    },
  });

  return Response.json(
    {
      status: true,
      message: `Favorite added successfully`,
    },
    { status: 200 }
  );
};

export const DELETE = async (req: Request, { params }: { params: Params }) => {
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
        message: "Invalid parameters",
      },
      {
        status: 400,
      }
    );
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  await prismaClient.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favoriteIds,
    },
  });

  return Response.json(
    {
      status: true,
      message: `Favorite deleted successfully`,
    },
    { status: 200 }
  );
};
