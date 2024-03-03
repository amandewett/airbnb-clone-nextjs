"use client";

import { CounterProps } from "@/lib/appTypes";
import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Counter = ({ onChange, subTitle, title, value }: CounterProps) => {
  const handleAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const handleReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex- flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subTitle}</div>
      </div>
      <div className="flex items-center gap-4">
        <div
          onClick={handleReduce}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlineMinus />
        </div>
        <div className="font-light text-xl text-neutral-600">{value}</div>
        <div
          onClick={handleAdd}
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};
export default Counter;
