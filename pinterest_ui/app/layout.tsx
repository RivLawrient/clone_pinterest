import { Metadata } from "next";
import { NotifProvider } from "./(notifContext)/Notif";
import { ModalProvider } from "./@landing/(modalContext)/Modal";
import "./globals.css";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Clone Pinterest",
  description: "Project clone Pinterest.com",
};

export default async function RootLayout({
  landing,
  children,
}: Readonly<{
  landing: ReactNode;
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  return (
    <html
      lang="en"
      style={{
        scrollbarWidth: "none",
      }}
    >
      <body>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ModalProvider>
          <NotifProvider>{token ? children : landing}</NotifProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
