import React from "react";

export type AppComponentProps = {
  children?: React.ReactNode;
};
export type MenuItemProps = {
  onClick: () => void;
  label: string;
};
