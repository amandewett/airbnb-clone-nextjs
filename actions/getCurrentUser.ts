import { getServerSession } from "next-auth";
import { nextAuth } from "@/lib/auth";
import toast from "react-hot-toast";
import prismaClient from "@/lib/prismaDB";
import { HeaderProps } from "@/lib/appTypes";

export const getSession = async () => await getServerSession(nextAuth);

export const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prismaClient.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (e: any) {
    toast.error(e.message || "Something went wrong");
    return null;
  }
};
