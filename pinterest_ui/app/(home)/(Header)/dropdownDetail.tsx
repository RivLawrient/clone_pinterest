import React, { useEffect, useRef } from "react";
import ProfileImg from "./profileImg";
import { useUser } from "@/app/(userContext)/User";
import Logout from "./logout";

export default function DropdownDetail({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, setIsVisible]);

  if (!isVisible) return null;
  return (
    <>
      <div
        ref={ref}
        className="fixed right-0 top-14 z-20 mr-2 rounded-2xl bg-white p-2 shadow-[rgba(0,0,0,0.1)_0px_0px_8px_0px]"
      >
        <div>
          <div className="p-2 text-[12px]">Currently in</div>
          <div className="flex cursor-pointer items-center rounded-lg p-2 pr-8 hover:bg-slate-200">
            <div className="mr-2">
              {user?.profile_img ? (
                <img
                  src={user?.profile_img}
                  alt=""
                  width="60"
                  className="rounded-full"
                />
              ) : (
                <ProfileImg alp={user?.username} width={60} />
              )}
            </div>
            <div className="gap-[2px]">
              <div className="text-[16px] font-semibold">{user?.username}</div>
              <div className="text-[14px] font-normal text-[#767676]">
                Personal
              </div>
              <div className="text-[14px] font-normal text-[#767676]">
                {user?.email}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="p-2 text-[12px]">More options</div>
          <div
            onClick={Logout}
            className="flex cursor-pointer rounded-lg p-2 text-[16px] font-semibold hover:bg-slate-200"
          >
            Log out
          </div>
        </div>
      </div>
    </>
  );
}
