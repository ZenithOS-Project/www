"use server";
import supabase from "@/server/supabase";
import { revalidatePath } from "next/cache";

export async function markNotificationAsRead(
  prevState: unknown,
  formData: FormData,
) {
  const notificationId = formData.get("notificationId") as string;

  if (!notificationId) return { success: false };

  const { error } = await supabase
    .from("notifications")
    .update({ isRead: true, readAt: new Date() })
    .eq("id", notificationId);

  if (error) {
    return { success: false, error };
  }

  revalidatePath("/");

  return { success: true, notificationId };
}
