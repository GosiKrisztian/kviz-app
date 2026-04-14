import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kvíz App",
  description: "Kvíz készítő és lejátszó alkalmazás",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="hu"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-row bg-zinc-50 dark:bg-black">
        <Sidebar />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
