"use client";
import { CategoryBoxProps } from "@/lib/appTypes";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";
import queryString from "query-string";

const CategoryBox = ({
  label,
  description,
  icon: Icon,
  selected,
}: CategoryBoxProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOnClick = useCallback(() => {
    let currentQuery = {};

    if (searchParams) {
      currentQuery = queryString.parse(searchParams.toString());
    }

    const updateParams: any = {
      ...currentQuery,
      category: label,
    };

    if (searchParams.get(`category`) === label) {
      delete updateParams.category;
    }

    const newUrl = queryString.stringifyUrl(
      {
        url: "/",
        query: updateParams,
      },
      { skipNull: true }
    );

    router.push(newUrl);
  }, [label, searchParams, router]);

  return (
    <Suspense>
      <div
        className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
          selected
            ? "border-b-neutral-800 text-neutral-800"
            : "border-b-transparent text-neutral-500"
        }`}
        onClick={handleOnClick}
      >
        <Icon size={26} />
        <div className="font-medium text-sm">{label}</div>
      </div>
    </Suspense>
  );
};
export default CategoryBox;
