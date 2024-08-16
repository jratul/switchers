"use client";

import { SessionProvider } from "next-auth/react";
import Nav from "./Nav";
import Footer from "./Footer";

export default function WrapperPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <Nav />
      <div className="flex-grow">{children}</div>
      <Footer />
    </SessionProvider>
  );
}
