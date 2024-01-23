import type { Metadata } from "next";
import "@/src/styles/globals.scss";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        { children }
      </body>
    </html>
  )
}