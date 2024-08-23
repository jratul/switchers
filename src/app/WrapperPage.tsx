"use client";

import { SessionProvider } from "next-auth/react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Suspense } from "react";
import Loading from "./loading";

export default function WrapperPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <Nav />
      <div className="flex-grow">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
      <Footer />
    </SessionProvider>
  );
}
