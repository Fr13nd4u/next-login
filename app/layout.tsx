import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "./Menu";
import Providers from "./Providers";
import { Providers as ReduxProvider } from "./redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Login",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ReduxProvider>
            <Menu />
            <main>{children}</main>
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
