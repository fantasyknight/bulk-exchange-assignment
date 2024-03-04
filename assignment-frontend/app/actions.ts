"use server";

import apiClient from "@/utils/apiClient";
import { Profile } from "@/utils/types";
import { revalidateTag } from "next/cache";

type FormInput = Omit<Profile, "id">;

export const addProfile = async (
  data: FormInput
): Promise<{ data?: FormInput; errors?: { [key: string]: string[] } }> => {
  return await apiClient
    .post(`/profiles/`, data)
    .then((res) => {
      revalidateTag("profiles");
      return { data: res.data };
    })
    .catch((e) => {
      return { errors: e.response?.data };
    });
};

export const updateProfile = async (
  id: string,
  data: FormInput
): Promise<{ data?: FormInput; errors?: { [key: string]: string[] } }> => {
  return await apiClient
    .put(`/profiles/${id}/`, data)
    .then((res) => {
      revalidateTag("profiles");
      return { data: res.data };
    })
    .catch((e) => {
      return { errors: e.response?.data };
    });
};

export const getProfiles = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/`, {
    next: { tags: ["profiles"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
