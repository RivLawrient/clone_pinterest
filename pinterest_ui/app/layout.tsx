import Image from "next/image";
import { NotifProvider } from "./(notifContext)/Notif";
import { ModalProvider } from "./@landing/(modalContext)/Modal";
import "./globals.css";
import { cookies } from "next/headers";

export default async function RootLayout({
  landing,
  children,
}: Readonly<{
  landing: React.ReactNode;
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  return (
    <html lang="en">
      <ModalProvider>
        <NotifProvider>
          <body>{token ? children : landing}</body>
        </NotifProvider>
      </ModalProvider>
      {/* <body>
        <Image src="/asu.jpg" alt="" height={90} width={90} />
      </body> */}
    </html>
  );
}
