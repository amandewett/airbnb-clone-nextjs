"use client";

import { MenuItemProps } from "@/lib/appTypes";

const UserMenuItem = ({ onClick, label }: MenuItemProps) => {
  return (
    <>
      <div
        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
        onClick={onClick}
      >
        {label}
      </div>
    </>
  );
};
export default UserMenuItem;
