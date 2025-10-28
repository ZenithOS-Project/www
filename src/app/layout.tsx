import { Providers } from "./providers";
import "@/styles/globals.css";
import { sync } from "@/actions/user/sync";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

export const metadata = {
  title: "| Zenith OS",
  description: "A next-generation operating system for the web.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await sync();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="max-h-screen min-h-screen max-w-screen min-w-screen overflow-hidden bg-[url('/defaultBackground.jpg')] bg-cover bg-center">
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
