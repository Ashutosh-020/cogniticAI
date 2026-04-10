import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UsageProvider } from "./contexts/UsageContext";
import { ConditionalLayout } from "./components/conditional-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cognitic",
  description:
    "An AI-powered meeting assistant that helps you stay organized and productive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider>
            <UsageProvider>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </UsageProvider>
          </TooltipProvider>
        </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}


// This is the root layout for the app, it will be used to wrap all the pages and components in the app.
//  It will include the theme provider, tooltip provider and usage provider. It will also include the global styles and fonts.