import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutComponent from '@/components/Layout';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "car parking management",
  description: "car parking management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

      <LayoutComponent> 
        {children}
      </LayoutComponent>
        </body>
    </html>
  );
}
