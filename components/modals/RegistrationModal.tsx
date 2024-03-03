"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegistrationModal from "@/hooks/useRegistrationModal";
import Modal from "./Modal";
import Heading from "../shared/Heading";
import Input from "../shared/inputs/Input";
import toast from "react-hot-toast";
import Button from "../shared/Button";
import useLoginModal from "@/hooks/useLoginModal";
import { signIn } from "next-auth/react";

const RegistrationModal = () => {
  const registerModal = useRegistrationModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const submitHandler: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/register", data);
      if (response.data) {
        reset();
        toast.success("User registered successfully.");
        registerModal.onClose();
        loginModal.onOpen();
      }
    } catch (e: any) {
      toast.error(e.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(submitHandler)}
        body={
          <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subTitle="Create an account!" />
            <Input
              id="email"
              label="Email"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="name"
              label="Name"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id="password"
              label="Password"
              type="password"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        }
        footer={
          <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
              outline
              label="Continue with Google"
              icon={FcGoogle}
              onClick={() => signIn("google")}
            />
            <Button
              outline
              label="Continue with Github"
              icon={AiFillGithub}
              onClick={() => signIn("github")}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
              <div className="flex justify-center flex-row items-center gap-2">
                <div>Already have an account?</div>
                <div
                  onClick={() => {
                    registerModal.onClose();
                    loginModal.onOpen();
                  }}
                  className="text-neutral-800 hover:underline cursor-pointer"
                >
                  Login
                </div>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};
export default RegistrationModal;
