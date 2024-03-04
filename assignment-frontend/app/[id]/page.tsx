"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import apiClient from "@/utils/apiClient";
import { REG_EMAIL, REG_PHONE_NUMBER } from "@/utils/regConstant";
import { InputType, Profile } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { updateProfile } from "../actions";
import ErrorBlock from "@/components/ErrorBlock";

type FormInput = Omit<Profile, "id">;

const UserDetail = ({ params }: { params: { id: string } }) => {
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<FormInput>({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      phone_number: "",
    },
  });

  useEffect(() => {
    async function getData(id: string) {
      try {
        const res = await apiClient
          .get(`/profiles/${id}/`)
          .then((res) => res.data);

        reset(res);
      } catch (e) {
        throw new Error("Failed to fetch data");
      }
    }

    if (params.id) getData(params.id);
  }, [params.id]);

  const submitHandler = async (data: FormInput) => {
    const result = await updateProfile(params.id, data);
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
        className="relative max-w-6xl mx-auto px-4 focus:outline-none sm:px-3 md:px-5 pt-10"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="text-2xl mb-8">Edit User Profile</h1>
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
          <p className="text-slate-600 mb-2">Phone number</p>
          <Controller
            name="phone_number"
            control={control}
            render={({ field }) => (
              <Input {...field} type={InputType.TEXT} placeholder="" />
            )}
            rules={{
              required: true,
              pattern: {
                value: REG_PHONE_NUMBER,
                message: "Invalid email",
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

export default UserDetail;
