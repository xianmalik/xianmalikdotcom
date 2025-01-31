import type { Metadata } from "next";
// import { Questrial } from "next/font/google";
import { Metropolis } from '../fonts';

import Header from "@/components/Header/Header";

// Small Components
import ProgressBar from "@/components/ProgressBar/ProgressBar";

import "../styles/globals.css";

// const questrial = Questrial({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Malik Zubayer",
  description: "Senior Front-End Engineer",
};

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="en" className={Metropolis.className}>
      <body>
        <Header />
        <main>
          {children}
        </main>
        <ProgressBar />
      </body>
    </html>
  );
}
