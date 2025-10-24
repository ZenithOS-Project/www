import { Toaster } from "@components/ui/sonner";
import "@styles/globals.css";
import { ThemeProvider } from "next-themes";
import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";
import { sync } from "@/server/actions/user/sync";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await sync();
  console.log("User synced");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="max-h-screen min-h-screen max-w-screen min-w-screen overflow-hidden bg-[url('/defaultBackground.jpg')] bg-cover bg-center">
        <AuthKitProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster position="top-right" />
          </ThemeProvider>
        </AuthKitProvider>
      </body>
    </html>
  );
}
