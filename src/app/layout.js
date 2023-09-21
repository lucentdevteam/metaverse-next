import Header from "@/layout/header/Header";
import "./globals.scss";
import { Inter } from "next/font/google";
import { Providers } from "@/store/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="layout-container">
            <div className="body-content">
              <Header />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
