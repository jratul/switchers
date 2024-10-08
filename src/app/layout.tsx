import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import WrapperPage from "./WrapperPage";

export const metadata: Metadata = {
  title: "스위쳐스",
  description: "닌텐도 스위치의 모든 것",
};

const pretendard = localFont({
  src: "./fonts/PretendardVariable.ttf",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const aldrich = localFont({
  src: "./fonts/Aldrich-Regular.ttf",
  display: "swap",
  variable: "--font-aldrich",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${aldrich.variable}`}>
      <body className={"font-pretendard tracking-tight flex flex-col h-screen"}>
        <WrapperPage>{children}</WrapperPage>
      </body>
    </html>
  );
}
