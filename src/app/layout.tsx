import { Toaster } from "@components/ui/sonner";
import "@styles/globals.css";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="max-h-screen min-h-screen max-w-screen min-w-screen overflow-hidden bg-[url('public/defaultBackground.jpg')] bg-cover bg-center">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster position="top-right" swipeDirections={["right"]} />
        </ThemeProvider>
      </body>
    </html>
  );
}
