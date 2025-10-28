"use server";
import supabase from "@/server/supabase";

export async function sendWebhook() {
  const { data, error } = await supabase
    .from("notifications")
    .insert({
      userId: "d2ac5ec2-e135-495b-ae56-0fa1ecbb062f",
      title: "New Message",
      message: "You have a new message from John",
      type: "info",
      isRead: false,
      createdAt: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error sending notification via webhook:", error);
    return;
  }
}
