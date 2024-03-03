"use client";
import { EmptyStateProps } from "@/lib/appTypes";
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

const EmptyState = ({
  title = "No exact matches",
  subTitle = "Try updating or removing some of your filters",
  showReset,
}: EmptyStateProps) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subTitle={subTitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};
export default EmptyState;
