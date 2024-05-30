import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./_components/ThemeProvider";
const inter = Inter({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: {
    template: "%s | TaskFlow",
    default: "TaskFlow",
  },
  description: "The only Kanban Board you\'ll need",
  openGraph: {
    title: "TaskFlow",
    description: "The only Kanban Board you\'ll need",
    url: "",
    siteName: "taskflow.app",
    images: [
      {
        url: "",
        width: 2322,
        height: 1306,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    shortcut: "/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}