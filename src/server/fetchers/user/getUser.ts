import supabase from "@/server/supabase";
import { withAuth } from "@workos-inc/authkit-nextjs";

export async function getUser() {
  const user = await withAuth({ ensureSignedIn: true });

  if (!user.user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("workOSId", user.user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
