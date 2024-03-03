"use client";
import useCountries from "@/hooks/useCountries";
import { ListingCardProps } from "@/lib/appTypes";
import { useRouter } from "next/navigation";
import { useCallback, MouseEvent, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../shared/HeartButton";
import Button from "../shared/Button";

const ListingCard = ({
  listingData,
  reservation,
  actionId = "",
  actionLabel,
  currentUser,
  disabled,
  onAction,
}: ListingCardProps) => {
  const router = useRouter();
  const { getCountry } = useCountries();
  const location = getCountry(listingData.locationValue);

  const handleCancel = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return listingData.price;
  }, [listingData.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);
    return `${format(startDate, "PP")} - ${format(endDate, "PP")}`;
  }, [reservation]);

  return (
    <>
      <div
        className="col-span-1 cursor-pointer group"
        onClick={() => router.push(`/listings/${listingData.id}`)}
      >
        <div className="flex flex-col gap-2 w-full">
          <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <Image
              fill
              alt="Listing image"
              src={listingData.imageSrc}
              className="object-cover h-full w-full group-hover:scale-110 transition"
            />
            <div className="absolute top-3 right-3">
              <HeartButton
                listingId={listingData.id}
                currentUser={currentUser}
              />
            </div>
          </div>
          <div className="font-semibold text-lg">
            {location?.region}, {location?.label}
          </div>
          <div className="font-light text-neutral-500">
            {reservationDate || listingData.category}
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">$ {price}</div>
            {!reservation && <div className="font-light">night</div>}
          </div>
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default ListingCard;
