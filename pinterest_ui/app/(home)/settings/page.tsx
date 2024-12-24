"use client";
import { useUser } from "@/app/(userContext)/User";
import { TopNavbar } from "./TopNavbar";
import { BottomNavbar } from "./BottomNavbar";
import ProfileImage from "../(Component)/profileImage";
import { User } from "../(postContext)/Post";

export default function SettingsPage() {
  const { setUser, user } = useUser();

  return (
    <>
      <div className="fixed z-[11] flex h-screen w-screen overflow-y-scroll md:z-0 md:mt-20 md:flex-row">
        <div className="mt-20 flex h-[2000px] w-full justify-center bg-white md:basis-2/3 md:justify-end lg:basis-1/2">
          <TopNavbar />
          <div className="flex w-full flex-col justify-start px-[24px] md:max-w-[488px] md:px-0">
            <div className="hidden flex-col gap-1 pb-8 md:flex">
              <span className="text-[28px] font-semibold">Edit profile</span>
              <span className="text-[16px] leading-none">
                Keep your personal details private. Information you add here is
                visible to anyone who can view your profile.
              </span>
            </div>
            <Field text="Photo">
              <div className="flex items-center gap-3">
                <ProfileImage user={user as unknown as User} width={75} />
                <button className="rounded-full bg-gray-200 px-3 py-2 font-semibold text-black active:bg-gray-300">
                  Change
                </button>
              </div>
            </Field>
            <div className="columns-2">
              <Field text="First name">
                <input
                  type="text"
                  placeholder={user?.first_name}
                  className="rounded-2xl border-[2px] border-gray-300 px-4 py-3 text-[16px]"
                />
              </Field>
              <Field text="Last name">
                <input
                  type="text"
                  placeholder={user?.last_name}
                  className="rounded-2xl border-[2px] border-gray-300 px-4 py-3 text-[16px]"
                />
              </Field>
            </div>
            <Field text="Username">
              <input
                type="text"
                placeholder={user?.username}
                className="rounded-2xl border-[2px] border-gray-300 px-4 py-3 text-[16px]"
              />
            </Field>
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
}

function Field({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col">
      <span className="pb-1 text-[12px]">{text}</span>
      {children}
    </div>
  );
}
