import { Listing, Reservation, User } from "@prisma/client";
import React, { ReactElement, MouseEvent } from "react";
import { RangeKeyDict, Range } from "react-date-range";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

export type AppComponentProps = {
  children?: React.ReactNode;
};
export type MenuItemProps = {
  onClick: () => void;
  label: string;
};

export type ModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
};

export type ButtonProps = {
  label: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
};

export type RegistrationModalStoreProps = {
  isOpen: boolean;
  onOpen: () => {};
  onClose: () => {};
};

export type HeadingProps = {
  title?: string;
  subTitle?: string;
  center?: boolean;
};

export type InputProps = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

export type HeaderProps = {
  user?: SafeUserProps | null;
};

export type SafeUserProps = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type AvatarProps = {
  url?: string | null | undefined;
};

export type CategoryBoxProps = {
  label: string;
  description: string;
  icon: IconType;
  selected?: boolean;
};

export type CategoryInputProps = {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
};

export type CountrySelectProps = {
  flag: string;
  label: string;
  latLng: number[];
  region: string;
  value: string;
};

export type CountryReactSelectProps = {
  value?: CountrySelectProps;
  onChange: (value: CountrySelectProps) => void;
};

export type MapProps = {
  center?: number[];
};

export type CounterProps = {
  title: string;
  subTitle: string;
  value: number;
  onChange: (value: number) => void;
};

export type ImageUploadProps = {
  onChange: (value: string) => void;
  value: string;
};

export type EmptyStateProps = {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
};

export type ListingItemProps = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  userId: string;
  price: number;
};

export type ListingCardProps = {
  listingData: ListingItemProps;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUserProps | null;
};

export type HeartButtonProps = {
  listingId: string;
  currentUser?: SafeUserProps | null;
};

export type FavoriteHookProps = {
  listingId: string;
  currentUser?: SafeUserProps | null;
};

export type ListingDetailsPageProps = {
  params: {
    listingId: string;
  };
  searchParams: any;
};

export type ListingClientProps = {
  listingData: Listing;
  reservations?: Reservation[];
  currentUser?: SafeUserProps | null;
};

export type ListingHeaderProps = {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUserProps | null;
};

export type ListingInfoProps = {
  user?: SafeUserProps | null;
  category: {
    icon: IconType;
    label: string;
    description: string;
  };
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
};

export type ListingCategoryProps = {
  icon: IconType;
  label: string;
  description: string;
};

export type CalendarProps = {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
};

export type ListingReservationProps = {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
};

export type getReservationsProps = {
  listingId?: string;
  userId?: string;
  authorId?: string;
};

export type TripsClientProps = {
  reservations: Reservation[];
  currentUser?: SafeUserProps | null;
};

export type ReservationsClientProps = {
  reservations: Reservation[];
  currentUser?: SafeUserProps | null;
};

export type FavoritesClientProps = {
  listings: Listing[];
  currentUser?: SafeUserProps | null;
};

export type GetListingsActionProps = {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
};

export type PropertiesClientProps = {
  listings: Listing[];
  currentUser?: SafeUserProps | null;
};

export type UseSearchModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
