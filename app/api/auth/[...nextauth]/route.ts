import { nextAuth as nextAuthOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const nextAuth = NextAuth(nextAuthOptions);

export {
  nextAuth as GET,
  nextAuth as POST,
  nextAuth as PUT,
  nextAuth as DELETE,
};
