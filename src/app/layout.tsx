import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import AppProvider from "@/app/app-provider";
import { cookies } from "next/headers";
import SlideSession from "@/components/slide-session";
const inter = Inter({ subsets: ["vietnamese"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <AppProvider initialSessionToken={sessionToken?.value}>
            {children}
            <SlideSession />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
