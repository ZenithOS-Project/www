import supabase from "@/server/supabase";
import { withAuth } from "@workos-inc/authkit-nextjs";

export async function GET() {
  const { user } = await withAuth();
  const userId = user?.id;

  if (!userId) {
    return new Response(JSON.stringify({ error: "Missing userId" }), {
      status: 400,
    });
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("workOSId", userId)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
