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
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {CATEGORIES.map((category) => {
          return (
            <Suspense key={category.label}>
              <CategoryBox
                label={category.label}
                description={category.description}
                icon={category.icon}
                selected={categoryParam === category.label}
              />
            </Suspense>
          );
        })}
      </div>
    </Container>
  );
};
export default Categories;
