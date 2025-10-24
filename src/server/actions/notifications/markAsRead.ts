"use server";
import supabase from "@server/supabase";
import { revalidatePath } from "next/cache";

export async function markNotificationAsRead(
  prevState: unknown,
  formData: FormData,
) {
  const notificationId = formData.get("notificationId");

  console.log("Marking notification as read:", { notificationId });
  if (!notificationId) return;

  const { data, error } = await supabase
    .from("notifications")
    .update({ isRead: true, readAt: new Date() })
    .eq("id", notificationId);

  if (error) {
    return { success: false, error };
  }

  revalidatePath("/");

  return { success: true, data };
}
