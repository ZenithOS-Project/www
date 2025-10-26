import supabase from "@/server/supabase";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const { user } = await withAuth({ ensureSignedIn: true });

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.ufsUrl);

      const { data, error } = await supabase
        .from("users")
        .update({
          avatar: file.ufsUrl,
          updatedAt: new Date(),
        })
        .eq("workOSId", metadata.userId)
        .select()
        .single();

      if (error) {
        console.error("Error updating user avatar:", error);
        throw new UploadThingError("Failed to update user avatar");
      }

      //hard refresh the page to show the new avatar

      location.reload();

      return {
        uploadedBy: metadata.userId,
        fileUrl: file.ufsUrl,
        userData: data,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
