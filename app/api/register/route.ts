import prismaClient from "@/lib/prismaDB";
import { hash } from "bcrypt";
export const POST = async (req: Request) => {
  const body = await req.json();
  const { email, name, password } = body;

  const hashedPassword = await hash(password, 12);

  const user = await prismaClient.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  return Response.json(user);
};
