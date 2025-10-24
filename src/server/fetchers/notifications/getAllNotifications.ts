"use server";
import supabase from "@server/supabase";

export async function getAllNotifications(userId: string) {
  const { data, error } = await supabase
    .from("notifications")
    .select()
    .eq("userId", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
