import type { Metadata } from "next";
import "./globals.css";
import FontLoader from "@/components/FontLoader";

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
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HZE1NVVXDP"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HZE1NVVXDP');
            `,
          }}
        />
      </head>
      <body>
        <FontLoader />
        {children}
      </body>
    </html>
  );
}

