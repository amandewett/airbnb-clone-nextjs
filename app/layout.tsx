import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Modal from "@/components/modals/Modal";
import RegistrationModal from "@/components/modals/RegistrationModal";
import ToastProvider from "@/Providers/ToastProvider";
import LoginModal from "@/components/modals/LoginModal";
import { getCurrentUser } from "@/actions/getCurrentUser";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AirBnb Clone",
  description: "AirBnb clone with NextJS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToastProvider />
        <LoginModal />
        <RegistrationModal />
        <Header user={currentUser} />
        {children}
      </body>
    </html>
  );
}
