"use client";

import { Toaster } from "@components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { AuthKitProvider } from "@workos-inc/authkit-nextjs/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthKitProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthKitProvider>
  );
}
