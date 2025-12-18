import type { Metadata } from "next";
import "./globals.css";
import StaggeredMenu, { StaggeredMenuItem } from "@/components/StaggeredMenu";

export const metadata: Metadata = {
  title: "I'll see what I'll call it",
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
        <StaggeredMenu 
          isFixed={true}
          displayItemNumbering={false}
          items={[
            { label: "Home", link: "/", ariaLabel: "Go to Home" },
            { label: "Popular", link: "/", ariaLabel: "View Popular" },
            { label: "Bookmarks", link: "/bookmarks", ariaLabel: "View Bookmarks" },
            { label: "History", link: "/history", ariaLabel: "View History" },
          ]}
        />
        {children}
      </body>
    </html>
  );
}
