import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Folio",
  description: "A portfolio app",
};

import NotificationProvider  from "@/Providers/notificationProvider";
import Terminal from "@/components/Terminal";
import AuthProvider from "@/Providers/authProvider";

export default function RootLayout({ children }) {
  return (
      <html lang="en" className="overflow-x-hidden bg-black">
          <head>
            <link href="https://fonts.googleapis.com/css2?family=Anta&display=swap" rel="stylesheet" />
          </head>
          <AuthProvider>
            <NotificationProvider>
              <body className={inter.className}>
                {children}
                <Terminal />
              </body>
            </NotificationProvider>
          </AuthProvider>
      </html>
  );
}
