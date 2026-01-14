import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import AppProvider from "@/app/app-provider";
import { cookies } from "next/headers";
import SlideSession from "@/components/slide-session";
import accountApiRequest from "@/apiRequests/account";
const inter = Inter({ subsets: ["vietnamese"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  let user = null;
  if (sessionToken) {
    const data = await accountApiRequest.me(sessionToken);
    user = data.payload.data;
  }

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
          <AppProvider initialSessionToken={sessionToken} user={user}>
            <Header userProp={user} />
            {children}
            <SlideSession />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
