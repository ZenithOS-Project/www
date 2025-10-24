"use server";

import supabase from "@server/supabase";
import { withAuth } from "@workos-inc/authkit-nextjs";

export async function sync() {
  const { user } = await withAuth({ ensureSignedIn: true });

  console.log("Syncing user data...");

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("workOSId", user.id)
    .single();

  if (data) {
    await supabase
      .from("users")
      .update({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.profilePictureUrl,
        updatedAt: new Date(),
      })
      .eq("workos_id", user.id);
  } else {
    const { data, error } = await supabase.from("users").insert([
      {
        workOSId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.profilePictureUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    if (error) {
      console.error("Error inserting new user:", error);
      throw error;
    }
  }
}
