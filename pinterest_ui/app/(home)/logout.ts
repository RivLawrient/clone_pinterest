import { useRouter } from "next/router";

export default async function Logout() {
  const response = await fetch("http://127.0.0.1:4000/bye", {
    credentials: "include",
  });
  window.location.reload();
}
