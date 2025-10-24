import { signOut } from "@workos-inc/authkit-nextjs";

export async function logout() {
  await signOut();
}
