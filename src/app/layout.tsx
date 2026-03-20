import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vocabmon",
  description: "Learn vocabulary and evolve your partner!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* --- KAKAOTALK AUTO-REDIRECT SCRIPT --- */}
        {/* This runs instantly before the page even loads React */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (navigator.userAgent.toLowerCase().indexOf('kakaotalk') > -1) {
                window.location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(window.location.href);
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
