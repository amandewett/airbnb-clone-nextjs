"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
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

const LoginModal = () => {
  const registrationModal = useRegistrationModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        ...data,
      });
      if (response?.ok) {
        reset();
        toast.success("User logged in successfully.");
        reset();
        loginModal.onClose();
        router.refresh();
      } else {
        toast.error(response?.error || "Something went wrong.");
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
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Login"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(submitHandler)}
        body={
          <div className="flex flex-col gap-4">
            <Heading title="Welcome back" subTitle="Login to your account!" />
            <Input
              id="email"
              label="Email"
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
              onClick={() => {}}
            />
            <Button
              outline
              label="Continue with Github"
              icon={AiFillGithub}
              onClick={() => {}}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
              <div className="flex justify-center flex-row items-center gap-2">
                <div>Don't have an account?</div>
                <div
                  onClick={() => {
                    loginModal.onClose();
                    registrationModal.onOpen();
                  }}
                  className="text-neutral-800 hover:underline cursor-pointer"
                >
                  Register
                </div>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};
export default LoginModal;
