import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Folio",
  description: "A portfolio app",
};

import NotificationProvider from "@/Providers/notificationProvider";
import Terminal from "@/components/Terminal";
import Navbar from '@/components/Navbar/Navbar';
import AuthProvider from "@/Providers/authProvider";
import { fetchCurrentUser } from "@/Networking/ServerFetch";

export default async function RootLayout({ children }) {
  // const user = await fetchCurrentUser();
  return (
    <html lang="en" className="overflow-x-hidden bg-black">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Anta&display=swap" rel="stylesheet" />
      </head>

      <AuthProvider initialUser={null}>
        <NotificationProvider>
          <body className={inter.className}>
            <Navbar />
            {children}
            <Terminal />
          </body>
        </NotificationProvider>
      </AuthProvider>
    </html>
  );
}
