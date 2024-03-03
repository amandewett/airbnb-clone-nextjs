"use client";

import useCountries from "@/hooks/useCountries";
import { ListingInfoProps } from "@/lib/appTypes";
import Avatar from "../shared/Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/shared/Map"), { ssr: false });

const ListingInfo = ({
  bathroomCount,
  category,
  description,
  guestCount,
  locationValue,
  roomCount,
  user,
}: ListingInfoProps) => {
  const { getCountry } = useCountries();
  const location = getCountry(locationValue);

  return (
    <>
      <div className="col-span-4 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold flex flex-row items-center gap-2">
            <div>Hosted by {user?.name}</div>
            <Avatar url={user?.image} />
          </div>
          <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
            <div>{guestCount} guests</div>
            <div>{roomCount} rooms</div>
            <div>{bathroomCount} bathrooms</div>
          </div>
        </div>
        <hr />
        {category && (
          <ListingCategory
            description={category.description}
            icon={category.icon}
            label={category.label}
          />
        )}
        <hr />
        <div
          className="
      text-lg font-light text-neutral-500"
        >
          {description}
        </div>
        <hr />
        <Map center={location?.latLng} />
      </div>
    </>
  );
};
export default ListingInfo;
