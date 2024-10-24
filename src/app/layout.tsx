import type { Metadata } from "next";
import { Providers } from "@/helper/provider";
import MainLayout from "@/components/layout/main";
import "./globals.css";
import { Poppins, Roboto_Mono } from 'next/font/google'

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export const metadata: Metadata = {
  title: "Beeheal",
  description: "Generated by create next app",
};

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
  variable: '--font-poppins'
})
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${poppins.variable} ${roboto_mono.variable}`}>
      <body>
        <MainLayout >
          <Providers>
            {children}
          </Providers>
        </MainLayout>
      </body>
    </html>
  );
}
