import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hillstone",
  description:
    "Hillstone cocktail bar — handcrafted cocktails and mocktails, made with craft and poured with passion.",
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
