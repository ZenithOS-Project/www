"use server";

import supabase from "@/server/supabase";

export async function updateUserField(prevState: unknown, formData: FormData) {
  const field = formData.get("field") as string;
  const value = formData.get("value") as string;

  const { data, error } = await supabase
    .from("users")
    .update({ [field]: value, updatedAt: new Date() })
    .eq("id", prevState);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
