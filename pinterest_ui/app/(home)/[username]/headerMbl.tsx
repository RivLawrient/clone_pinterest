"use client";

import React, { useState } from "react";
import Logout from "../(Header)/logout";
import Link from "next/link";

export default function HeaderMbl() {
  const [showSetting, setShowSetting] = useState<boolean>(false);

  return (
    <>
      <SettingModal setShowSetting={setShowSetting} showSetting={showSetting} />
      <div
        className={`absolute ${showSetting ? "hidden" : "block"} left-0 right-0 top-0 flex h-[50px] flex-row items-center justify-between px-5 md:hidden`}
      >
        <Link
          href={"/pin-creation-tool"}
          className={`flex size-[36px] items-center justify-center rounded-full`}
        >
          <svg
            aria-hidden="true"
            aria-label=""
            height="20"
            role="img"
            viewBox="0 0 24 24"
            width="20"
          >
            <path d="M22 10h-8V2a2 2 0 0 0-4 0v8H2a2 2 0 0 0 0 4h8v8a2 2 0 0 0 4 0v-8h8a2 2 0 0 0 0-4"></path>
          </svg>
        </Link>
        <div
          onClick={() => setShowSetting(true)}
          className={`flex size-[36px] items-center justify-center rounded-full`}
        >
          <svg
            aria-label="Settings"
            height="20"
            role="img"
            viewBox="0 0 24 24"
            width="20"
          >
            <path d="M12 16.25a4.25 4.25 0 1 1 0-8.5 4.25 4.25 0 0 1 0 8.5M12 0 1.5 6v12L12 24l10.5-6V6z"></path>
          </svg>
        </div>
      </div>
    </>
  );
}

function SettingModal({
  showSetting,
  setShowSetting,
}: {
  showSetting: boolean;
  setShowSetting: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  if (!showSetting) return null;
  return (
    <div className={`fixed z-[40] flex h-screen w-screen flex-col bg-white`}>
      {/* <div
        onClick={() => setShowSetting(false)}
        className={`flex size-[36px] items-center justify-center rounded-full`}
      >
        <svg
          aria-hidden="true"
          aria-label=""
          height="16"
          role="img"
          viewBox="0 0 24 24"
          width="16"
        >
          <path d="M15.78 24a2.2 2.2 0 0 1-1.58-.66L3 12 14.2.66a2.2 2.2 0 0 1 3.15 0c.87.88.87 2.3 0 3.18L9.29 12l8.06 8.16c.87.88.87 2.3 0 3.18-.44.44-1 .66-1.57.66"></path>
        </svg>
      </div> */}

      <div
        className={`flex w-full flex-row items-center justify-center px-2 py-2`}
      >
        <div
          onClick={() => setShowSetting(false)}
          className={`absolute left-0 ml-3 flex size-[36px] items-center justify-center rounded-full`}
        >
          <svg
            aria-hidden="true"
            aria-label=""
            height="16"
            role="img"
            viewBox="0 0 24 24"
            width="16"
          >
            <path d="M15.78 24a2.2 2.2 0 0 1-1.58-.66L3 12 14.2.66a2.2 2.2 0 0 1 3.15 0c.87.88.87 2.3 0 3.18L9.29 12l8.06 8.16c.87.88.87 2.3 0 3.18-.44.44-1 .66-1.57.66"></path>
          </svg>
        </div>
        <div className={`my-5 text-[20px] font-semibold`}>Settings</div>
      </div>
      <div
        className={`flex h-full flex-col gap-4 px-4 text-[20px] font-semibold`}
      >
        <div className={``}>
          <div className={`text-[16px] font-normal`}>Account</div>
          <div className={`flex items-center justify-between`}>
            Edit profile
            <Arrow />
          </div>
        </div>
        <div className={``}>
          <div className={`text-[16px] font-normal`}>Login</div>
          <div onClick={Logout} className={`flex items-center justify-between`}>
            Log out
            <Arrow />
          </div>
        </div>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <svg
      aria-label="Edit profile"
      height="16"
      role="img"
      viewBox="0 0 24 24"
      width="16"
    >
      <path d="M6.65.66c-.87.88-.87 2.3 0 3.18L14.71 12l-8.06 8.16c-.87.88-.87 2.3 0 3.18a2.2 2.2 0 0 0 3.14 0L21 12 9.8.66a2.2 2.2 0 0 0-3.15 0"></path>
    </svg>
  );
}
