"use client";
import { ListingClientProps } from "@/lib/appTypes";
import { CATEGORIES } from "@/utils/categories";
import {
  useMemo,
  useState,
  useEffect,
  useCallback,
  SetStateAction,
} from "react";
import ListingHeader from "./ListingHeader";
import ListingInfo from "./ListingInfo";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import {
  differenceInCalendarDays,
  differenceInDays,
  eachDayOfInterval,
} from "date-fns";
import { Range } from "react-date-range";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingReservation from "./ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ListingClient = ({
  listingData,
  currentUser,
  reservations = [],
}: ListingClientProps) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const getCategory = useMemo(() => {
    return CATEGORIES.find(
      (category) => category.label === listingData.category
    );
  }, [listingData.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listingData.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listingData?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listingData?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listingData.price) {
        setTotalPrice(dayCount * listingData.price);
      } else {
        setTotalPrice(listingData.price);
      }
    }
  }, [dateRange, listingData.price]);

  return (
    <>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHeader
            id={listingData.id}
            imageSrc={listingData.imageSrc}
            locationValue={listingData.locationValue}
            title={listingData.title}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              bathroomCount={listingData.bathroomCount}
              category={{
                icon: getCategory!.icon,
                description: getCategory!.description,
                label: getCategory!.label,
              }}
              description={listingData.description}
              guestCount={listingData.guestCount}
              locationValue={listingData.locationValue}
              roomCount={listingData.roomCount}
              user={currentUser}
            />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={listingData.price}
                totalPrice={totalPrice}
                onChangeDate={(value: SetStateAction<Range>) =>
                  setDateRange(value)
                }
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ListingClient;
