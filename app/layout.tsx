import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Modal from "@/components/modals/Modal";
import RegistrationModal from "@/components/modals/RegistrationModal";
import ToastProvider from "@/Providers/ToastProvider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AirBnb Clone",
  description: "AirBnb clone with NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToastProvider />
        <RegistrationModal />
        <Header />
        {children}
      </body>
    </html>
  );
}
