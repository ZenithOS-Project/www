import supabase from "@server/supabase";

export async function getAllNotifications(userId: string) {
  const { data, error } = await supabase
    .from("notifications")
    .select()
    .eq("userId", userId);

  console.log("Fetched notifications:", data);
  if (error) {
    throw new Error(error.message);
  }

  return data;
}
