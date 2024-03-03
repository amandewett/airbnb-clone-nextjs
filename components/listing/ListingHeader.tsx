"use client";
import useCountries from "@/hooks/useCountries";
import { ListingHeaderProps } from "@/lib/appTypes";
import Heading from "../shared/Heading";
import Image from "next/image";
import HeartButton from "../shared/HeartButton";

const ListingHeader = ({
  id,
  imageSrc,
  locationValue,
  title,
  currentUser,
}: ListingHeaderProps) => {
  const { getCountry } = useCountries();
  const location = getCountry(locationValue);

  return (
    <>
      <Heading
        title={title}
        subTitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};
export default ListingHeader;
