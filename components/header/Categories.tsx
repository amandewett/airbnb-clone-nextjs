"use client";
import { CATEGORIES } from "@/utils/categories";
import Container from "../shared/Container";
import CategoryBox from "../shared/CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const Categories = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const pathName = usePathname();

  if (pathName !== "/") {
    return null;
  }

  return (
    <Suspense>
      <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
          {CATEGORIES.map((category) => {
            return (
              <CategoryBox
                key={category.label}
                label={category.label}
                description={category.description}
                icon={category.icon}
                selected={categoryParam === category.label}
              />
            );
          })}
        </div>
      </Container>
    </Suspense>
  );
};
export default Categories;
