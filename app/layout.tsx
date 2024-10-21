import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./NavBar";
import "@radix-ui/themes/styles.css";
import { Theme,  } from "@radix-ui/themes";
import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});


// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-inter",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.variable}
      >
        <Theme accentColor="violet">
          <NavBar/>
            <main className="p-5">
              {children}
            </main>
            {/* <ThemePanel/> */}
        </Theme>
        
      </body>
    </html>
  );
}
