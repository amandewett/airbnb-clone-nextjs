import { User } from "@prisma/client";
import React, { ReactElement, MouseEvent } from "react";
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
  title: string;
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
