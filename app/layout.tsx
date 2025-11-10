import type { Metadata } from "next";
import "./globals.css";
import FontLoader from "@/components/FontLoader";
import I18nProvider from "@/components/I18nProvider";

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
      <body>
        <I18nProvider>
          <FontLoader />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}

