"use client";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../shared/Heading";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useRentModal from "@/hooks/useRentModal";
import { AIRBNB_STEPS } from "@/lib/enums";
import { CATEGORIES } from "@/utils/categories";
import CategoryInput from "../shared/inputs/CategoryInput";
import CountrySelect from "../shared/inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../shared/inputs/Counter";
import ImageUpload from "../shared/inputs/ImageUpload";
import Input from "../shared/inputs/Input";
import axios from "axios";

const RentModal = () => {
  const { isOpen, onClose, onOpen } = useRentModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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
  const selectedLocation = watch("location");
  const selectedGuestCount = watch("guestCount");
  const selectedRoomCount = watch("roomCount");
  const selectedBathroomCount = watch("bathroomCount");
  const selectedImageSrc = watch("imageSrc");

  const Map = useMemo(
    () => dynamic(() => import("@/components/shared/Map"), { ssr: false }),
    [selectedLocation]
  );
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () =>
    setCurrentStep((value: number) =>
      value === AIRBNB_STEPS.CATEGORY ? AIRBNB_STEPS.CATEGORY : value - 1
    );

  const onNext = () =>
    setCurrentStep((value: number) =>
      value === AIRBNB_STEPS.PRICE ? AIRBNB_STEPS.PRICE : value + 1
    );

  const actionLabel = useMemo(() => {
    if (currentStep === AIRBNB_STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [currentStep]);

  const secondaryActionLabel = useMemo(() => {
    if (currentStep === AIRBNB_STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [currentStep]);

  const submitHandler: SubmitHandler<FieldValues> = async (data) => {
    if (currentStep !== AIRBNB_STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/listings", data);
      toast.success("Listing created successfully!");
      reset();
      setCurrentStep(AIRBNB_STEPS.CATEGORY);
      onClose();
      router.refresh();
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

  if (currentStep === AIRBNB_STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subTitle="Help guests find you!"
        />
        <CountrySelect
          value={selectedLocation}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={selectedLocation?.latLng} />
      </div>
    );
  }

  if (currentStep === AIRBNB_STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subTitle="What amenities do you have?"
        />
        <Counter
          title="Number of guests"
          subTitle="How many guests?"
          value={selectedGuestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subTitle="How many rooms do you have?"
          value={selectedRoomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subTitle="How many bathrooms do you have?"
          value={selectedBathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (currentStep === AIRBNB_STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subTitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={selectedImageSrc}
        />
      </div>
    );
  }

  if (currentStep === AIRBNB_STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subTitle="Short and sweet works the best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (currentStep === AIRBNB_STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subTitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          disabled={isLoading}
          register={register}
          errors={errors}
          type="number"
          formatPrice
          required
        />
      </div>
    );
  }

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={isOpen}
        title="Airbnb your home!"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        onClose={onClose}
        onSubmit={handleSubmit(submitHandler)}
        secondaryAction={
          currentStep === AIRBNB_STEPS.CATEGORY ? undefined : onBack
        }
        body={bodyContent}
      />
    </>
  );
};
export default RentModal;
