"use server";

import supabase from "@/server/supabase";
import { revalidatePath } from "next/cache";

export async function markAllNotificationsAsRead(
  prevState: unknown,
  formData: FormData,
) {
  const userId = formData.get("userId") as string;
  const { error } = await supabase
    .from("notifications")
    .update({ isRead: true, readAt: new Date() })
    .eq("userId", userId)
    .eq("isRead", false);

  if (error) {
    return { success: false, error };
  }

  revalidatePath("/");

  return { success: true };
}
