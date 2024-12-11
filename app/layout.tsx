import HeaderAuth from "@/components/header-auth";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-screen-xl flex items-center p-3 px-5 text-sm relative">
                  <div className="flex flex-row justify-evenly w-1/3">
                    <Link href="/browse/creatives">Collaborate</Link>
                  </div>
                    <Link href="/" className="flex justify-center w-1/3 text-4xl">CREATIVE CONNECT</Link>
                  <div className="flex flex-row justify-evenly w-1/3">
                    <Link href="/browse/venues">Venues</Link>
                  </div>
                <div className="flex items-center absolute -right-5">
                  <HeaderAuth />
                </div>
                </div>
              </nav>
              <div className="flex w-screen h-screen justify-center">
                {children}
              </div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
