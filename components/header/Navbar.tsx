"use client";
import { HeaderProps } from "@/lib/appTypes";
import Container from "../shared/Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import { Suspense } from "react";

const Navbar = ({ user }: HeaderProps) => {
  return (
    <nav className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Suspense>
              <Search />
            </Suspense>
            <UserMenu user={user} />
          </div>
        </Container>
      </div>
      <Suspense>
        <Categories />
      </Suspense>
    </nav>
  );
};

export default Navbar;
