import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hillstone",
  description:
    "Hillstone cocktail bar — handcrafted cocktails and mocktails, made with craft and poured with passion.",
  // Stop iOS Safari from auto-linking the phone number, email and address.
  // It rewrites the HTML before React hydrates, which causes a hydration
  // mismatch. Contact.tsx links the phone and email itself instead.
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

// Colors the phone browser's address bar/toolbar to match the site
export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
