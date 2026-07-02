import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://folio.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Folio — Developer Portfolios & Code Hosting",
    template: "%s · Folio",
  },
  description:
    "Build, host and share your developer portfolio and projects. Showcase your code with live previews on Folio.",
  keywords: ["developer portfolio", "code hosting", "projects", "portfolio builder", "Folio"],
  applicationName: "Folio",
  openGraph: {
    type: "website",
    siteName: "Folio",
    title: "Folio — Developer Portfolios & Code Hosting",
    description: "Build, host and share your developer portfolio and projects.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Folio — Developer Portfolios & Code Hosting",
    description: "Build, host and share your developer portfolio and projects.",
  },
};

import NotificationProvider from "@/Providers/notificationProvider";
import Terminal from "@/components/Terminal";
import Navbar from '@/components/Navbar/Navbar';
import AuthProvider from "@/Providers/authProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
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
