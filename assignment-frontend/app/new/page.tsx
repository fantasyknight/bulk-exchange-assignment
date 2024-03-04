"use client";
import Button from "@/components/Button";
import ErrorBlock from "@/components/ErrorBlock";
import Input from "@/components/Input";
import apiClient from "@/utils/apiClient";
import { REG_EMAIL, REG_PHONE_NUMBER } from "@/utils/regConstant";
import { InputType, Profile } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { addProfile } from "../actions";

type FormInput = Omit<Profile, "id">;

const NewUserPage = () => {
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormInput>({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      phone_number: "",
    },
  });

  const submitHandler = async (data: FormInput) => {
    const result = await addProfile(data);
    if (result.data) {
      router.push("/");
    }

    if (result.errors) {
      setErrors(result.errors);
    }
  };

  return (
    <>
      <form
        className="relative px-4 focus:outline-none sm:px-3 md:px-5"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="text-2xl mb-8">User Profile</h1>
        <ErrorBlock errors={errors} />
        <div className="mb-6">
          <p className="text-slate-600 mb-2">Contact email address</p>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type={InputType.EMAIL}
                placeholder="hello@gmail.com"
              />
            )}
            rules={{
              required: true,
              pattern: {
                value: REG_EMAIL,
                message: "Invalid email",
              },
            }}
          />
        </div>
        <div className="mb-6">
          <p className="text-slate-600 mb-2">First name</p>
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <Input {...field} type={InputType.TEXT} placeholder="John" />
            )}
            rules={{ required: true }}
          />
        </div>
        <div className="mb-6">
          <p className="text-slate-600 mb-2">Last name</p>
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <Input {...field} type={InputType.TEXT} placeholder="Doe" />
            )}
            rules={{ required: true }}
          />
        </div>
        <div className="mb-6">
          <p className="text-slate-600 mb-2">Phone number: US</p>
          <Controller
            name="phone_number"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type={InputType.TEXT}
                placeholder="5034464273"
              />
            )}
            rules={{
              required: true,
              pattern: {
                value: REG_PHONE_NUMBER,
                message: "Invalid phone number: Should be 10 digits",
              },
            }}
          />
        </div>
        <Button type={InputType.SUBMIT} disabled={!isValid}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default NewUserPage;
