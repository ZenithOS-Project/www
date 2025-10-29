import { Providers } from "./providers";
import "@/styles/globals.css";
import { sync } from "@/actions/user/sync";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import logo from "public/LogoDark.svg";
import { Separator } from "@/components/ui/separator";

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
        <div className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 md:hidden">
          <Card className="bg-card/60 m-4 flex h-fit w-fit flex-col items-center justify-center p-10 text-center backdrop-blur-lg">
            <Image src={logo.src} alt="Zenith OS Logo" width={50} height={50} />
            <Separator className="my-4" />
            <h1 className="mb-2 text-center text-lg font-bold">
              Zenith OS is not supported on mobile devices (yet).
            </h1>
            <p className="text-muted-foreground text-center text-sm">
              To use Zenith OS, please access it from a desktop or laptop
              computer. We're working on bringing mobile support in future
              updates!
            </p>
          </Card>
        </div>
      </body>
    </html>
  );
}
