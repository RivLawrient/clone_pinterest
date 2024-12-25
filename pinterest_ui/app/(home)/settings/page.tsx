"use client";
import { useUser } from "@/app/(userContext)/User";
import { TopNavbar } from "./TopNavbar";
import { BottomNavbar } from "./BottomNavbar";
import ProfileImage from "../(Component)/profileImage";
import { User } from "../(postContext)/Post";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { FormUser, useFormContext } from "./formUser";
import { useNotif } from "@/app/(notifContext)/Notif";

export default function SettingsPage() {
  const { user } = useUser();
  const { form, setForm } = useFormContext();

  return (
    <>
      <div className="fixed z-[11] flex h-screen w-screen overflow-y-scroll md:z-0 md:mt-20 md:flex-row">
        <div className="mt-[65px] flex h-[2000px] w-full justify-center bg-white md:basis-2/3 md:justify-end lg:basis-1/2">
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
              <Profiles />
            </Field>
            <div className="md:columns-2">
              <Field text="First name">
                <Input
                  data={form?.first_name}
                  onChange={(e) => {
                    setForm((prev: FormUser) => ({
                      ...prev,
                      first_name: e.target.value,
                    }));
                  }}
                />
              </Field>
              <Field text="Last name">
                <Input
                  data={form.last_name}
                  onChange={(e) => {
                    setForm((prev: FormUser) => ({
                      ...prev,
                      last_name: e.target.value,
                    }));
                  }}
                />
              </Field>
            </div>
            <Field text="Username">
              <Input
                data={form.username}
                onChange={(e) => {
                  setForm((prev: FormUser) => ({
                    ...prev,
                    username: e.target.value,
                  }));
                }}
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

function Profiles() {
  const { form, setForm } = useFormContext();
  const { setIsError, setMsg, triggerNotif } = useNotif();

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = new FormData();
    file.append("image", e.target.files ? e.target.files[0] : "");
    await fetch(`${process.env.HOST_API_PUBLIC}/img`, {
      method: "post",
      body: file,
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setForm((prev) => ({ ...prev, profile_img: data.link }));
        } else {
          setMsg("Failed to publish. Please try again.");
          setIsError(true);
          triggerNotif();
        }
      })
      .catch(() => {
        setMsg("Failed to publish. Please try again.");
        setIsError(true);
        triggerNotif();
      })
      .finally(() => {});
  };

  return (
    <div className="flex flex-col items-center gap-3 md:flex-row">
      <div className="hidden md:block">
        <ProfileImage user={form as unknown as User} width={75} />
      </div>
      <div className="md:hidden">
        <ProfileImage user={form as unknown as User} width={120} />
      </div>

      <input id="upload" type="file" hidden onChange={handleChange} />
      <label
        htmlFor="upload"
        className="rounded-full bg-gray-200 px-3 py-2 font-semibold text-black active:bg-gray-300"
      >
        Change
      </label>
    </div>
  );
}

function Input({
  data,
  onChange,
}: {
  data: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <input
      type="text"
      value={data}
      onChange={onChange ?? undefined}
      className="rounded-2xl border-[2px] border-gray-300 px-4 py-3 text-[16px]"
    />
  );
}
