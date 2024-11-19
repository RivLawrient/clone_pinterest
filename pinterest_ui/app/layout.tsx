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
      <body>{token ? children : landing}</body>
    </html>
  );
}
