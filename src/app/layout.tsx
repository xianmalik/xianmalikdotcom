import type { Metadata } from "next";
import { Questrial } from "next/font/google";

import "../styles/globals.css";

const questrial = Questrial({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Malik Zubayer",
  description: "Senior Front-End Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={questrial.className}>{children}</body>
    </html>
  );
}
