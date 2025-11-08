import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notion Cover Maker - Perfect Covers in Seconds",
  description:
    "Make your Notion cover perfectly fit — no Photoshop, no hassle. Upload, adjust, and download in seconds. Free, local, and ad-supported.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

