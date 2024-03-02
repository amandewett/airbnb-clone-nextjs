"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../shared/Heading";
import Input from "../shared/inputs/Input";
import toast from "react-hot-toast";
import Button from "../shared/Button";
import useLoginModal from "@/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import useRegistrationModal from "@/hooks/useRegistrationModal";
import { useRouter } from "next/navigation";
import useRentModal from "@/hooks/useRentModal";
import { AIRBNB_STEPS } from "@/lib/enums";
import { CATEGORIES } from "@/utils/categories";
import CategoryInput from "../shared/inputs/CategoryInput";

const RentModal = () => {
  const { isOpen, onClose, onOpen } = useRentModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(AIRBNB_STEPS.CATEGORY);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const selectedCategory = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () =>
    setCurrentStep((value: number) =>
      value === AIRBNB_STEPS.CATEGORY ? AIRBNB_STEPS.CATEGORY : value + 1
    );

  const onForward = () =>
    setCurrentStep((value: number) =>
      value === AIRBNB_STEPS.PRICE ? AIRBNB_STEPS.PRICE : value + 1
    );

  const actionLabel = useMemo(() => {
    if (currentStep === AIRBNB_STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, []);

  const secondaryActionLabel = useMemo(() => {
    if (currentStep === AIRBNB_STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, []);

  const submitHandler = async () => {
    setIsLoading(true);
    try {
    } catch (e: any) {
      toast.error(e.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subTitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {CATEGORIES.map((category) => {
          return (
            <CategoryInput
              label={category.label}
              key={category.label}
              onClick={(value: string) => setCustomValue("category", value)}
              icon={category.icon}
              selected={category.label === selectedCategory}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={isOpen}
        title="Airbnb your home!"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        onClose={onClose}
        onSubmit={submitHandler}
        secondaryAction={
          currentStep === AIRBNB_STEPS.CATEGORY ? undefined : onBack
        }
        body={bodyContent}
        footer={<></>}
      />
    </>
  );
};
export default RentModal;
