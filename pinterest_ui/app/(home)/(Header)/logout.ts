import { useRouter } from "next/router";

export default async function Logout() {
  const response = await fetch(`${process.env.HOST_API_PUBLIC}/bye`, {
    credentials: "include",
  });
  window.location.reload();
}
