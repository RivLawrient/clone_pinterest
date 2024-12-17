import { useRouter } from "next/router";

export default async function Logout() {
  const response = await fetch(`${process.env.HOST_API_PUBLIC}/bye`, {
    credentials: "include",
  }).finally(() => window.location.reload());
  // document.cookie = `auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

  // setTimeout(() => {
  //   window.location.reload();
  // }, 1000);
}
