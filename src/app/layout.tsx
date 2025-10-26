import { Providers } from "./providers";
import "@styles/globals.css";
import { sync } from "@/server/actions/user/sync";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await sync();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="max-h-screen min-h-screen max-w-screen min-w-screen overflow-hidden bg-[url('/defaultBackground.jpg')] bg-cover bg-center">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
