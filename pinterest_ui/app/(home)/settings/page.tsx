"use client";
import { useUser } from "@/app/(userContext)/User";

export default function SettingsPage() {
  const { setUser, user } = useUser();

  return (
    <div className="fixed flex h-screen w-screen justify-center md:mt-20">
      settings
    </div>
  );
}
