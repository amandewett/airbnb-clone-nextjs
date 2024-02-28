"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../shared/Avatar";
import { useCallback, useState } from "react";
import UserMenuItem from "./UserMenuItem";
import useRegistrationModal from "@/hooks/useRegistrationModal";

const UserMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { onOpen } = useRegistrationModal();

  const toggleMenu = useCallback(
    () => setIsMenuOpen((value) => !value),
    [isMenuOpen]
  );

  return (
    <div className="relative">
      <div className="flex flex-row item-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleMenu}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              <UserMenuItem onClick={() => {}} label="Login" />
              <UserMenuItem onClick={onOpen} label="Signup" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
