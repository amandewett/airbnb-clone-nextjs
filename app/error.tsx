"use client";

import EmptyState from "@/components/shared/EmptyState";
import { ErrorPageProps } from "@/lib/appTypes";
import { useEffect } from "react";

const ErrorState = ({ error }: ErrorPageProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subTitle="Something went wrong!" />;
};

export default ErrorState;
