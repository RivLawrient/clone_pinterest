"use client";
import { useUser } from "@/app/(userContext)/User";

export default function SettingsPage() {
  const { setUser, user } = useUser();

  return (
    <>
      <div className="fixed flex h-screen w-screen overflow-y-scroll md:mt-20 md:flex-row">
        <div className="mt-6 flex h-[2000px] w-full justify-center bg-slate-500 md:basis-2/3 md:justify-end lg:basis-1/2">
          <TopNavbar />
          <div>
            <input type="text" placeholder="input" className="bg-red-500" />
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
}

function TopNavbar() {
  return (
    <div className="fixed top-0 flex w-screen justify-center bg-white md:hidden">
      Edit profile
    </div>
  );
}

function BottomNavbar() {
  return (
    <div className="fixed bottom-0 hidden w-screen flex-row bg-red-500 md:flex">
      <div className="flex justify-end md:basis-2/3 lg:basis-1/2">nice</div>
    </div>
  );
}
