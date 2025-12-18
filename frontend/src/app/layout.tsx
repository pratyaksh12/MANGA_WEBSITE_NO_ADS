import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MangaDex Clone",
  description: "Your personal manga library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
