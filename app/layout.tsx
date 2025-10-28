import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlgoVision - Learn Sorting Algorithms Visually",
  description: "Master sorting algorithms through animations, comparisons, and interactive learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <div className="flex flex-col min-h-screen">
          {/* @ts-ignore */}
          <div className="contents">
            {/* @ts-ignore */}
            {import('./components/Navbar').then(mod => <mod.default />)}
          </div>
          <div className="flex-grow">
            {children}
          </div>
          {/* @ts-ignore */}
          <div className="contents">
            {/* @ts-ignore */}
            {import('./components/Footer').then(mod => <mod.default />)}
          </div>
        </div>
      </body>
    </html>
  );
}
