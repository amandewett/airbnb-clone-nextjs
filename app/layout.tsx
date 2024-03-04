export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import RegistrationModal from "@/components/modals/RegistrationModal";
import ToastProvider from "@/Providers/ToastProvider";
import LoginModal from "@/components/modals/LoginModal";
import { getCurrentUser } from "@/actions/getCurrentUser";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";
import { Suspense } from "react";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb Clone",
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
        <RentModal />
        <RegistrationModal />
        <Suspense>
          <SearchModal />
        </Suspense>
        <Header user={currentUser} />
        <div className="pt-28 pb-20">{children}</div>
      </body>
    </html>
  );
}
