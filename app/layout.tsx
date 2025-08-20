import type { Metadata } from "next";
import { Metropolis, cormorantGaramond, BluuNext } from '@/fonts';


import Header from "@/components/Header";

// Small Components
import ProgressBar from "@/components/ProgressBar/ProgressBar";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Malik Zubayer",
  description: "Senior Front-End Engineer",
};

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={Metropolis.className}>
        <Header />
        <main>
          {children}
        </main>
        <div className="canvas--top"></div>
        <div className="canvas--bottom"></div>
        <div className="canvas--wrapper">
          <div className="canvas--inner"></div>
        </div>
        <ProgressBar />
      </body>
    </html>
  );
}
